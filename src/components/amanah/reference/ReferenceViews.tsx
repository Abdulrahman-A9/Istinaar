"use client";

import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Coins,
  Eye,
  FileSpreadsheet,
  Minus,
  MoreVertical,
  Pencil,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Metric = {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  icon: "coins" | "trend" | "users" | "bars" | "briefcase";
};

type Decision = {
  title: string;
  subtitle: string;
  status: string;
  tone: "green" | "amber" | "red";
  action: string;
  age: string;
};

type OpportunityRow = {
  title: string;
  category: string;
  location: string;
  readiness: string;
  value: string;
  roi: string;
  stage: string;
  updated: string;
};

const executiveMetrics: Metric[] = [
  { label: "قيمة الاستثمار المتوقعة", value: "211.7", unit: "مليون ريال", delta: "+18% عن الشهر الماضي", icon: "coins" },
  { label: "مؤشر جاهزية الاستثمار", value: "83%", delta: "+7% عن الشهر الماضي", icon: "trend" },
  { label: "الوظائف المتوقعة", value: "1,248", unit: "وظيفة", delta: "+26% عن الشهر الماضي", icon: "users" },
  { label: "العوائد السنوية المتوقعة", value: "28.4", unit: "مليون ريال", delta: "+15% عن الشهر الماضي", icon: "bars" },
  { label: "عدد الفرص الاستثمارية", value: "24", unit: "فرصة", delta: "6 جاهزة للطرح", icon: "briefcase" },
];

const executiveDecisions: Decision[] = [
  { title: "رفع فرصة تطوير موقع حي مشار", subtitle: "جاهزية عالية - بانتظار الاعتماد", status: "عالية", tone: "green", action: "اتخاذ إجراء", age: "منذ 2 يوم" },
  { title: "اعتماد دراسة تطوير حي النقرة", subtitle: "جاهزة للاعتماد", status: "متوسطة", tone: "amber", action: "اتخاذ إجراء", age: "منذ 1 يوم" },
  { title: "مراجعة اعتراض على شروط كراسة المنافسة", subtitle: "اعتراض مقدم من شركة نسك", status: "عالية", tone: "red", action: "مراجعة الاعتراض", age: "منذ 3 أيام" },
  { title: "اعتماد شراكة استثمارية لمشروع الوسيطاء", subtitle: "شريك استراتيجي - جاهز للتوقيع", status: "منخفضة", tone: "green", action: "اتخاذ إجراء", age: "منذ 4 أيام" },
];

const mapPoints = [
  { label: "حي الشفاء", state: "ready", top: "25%", right: "77%" },
  { label: "حي الزبارة", state: "ready", top: "30%", right: "18%" },
  { label: "حي النقرة", state: "ready", top: "42%", right: "58%" },
  { label: "حي الجامعة", state: "blocked", top: "50%", right: "33%" },
  { label: "حي الجامعيين", state: "review", top: "58%", right: "45%" },
  { label: "حي الوسيطاء", state: "review", top: "64%", right: "74%" },
  { label: "حي مشار", state: "ready", top: "70%", right: "54%" },
  { label: "حي السلام", state: "blocked", top: "75%", right: "20%" },
];

const neighborhoodCards = [
  { name: "حي المنتزه", score: "62%", opportunities: "2", value: "7.4", state: "قابلية نمو", tone: "amber" },
  { name: "حي الوسيطاء", score: "65%", opportunities: "2", value: "8.7", state: "جاهزية متوسطة", tone: "amber" },
  { name: "حي النقرة", score: "71%", opportunities: "3", value: "15.2", state: "جاهزية جيدة", tone: "green" },
  { name: "حي الجامعيين", score: "83%", opportunities: "6", value: "32.5", state: "جاهزة للطرح", tone: "green" },
  { name: "حي الزبارة", score: "74%", opportunities: "2", value: "11.1", state: "جاهزية جيدة", tone: "green" },
  { name: "حي الشفاء", score: "58%", opportunities: "2", value: "6.9", state: "جاهزية متوسطة", tone: "amber" },
  { name: "حي المصيف", score: "69%", opportunities: "2", value: "9.8", state: "جاهزية جيدة", tone: "green" },
  { name: "حي السلام", score: "54%", opportunities: "1", value: "4.4", state: "قابلة للمعالجة", tone: "amber" },
];

const opportunityRows: OpportunityRow[] = [
  { title: "تطوير موقع حي مشار", category: "تجاري", location: "حي مشار - شمال حائل", readiness: "83%", value: "28.5 مليون ر.س", roi: "27%", stage: "جاهزة للطرح", updated: "منذ 2 يوم" },
  { title: "تطوير حي النقرة", category: "سكني", location: "حي النقرة - غرب حائل", readiness: "71%", value: "15.2 مليون ر.س", roi: "23%", stage: "قيد الدراسة", updated: "منذ 5 يوم" },
  { title: "مشروع الوسيطاء التجاري", category: "تجاري", location: "حي الوسيطاء - جنوب حائل", readiness: "65%", value: "8.7 مليون ر.س", roi: "19%", stage: "قيد المراجعة", updated: "منذ 1 أسبوع" },
  { title: "مركز تجاري حي الجامعة", category: "تجاري", location: "حي الجامعة - شرق حائل", readiness: "42%", value: "3.1 مليون ر.س", roi: "14%", stage: "قيد الدراسة", updated: "منذ 2 أسبوع" },
  { title: "تطوير الواجهة الشمالية", category: "ترفيهي", location: "الواجهة الشمالية", readiness: "38%", value: "12.4 مليون ر.س", roi: "18%", stage: "معتمدة", updated: "منذ 3 أسبوع" },
];

function cardTone(tone: "green" | "amber" | "red") {
  if (tone === "green") return "bg-[#173C2A] text-[#4FE07C]";
  if (tone === "amber") return "bg-[#3B3120] text-[#F3C04F]";
  return "bg-[#3F2226] text-[#FF6B72]";
}

function MetricIcon({ type }: { type: Metric["icon"] }) {
  const className = "text-[#D8A84F]";
  if (type === "coins") return <Coins size={20} className={className} />;
  if (type === "trend") return <TrendingUp size={20} className={className} />;
  if (type === "users") return <Users size={20} className={className} />;
  if (type === "bars") return <FileSpreadsheet size={20} className={className} />;
  return <BriefcaseBusiness size={20} className={className} />;
}

function DarkCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`executive-card-glow glow-gold rounded-[1.35rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.14),transparent_28%),radial-gradient(circle_at_top_left,rgba(61,211,128,0.08),transparent_24%),linear-gradient(180deg,rgba(12,28,46,0.98)_0%,rgba(10,23,38,0.98)_100%)] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] ${className}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="text-right">
          {subtitle ? <p className="text-[12px] text-[#CDA24A]">{subtitle}</p> : null}
          <h2 className="mt-1 font-['Tajawal'] text-[1.45rem] font-black text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function MapStateDot({ state }: { state: "ready" | "review" | "blocked" }) {
  const tone = state === "ready" ? "bg-[#39D56E]" : state === "review" ? "bg-[#F3B942]" : "bg-[#FF5A5F]";
  return <span className={`h-3.5 w-3.5 rounded-full ${tone} shadow-[0_0_18px_currentColor]`} />;
}

function ExecutiveMap({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1rem] border border-white/10 bg-[#0c121b] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${compact ? "h-[390px]" : "h-[420px]"}`}
    >
      <img
        alt="خريطة أولويات أحياء حائل"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbwRmAZR6AKKmxMOkHePKVDDYeQWBvl_mYvoTKbR4UWeB9bfABdi795oEplrhzM-46I0EzzJVTvuvTYobDIDzZnji4aXlgTHkRdt86OI55NEOmeP4n5ABHgtJmXxDQGISanVVHftFh2nzxGZDd2ayPRfvTVCsZHsO2JkqF_5k8jMX2u4PQBrY-qhniNmBxafUWJGQ5M4rcCPNvm8kyQYXjxtCeHmn1c6_FK-QnP2yAtg8CQu7YkE-c-mrEhHongQsGGq4ArggB4ZM"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,28,43,0.04),rgba(5,12,21,0.5)_76%),linear-gradient(180deg,rgba(4,11,19,0.12),rgba(4,11,19,0.42))]" />
      <div className="absolute right-4 top-4 z-20 flex min-w-[132px] items-center justify-between rounded-[0.55rem] border border-white/10 bg-[#111923]/82 px-3 py-2 text-[10px] font-bold text-white/78 backdrop-blur-md">
        <ChevronDown size={12} />
        جميع الأحياء
      </div>
      <div className="absolute left-4 top-4 z-20 rounded-[0.65rem] border border-white/10 bg-[#111923]/82 p-2.5 text-right backdrop-blur-md">
        {[
          ["جاهزة للطرح", "ready"],
          ["قيد المراجعة", "review"],
          ["متعثرة", "blocked"],
        ].map(([label, state]) => (
          <div key={label} className="flex items-center justify-end gap-2 py-0.5 text-[10px] font-bold text-white/78">
            <span>{label}</span>
            <MapStateDot state={state as "ready" | "review" | "blocked"} />
          </div>
        ))}
      </div>

      {mapPoints.map((point) => (
        <div key={point.label} className="absolute z-20 text-center" style={{ top: point.top, right: point.right }}>
          <div className="mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#101A25]/92 shadow-[0_0_0_8px_rgba(255,255,255,0.055)]">
            <MapStateDot state={point.state as "ready" | "review" | "blocked"} />
          </div>
          <span className="rounded-full bg-[#07101B]/88 px-2 py-1 text-[10px] font-bold text-white/88 shadow-[0_8px_18px_rgba(0,0,0,0.32)]">{point.label}</span>
        </div>
      ))}

      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-[0.45rem] border border-white/10 bg-[#111923]/82 text-white/84 backdrop-blur-md">
          <Plus size={16} />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-[0.45rem] border border-white/10 bg-[#111923]/82 text-white/84 backdrop-blur-md">
          <Minus size={16} />
        </button>
      </div>
      <button className="absolute bottom-4 right-4 z-20 rounded-[0.55rem] border border-[#C29B4F]/28 bg-[#111923]/82 px-3 py-2 text-[10px] font-black text-[#E8C36B] shadow-[0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur-md">
        عرض طبقات الخريطة
      </button>
    </div>
  );
}

function stageBadge(stage: string) {
  if (stage === "جاهزة للطرح") return "bg-[#173C2A] text-[#59D776]";
  if (stage === "قيد المراجعة") return "bg-[#3B3120] text-[#F0B846]";
  if (stage === "معتمدة") return "bg-[#14384B] text-[#7BC9FF]";
  return "bg-white/[0.05] text-white/74";
}

export function AdminReferenceDashboard() {
  const chartData = [
    { month: "يناير", projected: 62, approved: 39 },
    { month: "فبراير", projected: 116, approved: 74 },
    { month: "مارس", projected: 142, approved: 91 },
    { month: "أبريل", projected: 184, approved: 108 },
    { month: "مايو", projected: 181, approved: 112 },
    { month: "يونيو", projected: 238, approved: 153 },
  ];
  const stages = [
    { label: "فكرة مكتملة", active: true, gold: false },
    { label: "تحليل مكتمل", active: true, gold: false },
    { label: "دراسة جارية", active: true, gold: true },
    { label: "اعتماد قريباً", active: false, gold: false },
    { label: "طرح قريباً", active: false, gold: false },
    { label: "تشغيل قريباً", active: false, gold: false },
  ];
  const kpis = [
    ["83%", "جاهزية الأحياء"],
    ["76%", "سرعة الاعتماد"],
    ["91%", "رضا المستثمرين"],
    ["68%", "استغلال الأراضي"],
  ];

  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-5">
        {executiveMetrics.map((metric, index) => (
          <article key={metric.label} className={`executive-card-glow ${["glow-gold", "glow-blue", "glow-green", "glow-violet", "glow-red"][index % 5]} flex min-h-[118px] flex-col justify-between rounded-xl border border-white/10 bg-[#161c26]/92 p-4 shadow-[0_14px_28px_rgba(0,0,0,0.14)] transition hover:bg-[#1c2431]`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C29B4F]/10 text-[#C29B4F]">
                <MetricIcon type={metric.icon} />
              </div>
              <div className="text-right">
                <p className="text-[11px] leading-5 text-white/58">{metric.label}</p>
                <div className="mt-1 flex items-baseline justify-end gap-1">
                  <span className="font-['Tajawal'] text-[1.9rem] font-black leading-none text-white">{metric.value}</span>
                  {metric.unit ? <span className="text-[10px] text-white/44">{metric.unit}</span> : null}
                </div>
              </div>
            </div>
            <p className="text-[10px] font-bold text-[#28F0AE]">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="rounded-2xl border border-white/10 bg-[#161c26]/92 p-4 xl:col-span-5">
          <div className="mb-3 flex items-center justify-between">
            <button className="rounded-lg border border-[#C29B4F]/30 bg-[#C29B4F]/8 px-4 py-2 text-[10px] font-bold text-[#EBC070]">عرض طبقات الخريطة</button>
            <div className="text-right">
              <p className="text-[10px] font-bold text-[#C29B4F]">التحليل المكاني المباشر</p>
              <h2 className="mt-1 text-lg font-black text-white">خريطة أولويات الأحياء</h2>
            </div>
          </div>
          <ExecutiveMap compact />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              ["الأحياء الجاهزة", "6", "رفع مباشر"],
              ["المعوقات", "3", "متابعة تنظيمية"],
              ["القيمة", "67.9", "مليون ريال"],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.025] p-3 text-right">
                <p className="text-[10px] text-white/42">{label}</p>
                <p className="mt-1 text-xl font-black text-white">{value}</p>
                <p className="mt-1 text-[10px] text-[#EBC070]">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161c26]/92 p-4 xl:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <button className="text-[10px] font-bold text-[#C29B4F]">عرض الكل</button>
            <h3 className="text-sm font-black text-white">أهم القرارات اليوم</h3>
          </div>
          <div className="space-y-3">
            {executiveDecisions.map((decision) => (
              <div key={decision.title} className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition hover:border-[#C29B4F]/50 ${decision.tone === "red" ? "border-red-500/20 bg-red-500/5" : "border-white/10 bg-[#1c2431]/70"}`}>
                <button className="shrink-0 rounded-lg border border-white/10 bg-[#0e141e] px-3 py-2 text-[10px] font-bold text-white/86">{decision.action}</button>
                <div className="min-w-0 text-right">
                  <h4 className="truncate text-[12px] font-black text-white">{decision.title}</h4>
                  <p className="mt-1 truncate text-[10px] text-white/48">{decision.subtitle}</p>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className={`rounded px-2 py-0.5 text-[9px] font-black ${cardTone(decision.tone)}`}>{decision.status}</span>
                    <span className="text-[9px] text-white/36">{decision.age}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161c26]/92 p-4 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded bg-[#C29B4F] px-2 py-1 text-[9px] font-black text-white">AI</span>
            <p className="text-[11px] font-bold text-white/58">الذكاء التنفيذي يقترح</p>
          </div>
          <div className="border-b border-white/10 pb-4 text-center">
            <p className="text-[10px] text-white/44">يوصى بالإسراع في اعتماد فرصة</p>
            <h3 className="mt-2 text-lg font-black text-[#EBC070]">تطوير موقع حي مشار</h3>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs font-black text-[#42DD71]">83%</span>
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[83%] rounded-full bg-[#42DD71]" />
              </div>
              <span className="text-[9px] text-white/44">نسبة الجاهزية</span>
            </div>
            <p className="mt-4 text-[10px] leading-6 text-white/56">عائد استثماري متوقع مرتفع، وجاهزية تنظيمية عالية.</p>
            <button className="mt-4 w-full rounded-xl bg-[#C29B4F] py-3 text-sm font-black text-white shadow-[0_12px_26px_rgba(194,155,79,0.22)]">مراجعة الآن</button>
          </div>
          <button className="mt-3 flex w-full items-center justify-between text-[10px] text-white/52">
            <span>عرض جميع التوصيات</span>
            <span>‹</span>
          </button>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] p-3 text-right">
            <div className="mb-1 flex items-center justify-between">
              <span className="rounded-full bg-[#C29B4F]/20 px-2 py-0.5 text-[10px] font-black text-[#EBC070]">6</span>
              <p className="text-[10px] font-bold text-white/52">القرارات المطلوبة</p>
            </div>
            <p className="text-[10px] text-white/42">تحتاج إلى إجراء فوري</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="rounded-2xl border border-white/10 bg-[#161c26]/92 p-4 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <button className="text-[10px] font-bold text-[#C29B4F]">عرض الكل</button>
            <h3 className="text-sm font-black text-white">مؤشرات الأداء الرئيسية</h3>
          </div>
          <div className="grid grid-cols-2 gap-y-5">
            {kpis.map(([value, label], index) => (
              <div key={label} className="flex flex-col items-center">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[6px] border-white/10" />
                  <div className={`absolute inset-0 rounded-full border-[6px] ${index % 2 === 0 ? "border-[#78E66D]" : "border-[#C29B4F]"} border-l-transparent border-b-transparent`} />
                  <span className="text-sm font-black text-white">{value}</span>
                </div>
                <p className="mt-2 text-center text-[10px] text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161c26]/92 p-4 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <button className="text-[10px] font-bold text-[#C29B4F]">عرض الكل</button>
            <h3 className="text-sm font-black text-white">تنبيهات ذكية</h3>
          </div>
          <div className="space-y-3">
            {[
              ["فرصة تجاوزت مدة الاعتماد", "مشروع تطوير حي النقرة", "#FF5A5F"],
              ["دراسة تحتاج تحديث", "دراسة حي الوسيطاء", "#F3B942"],
              ["مستندات شريك مفقودة", "شركة رواد البناء", "#EBC070"],
              ["فرصة جاهزة للطرح", "تطوير واجهة طريق الملك خالد", "#42DD71"],
            ].map(([title, note, color]) => (
              <div key={title} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1c2431]/72 p-2.5 text-right">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                <div>
                  <p className="text-[10px] font-bold text-white">{title}</p>
                  <p className="mt-0.5 text-[9px] text-white/42">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161c26]/92 p-4 xl:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <button className="text-[10px] font-bold text-[#C29B4F]">عرض الكل</button>
            <h3 className="text-sm font-black text-white">رحلة الفرصة الاستثمارية</h3>
          </div>
          <div className="flex justify-between gap-2">
            {stages.map((stage) => (
              <div key={stage.label} className="flex min-w-0 flex-col items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full border ${stage.active ? stage.gold ? "border-[#C29B4F] bg-[#C29B4F] text-[#0B1726]" : "border-[#2BD96B] bg-[#113523] text-[#42DD71]" : "border-white/12 bg-white/[0.03] text-white/36"}`}>
                  {stage.active ? <Check size={14} /> : <span className="h-1.5 w-1.5 rounded-full bg-white/30" />}
                </div>
                <p className={`text-center text-[9px] font-bold ${stage.active ? stage.gold ? "text-[#C29B4F]" : "text-[#42DD71]" : "text-white/36"}`}>{stage.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["1 تشغيل", "8 تحليل", "3 اعتماد", "كل الإنجاز", "2 طرح", "1 تشغيل"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.025] px-2 py-2 text-center text-[10px] font-black text-white">{item}</div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161c26]/92 p-4 xl:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <button className="text-[10px] font-bold text-[#C29B4F]">عرض التقرير</button>
            <h3 className="text-sm font-black text-white">الأثر الاقتصادي المتوقع</h3>
          </div>
          <div className="h-[170px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.35)" fontSize={10} />
                <Tooltip />
                <Line type="monotone" dataKey="projected" stroke="#54E070" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="approved" stroke="#D7A84F" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <footer className="grid gap-3 lg:grid-cols-4">
        {[
          ["تصدير تقرير", "تقرير الأداء الشهري"],
          ["اجتماع لجنة الاستثمار", "غداً - 10:00 ص"],
          ["توقيع إلكتروني", "3 مستندات بانتظار التوقيع"],
          ["مركز المساعدة", "الدعم والمساندة"],
        ].map(([title, note]) => (
          <div key={title} className="rounded-xl border border-white/10 bg-[#161c26]/92 p-3 text-right transition hover:bg-[#1c2431]">
            <p className="text-[12px] font-black text-white">{title}</p>
            <p className="mt-1 text-[10px] text-white/42">{note}</p>
          </div>
        ))}
      </footer>
    </div>
  );
}

export function IntelligenceOverviewReference() {
  const alerts = ["موسمية قوية", "أفضل أحياء للأنشطة الموسمية مرتبطة بالواجهة"];
  const economyData = [
    { name: "حي النقرة", value: 14 },
    { name: "حي الجامعيين", value: 11 },
    { name: "حي مشار", value: 18 },
    { name: "حي المصيف", value: 9 },
  ];
  const readinessData = [
    { name: "جاهزة", value: 35, fill: "#1E7E49" },
    { name: "قيد المعالجة", value: 33, fill: "#C58422" },
    { name: "متعثرة", value: 32, fill: "#2C57D5" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <DarkCard title="تنبيهات تستحق العرض" subtitle="مختصرة وواضحة">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.04] px-4 py-5">
                <span className="h-3.5 w-3.5 rounded-full bg-[#FF5A5F]" />
                <p className="text-sm font-semibold text-white">{alert}</p>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard title="ملخص القرار الحالي" subtitle="ما الذي تغير فعلاً؟">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-5 text-right">
              <p className="text-sm text-white/46">أولوية الحي</p>
              <h3 className="mt-3 font-['Tajawal'] text-[2rem] font-black text-white">حي مشار</h3>
              <p className="mt-3 text-base leading-9 text-white/66">الواجهة السياحية الأسرع نمواً للمشاريع الموسمية وتجارب الواجهة.</p>
              <p className="mt-5 text-sm font-black text-[#D3A248]">مؤشر الأولوية 82%</p>
            </div>
            <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-5 text-right">
              <p className="text-sm text-white/46">أقوى فرصة حالياً</p>
              <h3 className="mt-3 font-['Tajawal'] text-[1.6rem] font-black leading-[1.55] text-white">وجهة عائلية موسمية في مشار</h3>
              <p className="mt-3 text-base leading-9 text-white/66">يوصى بالإعداد للرفع الرسمي بعد مراجعة الصياغة النهائية للطرح.</p>
              <span className="mt-5 inline-flex rounded-full bg-[#DDF8E7] px-4 py-2 text-sm font-black text-[#1E8148]">معتمد داخلياً</span>
            </div>
          </div>
        </DarkCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
        <DarkCard title="نبض المؤشرات الاقتصادية" subtitle="أقل عدد ممكن من المؤشرات ذات القيمة">
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={economyData}>
                <CartesianGrid stroke="rgba(255,255,255,0.09)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.42)" />
                <YAxis tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.42)" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#1D3F8F" fill="rgba(35,63,143,0.25)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DarkCard>

        <DarkCard title="توزيع الجاهزية" subtitle="حالة المسار داخل اللوحة">
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart data={readinessData} innerRadius="54%" outerRadius="92%" cx="50%" cy="52%" startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background={{ fill: "rgba(255,255,255,0.08)" }} cornerRadius={14} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </DarkCard>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["الفرص الجاهزة للتقديم", "2", "#42DD71"],
          ["متوسط ROI المتوقع", "27%", "#D7A84F"],
          ["الأحياء ذات الأولوية", "1", "#7BC9FF"],
          ["الفرص عالية المخاطر", "0", "#FF5A5F"],
        ].map(([label, value, color]) => (
          <div key={String(label)} className="rounded-[1.25rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.14),transparent_36%),linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(10,23,38,0.98)_100%)] px-5 py-5 text-right shadow-[0_16px_36px_rgba(0,0,0,0.16)]">
            <p className="text-sm text-white/46">{label}</p>
            <p className="mt-3 font-['Tajawal'] text-[2rem] font-black text-white">{value}</p>
            <p className="mt-3 text-sm font-bold" style={{ color: String(color) }}>قراءة تنفيذية قابلة للمتابعة</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntelligenceSpatialReference() {
  return (
    <div className="space-y-4">
      <DarkCard title="خريطة الأولويات المكانية" subtitle="تحليل الأحياء">
        <div className="grid items-start gap-4 2xl:grid-cols-[minmax(0,1.24fr)_340px]">
          <ExecutiveMap />
          <div className="space-y-4">
            <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-4">
              <p className="mb-3 text-right text-sm font-bold text-white">فلترة التحليل</p>
              <div className="space-y-3">
                {["اختيار الحي", "أمر التنفيذ", "نوع الاستخدام", "أمر القرار"].map((item) => (
                  <button key={item} className="flex w-full items-center justify-between rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-semibold text-white/76">
                    <ChevronDown size={18} />
                    {item}
                  </button>
                ))}
                <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-3 text-sm font-bold text-white">نسبة الجاهزية</p>
                  <input type="range" min="0" max="100" defaultValue="64" className="w-full accent-[#D0A243]" />
                </div>
                <button className="w-full rounded-[1rem] bg-[#C79C45] px-4 py-4 text-base font-black text-[#0B1726]">تطبيق التحليل</button>
                <button className="w-full rounded-[1rem] border border-white/10 px-4 py-3 text-sm font-semibold text-white/74">إلغاء التحديد</button>
              </div>
            </div>

            <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-4">
              <p className="mb-3 text-right text-sm font-bold text-white">طبقات الخريطة</p>
              <div className="space-y-3 text-right">
                {[
                  ["مؤشر الجاذبية المكانية", "#39D56E"],
                  ["جاهزية الفرصة", "#F3B942"],
                  ["الكثافة الاستثمارية", "#FF5A5F"],
                  ["الفرص الاستثمارية", "#D1A243"],
                  ["الكثافة السكانية", "#57A0FF"],
                  ["المشاريع القائمة", "#B6BCC6"],
                ].map(([label, color]) => (
                  <div key={String(label)} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <span className="h-3.5 w-3.5 rounded-full" style={{ background: String(color) }} />
                    <span className="text-sm text-white/74">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DarkCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {neighborhoodCards.map((card) => (
          <div key={card.name} className="rounded-[1rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(78,163,255,0.12),transparent_36%),linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(10,23,38,0.98)_100%)] px-4 py-4 text-right shadow-[0_16px_36px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-black ${cardTone(card.tone as "green" | "amber" | "red")}`}>{card.state}</span>
              <h3 className="font-['Tajawal'] text-[1rem] font-black text-white">{card.name}</h3>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-white/66">
              <div><p>الجاهزية</p><p className="mt-1 text-lg font-black text-white">{card.score}</p></div>
              <div><p>الفرص</p><p className="mt-1 text-lg font-black text-white">{card.opportunities}</p></div>
            </div>
            <p className="mt-3 text-[12px] text-[#D8A84F]">قيمة تقديرية {card.value} مليون ر.س</p>
          </div>
        ))}
      </div>

      <section className="rounded-[1.4rem] border border-[#D0A243]/22 bg-[linear-gradient(135deg,rgba(208,162,67,0.07),rgba(8,24,40,0.74)_46%,rgba(78,163,255,0.06))] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.16)]">
        <div className="mb-4 text-right">
          <p className="text-[11px] font-bold text-[#D0A243]">مخرجات قابلة للرفع</p>
          <h2 className="mt-1 font-['Noto_Kufi_Arabic'] text-[1.2rem] font-bold text-white">مؤشرات القرار المكاني</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["خلاصة القرار المكاني", "حي النقرة", "جاهزية جيدة مع فرصتين قابلتين للتطوير السريع", "#F0B846"],
          ["خلاصة القرار المكاني", "حي الجامعيين", "الأعلى قيمةً والأقرب لقرار الرفع التنفيذي", "#42DD71"],
          ["الأحياء الجاهزة", "6 أحياء", "أولوية رفع مباشرة", "#42DD71"],
          ["المعوقات المتكررة", "3 عناصر", "تحتاج متابعة تنظيمية", "#F0B846"],
          ["قيمة الفرص المكانية", "67.9", "مليون ريال متوقع", "#D0A243"],
          ["المناطق ذات النمو", "4 نطاقات", "جاهزية أعلى من المتوسط", "#57A0FF"],
          ["الواجهات الواعدة", "3 مواقع", "أثر موسمي أعلى هذا الشهر", "#A78BFA"],
          ["الفرص سريعة الرفع", "5 فرص", "قابلة للتنفيذ بعد مراجعة خفيفة", "#FF8A5B"],
        ].map(([label, value, note, color]) => (
          <div key={`${label}-${value}`} className="executive-card-glow glow-blue min-h-[148px] rounded-[1.1rem] border border-[#7BC9FF]/18 bg-[radial-gradient(circle_at_top_left,rgba(208,162,67,0.09),transparent_42%),linear-gradient(145deg,rgba(19,43,65,0.98),rgba(8,22,36,0.98))] px-4 py-4 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_30px_rgba(0,0,0,0.16)]">
            <p className="text-[12px] text-white/42">{label}</p>
            <p className="mt-2 font-['Tajawal'] text-[1.55rem] font-black text-white">{value}</p>
            <p className="mt-2 text-[12px]" style={{ color: String(color) }}>{note}</p>
          </div>
        ))}
        </div>
      </section>
    </div>
  );
}

export function IntelligenceOpportunitiesReference() {
  const progress = [
    ["جاهزة للطرح", 6, "25%", "#59D776"],
    ["قيد الدراسة", 8, "33%", "#F0B846"],
    ["قيد المراجعة", 5, "21%", "#F0B846"],
    ["معتمدة", 3, "12%", "#7BC9FF"],
    ["مؤرشفة", 2, "9%", "#FF5A5F"],
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          ["إجمالي الفرص", "24", "#D7A84F"],
          ["جاهزة للطرح", "6", "#42DD71"],
          ["قيد الدراسة", "8", "#F0B846"],
          ["متوسط العائد", "21%", "#7BC9FF"],
          ["قيمة الاستثمار", "67.9", "#F0B846"],
        ].map(([label, value, color]) => (
          <div key={String(label)} className="rounded-[1.25rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.14),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(78,163,255,0.1),transparent_26%),linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(10,23,38,0.98)_100%)] px-5 py-5 text-right shadow-[0_16px_36px_rgba(0,0,0,0.16)]">
            <p className="text-sm text-white/46">{label}</p>
            <p className="mt-3 font-['Tajawal'] text-[2rem] font-black text-white">{value}</p>
            <p className="mt-3 text-sm font-bold" style={{ color: String(color) }}>تحديث مباشر من سجل الفرص</p>
          </div>
        ))}
      </div>

      <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,23,38,0.98)_0%,rgba(8,19,32,0.98)_100%)] p-5">
        <div className="mb-4 grid gap-3 xl:grid-cols-[1fr_auto]">
          <div className="grid gap-3 md:grid-cols-5">
            {progress.map(([label, count, percent, color]) => (
              <div key={String(label)} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-black text-white">{count}</span>
                  <span className="text-white/78">{label}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full" style={{ width: String(percent), background: String(color) }} />
                </div>
                <p className="mt-2 text-[12px] text-white/44">{percent}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">الفلترة</button>
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">عرض الخريطة</button>
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">تصدير</button>
            <button className="rounded-[0.9rem] bg-[#C79C45] px-4 py-2 text-sm font-black text-[#0B1726]">إضافة فرصة جديدة</button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {["الكل (24)", "جاهزة للطرح", "قيد الدراسة (8)", "قيد المراجعة (5)", "معتمدة (3)", "مؤرشفة (2)"].map((chip, index) => (
            <button key={chip} className={`rounded-[0.9rem] border px-4 py-2 text-sm font-bold ${index === 0 ? "border-[#D0A243]/35 bg-[#C79C45]/14 text-[#E8C36B]" : "border-white/10 bg-white/[0.03] text-white/72"}`}>
              {chip}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[1.4rem] border border-white/8 bg-white/[0.02]">
          <table className="w-full text-right">
            <thead className="bg-white/[0.04] text-[13px] text-white/56">
              <tr>
                <th className="px-4 py-4 font-semibold">الفرصة</th>
                <th className="px-4 py-4 font-semibold">التصنيف</th>
                <th className="px-4 py-4 font-semibold">الموقع</th>
                <th className="px-4 py-4 font-semibold">نسبة الجاهزية</th>
                <th className="px-4 py-4 font-semibold">قيمة الاستثمار</th>
                <th className="px-4 py-4 font-semibold">العائد المتوقع</th>
                <th className="px-4 py-4 font-semibold">المرحلة</th>
                <th className="px-4 py-4 font-semibold">تاريخ التحديث</th>
                <th className="px-4 py-4 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {opportunityRows.map((row) => (
                <tr key={row.title} className="border-t border-white/6 text-sm text-white/78">
                  <td className="px-4 py-5 font-semibold text-white">{row.title}</td>
                  <td className="px-4 py-5 text-[#D8A84F]">{row.category}</td>
                  <td className="px-4 py-5 text-white/62">{row.location}</td>
                  <td className="px-4 py-5">{row.readiness}</td>
                  <td className="px-4 py-5">{row.value}</td>
                  <td className="px-4 py-5">{row.roi}</td>
                  <td className="px-4 py-5">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${stageBadge(row.stage)}`}>{row.stage}</span>
                  </td>
                  <td className="px-4 py-5 text-white/52">{row.updated}</td>
                  <td className="px-4 py-5">
                    <div className="flex justify-end gap-2">
                      <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-white/[0.03] text-white/72"><Pencil size={15} /></button>
                      <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-white/[0.03] text-white/72"><Eye size={15} /></button>
                      <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-white/[0.03] text-white/72"><MoreVertical size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AdminBottomSupport() {
  return null;
}
