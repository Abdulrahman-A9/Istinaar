"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BarChart3, BriefcaseBusiness, Building2, Calculator, ChevronLeft, CircleGauge, FileSearch, Handshake, Landmark, LayoutDashboard, MapPin, Ruler, ScanSearch, Shield, Sparkles, TrendingUp } from "lucide-react";
import lands from "@/data/lands";

const stats = [
  { value: "١٢", label: "موقعاً قابلاً للطرح الفوري" },
  { value: "٣ أحياء", label: "مراكز طلب ذات أولوية" },
  { value: "+٢٣٠", label: "مستثمر ضمن قاعدة العرض" },
  { value: "٧٨٪", label: "قبول مبدئي للفرص المحللة" },
];

const steps = [
  { icon: <ScanSearch size={22} color="#C9A84C" />, title: "اكتشف الأرض", desc: "تصفّح قائمة الأراضي الموسمية المتاحة في حائل" },
  { icon: <FileSearch size={22} color="#C9A84C" />, title: "اطلع على التفاصيل", desc: "راجع الشروط والمواصفات الفنية لكل موقع" },
  { icon: <Calculator size={22} color="#C9A84C" />, title: "حلّل فرصتك", desc: "استخدم أدوات التحليل وحاسبة العائد الاستثماري" },
  { icon: <Landmark size={22} color="#C9A84C" />, title: "قدّم طلبك", desc: "انتقل مباشرة إلى مسار التقديم الرسمي عبر منصة فرص" },
];

const serviceCards = [
  {
    href: "/partnerships",
    title: "بوابة الشراكات",
    desc: "مطابقة الشركاء، وتنظيم الطلبات، ودعم مسار المشاريع المشتركة ضمن إطار أوضح للمواءمة والتنفيذ.",
    eyebrow: "خدمة تشاركية",
    icon: <Handshake size={22} color="#C9A84C" />,
  },
  {
    href: "/location-analysis",
    title: "تحليل المواقع",
    desc: "قراءة تاريخية ومكانية للأحياء، الكثافات، والاتجاهات قبل تثبيت الموقع النهائي.",
    eyebrow: "خدمة مكانية",
    icon: <MapPin size={22} color="#C9A84C" />,
  },
  {
    href: "/smart-analysis",
    title: "التحليل الذكي",
    desc: "لوحات مختصرة للمخاطر والجدوى تساعد اللجان على فهم الفرصة بسرعة ووضوح.",
    eyebrow: "خدمة تحليلية",
    icon: <BarChart3 size={22} color="#C9A84C" />,
  },
  {
    href: "/calculator",
    title: "حاسبة العائد",
    desc: "تقدير سريع للعائد، فترة الاسترداد، وحساسية الربحية وفق الافتراضات التشغيلية.",
    eyebrow: "خدمة مالية",
    icon: <Calculator size={22} color="#C9A84C" />,
  },
  {
    href: "/apply-guide",
    title: "دليل التقديم",
    desc: "قائمة جاهزية رسمية للملف الاستثماري قبل الرفع على منصة فرص السعودية.",
    eyebrow: "خدمة تنظيمية",
    icon: <BriefcaseBusiness size={22} color="#C9A84C" />,
  },
  {
    href: "/dashboard",
    title: "لوحة المتابعة",
    desc: "متابعة الطلبات، التقارير، والتنبيهات من نقطة تشغيل واحدة للمستثمر أو الفريق.",
    eyebrow: "خدمة تشغيلية",
    icon: <LayoutDashboard size={22} color="#C9A84C" />,
  },
];

const audienceViews = {
  investor: {
    title: "للمستثمر: قرار أسرع وثقة أعلى قبل التقديم",
    description: "تعطيك المنصة قراءة واضحة للطلب والربحية والمخاطر قبل أن تبدأ إجراءاتك في فرص، وهذا يقلل القرارات العشوائية ويرفع جاهزية الملف.",
    bullets: ["مؤشرات ربحية وجدوى ومخاطر", "مقارنة بين الأحياء والأنشطة", "انتقال مباشر إلى فرصة التقديم الرسمية"],
  },
  authority: {
    title: "للأمانة: رفع جودة الطرح وتوجيه المستثمرين بشكل أدق",
    description: "تعمل المنصة كطبقة تحليلية تسبق منصة فرص، بحيث تساعد على ترتيب أولويات الطرح، وشرح الفرص بصياغة أوضح، ورفع جودة القرار الاستثماري.",
    bullets: ["لوحة تحكم عرضية للإدارة", "قياس الطلب على مستوى الحي", "توصيات تنفيذية قابلة للعرض أمام القيادات"],
  },
} as const;

const heroMessages = [
  "قراءة استدلالية تعزز جودة القرار الاستثماري.",
  "تحليلاً أوضح للفرص قبل التقديم على المسارات الرسمية.",
  "مساراً منظمًا لرواد الأعمال لدراسة المشاريع قبل التنفيذ.",
  "مؤشرات مكانية وتشغيلية تدعم المستثمرين والجهات ذات العلاقة.",
];

const featured = lands.filter((l) => l.status === "available").slice(0, 3);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const heroSlideRight = {
  hidden: { opacity: 0, x: 86 },
  visible: { opacity: 1, x: 0 },
};

const heroSlideLeft = {
  hidden: { opacity: 0, x: -86 },
  visible: { opacity: 1, x: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const [viewMode, setViewMode] = useState<keyof typeof audienceViews>("investor");
  const [heroMessageIndex, setHeroMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroMessageIndex((currentIndex) => (currentIndex + 1) % heroMessages.length);
    }, 4600);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #163A68 100%)" }}
        className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0 pointer-events-none overflow-hidden grid-glow opacity-30" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(39, 78, 132, 0.24), transparent 0 24%), linear-gradient(180deg, rgba(6, 22, 41, 0.08) 0%, rgba(6, 22, 41, 0.22) 100%)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute top-10 left-10 hidden md:block w-96 h-96 rounded-full border border-white/5"
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }} transition={{ duration: 10, repeat: Infinity }} />
          <motion.div className="absolute bottom-10 right-10 hidden md:block w-64 h-64 rounded-full border border-white/5"
            animate={{ y: [0, 12, 0], x: [0, -10, 0] }} transition={{ duration: 9, repeat: Infinity }} />
          <div className="hero-glow hero-glow-primary" />
          <div className="hero-glow hero-glow-secondary" />
          <div className="hero-glow hero-glow-tertiary" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-[0.94fr_1.06fr] gap-10 items-center">
            <motion.div variants={heroSlideRight} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-3xl text-right order-1 lg:order-1 lg:mr-0 lg:ml-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}>
              رؤية ٢٠٣٠: استثمار مستدام
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              استنار
              <span style={{ color: "#C9A84C" }}> | Istinaar</span>
            </h1>
            <div className="mb-2 text-right">
              <p className="text-base md:text-lg font-bold text-white/90">في استنار نقدم</p>
            </div>
            <div className="hero-message-stage mb-5 md:mb-6 max-w-3xl">
              <div className="hero-message-stage-body">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={heroMessages[heroMessageIndex]}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="hero-message-text"
                  >
                    {heroMessages[heroMessageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            <p className="text-base md:text-xl text-white/75 mb-8 md:mb-10 leading-8 md:leading-relaxed">
              استنار منصة استدلالية تدعم القرار الاستثماري في حائل، وتمنح المستثمر والجهة المنظمة قراءة أوضح للفرص، الأحياء، المخاطر، والعائد قبل التقديم الرسمي.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 md:gap-4 lg:justify-start">
              <Link href="/consulting/request" className="btn-gold text-sm md:text-base px-6 md:px-8 py-3 w-full sm:w-auto justify-center">
                ابدأ طلب استشاري
                <ArrowLeft size={18} />
              </Link>
              <Link href="/opportunities" className="btn-gold text-sm md:text-base px-6 md:px-8 py-3 w-full sm:w-auto justify-center">
                استعرض الفرص
                <ArrowLeft size={18} />
              </Link>
              <Link href="/lands" className="btn-gold text-sm md:text-base px-6 md:px-8 py-3 w-full sm:w-auto justify-center">
                استعرض الأراضي المتاحة
                <ArrowLeft size={18} />
              </Link>
            </div>
            </motion.div>

            <motion.div variants={heroSlideLeft} transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }} className="order-2 lg:order-2 lg:justify-self-start">
              <div className="glass-panel rounded-[1.75rem] p-4 md:p-6 text-white max-w-xl" style={{ background: "linear-gradient(180deg, rgba(6,22,41,0.92) 0%, rgba(10,35,66,0.88) 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm text-white/60">مركز القرار الاستثماري</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#F5D88E" }}>
                    <Sparkles size={15} />
                    مباشر
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { title: "الطلب الموسمي", value: "مرتفع", tone: "#C9A84C" },
                    { title: "الأحياء ذات الأولوية", value: "النقرة، مشار", tone: "#8BD0FF" },
                    { title: "المخاطر القابلة للإدارة", value: "7 فرص", tone: "#7AE2B8" },
                    { title: "التحويل إلى فرص", value: "جاهز", tone: "#F5D88E" },
                  ].map((item) => (
                    <motion.div key={item.title} whileHover={{ y: -4, scale: 1.01 }} className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                      <p className="text-xs text-white/55 mb-2">{item.title}</p>
                      <p className="text-sm font-black" style={{ color: item.tone }}>{item.value}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(201,168,76,0.08)" }}>
                  <p className="text-sm font-bold mb-2" style={{ color: "#F5D88E" }}>لماذا هذا مهم؟</p>
                  <p className="text-sm text-white/75 leading-7">
                    لأن الجهة المنظمة لا تحتاج منصة تنفيذ بديلة، بل تحتاج واجهة تساعد على عرض الجاهزية والطلب وقابلية الاستثمار قبل الإحالة إلى فرص.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Bar */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger} className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-gray-100">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.45 }} className="py-6 px-4 text-center">
                <p className="text-3xl font-black mb-1" style={{ color: "#C9A84C" }}>{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-sm font-bold mb-2" style={{ color: "#C9A84C" }}>اختيار المسار</p>
            <h2 className="text-2xl md:text-4xl font-black mb-3" style={{ color: "#0A2342" }}>مساران استثماريان وفق نوع الاحتياج</h2>
            <p className="text-gray-500 max-w-3xl mx-auto leading-8">
              تتيح المنصة مسارين رئيسيين يخدمان فئات الاستخدام المختلفة: مسار للفرص الاستثمارية الجاهزة، ومسار للاستشارات ودراسة المشاريع الجديدة، بما يضمن وضوح نقطة البداية وملاءمتها لطبيعة الطلب.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} whileHover={{ y: -6 }} className="rounded-[1.8rem] p-5 md:p-8 text-white border border-slate-200 shadow-[0_24px_70px_rgba(10,35,66,0.08)]" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 65%, #163A68 100%)" }}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <BriefcaseBusiness size={22} color="#C9A84C" />
                </div>
                <div>
                  <p className="text-xs font-black mb-2 text-white/70">للمستثمر</p>
                  <h3 className="text-2xl md:text-3xl font-black leading-tight mb-3">أبحث عن فرصة جاهزة</h3>
                  <p className="text-sm text-white/72 leading-8">
                    إذا كنت تريد فرصاً استثمارية جاهزة مع قراءة أولية للجدوى والمخاطر، فهذا هو المدخل الصحيح لك.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {["فرص جاهزة", "قرار أولي سريع", "انتقال لاحق إلى التقديم الرسمي"].map((item) => (
                  <div key={item} className="rounded-xl px-4 py-3 text-sm font-semibold text-center" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/opportunities" className="btn-gold text-sm px-5 py-3">
                ادخل إلى الفرص الجاهزة
                <ArrowLeft size={16} />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ y: -6 }} className="rounded-[1.8rem] p-5 md:p-8 border border-slate-200 shadow-[0_24px_70px_rgba(10,35,66,0.08)] text-right" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F4F8FD 58%, #E7EFF9 100%)" }}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center" style={{ backgroundColor: "rgba(10,35,66,0.08)" }}>
                  <Building2 size={22} color="#0A2342" />
                </div>
                <div>
                  <p className="text-xs font-black mb-2" style={{ color: "#6A7C92" }}>لرائد الأعمال</p>
                  <h3 className="text-2xl md:text-3xl font-black leading-tight mb-3 text-navy">أريد دراسة مشروع جديد</h3>
                  <p className="text-sm text-gray-600 leading-8">
                    إذا كنت لا تملك فرصة جاهزة وتريد معرفة أفضل موقع أو نشاط أو ميزانية، ابدأ من المسار الاستشاري مباشرة.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {["فكرة مشروع", "تحليل موقع ونشاط", "توصية واضحة قبل التنفيذ"].map((item) => (
                  <div key={item} className="rounded-xl px-4 py-3 text-sm font-semibold text-center border border-slate-200" style={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#0A2342" }}>
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/consulting/request" className="btn-primary text-sm px-5 py-3">
                ابدأ دراسة مشروعك
                <ArrowLeft size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-6 items-start">
          <motion.div variants={fadeUp} className="soft-card p-6 text-right">
            <div className="flex gap-2 justify-end mb-4">
              <button
                onClick={() => setViewMode("investor")}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                style={viewMode === "investor" ? { backgroundColor: "#0A2342", color: "white" } : { backgroundColor: "#F3F6FB", color: "#526071" }}>
                للمستثمر
              </button>
              <button
                onClick={() => setViewMode("authority")}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                style={viewMode === "authority" ? { backgroundColor: "#0A2342", color: "white" } : { backgroundColor: "#F3F6FB", color: "#526071" }}>
                للأمانة
              </button>
            </div>
            <h2 className="text-2xl font-black mb-3 text-navy">{audienceViews[viewMode].title}</h2>
            <p className="text-gray-600 leading-8 mb-5">{audienceViews[viewMode].description}</p>
            <div className="space-y-3">
              {audienceViews[viewMode].bullets.map((bullet) => (
                <div key={bullet} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#F6F8FB" }}>
                  <CircleGauge size={18} color="#C9A84C" />
                  <span className="text-sm font-semibold text-navy">{bullet}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "طبقة تحليل لا طبقة تنفيذ", desc: "تكمل فرص بدل أن تعيد بناء إجراءاته.", icon: <Building2 size={20} color="#C9A84C" /> },
              { title: "قراءة بصرية سريعة", desc: "رسوم وتوصيات قابلة للعرض خلال دقائق أمام اللجنة.", icon: <TrendingUp size={20} color="#C9A84C" /> },
              { title: "توجيه الطلب", desc: "ترتيب الفرص حسب الجاهزية والطلب وليس فقط التوفر.", icon: <Shield size={20} color="#C9A84C" /> },
            ].map((item) => (
              <motion.div key={item.title} whileHover={{ y: -6, rotateX: 1 }} className="card p-5 text-right">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#0A2342" }}>
                  {item.icon}
                </div>
                <h3 className="font-black text-base mb-2 text-navy">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-7">{item.desc}</p>
              </motion.div>
            ))}
                <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="md:col-span-3 rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(10,35,66,0.08)] text-right overflow-hidden relative">
                  <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at top left, rgba(201,168,76,0.16), transparent 34%), radial-gradient(circle at bottom right, rgba(10,35,66,0.05), transparent 38%)" }} />
                  <div className="relative rounded-[1.4rem] px-5 py-4 md:px-6 md:py-4" style={{ backgroundColor: "#F7FAFE" }}>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-bold mb-1" style={{ color: "#C9A84C" }}>رحلة المستثمر</p>
                        <h3 className="text-xl md:text-2xl font-black text-navy leading-tight">من الدخول حتى القرار</h3>
                        <p className="text-sm text-gray-600 leading-7 mt-1 mb-0 max-w-2xl">
                          مسار مختصر يشرح للمستثمر أين يبدأ وكيف ينتقل إلى القرار دون تعقيد.
                        </p>
                      </div>
                      <div className="shrink-0">
                        <Link href="/investor-journey" className="btn-primary text-sm px-5 py-2.5">
                          افتح رحلة المستثمر
                          <ArrowLeft size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#0A2342" }}>كيف تعمل المنصة؟</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -8 }} className="card p-6 text-center relative">
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full text-sm font-black text-white flex items-center justify-center"
                  style={{ backgroundColor: "#0A2342" }}>{i + 1}</div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#0A2342" }}>{step.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#0A2342" }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="py-16 px-4" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F6F8FB 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-4" style={{ backgroundColor: "rgba(10,35,66,0.06)", color: "#0A2342" }}>
              <BriefcaseBusiness size={16} color="#C9A84C" />
              خدمات المنصة
            </span>
            <h2 className="text-3xl font-black mb-3" style={{ color: "#0A2342" }}>خدمات مساندة لقرار استثماري أكثر انضباطاً</h2>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviceCards.map((service) => (
              <motion.div key={service.href} variants={fadeUp} whileHover={{ y: -6 }} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(10,35,66,0.08)] text-right">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#0A2342" }}>
                    {service.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wide mb-2" style={{ color: "#C9A84C" }}>{service.eyebrow}</p>
                    <h3 className="text-xl font-black text-navy">{service.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-8 mb-5">{service.desc}</p>
                <Link href={service.href} className="inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-[-4px]" style={{ color: "#0A2342" }}>
                  افتح الخدمة
                  <ArrowLeft size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Value Proposition */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="py-16 px-4" style={{ backgroundColor: "#F0F4FA" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3" style={{ color: "#0A2342" }}>لماذا هذه المنصة؟</h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-8">منصة استشارية تحليلية ترفع جودة القرار الاستثماري وتمنح أمانة حائل مادة عرض أوضح وأكثر إقناعًا من مجرد قائمة فرص خام.</p>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <TrendingUp size={22} color="#C9A84C" />, title: "تحليل ذكي للجدوى", desc: "مؤشرات ربحية وجدوى واضحة لكل فرصة مع تحليل المنافسة والطلب السوقي في كل حي." },
              { icon: <Shield size={22} color="#C9A84C" />, title: "تقييم المخاطر", desc: "محرك مخاطر متقدم يحلل كثافة المنافسة، مستوى التشبع، والطلب السوقي في منطقتك." },
              { icon: <CircleGauge size={22} color="#C9A84C" />, title: "لوحات قرار تنفيذية", desc: "رسوم بيانية ومؤشرات مختصرة تساعد على قراءة الأولويات والفرص دون شرح تقني طويل." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} className="card p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#0A2342" }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#0A2342" }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Advisory + Foras Banner */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between"
            style={{ background: "linear-gradient(135deg, #0A2342, #1a3a6b)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <div>
              <p className="text-white/60 text-sm mb-1">منصة استشارية × منصة تنفيذية</p>
              <h3 className="text-white font-black text-xl mb-2">نحلل عندنا ← تُنفّذ في فرص</h3>
              <p className="text-white/70 text-sm max-w-lg leading-relaxed">
                بعد دراسة الفرصة وحساب العائد وفهم المخاطر، يوجّهك الزر مباشرة إلى الفرصة في منصة فرص السعودية للتقديم الرسمي.
              </p>
            </div>
            <Link href="/lands"
              className="whitespace-nowrap flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shrink-0"
              style={{ backgroundColor: "#C9A84C", color: "#0A2342" }}>
              ابدأ الآن
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Featured Lands */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between mb-10">
            <Link href="/lands" className="flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: "#0A2342" }}>
              <ChevronLeft size={16} />
              عرض جميع الأراضي
            </Link>
            <div className="text-right">
              <h2 className="text-2xl font-black text-right" style={{ color: "#0A2342" }}>أبرز الفرص المتاحة</h2>
              <p className="text-gray-500 text-sm text-right">عينة مهيأة للعرض الرسمي مع مؤشرات تبرز الجاهزية والجدوى</p>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((land) => (
              <motion.div key={land.id} variants={fadeUp} whileHover={{ y: -8 }} className="card overflow-hidden transition-transform duration-300">
                <div className="h-48 relative bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-[1.75rem] border border-white/10 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                    <Building2 size={36} color="#C9A84C" />
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="badge-available text-xs">متاحة</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "rgba(201,168,76,0.85)" }}>{land.type}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-black text-base leading-tight mb-2" style={{ color: "#0A2342" }}>{land.name}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin size={13} />
                    <span>{land.neighborhood}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <span className="inline-flex items-center gap-1"><Ruler size={13} /> {land.area.toLocaleString()} م²</span>
                    <span>•</span>
                    <span>{land.activities.slice(0, 2).join(" • ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href={`/lands/${land.id}`} className="btn-primary text-sm px-4 py-2">
                      عرض التفاصيل
                      <ArrowLeft size={14} />
                    </Link>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">السعر الموسمي</p>
                      <p className="font-black text-sm" style={{ color: "#C9A84C" }}>{land.price.toLocaleString()} ريال</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

