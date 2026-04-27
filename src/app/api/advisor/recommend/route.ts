import { NextResponse } from "next/server";
import { recommendOpportunities } from "@/lib/opportunities";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const budget = Number(searchParams.get("budget") ?? 400000);
  const experience = (searchParams.get("experience") ?? "متوسط") as "مبتدئ" | "متوسط" | "متقدم";
  const businessType = searchParams.get("businessType") ?? "كافيه";
  const preferredNeighborhood = searchParams.get("preferredNeighborhood") ?? undefined;

  const recommendations = recommendOpportunities({
    budget,
    experience,
    businessType,
    preferredNeighborhood,
  });

  return NextResponse.json({
    recommendations,
    total: recommendations.length,
  });
}