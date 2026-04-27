import lands from "@/data/lands";
import { opportunities, type Opportunity } from "@/data/opportunities";
import { historicalMarketData } from "@/data/historicalMarket";
import { neighborhoodInsights } from "@/data/commercialInsights";
import { getOpportunityRisk } from "@/lib/opportunities";

export interface AmanahOpportunityAssessment {
  id: string;
  title: string;
  neighborhood: string;
  readinessScore: number;
  readinessLabel: string;
  readinessTone: string;
  priorityLabel: string;
  recommendation: string;
  reasons: string[];
  blockers: string[];
}

export interface AmanahProposedOpportunity {
  id: string;
  title: string;
  neighborhood: string;
  anchorAsset: string;
  demandScore: number;
  saturationScore: number;
  readinessWindow: string;
  rationale: string;
  expectedImpact: string;
}

export interface AmanahPriorityArea {
  neighborhood: string;
  priorityScore: number;
  demandLevel: number;
  competitionLevel: number;
  seasonalStrength: number;
  statusLabel: string;
  note: string;
}

export interface AmanahRequirementBlueprint {
  opportunityId: string;
  opportunityTitle: string;
  complexityLabel: string;
  complexityTone: string;
  steps: Array<{
    title: string;
    detail: string;
    source: string;
    status: "واضح" | "يحتاج توضيح" | "يتطلب تنسيقاً";
  }>;
}

export interface AmanahLeadershipBrief {
  id: string;
  title: string;
  angle: string;
  summary: string;
  recommendation: string;
  indicators: string[];
}

export interface AmanahWorkflowStep {
  id: string;
  title: string;
  description: string;
  owner: string;
  duration: string;
}

export interface AmanahWorkflowCase {
  id: string;
  title: string;
  neighborhood: string;
  anchorAsset: string;
  stageId: string;
  stageLabel: string;
  stageTone: string;
  owner: string;
  nextAction: string;
  readinessScore: number;
  municipalityValue: string;
  decisionLens: string;
}

export interface AmanahDecisionWorkflow {
  steps: AmanahWorkflowStep[];
  cases: AmanahWorkflowCase[];
}

function getNeighborhoodInsight(name: string) {
  return neighborhoodInsights.find((item) => item.neighborhood === name);
}

function getMarketHistory(name: string) {
  return historicalMarketData.find((item) => item.neighborhood === name);
}

function scoreOpportunityReadiness(opportunity: Opportunity) {
  const risk = getOpportunityRisk(opportunity);
  const insight = getNeighborhoodInsight(opportunity.neighborhood);
  const locationFit = insight
    ? Math.round((insight.visibility + insight.accessibility + insight.parkingEase + insight.seasonalStrength) / 4)
    : 65;

  return Math.round(
    opportunity.feasibilityScore * 0.3 +
      opportunity.profitabilityScore * 0.22 +
      opportunity.marketDemand * 0.18 +
      locationFit * 0.14 +
      (100 - risk.score) * 0.16
  );
}

function getReadinessMeta(score: number) {
  if (score >= 82) {
    return {
      label: "جاهزة للمرحلة الرسمية",
      tone: "#166534",
      priority: "أولوية رفع",
      recommendation: "يوصى بالإعداد للرفع الرسمي بعد مراجعة الصياغة النهائية للطرح.",
    };
  }

  if (score >= 68) {
    return {
      label: "جاهزة بعد استكمال محدود",
      tone: "#A16207",
      priority: "أولوية معالجة",
      recommendation: "يوصى باستكمال نقاط الوضوح والجاهزية قبل الإحالة إلى المسار الرسمي.",
    };
  }

  return {
    label: "تحتاج إعادة ضبط",
    tone: "#B91C1C",
    priority: "ليست أولوية طرح",
    recommendation: "الأفضل إعادة صياغة الفرصة أو تعديل نطاقها قبل الانتقال للمرحلة التالية.",
  };
}

function mapRequirementStatus(opportunity: Opportunity) {
  const risk = getOpportunityRisk(opportunity);
  const complexity = opportunity.businessModel.includes("Destination") || opportunity.businessModel.includes("Venue")
    ? 3
    : opportunity.marketDemand > 85 || risk.score > 50
      ? 2
      : 1;

  return {
    complexityLabel: complexity === 3 ? "جاهزية مركبة" : complexity === 2 ? "جاهزية متوسطة" : "جاهزية مباشرة",
    complexityTone: complexity === 3 ? "#B45309" : complexity === 2 ? "#1D4ED8" : "#166534",
  };
}

export function getAmanahOpportunityAssessments(): AmanahOpportunityAssessment[] {
  return opportunities
    .map((opportunity) => {
      const readinessScore = scoreOpportunityReadiness(opportunity);
      const meta = getReadinessMeta(readinessScore);

      return {
        id: opportunity.id,
        title: opportunity.title,
        neighborhood: opportunity.neighborhood,
        readinessScore,
        readinessLabel: meta.label,
        readinessTone: meta.tone,
        priorityLabel: meta.priority,
        recommendation: meta.recommendation,
        reasons: [
          opportunity.strengths[0],
          opportunity.marketSignals[0],
          `العائد المتوقع ${opportunity.roi}% وفترة الاسترداد ${opportunity.paybackMonths} شهراً`,
        ].filter(Boolean),
        blockers: [
          opportunity.riskFactors[0],
          opportunity.riskFactors[1],
          opportunity.saturation > 60 ? "يتطلب تميزاً أعلى في صياغة الطرح بسبب التشبع." : "لا توجد إشارة تشبع مرتفعة تمنع الانتقال للمراجعة.",
        ].filter(Boolean),
      };
    })
    .sort((left, right) => right.readinessScore - left.readinessScore);
}

export function getAmanahProposedOpportunities(): AmanahProposedOpportunity[] {
  return neighborhoodInsights
    .map((insight) => {
      const bestFit = Object.entries(insight.activityFit)
        .map(([activity, fit]) => ({
          activity,
          demand: fit.demand,
          saturation: fit.saturation,
          notes: fit.notes,
          score: fit.demand - fit.saturation,
        }))
        .sort((left, right) => right.score - left.score)[0];

      const anchorAsset = lands.find((land) => land.neighborhood === insight.neighborhood && land.status === "available");
      const title = bestFit.activity.includes("موسمي")
        ? `فرصة موسمية مقترحة في ${insight.neighborhood}`
        : bestFit.activity.includes("Drive-Thru")
          ? `محور خدمة سريعة مقترح في ${insight.neighborhood}`
          : `${bestFit.activity} مقترح في ${insight.neighborhood}`;

      return {
        id: `SUG-${insight.neighborhood}`,
        title,
        neighborhood: insight.neighborhood,
        anchorAsset: anchorAsset?.name ?? `أصل بلدي قابل للدراسة في ${insight.neighborhood}`,
        demandScore: bestFit.demand,
        saturationScore: bestFit.saturation,
        readinessWindow: bestFit.score >= 40 ? "جاهزة للدراسة الأولية" : "تحتاج قراءة أعمق قبل الإطلاق",
        rationale: bestFit.notes,
        expectedImpact: `تستند التوصية إلى طلب ${bestFit.demand}% مقابل تشبع ${bestFit.saturation}% مع قابلية موضعية يبرزها الحي.`,
      };
    })
    .sort((left, right) => right.demandScore - left.demandScore)
    .slice(0, 5);
}

export function getAmanahPriorityAreas(): AmanahPriorityArea[] {
  return neighborhoodInsights
    .map((insight) => {
      const market = getMarketHistory(insight.neighborhood);
      const demandLevel = market?.series.at(-1)?.demandIndex ?? insight.footfall;
      const competitionLevel = market?.series.at(-1)?.competitionIndex ?? insight.competition;
      const priorityScore = Math.round(
        demandLevel * 0.34 +
          insight.seasonalStrength * 0.2 +
          insight.visibility * 0.14 +
          insight.accessibility * 0.12 +
          (100 - competitionLevel) * 0.2
      );

      return {
        neighborhood: insight.neighborhood,
        priorityScore,
        demandLevel,
        competitionLevel,
        seasonalStrength: insight.seasonalStrength,
        statusLabel: priorityScore >= 80 ? "أولوية فورية" : priorityScore >= 68 ? "أولوية موجهة" : "أولوية لاحقة",
        note: market?.highlight ?? insight.notes,
      };
    })
    .sort((left, right) => right.priorityScore - left.priorityScore);
}

export function getAmanahRequirementBlueprints(): AmanahRequirementBlueprint[] {
  return opportunities.slice(0, 5).map((opportunity) => {
    const meta = mapRequirementStatus(opportunity);

    return {
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      complexityLabel: meta.complexityLabel,
      complexityTone: meta.complexityTone,
      steps: [
        {
          title: "وضوح توصيف النشاط",
          detail: `يتطلب تثبيت الصياغة الاستثمارية للنشاط ضمن فئة ${opportunity.category} وربطها بملاءمة الحي والموقع.`,
          source: "استنار + فرص",
          status: opportunity.summary.length > 40 ? "واضح" : "يحتاج توضيح",
        },
        {
          title: "قراءة الاشتراطات المتوقعة",
          detail: "إظهار الاشتراطات البلدية والتنظيمية المتوقعة قبل أي إحالة رسمية، دون تنفيذها داخل المنصة.",
          source: "بلدي",
          status: opportunity.businessModel.includes("Destination") ? "يتطلب تنسيقاً" : "يحتاج توضيح",
        },
        {
          title: "مسار الموافقات المرتبطة",
          detail: "توضيح الجهات المرجحة للدخول في المسار ونقاط التعقيد المتوقعة قبل الرفع النظامي.",
          source: "بوابة موافقة الجهات الحكومية",
          status: opportunity.marketDemand > 88 ? "يتطلب تنسيقاً" : "يحتاج توضيح",
        },
        {
          title: "قرار الجاهزية للرفع",
          detail: "إصدار توصية داخلية: هل تستحق الفرصة الانتقال للمسار الرسمي الآن أم بعد استكمال محدود؟",
          source: "استنار",
          status: scoreOpportunityReadiness(opportunity) >= 82 ? "واضح" : "يحتاج توضيح",
        },
      ],
    };
  });
}

export function getAmanahLeadershipBriefs(): AmanahLeadershipBrief[] {
  const assessments = getAmanahOpportunityAssessments();
  const priorities = getAmanahPriorityAreas();
  const proposed = getAmanahProposedOpportunities();

  return [
    {
      id: "brief-top-opportunity",
      title: "موجز توصية برفع فرصة ناضجة",
      angle: assessments[0]?.title ?? "فرصة ذات جاهزية مرتفعة",
      summary: `تُظهر القراءة الحالية أن الفرصة الواقعة في ${assessments[0]?.neighborhood ?? "أحد الأحياء ذات الأولوية"} وصلت إلى مستوى نضج يسمح بعرضها داخلياً على القيادة بوصفها ملفاً مؤهلاً للانتقال إلى المسار النظامي بعد استكمال الصياغة النهائية.`,
      recommendation: "يوصى باعتماد موجز قرار مختصر يتضمن مبررات الرفع، ونقاط الضبط المطلوبة قبل الإحالة إلى القنوات الرسمية ذات العلاقة.",
      indicators: assessments[0] ? [`درجة الجاهزية ${assessments[0].readinessScore}%`, assessments[0].priorityLabel, `أبرز نقطة ضبط: ${assessments[0].blockers[0]}`] : [],
    },
    {
      id: "brief-priority-area",
      title: "موجز حي ذي أولوية استثمارية",
      angle: priorities[0]?.neighborhood ?? "حي ذو أولوية",
      summary: `يبين المرصد أن ${priorities[0]?.neighborhood ?? "هذا الحي"} يملك أفضل توازن حالي بين الطلب، الجاذبية الموسمية، وانخفاض نسبي في ضغط المنافسة، ما يجعله بيئة مناسبة لتجميع طرح استثماري أكثر انتظاماً.`,
      recommendation: "يوصى بالنظر إلى الحي كحزمة استثمارية متكاملة، لا كأصل منفرد، بما يرفع كفاءة التخطيط المكاني للطرح ويعزز وضوح القرار أمام القيادة.",
      indicators: priorities[0] ? [`درجة الأولوية ${priorities[0].priorityScore}%`, `مؤشر الطلب ${priorities[0].demandLevel}%`, `ضغط المنافسة ${priorities[0].competitionLevel}%`] : [],
    },
    {
      id: "brief-generated-opportunity",
      title: "موجز فرصة مقترحة جديدة",
      angle: proposed[0]?.title ?? "فرصة مقترحة",
      summary: `المولد الاستدلالي يقترح فرصة جديدة في ${proposed[0]?.neighborhood ?? "أحد الأحياء"} استناداً إلى فجوة سوقية محلية وقراءة أكثر اتزاناً بين الطلب والتشبع، بما يدعم دور الأمانة في ابتكار فرص أوضح قبل الطرح.`,
      recommendation: "يوصى بإدراج هذه الفرصة ضمن قائمة الدراسات الأولية للأمانة، على أن تُراجع جدواها وصياغتها قبل اعتمادها كخيار طرح محتمل.",
      indicators: proposed[0] ? [`مؤشر الطلب ${proposed[0].demandScore}%`, `مؤشر التشبع ${proposed[0].saturationScore}%`, proposed[0].readinessWindow] : [],
    },
  ];
}

export function getAmanahDecisionWorkflow(): AmanahDecisionWorkflow {
  const assessments = getAmanahOpportunityAssessments();
  const topLands = lands.filter((land) => land.status === "available");

  const landByNeighborhood = (neighborhood: string) => topLands.find((land) => land.neighborhood === neighborhood);

  const steps: AmanahWorkflowStep[] = [
    {
      id: "intake",
      title: "استلام الإشارة الاستثمارية",
      description: "تجميع الفرصة أو الفكرة أو الملاحظة السوقية في سجل واحد داخل الأمانة قبل أي طرح رسمي.",
      owner: "فريق الرصد والاستدلال",
      duration: "1-2 يوم",
    },
    {
      id: "assessment",
      title: "التقييم الداخلي الأولي",
      description: "قراءة الجاهزية والمخاطر والوضوح السوقي والحي المستهدف لتحديد أولوية المعالجة.",
      owner: "مكتب دعم القرار",
      duration: "2-4 أيام",
    },
    {
      id: "recommendation",
      title: "صياغة التوصية الإدارية",
      description: "تحويل القراءة التحليلية إلى توصية إدارية واضحة: رفع، معالجة، أو تأجيل.",
      owner: "الإدارة التنفيذية",
      duration: "1-2 يوم",
    },
    {
      id: "leadership",
      title: "الموجز القيادي والرفع",
      description: "إنتاج موجز مختصر لتمكين القيادة من اتخاذ قرار الاستمرار أو الإحالة للمسار الرسمي.",
      owner: "القيادة / مكتب الأمين",
      duration: "بحسب الأولوية",
    },
  ];

  const cases: AmanahWorkflowCase[] = assessments.slice(0, 4).map((assessment, index) => {
    const linkedLand = landByNeighborhood(assessment.neighborhood);

    if (index === 0) {
      return {
        id: assessment.id,
        title: `رفع توصية أولية بشأن ${assessment.title}`,
        neighborhood: assessment.neighborhood,
        anchorAsset: linkedLand?.name ?? `أصل بلدي قيد الدراسة في ${assessment.neighborhood}`,
        stageId: "leadership",
        stageLabel: "جاهزة للرفع القيادي",
        stageTone: "#166534",
        owner: "مكتب الأمين",
        nextAction: "استكمال موجز القرار ورفعه للقيادة متضمناً مبررات الأولوية ونقاط الضبط قبل الإحالة الرسمية.",
        readinessScore: assessment.readinessScore,
        municipalityValue: "ترفع جودة الملف المعروض على القيادة وتقلل احتمالية إحالة فرصة غير مكتملة الصياغة.",
        decisionLens: "هل تصلح هذه الفرصة للانتقال إلى القنوات الرسمية الآن، أم تحتاج ضبطاً محدوداً قبل الرفع؟",
      };
    }

    if (index === 1) {
      return {
        id: assessment.id,
        title: `صياغة توصية إدارية لفرصة ${assessment.title}`,
        neighborhood: assessment.neighborhood,
        anchorAsset: linkedLand?.name ?? `أصل بلدي قيد الدراسة في ${assessment.neighborhood}`,
        stageId: "recommendation",
        stageLabel: "تحت صياغة التوصية",
        stageTone: "#A16207",
        owner: "الإدارة التنفيذية",
        nextAction: "اعتماد التوصية الداخلية وتحديد ما إذا كان الأنسب هو الرفع، أو إعادة الصياغة، أو تأجيل الطرح.",
        readinessScore: assessment.readinessScore,
        municipalityValue: "تدعم توحيد الرأي الداخلي قبل وصول الملف إلى مستوى القيادة، وتمنع تضارب القراءة بين الإدارات المعنية.",
        decisionLens: "ما الخيار الإداري الأنسب للفرصة في وضعها الحالي: رفع، معالجة، أم تأجيل؟",
      };
    }

    if (index === 2) {
      return {
        id: assessment.id,
        title: `استكمال التقييم الداخلي لفرصة ${assessment.title}`,
        neighborhood: assessment.neighborhood,
        anchorAsset: linkedLand?.name ?? `أصل بلدي قيد الدراسة في ${assessment.neighborhood}`,
        stageId: "assessment",
        stageLabel: "تحت التقييم الداخلي",
        stageTone: "#1D4ED8",
        owner: "مكتب دعم القرار",
        nextAction: "استكمال قراءة الجاهزية والاشتراطات المحتملة وربط الفرصة بالحي والأصل المناسبين قبل كتابة التوصية.",
        readinessScore: assessment.readinessScore,
        municipalityValue: "يمنح الأمانة قراءة مبكرة للمخاطر والعوائق قبل أن تتحول إلى ملف رسمي يحتاج معالجة لاحقة.",
        decisionLens: "ما العناصر التي تحتاج إيضاحاً قبل اعتبار الملف صالحاً للصياغة الإدارية؟",
      };
    }

    return {
      id: assessment.id,
      title: `تسجيل إشارة استثمارية لفرصة ${assessment.title}`,
      neighborhood: assessment.neighborhood,
      anchorAsset: linkedLand?.name ?? `أصل بلدي قيد الدراسة في ${assessment.neighborhood}`,
      stageId: "intake",
      stageLabel: "إشارة جديدة",
      stageTone: "#0A2342",
      owner: "فريق الرصد",
      nextAction: "تثبيت بيانات الفرصة وربطها بالأصل البلدي والحي المستهدف لإدخالها في التقييم المؤسسي الأولي.",
      readinessScore: assessment.readinessScore,
      municipalityValue: "تبني سجل أولي منظم للأفكار والفرص بدلاً من تشتتها بين ملاحظات أو مبادرات غير موحدة.",
      decisionLens: "هل تستحق الإشارة الدخول في مسار تقييم داخلي، أم تحفظ للمراجعة اللاحقة؟",
    };
  });

  return { steps, cases };
}