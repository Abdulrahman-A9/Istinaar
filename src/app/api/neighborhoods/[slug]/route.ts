import { NextResponse } from "next/server";
import { getNeighborhoodDetailFromDb, getStorageStatus } from "@/lib/neighborhoodStorage";

export const runtime = "nodejs";

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const detail = await getNeighborhoodDetailFromDb(slug);

  if (!detail) {
    return NextResponse.json({ message: "Neighborhood not found" }, { status: 404 });
  }

  const storage = await getStorageStatus();

  return NextResponse.json({
    ...detail,
    source: "json_neighborhood_store",
    storage,
  });
}