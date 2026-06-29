"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronLeft,
  Filter,
  Handshake,
  Layers,
  Mail,
  MoreVertical,
  Plus,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingUp,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import ExecutiveSidebar from "@/components/amanah/ExecutiveSidebar";
import { executivePageChrome, type ExecutiveShellPage } from "@/components/amanah/executiveShellConfig";

type NativeExecutivePageProps = {
  page: "overview" | "spatial" | "partners" | "performance" | "settings";
  displayName: string;
};

const darkPanel = "border border-white/10 bg-[linear-gradient(145deg,rgba(31,44,62,0.82),rgba(12,21,32,0.94))] shadow-[0_18px_42px_rgba(0,0,0,0.22)]";

type StatCardItem = {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  icon: LucideIcon;
  accent: string;
};

function RiyadhClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Riyadh",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const date = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    timeZone: "Asia/Riyadh",
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);

  return (
    <div className="border-l border-white/10 pl-5 text-right">
      <p className="text-[11px] font-semibold leading-5 text-white/48">{date}</p>
      <p className="mt-1 text-[18px] font-black leading-6 text-white">{time}</p>
    </div>
  );
}

function ExecutiveHeader({ page, displayName }: { page: ExecutiveShellPage; displayName: string }) {
  const chrome = executivePageChrome[page];

  return (
    <header className="relative z-10 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_60%_0%,rgba(234,193,112,0.1),transparent_22%),linear-gradient(135deg,#06101b,#0c1826)] px-5 py-4 shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="text-right">
          <p className="text-[12px] font-black text-[#eac170]">{chrome.eyebrow}</p>
          <h1 className="mt-1 text-[clamp(28px,3vw,42px)] font-black leading-tight text-white">{chrome.title}</h1>
          <p className="mt-2 text-[13px] leading-6 text-white/50">{chrome.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-[11px] leading-5 text-white/42">مكتب دعم القرار الاستثماري</p>
            <p className="text-[14px] font-black text-white">{displayName || "مكتب دعم القرار الاستثماري"}</p>
          </div>
          <RiyadhClock />
          <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/82" aria-label="الرسائل">
            <Mail size={19} />
          </button>
          <button className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/82" aria-label="التنبيهات">
            <Bell size={19} />
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#ff434a] text-[10px] font-black text-white">3</span>
          </button>
          <Link
            href="/account"
            className="grid h-12 w-12 place-items-center rounded-full bg-[radial-gradient(circle_at_top,#f0e3ba,#c89c45)] text-[#06101b] shadow-[0_16px_32px_rgba(208,162,67,0.24)]"
            aria-label="الحساب"
          >
            <UserRound size={21} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function PageFrame({ page, displayName, children }: { page: "overview" | "spatial" | "partners" | "performance" | "settings"; displayName: string; children: ReactNode }) {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[radial-gradient(circle_at_18%_0%,rgba(59,71,90,0.58),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(176,139,65,0.12),transparent_30%),linear-gradient(180deg,#101c2c_0%,#0e141a_54%,#080f14_100%)] text-white"
    >
      <ExecutiveSidebar page={page} />
      <main className="min-h-screen px-4 py-4 lg:mr-[280px] lg:px-6">
        <ExecutiveHeader page={page} displayName={displayName} />
        {children}
      </main>
    </div>
  );
}

const partnerStats = [
  { label: "إجمالي المستثمرين", value: "256", delta: "+22%", icon: Users, accent: "#eac170" },
  { label: "مستثمرون نشطون", value: "146", delta: "+16%", icon: ShieldCheck, accent: "#cbd7f0" },
  { label: "شراكات قائمة", value: "38", delta: "+5", icon: Handshake, accent: "#4edea3" },
  { label: "قيمة الاستثمارات", value: "1.24", unit: "مليار ر.س", delta: "+28%", icon: TrendingUp, accent: "#eac170" },
  { label: "الفرص المرتبطة", value: "64", delta: "+15%", icon: BriefcaseBusiness, accent: "#4edea3" },
];

const overviewStats: StatCardItem[] = [
  { label: "قيمة الاستثمار المتوقعة", value: "211.7", unit: "مليون ريال", delta: "+18%", icon: TrendingUp, accent: "#eac170" },
  { label: "جاهزية المحفظة", value: "83%", delta: "+7%", icon: Target, accent: "#4edea3" },
  { label: "فرص جاهزة للطرح", value: "6", unit: "فرص", delta: "من أصل 24", icon: BriefcaseBusiness, accent: "#cbd7f0" },
  { label: "قرارات تحتاج اعتماد", value: "6", unit: "قرارات", delta: "3 عاجلة", icon: ShieldCheck, accent: "#ffb3ad" },
  { label: "عوائد سنوية متوقعة", value: "28.4", unit: "مليون ريال", delta: "+15%", icon: Layers, accent: "#eac170" },
];

const overviewDecisionCards = [
  { title: "رفع فرصة تطوير حي الشفاء", status: "عالية", detail: "جاهزية مكانية مرتفعة وربط مباشر مع مسار الاعتماد.", color: "#4edea3" },
  { title: "تسريع معالجة حي النقرة", status: "متوسطة", detail: "فرصتان قابلة للطرح بعد استكمال ملاحظة تنظيمية.", color: "#eac170" },
  { title: "مراجعة أولوية حي المطار", status: "متابعة", detail: "مؤشر الطلب جيد ويحتاج ضبط نطاق الاستثمار.", color: "#86a3cc" },
];

const overviewPulse = [
  { label: "مخاطر تنظيمية مفتوحة", value: "3", hint: "تحتاج إغلاق قبل الرفع" },
  { label: "مطابقة مستثمرين", value: "12", hint: "ملفات قابلة للتواصل" },
  { label: "اعتمادات هذا الأسبوع", value: "4", hint: "جاهزة للجدولة" },
  { label: "أحياء ذات نمو", value: "5", hint: "إشارة طلب متصاعدة" },
];

const investorSectors = [
  { name: "العقاري", value: 38, color: "#eac170" },
  { name: "التجاري", value: 24, color: "#4edea3" },
  { name: "البنية التحتية", value: 16, color: "#86a3cc" },
  { name: "ترفيهي", value: 12, color: "#ffb3ad" },
  { name: "أخرى", value: 10, color: "#526072" },
];

const topInvestors = [
  { name: "شركة مستقبل العقارية", type: "شريك استراتيجي", value: "320 مليون ر.س", status: "نشط", icon: Building2 },
  { name: "مجموعة الراحة للاستثمار", type: "شريك استراتيجي", value: "210 مليون ر.س", status: "نشط", icon: BriefcaseBusiness },
  { name: "شركة الإنماء العمراني", type: "مستثمر", value: "150 مليون ر.س", status: "نشط", icon: Building2 },
  { name: "صندوق التنمية المحلي", type: "ممكّن تمويلي", value: "120 مليون ر.س", status: "مراجعة", icon: ShieldCheck },
];

const partnerships = [
  { title: "شراكة تطوير حي مشارف", date: "1446/01/01", kind: "شراكة استراتيجية" },
  { title: "مشروع السوق المركزي", date: "1445/12/28", kind: "شراكة تشغيل" },
  { title: "تأهيل واجهة المدينة", date: "1445/12/25", kind: "شراكة تطوير" },
];

const partnerTrend = [
  { month: "يناير", active: 92, total: 128 },
  { month: "فبراير", active: 104, total: 146 },
  { month: "مارس", active: 118, total: 169 },
  { month: "أبريل", active: 132, total: 198 },
  { month: "مايو", active: 141, total: 226 },
  { month: "يونيو", active: 146, total: 256 },
];

function StatCard({ item }: { item: StatCardItem }) {
  const Icon = item.icon;
  return (
    <div className={`min-h-[132px] rounded-[22px] p-4 ${darkPanel}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="text-right">
          <p className="text-[12px] font-bold text-white/58">{item.label}</p>
          <div className="mt-5 flex items-end justify-end gap-2">
            {item.unit ? <span className="pb-1 text-[12px] font-semibold text-white/50">{item.unit}</span> : null}
            <strong className="text-[32px] font-black leading-none text-white">{item.value}</strong>
          </div>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[16px] border border-white/10 bg-white/[0.04]" style={{ color: item.accent }}>
          <Icon size={20} />
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-[12px] font-black text-[#4edea3]">{item.delta}</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
          <div className="h-full rounded-full" style={{ width: "72%", background: item.accent }} />
        </div>
      </div>
    </div>
  );
}

function OverviewPage({ displayName }: { displayName: string }) {
  return (
    <PageFrame page="overview" displayName={displayName}>
      <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {overviewStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className={`rounded-[24px] p-5 ${darkPanel}`}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <Link href="/investment-intelligence?tab=approvals" className="text-[12px] font-black text-[#eac170]">عرض مسار القرارات</Link>
            <div className="text-right">
              <p className="text-[12px] font-black text-[#eac170]">نبض القرار اليومي</p>
              <h2 className="mt-1 text-[24px] font-black text-white">الأولويات التنفيذية</h2>
            </div>
          </div>
          <div className="space-y-3">
            {overviewDecisionCards.map((item) => (
              <div key={item.title} className="flex min-h-[92px] items-center justify-between gap-4 rounded-[18px] border border-white/8 bg-white/[0.035] p-4">
                <span className="rounded-full px-3 py-1 text-[11px] font-black" style={{ color: item.color, background: `${item.color}20` }}>{item.status}</span>
                <div className="flex-1 text-right">
                  <p className="text-[17px] font-black text-white">{item.title}</p>
                  <p className="mt-1 text-[12px] leading-6 text-white/50">{item.detail}</p>
                </div>
                <button className="rounded-[14px] border border-[#eac170]/28 px-4 py-2 text-[12px] font-black text-[#eac170]">اتخاذ إجراء</button>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-[24px] p-5 ${darkPanel}`}>
          <div className="text-right">
            <p className="text-[12px] font-black text-[#eac170]">حوكمة المحفظة</p>
            <h2 className="mt-1 text-[24px] font-black text-white">مؤشرات تحتاج انتباه</h2>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {overviewPulse.map((item) => (
              <div key={item.label} className="rounded-[18px] border border-white/8 bg-white/[0.035] p-4 text-right">
                <p className="text-[12px] text-white/46">{item.label}</p>
                <p className="mt-3 text-[30px] font-black text-white">{item.value}</p>
                <p className="mt-2 text-[12px] font-black text-[#eac170]">{item.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className={`rounded-[24px] p-5 ${darkPanel}`}>
          <h2 className="text-right text-[24px] font-black text-white">جاهزية الفرص حسب المرحلة</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[
              { name: "فكرة", value: 1 },
              { name: "تحليل", value: 8 },
              { name: "دراسة", value: 3 },
              { name: "اعتماد", value: 6 },
              { name: "طرح", value: 2 },
              { name: "تشغيل", value: 1 },
            ]}>
              <XAxis dataKey="name" stroke="rgba(255,255,255,.45)" tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#111c2b", border: "1px solid rgba(255,255,255,.12)", color: "#fff" }} />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#eac170" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`rounded-[24px] p-5 ${darkPanel}`}>
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-[12px] border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] text-white/62">شهري</span>
            <h2 className="text-[24px] font-black text-white">الأثر الاقتصادي المتوقع</h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={partnerTrend}>
              <defs>
                <linearGradient id="overviewImpact" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#4edea3" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4edea3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="rgba(255,255,255,.45)" tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,.24)" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#111c2b", border: "1px solid rgba(255,255,255,.12)", color: "#fff" }} />
              <Area type="monotone" dataKey="total" stroke="#4edea3" strokeWidth={3} fill="url(#overviewImpact)" />
              <Area type="monotone" dataKey="active" stroke="#eac170" strokeWidth={3} fill="rgba(234,193,112,.12)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </PageFrame>
  );
}

function PartnersPage({ displayName }: { displayName: string }) {
  return (
    <PageFrame page="partners" displayName={displayName}>
      <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {partnerStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_1fr_1fr]">
        <div className={`rounded-[22px] p-5 ${darkPanel}`}>
          <div className="mb-4 flex items-center justify-between">
            <button className="grid h-9 w-9 place-items-center rounded-[12px] border border-white/10 bg-white/[0.04] text-[#eac170]" aria-label="خيارات">
              <MoreVertical size={18} />
            </button>
            <h2 className="text-[22px] font-black text-white">توزيع المستثمرين حسب القطاع</h2>
          </div>
          <div className="grid min-h-[360px] place-items-center">
            <ResponsiveContainer width="100%" height={310}>
              <PieChart>
                <Pie data={investorSectors} dataKey="value" innerRadius={82} outerRadius={118} paddingAngle={3}>
                  {investorSectors.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#111c2b", border: "1px solid rgba(255,255,255,.12)", color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[12px] text-white/68">
            {investorSectors.map((sector) => (
              <div key={sector.name} className="flex items-center justify-end gap-2">
                <span>{sector.name} %{sector.value}</span>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: sector.color }} />
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-[22px] p-5 ${darkPanel}`}>
          <div className="mb-4 flex items-center justify-between">
            <Link href="/investment-intelligence?tab=opportunities" className="text-[12px] font-black text-[#eac170]">عرض جميع المستثمرين</Link>
            <h2 className="text-[22px] font-black text-white">أبرز المستثمرين</h2>
          </div>
          <div className="divide-y divide-white/8">
            {topInvestors.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="flex min-h-[86px] items-center justify-between gap-4 py-3">
                  <span className="rounded-full bg-[#4edea3]/12 px-3 py-1 text-[11px] font-black text-[#4edea3]">{item.status}</span>
                  <div className="flex-1 text-right">
                    <p className="text-[15px] font-black text-white">{item.name}</p>
                    <p className="mt-1 text-[12px] text-white/48">{item.type}</p>
                    <p className="mt-1 text-[13px] font-black text-[#eac170]">{item.value}</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-[15px] bg-white/[0.05] text-[#eac170]">
                    <Icon size={19} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`rounded-[22px] p-5 ${darkPanel}`}>
          <div className="mb-4 flex items-center justify-between">
            <Link href="/investment-intelligence?tab=approvals" className="text-[12px] font-black text-[#eac170]">عرض الشراكات</Link>
            <h2 className="text-[22px] font-black text-white">الشراكات الحديثة</h2>
          </div>
          <div className="space-y-3">
            {partnerships.map((item) => (
              <div key={item.title} className="rounded-[16px] border border-white/8 bg-white/[0.035] p-4">
                <div className="flex items-start justify-between gap-3">
                  <CalendarDays size={18} className="text-[#eac170]" />
                  <div className="text-right">
                    <p className="text-[15px] font-black text-white">{item.title}</p>
                    <p className="mt-1 text-[12px] text-white/46">{item.kind}</p>
                    <p className="mt-2 text-[12px] text-[#eac170]">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <div className={`rounded-[22px] p-5 ${darkPanel}`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] text-white/68">
              <SlidersHorizontal size={15} />
              آخر 6 أشهر
            </div>
            <h2 className="text-[22px] font-black text-white">نمو قاعدة المستثمرين</h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={partnerTrend}>
              <defs>
                <linearGradient id="activeInvestors" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#4edea3" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#4edea3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="rgba(255,255,255,.42)" tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,.24)" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#111c2b", border: "1px solid rgba(255,255,255,.12)", color: "#fff" }} />
              <Area type="monotone" dataKey="total" stroke="#eac170" strokeWidth={3} fill="rgba(234,193,112,.14)" />
              <Area type="monotone" dataKey="active" stroke="#4edea3" strokeWidth={3} fill="url(#activeInvestors)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={`rounded-[22px] p-5 ${darkPanel}`}>
          <h2 className="text-right text-[22px] font-black text-white">مؤشرات العلاقة</h2>
          <div className="mt-5 grid gap-3">
            {[
              ["معدل رضا المستثمرين", "91%", "+5%"],
              ["متوسط زمن الاستجابة", "2.4 يوم", "-0.8 يوم"],
              ["معدل تحويل الفرص", "28%", "+9%"],
              ["عدد الاجتماعات", "48", "+8"],
            ].map(([label, value, delta]) => (
              <div key={label} className="flex items-center justify-between rounded-[16px] border border-white/8 bg-white/[0.035] p-4">
                <span className="text-[12px] font-black text-[#4edea3]">{delta}</span>
                <div className="text-right">
                  <p className="text-[12px] text-white/48">{label}</p>
                  <p className="mt-1 text-[24px] font-black text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

const neighborhoods = [
  { name: "حي النقرة", status: "جاهزة للطرح", ready: 79, x: "66%", y: "18%", color: "#4edea3", value: "18.4" },
  { name: "حي الشفاء", status: "قيد المراجعة", ready: 58, x: "33%", y: "29%", color: "#ebc07e", value: "6.9" },
  { name: "حي الشبيلي", status: "جاهزة للطرح", ready: 74, x: "80%", y: "42%", color: "#4edea3", value: "11.1" },
  { name: "حي الجامعيين", status: "جاهزية عالية", ready: 83, x: "53%", y: "50%", color: "#4edea3", value: "32.5" },
  { name: "حي المطار", status: "قيد المراجعة", ready: 65, x: "25%", y: "64%", color: "#ebc07e", value: "8.7" },
  { name: "حي المصيف", status: "جاهزة للطرح", ready: 71, x: "14%", y: "86%", color: "#4edea3", value: "15.2" },
  { name: "حي أجا", status: "متأخرة", ready: 42, x: "47%", y: "75%", color: "#ff7b74", value: "1.6" },
  { name: "حي المغواة", status: "جاهزة للطرح", ready: 76, x: "82%", y: "78%", color: "#4edea3", value: "12.4" },
];

const mapMetrics = [
  { label: "جاهزة للرفع", value: "6 أحياء", hint: "أولوية رفع مباشرة" },
  { label: "المعوقات المتكررة", value: "3 عناصر", hint: "تحتاج معالجة تنظيمية" },
  { label: "قيمة الفرص المكانية", value: "67.9", hint: "مليون ريال متوقع" },
];

const spatialBars = [
  { name: "حي الجامعيين", value: 24 },
  { name: "حي الشبيلي", value: 19 },
  { name: "حي النقرة", value: 14 },
  { name: "حي المصيف", value: 12 },
];

function HailMapPanel() {
  return (
    <div className={`relative min-h-[520px] overflow-hidden rounded-[22px] ${darkPanel}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(33,68,105,0.5),rgba(6,12,20,0.9)_66%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:92px_92px]" />
      <div className="absolute inset-x-[7%] top-[44%] h-[5px] -rotate-[19deg] rounded-full bg-[#8a97aa]/22" />
      <div className="absolute inset-x-[10%] top-[68%] h-[5px] -rotate-[10deg] rounded-full bg-[#8a97aa]/18" />
      <div className="absolute left-[10%] top-[22%] h-[5px] w-[78%] rotate-[33deg] rounded-full bg-[#8a97aa]/18" />
      <div className="absolute left-[20%] top-[34%] h-[3px] w-[58%] rotate-[4deg] rounded-full bg-[#eac170]/28" />
      <div className="absolute left-[18%] top-[48%] h-[3px] w-[64%] -rotate-[7deg] rounded-full bg-[#eac170]/24" />
      <div className="absolute left-[20%] top-[28%] h-[230px] w-[520px] rounded-[50%] border border-[#eac170]/20" />
      <div className="absolute left-[25%] top-[35%] h-[160px] w-[420px] rounded-[50%] border border-[#eac170]/18" />
      <div className="absolute left-[31%] top-[39%] h-[110px] w-[310px] rounded-[50%] border border-[#eac170]/14" />

      {[
        "polygon(12% 30%,35% 18%,54% 33%,45% 56%,18% 56%)",
        "polygon(46% 24%,70% 16%,87% 32%,77% 52%,50% 47%)",
        "polygon(25% 59%,45% 52%,56% 70%,42% 82%,19% 76%)",
        "polygon(51% 55%,75% 50%,86% 68%,70% 84%,49% 78%)",
      ].map((shape, index) => (
        <div
          key={shape}
          className="absolute h-[190px] w-[300px] border border-[#7fa8d7]/35 bg-[#315a8c]/20"
          style={{
            clipPath: shape,
            left: `${18 + index * 14}%`,
            top: `${22 + (index % 2) * 24}%`,
          }}
        />
      ))}

      <div className="absolute right-4 top-4 rounded-[14px] border border-white/10 bg-[#0b1326]/76 px-4 py-3 text-right backdrop-blur">
        <p className="text-[12px] font-black text-white">جميع الأحياء</p>
        <div className="mt-3 space-y-2 text-[12px] text-white/66">
          <p><span className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-[#4edea3]" />جاهزة للطرح</p>
          <p><span className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-[#ebc07e]" />قيد المراجعة</p>
          <p><span className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-[#ff7b74]" />متأخرة</p>
        </div>
      </div>

      <div className="absolute left-4 top-4 grid gap-2">
        {[Plus, Layers, Target].map((Icon, index) => (
          <button key={index} className="grid h-10 w-10 place-items-center rounded-[10px] border border-white/10 bg-white/[0.06] text-white/80" aria-label="أداة خريطة">
            <Icon size={18} />
          </button>
        ))}
      </div>

      {neighborhoods.map((item) => (
        <div key={item.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: item.x, top: item.y }}>
          <span className="block h-5 w-5 rounded-full border-[3px] border-[#142033] shadow-[0_0_0_12px_rgba(255,255,255,0.08),0_0_26px_currentColor]" style={{ background: item.color, color: item.color }} />
          <span className="absolute right-1/2 top-7 translate-x-1/2 whitespace-nowrap rounded-full bg-[#07111c]/86 px-3 py-1 text-[11px] font-black text-white shadow-lg">{item.name}</span>
        </div>
      ))}

      <button className="absolute bottom-4 right-4 rounded-[12px] border border-[#eac170]/24 bg-white/[0.06] px-4 py-2 text-[12px] font-black text-[#eac170]">
        عرض طبقات الخريطة
      </button>
    </div>
  );
}

function SpatialPage({ displayName }: { displayName: string }) {
  return (
    <PageFrame page="spatial" displayName={displayName}>
      <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="order-2 xl:order-1">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {["نظرة عامة", "تحليل الأحياء", "خرائط الفرص", "تحليل البنية التحتية", "المؤشرات المكانية"].map((tab, index) => (
                <button
                  key={tab}
                  className={`rounded-[12px] border px-4 py-2 text-[13px] font-black ${
                    index === 1 ? "border-[#eac170] bg-[#eac170] text-[#281800]" : "border-white/10 bg-white/[0.04] text-white/72"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <HailMapPanel />
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {neighborhoods.slice(0, 4).map((item) => (
              <div key={item.name} className={`rounded-[18px] p-4 ${darkPanel}`}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[11px] font-black" style={{ color: item.color, background: `${item.color}22` }}>{item.status}</span>
                  <p className="text-[15px] font-black text-white">{item.name}</p>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <span className="text-[12px] font-black text-[#4edea3]">{item.value}% ↑</span>
                  <div className="text-right">
                    <p className="text-[28px] font-black text-white">{item.ready}%</p>
                    <p className="text-[11px] text-white/48">نسبة الجاهزية</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {neighborhoods.slice(4).map((item) => (
              <div key={item.name} className={`rounded-[18px] p-4 ${darkPanel}`}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[11px] font-black" style={{ color: item.color, background: `${item.color}22` }}>{item.status}</span>
                  <p className="text-[15px] font-black text-white">{item.name}</p>
                </div>
                <p className="mt-4 text-[26px] font-black text-white">{item.ready}%</p>
                <p className="mt-1 text-[11px] text-white/48">جاهزية مكانية</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="order-1 space-y-4 xl:order-2">
          <div className={`rounded-[22px] p-5 ${darkPanel}`}>
            <div className="flex items-center justify-between">
              <Filter size={20} className="text-[#eac170]" />
              <h2 className="text-[22px] font-black text-[#eac170]">فلترة التحليل</h2>
            </div>
            <div className="mt-5 space-y-4">
              {["تصنيف الفرصة", "نوع الاستخدام", "النطاق الموقع"].map((label) => (
                <label key={label} className="block text-right">
                  <span className="mb-2 block text-[12px] font-bold text-white/54">{label}</span>
                  <select className="h-11 w-full rounded-[10px] border border-[#eac170]/24 bg-[#0b1326] px-3 text-right text-[13px] text-white outline-none">
                    <option>اختر التصنيف</option>
                  </select>
                </label>
              ))}
              <div>
                <p className="text-right text-[12px] font-bold text-white/54">نسبة الجاهزية</p>
                <input type="range" min="0" max="100" defaultValue="50" className="mt-3 w-full accent-[#eac170]" />
                <div className="mt-1 flex justify-between text-[11px] text-white/42"><span>0%</span><span>50%</span><span>100%</span></div>
              </div>
              <button className="h-12 w-full rounded-[10px] bg-[#eac170] text-[13px] font-black text-[#281800]">تطبيق الفلتر</button>
              <button className="h-10 w-full text-[12px] font-bold text-white/68">إعادة تعيين</button>
            </div>
          </div>

          <div className={`rounded-[22px] p-5 ${darkPanel}`}>
            <h2 className="text-right text-[17px] font-black text-white">مؤشر الجاذبية المكانية</h2>
            <div className="mt-4 space-y-3">
              {["جاذبية عالية", "جاذبية متوسطة", "جاذبية منخفضة"].map((label, index) => (
                <div key={label} className="flex items-center justify-between text-[13px] text-white/72">
                  <span className="h-3 w-3 rounded-full" style={{ background: ["#4edea3", "#ebc07e", "#ffb3ad"][index] }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        {mapMetrics.map((item) => (
          <div key={item.label} className={`rounded-[18px] p-5 text-right ${darkPanel}`}>
            <p className="text-[12px] text-white/42">{item.label}</p>
            <p className="mt-3 text-[28px] font-black text-white">{item.value}</p>
            <p className="mt-2 text-[12px] font-black text-[#eac170]">{item.hint}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className={`rounded-[22px] p-5 ${darkPanel}`}>
          <h2 className="text-right text-[18px] font-black text-[#eac170]">التوصية الذكية للموقع</h2>
          <p className="mt-5 text-right text-[13px] leading-7 text-white/68">مشروع مدمج تجاري وترفيهي في حي الجامعيين مع مسار رفع مباشر بعد استكمال المعالجة التنظيمية.</p>
          <Link href="/investment-intelligence?tab=opportunities" className="mt-6 flex h-11 items-center justify-center gap-2 rounded-[10px] border border-[#eac170]/40 text-[13px] font-black text-[#eac170]">
            عرض الدراسة الكاملة
            <ChevronLeft size={16} />
          </Link>
        </div>
        <div className={`rounded-[22px] p-5 ${darkPanel}`}>
          <h2 className="text-right text-[18px] font-black text-[#eac170]">تحليل العائد حسب المنطقة</h2>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={spatialBars}>
              <XAxis dataKey="name" stroke="rgba(255,255,255,.42)" tickLine={false} axisLine={false} />
              <YAxis hide />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#4edea3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={`rounded-[22px] p-5 ${darkPanel}`}>
          <h2 className="text-right text-[18px] font-black text-[#eac170]">توزيع الاستخدامات المكانية</h2>
          <div className="mt-5 grid place-items-center">
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie data={[{ name: "تجاري", value: 65 }, { name: "سكني", value: 20 }, { name: "ترفيهي", value: 10 }, { name: "أخرى", value: 5 }]} dataKey="value" innerRadius={62} outerRadius={88}>
                  {["#eac170", "#4edea3", "#ffb3ad", "#526072"].map((color) => <Cell key={color} fill={color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

const performanceStats: StatCardItem[] = [
  { label: "مؤشر الأداء العام", value: "87%", delta: "+12%", icon: TrendingUp, accent: "#4edea3" },
  { label: "معدل إنجاز القرارات", value: "76%", delta: "+8%", icon: ShieldCheck, accent: "#eac170" },
  { label: "زمن تحويل الفرصة", value: "24", unit: "يوم", delta: "-6 أيام", icon: CalendarDays, accent: "#cbd7f0" },
  { label: "جودة بيانات الفرص", value: "91%", delta: "+5%", icon: Layers, accent: "#4edea3" },
  { label: "إغلاق الملاحظات", value: "68%", delta: "+10%", icon: Target, accent: "#ffb3ad" },
];

const performanceTimeline = [
  { month: "يناير", actual: 62, target: 55 },
  { month: "فبراير", actual: 74, target: 66 },
  { month: "مارس", actual: 81, target: 72 },
  { month: "أبريل", actual: 88, target: 82 },
  { month: "مايو", actual: 92, target: 85 },
  { month: "يونيو", actual: 101, target: 93 },
];

function PerformancePage({ displayName }: { displayName: string }) {
  return (
    <PageFrame page="performance" displayName={displayName}>
      <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {performanceStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <div className={`rounded-[24px] p-5 ${darkPanel}`}>
          <div className="mb-4 flex items-center justify-between">
            <button className="rounded-[12px] border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] text-[#eac170]">تصدير التقرير</button>
            <h2 className="text-[24px] font-black text-white">اتجاه الأداء التنفيذي</h2>
          </div>
          <ResponsiveContainer width="100%" height={310}>
            <AreaChart data={performanceTimeline}>
              <defs>
                <linearGradient id="performanceActual" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#4edea3" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#4edea3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="rgba(255,255,255,.45)" tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,.24)" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#111c2b", border: "1px solid rgba(255,255,255,.12)", color: "#fff" }} />
              <Area type="monotone" dataKey="actual" stroke="#4edea3" strokeWidth={3} fill="url(#performanceActual)" />
              <Area type="monotone" dataKey="target" stroke="#eac170" strokeWidth={3} fill="rgba(234,193,112,.12)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={`rounded-[24px] p-5 ${darkPanel}`}>
          <h2 className="text-right text-[24px] font-black text-white">مؤشرات القرار</h2>
          <div className="mt-5 space-y-3">
            {[
              ["الالتزام بمواعيد الرفع", "82%", "#4edea3"],
              ["الفرص المتعثرة", "5", "#ff7b74"],
              ["متوسط زمن المراجعة", "2.4 يوم", "#eac170"],
              ["الملفات مكتملة البيانات", "19", "#86a3cc"],
            ].map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.035] p-4">
                <span className="h-3 w-3 rounded-full" style={{ background: color }} />
                <div className="text-right">
                  <p className="text-[12px] text-white/48">{label}</p>
                  <p className="mt-1 text-[24px] font-black text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        {[
          { title: "جاهزية الأحياء", value: "83%", detail: "6 أحياء قابلة للرفع خلال الدورة الحالية" },
          { title: "سرعة الاعتماد", value: "76%", detail: "تحسن في زمن انتقال الملفات بين المراحل" },
          { title: "رضا المستثمرين", value: "91%", detail: "استجابة أفضل للطلبات والملاحظات" },
        ].map((item) => (
          <div key={item.title} className={`rounded-[24px] p-5 text-right ${darkPanel}`}>
            <p className="text-[13px] text-white/48">{item.title}</p>
            <p className="mt-4 text-[42px] font-black text-white">{item.value}</p>
            <p className="mt-3 text-[13px] leading-7 text-white/60">{item.detail}</p>
          </div>
        ))}
      </section>
    </PageFrame>
  );
}

function SettingsPage({ displayName }: { displayName: string }) {
  const settingsCards = [
    { title: "إعدادات عامة", hint: "هوية المنصة والتفضيلات الأساسية", icon: Settings },
    { title: "إعدادات الأمان", hint: "سياسات الدخول والصلاحيات", icon: ShieldCheck },
    { title: "إعدادات التنبيهات", hint: "إشعارات القرارات والمهام", icon: Bell },
    { title: "إعدادات التكامل", hint: "مسارات الربط مع الأنظمة", icon: Layers },
    { title: "إعدادات البيانات", hint: "جودة البيانات والتصنيف", icon: Target },
    { title: "سجل النظام", hint: "الأحداث والعمليات الأخيرة", icon: CalendarDays },
  ];

  const users = [
    ["أ. محمد الشمري", "مدير إدارة الاستثمار", "نشط"],
    ["أ. فهد المطيري", "محلل استثماري أول", "نشط"],
    ["أ. عبدالله الجهني", "مراجع اعتماد", "نشط"],
    ["أ. نورة السلمي", "اختصاصي بيانات", "نشط"],
  ];

  return (
    <PageFrame page="settings" displayName={displayName}>
      <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className={`rounded-[24px] p-5 ${darkPanel}`}>
          <div className="mb-5 text-right">
            <p className="text-[12px] font-black text-[#eac170]">إدارة النظام</p>
            <h2 className="mt-1 text-[24px] font-black text-white">التفضيلات والصلاحيات</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {settingsCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex min-h-[116px] items-center justify-between gap-4 rounded-[18px] border border-white/8 bg-white/[0.035] p-4">
                  <span className="grid h-12 w-12 place-items-center rounded-[16px] border border-white/10 bg-white/[0.04] text-[#eac170]">
                    <Icon size={20} />
                  </span>
                  <div className="text-right">
                    <p className="text-[16px] font-black text-white">{item.title}</p>
                    <p className="mt-2 text-[12px] leading-6 text-white/48">{item.hint}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className={`rounded-[24px] p-5 text-right ${darkPanel}`}>
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[#eac170]/30 bg-[radial-gradient(circle_at_top,#f0e3ba,#c89c45)] text-[#06101b]">
            <UserRound size={38} />
          </div>
          <h2 className="mt-5 text-center text-[24px] font-black text-white">أ. محمد الشمري</h2>
          <p className="mt-2 text-center text-[12px] text-white/48">مدير إدارة الاستثمار</p>
          <div className="mt-6 space-y-3 text-[13px] text-white/62">
            <div className="flex justify-between rounded-[14px] border border-white/8 bg-white/[0.03] p-3"><span>البريد</span><span>m.alshamri@amana.gov.sa</span></div>
            <div className="flex justify-between rounded-[14px] border border-white/8 bg-white/[0.03] p-3"><span>الجوال</span><span>+966 50 123 4567</span></div>
            <div className="flex justify-between rounded-[14px] border border-white/8 bg-white/[0.03] p-3"><span>الصلاحية</span><span>إدارة كاملة</span></div>
          </div>
        </aside>
      </section>

      <section className={`mt-4 rounded-[24px] p-5 ${darkPanel}`}>
        <div className="mb-5 flex items-center justify-between">
          <button className="rounded-[12px] border border-[#eac170]/28 px-4 py-2 text-[12px] font-black text-[#eac170]">إضافة مستخدم</button>
          <h2 className="text-[24px] font-black text-white">إدارة المستخدمين</h2>
        </div>
        <div className="overflow-hidden rounded-[18px] border border-white/8">
          {users.map(([name, role, status]) => (
            <div key={name} className="grid gap-3 border-b border-white/8 bg-white/[0.025] p-4 text-right last:border-b-0 md:grid-cols-[1fr_1fr_120px]">
              <p className="font-black text-white">{name}</p>
              <p className="text-white/55">{role}</p>
              <span className="w-fit rounded-full bg-[#4edea3]/12 px-3 py-1 text-[11px] font-black text-[#4edea3]">{status}</span>
            </div>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}

export default function NativeExecutivePage({ page, displayName }: NativeExecutivePageProps) {
  if (page === "overview") {
    return <OverviewPage displayName={displayName} />;
  }

  if (page === "partners") {
    return <PartnersPage displayName={displayName} />;
  }

  if (page === "performance") {
    return <PerformancePage displayName={displayName} />;
  }

  if (page === "settings") {
    return <SettingsPage displayName={displayName} />;
  }

  return <SpatialPage displayName={displayName} />;
}
