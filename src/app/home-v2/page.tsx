import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleGauge,
  FileSearch,
  Handshake,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

const primaryPaths = [
  {
    eyebrow: "للمستثمر",
    title: "أبحث عن فرصة جاهزة",
    description: "إذا كنت تريد فرصاً استثمارية جاهزة مع قراءة أولية للجدوى والمخاطر، فهذا هو المدخل الصحيح لك.",
    href: "/opportunities",
    cta: "ادخل إلى الفرص الجاهزة",
    icon: <BriefcaseBusiness size={22} color="#C9A84C" />,
    bullets: ["فرص جاهزة", "قرار أولي سريع", "انتقال لاحق إلى التقديم الرسمي"],
    tone: "linear-gradient(135deg, #061629 0%, #0A2342 65%, #163A68 100%)",
    textClass: "text-white",
    subtleClass: "text-white/72",
  },
  {
    eyebrow: "لرائد الأعمال",
    title: "أريد دراسة مشروع جديد",
    description: "إذا كنت لا تملك فرصة جاهزة وتريد معرفة أفضل موقع أو نشاط أو ميزانية، ابدأ من المسار الاستشاري مباشرة.",
    href: "/consulting/request",
    cta: "ابدأ دراسة مشروعك",
    icon: <Store size={22} color="#0A2342" />,
    bullets: ["فكرة مشروع", "تحليل موقع ونشاط", "توصية واضحة قبل التنفيذ"],
    tone: "linear-gradient(135deg, #F7E9B8 0%, #E8C96D 45%, #C9A84C 100%)",
    textClass: "text-navy",
    subtleClass: "text-slate-700",
  },
];

const supportTracks = [
  {
    title: "رحلة المستثمر",
    description: "لمن يريد أن يفهم المنصة قبل أن يبدأ، خطوة بخطوة.",
    href: "/investor-journey",
    icon: <CircleGauge size={20} color="#0A2342" />,
  },
  {
    title: "تحليل المواقع",
    description: "لمن يعرف النشاط ويريد مقارنة الأحياء والموقع قبل الحسم.",
    href: "/location-analysis",
    icon: <MapPinned size={20} color="#0A2342" />,
  },
  {
    title: "بوابة الشراكات",
    description: "لمن تأكد من الفرصة ويبحث عن شريك أو دعم تشغيلي.",
    href: "/partnerships",
    icon: <Handshake size={20} color="#0A2342" />,
  },
  {
    title: "لوحة المتابعة",
    description: "لمن بدأ فعلاً ويريد متابعة طلباته واستشاراته من مكان واحد.",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} color="#0A2342" />,
  },
];

const userTypes = [
  {
    title: "مستثمر يبحث عن فرصة جاهزة",
    summary: "لا يحتاج قراءة كل شيء. يحتاج فقط أن يرى الفرصة ويعرف إن كانت مناسبة أم لا.",
    start: "ابدأ من الفرص الجاهزة",
  },
  {
    title: "رائد أعمال لديه فكرة مشروع",
    summary: "لا يجب أن يضيع بين الأراضي والفرص. يبدأ مباشرة من دراسة المشروع والاستشارة.",
    start: "ابدأ من دراسة مشروعك",
  },
  {
    title: "جهة منظمة أو لجنة عرض",
    summary: "تحتاج رؤية مختصرة تشرح كيف ترفع المنصة جودة القرار قبل التقديم الرسمي.",
    start: "ابدأ من رحلة المستثمر",
  },
  {
    title: "شريك أو مشغل محتمل",
    summary: "لا يبدأ من الصفحة الأولى، بل يدخل فقط عندما تكون الفرصة شبه مؤكدة وتحتاج تكوين فريق.",
    start: "ابدأ من بوابة الشراكات",
  },
];

const clarityPrinciples = [
  "لن نطلب منك فهم كل المنصة قبل البدء.",
  "ابدأ من نيتك الحالية فقط: فرصة جاهزة أو فكرة مشروع.",
  "أي أدوات أخرى تظهر لك لاحقاً فقط عند الحاجة.",
  "الهدف هو تقليل التشتت، لا عرض كل الإمكانيات دفعة واحدة.",
];

const quickJourney = [
  {
    step: "01",
    title: "اختر نيتك",
    desc: "هل تبحث عن فرصة جاهزة أم تدرس مشروعاً جديداً؟",
  },
  {
    step: "02",
    title: "خذ قراءة أولى",
    desc: "شاهد ملخصاً واضحاً قبل التعمق في أي تفاصيل إضافية.",
  },
  {
    step: "03",
    title: "تعمق فقط عند الحاجة",
    desc: "تحليل مواقع، كراسة، استشارة، أو شراكة حسب المرحلة التي وصلت لها.",
  },
  {
    step: "04",
    title: "احسم القرار",
    desc: "تابع إلى التقديم الرسمي أو أوقف القرار مبكراً بوضوح.",
  },
];

export default function HomeV2Page() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF3F9 52%, #F8FAFD 100%)" }}>
      <section className="relative overflow-hidden px-4 py-16 md:py-20" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 58%, #17355F 100%)" }}>
        <div className="absolute inset-0 pointer-events-none grid-glow opacity-35" />
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full blur-3xl" style={{ backgroundColor: "rgba(201,168,76,0.18)" }} />
        <div className="absolute bottom-0 right-8 h-80 w-80 rounded-full blur-3xl" style={{ backgroundColor: "rgba(120,192,255,0.12)" }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
            <div className="text-right text-white max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6" style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
                <Sparkles size={16} />
                نموذج صفحة رئيسية بديلة
              </span>
              <h1 className="text-4xl md:text-6xl font-black leading-[1.15] mb-5">
                البداية الواضحة
                <span style={{ color: "#C9A84C" }}> تقلل التشتت قبل أي قرار</span>
              </h1>
              <p className="text-lg md:text-xl text-white/74 leading-9 max-w-3xl mr-0 ml-auto mb-8">
                هذه النسخة لا تبدأ بعرض كل الخدمات مرة واحدة. تبدأ بسؤال واحد واضح: ما الذي تريد فعله الآن؟
                ثم تنقلك إلى المسار الصحيح دون أن تشعرك أن المنصة متاهة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mr-0 ml-auto">
                {clarityPrinciples.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 px-4 py-4 text-sm leading-7 text-white/78 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 p-6 md:p-7 text-right text-white backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
              <p className="text-sm text-white/60 mb-4">ماذا يرى المستخدم أولاً؟</p>
              <div className="space-y-4">
                {quickJourney.map((item) => (
                  <div key={item.step} className="rounded-[1.35rem] border border-white/10 px-4 py-4" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black text-white" style={{ backgroundColor: "rgba(201,168,76,0.22)" }}>
                        {item.step}
                      </div>
                      <div>
                        <h2 className="text-lg font-black mb-1">{item.title}</h2>
                        <p className="text-sm text-white/68 leading-7">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-16">
        <div className="max-w-7xl mx-auto text-right">
          <div className="mb-8">
            <p className="text-sm font-bold mb-2" style={{ color: "#C9A84C" }}>اختيار المسار</p>
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-3">بدلاً من عرض كل شيء، اختر واحدة فقط</h2>
            <p className="text-gray-500 max-w-3xl mr-0 ml-auto leading-8">
              هذه الصفحة البديلة تجعل البداية قائمة على نية المستخدم، لا على أسماء الخدمات. وهذا يخفف الشعور بالضياع من أول زيارة.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {primaryPaths.map((item) => (
              <div key={item.title} className={`rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-[0_24px_70px_rgba(10,35,66,0.08)] ${item.textClass}`} style={{ background: item.tone }}>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center" style={{ backgroundColor: item.textClass === "text-white" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.34)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-black mb-2 ${item.subtleClass}`}>{item.eyebrow}</p>
                    <h3 className="text-3xl font-black leading-tight mb-3">{item.title}</h3>
                    <p className={`text-sm leading-8 ${item.subtleClass}`}>{item.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {item.bullets.map((bullet) => (
                    <div key={bullet} className="rounded-xl px-4 py-3 text-sm font-semibold text-center" style={{ backgroundColor: item.textClass === "text-white" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.34)" }}>
                      {bullet}
                    </div>
                  ))}
                </div>

                <Link href={item.href} className={item.textClass === "text-white" ? "btn-gold" : "btn-primary"}>
                  {item.cta}
                  <ArrowLeft size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_22px_60px_rgba(10,35,66,0.06)]">
          <div className="text-right mb-8">
            <p className="text-sm font-bold mb-2" style={{ color: "#C9A84C" }}>لكل فئة مدخل واضح</p>
            <h2 className="text-3xl font-black text-navy mb-3">كيف تخاطب هذه النسخة كل نوع من العملاء؟</h2>
            <p className="text-gray-500 leading-8 max-w-3xl mr-0 ml-auto">
              المقصود هنا ليس إرضاء الجميع برسائل كثيرة، بل إعطاء كل فئة نقطة بداية مباشرة يفهمها فوراً.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {userTypes.map((item) => (
              <div key={item.title} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 text-right">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#EEF4FF" }}>
                  <Users size={19} color="#0A2342" />
                </div>
                <h3 className="text-lg font-black text-navy mb-3 leading-8">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-8 mb-4">{item.summary}</p>
                <div className="rounded-xl px-4 py-3 text-sm font-bold" style={{ backgroundColor: "#FFFFFF", color: "#0A2342" }}>
                  البداية المناسبة: {item.start}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.88fr_1.12fr] gap-6 items-start">
          <div className="rounded-[2rem] p-6 md:p-7 text-white" style={{ background: "linear-gradient(135deg, #0A2342 0%, #133764 100%)" }}>
            <p className="text-sm text-white/60 mb-2">المبدأ التشغيلي</p>
            <h2 className="text-3xl font-black mb-4">الأدوات تظهر لاحقاً، لا في البداية</h2>
            <p className="text-white/75 leading-8 mb-6">
              في هذه النسخة، لا نضع تحليل المواقع والشراكات ولوحة المتابعة في الواجهة الأولى على أنها قرارات متساوية.
              بل نجعلها طبقات دعم تظهر فقط عندما يصل المستخدم إلى المرحلة المناسبة.
            </p>
            <div className="space-y-3">
              {[
                "المستخدم الجديد يرى فقط قرار البداية.",
                "المستخدم المتقدم يرى الأدوات المناسبة لمرحلته.",
                "المنصة تبقى قوية داخلياً لكنها أخف ظاهرياً.",
              ].map((item) => (
                <div key={item} className="rounded-xl px-4 py-3 text-sm border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-7 shadow-[0_22px_60px_rgba(10,35,66,0.06)] text-right">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
              <Link href="/investor-journey" className="btn-outline text-sm">
                افتح رحلة المستثمر
                <ArrowLeft size={16} />
              </Link>
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: "#C9A84C" }}>طبقات الدعم</p>
                <h2 className="text-3xl font-black text-navy">موجودة، لكن ليست هي البداية</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportTracks.map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5 transition-transform hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#EEF4FF" }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-navy mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-7 mb-3">{item.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: "#0A2342" }}>
                        افتح المسار
                        <ArrowLeft size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_22px_60px_rgba(10,35,66,0.06)] text-right">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div>
              <p className="text-sm font-bold mb-2" style={{ color: "#C9A84C" }}>الخلاصة</p>
              <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">النسخة الأقوى ليست التي تعرض أكثر، بل التي توجّه أسرع</h2>
              <p className="text-gray-600 leading-8 mb-6">
                إذا شعر المستثمر أو رائد الأعمال أن البداية مفهومة وأن المنصة تعرف ماذا تعرض له ومتى، فهنا تبدأ الثقة. وهذه الصفحة البديلة مبنية بالكامل على هذا المبدأ.
              </p>
              <div className="flex flex-wrap gap-3 justify-end">
                <Link href="/opportunities" className="btn-primary">
                  جرّب مسار المستثمر
                  <ArrowLeft size={16} />
                </Link>
                <Link href="/consulting/request" className="btn-gold">
                  جرّب مسار رائد الأعمال
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <CheckCircle2 size={18} color="#16A34A" />, title: "بداية واحدة مفهومة", desc: "المستخدم لا يبدأ من قائمة خدمات بل من نية واضحة." },
                { icon: <ShieldCheck size={18} color="#16A34A" />, title: "ثقة أعلى", desc: "كل فئة تشعر أن الصفحة تتحدث بلغتها مباشرة." },
                { icon: <FileSearch size={18} color="#16A34A" />, title: "تشتت أقل", desc: "العناصر الثانوية موجودة لكن مؤجلة إلى وقتها الصحيح." },
                { icon: <Building2 size={18} color="#16A34A" />, title: "جاهزية للعرض", desc: "مناسبة للعرض على المستثمرين أو الجهات دون شرح طويل." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#FFFFFF" }}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-black text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}