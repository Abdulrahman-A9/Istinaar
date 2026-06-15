"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Building2,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  FileText,
  Landmark,
  LayoutDashboard,
  Layers3,
  MapPinned,
  PencilLine,
  Plus,
  RefreshCw,
  Save,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Upload,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import IntelligenceWorkspaceShell from "@/components/amanah/IntelligenceWorkspaceShell";
import { historicalMarketData } from "@/data/historicalMarket";
import { opportunities } from "@/data/opportunities";
import {
  getAmanahDecisionWorkflow,
  getAmanahLeadershipBriefs,
  getAmanahOpportunityAssessments,
  getAmanahPriorityAreas,
  getAmanahProposedOpportunities,
  getAmanahRequirementBlueprints,
} from "@/lib/amanah";
import { getOpportunityRisk } from "@/lib/opportunities";
import { useAppStore } from "@/store/appStore";

const tabs = [
  { key: "overview", label: "النظرة التنفيذية", icon: LayoutDashboard },
  { key: "opportunities", label: "الفرص الاستثمارية", icon: Target },
  { key: "spatial", label: "التحليل المكاني", icon: MapPinned },
  { key: "inference", label: "محرك الاستدلال", icon: Sparkles },
  { key: "studio", label: "استوديو القرار", icon: FileText },
  { key: "regulatory", label: "الجاهزية التنظيمية", icon: ShieldCheck },
  { key: "executive", label: "التقارير التنفيذية", icon: Landmark, badge: "قيادي" },
] as const;

type TabKey = (typeof tabs)[number]["key"];
type WorkspaceMode = "executive" | "internal";
type WorkflowState = "draft" | "analysis" | "review" | "approved" | "executive";

type InvestmentIntelligenceClientProps = {
  initialTab?: string;
};

type OpportunityRecord = {
  id: string;
  title: string;
  neighborhood: string;
  sector: string;
  roi: string;
  readinessScore: number;
  recommendation: string;
  status: WorkflowState;
};

type DossierRecord = {
  id: string;
  title: string;
  source: string;
  summary: string;
  status: WorkflowState;
};

type IndicatorRecord = {
  id: string;
  label: string;
  value: string;
};

type ExecutiveNoteRecord = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type BriefRecord = {
  id: string;
  title: string;
  summary: string;
  recommendation: string;
  indicators: string[];
  status: WorkflowState;
};

const workflowMeta: Record<
  WorkflowState,
  { label: string; tone: string; surface: string; icon: typeof Clock3 }
> = {
  draft: { label: "مسودة", tone: "#667085", surface: "#F2F4F7", icon: PencilLine },
  analysis: { label: "تحت التحليل", tone: "#B7791F", surface: "#FFF7E8", icon: RefreshCw },
  review: { label: "جاهز للمراجعة", tone: "#1D4ED8", surface: "#EEF4FF", icon: FileSpreadsheet },
  approved: { label: "معتمد داخلياً", tone: "#157347", surface: "#ECFDF3", icon: CheckCircle2 },
  executive: { label: "جاهز للعرض التنفيذي", tone: "#0B1F33", surface: "#E9DFC8", icon: Landmark },
};

function SurfaceCard({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="panel-hover rise-in rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,24,40,0.94)_0%,rgba(9,22,37,0.98)_100%)] p-5 text-white shadow-[0_16px_42px_rgba(11,31,51,0.14)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>{action}</div>
        <div className="text-right">
          {subtitle ? <p className="mb-1 font-['IBM_Plex_Sans_Arabic'] text-xs text-white/45">{subtitle}</p> : null}
          <h3 className="font-['Tajawal'] text-[1.45rem] font-black text-white">{title}</h3>
        </div>
      </div>
      {children}
    </section>
  );
}

function KpiCard({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: string;
}) {
  return (
    <div className="official-navy-surface panel-hover rise-in rounded-[1.65rem] border border-white/8 p-5 shadow-[0_18px_38px_rgba(2,10,20,0.16)]">
      <div className="mb-3 h-1.5 w-16 rounded-full" style={{ backgroundColor: tone }} />
      <p className="font-['IBM_Plex_Sans_Arabic'] text-sm font-semibold text-[#E9DFC8]/88">{label}</p>
      <p className="mt-2 font-['Tajawal'] text-[2.2rem] font-black text-white">{value}</p>
      <p className="mt-3 font-['IBM_Plex_Sans_Arabic'] text-xs leading-7 text-white/72">{note}</p>
    </div>
  );
}

function WorkflowBadge({ status }: { status: WorkflowState }) {
  const meta = workflowMeta[status];
  const Icon = meta.icon;

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
      style={{ backgroundColor: meta.surface, color: meta.tone }}
    >
      <Icon size={13} />
      {meta.label}
    </span>
  );
}

function ActionButton({
  children,
  variant = "secondary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const className = {
    primary: "bg-[#0B1F33] text-white hover:bg-[#102A43]",
    secondary: "bg-[#B6913E] text-[#0B1F33] hover:bg-[#c7a85a]",
    ghost: "border border-[rgba(11,31,51,0.1)] bg-white text-navy hover:bg-[#F7F5EF]",
  }[variant];

  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition duration-200 ${className} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export default function InvestmentIntelligenceClient({
  initialTab,
}: InvestmentIntelligenceClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAppStore((state) => state.currentUser);

  const resolvedInitialTab = tabs.some((tab) => tab.key === initialTab)
    ? (initialTab as TabKey)
    : "overview";

  const [activeTab, setActiveTab] = useState<TabKey>(resolvedInitialTab);
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>("executive");
  const [presentationMode, setPresentationMode] = useState(false);

  const assessments = useMemo(() => getAmanahOpportunityAssessments(), []);
  const proposals = useMemo(() => getAmanahProposedOpportunities(), []);
  const priorities = useMemo(() => getAmanahPriorityAreas(), []);
  const blueprints = useMemo(() => getAmanahRequirementBlueprints(), []);
  const briefs = useMemo(() => getAmanahLeadershipBriefs(), []);
  const workflow = useMemo(() => getAmanahDecisionWorkflow(), []);

  const [opportunityItems, setOpportunityItems] = useState<OpportunityRecord[]>(() =>
    assessments.slice(0, 6).map((item, index) => ({
      id: item.id,
      title: item.title,
      neighborhood: item.neighborhood,
      sector: opportunities.find((opportunity) => opportunity.id === item.id)?.category ?? "متعدد الاستخدام",
      roi: `${opportunities.find((opportunity) => opportunity.id === item.id)?.roi ?? 0}%`,
      readinessScore: item.readinessScore,
      recommendation: item.recommendation,
      status: index < 2 ? "approved" : index < 4 ? "review" : "analysis",
    }))
  );
  const [dossiers, setDossiers] = useState<DossierRecord[]>(() => [
    {
      id: "DOS-1",
      title: "كراسة سوق الأغذية الحضرية",
      source: "رفع داخلي",
      summary: "تحليل أولي يربط الكثافة السكانية وحركة المساء مع فرصة طرح مجمع غذائي متوسط الحجم.",
      status: "review",
    },
    {
      id: "DOS-2",
      title: "ملف تطوير واجهة طريق المطار",
      source: "تغذية من فريق الأصول",
      summary: "يحتاج مواءمة تنظيمية أعمق قبل اعتماده للعرض التنفيذي النهائي.",
      status: "analysis",
    },
  ]);
  const [economicIndicators, setEconomicIndicators] = useState<IndicatorRecord[]>(() =>
    historicalMarketData.slice(0, 4).map((item, index) => ({
      id: `ECO-${index + 1}`,
      label: `نمو ${item.neighborhood}`,
      value: `${item.annualGrowth}%`,
    }))
  );
  const [executiveNotes, setExecutiveNotes] = useState<ExecutiveNoteRecord[]>([
    {
      id: "NOTE-1",
      title: "ملاحظة أولويات الربع",
      content: "تركيز العروض القادمة يجب أن يبدأ من الأحياء ذات الجاهزية الأعلى مع إظهار معوقات التنظيم بشكل مباشر.",
      createdAt: "اليوم",
    },
  ]);
  const [briefings, setBriefings] = useState<BriefRecord[]>(() =>
    briefs.slice(0, 4).map((brief, index) => ({
      id: brief.id,
      title: brief.title,
      summary: brief.summary,
      recommendation: brief.recommendation,
      indicators: brief.indicators,
      status: index === 0 ? "executive" : index === 1 ? "approved" : "review",
    }))
  );
  const [analysisConfig, setAnalysisConfig] = useState({
    source: "بيانات السوق التاريخية",
    lastGenerated: "قبل 14 دقيقة",
    approved: false,
    weights: {
      readiness: 35,
      demand: 25,
      risk: 20,
      seasonality: 20,
    },
  });
  const [spatialLayerVersion, setSpatialLayerVersion] = useState(3);

  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    neighborhood: priorities[0]?.neighborhood ?? "النقرة",
    sector: "ضيافة",
    roi: "",
  });
  const [newDossierTitle, setNewDossierTitle] = useState("");
  const [newIndicator, setNewIndicator] = useState({ label: "", value: "" });
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newBriefTitle, setNewBriefTitle] = useState("");
  const [newBriefSummary, setNewBriefSummary] = useState("");

  useEffect(() => {
    setActiveTab(resolvedInitialTab);
  }, [resolvedInitialTab]);

  const topAssessment = opportunityItems[0];
  const topPriority = priorities[0];
  const topBrief = briefings[0];
  const readyCount = opportunityItems.filter((item) => item.status === "approved" || item.status === "executive").length;
  const highRiskCount = opportunities.filter((item) => getOpportunityRisk(item).score >= 55).length;
  const totalExpectedRoi = Math.round(opportunities.reduce((sum, item) => sum + item.roi, 0) / opportunities.length);
  const executiveWarnings = [
    assessments[0]?.blockers[0],
    proposals[0]?.rationale,
    workflow.cases.find((item) => item.readinessScore < 72)?.nextAction,
  ].filter(Boolean) as string[];

  const readinessDistribution = [
    { name: "معتمد", value: opportunityItems.filter((item) => item.status === "approved" || item.status === "executive").length, color: "#157347" },
    { name: "قيد المراجعة", value: opportunityItems.filter((item) => item.status === "review").length, color: "#1D4ED8" },
    { name: "تحت التحليل", value: opportunityItems.filter((item) => item.status === "analysis" || item.status === "draft").length, color: "#B7791F" },
  ];

  const riskDistribution = opportunities.slice(0, 5).map((item) => ({
    name: item.title.split(" ").slice(0, 2).join(" "),
    value: getOpportunityRisk(item).score,
  }));

  const regulatorySummary = useMemo(() => {
    const ready = blueprints.filter((item) => item.readinessScore >= 82);
    const medium = blueprints.filter((item) => item.readinessScore >= 68 && item.readinessScore < 82);
    const blocked = blueprints.filter((item) => item.readinessScore < 68);
    const averageReadiness = blueprints.length
      ? Math.round(blueprints.reduce((sum, item) => sum + item.readinessScore, 0) / blueprints.length)
      : 0;

    const blockerCounts = blueprints
      .flatMap((item) =>
        item.checklist
          .filter((check) => !check.complete)
          .map((check) => check.label)
      )
      .reduce<Record<string, number>>((accumulator, blocker) => {
        accumulator[blocker] = (accumulator[blocker] ?? 0) + 1;
        return accumulator;
      }, {});

    const recurringBlockers = Object.entries(blockerCounts)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 3)
      .map(([label, count]) => ({ label, count }));

    const fastest = [...blueprints].sort((left, right) => left.estimatedDurationDays - right.estimatedDurationDays)[0];
    const highestValue = [...blueprints].sort((left, right) => right.strategicValueScore - left.strategicValueScore)[0];
    const mostBlocked = [...blueprints].sort((left, right) => left.readinessScore - right.readinessScore)[0];
    const immediate = [...blueprints]
      .filter((item) => item.decisionAction === "ارفع الآن")
      .sort((left, right) => right.readinessScore - left.readinessScore)[0] ?? fastest;

    return {
      ready,
      medium,
      blocked,
      averageReadiness,
      recurringBlockers,
      priorityCards: [
        {
          title: "أسرع فرصة يمكن تجهيزها",
          item: fastest,
          note: fastest ? `تصل للجاهزية الكاملة خلال ${fastest.estimatedDurationLabel}.` : "",
        },
        {
          title: "أعلى فرصة قيمة",
          item: highestValue,
          note: highestValue ? `قيمة استراتيجية ${highestValue.strategicValueScore}% مع توصية ${highestValue.decisionAction}.` : "",
        },
        {
          title: "أكثر فرصة تعثراً",
          item: mostBlocked,
          note: mostBlocked ? `أهم سبب تعثر: ${mostBlocked.mainDelayReason}` : "",
        },
        {
          title: "أفضل فرصة للاستثمار الفوري",
          item: immediate,
          note: immediate ? `القرار الحالي: ${immediate.decisionAction}.` : "",
        },
      ],
    };
  }, [blueprints]);

  const spatialComparison = priorities.slice(0, 5).map((item) => ({
    name: item.neighborhood,
    demand: item.demandLevel,
    competition: item.competitionLevel,
  }));

  const economicSeries = economicIndicators.map((item) => ({
    name: item.label.replace("نمو ", ""),
    value: Number(item.value.replace("%", "")) || 0,
  }));

  const workflowStatusSummary = [
    { label: "مسودات", value: opportunityItems.filter((item) => item.status === "draft").length },
    { label: "تحليل", value: opportunityItems.filter((item) => item.status === "analysis").length },
    { label: "مراجعة", value: opportunityItems.filter((item) => item.status === "review").length },
    { label: "معتمد", value: opportunityItems.filter((item) => item.status === "approved").length },
    { label: "جاهز للعرض", value: opportunityItems.filter((item) => item.status === "executive").length },
  ];

  const workspaceItems = [
    { key: "admin", label: "إدارة الأمانة", icon: Building2, href: "/admin" },
    { key: "intelligence", label: "لوحة الذكاء الاستثماري", icon: Landmark, href: "/investment-intelligence", isActive: true },
    { key: "account", label: "الحساب", icon: LayoutDashboard, href: "/account" },
  ];

  const moduleItems = tabs.map((tab) => ({
    ...tab,
    isActive: activeTab === tab.key,
    onSelect: () => {
      setActiveTab(tab.key);
      router.replace(`${pathname}?tab=${tab.key}`);
    },
  }));

  const filters = [
    { label: "المنطقة", value: "حائل" },
    { label: "الموسم", value: "الربع الحالي" },
    { label: "الوضع", value: workspaceMode === "executive" ? "قراءة تنفيذية" : "عمل داخلي" },
    { label: "الحالة", value: "7 تبويبات فقط داخل اللوحة" },
  ];

  const selectOpportunityStatus = (id: string, status: WorkflowState) => {
    setOpportunityItems((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const selectBriefStatus = (id: string, status: WorkflowState) => {
    setBriefings((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const addOpportunity = () => {
    if (!newOpportunity.title.trim() || !newOpportunity.roi.trim()) {
      return;
    }

    setOpportunityItems((current) => [
      {
        id: `NEW-${Date.now()}`,
        title: newOpportunity.title,
        neighborhood: newOpportunity.neighborhood,
        sector: newOpportunity.sector,
        roi: `${newOpportunity.roi.replace("%", "")}%`,
        readinessScore: 68,
        recommendation: "أضيفت كمسودة وتحتاج إسناد التحليل الأولي قبل اعتمادها للمراجعة.",
        status: "draft",
      },
      ...current,
    ]);

    setNewOpportunity({
      title: "",
      neighborhood: priorities[0]?.neighborhood ?? "النقرة",
      sector: "ضيافة",
      roi: "",
    });
  };

  const uploadDossier = () => {
    if (!newDossierTitle.trim()) {
      return;
    }

    setDossiers((current) => [
      {
        id: `DOS-${Date.now()}`,
        title: newDossierTitle,
        source: "رفع داخلي",
        summary: "تمت إضافة الملف بانتظار التحليل المختصر وربطه بمسار القرار.",
        status: "analysis",
      },
      ...current,
    ]);
    setNewDossierTitle("");
  };

  const addIndicator = () => {
    if (!newIndicator.label.trim() || !newIndicator.value.trim()) {
      return;
    }

    setEconomicIndicators((current) => [
      { id: `IND-${Date.now()}`, label: newIndicator.label, value: newIndicator.value },
      ...current,
    ]);
    setNewIndicator({ label: "", value: "" });
  };

  const addExecutiveNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      return;
    }

    setExecutiveNotes((current) => [
      { id: `NOTE-${Date.now()}`, title: newNoteTitle, content: newNoteContent, createdAt: "الآن" },
      ...current,
    ]);
    setNewNoteTitle("");
    setNewNoteContent("");
  };

  const createBrief = () => {
    if (!newBriefTitle.trim() || !newBriefSummary.trim()) {
      return;
    }

    setBriefings((current) => [
      {
        id: `BRIEF-${Date.now()}`,
        title: newBriefTitle,
        summary: newBriefSummary,
        recommendation: "يحال للمراجعة الداخلية قبل تثبيته ضمن العرض القيادي.",
        indicators: ["جاهزية أولية", "يحتاج اعتماد"],
        status: "review",
      },
      ...current,
    ]);
    setNewBriefTitle("");
    setNewBriefSummary("");
  };

  const regenerateInference = () => {
    setAnalysisConfig((current) => ({ ...current, lastGenerated: "الآن" }));
  };

  const approveInference = () => {
    setAnalysisConfig((current) => ({ ...current, approved: true }));
  };

  const updateSpatialLayer = () => {
    setSpatialLayerVersion((current) => current + 1);
  };

  if (!currentUser || currentUser.role !== "authority") {
    return (
      <div className="min-h-screen px-4 py-12" style={{ background: "linear-gradient(180deg, #F7F5EF 0%, #EEF1F4 100%)" }}>
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] p-8 text-white" style={{ background: "linear-gradient(135deg, #071726 0%, #0B1F33 58%, #102A43 100%)" }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "rgba(182,145,62,0.16)", color: "#E9DFC8" }}>
              <Landmark size={16} />
              لوحة الذكاء الاستثماري
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight">منصة القرار والتحليل والاستدلال الاستثماري للأمانة</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/75">
              هذه المساحة مخصصة للحسابات الداخلية المخولة، وتجمع التحليل، إدخال القرار، اعتماد التوصيات، وتجهيز العرض التنفيذي داخل تجربة واحدة واضحة.
            </p>
          </section>

          <section className="rounded-[2rem] border border-[rgba(11,31,51,0.08)] bg-white p-8 text-right shadow-[0_20px_60px_rgba(11,31,51,0.08)]">
            <p className="text-xs text-slate-400">Investment Intelligence Access</p>
            <h2 className="mt-2 text-2xl font-black text-navy">الوصول يتطلب حساب أمانة مخول</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              ادخل أولاً من الحساب الموحد أو انتقل مباشرة إلى إدارة الأمانة، ثم افتح لوحة الذكاء الاستثماري من المسار الداخلي المعتمد.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <Link href="/account" className="btn-gold">الحساب الموحد</Link>
              <Link href="/admin" className="btn-primary">إدارة الأمانة</Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <IntelligenceWorkspaceShell
      title="لوحة الذكاء الاستثماري"
      subtitle={tabs.find((tab) => tab.key === activeTab)?.label ?? "النظرة التنفيذية"}
      description="مساحة موحدة للقرار الاستثماري تجمع الفرص، التحليل المكاني، الاستدلال، الجاهزية التنظيمية، والتقارير التنفيذية مع طبقة تشغيل خفيفة لا تربك المسؤولين."
      eyebrow="استنار | منصة الذكاء الاستثماري ودعم القرار"
      commandLabel="الوضع الحالي"
      commandValue={workspaceMode === "executive" ? "قراءة تنفيذية للمسؤولين" : "عمل داخلي للمختصين"}
      statusTitle="الهيكل الجديد مختصر وواضح"
      statusDescription="7 تبويبات فقط داخل اللوحة، وكل أعمال الإدخال والتحرير والاعتماد مضمنة داخل الصفحات بدلاً من تضخيم النظام بأقسام زائدة."
      statusBadge="V3"
      workspaceItems={workspaceItems}
      moduleItems={moduleItems}
      filters={filters}
      actionArea={
        <div className="space-y-3">
          <div className="flex flex-wrap justify-end gap-2">
            <ActionButton
              variant={workspaceMode === "executive" ? "secondary" : "ghost"}
              onClick={() => setWorkspaceMode("executive")}
            >
              وضع القراءة التنفيذية
            </ActionButton>
            <ActionButton
              variant={workspaceMode === "internal" ? "secondary" : "ghost"}
              onClick={() => setWorkspaceMode("internal")}
            >
              وضع العمل الداخلي
            </ActionButton>
          </div>
          {activeTab === "executive" ? (
            <div className="flex justify-end">
              <ActionButton
                variant={presentationMode ? "primary" : "ghost"}
                onClick={() => setPresentationMode((current) => !current)}
              >
                <Landmark size={16} />
                {presentationMode ? "إيقاف وضع الاجتماعات" : "تفعيل وضع الاجتماعات"}
              </ActionButton>
            </div>
          ) : null}
        </div>
      }
    >
      <div className={`space-y-6 ${presentationMode && activeTab === "executive" ? "mx-auto max-w-5xl" : ""}`}>
        {activeTab === "overview" && (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <KpiCard label="الفرص الجاهزة للتقدم" value={`${readyCount}`} note="فرص عبرت المراجعة الأولية أو أصبحت جاهزة للعرض التنفيذي." tone="#157347" />
              <KpiCard label="متوسط ROI المتوقع" value={`${totalExpectedRoi}%`} note="مبني على متوسط العوائد للفرص الاستثمارية الحالية في المنصة." tone="#B6913E" />
              <KpiCard label="الأحياء ذات الأولوية" value={`${priorities.filter((item) => item.priorityScore >= 80).length}`} note="أحياء تستحق المعالجة المباشرة لارتفاع الطلب وانخفاض المنافسة النسبية." tone="#0B1F33" />
              <KpiCard label="الفرص عالية المخاطر" value={`${highRiskCount}`} note="تحتاج معالجة تنظيمية أو إعادة ضبط في الطرح قبل العرض القيادي." tone="#B42318" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <SurfaceCard title="ملخص القرار الحالي" subtitle="ما الذي تغير فعلاً؟">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.4rem] bg-[#F7F5EF] p-4 text-right">
                    <p className="text-xs text-slate-500">أقوى فرصة حالياً</p>
                    <h4 className="mt-2 text-xl font-black text-navy">{topAssessment?.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{topAssessment?.recommendation}</p>
                    <div className="mt-4 flex justify-end">
                      <WorkflowBadge status={topAssessment?.readinessScore && topAssessment.readinessScore >= 82 ? "approved" : "review"} />
                    </div>
                  </div>
                  <div className="rounded-[1.4rem] bg-[#F7F5EF] p-4 text-right">
                    <p className="text-xs text-slate-500">أولوية الحي</p>
                    <h4 className="mt-2 text-xl font-black text-navy">{topPriority?.neighborhood}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{topPriority?.note}</p>
                    <p className="mt-4 text-sm font-black text-[#B6913E]">مؤشر الأولوية {topPriority?.priorityScore}%</p>
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard title="تنبيهات تستحق العرض" subtitle="مختصرة وواضحة" action={<Bell className="text-[#B6913E]" size={18} />}>
                <div className="space-y-3">
                  {executiveWarnings.map((warning) => (
                    <div key={warning} className="rounded-[1.2rem] border border-[rgba(180,35,24,0.12)] bg-[#FFF8F6] p-4 text-right">
                      <div className="flex items-start justify-between gap-3">
                        <AlertTriangle className="mt-1 text-[#B42318]" size={16} />
                        <p className="text-sm leading-7 text-slate-700">{warning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <SurfaceCard title="توزيع الجاهزية" subtitle="حالة المسار داخل اللوحة">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={readinessDistribution} dataKey="value" nameKey="name" innerRadius={65} outerRadius={92}>
                        {readinessDistribution.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {readinessDistribution.map((entry) => (
                    <div key={entry.name} className="rounded-[1.2rem] bg-[#F7F5EF] p-3 text-right">
                      <p className="text-xs text-slate-500">{entry.name}</p>
                      <p className="mt-1 text-xl font-black text-navy">{entry.value}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard title="نبض المؤشرات الاقتصادية" subtitle="أقل عدد ممكن من المؤشرات ذات القيمة">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={economicSeries}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#0B1F33" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SurfaceCard>
            </div>
          </>
        )}

        {activeTab === "opportunities" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {workflowStatusSummary.map((item) => (
                <div key={item.label} className="panel-hover rounded-[1.2rem] border border-[rgba(11,31,51,0.08)] bg-[#FFFEFC] px-4 py-4 text-right">
                  <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                  <p className="mt-2 text-3xl font-black text-navy">{item.value}</p>
                </div>
              ))}
            </div>

            <div className={`grid gap-6 ${workspaceMode === "internal" ? "xl:grid-cols-[0.95fr_1.05fr]" : "xl:grid-cols-1"}`}>
              {workspaceMode === "internal" ? (
                <SurfaceCard title="إضافة فرصة جديدة" subtitle="الإدخال جزء من الصفحة نفسها" action={<Plus className="text-[#B6913E]" size={18} />}>
                  <div className="grid gap-3">
                    <input value={newOpportunity.title} onChange={(event) => setNewOpportunity((current) => ({ ...current, title: event.target.value }))} placeholder="اسم الفرصة" className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                    <div className="grid gap-3 md:grid-cols-2">
                      <select value={newOpportunity.neighborhood} onChange={(event) => setNewOpportunity((current) => ({ ...current, neighborhood: event.target.value }))} className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right">
                        {priorities.slice(0, 6).map((item) => (
                          <option key={item.neighborhood} value={item.neighborhood}>{item.neighborhood}</option>
                        ))}
                      </select>
                      <input value={newOpportunity.roi} onChange={(event) => setNewOpportunity((current) => ({ ...current, roi: event.target.value }))} placeholder="ROI المتوقع" className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                    </div>
                    <input value={newOpportunity.sector} onChange={(event) => setNewOpportunity((current) => ({ ...current, sector: event.target.value }))} placeholder="القطاع" className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                    <div className="flex justify-end">
                      <ActionButton variant="primary" onClick={addOpportunity}>
                        <Plus size={15} />
                        إضافة الفرصة
                      </ActionButton>
                    </div>
                  </div>
                </SurfaceCard>
              ) : null}

              <SurfaceCard title="ملخص القرار الجاري" subtitle="الفرصة الأبرز وما يلزمها قبل الإحالة">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.3rem] bg-[#F7F5EF] p-4 text-right">
                    <div className="flex items-center justify-between gap-3">
                      <WorkflowBadge status={topAssessment?.readinessScore && topAssessment.readinessScore >= 82 ? "approved" : "review"} />
                      <h4 className="text-lg font-black text-navy">{topAssessment?.title}</h4>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{topAssessment?.recommendation}</p>
                  </div>
                  <div className="rounded-[1.3rem] bg-[#F7F5EF] p-4 text-right">
                    <p className="text-sm font-black text-navy">لماذا هذا المسار واضح؟</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">كل فرصة هنا مرتبطة بحالة workflow واضحة، وإجراء مباشر، ومؤشر جاهزية مفهوم دون ترك فراغات أو مسارات مبهمة.</p>
                  </div>
                </div>
              </SurfaceCard>
            </div>

            <SurfaceCard title="سجل الفرص الاستثمارية" subtitle="بطاقات متوازنة تستغل العرض بالكامل">
              <div className="grid gap-4 xl:grid-cols-2">
                {opportunityItems.map((item) => (
                  <div key={item.id} className="rounded-[1.35rem] border border-[rgba(11,31,51,0.08)] bg-[#FFFEFC] p-4">
                    <div className="text-right">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {workspaceMode === "internal" ? (
                            <>
                              <ActionButton variant="ghost" onClick={() => selectOpportunityStatus(item.id, "analysis")}>
                                <RefreshCw size={15} />
                                تحليل
                              </ActionButton>
                              <ActionButton variant="ghost" onClick={() => selectOpportunityStatus(item.id, "review")}>
                                <FileSpreadsheet size={15} />
                                مراجعة
                              </ActionButton>
                              <ActionButton variant="secondary" onClick={() => selectOpportunityStatus(item.id, "approved")}>
                                <CheckCircle2 size={15} />
                                اعتماد
                              </ActionButton>
                            </>
                          ) : null}
                        </div>
                        <div className="flex items-center justify-end gap-3">
                          <WorkflowBadge status={item.status} />
                          <h3 className="text-lg font-black text-navy">{item.title}</h3>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{item.neighborhood} • {item.sector} • ROI {item.roi}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.recommendation}</p>
                      <div className="mt-4 flex justify-between rounded-[1rem] bg-[#F7F5EF] px-4 py-3 text-sm font-semibold text-slate-600">
                        <span>{item.neighborhood}</span>
                        <span>جاهزية {item.readinessScore}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>
        )}

        {activeTab === "spatial" && (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <SurfaceCard title="تركيز الأولويات المكانية" subtitle="عرض نظيف يجيب أين نتحرك أولاً">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spatialComparison}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="demand" name="الطلب" radius={[10, 10, 0, 0]} fill="#0B1F33" />
                    <Bar dataKey="competition" name="المنافسة" radius={[10, 10, 0, 0]} fill="#B6913E" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid gap-3">
                {priorities.slice(0, 4).map((item) => (
                  <div key={item.neighborhood} className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-black text-[#B6913E]">{item.priorityScore}%</p>
                      <h4 className="text-base font-black text-navy">{item.neighborhood}</h4>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <div className="space-y-6">
              <SurfaceCard title="طبقات التحليل المكاني" subtitle="تحديث الطبقة يظل فعلاً داخل الصفحة" action={<Layers3 className="text-[#B6913E]" size={18} />}>
                <div className="space-y-3 text-right">
                  <div className="rounded-[1.2rem] bg-[#F7F5EF] p-4">
                    <p className="text-xs text-slate-500">نسخة الطبقة الحالية</p>
                    <p className="mt-1 text-2xl font-black text-navy">V{spatialLayerVersion}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">تتضمن الطلب، المنافسة، الموسمية، وربط الأصول البلدية القريبة.</p>
                  </div>
                  {workspaceMode === "internal" ? (
                    <div className="flex justify-end">
                      <ActionButton variant="primary" onClick={updateSpatialLayer}>
                        <MapPinned size={15} />
                        تحديث طبقة الحي
                      </ActionButton>
                    </div>
                  ) : null}
                </div>
              </SurfaceCard>

              <SurfaceCard title="حلول مباشرة للمسؤول" subtitle="لا نعرض خريطة استعراضية بلا قرار">
                <div className="space-y-3">
                  <div className="rounded-[1.2rem] border border-[rgba(11,31,51,0.08)] p-4 text-right">
                    <p className="text-sm font-black text-navy">أين نبدأ؟</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">البدء من {topPriority?.neighborhood} لأن الطلب مرتفع والمنافسة قابلة للإدارة.</p>
                  </div>
                  <div className="rounded-[1.2rem] border border-[rgba(11,31,51,0.08)] p-4 text-right">
                    <p className="text-sm font-black text-navy">ما الذي نؤجله؟</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">تأجيل الأحياء ذات التشبع المرتفع حتى يكتمل تحديث القراءة التنظيمية والبدائل القطاعية.</p>
                  </div>
                </div>
              </SurfaceCard>
            </div>
          </div>
        )}

        {activeTab === "inference" && (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <SurfaceCard title="مخرجات محرك الاستدلال" subtitle="توصيات مفهومة مع سبب واضح">
              <div className="space-y-4">
                {proposals.slice(0, 4).map((item) => (
                  <div key={item.id} className="rounded-[1.35rem] border border-[rgba(11,31,51,0.08)] bg-[#FFFEFC] p-4 text-right">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-black text-[#B6913E]">{item.demandScore}% طلب</p>
                      <h3 className="text-lg font-black text-navy">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{item.neighborhood} • أصل مرجعي: {item.anchorAsset}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.rationale}</p>
                    <p className="mt-3 text-sm font-semibold text-slate-600">{item.expectedImpact}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <div className="space-y-6">
              <SurfaceCard title="إدارة التحليلات" subtitle="القدرة الثانية مدمجة هنا، لا كقسم مستقل" action={<SlidersHorizontal className="text-[#B6913E]" size={18} />}>
                <div className="space-y-4 text-right">
                  <div className="rounded-[1.2rem] bg-[#F7F5EF] p-4">
                    <p className="text-xs text-slate-500">مصدر التقييم</p>
                    <p className="mt-1 text-base font-black text-navy">{analysisConfig.source}</p>
                    <p className="mt-2 text-sm text-slate-600">آخر إعادة توليد: {analysisConfig.lastGenerated}</p>
                  </div>

                  {workspaceMode === "internal" ? (
                    <>
                      <select value={analysisConfig.source} onChange={(event) => setAnalysisConfig((current) => ({ ...current, source: event.target.value }))} className="w-full rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right">
                        <option>بيانات السوق التاريخية</option>
                        <option>البيانات المكانية</option>
                        <option>قراءة الأصول البلدية</option>
                      </select>

                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="rounded-[1.2rem] bg-[#F7F5EF] p-3 text-right text-sm">
                          <span className="mb-2 block font-bold text-navy">وزن الجاهزية</span>
                          <input type="number" value={analysisConfig.weights.readiness} onChange={(event) => setAnalysisConfig((current) => ({ ...current, weights: { ...current.weights, readiness: Number(event.target.value) || 0 } }))} className="w-full rounded-xl border border-[rgba(11,31,51,0.1)] bg-white px-3 py-2 text-right" />
                        </label>
                        <label className="rounded-[1.2rem] bg-[#F7F5EF] p-3 text-right text-sm">
                          <span className="mb-2 block font-bold text-navy">وزن الطلب</span>
                          <input type="number" value={analysisConfig.weights.demand} onChange={(event) => setAnalysisConfig((current) => ({ ...current, weights: { ...current.weights, demand: Number(event.target.value) || 0 } }))} className="w-full rounded-xl border border-[rgba(11,31,51,0.1)] bg-white px-3 py-2 text-right" />
                        </label>
                      </div>

                      <div className="flex flex-wrap justify-end gap-2">
                        <ActionButton variant="ghost" onClick={regenerateInference}>
                          <RefreshCw size={15} />
                          إعادة توليد الاستدلال
                        </ActionButton>
                        <ActionButton variant="secondary" onClick={approveInference}>
                          <Save size={15} />
                          اعتماد التوصية
                        </ActionButton>
                      </div>
                    </>
                  ) : null}

                  <div className="rounded-[1.2rem] border border-[rgba(11,31,51,0.08)] p-4">
                    <p className="text-sm font-black text-navy">الحالة الحالية</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {analysisConfig.approved
                        ? "تم اعتماد التوصية الحالية داخلياً ويمكن حفظها داخل الـ briefing التنفيذي."
                        : "التوصية الحالية ما زالت بحاجة اعتماد داخلي قبل تصعيدها إلى العرض التنفيذي."}
                    </p>
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard title="المخاطر المقارنة" subtitle="فقط ما يخدم القرار">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskDistribution}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#B42318" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SurfaceCard>
            </div>
          </div>
        )}

        {activeTab === "studio" && (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <SurfaceCard title="الكراسات والملفات" subtitle="رفع ملف وتحويله إلى مسار قرار" action={<Upload className="text-[#B6913E]" size={18} />}>
                {workspaceMode === "internal" ? (
                  <div className="mb-4 grid gap-3">
                    <input value={newDossierTitle} onChange={(event) => setNewDossierTitle(event.target.value)} placeholder="اسم الكراسة أو الملف" className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                    <div className="flex justify-end">
                      <ActionButton variant="primary" onClick={uploadDossier}>
                        <Upload size={15} />
                        رفع ملف جديد
                      </ActionButton>
                    </div>
                  </div>
                ) : null}
                <div className="space-y-3">
                  {dossiers.map((item) => (
                    <div key={item.id} className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                      <div className="flex items-center justify-between gap-3">
                        <WorkflowBadge status={item.status} />
                        <h4 className="text-base font-black text-navy">{item.title}</h4>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{item.source}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard title="ملاحظات تنفيذية" subtitle="مدخلة داخل اللوحة لا في قسم زائد">
                {workspaceMode === "internal" ? (
                  <div className="mb-4 grid gap-3">
                    <input value={newNoteTitle} onChange={(event) => setNewNoteTitle(event.target.value)} placeholder="عنوان الملاحظة" className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                    <textarea value={newNoteContent} onChange={(event) => setNewNoteContent(event.target.value)} placeholder="الملاحظة التنفيذية" rows={4} className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                    <div className="flex justify-end">
                      <ActionButton variant="secondary" onClick={addExecutiveNote}>
                        <Save size={15} />
                        حفظ الملاحظة
                      </ActionButton>
                    </div>
                  </div>
                ) : null}
                <div className="space-y-3">
                  {executiveNotes.map((item) => (
                    <div key={item.id} className="rounded-[1.2rem] border border-[rgba(11,31,51,0.08)] p-4 text-right">
                      <p className="text-xs text-slate-500">{item.createdAt}</p>
                      <h4 className="mt-1 text-base font-black text-navy">{item.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.content}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </div>

            <div className="space-y-6">
              <SurfaceCard title="المؤشرات الاقتصادية المستخدمة" subtitle="إضافة مؤشر واحد مفيد خير من عشرة بلا أثر">
                {workspaceMode === "internal" ? (
                  <div className="mb-4 grid gap-3 md:grid-cols-2">
                    <input value={newIndicator.label} onChange={(event) => setNewIndicator((current) => ({ ...current, label: event.target.value }))} placeholder="اسم المؤشر" className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                    <input value={newIndicator.value} onChange={(event) => setNewIndicator((current) => ({ ...current, value: event.target.value }))} placeholder="القيمة" className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                    <div className="md:col-span-2 flex justify-end">
                      <ActionButton variant="primary" onClick={addIndicator}>
                        <Plus size={15} />
                        إضافة مؤشر اقتصادي
                      </ActionButton>
                    </div>
                  </div>
                ) : null}
                <div className="grid gap-3 md:grid-cols-2">
                  {economicIndicators.map((item) => (
                    <div key={item.id} className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="mt-2 text-2xl font-black text-navy">{item.value}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard title="ما الذي يقدمه استوديو القرار؟" subtitle="وظيفة مباشرة وليست استعراضاً">
                <div className="grid gap-3">
                  <div className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                    <p className="text-sm font-black text-navy">يوحد الإدخال</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">رفع الملفات، إضافة المؤشرات، وتسجيل الملاحظات التنفيذية في صفحة واحدة فقط.</p>
                  </div>
                  <div className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                    <p className="text-sm font-black text-navy">يحفظ النظام نظيفاً</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">بدلاً من ثلاث أو أربع أقسام فرعية، صارت كل أدوات الإدخال في مكان واحد مرتب.</p>
                  </div>
                </div>
              </SurfaceCard>
            </div>
          </div>
        )}

        {activeTab === "regulatory" && (
          <div className="grid gap-6">
            <SurfaceCard title="مركز جاهزية القرار التنظيمي" subtitle="Decision Readiness Center">
              <div className="grid gap-4 xl:grid-cols-5">
                {[
                  { label: "جاهزة للرفع", value: regulatorySummary.ready.length, tone: "#166534", surface: "#ECFDF3", icon: CheckCircle2 },
                  { label: "جاهزية متوسطة", value: regulatorySummary.medium.length, tone: "#A16207", surface: "#FFF7E8", icon: Clock3 },
                  { label: "متعثرة", value: regulatorySummary.blocked.length, tone: "#B91C1C", surface: "#FEF2F2", icon: AlertTriangle },
                  { label: "متوسط الجاهزية", value: `${regulatorySummary.averageReadiness}%`, tone: "#0B1F33", surface: "#EEF4FF", icon: SlidersHorizontal },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-[1.35rem] border border-[rgba(11,31,51,0.08)] bg-[#FFFEFC] p-4 text-right">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-2xl p-2.5" style={{ backgroundColor: item.surface, color: item.tone }}>
                          <Icon size={18} />
                        </span>
                        <p className="text-2xl font-black" style={{ color: item.tone }}>{item.value}</p>
                      </div>
                      <p className="mt-4 text-sm font-bold text-navy">{item.label}</p>
                    </div>
                  );
                })}

                <div className="rounded-[1.35rem] border border-[rgba(11,31,51,0.08)] bg-[#FFFEFC] p-4 text-right xl:col-span-1">
                  <p className="text-sm font-black text-navy">أهم المعوقات المتكررة</p>
                  <div className="mt-4 space-y-2">
                    {regulatorySummary.recurringBlockers.map((blocker) => (
                      <div key={blocker.label} className="flex items-center justify-between rounded-xl bg-[#F7F5EF] px-3 py-2">
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#B45309]">{blocker.count}</span>
                        <p className="text-xs font-semibold text-slate-600">{blocker.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard title="أولوية المعالجة" subtitle="من أين تبدأ الأمانة؟">
              <div className="grid gap-4 xl:grid-cols-4">
                {regulatorySummary.priorityCards.map((card) => (
                  <div key={card.title} className="rounded-[1.35rem] border border-[rgba(11,31,51,0.08)] bg-[#FFFEFC] p-4 text-right">
                    <p className="text-xs font-bold text-[#B6913E]">{card.title}</p>
                    <h3 className="mt-2 text-base font-black text-navy">{card.item?.opportunityTitle ?? "لا توجد بيانات"}</h3>
                    <p className="mt-2 text-sm text-slate-500">{card.item?.neighborhood}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${card.item?.readinessTone ?? "#0B1F33"}16`, color: card.item?.readinessTone ?? "#0B1F33" }}>
                        {card.item?.readinessScore ?? 0}%
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{card.item?.decisionAction}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{card.note}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <div className="grid gap-5 xl:grid-cols-2">
              {blueprints.map((item) => (
                <div key={item.opportunityId} className="rounded-[1.6rem] border border-[rgba(11,31,51,0.08)] bg-[#FFFEFC] p-5 text-right shadow-[0_16px_42px_rgba(11,31,51,0.05)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-left">
                      <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${item.readinessTone}16`, color: item.readinessTone }}>
                        {item.readinessLabel}
                        <span>{item.readinessScore}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-[#B6913E]">{item.neighborhood}</p>
                      <h3 className="mt-1 text-lg font-black text-navy">{item.opportunityTitle}</h3>
                      <p className="mt-2 text-sm text-slate-500">استنار يقيّم الجاهزية ويقترح الإجراء، ولا ينفذ الموافقات الرسمية.</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.25rem] bg-[#F7F5EF] p-4">
                      <p className="text-xs text-slate-500">قرار الجاهزية</p>
                      <p className="mt-2 text-sm font-black" style={{ color: item.readinessTone }}>{item.decisionAction}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-[#F7F5EF] p-4">
                      <p className="text-xs text-slate-500">مستوى المخاطر</p>
                      <p className="mt-2 text-sm font-black" style={{ color: item.riskTone }}>{item.riskLabel}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-[#F7F5EF] p-4">
                      <p className="text-xs text-slate-500">المدة المتوقعة للجاهزية الكاملة</p>
                      <p className="mt-2 text-sm font-black text-navy">{item.estimatedDurationLabel}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-[rgba(22,101,52,0.14)] bg-[#F6FCF8] p-4">
                      <p className="text-sm font-black text-[#166534]">العوامل الإيجابية</p>
                      <div className="mt-3 space-y-2">
                        {item.positiveFactors.map((factor) => (
                          <div key={factor} className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#166534]" />
                            <p className="text-sm leading-7 text-slate-600">{factor}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.25rem] border border-[rgba(185,28,28,0.14)] bg-[#FFF7F7] p-4">
                      <p className="text-sm font-black text-[#B91C1C]">العوامل المعيقة</p>
                      <div className="mt-3 space-y-2">
                        {item.blockingFactors.map((factor) => (
                          <div key={factor} className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2">
                            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#B91C1C]" />
                            <p className="text-sm leading-7 text-slate-600">{factor}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="rounded-[1.25rem] border border-[rgba(11,31,51,0.08)] bg-[#F9FBFD] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${item.riskTone}16`, color: item.riskTone }}>
                          {item.riskLabel}
                        </span>
                        <p className="text-sm font-black text-navy">تقييم المخاطر</p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.riskReason}</p>

                      <div className="mt-4 rounded-xl bg-white p-3">
                        <p className="text-xs text-slate-500">سبب التأخير الرئيسي</p>
                        <p className="mt-2 text-sm font-bold text-navy">{item.mainDelayReason}</p>
                      </div>

                      <div className="mt-4 rounded-xl bg-white p-3">
                        <p className="text-xs text-slate-500">التوصية التنفيذية</p>
                        <p className="mt-2 text-sm font-bold text-navy">{item.recommendation}</p>
                      </div>
                    </div>

                    <div className="rounded-[1.25rem] border border-[rgba(11,31,51,0.08)] bg-[#F9FBFD] p-4">
                      <p className="text-sm font-black text-navy">قائمة متطلبات الاستكمال</p>
                      <div className="mt-3 space-y-2">
                        {item.checklist.map((check) => (
                          <div key={check.label} className="rounded-xl bg-white px-3 py-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs font-bold" style={{ color: check.complete ? "#166534" : "#B91C1C" }}>
                                {check.complete ? "مكتمل" : "غير مكتمل"}
                              </span>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-navy">{check.label}</p>
                                <span className="text-base" style={{ color: check.complete ? "#166534" : "#B91C1C" }}>
                                  {check.complete ? "☑" : "☐"}
                                </span>
                              </div>
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-600">{check.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "executive" && (
          <div className={`grid gap-6 ${presentationMode ? "xl:grid-cols-1" : "xl:grid-cols-[1fr_1fr]"}`}>
            <div className="space-y-6">
              <SurfaceCard title="ملخصات القيادة" subtitle="هنا تم دمج العرض التنفيذي داخل اللوحة">
                <div className="space-y-4">
                  {briefings.map((item) => (
                    <div key={item.id} className="rounded-[1.35rem] border border-[rgba(11,31,51,0.08)] bg-[#FFFEFC] p-4 text-right">
                      <div className="flex items-center justify-between gap-3">
                        {workspaceMode === "internal" ? (
                          <div className="flex gap-2">
                            <ActionButton variant="ghost" onClick={() => selectBriefStatus(item.id, "approved")}>
                              <Save size={15} />
                              اعتماد
                            </ActionButton>
                            <ActionButton variant="secondary" onClick={() => selectBriefStatus(item.id, "executive")}>
                              <Send size={15} />
                              إرسال للإدارة
                            </ActionButton>
                          </div>
                        ) : null}
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-3">
                            <WorkflowBadge status={item.status} />
                            <h3 className="text-lg font-black text-navy">{item.title}</h3>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                          <p className="mt-3 text-sm font-semibold text-[#0B1F33]">{item.recommendation}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap justify-end gap-2">
                        {item.indicators.map((indicator) => (
                          <span key={indicator} className="rounded-full bg-[#F7F5EF] px-3 py-1 text-xs font-semibold text-slate-600">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              {presentationMode ? (
                <SurfaceCard title="وضع الاجتماعات" subtitle="سردية قرار مختصرة للمسؤولين">
                  <div className="space-y-4 text-right">
                    <div className="rounded-[1.3rem] bg-[#F7F5EF] p-5">
                      <p className="text-sm font-black text-navy">لماذا المنصة مهمة الآن؟</p>
                      <p className="mt-3 text-sm leading-8 text-slate-600">لأنها تختصر الانتقال من البيانات المتفرقة إلى قرار استثماري واحد: فرصة، حي، جاهزية، توصية، ثم brief جاهز للعرض.</p>
                    </div>
                    <div className="rounded-[1.3rem] bg-[#F7F5EF] p-5">
                      <p className="text-sm font-black text-navy">ما القيمة المباشرة للأمانة؟</p>
                      <p className="mt-3 text-sm leading-8 text-slate-600">تقليل التشتت بين التشغيل والتحليل والقيادة، وتوحيد رحلة اعتماد الفرص في مسار مفهوم للمسؤول.</p>
                    </div>
                    <div className="rounded-[1.3rem] bg-[#F7F5EF] p-5">
                      <p className="text-sm font-black text-navy">ما التوصية الحالية؟</p>
                      <p className="mt-3 text-sm leading-8 text-slate-600">{topBrief?.recommendation ?? "اعتماد أولويتين فقط في هذا الربع مع إبقاء بقية الفرص تحت التحليل المرحلي."}</p>
                    </div>
                  </div>
                </SurfaceCard>
              ) : null}
            </div>

            {!presentationMode ? (
              <div className="space-y-6">
                {workspaceMode === "internal" ? (
                  <SurfaceCard title="إنشاء briefing جديد" subtitle="الإجراء واضح وفي مكانه الصحيح">
                    <div className="grid gap-3">
                      <input value={newBriefTitle} onChange={(event) => setNewBriefTitle(event.target.value)} placeholder="عنوان التقرير" className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                      <textarea value={newBriefSummary} onChange={(event) => setNewBriefSummary(event.target.value)} placeholder="الملخص التنفيذي" rows={4} className="rounded-2xl border border-[rgba(11,31,51,0.1)] bg-white px-4 py-3 text-right" />
                      <div className="flex justify-end">
                        <ActionButton variant="primary" onClick={createBrief}>
                          <Plus size={15} />
                          إنشاء brief
                        </ActionButton>
                      </div>
                    </div>
                  </SurfaceCard>
                ) : null}

                <SurfaceCard title="سير القرار المتصل" subtitle="من الفرصة إلى العرض القيادي">
                  <div className="space-y-3">
                    {workflow.steps.map((step) => (
                      <div key={step.id} className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-bold text-[#B6913E]">{step.duration}</p>
                          <h4 className="text-base font-black text-navy">{step.title}</h4>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                        <p className="mt-2 text-xs text-slate-500">المالك: {step.owner}</p>
                      </div>
                    ))}
                  </div>
                </SurfaceCard>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </IntelligenceWorkspaceShell>
  );
}
