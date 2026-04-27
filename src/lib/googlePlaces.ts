import crypto from "crypto";
import { getNeighborhoodBySlug, type PlaceTableRow } from "@/data/neighborhoodTables";

const searchPlans = [
  { query: "cafes", category: "cafe", mappedBusinessType: "مقاهٍ" },
  { query: "restaurants", category: "restaurant", mappedBusinessType: "مطاعم" },
  { query: "bakeries", category: "bakery", mappedBusinessType: "مخابز" },
  { query: "pharmacies", category: "pharmacy", mappedBusinessType: "صيدليات" },
  { query: "laundries", category: "laundry", mappedBusinessType: "مغاسل" },
  { query: "clinics", category: "clinic", mappedBusinessType: "عيادات" },
  { query: "stores", category: "retail", mappedBusinessType: "تجزئة" },
] as const;

type SearchPlan = typeof searchPlans[number];

function mapPriceLevel(value?: string): 1 | 2 | 3 | 4 {
  switch (value) {
    case "PRICE_LEVEL_INEXPENSIVE":
      return 1;
    case "PRICE_LEVEL_MODERATE":
      return 2;
    case "PRICE_LEVEL_EXPENSIVE":
      return 3;
    case "PRICE_LEVEL_VERY_EXPENSIVE":
      return 4;
    default:
      return 2;
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildMapPoint(lat: number, lng: number, center: { lat: number; lng: number }) {
  const x = clamp(50 + (lng - center.lng) * 8500, 10, 90);
  const y = clamp(50 - (lat - center.lat) * 8500, 10, 90);
  return {
    x: Number(x.toFixed(1)),
    y: Number(y.toFixed(1)),
  };
}

function buildPlaceId(googlePlaceId: string) {
  return `PLC-${crypto.createHash("md5").update(googlePlaceId).digest("hex").slice(0, 12)}`;
}

async function searchGooglePlaces(query: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY is missing");
  }

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.primaryType,places.businessStatus,places.priceLevel",
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: "ar",
      regionCode: "SA",
      pageSize: 8,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google Places request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return payload.places ?? [];
}

function buildSearchQuery(plan: SearchPlan, neighborhoodName: string) {
  return `${plan.query} in ${neighborhoodName}, Hail, Saudi Arabia`;
}

function transformGooglePlace(place: Record<string, unknown>, neighborhoodId: string, center: { lat: number; lng: number }, plan: SearchPlan): PlaceTableRow | null {
  const googlePlaceId = typeof place.id === "string" ? place.id : null;
  const displayName = typeof place.displayName === "object" && place.displayName && "text" in place.displayName ? String((place.displayName as { text: string }).text) : null;
  const location = typeof place.location === "object" && place.location ? place.location as { latitude?: number; longitude?: number } : null;

  if (!googlePlaceId || !displayName || !location?.latitude || !location?.longitude) {
    return null;
  }

  const lat = Number(location.latitude);
  const lng = Number(location.longitude);

  return {
    id: buildPlaceId(googlePlaceId),
    googlePlaceId,
    neighborhoodId,
    name: displayName,
    category: plan.category,
    mappedBusinessType: plan.mappedBusinessType,
    rating: Number(place.rating ?? 0),
    userRatingsTotal: Number(place.userRatingCount ?? 0),
    address: String(place.formattedAddress ?? "غير متوفر"),
    isOperational: String(place.businessStatus ?? "OPERATIONAL") === "OPERATIONAL",
    lat,
    lng,
    mapPoint: buildMapPoint(lat, lng, center),
    priceLevel: mapPriceLevel(typeof place.priceLevel === "string" ? place.priceLevel : undefined),
    source: "google_places_seed",
    lastSyncedAt: new Date().toISOString().slice(0, 10),
  };
}

export async function fetchNeighborhoodPlacesFromGoogle(slug: string) {
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    throw new Error("Neighborhood not found");
  }

  const deduped = new Map<string, PlaceTableRow>();

  for (const plan of searchPlans) {
    const places = await searchGooglePlaces(buildSearchQuery(plan, neighborhood.name));

    for (const rawPlace of places) {
      const transformed = transformGooglePlace(rawPlace, neighborhood.id, neighborhood.center, plan);
      if (!transformed) {
        continue;
      }

      const existing = deduped.get(transformed.googlePlaceId);
      if (!existing || transformed.userRatingsTotal > existing.userRatingsTotal) {
        deduped.set(transformed.googlePlaceId, transformed);
      }
    }
  }

  return Array.from(deduped.values()).sort((left, right) => right.userRatingsTotal - left.userRatingsTotal || right.rating - left.rating);
}