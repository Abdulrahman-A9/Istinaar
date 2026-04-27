"use client";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  CircleGauge,
  FileCheck2,
  FileSearch,
  Handshake,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UserRoundSearch,
} from "lucide-react";

const journeyRail = [
  {
    step: "01",
    title: "ابدأ",
    subtitle: "حدد المسار",
  },
  {
    step: "02",
    title: "افهم بسرعة",
    subtitle: "ملخص ومخاطر",
  },
  {
    step: "03",
    title: "تعمق عند الحاجة",
    subtitle: "تحليل أو استشارة",
  },
  {
    step: "04",
    title: "احسم القرار",
    subtitle: "تقديم أو استبعاد",
  },
];

const lifecycleStages = [
  {
    step: "01",
    title: "الدخول وتحديد نقطة البداية",
    description: "المستثمر لا يبدأ من قوائم معقدة. يبدأ بسؤال واحد فقط: هل أملك فرصة جاهزة أريد فحصها، أم أملك فكرة وأحتاج توجيهاً؟",
    actions: ["الدخول من الصفحة الرئيسية", "اختيار: فرص جاهزة أو استشارة مشروع أو تحليل حي", "الانتقال إلى المسار الأقصر بدل الدوران بين الصفحات"],
    icon: <UserRoundSearch size={20} color="#0A2342" />,
  },
  {
    step: "02",
    title: "قراءة سريعة قبل أي التزام",
    description: "قبل أن يضيع وقته في كراسة طويلة أو متطلبات معقدة، يرى ملخصاً بصرياً واضحاً: مناسبة الفرصة، مستوى المخاطر، رأس المال المتوقع، والعقبات المحتملة.",
    actions: ["قراءة الملخص التنفيذي", "فهم الجاهزية والمخاطر", "استبعاد الفرص غير المناسبة مبكراً"],
    icon: <CircleGauge size={20} color="#0A2342" />,
  },
  {
    step: "03",
    title: "تعميق القرار عند الحاجة",
    description: "إذا بدت الفرصة واعدة، يتوسع المستثمر تدريجياً فقط في المعلومات التي يحتاجها: تحليل حي، مقارنة بدائل، كراسة مبسطة، أو استشارة بشرية.",
    actions: ["تحليل الحي والمنافسة", "مقارنة الأحياء والأنشطة", "طلب استشارة أو مراجعة بشرية"],
    icon: <FileSearch size={20} color="#0A2342" />,
  },
  {
    step: "04",
    title: "استكمال الجاهزية والتنفيذ",
    description: "إذا احتاج شريكاً أو ملفاً أوضح، ينتقل إلى بوابة الشراكات أو لوحة المتابعة، ثم يخرج إلى الإجراء الرسمي وهو يعرف لماذا يدخل وماذا يتوقع.",
    actions: ["تنظيم الشراكة إن لزم", "متابعة الطلبات والتنبيهات", "الانتقال إلى فرص أو اتخاذ قرار واعٍ بعدم الدخول"],
    icon: <LayoutDashboard size={20} color="#0A2342" />,
  },
];

const scenarios = [
  {
    title: "مستثمر لديه فرصة جاهزة",
    summary: "يريد حكماً سريعاً: هل هذه الفرصة تستحق أن يكمل أم لا؟",
    path: ["يفتح الفرصة أو الكراسة", "يرى الملخص التنفيذي السريع", "يفهم الربحية والمخاطر والعقبات", "ينتقل إلى فرص إذا اقتنع"],
    outcome: "قرار سريع وواضح دون قراءة مرهقة من البداية.",
    icon: <BriefcaseBusiness size={20} color="#C9A84C" />,
  },
  {
    title: "مستثمر لديه فكرة وليس لديه موقع",
    summary: "لا يبحث عن فرصة منشورة فقط، بل عن أفضل مكان ونشاط لتنفيذ فكرته.",
    path: ["يدخل إلى الاستشارة الذكية", "يحدد النشاط والميزانية", "يفتح تحليل الحي", "يقارن البدائل ثم يقرر"],
    outcome: "يصل إلى قرار مبني على الحي والطلب لا على التخمين.",
    icon: <MapPinned size={20} color="#C9A84C" />,
  },
  {
    title: "مستثمر متردد ويخاف من التعقيد",
    summary: "يريد خطوات قصيرة وواضحة لا تجبره على الغوص في إجراءات كثيرة منذ البداية.",
    path: ["يبدأ من صفحة رحلة المستثمر", "يفهم أين يبدأ وأين ينتهي", "يأخذ قراءة أولية فقط", "يقرر إما التعمق أو التوقف"],
    outcome: "يشعر أن المنصة تبسط القرار بدلاً من أن تربكه.",
    icon: <ShieldCheck size={20} color="#C9A84C" />,
  },
  {
    title: "مستثمر يحتاج شريكاً أو دعماً تنفيذياً",
    summary: "يعرف أن الفرصة مناسبة لكنه لا يريد دخولها منفرداً أو بلا غطاء تشغيلي.",
    path: ["يثبت جدوى الفرصة أولاً", "ينتقل إلى الشراكات", "ينظم المساهمة والدور", "يكمل الطلب بعد وضوح الهيكل"],
    outcome: "يحوّل الفكرة من قرار فردي متردد إلى مشروع قابل للتنفيذ.",
    icon: <Handshake size={20} color="#C9A84C" />,
  },
];

const outcomes = [
  {
    title: "الانتقال للتقديم الرسمي",
    description: "هذه هي النهاية الطبيعية عندما تكون المؤشرات والجاهزية متوافقة مع هدف المستثمر.",
  },
  {
    title: "طلب استشارة أو شراكة قبل التقديم",
    description: "إذا كانت الفرصة جيدة لكن تحتاج دعماً أو تحققاً إضافياً، تبقى داخل المنصة خطوة واحدة فقط ثم تكمل.",
  },
  {
    title: "رفض واعٍ للفرصة",
    description: "وهذا نجاح أيضاً، لأن المنصة منعت قراراً متسرعاً قبل أن يتحول إلى خسارة وقت أو مال.",
  },
];

export default function InvestorJourneyPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
      <section className="px-4 py-14" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div className="text-right text-white">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
              <Sparkles size={16} />
              رحلة المستثمر
            </span>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">رحلة واضحة من الدخول حتى القرار</h1>
            <p className="text-white/75 leading-8 max-w-4xl mr-0 ml-auto">
              هذه الصفحة تجيب على السؤال الذي يخاف منه أي مستثمر: من أين أبدأ، ما الذي سأراه، متى أتعّمق، ومتى أخرج إلى القرار أو التقديم؟
              المنصة هنا ليست متاهة خدمات، بل مسار قرار مبني على خطوات قصيرة ومفهومة.
            </p>
          </div>

          <div className="glass-panel rounded-[1.6rem] p-6 text-right text-white">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "بداية الرحلة", value: "اختيار مسار واحد" },
                { label: "أول قيمة تظهر", value: "قراءة سريعة للقرار" },
                { label: "نهاية الرحلة", value: "تقديم أو استبعاد واعٍ" },
                { label: "الهدف", value: "تبسيط القرار لا تعقيده" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-lg font-black leading-7">{item.value}</p>
                  <p className="text-sm text-white/65 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 md:p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] overflow-hidden">
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 flex-wrap mb-6">
              <Link href="/opportunities" className="btn-outline text-sm px-5 py-3 w-full md:w-auto justify-center">
                ابدأ من الفرص
                <ArrowLeft size={16} />
              </Link>
              <div className="text-right">
                <h2 className="text-2xl font-black text-navy">المخطط البصري للرحلة</h2>
                <p className="text-sm text-gray-500 mt-2">خط واحد واضح يختصر للمستثمر كيف يدخل، كيف يفهم، وكيف يخرج بقرار.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:hidden">
              {journeyRail.map((item, index) => (
                <div key={item.step} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-right relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black text-white shrink-0" style={{ backgroundColor: "#0A2342" }}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-navy mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-7">{item.subtitle}</p>
                    </div>
                  </div>
                  {index < journeyRail.length - 1 ? <div className="w-[2px] h-6 mx-auto mt-4" style={{ background: "linear-gradient(180deg, #C9A84C 0%, #0A2342 100%)" }} /> : null}
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto pb-2">
              <div className="min-w-[920px] flex items-center gap-0">
                {journeyRail.map((item, index) => (
                  <div key={item.step} className="flex items-center flex-1 min-w-[220px]">
                    <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-right relative">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 text-sm font-black text-white" style={{ backgroundColor: "#0A2342" }}>
                        {item.step}
                      </div>
                      <h3 className="text-lg font-black text-navy mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-7">{item.subtitle}</p>
                    </div>
                    {index < journeyRail.length - 1 ? (
                      <div className="w-16 flex items-center justify-center shrink-0">
                        <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, #C9A84C 0%, #0A2342 100%)" }} />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
            <h2 className="text-2xl font-black text-navy mb-3">القاعدة التي يجب أن يفهمها المستثمر من أول دقيقة</h2>
            <p className="text-sm text-gray-600 leading-8">
              المنصة لا تطلب من المستثمر أن يتعامل مع تعقيد منصة فرص من البداية. هي تفصل بين مرحلتين: 
              أولاً فهم القرار، ثم ثانياً الانتقال إلى الإجراء الرسمي. هذا الفصل هو الذي يجعل التجربة أخف وأوضح وأكثر احترافية.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {lifecycleStages.map((stage) => (
              <div key={stage.step} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#EEF4FF" }}>
                    {stage.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-1" style={{ color: "#C9A84C" }}>المرحلة {stage.step}</p>
                    <h3 className="text-xl font-black text-navy">{stage.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-8 mb-4">{stage.description}</p>
                <div className="space-y-3">
                  {stage.actions.map((action) => (
                    <div key={action} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between gap-3">
                      <CheckCircle2 size={16} color="#16A34A" />
                      <span className="text-sm font-semibold text-navy">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 md:p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 flex-wrap mb-5">
              <Link href="/consulting/request" className="btn-primary text-sm px-5 py-3 w-full md:w-auto justify-center">
                ابدأ من المسار الاستشاري
                <ArrowLeft size={16} />
              </Link>
              <div>
                <h2 className="text-2xl font-black text-navy">السيناريوهات الواقعية داخل المنصة</h2>
                <p className="text-sm text-gray-500 mt-2">ليست رحلة واحدة فقط، بل عدة بدايات تنتهي كلها إلى قرار واضح.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {scenarios.map((scenario) => (
                <div key={scenario.title} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#0A2342" }}>
                      {scenario.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-navy">{scenario.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 leading-7">{scenario.summary}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {scenario.path.map((step) => (
                      <div key={step} className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-navy font-semibold">
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl px-4 py-4 text-sm leading-7" style={{ backgroundColor: "#FFF7E8", color: "#8A5B00" }}>
                    <span className="font-black">النتيجة: </span>
                    {scenario.outcome}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
            <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <h2 className="text-2xl font-black text-navy mb-4">الإجراءات التي يمر بها المستثمر فعلياً</h2>
              <div className="space-y-3">
                {[
                  "فتح الصفحة الرئيسية وتحديد المسار المناسب.",
                  "فحص فرصة أو حي أو مشروع عبر قراءة سريعة أولية.",
                  "التوسع فقط في المعلومات الضرورية: كراسة، تحليل حي، استشارة، أو شراكة.",
                  "تجهيز الملف أو تثبيت القرار النهائي.",
                  "الانتقال إلى فرص أو متابعة الملف من لوحة المستثمر.",
                ].map((item, index) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between gap-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: "#0A2342" }}>{index + 1}</span>
                    <span className="text-sm font-semibold text-navy">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] p-6 text-white" style={{ background: "linear-gradient(135deg, #0A2342 0%, #143A6B 100%)" }}>
              <div className="flex items-center gap-2 justify-end mb-4">
                <FileCheck2 size={18} color="#F5D88E" />
                <h2 className="text-2xl font-black">كيف تنتهي الرحلة؟</h2>
              </div>
              <div className="space-y-4 mb-6">
                {outcomes.map((outcome) => (
                  <div key={outcome.title} className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                    <p className="font-black mb-2">{outcome.title}</p>
                    <p className="text-sm text-white/75 leading-7">{outcome.description}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl px-4 py-4 text-sm leading-7" style={{ backgroundColor: "rgba(201,168,76,0.14)", color: "#F5D88E" }}>
                هذه هي الرسالة الأهم في المقابلة: المنصة لا تزيد التعقيد على المستثمر، بل تمتص تعقيد القرار ثم تسلّمه مساراً واضحاً وقصيراً نحو الخطوة التالية.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}