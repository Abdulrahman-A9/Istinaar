"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  Building2,
  Database,
  FileSpreadsheet,
  FileText,
  Landmark,
  LayoutDashboard,
  LineChart,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Target,
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
import { neighborhoodInsights } from "@/data/commercialInsights";
import { historicalMarketData } from "@/data/historicalMarket";
import lands from "@/data/lands";
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
  { key: "overview", label: "نظرة تنفيذية", icon: LayoutDashboard },
  { key: "opportunities", label: "الفرص الاستثمارية", icon: Target },
  { key: "spatial", label: "التحليل المكاني", icon: MapPinned },
  { key: "inference", label: "محرك الاستدلال", icon: Sparkles },
  { key: "dossier", label: "الكراسة الذكية", icon: FileText },
  { key: "executive", label: "التقارير التنفيذية", icon: Landmark, badge: "عرض" },
  { key: "alerts", label: "التنبيهات الذكية", icon: Bell },
  { key: "economics", label: "المؤشرات الاقتصادية", icon: LineChart },
  { key: "regulatory", label: "الجهات التنظيمية", icon: ShieldCheck },
  { key: "data-center", label: "مركز البيانات", icon: Database },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function SurfaceCard({
  title,
  subtitle,
  children,
  accent,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <section className="rounded-[1.6rem] border border-[rgba(11,31,51,0.08)] bg-[linear-gradient(180deg,#FFFFFF_0%,#FCFBF8_100%)] p-5 shadow-[0_16px_42px_rgba(11,31,51,0.05)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="h-10 w-1 rounded-full" style={{ backgroundColor: accent ?? "#B6913E" }} />
        <div className="text-right">
          {subtitle ? <p className="mb-1 text-xs text-slate-400">{subtitle}</p> : null}
          <h3 className="text-lg font-black text-navy">{title}</h3>
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
    <div className="rounded-[1.5rem] border border-[rgba(11,31,51,0.08)] bg-[linear-gradient(180deg,#FFFFFF_0%,#FAF8F3_100%)] p-4 shadow-[0_14px_30px_rgba(11,31,51,0.05)]">
      <div className="mb-3 h-1.5 w-16 rounded-full" style={{ backgroundColor: tone }} />
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-navy">{value}</p>
      <p className="mt-2 text-xs leading-6 text-slate-500">{note}</p>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-black text-navy">{value}%</span>
        <span className="text-slate-600">{label}</span>
      </div>
      <div className="h-2.5 rounded-full bg-[#EEF1F4]">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: tone }} />
      </div>
    </div>
  );
}

export default function InvestmentIntelligencePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUser = useAppStore((state) => state.currentUser);
  const [presentationMode, setPresentationMode] = useState(false);

  const requestedTab = searchParams.get("tab");
  const activeTab = tabs.some((tab) => tab.key === requestedTab) ? (requestedTab as TabKey) : "overview";

  const assessments = getAmanahOpportunityAssessments();
  const proposals = getAmanahProposedOpportunities();
  const priorities = getAmanahPriorityAreas();
  const blueprints = getAmanahRequirementBlueprints();
  const briefs = getAmanahLeadershipBriefs();
  const workflow = getAmanahDecisionWorkflow();

  const topAssessment = assessments[0];
  const topPriority = priorities[0];
  const topProposal = proposals[0];
  const highestDemandInsight = [...neighborhoodInsights].sort((left, right) => right.footfall - left.footfall)[0];
  const totalExpectedRoi = Math.round(opportunities.reduce((sum, item) => sum + item.roi, 0) / opportunities.length);
  const highRiskCount = opportunities.filter((item) => getOpportunityRisk(item).score >= 55).length;
  const readyCount = assessments.filter((item) => item.readinessScore >= 82).length;
  const executiveWarnings = [
    topAssessment?.blockers[0],
    topProposal?.rationale,
    workflow.cases.find((item) => item.readinessScore < 72)?.nextAction,
  ].filter(Boolean) as string[];

  const readinessDistribution = [
    { name: "جاهزة", value: assessments.filter((item) => item.readinessScore >= 82).length, color: "#157347" },
    { name: "تحت المعالجة", value: assessments.filter((item) => item.readinessScore >= 68 && item.readinessScore < 82).length, color: "#B7791F" },
    { name: "إعادة ضبط", value: assessments.filter((item) => item.readinessScore < 68).length, color: "#B42318" },
  ];

  const riskDistribution = opportunities.slice(0, 5).map((item) => ({
    name: item.title.split(" ").slice(0, 3).join(" "),
    value: getOpportunityRisk(item).score,
  }));

  const sectorComparison = opportunities.slice(0, 5).map((item) => ({
    name: item.category,
    roi: item.roi,
    demand: item.marketDemand,
  }));

  const economicSeries = historicalMarketData.map((item) => ({
    name: item.neighborhood,
    growth: item.annualGrowth,
    demand: item.series[item.series.length - 1]?.demandIndex ?? 0,
  }));

  const dataSources = [
    { title: "أصول الأراضي", value: `${lands.length} سجل`, note: "مرتبطة بالجاهزية، التكلفة، والطلب." },
    { title: "الفرص الاستثمارية", value: `${opportunities.length} فرصة`, note: "مصنفة حسب القطاع، العائد، والمخاطر." },
    { title: "الرصد المكاني", value: `${neighborhoodInsights.length} حي`, note: "يشمل الحركة، المنافسة، والموسمية." },
    { title: "سير القرار", value: `${workflow.cases.length} حالة`, note: "مسارات قرار وقيمة مباشرة للأمانة." },
  ];

  const filters = [
    { label: "المنطقة", value: "حائل" },
    { label: "النطاق", value: "القطاع الاستثماري" },
    { label: "الموسم", value: "الربع الحالي" },
    { label: "الحالة", value: "الفرص النشطة" },
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
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab.key);
      router.replace(`${pathname}?${params.toString()}`);
    },
  }));

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
              هذه المساحة مخصصة للحسابات المخولة داخل الأمانة، وتجمع القراءة التنفيذية، الفرص، التحليل المكاني، الجهات التنظيمية، والتقارير القيادية داخل منصة واحدة.
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
      subtitle={tabs.find((tab) => tab.key === activeTab)?.label ?? "نظرة تنفيذية"}
      description="منصة حكومية موحدة لقراءة الفرص، دعم القرار، ربط الجاهزية التنظيمية، وتحويل البيانات المكانية والقطاعية إلى توصيات تنفيذية قابلة للعرض على القيادات."
      eyebrow="استنار | منصة الذكاء الاستثماري ودعم القرار"
      commandLabel="الحالة الحالية"
      commandValue="النسخة التنفيذية V3 - جاهزة للعرض المؤسسي"
      statusTitle="القرار أصبح ضمن منصة واحدة"
      statusDescription="تم دمج بوابة الأمانة والعرض التنفيذي في تجربة واحدة؛ التشغيل بقي داخل إدارة الأمانة، والتحليل والقيادة أصبحا داخل هذه اللوحة."
      statusBadge="جاهز للعرض"
      workspaceItems={workspaceItems}
      moduleItems={moduleItems}
      filters={filters}
      actionArea={
        activeTab === "executive" ? (
          <button
            type="button"
            onClick={() => setPresentationMode((value) => !value)}
            className="w-full rounded-[1.2rem] border px-4 py-3 text-sm font-bold"
            style={{
              borderColor: presentationMode ? "#B6913E" : "rgba(11,31,51,0.08)",
              backgroundColor: presentationMode ? "#E9DFC8" : "#FFFFFF",
              color: "#0B1F33",
            }}
          >
            {presentationMode ? "إلغاء وضع الاجتماعات" : "تفعيل وضع الاجتماعات"}
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link href="/admin" className="rounded-[1.2rem] border border-[rgba(11,31,51,0.08)] bg-white px-4 py-3 text-center text-sm font-bold text-navy">
              إدارة الأمانة
            </Link>
            <button
              type="button"
              onClick={() => router.replace(`${pathname}?tab=executive`)}
              className="rounded-[1.2rem] px-4 py-3 text-sm font-bold"
              style={{ backgroundColor: "#B6913E", color: "#0B1F33" }}
            >
              عرض قيادي
            </button>
          </div>
        )
      }
    >
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <KpiCard label="عدد الفرص النشطة" value={`${opportunities.length}`} note="الفرص الحالية المرتبطة بالقرار الاستثماري." tone="#0B1F33" />
            <KpiCard label="مؤشر الجاهزية" value={`${Math.round(assessments.reduce((sum, item) => sum + item.readinessScore, 0) / assessments.length)}%`} note="متوسط جاهزية الانتقال للمسار الرسمي." tone="#157347" />
            <KpiCard label="متوسط ROI المتوقع" value={`${totalExpectedRoi}%`} note="متوسط العائد على مستوى الفرص المعروضة." tone="#B6913E" />
            <KpiCard label="الفرص عالية المخاطر" value={`${highRiskCount}`} note="تتطلب تخفيفاً أو إعادة صياغة قبل التوصية." tone="#B42318" />
            <KpiCard label="الفرص الجاهزة للطرح" value={`${readyCount}`} note="جاهزية مرتفعة مع مبررات واضحة للرفع." tone="#157347" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <SurfaceCard title="ملخص تنفيذي مباشر" subtitle="Executive Summary Strip">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.35rem] border border-[rgba(11,31,51,0.08)] bg-[#0B1F33] p-5 text-white">
                  <p className="text-xs font-bold tracking-[0.18em] text-[#E9DFC8]">فرصة اليوم</p>
                  <h4 className="mt-3 text-xl font-black">{topAssessment.title}</h4>
                  <p className="mt-2 text-sm text-white/75">{topAssessment.neighborhood}</p>
                  <p className="mt-4 text-sm leading-7 text-white/80">{topAssessment.recommendation}</p>
                </div>

                <div className="rounded-[1.35rem] border border-[rgba(182,145,62,0.18)] bg-[linear-gradient(135deg,#FBF7EC_0%,#FFFFFF_100%)] p-5">
                  <p className="text-xs font-bold tracking-[0.18em] text-[#B6913E]">حي الأولوية</p>
                  <h4 className="mt-3 text-xl font-black text-navy">{topPriority.neighborhood}</h4>
                  <p className="mt-2 text-sm text-slate-600">درجة الأولوية {topPriority.priorityScore}%</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{topPriority.note}</p>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard title="تحذيرات استراتيجية" subtitle="Strategic Warnings" accent="#B42318">
              <div className="space-y-3">
                {executiveWarnings.map((warning) => (
                  <div key={warning} className="rounded-[1.2rem] border border-[rgba(180,35,24,0.12)] bg-[rgba(180,35,24,0.05)] px-4 py-4 text-right">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#B42318]">تنبيه</span>
                      <AlertTriangle size={16} color="#B42318" />
                    </div>
                    <p className="text-sm leading-7 text-slate-700">{warning}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <SurfaceCard title="توزيع الجاهزية" subtitle="Readiness Distribution">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={readinessDistribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={4}>
                        {readinessDistribution.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {readinessDistribution.map((entry) => (
                    <ProgressRow key={entry.name} label={entry.name} value={Math.round((entry.value / assessments.length) * 100)} tone={entry.color} />
                  ))}
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard title="مقارنة القطاع والطلب" subtitle="Sector Comparison">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorComparison} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fill: "#667085", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#667085", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="roi" fill="#B6913E" radius={[8, 8, 0, 0]} name="ROI" />
                    <Bar dataKey="demand" fill="#0B1F33" radius={[8, 8, 0, 0]} name="الطلب" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SurfaceCard>
          </div>
        </div>
      )}

      {activeTab === "opportunities" && (
        <div className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-3">
            {assessments.slice(0, 6).map((assessment) => (
              <div key={assessment.id} className="rounded-[1.6rem] border border-[rgba(11,31,51,0.08)] bg-white p-5 shadow-[0_16px_36px_rgba(11,31,51,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${assessment.readinessTone}15`, color: assessment.readinessTone }}>
                    {assessment.priorityLabel}
                  </span>
                  <div className="text-right">
                    <p className="text-base font-black text-navy">{assessment.title}</p>
                    <p className="text-xs text-slate-500">{assessment.neighborhood}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressRow label={assessment.readinessLabel} value={assessment.readinessScore} tone={assessment.readinessTone} />
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{assessment.recommendation}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-[1.1rem] bg-[#F7F5EF] p-3 text-right">
                    <p className="mb-1 text-xs text-slate-400">مبررات داعمة</p>
                    <ul className="space-y-1 text-xs leading-6 text-slate-700">
                      {assessment.reasons.slice(0, 2).map((reason) => <li key={reason}>{reason}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-[1.1rem] bg-[#FBF1F0] p-3 text-right">
                    <p className="mb-1 text-xs text-slate-400">عوائق مباشرة</p>
                    <ul className="space-y-1 text-xs leading-6 text-slate-700">
                      {assessment.blockers.slice(0, 2).map((blocker) => <li key={blocker}>{blocker}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <SurfaceCard title="توزيع المخاطر على الفرص الرائدة" subtitle="Risk Distribution" accent="#B42318">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistribution} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fill: "#667085", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "#667085", fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} name="مؤشر المخاطر">
                    {riskDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.value >= 55 ? "#B42318" : entry.value >= 40 ? "#B7791F" : "#157347"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SurfaceCard>
        </div>
      )}

      {activeTab === "spatial" && (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard title="مسرح التحليل المكاني" subtitle="Spatial Intelligence Center">
            <div className="rounded-[1.6rem] border border-[rgba(11,31,51,0.08)] bg-[linear-gradient(135deg,#102A43_0%,#0B1F33_100%)] p-5 text-white">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#E9DFC8]">حائل | طبقة فرص</span>
                <p className="text-xs text-white/60">Demand / Supply / Seasonality</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {priorities.slice(0, 6).map((area) => (
                  <div
                    key={area.neighborhood}
                    className="rounded-[1.25rem] border border-white/8 p-4 text-right"
                    style={{
                      background:
                        area.priorityScore >= 80
                          ? "linear-gradient(180deg, rgba(21,115,71,0.22) 0%, rgba(255,255,255,0.06) 100%)"
                          : area.priorityScore >= 68
                            ? "linear-gradient(180deg, rgba(182,145,62,0.22) 0%, rgba(255,255,255,0.06) 100%)"
                            : "linear-gradient(180deg, rgba(180,35,24,0.16) 0%, rgba(255,255,255,0.06) 100%)",
                    }}
                  >
                    <p className="text-sm font-black">{area.neighborhood}</p>
                    <p className="mt-1 text-xs text-white/68">{area.statusLabel}</p>
                    <div className="mt-4 space-y-2">
                      <ProgressRow label="الطلب" value={area.demandLevel} tone="#E9DFC8" />
                      <ProgressRow label="الموسمية" value={area.seasonalStrength} tone="#B6913E" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>

          <div className="space-y-6">
            <SurfaceCard title="تركيز جغرافي مباشر" subtitle="Neighborhood Focus">
              <div className="space-y-4">
                {priorities.slice(0, 4).map((area) => (
                  <div key={area.neighborhood} className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-black text-navy">{area.priorityScore}%</span>
                      <div>
                        <p className="font-black text-navy">{area.neighborhood}</p>
                        <p className="text-xs text-slate-500">{area.statusLabel}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{area.note}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard title="أعلى كثافة طلب" subtitle="Demand Overlay">
              <div className="rounded-[1.3rem] bg-[#0B1F33] p-5 text-right text-white">
                <p className="text-xs font-bold tracking-[0.18em] text-[#E9DFC8]">{highestDemandInsight.neighborhood}</p>
                <p className="mt-3 text-2xl font-black">{highestDemandInsight.footfall}% حركة</p>
                <p className="mt-3 text-sm leading-7 text-white/72">{highestDemandInsight.notes}</p>
              </div>
            </SurfaceCard>
          </div>
        </div>
      )}

      {activeTab === "inference" && (
        <div className="space-y-6">
          <SurfaceCard title="محرك التوصية الاستدلالية" subtitle="Inferred Opportunity Engine">
            <div className="grid gap-4 xl:grid-cols-3">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="rounded-[1.5rem] border border-[rgba(11,31,51,0.08)] bg-white p-5 shadow-[0_14px_32px_rgba(11,31,51,0.05)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#F7F5EF] px-3 py-1 text-xs font-bold text-[#B6913E]">{proposal.readinessWindow}</span>
                    <div className="text-right">
                      <p className="font-black text-navy">{proposal.title}</p>
                      <p className="text-xs text-slate-500">{proposal.neighborhood}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{proposal.rationale}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[1.1rem] bg-[#F7F5EF] p-3 text-center">
                      <p className="text-xs text-slate-400">الطلب</p>
                      <p className="mt-1 text-xl font-black text-navy">{proposal.demandScore}%</p>
                    </div>
                    <div className="rounded-[1.1rem] bg-[#FBF1F0] p-3 text-center">
                      <p className="text-xs text-slate-400">التشبع</p>
                      <p className="mt-1 text-xl font-black text-navy">{proposal.saturationScore}%</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-[1.1rem] border border-dashed border-[rgba(11,31,51,0.12)] px-4 py-3 text-right">
                    <p className="text-xs text-slate-400">الأصل المرجعي</p>
                    <p className="mt-1 text-sm font-bold text-navy">{proposal.anchorAsset}</p>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      )}

      {activeTab === "dossier" && (
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <SurfaceCard title="محاكاة الكراسة الذكية" subtitle="Smart Dossier">
            <div className="rounded-[1.5rem] border border-[rgba(11,31,51,0.08)] bg-[linear-gradient(135deg,#FBF7EC_0%,#FFFFFF_100%)] p-5 text-right">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#E9DFC8] px-3 py-1 text-xs font-bold text-navy">جاهز للتحليل</span>
                <FileSpreadsheet size={18} color="#B6913E" />
              </div>
              <h4 className="text-xl font-black text-navy">كراسة فرصة {topAssessment.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                محاكاة أولية لرفع ملف فرصة استثمارية، ثم استخراج ملخص تنفيذي، متطلبات، مؤشرات تكلفة، وإشارات ملاءمة المستثمر بصورة تبدو كنظام تحليلي حي.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-[1.1rem] bg-white p-4">
                  <p className="text-xs text-slate-400">ملخص تنفيذي</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{topAssessment.recommendation}</p>
                </div>
                <div className="rounded-[1.1rem] bg-white p-4">
                  <p className="text-xs text-slate-400">الملاءمة</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">ملائم للمستثمر متوسط الجاهزية الذي يبحث عن عائد سريع نسبياً مع مخاطرة تشغيلية منضبطة.</p>
                </div>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard title="استخراج المتطلبات والتكلفة" subtitle="Requirements & Cost">
            <div className="space-y-4">
              {blueprints.slice(0, 3).map((blueprint) => (
                <div key={blueprint.opportunityId} className="rounded-[1.25rem] border border-[rgba(11,31,51,0.08)] bg-white p-4 text-right">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${blueprint.complexityTone}18`, color: blueprint.complexityTone }}>
                      {blueprint.complexityLabel}
                    </span>
                    <p className="font-black text-navy">{blueprint.opportunityTitle}</p>
                  </div>
                  <ul className="space-y-2 text-sm leading-7 text-slate-600">
                    {blueprint.steps.slice(0, 3).map((step) => (
                      <li key={step.title}>{step.title}: {step.detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      )}

      {activeTab === "executive" && (
        <div className={`space-y-6 ${presentationMode ? "mx-auto max-w-6xl" : ""}`}>
          <div className={`grid gap-6 ${presentationMode ? "lg:grid-cols-1" : "xl:grid-cols-[1.05fr_0.95fr]"}`}>
            <SurfaceCard title="لماذا المنصة مهمة" subtitle="Executive Narrative">
              <div className="space-y-4 text-right">
                <p className={`${presentationMode ? "text-base leading-9" : "text-sm leading-8"} text-slate-700`}>
                  استنار في نسخته الثالثة يحول مسار القرار من صفحات متفرقة إلى منصة واحدة تجمع التحليل والجاهزية والمشهد التنفيذي، بما يسمح للأمانة بقراءة الفرص قبل الطرح بلغة قيادية واضحة.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.2rem] bg-[#0B1F33] p-4 text-white">
                    <p className="text-xs text-[#E9DFC8]">القيمة المباشرة</p>
                    <p className="mt-2 text-lg font-black">تقليل التشتت</p>
                  </div>
                  <div className="rounded-[1.2rem] bg-[#F7F5EF] p-4">
                    <p className="text-xs text-slate-400">محور القرار</p>
                    <p className="mt-2 text-lg font-black text-navy">قراءة أولويات حائل</p>
                  </div>
                  <div className="rounded-[1.2rem] bg-[#FBF1F0] p-4">
                    <p className="text-xs text-slate-400">المخرج التنفيذي</p>
                    <p className="mt-2 text-lg font-black text-navy">توصية قابلة للعرض</p>
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard title="قيمة مباشرة للأمانة" subtitle="Municipality Value">
              <div className="space-y-3">
                {briefs.slice(0, 3).map((brief) => (
                  <div key={brief.id} className="rounded-[1.2rem] border border-[rgba(11,31,51,0.08)] bg-white p-4 text-right">
                    <p className="text-xs text-[#B6913E]">{brief.angle}</p>
                    <p className="mt-2 font-black text-navy">{brief.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{brief.summary}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <SurfaceCard title="موجز القرار الحالي" subtitle="Decision Brief">
              <div className="space-y-4">
                {workflow.cases.slice(0, 4).map((item) => (
                  <div key={item.id} className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${item.stageTone}18`, color: item.stageTone }}>
                        {item.stageLabel}
                      </span>
                      <p className="font-black text-navy">{item.title}</p>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{item.nextAction}</p>
                    <p className="mt-2 text-xs text-slate-500">قيمة الأمانة: {item.municipalityValue}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard title="الخطاب القيادي" subtitle="Talking Points for Leadership">
              <div className="space-y-4">
                <div className="rounded-[1.25rem] border border-[rgba(182,145,62,0.18)] bg-[linear-gradient(135deg,#FBF7EC_0%,#FFFFFF_100%)] p-5 text-right">
                  <p className="text-xs font-bold tracking-[0.18em] text-[#B6913E]">التوصية الحالية</p>
                  <p className="mt-3 text-lg font-black text-navy">التركيز على فرص الجاهزية المرتفعة في حي {topPriority.neighborhood}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    نوصي بإبراز الحي كأولوية رفع، مع حماية القرار بتنبيهات المخاطر الحالية، ثم ربط كل فرصة بمسارها التنظيمي قبل الانتقال إلى الطرح.
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-[#0B1F33] p-5 text-right text-white">
                  <p className="text-xs font-bold tracking-[0.18em] text-[#E9DFC8]">حدود المنصة</p>
                  <p className="mt-3 text-sm leading-8 text-white/80">
                    النسخة الحالية تنفيذية تجريبية بالكامل، وتعتمد على بيانات وهمية ومحاكاة تحليلية محلية بهدف العرض الحكومي وصياغة تجربة قرار متقدمة.
                  </p>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </div>
      )}

      {activeTab === "alerts" && (
        <div className="grid gap-6 xl:grid-cols-3">
          {executiveWarnings.concat(topAssessment.blockers).slice(0, 6).map((warning, index) => (
            <div key={`${warning}-${index}`} className="rounded-[1.5rem] border border-[rgba(180,35,24,0.12)] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF1F0_100%)] p-5 text-right shadow-[0_14px_32px_rgba(11,31,51,0.05)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#B42318]">تنبيه ذكي</span>
                <Bell size={16} color="#B42318" />
              </div>
              <p className="font-black text-navy">إشارة رقم {index + 1}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{warning}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "economics" && (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard title="المؤشرات الاقتصادية القطاعية" subtitle="Economic Indicators">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={economicSeries} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fill: "#667085", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#667085", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="growth" fill="#B6913E" radius={[8, 8, 0, 0]} name="النمو السنوي" />
                  <Bar dataKey="demand" fill="#0B1F33" radius={[8, 8, 0, 0]} name="الطلب الحالي" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SurfaceCard>

          <SurfaceCard title="قراءة سريعة حسب الأحياء" subtitle="Quick Economic Read">
            <div className="space-y-4">
              {historicalMarketData.slice(0, 4).map((item) => (
                <div key={item.neighborhood} className="rounded-[1.2rem] bg-[#F7F5EF] p-4 text-right">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-navy">{item.annualGrowth}%</span>
                    <p className="font-black text-navy">{item.neighborhood}</p>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{item.highlight}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      )}

      {activeTab === "regulatory" && (
        <div className="space-y-6">
          <SurfaceCard title="طبقة الجاهزية التنظيمية" subtitle="Regulatory Path">
            <div className="grid gap-4 xl:grid-cols-2">
              {blueprints.map((blueprint) => (
                <div key={blueprint.opportunityId} className="rounded-[1.5rem] border border-[rgba(11,31,51,0.08)] bg-white p-5 text-right shadow-[0_14px_30px_rgba(11,31,51,0.05)]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${blueprint.complexityTone}18`, color: blueprint.complexityTone }}>
                      {blueprint.complexityLabel}
                    </span>
                    <div>
                      <p className="font-black text-navy">{blueprint.opportunityTitle}</p>
                      <p className="text-xs text-slate-500">مسار موافقات متدرج</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {blueprint.steps.map((step) => (
                      <div key={step.title} className="rounded-[1.1rem] bg-[#F7F5EF] p-3">
                        <p className="text-sm font-bold text-navy">{step.title}</p>
                        <p className="mt-1 text-xs leading-6 text-slate-600">{step.detail}</p>
                        <p className="mt-1 text-[11px] text-slate-400">{step.source}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      )}

      {activeTab === "data-center" && (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <SurfaceCard title="طبقات البيانات المعتمدة" subtitle="Data Center">
            <div className="grid gap-4 md:grid-cols-2">
              {dataSources.map((source) => (
                <div key={source.title} className="rounded-[1.25rem] border border-[rgba(11,31,51,0.08)] bg-white p-4 text-right">
                  <p className="text-xs text-slate-400">{source.title}</p>
                  <p className="mt-2 text-2xl font-black text-navy">{source.value}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{source.note}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard title="حوكمة البيانات في النسخة التنفيذية" subtitle="Prototype Governance">
            <div className="space-y-4 text-right">
              <div className="rounded-[1.2rem] bg-[#0B1F33] p-5 text-white">
                <p className="text-xs font-bold tracking-[0.18em] text-[#E9DFC8]">الوضع الحالي</p>
                <p className="mt-3 text-lg font-black">بيانات محلية ومحاكاة تحليلية فقط</p>
                <p className="mt-3 text-sm leading-7 text-white/78">لا يوجد backend ولا APIs تشغيلية، والهدف هو إظهار لغة منتج حكومي متقدم دون تعقيد تقني خلفي.</p>
              </div>
              <div className="rounded-[1.2rem] bg-[#F7F5EF] p-5">
                <p className="text-sm leading-8 text-slate-600">
                  مركز البيانات في النسخة الحالية يوضح مصادر الإدخال، علاقتها بالتحليل، وجاهزية الانتقال لاحقاً إلى طبقة مؤسسية حقيقية عند الحاجة.
                </p>
              </div>
            </div>
          </SurfaceCard>
        </div>
      )}
    </IntelligenceWorkspaceShell>
  );
}
