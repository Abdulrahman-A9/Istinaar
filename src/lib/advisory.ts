import { neighborhoodInsights } from "@/data/commercialInsights";
import type { AdvisoryRequest } from "@/store/appStore";
import { calculateInvestment, calculateRisk } from "@/lib/analysis";

type AdvisorySnapshotInput = Pick<
  AdvisoryRequest,
  | "projectName"
  | "activityType"
  | "businessModel"
  | "city"
  | "neighborhood"
  | "exactLocation"
  | "frontageType"
  | "parkingAvailability"
  | "nearbyCompetitors"
  | "siteArea"
  | "capital"
  | "setupCost"
  | "monthlyCosts"
  | "expectedMonthlyRent"
  | "teamSize"
  | "launchMonths"
  | "targetAudience"
  | "notes"
  | "wantsHumanReview"
>;

const activityWeightMap: Record<string, number> = {
  "كافيه": 1.15,
  "مطعم": 1.2,
  "مخبز": 0.95,
  "عيادة": 1.05,
  "مغسلة": 0.88,
  "متجر": 0.92,
  "Drive-Thru": 1.18,
};

export interface AdvisoryReport {
  locationScore: number;
  marketFitScore: number;
  financialReadinessScore: number;
  overallScore: number;
  decisionLabel: string;
  risk: ReturnType<typeof calculateRisk>;
  investment: ReturnType<typeof calculateInvestment>;
  locationSnapshot: AdvisoryRequest["locationSnapshot"];
  locationNarrative: string;
  competitorSummary: string;
  fitBreakdown: {
    audienceFit: number;
    competitiveGap: number;
    siteReadiness: number;
    rentEfficiency: number;
  };
  recommendedNeighborhoods: Array<{
    neighborhood: string;
    score: number;
    averageRent: number;
    competitorCount: number;
    note: string;
  }>;
  executiveSummary: string;
  nextSteps: string[];
  strengths: string[];
  warnings: string[];
}

function getInsightForNeighborhood(neighborhood: string) {
  return neighborhoodInsights.find((item) => item.neighborhood === neighborhood) ?? neighborhoodInsights[0];
}

function getActivityMultiplier(activityType: string, businessModel: string) {
  return activityWeightMap[businessModel] ?? activityWeightMap[activityType] ?? 1;
}

function getFrontageScore(frontageType: AdvisoryRequest["frontageType"]) {
  return frontageType === "رئيسي" ? 92 : frontageType === "زاوية" ? 82 : 64;
}

function getParkingScore(parkingAvailability: AdvisoryRequest["parkingAvailability"]) {
  return parkingAvailability === "مرتفع" ? 90 : parkingAvailability === "متوسط" ? 68 : 42;
}

function getActivityProfile(request: AdvisoryRequest) {
  const insight = getInsightForNeighborhood(request.neighborhood);
  return (
    insight.activityFit[request.activityType] ??
    insight.activityFit[request.businessModel] ?? {
      demand: Math.round((insight.footfall + insight.purchasingPower + insight.seasonalStrength) / 3),
      saturation: insight.competition,
      notes: "لا توجد قراءة تخصصية كاملة لهذا النشاط بعد، وتم استخدام متوسط مؤشرات الحي.",
    }
  );
}

function extractPrimaryAudience(request: AdvisoryRequest, insight: (typeof neighborhoodInsights)[number]) {
  const inferredAudience = [
    { label: "عائلات", score: insight.familyDensity },
    { label: "موظفون", score: insight.officeDensity },
    { label: "طلاب", score: insight.studentDensity },
    { label: "زوار موسميون", score: insight.tourismPull },
  ]
    .sort((left, right) => right.score - left.score)
    .slice(0, 2)
    .map((item) => item.label);

  const requestedAudience = request.targetAudience
    .split(/[،,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 2);

  return Array.from(new Set([...requestedAudience, ...inferredAudience])).slice(0, 3);
}

export function buildLocationSnapshot(request: AdvisorySnapshotInput) {
  const insight = getInsightForNeighborhood(request.neighborhood);
  const activityProfile =
    insight.activityFit[request.activityType] ??
    insight.activityFit[request.businessModel] ?? {
      demand: Math.round((insight.footfall + insight.purchasingPower + insight.seasonalStrength) / 3),
      saturation: insight.competition,
      notes: "اعتمدت القراءة على متوسط مؤشرات الحي لغياب ملف تخصصي كامل لهذا النشاط.",
    };
  const frontageScore = getFrontageScore(request.frontageType);
  const parkingScore = Math.round((getParkingScore(request.parkingAvailability) + insight.parkingEase) / 2);
  const visibilityScore = Math.round((frontageScore + insight.visibility) / 2);
  const accessibilityScore = Math.round((insight.accessibility + visibilityScore) / 2);
  const neighborhoodMomentum = Math.round((insight.seasonalStrength + insight.footfall + insight.tourismPull) / 3);
  const estimatedCompetitors = Math.max(request.nearbyCompetitors, insight.knownCompetitors.length + Math.round(insight.competition / 22));
  const fitScore = Math.round(
    visibilityScore * 0.22 +
      accessibilityScore * 0.2 +
      parkingScore * 0.14 +
      activityProfile.demand * 0.24 +
      (100 - activityProfile.saturation) * 0.2
  );

  return {
    fitScore,
    fitLabel:
      fitScore >= 82
        ? "ملاءمة قوية جداً"
        : fitScore >= 70
          ? "ملاءمة جيدة قابلة للتحسين"
          : fitScore >= 58
            ? "ملاءمة متوسطة تحتاج ضبطاً"
            : "ملاءمة ضعيفة نسبياً",
    primaryAudience: extractPrimaryAudience(request as AdvisoryRequest, insight),
    estimatedCompetitors,
    competitorCategories: insight.competitorCategories,
    accessibilityScore,
    parkingScore,
    visibilityScore,
    neighborhoodMomentum,
  };
}

export function generateAdvisoryReport(request: AdvisoryRequest): AdvisoryReport {
  const insight = getInsightForNeighborhood(request.neighborhood);
  const activityMultiplier = getActivityMultiplier(request.activityType, request.businessModel);
  const activityProfile = getActivityProfile(request);
  const locationSnapshot = request.locationSnapshot ?? buildLocationSnapshot(request);

  const locationScore = Math.round(
    locationSnapshot.visibilityScore * 0.24 +
      locationSnapshot.accessibilityScore * 0.22 +
      locationSnapshot.parkingScore * 0.16 +
      insight.footfall * 0.18 +
      insight.seasonalStrength * 0.2
  );

  const audienceFit = Math.round(
    ((locationSnapshot.primaryAudience.includes("طلاب") ? insight.studentDensity : 0) +
      (locationSnapshot.primaryAudience.includes("موظفون") ? insight.officeDensity : 0) +
      (locationSnapshot.primaryAudience.includes("عائلات") ? insight.familyDensity : 0) +
      (locationSnapshot.primaryAudience.includes("زوار موسميون") ? insight.tourismPull : 0)) /
      Math.max(locationSnapshot.primaryAudience.length, 1)
  );
  const competitiveGap = Math.max(20, Math.round((100 - activityProfile.saturation) * 0.6 + (100 - insight.competition) * 0.4));
  const siteReadiness = Math.round((locationSnapshot.accessibilityScore + locationSnapshot.visibilityScore + locationSnapshot.parkingScore) / 3);
  const rentEfficiency = Math.max(
    25,
    Math.min(94, Math.round(100 - (request.expectedMonthlyRent / Math.max(request.monthlyCosts, 1)) * 55))
  );

  const marketFitScore = Math.round(
    audienceFit * 0.28 +
      activityProfile.demand * 0.28 +
      competitiveGap * 0.24 +
      insight.purchasingPower * 0.2
  );

  const runwayMonths = request.monthlyCosts > 0 ? request.capital / request.monthlyCosts : 0;
  const financialReadinessScore = Math.max(
    35,
    Math.min(
      95,
      Math.round(
        (request.capital >= request.setupCost ? 35 : 15) +
          Math.min(runwayMonths, 12) * 3 +
          (request.expectedMonthlyRent <= request.monthlyCosts * 0.45 ? 18 : 8) +
          Math.round(rentEfficiency * 0.16)
      )
    )
  );

  const risk = calculateRisk(
    Math.min(100, insight.competition + request.nearbyCompetitors * 4),
    Math.round((activityProfile.demand + insight.purchasingPower + insight.footfall) / 3),
    Math.min(95, Math.round((request.expectedMonthlyRent / Math.max(request.monthlyCosts, 1)) * 100)),
    activityProfile.saturation
  );

  const investment = calculateInvestment(
    request.capital,
    request.monthlyCosts + request.expectedMonthlyRent,
    Math.max(request.launchMonths, 3),
    activityMultiplier
  );

  const overallScore = Math.round(
    locationScore * 0.3 + marketFitScore * 0.35 + financialReadinessScore * 0.2 + (100 - risk.score) * 0.15
  );

  const decisionLabel =
    overallScore >= 82
      ? "استمرار موصى به"
      : overallScore >= 68
        ? "استمرار مشروط بتحسينات"
        : "إعادة ضبط القرار أو مقارنة بديل";

  const recommendedNeighborhoods = neighborhoodInsights
    .map((item) => {
      const activityFit = item.activityFit[request.activityType] ?? item.activityFit[request.businessModel] ?? {
        demand: Math.round((item.footfall + item.purchasingPower + item.seasonalStrength) / 3),
        saturation: item.competition,
        notes: item.notes,
      };
      const fitBonus = item.suitableFor.includes(request.activityType) || item.suitableFor.includes(request.businessModel) ? 18 : 0;
      const affordabilityPenalty = item.averageRent > request.expectedMonthlyRent * 1.25 ? 12 : 0;
      const score = Math.round(
        activityFit.demand * 0.24 +
          item.visibility * 0.16 +
          item.accessibility * 0.16 +
          item.parkingEase * 0.12 +
          item.purchasingPower * 0.12 +
          (100 - activityFit.saturation) * 0.2 +
          fitBonus -
          affordabilityPenalty
      );

      return {
        neighborhood: item.neighborhood,
        score,
        averageRent: item.averageRent,
        competitorCount: item.knownCompetitors.length,
        note: activityFit.notes,
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  const strengths = [
    locationSnapshot.visibilityScore >= 80 ? "الموقع المختار يتمتع بواجهة ووضوح بصري جيد يدعم قرار التوقف والزيارة." : "الموقع الحالي يحتاج دعماً بصرياً أو تشغيلياً أكبر لتعويض ضعف الواجهة.",
    request.capital >= request.setupCost ? "رأس المال يغطي مرحلة التأسيس الأولية دون ضغط حاد على السيولة." : "هناك فجوة بين رأس المال وتكلفة التأسيس ينبغي معالجتها.",
    activityProfile.demand >= 80
      ? "سلوك الطلب في الحي يتوافق بوضوح مع نوع النشاط المقترح." : "الطلب موجود لكن النشاط يحتاج تموضعاً أو عرض قيمة أوضح لرفع الجاذبية.",
  ];

  const warnings = [
    locationSnapshot.estimatedCompetitors >= 6 ? "عدد المنافسين القريبين مرتفع نسبياً، لذلك يلزم عنصر تمييز واضح في التجربة أو التسعير." : "الضغط التنافسي ما زال ضمن مستوى يمكن إدارته إذا بُنيت هوية تشغيلية واضحة.",
    request.expectedMonthlyRent > request.monthlyCosts * 0.45 ? "الإيجار يستهلك نسبة كبيرة من المصروف الشهري، وهذا قد يضغط على هامش الربح." : "هيكل الإيجار مقبول مقارنة بالمصروف التشغيلي الحالي.",
    request.launchMonths > 5 ? "فترة الإطلاق طويلة نسبياً، ما يعني تأخر دخول الإيراد الفعلي." : "زمن الإطلاق مناسب لنسخة أولية من المشروع.",
  ];

  const locationNarrative = `الحي ${request.neighborhood} يعطي المشروع ${locationSnapshot.fitLabel} لأن الواجهة ${request.frontageType}، وحالة المواقف ${request.parkingAvailability}، وزخم الحي الحالي عند ${locationSnapshot.neighborhoodMomentum}% مع جمهور أساسي يتركز في ${locationSnapshot.primaryAudience.join("، ")}.`;
  const competitorSummary = `تم تقدير ${locationSnapshot.estimatedCompetitors} منافسين مباشرين أو شبه مباشرين حول الموقع، مع بروز فئات ${locationSnapshot.competitorCategories.join("، ")} في محيط القرار.`;

  const executiveSummary = `التقرير الأولي يرى أن مشروع ${request.projectName} في ${request.neighborhood} يملك فرصة ${overallScore >= 75 ? "قوية" : overallScore >= 60 ? "متوسطة" : "حذرة"} للتنفيذ. القرار الحالي يصنف كـ ${decisionLabel}، ويعتمد على ضبط الإيجار، وملاءمة النشاط للحي، وتقليل أثر المنافسة القريبة قبل بدء المصروفات الثابتة بالضغط على السيولة.`;

  const nextSteps = [
    "مراجعة صحة تقدير الإيجار والتكاليف الثابتة قبل توقيع أي التزام تشغيلي.",
    "مقارنة الموقع الحالي مع أفضل 3 أحياء بديلة في التقرير قبل تثبيت القرار النهائي.",
    request.wantsHumanReview
      ? "تم تفعيل المراجعة البشرية؛ يوصى بإرفاق مخطط الموقع أو صورة الواجهة في المرحلة التالية."
      : "إذا أردت تدقيقاً أعمق، فعّل المراجعة البشرية لإضافة تقييم تشغيلي وميداني.",
  ];

  return {
    locationScore,
    marketFitScore,
    financialReadinessScore,
    overallScore,
    decisionLabel,
    risk,
    investment,
    locationSnapshot,
    locationNarrative,
    competitorSummary,
    fitBreakdown: {
      audienceFit,
      competitiveGap,
      siteReadiness,
      rentEfficiency,
    },
    recommendedNeighborhoods,
    executiveSummary,
    nextSteps,
    strengths,
    warnings,
  };
}