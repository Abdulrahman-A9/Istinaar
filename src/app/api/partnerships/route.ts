import { NextResponse } from "next/server";
import { partnerProfilesSeed } from "@/data/partnerships";

export function GET() {
  return NextResponse.json({
    profiles: partnerProfilesSeed,
    total: partnerProfilesSeed.length,
  });
}