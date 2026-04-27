import { NextResponse } from "next/server";
import { fetchNeighborhoodPlacesFromGoogle } from "@/lib/googlePlaces";
import { replaceNeighborhoodPlaces } from "@/lib/neighborhoodStorage";

export const runtime = "nodejs";

export async function POST(_: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const places = await fetchNeighborhoodPlacesFromGoogle(slug);
    const result = await replaceNeighborhoodPlaces(slug, places);

    return NextResponse.json({
      ok: true,
      slug,
      placesCount: result.placesCount,
      analytics: result.analytics,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Refresh failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}