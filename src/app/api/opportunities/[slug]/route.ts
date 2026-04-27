import { NextResponse } from "next/server";
import { getOpportunityBySlug } from "@/data/opportunities";

export function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  return context.params.then(({ slug }) => {
    const opportunity = getOpportunityBySlug(slug);
    if (!opportunity) {
      return NextResponse.json({ message: "Opportunity not found" }, { status: 404 });
    }

    return NextResponse.json(opportunity);
  });
}