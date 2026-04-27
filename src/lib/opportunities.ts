import { calculateRisk } from "@/lib/analysis";
import { opportunities, type Opportunity } from "@/data/opportunities";
import { historicalMarketData } from "@/data/historicalMarket";
import { neighborhoodInsights } from "@/data/commercialInsights";
import type { PartnershipRequest, ProjectPartner } from "@/store/appStore";

export interface OpportunityExecutiveSnapshot {
  suitability: {
    symbol: "✅" | "⚠️" | "❌";
    label: string;
    tone: string;
    surface: string;
  };
  recommendation: {
    label: "نعم" | "بشروط" | "لا";
    reason: string;
    tone: string;
    surface: string;
  };
  risk: {
    label: string;
    tone: string;
    surface: string;
  };
  expectedCapital: string;
  targetAudience: string;
  obstacles: string;
}

export function getOpportunityRisk(opportunity: Opportunity) {
  return calculateRisk(
    opportunity.competitionDensity,
    opportunity.marketDemand,
    Math.min(95, Math.round((parseInt(opportunity.operatingCostRange.replace(/[^\d]/g, "").slice(0, 5) || "25000", 10) / 700) || 45)),
    opportunity.saturation
  );
}

export function getOpportunityCompositeScore(opportunity: Opportunity) {
  const risk = getOpportunityRisk(opportunity);
  return Math.round(
    opportunity.profitabilityScore * 0.34 +
      opportunity.feasibilityScore * 0.28 +
      opportunity.marketDemand * 0.22 +
      (100 - risk.score) * 0.16
  );
}

export function getOpportunityExecutiveSnapshot(opportunity: Opportunity): OpportunityExecutiveSnapshot {
  const risk = getOpportunityRisk(opportunity);
  const compositeScore = getOpportunityCompositeScore(opportunity);

  const suitability =
    compositeScore >= 80 && risk.level !== "high"
      ? {
          symbol: "✅" as const,
          label: "مناسبة بوضوح",
          tone: "#166534",
          surface: "#ECFDF3",
        }
      : compositeScore >= 65
        ? {
            symbol: "⚠️" as const,
            label: "مناسبة مع تحقق",
            tone: "#A16207",
            surface: "#FFF7E8",
          }
        : {
            symbol: "❌" as const,
            label: "غير مناسبة حالياً",
            tone: "#B91C1C",
            surface: "#FEF2F2",
          };

  const recommendation =
    compositeScore >= 80 && risk.level === "low"
      ? {
          label: "نعم" as const,
          reason: "المؤشرات التشغيلية والطلب والمخاطر في نطاق مريح للدخول.",
          tone: "#166534",
          surface: "#ECFDF3",
        }
      : compositeScore >= 65
        ? {
            label: "بشروط" as const,
            reason: "الدخول منطقي إذا ضُبطت الفرضيات الحرجة قبل الالتزام النهائي.",
            tone: "#A16207",
            surface: "#FFF7E8",
          }
        : {
            label: "لا" as const,
            reason: "الأفضل إعادة الضبط أو المقارنة مع بديل قبل الدخول.",
            tone: "#B91C1C",
            surface: "#FEF2F2",
          };

  return {
    suitability,
    recommendation,
    risk: {
      label: risk.label,
      tone: risk.color,
      surface: risk.bgColor,
    },
    expectedCapital: opportunity.capexRange,
    targetAudience: opportunity.targetAudience.join("، "),
    obstacles: opportunity.riskFactors.slice(0, 3).join("، "),
  };
}

export function recommendOpportunities(input: {
  budget: number;
  experience: "مبتدئ" | "متوسط" | "متقدم";
  businessType: string;
  preferredNeighborhood?: string;
}) {
  const experienceFactor = input.experience === "متقدم" ? 1 : input.experience === "متوسط" ? 0.92 : 0.84;

  return opportunities
    .map((opportunity) => {
      const risk = getOpportunityRisk(opportunity);
      const budgetMin = parseInt(opportunity.capexRange.replace(/[^\d]/g, "").slice(0, 6) || "0", 10);
      const businessMatch =
        opportunity.category.includes(input.businessType) ||
        opportunity.title.includes(input.businessType) ||
        opportunity.summary.includes(input.businessType)
          ? 18
          : 0;
      const neighborhoodMatch = input.preferredNeighborhood && opportunity.neighborhood === input.preferredNeighborhood ? 10 : 0;
      const affordability = input.budget >= budgetMin ? 16 : Math.max(-18, Math.round((input.budget - budgetMin) / 15000));
      const experiencePenalty = risk.score > 60 && input.experience === "مبتدئ" ? 14 : risk.score > 45 && input.experience === "متوسط" ? 8 : 0;
      const score = Math.round(getOpportunityCompositeScore(opportunity) * experienceFactor + businessMatch + neighborhoodMatch + affordability - experiencePenalty);

      return {
        opportunity,
        risk,
        score,
        reasoning: [
          businessMatch > 0 ? "النشاط متوافق مباشرة مع طبيعة الفرصة" : "الفرصة قابلة للتكييف مع النشاط المقترح",
          affordability >= 0 ? "رأس المال يقع ضمن نطاق مقبول لهذه الفرصة" : "رأس المال يحتاج ضبطاً أو شريكاً إضافياً",
          risk.score <= 45 ? "مستوى المخاطر قابل للإدارة" : "تحتاج الفرصة إلى إدارة أدق للمخاطر",
        ],
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

export function getLocationOverview(neighborhood: string) {
  const market = historicalMarketData.find((item) => item.neighborhood === neighborhood);
  const insight = neighborhoodInsights.find((item) => item.neighborhood === neighborhood);

  if (!market || !insight) {
    return null;
  }

  return {
    neighborhood,
    density: market.businessDensity,
    trend: market.trend,
    annualGrowth: market.annualGrowth,
    demandIndex: market.series[market.series.length - 1]?.demandIndex ?? 0,
    competitionIndex: market.series[market.series.length - 1]?.competitionIndex ?? 0,
    saturationLabel:
      insight.competition >= 65 ? "تشبع مرتفع" : insight.competition >= 40 ? "تشبع متوسط" : "تشبع منخفض",
    bestFits: insight.suitableFor,
    notes: insight.notes,
  };
}

export function summarizePartnership(partners: ProjectPartner[], requests: PartnershipRequest[] = []) {
  const totalContribution = partners.reduce((sum, partner) => sum + partner.contribution, 0);
  const confirmedPartners = partners.filter((partner) => partner.status === "confirmed" || partner.status === "owner");
  const pendingInvites = partners.filter((partner) => partner.status === "invited").length;
  const avgEquity = confirmedPartners.length
    ? Math.round(confirmedPartners.reduce((sum, partner) => sum + partner.equityShare, 0) / confirmedPartners.length)
    : 0;

  return {
    totalContribution,
    confirmedPartners: confirmedPartners.length,
    pendingInvites,
    avgEquity,
    acceptedRequests: requests.filter((request) => request.status === "accepted").length,
    pendingRequests: requests.filter((request) => request.status === "pending").length,
  };
}