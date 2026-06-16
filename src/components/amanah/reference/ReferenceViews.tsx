"use client";

import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ClipboardList,
  Coins,
  Eye,
  FileSpreadsheet,
  Minus,
  MoreVertical,
  Pencil,
  Plus,
  ShieldAlert,
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
  icon: "coins" | "trend" | "users" | "bars" | "briefcase" | "clipboard";
};

type Decision = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusTone: "green" | "amber" | "red";
  action: string;
  age: string;
};

type MapPoint = {
  id: string;
  label: string;
  state: "ready" | "review" | "blocked";
  top: string;
  right: string;
};

const executiveMetrics: Metric[] = [
  { label: "قيمة الاستثمار المتوقعة", value: "211.7", unit: "مليون ريال", delta: "+18% عن الشهر الماضي", icon: "coins" },
  { label: "مؤشر جاهزية الاستثمار", value: "83%", delta: "+7% عن الشهر الماضي", icon: "trend" },
  { label: "الوظائف المتوقعة", value: "1,248", unit: "وظيفة", delta: "+26% عن الشهر الماضي", icon: "users" },
  { label: "العوائد السنوية المتوقعة", value: "28.4", unit: "مليون ريال", delta: "+15% عن الشهر الماضي", icon: "bars" },
  { label: "عدد الفرص الاستثمارية", value: "24", unit: "فرصة", delta: "6 جاهزة للطرح", icon: "briefcase" },
  { label: "القرارات المطلوبة", value: "6", unit: "قرار", delta: "تحتاج إجراء", icon: "clipboard" },
];

const executiveDecisions: Decision[] = [
  {
    id: "1",
    title: "رفع فرصة تطوير موقع حي مشار",
    subtitle: "جاهزية عالية - بانتظار الاعتماد",
    status: "عالية",
    statusTone: "green",
    action: "اتخاذ إجراء",
    age: "منذ 2 يوم",
  },
  {
    id: "2",
    title: "اعتماد دراسة تطوير حي النقرة",
    subtitle: "جاهزة للاعتماد",
    status: "متوسطة",
    statusTone: "amber",
    action: "اتخاذ إجراء",
    age: "منذ 1 يوم",
  },
  {
    id: "3",
    title: "مراجعة اعتراض على شروط كراسة المنافسة",
    subtitle: "اعتراض مقدم من شركة نسك",
    status: "عالية",
    statusTone: "red",
    action: "مراجعة الاعتراض",
    age: "منذ 3 أيام",
  },
  {
    id: "4",
    title: "اعتماد شراكة استثمارية لمشروع الوسيطاء",
    subtitle: "شريك استراتيجي - جاهز للتوقيع",
    status: "منخفضة",
    statusTone: "green",
    action: "اتخاذ إجراء",
    age: "منذ 4 أيام",
  },
];

const mapPoints: MapPoint[] = [
  { id: "naqrah", label: "حي النقرة", state: "blocked", top: "31%", right: "57%" },
  { id: "mashar", label: "حي مشار", state: "review", top: "57%", right: "42%" },
  { id: "wasitah", label: "حي الوسيطاء", state: "ready", top: "56%", right: "68%" },
  { id: "jamieen", label: "حي الجامعيين", state: "review", top: "46%", right: "35%" },
  { id: "zubarah", label: "حي الزبارة", state: "ready", top: "24%", right: "24%" },
  { id: "shifa", label: "حي الشفاء", state: "ready", top: "21%", right: "74%" },
  { id: "muntazah", label: "حي منتزه", state: "ready", top: "69%", right: "55%" },
  { id: "salam", label: "حي السلام", state: "blocked", top: "74%", right: "19%" },
];

const spatialNeighborhoodCards = [
  { name: "حي الجامعة", score: "42%", opportunities: "1", value: "1.6", state: "جاهزية منخفضة", tone: "red" },
  { name: "حي الوسيطاء", score: "65%", opportunities: "2", value: "8.7", state: "جاهزية متوسطة", tone: "amber" },
  { name: "حي النقرة", score: "71%", opportunities: "3", value: "15.2", state: "جاهزية جيدة", tone: "green" },
  { name: "حي الجامعيين", score: "83%", opportunities: "6", value: "32.5", state: "جاهزة للطرح", tone: "green" },
];

const opportunityRows = [
  {
    title: "تطوير موقع حي مشار",
    category: "تجاري",
    location: "حي مشار - شمال حائل",
    readiness: "83%",
    value: "28.5 مليون ر.س",
    roi: "27%",
    stage: "جاهزة للطرح",
    updated: "منذ 2 يوم",
  },
  {
    title: "تطوير حي النقرة",
    category: "سكني",
    location: "حي النقرة - غرب حائل",
    readiness: "71%",
    value: "15.2 مليون ر.س",
    roi: "23%",
    stage: "قيد الدراسة",
    updated: "منذ 5 يوم",
  },
  {
    title: "مشروع الوسيطاء التجاري",
    category: "تجاري",
    location: "حي الوسيطاء - جنوب حائل",
    readiness: "65%",
    value: "8.7 مليون ر.س",
    roi: "19%",
    stage: "قيد المراجعة",
    updated: "منذ 1 أسبوع",
  },
  {
    title: "مركز تجاري حي الجامعة",
    category: "تجاري",
    location: "حي الجامعة - شرق حائل",
    readiness: "42%",
    value: "3.1 مليون ر.س",
    roi: "14%",
    stage: "قيد الدراسة",
    updated: "منذ 2 أسبوع",
  },
  {
    title: "تطوير الواجهة الشمالية",
    category: "ترفيهي",
    location: "الواجهة الشمالية",
    readiness: "38%",
    value: "12.4 مليون ر.س",
    roi: "18%",
    stage: "معتمدة",
    updated: "منذ 3 أسبوع",
  },
];

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
      className={`rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(10,23,38,0.98)_100%)] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] ${className}`}
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

function MetricIcon({ type }: { type: Metric["icon"] }) {
  const common = "text-[#D8A84F]";
  switch (type) {
    case "coins":
      return <Coins size={21} className={common} />;
    case "trend":
      return <TrendingUp size={21} className={common} />;
    case "users":
      return <Users size={21} className={common} />;
    case "bars":
      return <FileSpreadsheet size={21} className={common} />;
    case "briefcase":
      return <BriefcaseBusiness size={21} className={common} />;
    default:
      return <ClipboardList size={21} className={common} />;
  }
}

function MapStateDot({ state }: { state: "ready" | "review" | "blocked" }) {
  const tone = state === "ready" ? "bg-[#39D56E]" : state === "review" ? "bg-[#F3B942]" : "bg-[#FF5A5F]";
  return <span className={`h-3.5 w-3.5 rounded-full ${tone} shadow-[0_0_18px_currentColor]`} />;
}

function decisionTone(tone: "green" | "amber" | "red") {
  if (tone === "green") return "bg-[#173C2A] text-[#4FE07C]";
  if (tone === "amber") return "bg-[#3B3120] text-[#F3C04F]";
  return "bg-[#3F2226] text-[#FF6B72]";
}

function stageTone(active: boolean, gold: boolean) {
  if (!active) return "border-white/12 bg-white/[0.04]";
  return gold ? "border-[#D0A243] bg-[#C79C45]" : "border-[#39D56E] bg-[#173C2A]";
}

function ExecutiveMap({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.3rem] border border-white/8 bg-[radial-gradient(circle_at_top,#18283d_0%,#0e1f30_58%,#0a1826_100%)] ${compact ? "p-3" : "p-4"}`}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: compact ? "30px 30px" : "34px 34px",
        }}
      />
      <div className="absolute inset-[8%] rounded-[50%] border border-[#83622A]/30" />
      <div className="absolute inset-[18%] rounded-[50%] border border-[#83622A]/28" />
      <div className="absolute inset-[28%] rounded-[50%] border border-[#83622A]/24" />
      <svg className={`relative z-10 w-full ${compact ? "h-[300px]" : "h-[390px]"}`} viewBox="0 0 780 430" fill="none">
        <path d="M76 225C156 151 250 98 356 84C493 66 607 103 706 191" stroke="#61513A" strokeOpacity=".48" strokeWidth="4" />
        <path d="M87 293C181 254 278 220 389 210C515 199 607 218 712 285" stroke="#61513A" strokeOpacity=".42" strokeWidth="3" />
        <path d="M167 97L628 334" stroke="#564A38" strokeOpacity=".35" strokeWidth="3" />
        <path d="M169 327L613 124" stroke="#564A38" strokeOpacity=".3" strokeWidth="3" />
        <path d="M244 56V368" stroke="#63533B" strokeOpacity=".25" />
        <path d="M443 34V391" stroke="#63533B" strokeOpacity=".22" />
        <path d="M108 158H671" stroke="#63533B" strokeOpacity=".22" />
        <path d="M102 258H682" stroke="#63533B" strokeOpacity=".18" />
      </svg>

      {mapPoints.map((point) => (
        <div key={point.id} className="absolute z-20 text-center" style={{ top: point.top, right: point.right }}>
          <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#102438]/90 shadow-[0_0_0_8px_rgba(255,255,255,0.04)]">
            <MapStateDot state={point.state} />
          </div>
          <span className="rounded-full bg-[#091521]/88 px-2.5 py-1 text-[11px] font-bold text-white/88">{point.label}</span>
        </div>
      ))}

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-[#132338]/88">
          <Plus size={16} />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-[#132338]/88">
          <Minus size={16} />
        </button>
      </div>
    </div>
  );
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
  const alertItems = [
    ["فرصة تجاوزت مدة الاعتماد المستهدفة في حي النقرة", "#FF5A5F"],
    ["دراسة ميدانية لمشروع حي الوسيطاء تحتاج تحديثاً عاجلاً", "#F0B846"],
  ];
  const kpis = [
    ["83%", "جاهزية الأحياء"],
    ["76%", "سرعة الاعتماد"],
    ["91%", "رضا المستثمرين"],
    ["68%", "استغلال الأراضي"],
  ];

  return (
    <div className="space-y-3">
      <div className="grid items-start gap-3 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid items-start gap-3 md:grid-cols-3 2xl:grid-cols-6">
          {executiveMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(20,38,60,0.96)_0%,rgba(12,28,47,0.98)_100%)] px-4 py-4 shadow-[0_16px_32px_rgba(0,0,0,0.16)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[#D0A243]/38 bg-white/[0.04]">
                  <MetricIcon type={metric.icon} />
                </div>
                <div className="text-right">
                  <p className="text-[12px] leading-6 text-white/68">{metric.label}</p>
                  <p className="mt-2 font-['Tajawal'] text-[2rem] font-black leading-none text-white">{metric.value}</p>
                  {metric.unit ? <p className="mt-2 text-[12px] text-white/44">{metric.unit}</p> : null}
                </div>
              </div>
              <p className="mt-3 text-right text-[12px] font-bold text-[#28F0AE]">{metric.delta}</p>
            </article>
          ))}
        </div>

        <DarkCard title="توصية جاهزة" subtitle="الذكاء التنفيذي يقترح" className="h-full">
          <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4 text-right">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#263848] px-4 py-2 text-xs font-black text-[#EFCF81]">AI</span>
              <p className="text-sm text-white/48">يوصى بالإسراع في اعتماد الفرصة</p>
            </div>
            <h3 className="mt-4 font-['Tajawal'] text-[1.9rem] font-black leading-[1.45] text-white">تطوير موقع حي مشار</h3>
            <p className="mt-3 text-[13px] leading-8 text-white/66">
              قراءة الصفحة الحالية تؤكد أن الفرصة مؤهلة للرفع الداخلي مع جدوى استثمارية مرتفعة وجاهزية تنظيمية مستقرة.
            </p>
            <div className="mt-5 rounded-[1rem] border border-white/8 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-black text-[#42DD71]">83%</span>
                <span className="text-sm text-white/50">نسبة الجاهزية</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[83%] rounded-full bg-[#42DD71]" />
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/64">
              <p>عائد استثماري متوقع مرتفع</p>
              <p>جاهزية النظام: عالية</p>
            </div>
            <div className="mt-5 space-y-3">
              <button className="w-full rounded-[1rem] bg-[#C79C45] px-4 py-3 text-sm font-black text-[#0B1726]">مراجعة الآن</button>
              <button className="w-full rounded-[1rem] border border-white/8 px-4 py-3 text-sm font-semibold text-white/74">عرض جميع التوصيات</button>
            </div>
          </div>
        </DarkCard>
      </div>

      <div className="grid items-start gap-3 xl:grid-cols-[0.9fr_1.1fr]">
        <DarkCard title="أهم القرارات اليوم" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>} className="h-full">
          <div className="space-y-3">
            {executiveDecisions.map((decision) => (
              <div key={decision.id} className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <button className="rounded-[0.95rem] border border-[#D0A243]/28 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white/84">
                    {decision.action}
                  </button>
                  <div className="min-w-0 flex-1 text-right">
                    <h3 className="font-['Tajawal'] text-[1.08rem] font-black leading-8 text-white">{decision.title}</h3>
                    <p className="mt-1 text-sm text-white/48">{decision.subtitle}</p>
                    <div className="mt-3 flex items-center justify-end gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${decisionTone(decision.statusTone)}`}>{decision.status}</span>
                      <span className="text-xs text-white/36">{decision.age}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard
          title="خريطة أولويات الأحياء"
          subtitle="التحليل المكاني المباشر"
          action={<button className="rounded-[1rem] border border-[#D0A243]/30 bg-white/[0.03] px-5 py-3 text-sm font-bold text-[#E4C982]">عرض طبقات الخريطة</button>}
          className="h-full"
        >
          <div className="grid items-start gap-3 lg:grid-cols-[250px_minmax(0,1fr)]">
            <div className="space-y-3">
              <button className="flex w-full items-center justify-between rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold">
                <ChevronDown size={18} />
                حي الجامعيين
              </button>
              <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-4 text-right">
                <p className="mb-3 font-['Tajawal'] text-[1.05rem] font-black text-white">حالة الأحياء</p>
                <div className="space-y-3 text-sm text-white/78">
                  <div className="flex items-center justify-between">
                    <MapStateDot state="ready" />
                    <span>جاهزة للطرح</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <MapStateDot state="review" />
                    <span>قيد المراجعة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <MapStateDot state="blocked" />
                    <span>متعثرة</span>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-4 text-right">
                <p className="text-sm text-white/46">الحي المحدد</p>
                <p className="mt-2 font-['Tajawal'] text-[1.5rem] font-black text-white">حي الجامعيين</p>
                <p className="mt-2 text-sm text-white/56">آخر تحديث: 28-03-2026</p>
              </div>
            </div>
            <ExecutiveMap compact />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              ["الأحياء الجاهزة", "6 أحياء", "أولوية رفع مباشر", "#42DD71"],
              ["المعوقات المتكررة", "3 عناصر", "تحتاج متابعة تنظيمية", "#F0B846"],
              ["قيمة الفرص المكانية", "67.9", "مليون ريال متوقع", "#D0A243"],
            ].map(([label, value, note, color]) => (
              <div key={String(label)} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
                <p className="text-[12px] text-white/42">{label}</p>
                <p className="mt-2 font-['Tajawal'] text-[1.5rem] font-black text-white">{value}</p>
                <p className="mt-2 text-[12px]" style={{ color: String(color) }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </DarkCard>
      </div>

      <div className="grid items-start gap-3 xl:grid-cols-[0.92fr_0.84fr_0.84fr]">
        <DarkCard title="الأثر الاقتصادي المتوقع" action={<button className="text-sm font-black text-[#D0A243]">عرض التقرير</button>} className="h-full">
          <div className="mb-4 flex justify-start">
            <button className="rounded-[0.8rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">سنوي</button>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.4)" />
                <YAxis tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.35)" />
                <Tooltip />
                <Line type="monotone" dataKey="projected" stroke="#54E070" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="approved" stroke="#D7A84F" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DarkCard>

        <div className="grid items-start gap-3">
          <DarkCard title="رحلة الفرصة الاستثمارية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>} className="h-full">
            <div className="flex items-start justify-between gap-2">
              {stages.map((stage) => (
                <div key={stage.label} className="flex-1 text-center">
                  <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border ${stageTone(stage.active, stage.gold)}`}>
                    {stage.active ? <Check size={18} className={stage.gold ? "text-white" : "text-[#39D56E]"} /> : <span className="h-2.5 w-2.5 rounded-full bg-white/28" />}
                  </div>
                  <p className={`mt-2 text-[12px] font-bold ${stage.active ? (stage.gold ? "text-[#E6C16A]" : "text-[#56DD77]") : "text-white/54"}`}>{stage.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 xl:grid-cols-6">
              {["1 تشغيل", "8 تحليل", "3 اعتماد", "كل الإنجاز", "2 طرح", "1 تشغيل"].map((item) => (
                <div key={item} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3 text-center text-sm font-bold text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </DarkCard>

          <DarkCard title="تنبيهات ذكية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>} className="h-full">
            <div className="space-y-3">
              {alertItems.map(([text, color]) => (
                <div key={text} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
                  <span className="h-3.5 w-3.5 rounded-full" style={{ background: color }} />
                  <p className="text-sm leading-8 text-white/78">{text}</p>
                </div>
              ))}
            </div>
          </DarkCard>
        </div>

        <DarkCard title="مؤشرات الأداء الرئيسية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>} className="h-full">
          <div className="grid grid-cols-2 gap-3">
            {kpis.map(([value, label], index) => (
              <div key={label} className="text-center">
                <div className="mx-auto h-20 w-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart data={[{ value: Number(value.replace("%", "")) }]} innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270}>
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar
                        dataKey="value"
                        cornerRadius={12}
                        fill={index === 0 || index === 3 ? "#D8B25A" : "#85E26E"}
                        background={{ fill: "rgba(255,255,255,0.1)" }}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-[1.5rem] font-black text-white">{value}</p>
                <p className="mt-1 text-[12px] leading-6 text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </DarkCard>
      </div>
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
    { name: "متوسطة", value: 33, fill: "#C98A1E" },
    { name: "متعثرة", value: 32, fill: "#2B56D9" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid items-start gap-4 xl:grid-cols-[0.92fr_1.18fr]">
        <DarkCard title="تنبيهات تستحق العرض" subtitle="مختصرة وواضحة">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert} className="flex items-center justify-between rounded-[1.2rem] bg-[#F8EEEB] px-5 py-5 text-right text-[#09121D]">
                <ShieldAlert size={20} className="text-[#DD4A32]" />
                <p className="text-base font-semibold">{alert}</p>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard title="ملخص القرار الحالي" subtitle="ما الذي تغير فعلاً">
          <div className="grid items-start gap-4 lg:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-5 text-right">
              <p className="text-sm text-white/48">أولوية الحي</p>
              <h3 className="mt-3 font-['Tajawal'] text-[2rem] font-black text-white">حي مشار</h3>
              <p className="mt-3 text-base leading-9 text-white/66">الواجهة السياحية الأسرع نمواً للمشاريع الموسمية وتجارب الواجهة.</p>
              <p className="mt-6 text-sm font-black text-[#D3A248]">مؤشر الأولوية 82%</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-5 text-right">
              <p className="text-sm text-white/48">أقوى فرصة حالياً</p>
              <h3 className="mt-3 font-['Tajawal'] text-[1.8rem] font-black leading-[1.55] text-white">وجهة عائلية موسمية في مشار</h3>
              <p className="mt-3 text-base leading-9 text-white/66">يوصى بالإعداد للرفع الرسمي بعد مراجعة الصياغة النهائية للطرح.</p>
              <span className="mt-5 inline-flex rounded-full bg-[#DDF8E7] px-4 py-2 text-sm font-black text-[#1E8148]">معتمد داخلياً</span>
            </div>
          </div>
        </DarkCard>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[1fr_0.92fr]">
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
    </div>
  );
}

export function IntelligenceSpatialReference() {
  return (
    <div className="space-y-4">
      <div className="grid items-start gap-4 xl:grid-cols-[0.32fr_1fr_0.28fr]">
        <DarkCard title="فلترة التحليل">
          <div className="space-y-4">
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
        </DarkCard>

        <DarkCard title="خريطة الأولويات المكانية" subtitle="تحليل الأحياء">
          <ExecutiveMap />
        </DarkCard>

        <DarkCard title="طبقات الخريطة">
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
        </DarkCard>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-4">
        {spatialNeighborhoodCards.map((card) => (
          <div key={card.name} className="rounded-[1.3rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(10,23,38,0.98)_100%)] px-5 py-5 text-right">
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-black ${card.tone === "green" ? "bg-[#173C2A] text-[#4FE07C]" : card.tone === "amber" ? "bg-[#3B3120] text-[#F3C04F]" : "bg-[#3F2226] text-[#FF6B72]"}`}>
                {card.state}
              </span>
              <h3 className="font-['Tajawal'] text-[1.2rem] font-black text-white">{card.name}</h3>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/66">
              <div>
                <p>نسبة الجاهزية</p>
                <p className="mt-1 text-lg font-black text-white">{card.score}</p>
              </div>
              <div>
                <p>عدد الفرص</p>
                <p className="mt-1 text-lg font-black text-white">{card.opportunities}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#D8A84F]">قيمة تقديرية {card.value} مليون ر.س</p>
          </div>
        ))}
      </div>
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
      <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,23,38,0.98)_0%,rgba(8,19,32,0.98)_100%)] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["الكل (24)", "جاهزة للطرح", "قيد الدراسة (8)", "قيد المراجعة (5)", "معتمدة (3)", "مؤرشفة (2)"].map((chip, index) => (
              <button key={chip} className={`rounded-[0.9rem] border px-4 py-2 text-sm font-bold ${index === 0 ? "border-[#D0A243]/35 bg-[#C79C45]/14 text-[#E8C36B]" : "border-white/10 bg-white/[0.03] text-white/72"}`}>
                {chip}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">الفلترة</button>
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">عرض الخريطة</button>
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">تصدير</button>
            <button className="rounded-[0.9rem] bg-[#C79C45] px-4 py-2 text-sm font-black text-[#0B1726]">إضافة فرصة جديدة</button>
          </div>
        </div>

        <div className="grid items-start gap-4 xl:grid-cols-[1fr_0.3fr]">
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
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${row.stage === "جاهزة للطرح" ? "bg-[#173C2A] text-[#59D776]" : row.stage === "قيد المراجعة" ? "bg-[#3B3120] text-[#F0B846]" : row.stage === "معتمدة" ? "bg-[#14384B] text-[#7BC9FF]" : "bg-white/[0.05] text-white/74"}`}>
                        {row.stage}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-white/52">{row.updated}</td>
                    <td className="px-4 py-5">
                      <div className="flex justify-end gap-2">
                        <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-white/[0.03] text-white/72">
                          <Pencil size={15} />
                        </button>
                        <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-white/[0.03] text-white/72">
                          <Eye size={15} />
                        </button>
                        <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-white/[0.03] text-white/72">
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-5 text-right">
            <p className="text-sm text-white/48">ملخص الفرص</p>
            <p className="mt-3 font-['Tajawal'] text-[2.8rem] font-black text-white">24</p>
            <p className="text-sm text-white/44">إجمالي الفرص</p>
            <div className="mt-6 space-y-3">
              {progress.map(([label, count, percent, color]) => (
                <div key={String(label)}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-white/44">{percent}</span>
                    <span className="text-white/82">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full rounded-full" style={{ width: String(percent), background: String(color) }} />
                    </div>
                    <span className="w-5 text-right text-sm text-white/76">{count}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-white/8 pt-5">
              <p className="text-sm text-white/48">إجمالي قيمة الاستثمار</p>
              <p className="mt-2 text-[2.25rem] font-black text-white">67.9</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminBottomSupport() {
  const areaData = [
    { month: "أكتوبر", value: 160, approved: 10 },
    { month: "نوفمبر", value: 220, approved: 14 },
    { month: "ديسمبر", value: 310, approved: 16 },
    { month: "يناير", value: 430, approved: 18 },
    { month: "فبراير", value: 404, approved: 17 },
    { month: "مارس", value: 472, approved: 20 },
  ];

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[1.02fr_0.92fr_0.88fr_0.94fr]">
      <DarkCard title="الأثر الاقتصادي المتوقع" action={<button className="text-sm font-black text-[#D0A243]">عرض التقرير</button>}>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.42)" />
              <YAxis tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.4)" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#43DE70" fill="rgba(67,222,112,0.22)" strokeWidth={3} />
              <Area type="monotone" dataKey="approved" stroke="#D8A84F" fill="rgba(216,168,79,0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </DarkCard>

      <DarkCard title="رحلة الفرصة الاستثمارية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>}>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            ["3", "دراسة جارية", "#D0A243"],
            ["✓", "تحليل مكتمل", "#10C98B"],
            ["✓", "فكرة مكتملة", "#10C98B"],
          ].map(([value, label, bg]) => (
            <div key={label}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-[1.8rem] font-black text-white" style={{ background: bg }}>
                {value}
              </div>
              <p className="mt-3 text-sm text-white/68">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[82%] rounded-full bg-white/60" />
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {["2", "3", "8", "1"].map((item) => (
            <div key={item} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-4 text-center text-[1.1rem] font-black text-white">
              {item}
            </div>
          ))}
        </div>
      </DarkCard>

      <DarkCard title="تنبيهات ذكية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>}>
        <div className="space-y-4">
          {[
            ["فرصة تجاوزت مدة الاعتماد المستهدفة في حي النقرة", "#FF4E5A"],
            ["دراسة ميدانية لمشروع حي الوسيطاء تحتاج تحديثاً عاجلاً", "#F4BC4F"],
          ].map(([text, color]) => (
            <div key={String(text)} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
              <span className="h-4 w-4 rounded-full" style={{ background: String(color) }} />
              <p className="text-sm leading-8 text-white/78">{text}</p>
            </div>
          ))}
        </div>
      </DarkCard>

      <DarkCard title="مؤشرات الأداء الرئيسية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>}>
        <div className="grid grid-cols-4 gap-3">
          {[
            ["68%", "استغلال الأراضي"],
            ["91%", "رضا المستثمرين"],
            ["76%", "سرعة الاعتماد"],
            ["83%", "جاهزية الأحياء"],
          ].map(([value, label], index) => (
            <div key={label} className="text-center">
              <div className="mx-auto h-20 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart data={[{ value: Number(value.replace("%", "")) }]} innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={12} fill={index === 0 || index === 3 ? "#D8B25A" : "#85E26E"} background={{ fill: "rgba(255,255,255,0.1)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-xl font-black text-white">{value}</p>
              <p className="mt-1 text-sm text-white/58">{label}</p>
            </div>
          ))}
        </div>
      </DarkCard>
    </div>
  );
}
