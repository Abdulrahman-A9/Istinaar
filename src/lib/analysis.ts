// Risk Engine Logic
export interface RiskResult {
  level: "low" | "medium" | "high";
  label: string;
  color: string;
  bgColor: string;
  explanation: string;
  score: number;
}

export function calculateRisk(
  competitionDensity: number,
  marketDemand: number,
  costLevel: number,
  activitySaturation: number
): RiskResult {
  // Weighted risk score (higher = more risk)
  const riskScore =
    competitionDensity * 0.3 +
    (100 - marketDemand) * 0.35 +
    costLevel * 0.2 +
    activitySaturation * 0.15;

  const reasons: string[] = [];

  if (competitionDensity >= 60) reasons.push("كثافة منافسة عالية");
  else if (competitionDensity <= 25) reasons.push("منافسة منخفضة");

  if (marketDemand >= 80) reasons.push("طلب سوقي مرتفع");
  else if (marketDemand <= 50) reasons.push("طلب سوقي منخفض");

  if (costLevel >= 60) reasons.push("تكاليف تشغيل عالية");
  if (activitySaturation >= 60) reasons.push("تشبع في نوع النشاط");

  if (riskScore <= 30) {
    return {
      level: "low",
      label: "مخاطرة منخفضة",
      color: "#166534",
      bgColor: "#dcfce7",
      explanation: reasons.length > 0
        ? `المخاطرة منخفضة بسبب ${reasons.join(" و")}`
        : "المخاطرة منخفضة بسبب قلة المنافسة وارتفاع الطلب في هذا الحي",
      score: riskScore
    };
  } else if (riskScore <= 55) {
    return {
      level: "medium",
      label: "مخاطرة متوسطة",
      color: "#92400e",
      bgColor: "#fef3c7",
      explanation: reasons.length > 0
        ? `المخاطرة متوسطة نتيجة ${reasons.join(" و")}`
        : "المخاطرة متوسطة — يحتاج المشروع دراسة دقيقة وتخطيط جيد",
      score: riskScore
    };
  } else {
    return {
      level: "high",
      label: "مخاطرة عالية",
      color: "#991b1b",
      bgColor: "#fee2e2",
      explanation: reasons.length > 0
        ? `مخاطرة عالية بسبب ${reasons.join(" و")}`
        : "مخاطرة عالية بسبب كثافة المنافسة وانخفاض الطلب في هذا الحي",
      score: riskScore
    };
  }
}

// Investment Calculator Logic
export interface CalculatorResult {
  netProfit: number;
  roi: number;
  paybackMonths: number;
  scenarios: {
    optimistic: { revenue: number; profit: number; label: string };
    average: { revenue: number; profit: number; label: string };
    conservative: { revenue: number; profit: number; label: string };
  };
  monthlyFlow: { month: string; value: number }[];
}

export function calculateInvestment(
  capital: number,
  monthlyCosts: number,
  seasonMonths: number,
  activityMultiplier: number = 1.0
): CalculatorResult {
  const totalCosts = monthlyCosts * seasonMonths;
  const baseRevenue = capital * 0.35 * activityMultiplier * (seasonMonths / 3);

  const optimisticRevenue = baseRevenue * 1.4;
  const averageRevenue = baseRevenue;
  const conservativeRevenue = baseRevenue * 0.65;

  const avgNetProfit = averageRevenue - totalCosts;
  const roi = capital > 0 ? ((avgNetProfit / capital) * 100) : 0;
  const paybackMonths = avgNetProfit > 0 ? Math.ceil(capital / (avgNetProfit / seasonMonths)) : 0;

  const arabicMonths = ["أكتوبر", "نوفمبر", "ديسمبر", "يناير", "فبراير", "مارس"];
  const monthlyFlow = arabicMonths.slice(0, seasonMonths + 1).map((month, i) => ({
    month,
    value: i === 0 ? -capital : Math.round(averageRevenue / seasonMonths - monthlyCosts)
  }));

  return {
    netProfit: Math.round(avgNetProfit),
    roi: Math.round(roi * 10) / 10,
    paybackMonths,
    scenarios: {
      optimistic: {
        revenue: Math.round(optimisticRevenue),
        profit: Math.round(optimisticRevenue - totalCosts),
        label: "الحالة المثلى"
      },
      average: {
        revenue: Math.round(averageRevenue),
        profit: Math.round(avgNetProfit),
        label: "الحالة المتوسطة"
      },
      conservative: {
        revenue: Math.round(conservativeRevenue),
        profit: Math.round(conservativeRevenue - totalCosts),
        label: "الحالة المتحفظة"
      }
    },
    monthlyFlow
  };
}

export const activityMultipliers: Record<string, number> = {
  "مطعم": 1.2,
  "كافيه": 1.1,
  "مخيم فاخر": 1.4,
  "سوق شعبي": 0.9,
  "فعاليات ترفيهية": 1.3,
  "مهرجان": 1.5,
  "حرف يدوية": 0.85,
  "متاجر متنوعة": 1.0,
  "تجاري": 1.0
};
