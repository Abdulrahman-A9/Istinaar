"use client";

import type { ReactNode } from "react";
import {
  BadgeCheck,
  BellRing,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Handshake,
  KeyRound,
  LineChart,
  LockKeyhole,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
  UsersRound,
  Workflow,
} from "lucide-react";

type Tone = "gold" | "green" | "blue" | "red";

function Surface({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`executive-card-glow glow-gold rounded-[1.35rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.12),transparent_28%),linear-gradient(180deg,rgba(12,28,46,0.98)_0%,rgba(10,23,38,0.98)_100%)] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] ${className}`}><div className="mb-4 flex items-start justify-between gap-3"><div className="text-right">{subtitle ? <p className="text-[11px] font-semibold text-[#D0A243]">{subtitle}</p> : null}<h2 className="mt-1 font-['Tajawal'] text-[1.25rem] font-black text-white sm:text-[1.45rem]">{title}</h2></div>{action}</div>{children}</section>;
}

function Status({ children, tone = "green" }: { children: ReactNode; tone?: Tone }) {
  const styles: Record<Tone, string> = { green: "bg-[#173C2A] text-[#59D776]", gold: "bg-[#3B3120] text-[#F0B846]", red: "bg-[#3F2226] text-[#FF7C82]", blue: "bg-[#15384B] text-[#7BC9FF]" };
  return <span className={`rounded-full px-3 py-1 text-[11px] font-black ${styles[tone]}`}>{children}</span>;
}

function MetricCard({ label, value, note, icon, tone = "gold" }: { label: string; value: string; note: string; icon: ReactNode; tone?: Tone }) {
  const styles: Record<Tone, string> = { gold: "from-[#C79C45]/22 via-[#17304A]/90 to-[#0E2237] text-[#E9C673]", green: "from-[#38C976]/20 via-[#153A32]/90 to-[#0E2237] text-[#51E184]", blue: "from-[#579EFF]/20 via-[#163A59]/90 to-[#0E2237] text-[#86BEFF]", red: "from-[#FF7272]/18 via-[#412633]/90 to-[#0E2237] text-[#FF8A8F]" };
  return <article className={`executive-card-glow glow-${tone} rounded-[1.15rem] border border-white/8 bg-gradient-to-br ${styles[tone]} px-4 py-4 shadow-[0_16px_30px_rgba(0,0,0,0.14)]`}><div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-current/25 bg-white/[0.04]">{icon}</span><div className="text-right"><p className="text-[11px] text-white/58">{label}</p><p className="mt-2 font-['Tajawal'] text-[1.8rem] font-black leading-none text-white">{value}</p></div></div><p className="mt-4 text-right text-[11px] font-bold">{note}</p></article>;
}

function ControlStrip({ searchLabel, actionLabel }: { searchLabel: string; actionLabel: string }) {
  return <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.1rem] border border-white/8 bg-[#0B1B2B]/72 p-3">
    <div className="flex flex-wrap gap-2">
      <button className="inline-flex items-center gap-2 rounded-[0.8rem] border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-white/70"><ChevronDown size={15} />آخر 30 يوماً</button>
      <button className="inline-flex items-center gap-2 rounded-[0.8rem] border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-white/70"><SlidersHorizontal size={15} />فلترة متقدمة</button>
    </div>
    <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-[0.8rem] border border-white/10 bg-white/[0.03] px-3 py-2 text-right sm:max-w-sm"><Search size={15} className="text-white/40" /><span className="text-xs text-white/40">{searchLabel}</span></div>
    <button className="inline-flex items-center gap-2 rounded-[0.8rem] bg-[#C79C45] px-4 py-2 text-xs font-black text-[#09121D]"><Download size={15} />{actionLabel}</button>
  </div>;
}

function ReportPreview({ tone, label, title, meta }: { tone: "gold" | "green" | "blue" | "purple"; label: string; title: string; meta: string }) {
  const colors = { gold: "from-[#D0A243]/36 via-[#17334C] to-[#0E2237]", green: "from-[#46CE75]/28 via-[#143B37] to-[#0E2237]", blue: "from-[#5C9EFF]/30 via-[#163A59] to-[#0E2237]", purple: "from-[#A78BFA]/28 via-[#30264B] to-[#0E2237]" }[tone];
  return <article className="executive-card-glow glow-blue overflow-hidden rounded-[1.1rem] border border-white/8 bg-[#0B1B2B] text-right shadow-[0_14px_28px_rgba(0,0,0,0.14)]"><div className={`relative h-28 bg-gradient-to-br ${colors} p-3`}><span className="rounded-full border border-white/16 bg-black/15 px-2 py-1 text-[10px] font-bold text-white/78">{label}</span><div className="absolute inset-x-3 bottom-3 flex h-12 items-end gap-1.5 opacity-80">{[42, 65, 50, 80, 55, 88, 72, 98].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-white/70" style={{ height: `${height}%` }} />)}</div></div><div className="p-4"><p className="font-['Tajawal'] text-[1.02rem] font-black text-white">{title}</p><p className="mt-2 text-[11px] leading-6 text-white/46">{meta}</p><div className="mt-3 flex items-center justify-between"><span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#52DD7E]"><CheckCircle2 size={13} />جاهز</span><button className="text-[11px] font-bold text-[#E4C982]">فتح التقرير</button></div></div></article>;
}

function DecisionSignal({ title, value, note, action, tone = "gold" }: { title: string; value: string; note: string; action: string; tone?: Tone }) {
  const stripe = { gold: "border-[#D0A243]/35", green: "border-[#42DD71]/35", blue: "border-[#7BC9FF]/35", red: "border-[#FF7C82]/35" }[tone];
  const valueTone = { gold: "text-[#E7C46D]", green: "text-[#59D776]", blue: "text-[#7BC9FF]", red: "text-[#FF7C82]" }[tone];
  return <article className={`executive-card-glow glow-${tone} rounded-[1rem] border ${stripe} bg-white/[0.025] p-4 text-right`}><p className="text-[11px] text-white/46">{title}</p><div className="mt-2 flex items-end justify-between gap-3"><span className="text-[11px] font-bold text-white/48">{action}</span><p className={`font-['Tajawal'] text-[1.65rem] font-black leading-none ${valueTone}`}>{value}</p></div><p className="mt-3 text-[11px] leading-6 text-white/62">{note}</p></article>;
}

function InsightRow({ title, description, owner, due, tone = "gold" }: { title: string; description: string; owner: string; due: string; tone?: Tone }) {
  const dot = { gold: "bg-[#E2B44B]", green: "bg-[#42DD71]", blue: "bg-[#7BC9FF]", red: "bg-[#FF5A5F]" }[tone];
  return <div className="flex items-start justify-between gap-4 rounded-[1rem] border border-white/8 bg-white/[0.025] p-4 text-right"><span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot} shadow-[0_0_14px_currentColor]`} /><div className="min-w-0 flex-1"><p className="font-bold text-white">{title}</p><p className="mt-1 text-[11px] leading-6 text-white/48">{description}</p><div className="mt-3 flex items-center justify-end gap-3 text-[10px]"><span className="text-[#E4C982]">{due}</span><span className="text-white/42">المالك: {owner}</span></div></div></div>;
}

const approvalRows = [
  ["APP-2024-125", "تطوير موقع حي مشار", "فرصة استثمارية", "إدارة الاستثمار", "مراجعة فنية", "اليوم", "gold"],
  ["APP-2024-124", "مشروع السوق المركزي", "شراكة استثمارية", "إدارة الشراكات", "توقيع نهائي", "أمس", "blue"],
  ["APP-2024-123", "تأهيل واجهة المدينة", "مشروع بلدي", "إدارة المشاريع", "مراجعة إدارية", "منذ يومين", "gold"],
  ["APP-2024-122", "تشغيل مرافق موسمية", "تشغيل موقع", "إدارة الأصول", "مكتمل", "منذ 3 أيام", "green"],
] as const;

export function ApprovalsReference() {
  const stages = ["تقديم مبدئي", "مراجعة إدارية", "مراجعة فنية", "اعتماد نهائي", "توقيع ونشر"];
  return <div className="space-y-4">
    <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_330px]">
      <Surface title="إدارة المستخدمين والنظام" subtitle="المساحة الإدارية المحكومة"><ControlStrip searchLabel="البحث عن مستخدم أو صلاحية..." actionLabel="إضافة مستخدم" /></Surface>
      <section className="rounded-[1.35rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(208,162,67,0.2),transparent_42%),linear-gradient(180deg,rgba(12,28,46,0.98),rgba(10,23,38,0.98))] p-5 text-center shadow-[0_18px_42px_rgba(0,0,0,0.18)]"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#D0A243]/60 bg-[#20364A] text-[#E8C36B]"><UserRound size={34} /></div><p className="mt-4 font-['Tajawal'] text-[1.2rem] font-black text-white">أ. محمد الشمري</p><p className="mt-1 text-[11px] text-white/48">مدير إدارة الاستثمار</p><div className="mt-4 grid grid-cols-2 gap-2 text-right"><div className="rounded-[0.85rem] bg-white/[0.03] p-2.5"><p className="text-[10px] text-white/42">آخر دخول</p><p className="mt-1 text-xs font-bold text-white">09:15 ص</p></div><div className="rounded-[0.85rem] bg-white/[0.03] p-2.5"><p className="text-[10px] text-white/42">الصلاحية</p><p className="mt-1 text-xs font-bold text-[#E8C36B]">مدير نظام</p></div></div></section>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      <MetricCard label="إجمالي الاعتمادات" value="124" note="+18% عن الشهر الماضي" icon={<FileCheck2 size={20} />} />
      <MetricCard label="قيد المراجعة" value="32" note="8 ملفات تحتاج قراراً اليوم" icon={<Clock3 size={20} />} />
      <MetricCard label="مكتملة" value="62" note="+12% عن الشهر الماضي" icon={<CheckCircle2 size={20} />} tone="green" />
      <MetricCard label="متأخرة" value="12" note="3 ملفات تجاوزت الإطار الزمني" icon={<CalendarClock size={20} />} tone="red" />
      <MetricCard label="متوسط زمن القرار" value="18" note="تحسن 5 أيام عن الدورة السابقة" icon={<Workflow size={20} />} tone="blue" />
    </div>
    <ControlStrip searchLabel="ابحث برقم اعتماد أو اسم ملف..." actionLabel="تصدير السجل" />
    <Surface title="مسار الاعتماد السريع" subtitle="حالة الملف الحالي: تطوير موقع حي مشار">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{stages.map((stage, index) => { const done = index < 3; const current = index === 3; return <div key={stage} className={`rounded-[1rem] border px-4 py-4 text-right ${current ? "border-[#D0A243]/50 bg-[#D0A243]/12" : done ? "border-[#42DD71]/25 bg-[#173C2A]/45" : "border-white/8 bg-white/[0.025]"}`}><span className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black ${current ? "border-[#D0A243] bg-[#C79C45] text-[#0B1726]" : done ? "border-[#42DD71] bg-[#173C2A] text-[#42DD71]" : "border-white/12 text-white/40"}`}>{done ? "✓" : index + 1}</span><p className="text-sm font-black text-white">{stage}</p><p className="mt-1 text-[11px] text-white/44">{done ? "مكتمل" : current ? "قيد التنفيذ" : "بانتظار الدور"}</p></div>; })}</div>
    </Surface>
    <div className="grid gap-4 2xl:grid-cols-[0.9fr_1.1fr]">
      <Surface title="قرار مطلوب من القيادة" subtitle="الملفات التي تستحق تدخلاً اليوم" action={<span className="inline-flex items-center gap-2 rounded-full bg-[#3F2226] px-3 py-1 text-[11px] font-black text-[#FF8A8F]"><Clock3 size={13} />ساعتان متبقيتان</span>}>
        <div className="rounded-[1.1rem] border border-[#D0A243]/25 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.16),transparent_45%),white/[0.025]] p-5 text-right"><p className="text-[11px] text-[#E4C982]">قرار اعتماد نهائي</p><h3 className="mt-2 font-['Tajawal'] text-[1.55rem] font-black text-white">تطوير موقع حي مشار</h3><p className="mt-3 text-sm leading-8 text-white/65">الملف مكتمل فنياً وتنظيمياً، وتأخير التوقيع سيؤجل نافذة الطرح الموسمية إلى الدورة التالية.</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-[0.85rem] bg-white/[0.04] p-3"><p className="text-[10px] text-white/42">الأثر المتوقع</p><p className="mt-1 font-black text-[#59D776]">28.5 مليون ر.س</p></div><div className="rounded-[0.85rem] bg-white/[0.04] p-3"><p className="text-[10px] text-white/42">التوصية</p><p className="mt-1 font-black text-[#E7C46D]">اعتماد اليوم</p></div></div><button className="mt-4 w-full rounded-[0.9rem] bg-[#C79C45] px-4 py-3 text-sm font-black text-[#09121D]">فتح موجز القرار</button></div>
      </Surface>
      <Surface title="إشارات الحوكمة" subtitle="قراءة سريعة لجودة مسار الاعتماد"><div className="grid gap-3 sm:grid-cols-3"><DecisionSignal title="الملفات ضمن SLA" value="84%" note="تحسن 9% عن الشهر الماضي" action="استقرار المسار" tone="green" /><DecisionSignal title="مخاطر تأخير" value="3" note="ملفات تحتاج حسم مسؤول مباشر" action="تدخل اليوم" tone="red" /><DecisionSignal title="سلامة المتطلبات" value="96%" note="نسبة اكتمال التوثيق والمرفقات" action="جاهز للرفع" tone="blue" /></div></Surface>
    </div>
    <Surface title="الاعتمادات الأخيرة" subtitle="سجل موحد للتدقيق والمتابعة" action={<button className="text-sm font-black text-[#E4C982]">عرض السجل الكامل</button>}>
      <div className="overflow-x-auto rounded-[1rem] border border-white/8"><table className="min-w-[860px] w-full text-right"><thead className="bg-white/[0.04] text-[11px] text-white/48"><tr>{["رقم الاعتماد", "العنوان", "النوع", "الجهة", "الحالة", "آخر تحديث", "إجراء"].map((title) => <th key={title} className="px-4 py-3 font-bold">{title}</th>)}</tr></thead><tbody>{approvalRows.map(([id, title, type, owner, status, date, tone]) => <tr key={id} className="border-t border-white/6 text-sm text-white/74"><td className="px-4 py-4 font-bold text-[#E5C876]">{id}</td><td className="px-4 py-4 font-bold text-white">{title}</td><td className="px-4 py-4">{type}</td><td className="px-4 py-4 text-white/54">{owner}</td><td className="px-4 py-4"><Status tone={tone}>{status}</Status></td><td className="px-4 py-4 text-white/44">{date}</td><td className="px-4 py-4"><button className="rounded-[0.8rem] border border-[#D0A243]/30 px-3 py-2 text-xs font-bold text-[#E5C876]">فتح الملف</button></td></tr>)}</tbody></table></div>
    </Surface>
  </div>;
}

const partnerRows = [
  ["شركة مستقبل العقارية", "تطوير عمراني", "320 مليون ر.س", "نشط", "green"],
  ["صندوق آفاق للاستثمار", "تمويل وتشغيل", "210 مليون ر.س", "نشط", "green"],
  ["مؤسسة المجد العمراني", "تشغيل تجاري", "150 مليون ر.س", "قيد المراجعة", "gold"],
  ["شركة البنيان العقاري", "مستثمر استراتيجي", "120 مليون ر.س", "نشط", "green"],
] as const;

export function PartnersReference() {
  return <div className="space-y-4">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      <MetricCard label="إجمالي المستثمرين" value="256" note="+22% عن الشهر الماضي" icon={<UsersRound size={20} />} />
      <MetricCard label="مستثمرون نشطون" value="146" note="56% من قاعدة المستثمرين" icon={<BadgeCheck size={20} />} tone="green" />
      <MetricCard label="شراكات قائمة" value="38" note="5 شراكات جديدة هذا الشهر" icon={<Handshake size={20} />} tone="blue" />
      <MetricCard label="قيمة الاستثمارات" value="1.24" note="+28% عن الشهر الماضي" icon={<Building2 size={20} />} />
      <MetricCard label="الفرص المرتبطة" value="64" note="+15% عن الشهر الماضي" icon={<LineChart size={20} />} tone="blue" />
    </div>
    <ControlStrip searchLabel="ابحث عن مستثمر أو شريك..." actionLabel="إضافة مستثمر" />
    <div className="grid gap-4 2xl:grid-cols-[0.62fr_1fr_0.72fr]">
      <Surface title="توزيع المستثمرين" subtitle="حسب القطاع والاهتمام"><div className="flex flex-col items-center justify-center gap-5 sm:flex-row 2xl:flex-col"><div className="h-40 w-40 rounded-full border border-white/10" style={{ background: "conic-gradient(#D0A243 0deg 128deg,#2D78B8 128deg 214deg,#39A75C 214deg 293deg,#5A3C9A 293deg 360deg)" }}><div className="m-[27px] flex h-[106px] w-[106px] items-center justify-center rounded-full bg-[#0C1D2F] font-['Tajawal'] text-[1.7rem] font-black text-white">256</div></div><div className="space-y-2 text-right text-sm text-white/68">{[['تجاري', '32%', '#D0A243'], ['سكني', '24%', '#2D78B8'], ['ضيافة', '22%', '#39A75C'], ['ترفيهي', '22%', '#A78BFA']].map(([label, value, color]) => <div key={label} className="flex items-center justify-between gap-8"><span style={{ color }}>{value}</span><span>{label}</span></div>)}</div></div></Surface>
      <Surface title="أبرز المستثمرين" subtitle="جاهزية العلاقة وفرص المطابقة" action={<button className="text-sm font-black text-[#E4C982]">عرض جميع المستثمرين</button>}><div className="grid gap-3 sm:grid-cols-2">{partnerRows.map(([name, specialty, value, status, tone]) => <article key={name} className="rounded-[1rem] border border-white/8 bg-white/[0.025] p-4 text-right"><div className="flex items-start justify-between gap-3"><Status tone={tone}>{status}</Status><div><p className="font-black text-white">{name}</p><p className="mt-1 text-[11px] text-white/44">{specialty}</p></div></div><div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3"><button className="text-xs font-bold text-[#E4C982]">ملف المستثمر</button><p className="text-sm font-black text-white">{value}</p></div></article>)}</div></Surface>
      <Surface title="الشراكات الحديثة" subtitle="آخر الملفات التي تغيرت"><div className="space-y-3">{[['شركة تطوير حي مشار', 'تفاوض أولي', '05/01/1446'], ['مشروع السوق المركزي', 'مراجعة شروط', '28/12/1445'], ['تشغيل واجهة المدينة', 'جاهز للتوقيع', '25/12/1445']].map(([title, status, date], index) => <div key={title} className="flex items-center justify-between gap-3 rounded-[1rem] border border-white/8 bg-white/[0.025] p-3 text-right"><span className={`h-2.5 w-2.5 rounded-full ${index === 2 ? "bg-[#42DD71]" : index === 1 ? "bg-[#F0B846]" : "bg-[#7BC9FF]"}`} /><div><p className="text-sm font-bold text-white">{title}</p><p className="mt-1 text-[10px] text-white/42">{status} · {date}</p></div></div>)}</div><button className="mt-4 w-full rounded-[0.9rem] border border-[#D0A243]/30 px-3 py-3 text-xs font-bold text-[#E4C982]">عرض جميع الشراكات</button></Surface>
    </div>
    <Surface title="إشارات المطابقة الاستثمارية" subtitle="أين تتحرك إدارة العلاقة أولاً"><div className="grid gap-3 2xl:grid-cols-3"><InsightRow title="صندوق آفاق جاهز لمشروع الواجهة الشمالية" description="توافق مرتفع مع قطاع الترفيه، وتمويل أولي يتجاوز الاحتياج المبدئي للفرصة." owner="إدارة الشراكات" due="تواصل خلال 24 ساعة" tone="green" /><InsightRow title="شركة مستقبل تحتاج موجزاً تنظيمياً" description="المستثمر أبدى اهتماماً، لكن نقطة الربط التنظيمية لم تحسم بعد ضمن ملف حي مشار." owner="إدارة الاستثمار" due="إعداد موجز اليوم" tone="gold" /><InsightRow title="فجوة في عرض الضيافة الموسمية" description="مؤشر الطلب قائم، لكن قاعدة المستثمرين المتخصصين لا تزال أدنى من المستهدف." owner="تطوير الأعمال" due="رفع قائمة مرشحين" tone="blue" /></div></Surface>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[['معدل نجاح المطابقة', '91%', 'ارتفاع 6% عن الشهر الماضي', 'green'], ['متوسط زمن الاستجابة', '2.4 يوم', 'تحسن 0.8 يوم', 'blue'], ['معدل تحويل الفرص', '28%', 'ارتفاع 9% عن الشهر الماضي', 'gold'], ['عدد الاجتماعات', '48', '+8 عن الشهر الماضي', 'red']].map(([label, value, note, tone]) => <MetricCard key={label} label={label} value={value} note={note} icon={<UsersRound size={19} />} tone={tone as Tone} />)}</div>
  </div>;
}

export function ReportsReference() {
  const schedule = [['اليوم', 'تحديث لوحة الأداء الشهرية', '09:20 ص'], ['غداً', 'ملخص لجنة الاستثمار', '10:00 ص'], ['الأحد', 'تقرير الجاهزية التنظيمية', '01:30 م'], ['الثلاثاء', 'قراءة فرص الربع القادم', '11:00 ص']];
  return <div className="space-y-4">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="تقارير جاهزة" value="18" note="4 تقارير بانتظار النشر" icon={<FileText size={20} />} tone="green" /><MetricCard label="لوحات تنفيذية" value="12" note="آخر تحديث قبل 18 دقيقة" icon={<LineChart size={20} />} tone="blue" /><MetricCard label="تقارير قيد المراجعة" value="6" note="2 تحتاج اعتماداً" icon={<Clock3 size={20} />} /><MetricCard label="موعد اللجنة القادم" value="غداً" note="10:00 ص - قاعة الاستثمار" icon={<CalendarClock size={20} />} tone="red" /></div>
    <ControlStrip searchLabel="ابحث في التقارير واللوحات..." actionLabel="إنشاء تقرير" />
    <div className="grid gap-4 2xl:grid-cols-[1.18fr_0.82fr]">
      <Surface title="القراءة التنفيذية لهذا الأسبوع" subtitle="ما الذي تغيّر ويحتاج متابعة"><div className="grid gap-3 sm:grid-cols-3"><DecisionSignal title="قيمة الفرص الجاهزة" value="67.9 م" note="6 فرص تستوفي حد الجاهزية للمتابعة التنفيذية" action="ارتفاع 12%" tone="green" /><DecisionSignal title="الجاهزية التنظيمية" value="83%" note="تجاوز المستهدف المحدد بـ 6 نقاط" action="استمر بالرفع" tone="blue" /><DecisionSignal title="قرار مطلوب" value="2" note="ملفان متأخران قد يؤثران على دورة الطرح" action="متابعة اللجنة" tone="red" /></div></Surface>
      <Surface title="توصية التقرير" subtitle="موجز جاهز للقيادة"><div className="rounded-[1rem] border border-[#D0A243]/25 bg-[#D0A243]/8 p-4 text-right"><div className="flex items-center justify-between"><TrendingUp size={20} className="text-[#E6C16A]" /><Status tone="gold">أولوية</Status></div><p className="mt-4 font-['Tajawal'] text-[1.2rem] font-black text-white">ارفع فرص حي الجامعيين ضمن موجز اللجنة</p><p className="mt-2 text-[11px] leading-7 text-white/60">الفرص الأعلى قيمةً والأقرب للرفع، مع جاهزية تنظيمية واضحة وأثر اقتصادي قابل للقياس.</p><button className="mt-4 text-xs font-black text-[#E8C36B]">عرض موجز القيادة ←</button></div></Surface>
    </div>
    <Surface title="التقارير التنفيذية" subtitle="إصدارات جاهزة للقيادة والاجتماعات"><div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4"><ReportPreview tone="gold" label="شهري" title="تقرير الأداء التنفيذي" meta="ملخص الأداء الاستثماري والقرارات المفتوحة" /><ReportPreview tone="blue" label="مكاني" title="تقرير التحليل المكاني" meta="توزيع الأولويات والجاذبية والفرص" /><ReportPreview tone="green" label="مستثمرون" title="تقرير الشركاء والمستثمرين" meta="تفاعل المستثمرين ومسار المطابقة" /><ReportPreview tone="purple" label="فرص" title="تقرير الفرص الاستثمارية" meta="الجاهزية والقيمة والعائد المتوقع" /></div></Surface>
    <div className="grid gap-4 2xl:grid-cols-[1.15fr_0.85fr]">
      <Surface title="لوحات البيانات" subtitle="اختصارات عرض المستوى التنفيذي"><div className="grid gap-3 sm:grid-cols-2"><button className="rounded-[1rem] border border-[#D0A243]/40 bg-[#D0A243]/10 p-5 text-right"><LineChart size={22} className="mb-4 text-[#E5C876]" /><p className="font-black text-white">لوحة الأداء الشاملة</p><p className="mt-2 text-[11px] text-white/46">مؤشرات الأداء والاقتصاد والاعتمادات</p></button><button className="rounded-[1rem] border border-white/8 bg-white/[0.025] p-5 text-right"><UsersRound size={22} className="mb-4 text-[#7BC9FF]" /><p className="font-black text-white">لوحة المستثمرين</p><p className="mt-2 text-[11px] text-white/46">تفاعل الشركاء وفرص المطابقة</p></button><button className="rounded-[1rem] border border-white/8 bg-white/[0.025] p-5 text-right"><Workflow size={22} className="mb-4 text-[#59D776]" /><p className="font-black text-white">لوحة الاعتمادات</p><p className="mt-2 text-[11px] text-white/46">الملفات المتأخرة ومسارات القرار</p></button><button className="rounded-[1rem] border border-white/8 bg-white/[0.025] p-5 text-right"><Building2 size={22} className="mb-4 text-[#CDA3FF]" /><p className="font-black text-white">لوحة الفرص المكانية</p><p className="mt-2 text-[11px] text-white/46">المواقع والأحياء ذات الأولوية</p></button></div></Surface>
      <Surface title="جدولة النشر" subtitle="الأولوية للأيام السبعة القادمة"><div className="space-y-3">{schedule.map(([day, title, time]) => <div key={title} className="grid grid-cols-[68px_minmax(0,1fr)] gap-3 rounded-[1rem] border border-white/8 bg-white/[0.025] p-4 text-right"><div className="rounded-[0.85rem] bg-[#D0A243]/14 px-2 py-3 text-center text-xs font-black text-[#E8C36B]">{day}</div><div><p className="font-bold text-white">{title}</p><p className="mt-1 text-[11px] text-white/44">{time}</p></div></div>)}</div></Surface>
    </div>
  </div>;
}

export function PerformanceReference() {
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const details = [
    ["معدل استغلال الأراضي", "76%", "+11%", "green"],
    ["معدل رضا المستثمرين", "91%", "+8%", "green"],
    ["معدل سرعة الاعتماد", "41%", "+9%", "gold"],
    ["طلبات مكتملة رقمياً", "12.4K", "+15%", "blue"],
    ["متوسط دورة الاعتماد", "24 يوم", "-8 أيام", "green"],
    ["معدل تحول الفرص", "32%", "+6%", "gold"],
  ] as const;

  return <div className="space-y-4">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <MetricCard label="مؤشر الأداء العام" value="87%" note="+12% عن الربع السابق" icon={<TrendingUp size={20} />} tone="green" />
      <MetricCard label="معدل تحول الفرص" value="32%" note="+6% عن الشهر الماضي" icon={<LineChart size={20} />} tone="gold" />
      <MetricCard label="متوسط مدة الاعتماد" value="24 يوم" note="-8 أيام عن الفترة السابقة" icon={<Clock3 size={20} />} tone="blue" />
      <MetricCard label="القيمة الاقتصادية" value="211.7" note="+18% نمو متوقع" icon={<Building2 size={20} />} />
      <MetricCard label="نسبة جاهزية الفرص" value="83%" note="+7% عن الشهر الماضي" icon={<BadgeCheck size={20} />} tone="green" />
    </div>

    <div className="grid gap-4 2xl:grid-cols-[1.35fr_0.65fr]">
      <Surface title="اتجاه الأداء العام" subtitle="قراءة شهرية مختصرة">
        <div className="relative h-[320px] rounded-[1rem] border border-white/8 bg-[#080f14]/35 p-5">
          <div className="absolute inset-x-8 bottom-12 top-8 grid grid-rows-5">
            {[1, 2, 3, 4, 5].map((line) => <span key={line} className="border-t border-white/8" />)}
          </div>
          <svg className="absolute inset-5 h-[calc(100%-40px)] w-[calc(100%-40px)]" viewBox="0 0 900 260" preserveAspectRatio="none">
            <polyline points="0,210 80,170 160,145 240,118 320,104 400,90 480,80 560,85 640,70 720,58 800,66 900,38" fill="none" stroke="#59D776" strokeWidth="5" strokeLinecap="round" />
            <polyline points="0,230 80,205 160,176 240,158 320,139 400,120 480,112 560,103 640,91 720,82 800,75 900,52" fill="none" stroke="#EAC170" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-x-8 bottom-4 flex justify-between text-[11px] text-white/42">{months.map((month) => <span key={month}>{month}</span>)}</div>
          <div className="absolute bottom-14 right-8 flex gap-4 text-[11px]"><span className="text-[#59D776]">القيمة الحالية</span><span className="text-[#EAC170]">القيمة السابقة</span></div>
        </div>
      </Surface>

      <Surface title="توزيع الفرص حسب الحالة" subtitle="24 فرصة">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1fr] 2xl:grid-cols-1">
          <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-[conic-gradient(#59D776_0_33%,#EAC170_33%_58%,#7BC9FF_58%_71%,#FF7C82_71%_84%,#3B475A_84%_100%)]">
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#101C2C]">
              <span className="font-['Tajawal'] text-4xl font-black text-white">24</span>
              <span className="text-[11px] text-white/46">إجمالي الفرص</span>
            </div>
          </div>
          <div className="space-y-3">
            {[["جاهزة للطرح", "8", "33%", "green"], ["قيد الدراسة", "6", "25%", "gold"], ["قيد المراجعة", "5", "21%", "blue"], ["متعثرة", "3", "13%", "red"], ["مغلقة", "2", "8%", "gold"]].map(([label, count, pct, tone]) => (
              <div key={label} className="flex items-center justify-between rounded-[0.9rem] border border-white/8 bg-white/[0.025] px-3 py-2 text-sm">
                <Status tone={tone as Tone}>{pct}</Status>
                <span className="text-white/62">{count} فرص</span>
                <span className="font-bold text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Surface>
    </div>

    <Surface title="مؤشرات تفصيلية" subtitle="قابلة للمتابعة الشهرية">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {details.map(([label, value, delta, tone]) => (
          <DecisionSignal key={label} title={label} value={value} note={`${delta} مقارنة بالفترة السابقة`} action="مستقر" tone={tone as Tone} />
        ))}
      </div>
    </Surface>
  </div>;
}

export function SettingsReference() {
  const permissions = [["عرض اللوحات", "42 مستخدماً", "green"], ["تحرير المسودات", "18 مستخدماً", "blue"], ["مراجعة الاعتمادات", "8 مستخدمين", "gold"], ["اعتماد ونشر", "4 مستخدمين", "red"]] as const;
  const securityItems = [
    ["تسجيل الدخول الثنائي", "مفعل لجميع الحسابات الإدارية", ShieldCheck, "green"],
    ["سجل التدقيق", "احتفاظ كامل بعمليات الواجهة", LockKeyhole, "blue"],
    ["مفاتيح الربط", "3 مفاتيح نشطة ضمن البيئة", KeyRound, "gold"],
    ["تفضيلات النظام", "آخر تعديل اليوم 08:45 ص", Settings2, "red"],
  ] as const;
  const adminTools = [
    ["إدارة الأدوار", "تحديث الصلاحيات حسب الوحدة", UsersRound],
    ["سياسات الاعتماد", "ضبط مستويات المراجعة", SlidersHorizontal],
    ["إعدادات التنبيهات", "قنوات الإشعار والمتابعة", BellRing],
    ["أرشفة السجلات", "سياسات الاحتفاظ والتصدير", FileCheck2],
  ] as const;

  return <div className="space-y-4">
    <div className="grid gap-4 2xl:grid-cols-[0.9fr_1.1fr]">
      <Surface title="هوية مساحة الأمانة" subtitle="إعدادات العرض والتنظيم"><div className="space-y-3">{[['اسم الجهة', 'أمانة منطقة حائل'], ['وحدة التشغيل', 'مكتب دعم القرار الاستثماري'], ['نمط العرض القيادي', 'مفعل'], ['المنطقة الزمنية', 'Asia/Riyadh']].map(([label, value]) => <div key={label} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.025] px-4 py-3"><span className="text-sm font-bold text-white">{value}</span><span className="text-[11px] text-white/44">{label}</span></div>)}</div></Surface>
      <Surface title="تنبيهات ومسارات العمل" subtitle="إعدادات قيد التطبيق"><div className="grid gap-3 sm:grid-cols-2">{[['تنبيه تأخر الاعتماد', 'عند تجاوز الإطار الزمني', true], ['إشعار تحديث فرصة', 'عند تغيير الجاهزية أو الحالة', true], ['موجز اللجنة الأسبوعي', 'قبل الاجتماع بيوم واحد', true], ['نسخة تنفيذية داخلية', 'مرئية للقيادة فقط', false]].map(([label, note, enabled]) => <div key={label as string} className="rounded-[1rem] border border-white/8 bg-white/[0.025] p-4 text-right"><div className="flex items-center justify-between"><span className={`flex h-6 w-11 items-center rounded-full px-1 ${enabled ? "justify-end bg-[#2C9B53]" : "justify-start bg-white/12"}`}><span className="h-4 w-4 rounded-full bg-white" /></span><p className="font-bold text-white">{label}</p></div><p className="mt-3 text-[11px] leading-6 text-white/44">{note}</p></div>)}</div></Surface>
    </div>
    <div className="grid gap-4 2xl:grid-cols-[1.12fr_0.88fr]">
      <Surface title="الصلاحيات والأدوار" subtitle="مصفوفة الوصول الحالية" action={<button className="text-sm font-black text-[#E4C982]">إدارة المستخدمين</button>}><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{permissions.map(([label, value, tone]) => <div key={label} className="rounded-[1rem] border border-white/8 bg-white/[0.025] p-4 text-right"><Status tone={tone}>{label}</Status><p className="mt-4 font-['Tajawal'] text-[1.5rem] font-black text-white">{value}</p><p className="mt-2 text-[11px] text-white/44">مستوى وصول مراجع</p></div>)}</div></Surface>
      <Surface title="حالة الحماية" subtitle="مراجعة أمنية مختصرة"><div className="space-y-3">{securityItems.map(([label, note, Icon, tone]) => <div key={label} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.025] p-4 text-right"><Status tone={tone}>سليم</Status><div><p className="font-bold text-white">{label}</p><p className="mt-1 text-[11px] text-white/44">{note}</p></div><Icon size={18} className="text-[#D0A243]" /></div>)}</div></Surface>
    </div>
    <Surface title="أدوات الإدارة" subtitle="إجراءات تشغيلية محكومة"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{adminTools.map(([label, note, Icon]) => <button key={label} className="flex items-center justify-between rounded-[1rem] border border-white/8 bg-white/[0.025] p-4 text-right transition hover:border-[#D0A243]/35 hover:bg-white/[0.05]"><Icon size={20} className="text-[#D0A243]" /><span><span className="block font-bold text-white">{label}</span><span className="mt-1 block text-[11px] text-white/44">{note}</span></span></button>)}</div></Surface>
    <Surface title="جاهزية الحوكمة الرقمية" subtitle="مؤشرات يجب أن تبقى مستقرة قبل العرض التنفيذي"><div className="grid gap-3 sm:grid-cols-3"><DecisionSignal title="تغطية سجل التدقيق" value="100%" note="كل إجراءات الإدارة مسجلة وقابلة للمراجعة" action="سجل محدث" tone="green" /><DecisionSignal title="سلامة الصلاحيات" value="0" note="لا توجد طلبات وصول استثنائية مفتوحة" action="لا إجراء مطلوب" tone="blue" /><DecisionSignal title="سياسة النشر" value="مقيدة" note="المحتوى القيادي لا ينشر قبل الاعتماد الداخلي" action="حماية مفعلة" tone="gold" /></div></Surface>
  </div>;
}
