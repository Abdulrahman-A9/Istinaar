import { NextResponse } from "next/server";
import { getStorageStatus, listNeighborhoodsFromDb } from "@/lib/neighborhoodStorage";

export const runtime = "nodejs";

export async function GET() {
  const items = await listNeighborhoodsFromDb();
  const storage = await getStorageStatus();

  return NextResponse.json({
    items,
    total: items.length,
    source: "json_neighborhood_store",
    storage,
  });
}