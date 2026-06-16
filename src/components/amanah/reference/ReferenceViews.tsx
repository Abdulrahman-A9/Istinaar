"use client";

import {
  BriefcaseBusiness,
  Building2,
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
import {
  executiveDecisions,
  executiveMapPoints,
  executiveMetrics,
  opportunityRows,
  recommendationFeed,
  spatialNeighborhoodCards,
} from "./referenceData";

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
    <section className={`rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(10,23,38,0.98)_100%)] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] ${className}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="text-right">
          {subtitle ? <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-[#CDA24A]">{subtitle}</p> : null}
          <h2 className="mt-1 font-['Tajawal'] text-[1.65rem] font-black text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function MetricIcon({ type }: { type: string }) {
  const common = "text-[#D8A84F]";
  switch (type) {
    case "coins":
      return <Coins size={23} className={common} />;
    case "trend":
      return <TrendingUp size={23} className={common} />;
    case "users":
      return <Users size={23} className={common} />;
    case "bars":
      return <FileSpreadsheet size={23} className={common} />;
    case "briefcase":
      return <BriefcaseBusiness size={23} className={common} />;
    default:
      return <ClipboardList size={23} className={common} />;
  }
}

function MapStateDot({ state }: { state: "ready" | "review" | "blocked" }) {
  const tone =
    state === "ready" ? "bg-[#39D56E]" : state === "review" ? "bg-[#F3B942]" : "bg-[#FF5A5F]";
  return <span className={`h-3.5 w-3.5 rounded-full ${tone} shadow-[0_0_20px_currentColor]`} />;
}

function DecisionTone({ tone }: { tone: "green" | "amber" | "red" }) {
  if (tone === "green") {
    return "bg-[#173C2A] text-[#4FE07C]";
  }
  if (tone === "amber") {
    return "bg-[#3B3120] text-[#F3C04F]";
  }
  return "bg-[#3F2226] text-[#FF6B72]";
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

  return (
    <div className="space-y-4">
      <div className="grid gap-3 xl:grid-cols-[1.08fr_1fr_0.42fr]">
        <div className="grid gap-4 md:grid-cols-3 xl:col-span-2 xl:grid-cols-6">
          {executiveMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(22,39,64,0.96)_0%,rgba(12,29,48,0.98)_100%)] px-4 py-4 shadow-[0_18px_36px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#D0A243]/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.05)_100%)]">
                  <MetricIcon type={metric.icon} />
                </div>
                <div className="text-right">
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] leading-6 text-white/72">{metric.label}</p>
                  <p className="mt-3 font-['Tajawal'] text-[2.35rem] font-black leading-none tracking-[-0.04em] text-white">{metric.value}</p>
                  {metric.unit ? <p className="mt-2 font-['IBM_Plex_Sans_Arabic'] text-[13px] text-white/46">{metric.unit}</p> : <div className="mt-2 h-[18px]" />}
                </div>
              </div>
              <p className="mt-3 text-right font-['IBM_Plex_Sans_Arabic'] text-[13px] font-bold text-[#18F5B0]">{metric.delta}</p>
            </article>
          ))}
        </div>

        <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,29,47,0.98)_0%,rgba(10,24,39,0.98)_100%)] p-4 shadow-[0_20px_42px_rgba(0,0,0,0.2)]">
          <div className="flex items-start justify-between gap-4">
            <div className="rounded-[0.9rem] bg-[#D0A243]/20 px-3 py-1 text-sm font-black text-[#DAB257]">AI</div>
            <div className="text-right">
              <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/52">الذكاء التنفيذي يقترح</p>
              <h2 className="mt-2 font-['Tajawal'] text-[1.45rem] font-black text-white">تطوير موقع حي مشار</h2>
            </div>
          </div>
          <div className="mt-4 border-t border-white/8 pt-4 text-right">
            <p className="font-['IBM_Plex_Sans_Arabic'] text-[14px] leading-8 text-white/72">يوصي بالإسراع في اعتماد فرصة</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/8">
                <div className="h-full w-[83%] rounded-full bg-[#42DD71]" />
              </div>
              <span className="text-sm font-black text-[#42DD71]">83%</span>
            </div>
            <div className="mt-4 space-y-3 text-[14px] text-white/64">
              <p>عائد استثماري متوقع مرتفع</p>
              <p>جاهزية النظام: عالية</p>
            </div>
            <button className="mt-5 w-full rounded-[0.95rem] bg-[#C79C45] px-4 py-3 text-sm font-black text-[#0B1726]">مراجعة الآن</button>
            <button className="mt-3 w-full rounded-[1rem] border border-white/8 px-4 py-3 text-sm font-semibold text-white/72">عرض جميع التوصيات</button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.12fr_0.82fr_0.38fr]">
        <DarkCard
          title="خريطة أولويات الأحياء"
          subtitle="التحليل المكاني المباشر"
          action={<button className="rounded-[1rem] border border-[#D0A243]/30 bg-white/[0.03] px-5 py-3 text-sm font-bold text-[#E4C982]">عرض طبقات الخريطة</button>}
        >
          <div className="grid gap-3 lg:grid-cols-[1fr_156px]">
            <div className="relative overflow-hidden rounded-[1.45rem] border border-white/8 bg-[radial-gradient(circle_at_top,#18283d_0%,#0e1f30_58%,#0a1826_100%)] p-3.5">
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <div className="absolute inset-[8%] rounded-[50%] border border-[#83622A]/30" />
              <div className="absolute inset-[18%] rounded-[50%] border border-[#83622A]/28" />
              <div className="absolute inset-[28%] rounded-[50%] border border-[#83622A]/24" />
              <svg className="relative z-10 h-[300px] w-full" viewBox="0 0 780 430" fill="none">
                <path d="M76 225C156 151 250 98 356 84C493 66 607 103 706 191" stroke="#61513A" strokeOpacity=".48" strokeWidth="4" />
                <path d="M87 293C181 254 278 220 389 210C515 199 607 218 712 285" stroke="#61513A" strokeOpacity=".42" strokeWidth="3" />
                <path d="M167 97L628 334" stroke="#564A38" strokeOpacity=".35" strokeWidth="3" />
                <path d="M169 327L613 124" stroke="#564A38" strokeOpacity=".3" strokeWidth="3" />
                <path d="M244 56V368" stroke="#63533B" strokeOpacity=".25" />
                <path d="M443 34V391" stroke="#63533B" strokeOpacity=".22" />
                <path d="M108 158H671" stroke="#63533B" strokeOpacity=".22" />
                <path d="M102 258H682" stroke="#63533B" strokeOpacity=".18" />
              </svg>
              {executiveMapPoints.map((point) => (
                <div key={point.id} className="absolute z-20 text-center" style={{ top: point.top, right: point.right }}>
                  <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#102438]/90 shadow-[0_0_0_8px_rgba(255,255,255,0.04)]">
                    <MapStateDot state={point.state} />
                  </div>
                  <span className="rounded-full bg-[#091521]/88 px-2.5 py-1 text-[11px] font-bold text-white/88">{point.label}</span>
                </div>
              ))}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-[#132338]/88"><Plus size={16} /></button>
                <button className="flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-white/10 bg-[#132338]/88"><Minus size={16} /></button>
              </div>
              <button className="absolute bottom-4 left-4 rounded-[0.9rem] border border-white/10 bg-[#15263a]/92 px-4 py-2.5 text-xs font-bold text-[#E8D6A5]">عرض طبقات الخريطة</button>
            </div>

            <div className="space-y-4">
              <button className="flex w-full items-center justify-between rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold">
                <ChevronDown size={18} />
                حي الجامعيين
              </button>
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-3.5 text-right">
                <p className="mb-3 font-['Tajawal'] text-[1.15rem] font-black text-white">حالة الأحياء</p>
                <div className="space-y-3 text-base">
                  <div className="flex items-center justify-between"><MapStateDot state="ready" /><span>جاهزة للطرح</span></div>
                  <div className="flex items-center justify-between"><MapStateDot state="review" /><span>قيد المراجعة</span></div>
                  <div className="flex items-center justify-between"><MapStateDot state="blocked" /><span>متعثرة</span></div>
                </div>
              </div>
            </div>
          </div>
        </DarkCard>

        <DarkCard title="أهم القرارات اليوم" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>}>
          <div className="space-y-3">
            {executiveDecisions.map((decision) => (
              <div key={decision.id} className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <button className="rounded-[1rem] border border-[#D0A243]/28 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white/84">{decision.action}</button>
                  <div className="min-w-0 flex-1 text-right">
                    <h3 className="font-['Tajawal'] text-[1.12rem] font-black text-white">{decision.title}</h3>
                    <p className="mt-1 text-sm text-white/48">{decision.subtitle}</p>
                    <div className="mt-3 flex items-center justify-end gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${DecisionTone({ tone: decision.statusTone })}`}>{decision.status}</span>
                      <span className="text-xs text-white/36">{decision.age}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard title="توصية جاهزة" subtitle="الذكاء التنفيذي يقترح">
          <div className="rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-4 text-right">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#223441] px-4 py-2 text-xs font-black text-[#F2D382]">AI</span>
              <p className="text-sm text-white/48">يوصي بالإسراع في اعتماد فرصة</p>
            </div>
            <h3 className="mt-4 font-['Tajawal'] text-[1.5rem] font-black leading-[1.5] text-white">وجهة عائلية موسمية في مشار</h3>
            <p className="mt-3 text-[13px] leading-7 text-white/66">
              تظهر القراءة الحالية أن الفرصة الواقعة في حي مشار وصلت إلى مستوى نضج يسمح بعرضها داخلياً على القيادة بوصفها ملفاً مؤهلاً للانتقال إلى المسار النظامي.
            </p>
            <div className="mt-6 rounded-[1.2rem] border border-white/8 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-black text-[#42DD71]">83%</span>
                <span className="text-sm text-white/48">نسبة الجاهزية</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[83%] rounded-full bg-[#42DD71]" />
              </div>
            </div>
            <div className="mt-5 space-y-2 text-sm text-white/64">
              <p>عائد استثماري متوقع مرتفع</p>
              <p>جاهزية النظام: عالية</p>
            </div>
          </div>
        </DarkCard>
      </div>

      <div className="grid gap-3 xl:grid-cols-[0.9fr_0.64fr_0.9fr_1.04fr]">
        <DarkCard title="مؤشرات الأداء الرئيسية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>}>
          <div className="grid grid-cols-4 gap-3">
            {[
              ["83%", "جاهزية الأحياء"],
              ["76%", "سرعة الاعتماد"],
              ["91%", "رضا المستثمرين"],
              ["68%", "استغلال الأراضي"],
            ].map(([value, label], index) => (
              <div key={label} className="text-center">
                <div className="mx-auto h-16 w-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart data={[{ value: Number(value.replace("%", "")) }]} innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270}>
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar dataKey="value" cornerRadius={12} fill={index === 0 || index === 3 ? "#D8B25A" : "#85E26E"} background={{ fill: "rgba(255,255,255,0.1)" }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-[18px] font-black text-white">{value}</p>
                <p className="mt-1 text-[12px] text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard title="تنبيهات ذكية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>}>
          <div className="space-y-3">
            {[
              ["فرصة تجاوزت مدة الاعتماد المستهدفة في حي النقرة", "#FF5A5F"],
              ["دراسة ميدانية لمشروع حي الوسيطاء تحتاج تحديثاً عاجلاً", "#F0B846"],
              ["مستندات داعمة مفقودة لشركة رواد البناء للمقاولات", "#D8A84F"],
              ["فرصة جاهزة للطرح تتطلب توجيهاً سريعاً من الأمانة", "#59D776"],
            ].map(([text, color]) => (
              <div key={text} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-right">
                <span className="h-3.5 w-3.5 rounded-full" style={{ background: color }} />
                <p className="text-sm leading-7 text-white/78">{text}</p>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard title="رحلة الفرصة الاستثمارية" action={<button className="text-sm font-black text-[#D0A243]">عرض الكل</button>}>
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
          <div className="mt-5 grid grid-cols-6 gap-2">
            {["1 تشغيل", "8 تحليل", "3 اعتماد", "كل الإنجاز", "2 طرح", "1 تشغيل"].map((item) => (
              <div key={item} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3 text-center text-sm font-bold text-white/78">{item}</div>
            ))}
          </div>
        </DarkCard>

        <DarkCard title="الأثر الاقتصادي المتوقع" action={<button className="text-sm font-black text-[#D0A243]">عرض التقرير</button>}>
          <div className="mb-4 flex justify-start">
            <button className="rounded-[0.8rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">سنوي</button>
          </div>
          <div className="h-[220px]">
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
  const gaugeData = [{ name: "score", value: 78, fill: "#7BD96A" }];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[0.35fr_1.2fr_0.44fr]">
        <DarkCard title="التوصية الأهم" className="min-h-[420px]">
          <div className="rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-5 text-right">
            <span className="rounded-full bg-[#3A362E] px-3 py-1 text-xs font-black text-[#F0CB71]">أولوية مرتفعة</span>
            <p className="mt-3 text-sm leading-7 text-white/54">يوصى بالإسراع في اعتماد فرصة</p>
            <h3 className="mt-6 font-['Tajawal'] text-[2rem] font-black leading-[1.55] text-white">تطوير موقع حي مشار</h3>
            <div className="mt-8 flex items-center justify-between">
              <div className="h-28 w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart data={[{ value: 83 }]} innerRadius="78%" outerRadius="100%" startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" fill="#D5B159" cornerRadius={10} background={{ fill: "rgba(255,255,255,0.1)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/46">العائد المتوقع</p>
                <p className="mt-2 text-[2rem] font-black text-white">28.5</p>
                <p className="text-sm text-white/42">مليون ر.س</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-[1rem] bg-[#C79C45] px-4 py-4 text-base font-black text-[#0B1726]">مراجعة الفرصة</button>
          </div>
        </DarkCard>

        <DarkCard title="التوصيات الذكية">
          <div className="grid gap-4 xl:grid-cols-[1fr_0.46fr]">
            <div className="space-y-3">
              {recommendationFeed.map((item) => (
                <div key={item.title} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4 text-right">
                  <div className="flex items-center justify-between gap-3">
                    <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white/80">عرض التفاصيل</button>
                    <div>
                      <span className="rounded-full bg-[#362C1B] px-3 py-1 text-xs font-black text-[#E2B95D]">{item.badge}</span>
                      <h3 className="mt-3 font-['Tajawal'] text-[1.3rem] font-black text-white">{item.title}</h3>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/62">
                    <p>نسبة الجاهزية: <span className="font-black text-[#57DD77]">{item.readiness}%</span></p>
                    <p>متوقع {item.roi} مليون ر.س</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 text-right">
              <p className="text-sm text-white/48">مؤشر الذكاء الاستثماري</p>
              <div className="mt-4 h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart data={gaugeData} innerRadius="70%" outerRadius="100%" startAngle={180} endAngle={0}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" background={{ fill: "rgba(255,255,255,0.08)" }} cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="-mt-8 text-center">
                <p className="text-[2.2rem] font-black text-white">78%</p>
                <p className="text-sm font-black text-[#7BD96A]">مرتفع</p>
              </div>
              <div className="mt-5 space-y-2 text-sm text-white/66">
                <p>تحسن عن الشهر الماضي</p>
                <p>فرص جاهزة للطرح</p>
                <p>الجاهزية أعلى في الأصول</p>
              </div>
            </div>
          </div>
        </DarkCard>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["فرص جاهزة للطرح", "24", "+8% عن الشهر", <BriefcaseBusiness key="a" size={18} />],
          ["متوسط زمن الاعتماد", "14", "يوم", <ShieldAlert key="b" size={18} />],
          ["العائد على الاستثمار المتوقع", "27%", "+3% عن الشهر", <Coins key="c" size={18} />],
          ["مستوى الجاهزية الاستثمارية", "84%", "+7% عن الشهر", <Building2 key="d" size={18} />],
        ].map(([label, value, note, icon]) => (
          <div key={String(label)} className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(10,23,38,0.98)_100%)] px-5 py-5 text-right">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#D0A243]/35 bg-white/[0.03] text-[#D5B159]">{icon}</div>
              <p className="text-sm text-white/52">{label}</p>
            </div>
            <p className="mt-6 font-['Tajawal'] text-[2.8rem] font-black text-white">{value}</p>
            <p className="mt-3 text-sm text-[#57DD77]">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntelligenceSpatialReference() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[0.32fr_1fr_0.28fr]">
        <DarkCard title="فلترة التحليل" className="order-3 min-h-[515px] xl:order-1">
          <div className="space-y-4">
            {["اختيار الحي", "أمر التشغيل", "نوع الاستخدام", "أمر القرار"].map((item) => (
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
          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-[radial-gradient(circle_at_top,#17283b_0%,#101f2f_60%,#0b1726_100%)] p-5">
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <svg viewBox="0 0 980 520" className="relative z-10 h-[440px] w-full">
              <path d="M73 265C131 171 239 101 363 84C487 67 603 101 710 180C774 227 843 284 894 337" stroke="#8E6B2C" strokeWidth="5" strokeOpacity=".62" />
              <path d="M89 308C174 243 266 202 373 189C531 170 676 203 835 296" stroke="#8E6B2C" strokeWidth="4" strokeOpacity=".54" />
              <path d="M151 150L795 362" stroke="#715B33" strokeWidth="3" strokeOpacity=".46" />
              <path d="M165 364L812 164" stroke="#715B33" strokeWidth="3" strokeOpacity=".42" />
              <path d="M315 78V439" stroke="#6B5733" strokeOpacity=".38" />
              <path d="M514 58V461" stroke="#6B5733" strokeOpacity=".34" />
              <path d="M681 71V451" stroke="#6B5733" strokeOpacity=".26" />
              <path d="M95 179H882" stroke="#6B5733" strokeOpacity=".28" />
              <path d="M74 285H903" stroke="#6B5733" strokeOpacity=".24" />
              <path d="M82 380H897" stroke="#6B5733" strokeOpacity=".18" />
              <path d="M370 111L470 94L558 126L532 208L402 219L351 168Z" fill="#D1A243" fillOpacity=".32" stroke="#E0B85C" strokeWidth="3" />
              <path d="M234 137L343 117L399 172L337 233L194 236L153 188Z" fill="#D1A243" fillOpacity=".18" stroke="#9E8454" strokeWidth="2" />
              <path d="M570 121L671 92L741 134L712 229L580 235L538 182Z" fill="#FF5A5F" fillOpacity=".22" stroke="#FF6D71" strokeWidth="2" />
              <path d="M733 103L821 135L861 197L777 256L701 204L692 144Z" fill="#D1A243" fillOpacity=".15" stroke="#9E8454" strokeWidth="2" />
              <path d="M446 258L548 239L620 283L597 392L469 406L404 326Z" fill="#D1A243" fillOpacity=".1" stroke="#9E8454" strokeWidth="2" />
            </svg>
            <div className="absolute right-5 top-5 flex flex-col gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-white/10 bg-[#122235]/92"><Plus size={16} /></button>
              <button className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-white/10 bg-[#122235]/92"><Minus size={16} /></button>
            </div>
            <button className="absolute bottom-5 left-5 rounded-[1rem] border border-[#D0A243]/30 bg-[#15263a]/92 px-4 py-3 text-sm font-bold text-[#D4BA7A]">عرض التحليل</button>
          </div>
        </DarkCard>

        <DarkCard title="طبقات الخريطة" className="order-1 min-h-[515px] xl:order-3">
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

      <div className="grid gap-4 md:grid-cols-4">
        {spatialNeighborhoodCards.map((card) => (
          <div key={card.name} className="rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(10,23,38,0.98)_100%)] px-5 py-5 text-right">
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-black ${card.tone === "green" ? "bg-[#173C2A] text-[#4FE07C]" : card.tone === "amber" ? "bg-[#3B3120] text-[#F3C04F]" : "bg-[#3F2226] text-[#FF6B72]"}`}>{card.state}</span>
              <h3 className="font-['Tajawal'] text-[1.3rem] font-black text-white">{card.name}</h3>
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
    <div className="space-y-5">
      <div className="rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,23,38,0.98)_0%,rgba(8,19,32,0.98)_100%)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {["الكل (24)", "جاهزة للطرح", "قيد الدراسة (6)", "قيد المراجعة (5)", "معتمدة (3)", "مؤرشفة (2)"].map((chip, index) => (
              <button key={chip} className={`rounded-[0.9rem] border px-4 py-2 text-sm font-bold ${index === 0 ? "border-[#D0A243]/35 bg-[#C79C45]/14 text-[#E8C36B]" : "border-white/10 bg-white/[0.03] text-white/72"}`}>{chip}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">الفلترة</button>
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">عرض الخريطة</button>
            <button className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74">تصدير</button>
            <button className="rounded-[0.9rem] bg-[#C79C45] px-4 py-2 text-sm font-black text-[#0B1726]">إضافة فرصة جديدة</button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_0.28fr]">
          <div className="overflow-hidden rounded-[1.55rem] border border-white/8 bg-white/[0.02]">
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
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${row.stage === "جاهزة للطرح" ? "bg-[#173C2A] text-[#59D776]" : row.stage === "قيد المراجعة" ? "bg-[#3B3120] text-[#F0B846]" : row.stage === "معتمدة" ? "bg-[#14384B] text-[#7BC9FF]" : "bg-white/[0.05] text-white/74"}`}>{row.stage}</span>
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

          <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5 text-right">
            <p className="text-sm text-white/48">ملخص الفرص</p>
            <p className="mt-3 font-['Tajawal'] text-[3rem] font-black text-white">24</p>
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
              <p className="mt-2 text-[2.4rem] font-black text-white">67.9</p>
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
    <div className="grid gap-4 xl:grid-cols-[1.02fr_0.92fr_0.88fr_0.94fr]">
      <DarkCard title="الأثر الاقتصادي المتوقع" action={<button className="text-sm font-black text-[#D0A243]">عرض التقرير</button>}>
        <div className="h-[230px]">
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
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-[1.8rem] font-black text-white" style={{ background: bg }}>{value}</div>
              <p className="mt-3 text-sm text-white/68">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 h-5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[82%] rounded-full bg-white/60" />
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {["2", "3", "8", "1"].map((item) => (
            <div key={item} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-4 text-center text-[1.1rem] font-black text-white">{item}</div>
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
