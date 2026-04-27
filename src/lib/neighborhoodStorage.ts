import fs from "fs/promises";
import path from "path";
import {
  analyticsTable,
  getNeighborhoodBySlug,
  neighborhoodsTable,
  placesTable,
  type NeighborhoodAnalyticsRow,
  type NeighborhoodTableRow,
  type PlaceTableRow,
} from "@/data/neighborhoodTables";

type NeighborhoodSummary = NeighborhoodTableRow & { analytics: NeighborhoodAnalyticsRow | null };
type NeighborhoodDetail = {
  neighborhood: NeighborhoodTableRow;
  places: PlaceTableRow[];
  analytics: NeighborhoodAnalyticsRow | null;
};

type NeighborhoodStoreSnapshot = {
  neighborhoods: NeighborhoodTableRow[];
  places: PlaceTableRow[];
  analytics: NeighborhoodAnalyticsRow[];
};

declare global {
  var __hailNeighborhoodStoreCache: NeighborhoodStoreSnapshot | undefined;
}

function getStoreFilePath() {
  if (process.env.VERCEL) {
    return "/tmp/hail-neighborhoods-store.json";
  }

  return path.join(process.cwd(), ".data", "hail-neighborhoods-store.json");
}

async function ensureStoreDirectory() {
  if (process.env.VERCEL) {
    return;
  }

  await fs.mkdir(path.dirname(getStoreFilePath()), { recursive: true });
}

function createSeedSnapshot(): NeighborhoodStoreSnapshot {
  return {
    neighborhoods: structuredClone(neighborhoodsTable),
    places: structuredClone(placesTable),
    analytics: structuredClone(analyticsTable),
  };
}

async function writeSnapshot(snapshot: NeighborhoodStoreSnapshot) {
  await ensureStoreDirectory();
  await fs.writeFile(getStoreFilePath(), JSON.stringify(snapshot, null, 2), "utf8");
}

async function loadSnapshotFromDisk() {
  try {
    const raw = await fs.readFile(getStoreFilePath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<NeighborhoodStoreSnapshot>;

    if (!Array.isArray(parsed.neighborhoods) || !Array.isArray(parsed.places) || !Array.isArray(parsed.analytics)) {
      throw new Error("Invalid neighborhood storage snapshot");
    }

    return parsed as NeighborhoodStoreSnapshot;
  } catch {
    const seeded = createSeedSnapshot();
    await writeSnapshot(seeded);
    return seeded;
  }
}

async function getSnapshot() {
  if (global.__hailNeighborhoodStoreCache) {
    return global.__hailNeighborhoodStoreCache;
  }

  const snapshot = await loadSnapshotFromDisk();
  global.__hailNeighborhoodStoreCache = snapshot;
  return snapshot;
}

async function saveSnapshot(snapshot: NeighborhoodStoreSnapshot) {
  global.__hailNeighborhoodStoreCache = snapshot;
  await writeSnapshot(snapshot);
}

function roundNumber(value: number, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function computeAnalytics(neighborhood: NeighborhoodTableRow, places: PlaceTableRow[]): NeighborhoodAnalyticsRow {
  const totalPlaces = places.length;
  const totalReviews = places.reduce((sum, place) => sum + place.userRatingsTotal, 0);
  const averageRating = totalPlaces > 0 ? roundNumber(places.reduce((sum, place) => sum + place.rating, 0) / totalPlaces, 1) : 0;
  const categoryCounts = places.reduce<Record<string, number>>((accumulator, place) => {
    accumulator[place.mappedBusinessType] = (accumulator[place.mappedBusinessType] ?? 0) + 1;
    return accumulator;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "-";
  const competitionDensity = totalPlaces / Math.max(neighborhood.landAreaKm2, 1);
  const competitionScore = Math.min(100, Math.round(competitionDensity * 11 + averageRating * 8));
  const demandScore = Math.min(100, Math.round(averageRating * 12 + Math.min(totalReviews / 18, 45)));
  const sourceCoverage = totalPlaces >= 8 ? "مرتفعة" : totalPlaces >= 4 ? "متوسطة" : "منخفضة";

  return {
    neighborhoodId: neighborhood.id,
    totalPlaces,
    averageRating,
    totalReviews,
    competitionScore,
    demandScore,
    topCategory,
    categoryCounts,
    sourceCoverage,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
}

export async function listNeighborhoodsFromDb(): Promise<NeighborhoodSummary[]> {
  const snapshot = await getSnapshot();

  return [...snapshot.neighborhoods]
    .sort((left, right) => left.name.localeCompare(right.name, "ar"))
    .map((neighborhood) => ({
      ...neighborhood,
      analytics: snapshot.analytics.find((item) => item.neighborhoodId === neighborhood.id) ?? null,
    }));
}

export async function getNeighborhoodDetailFromDb(slug: string): Promise<NeighborhoodDetail | null> {
  const snapshot = await getSnapshot();
  const neighborhood = snapshot.neighborhoods.find((item) => item.slug === slug);

  if (!neighborhood) {
    return null;
  }

  const places = snapshot.places
    .filter((item) => item.neighborhoodId === neighborhood.id)
    .sort((left, right) => right.userRatingsTotal - left.userRatingsTotal || right.rating - left.rating);

  return {
    neighborhood,
    places,
    analytics: snapshot.analytics.find((item) => item.neighborhoodId === neighborhood.id) ?? null,
  };
}

export async function replaceNeighborhoodPlaces(slug: string, places: PlaceTableRow[]) {
  const snapshot = await getSnapshot();
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    throw new Error("Neighborhood not found");
  }

  const filteredPlaces = snapshot.places.filter((item) => item.neighborhoodId !== neighborhood.id);
  const analytics = computeAnalytics(neighborhood, places);

  const nextSnapshot: NeighborhoodStoreSnapshot = {
    neighborhoods: snapshot.neighborhoods.some((item) => item.id === neighborhood.id)
      ? snapshot.neighborhoods.map((item) => (item.id === neighborhood.id ? neighborhood : item))
      : [...snapshot.neighborhoods, neighborhood],
    places: [...filteredPlaces, ...places],
    analytics: snapshot.analytics.some((item) => item.neighborhoodId === neighborhood.id)
      ? snapshot.analytics.map((item) => (item.neighborhoodId === neighborhood.id ? analytics : item))
      : [...snapshot.analytics, analytics],
  };

  await saveSnapshot(nextSnapshot);

  return {
    neighborhood,
    analytics,
    placesCount: places.length,
  };
}

export async function getStorageStatus() {
  const storagePath = getStoreFilePath();
  return {
    engine: "json_file_store",
    path: storagePath,
    mode: process.env.VERCEL ? "ephemeral-vercel-tmp" : "persistent-local-file",
  };
}
