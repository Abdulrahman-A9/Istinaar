import { NextResponse } from "next/server";
import { historicalMarketData } from "@/data/historicalMarket";
import { neighborhoodInsights } from "@/data/commercialInsights";

export function GET() {
  return NextResponse.json({
    historical: historicalMarketData,
    liveSnapshot: neighborhoodInsights,
  });
}