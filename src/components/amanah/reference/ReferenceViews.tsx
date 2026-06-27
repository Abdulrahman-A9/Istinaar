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
      className={`relative overflow-hidden rounded-[1.05rem] border border-white/8 bg-[radial-gradient(circle_at_24%_22%,rgba(78,141,194,0.16),transparent_30%),radial-gradient(circle_at_72%_64%,rgba(208,162,67,0.13),transparent_32%),linear-gradient(145deg,#102337_0%,#0B1A2A_48%,#07121F_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${compact ? "p-2.5" : "p-3"}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: compact ? "30px 30px" : "34px 34px",
        }}
      />
      <div className="absolute inset-x-3 top-3 z-20 flex items-start justify-between gap-3">
        <button className="flex min-w-[132px] items-center justify-between rounded-[0.65rem] border border-white/10 bg-[#0B1726]/86 px-3 py-2 text-[11px] font-bold text-white/70 shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
          <ChevronDown size={14} />
          جميع الأحياء
        </button>
        <div className="rounded-[0.85rem] border border-white/10 bg-[#07121F]/78 px-3 py-2 text-right shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
          <div className="flex items-center justify-end gap-2 text-[11px] font-bold text-white/74"><span>جاهزة للطرح</span><MapStateDot state="ready" /></div>
          <div className="mt-2 flex items-center justify-end gap-2 text-[11px] font-bold text-white/74"><span>قيد المراجعة</span><MapStateDot state="review" /></div>
          <div className="mt-2 flex items-center justify-end gap-2 text-[11px] font-bold text-white/74"><span>متعثرة</span><MapStateDot state="blocked" /></div>
        </div>
      </div>
      <svg className={`relative z-10 w-full ${compact ? "h-[270px] sm:h-[330px]" : "h-[360px] sm:h-[470px] 2xl:h-[520px]"}`} viewBox="0 0 860 500" fill="none">
        <defs>
          <filter id="hailMapGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.58 0 0 0 0 0.78 0 0 0 0 1 0 0 0 0.35 0" />
            <feBlend in="SourceGraphic" />
          </filter>
          <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="cityCore" x1="70" y1="68" x2="812" y2="438" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B334A" stopOpacity=".88" />
            <stop offset=".52" stopColor="#13283E" stopOpacity=".9" />
            <stop offset="1" stopColor="#0B1928" stopOpacity=".94" />
          </linearGradient>
        </defs>

        <path d="M68 156C154 59 329 37 501 60C665 82 805 178 828 300C847 401 717 465 542 467C346 470 156 396 72 275C40 229 38 190 68 156Z" fill="url(#cityCore)" stroke="#607487" strokeOpacity=".12" />

        <g opacity=".28">
          {Array.from({ length: 13 }).map((_, index) => (
            <path key={`minor-h-${index}`} d={`M${70 + index * 42} 86C${130 + index * 34} 156 ${140 + index * 28} 315 ${86 + index * 48} 450`} stroke="#7990A5" strokeWidth="1" strokeOpacity=".36" />
          ))}
          {Array.from({ length: 10 }).map((_, index) => (
            <path key={`minor-v-${index}`} d={`M78 ${112 + index * 34}C220 ${86 + index * 22} 520 ${126 + index * 18} 806 ${90 + index * 31}`} stroke="#7990A5" strokeWidth="1" strokeOpacity=".28" />
          ))}
        </g>

        <g filter="url(#roadGlow)">
          <path d="M80 286C202 205 315 170 441 174C582 178 701 221 820 308" stroke="#C49B4A" strokeOpacity=".48" strokeWidth="5" />
          <path d="M101 365C231 292 373 255 517 270C634 282 728 340 806 408" stroke="#C49B4A" strokeOpacity=".38" strokeWidth="4" />
          <path d="M47 205C176 174 326 145 486 156C638 166 745 217 832 277" stroke="#8EA1B1" strokeOpacity=".28" strokeWidth="3" />
          <path d="M199 52L676 458" stroke="#8EA1B1" strokeOpacity=".3" strokeWidth="4" />
          <path d="M167 447L744 97" stroke="#8EA1B1" strokeOpacity=".29" strokeWidth="4" />
          <path d="M337 42C361 148 374 285 349 461" stroke="#8EA1B1" strokeOpacity=".24" strokeWidth="2.5" />
          <path d="M525 53C499 170 499 304 534 454" stroke="#8EA1B1" strokeOpacity=".22" strokeWidth="2.5" />
          <path d="M137 147C258 94 443 81 606 128C734 165 802 246 786 333C769 428 614 462 439 431C256 398 113 306 111 217C110 190 117 165 137 147Z" stroke="#C49B4A" strokeOpacity=".25" strokeWidth="2" />
          <path d="M190 183C285 141 429 138 556 168C665 194 733 257 723 323C712 395 601 425 462 406C317 386 205 323 184 252C176 225 176 201 190 183Z" stroke="#C49B4A" strokeOpacity=".2" strokeWidth="2" />
          <path d="M261 215C347 184 475 190 581 225C660 252 704 304 679 353C646 418 494 420 364 372C270 337 224 263 261 215Z" stroke="#C49B4A" strokeOpacity=".18" strokeWidth="2" />
        </g>

        <g filter="url(#hailMapGlow)" opacity=".72">
          <path d="M151 132L257 100L344 137L302 212L177 210Z" fill="#23374D" stroke="#6B7E8D" strokeOpacity=".38" />
          <path d="M354 100L497 70L604 115L559 211L388 196Z" fill="#263B59" stroke="#718496" strokeOpacity=".34" />
          <path d="M622 123L709 87L797 137L820 223L719 263L632 215Z" fill="#203549" stroke="#718496" strokeOpacity=".34" />
          <path d="M278 239L416 171L516 251L449 351L305 325Z" fill="#544B31" stroke="#F3B942" strokeOpacity=".7" strokeWidth="2" />
          <path d="M521 246L637 217L743 299L686 386L528 350Z" fill="#21384E" stroke="#718496" strokeOpacity=".3" />
          <path d="M207 336L327 331L397 408L305 456L185 421Z" fill="#1C3D3A" stroke="#45D873" strokeOpacity=".28" />
          <path d="M430 356L546 330L638 385L596 459L455 456Z" fill="#1B3350" stroke="#57A0FF" strokeOpacity=".28" />
        </g>
      </svg>

      {mapPoints.map((point) => (
        <div key={point.label} className="absolute z-20 text-center" style={{ top: point.top, right: point.right }}>
          <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#102438]/90 shadow-[0_0_0_8px_rgba(255,255,255,0.04)]">
            <MapStateDot state={point.state as "ready" | "review" | "blocked"} />
          </div>
          <span className="rounded-full bg-[#091521]/88 px-2.5 py-1 text-[11px] font-bold text-white/88">{point.label}</span>
        </div>
      ))}

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-[0.72rem] border border-white/10 bg-[#132338]/88 text-white/84">
          <Plus size={16} />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-[0.72rem] border border-white/10 bg-[#132338]/88 text-white/84">
          <Minus size={16} />
        </button>
      </div>
      <button className="absolute bottom-4 left-4 z-20 rounded-[0.78rem] border border-[#D0A243]/28 bg-white/[0.08] px-4 py-2 text-[12px] font-black text-[#E8C36B] shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
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
  const metricCardThemes = [
    "bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.18),transparent_34%),linear-gradient(180deg,rgba(20,38,60,0.96)_0%,rgba(12,28,47,0.98)_100%)]",
    "bg-[radial-gradient(circle_at_top_right,rgba(78,163,255,0.16),transparent_34%),linear-gradient(180deg,rgba(20,38,60,0.96)_0%,rgba(12,28,47,0.98)_100%)]",
    "bg-[radial-gradient(circle_at_top_right,rgba(61,211,128,0.15),transparent_34%),linear-gradient(180deg,rgba(20,38,60,0.96)_0%,rgba(12,28,47,0.98)_100%)]",
    "bg-[radial-gradient(circle_at_top_right,rgba(188,125,255,0.14),transparent_34%),linear-gradient(180deg,rgba(20,38,60,0.96)_0%,rgba(12,28,47,0.98)_100%)]",
    "bg-[radial-gradient(circle_at_top_right,rgba(255,124,124,0.14),transparent_34%),linear-gradient(180deg,rgba(20,38,60,0.96)_0%,rgba(12,28,47,0.98)_100%)]",
  ];

  return (
    <div className="space-y-3">
      <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {executiveMetrics.map((metric, index) => (
          <article
            key={metric.label}
            className={`executive-card-glow ${["glow-gold", "glow-blue", "glow-green", "glow-violet", "glow-red"][index % 5]} min-h-[126px] rounded-[1rem] border border-white/8 px-4 py-3 shadow-[0_14px_28px_rgba(0,0,0,0.14)] ${metricCardThemes[index % metricCardThemes.length]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[0.8rem] border border-[#D0A243]/38 bg-white/[0.04]">
                <MetricIcon type={metric.icon} />
              </div>
              <div className="text-right">
                <p className="text-[11px] leading-5 text-white/68">{metric.label}</p>
                <p className="mt-1.5 font-['Tajawal'] text-[1.75rem] font-black leading-none text-white">{metric.value}</p>
                {metric.unit ? <p className="mt-1.5 text-[11px] text-white/44">{metric.unit}</p> : null}
              </div>
            </div>
            <p className="mt-3 text-right text-[11px] font-bold text-[#28F0AE]">{metric.delta}</p>
          </article>
        ))}

        <article className="executive-card-glow glow-gold min-h-[126px] rounded-[1rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(61,211,128,0.1),transparent_24%),linear-gradient(180deg,rgba(21,39,59,0.96)_0%,rgba(12,28,47,0.98)_100%)] px-4 py-3 text-right shadow-[0_14px_28px_rgba(0,0,0,0.14)]">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-[#263848] px-3 py-1.5 text-[11px] font-black text-[#EFCF81]">AI</span>
            <p className="text-[11px] text-white/48">الذكاء التنفيذي يقترح</p>
          </div>
          <h3 className="mt-2 font-['Tajawal'] text-[1.25rem] font-black leading-[1.4] text-white">توصية جاهزة</h3>
          <p className="mt-1.5 line-clamp-2 text-[12px] leading-6 text-white/62">اعتماد فرصة تطوير موقع حي مشار مع جاهزية تنظيمية عالية.</p>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[12px] font-black text-[#42DD71]">83%</span>
            <span className="text-[11px] text-white/50">نسبة الجاهزية</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[83%] rounded-full bg-[#42DD71]" />
          </div>
        </article>
      </div>

      <div className="grid items-start gap-3 2xl:grid-cols-[1.22fr_0.78fr]">
        <DarkCard
          title="خريطة أولويات الأحياء"
          subtitle="التحليل المكاني المباشر"
          action={<button className="rounded-[1rem] border border-[#D0A243]/30 bg-white/[0.03] px-5 py-3 text-sm font-bold text-[#E4C982]">عرض طبقات الخريطة</button>}
        >
          <div className="grid items-start gap-3 lg:grid-cols-[210px_minmax(0,1fr)]">
            <div className="space-y-3">
              <button className="flex w-full items-center justify-between rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-[12px] font-bold text-white">
                <ChevronDown size={18} />
                حي الجامعيين
              </button>
              <div className="rounded-[1rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(78,163,255,0.14),transparent_40%),linear-gradient(180deg,rgba(18,34,52,0.96)_0%,rgba(11,23,37,0.98)_100%)] p-3 text-right">
                <p className="mb-2 font-['Tajawal'] text-[0.95rem] font-black text-white">حالة الأحياء</p>
                <div className="space-y-2.5 text-[12px] text-white/78">
                  <div className="flex items-center justify-between"><MapStateDot state="ready" /><span>جاهزة للطرح</span></div>
                  <div className="flex items-center justify-between"><MapStateDot state="review" /><span>قيد المراجعة</span></div>
                  <div className="flex items-center justify-between"><MapStateDot state="blocked" /><span>متعثرة</span></div>
                </div>
              </div>
              <div className="rounded-[1rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(61,211,128,0.14),transparent_40%),linear-gradient(180deg,rgba(18,34,52,0.96)_0%,rgba(11,23,37,0.98)_100%)] p-3 text-right">
                <p className="text-[11px] text-white/46">الحي المحدد</p>
                <p className="mt-1.5 font-['Tajawal'] text-[1.25rem] font-black text-white">حي الجامعيين</p>
                <p className="mt-1.5 text-[11px] text-white/56">آخر تحديث: 28-03-2026</p>
              </div>
            </div>
            <ExecutiveMap compact />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              ["الأحياء الجاهزة", "6 أحياء", "أولوية رفع مباشرة", "#42DD71"],
              ["المعوقات المتكررة", "3 عناصر", "تحتاج متابعة تنظيمية", "#F0B846"],
              ["قيمة الفرص المكانية", "67.9", "مليون ريال متوقع", "#D0A243"],
            ].map(([label, value, note, color]) => (
              <div key={String(label)} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
                <p className="text-[12px] text-white/42">{label}</p>
                <p className="mt-2 font-['Tajawal'] text-[1.45rem] font-black text-white">{value}</p>
                <p className="mt-2 text-[12px]" style={{ color: String(color) }}>{note}</p>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard title="أهم القرارات اليوم" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>}>
          <div className="space-y-3">
            {executiveDecisions.map((decision) => (
              <div key={decision.title} className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <button className="rounded-[0.95rem] border border-[#D0A243]/28 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white/84">
                    {decision.action}
                  </button>
                  <div className="min-w-0 flex-1 text-right">
                    <h3 className="font-['Tajawal'] text-[1.04rem] font-black leading-8 text-white">{decision.title}</h3>
                    <p className="mt-1 text-sm text-white/48">{decision.subtitle}</p>
                    <div className="mt-3 flex items-center justify-end gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${cardTone(decision.tone)}`}>{decision.status}</span>
                      <span className="text-xs text-white/36">{decision.age}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DarkCard>
      </div>

      <div className="grid items-stretch gap-3 2xl:grid-cols-[0.88fr_0.88fr_1fr]">
        <DarkCard title="مؤشرات الأداء الرئيسية" className="h-full">
          <div className="grid grid-cols-2 gap-3">
            {kpis.map(([value, label], index) => (
              <div key={label} className="text-center">
                <div className="mx-auto h-20 w-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart data={[{ value: Number(value.replace("%", "")) }]} innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270}>
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar dataKey="value" cornerRadius={12} fill={index === 0 || index === 3 ? "#D8B25A" : "#85E26E"} background={{ fill: "rgba(255,255,255,0.1)" }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-[1.45rem] font-black text-white">{value}</p>
                <p className="mt-1 text-[12px] leading-6 text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </DarkCard>

        <div className="grid h-full gap-3">
          <DarkCard title="رحلة الفرصة الاستثمارية" className="h-full">
            <div className="flex items-start justify-between gap-2">
              {stages.map((stage) => (
                <div key={stage.label} className="flex-1 text-center">
                  <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border ${stage.active ? (stage.gold ? "border-[#D0A243] bg-[#C79C45]" : "border-[#39D56E] bg-[#173C2A]") : "border-white/12 bg-white/[0.04]"}`}>
                    {stage.active ? <Check size={18} className={stage.gold ? "text-white" : "text-[#39D56E]"} /> : <span className="h-2.5 w-2.5 rounded-full bg-white/28" />}
                  </div>
                  <p className={`mt-2 text-[12px] font-bold ${stage.active ? (stage.gold ? "text-[#E6C16A]" : "text-[#56DD77]") : "text-white/54"}`}>{stage.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 2xl:grid-cols-6">
              {["1 تشغيل", "8 تحليل", "3 اعتماد", "كل الإنجاز", "2 طرح", "1 تشغيل"].map((item) => (
                <div key={item} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3 text-center text-sm font-bold text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </DarkCard>

          <DarkCard title="تنبيهات ذكية" className="h-full">
            <div className="space-y-3">
              {[
                ["فرصة تجاوزت مدة الاعتماد المستهدفة في حي النقرة", "#FF5A5F"],
                ["دراسة ميدانية لمشروع حي الوسيطاء تحتاج تحديثاً عاجلاً", "#F0B846"],
              ].map(([text, color]) => (
                <div key={text} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
                  <span className="h-3.5 w-3.5 rounded-full" style={{ background: color }} />
                  <p className="text-sm leading-8 text-white/78">{text}</p>
                </div>
              ))}
            </div>
          </DarkCard>
        </div>

        <DarkCard title="الأثر الاقتصادي المتوقع" action={<button className="text-sm font-black text-[#D0A243]">عرض التقرير</button>} className="h-full">
          <div className="h-[310px]">
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
