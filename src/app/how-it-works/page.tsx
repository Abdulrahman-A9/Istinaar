"use client";
import Link from "next/link";
import { ArrowLeft, CheckCircle, FileCheck2, SearchCheck, Send, ShieldCheck, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "اكتشف الأرض المناسبة",
    desc: "تصفّح قائمة الأراضي الموسمية المتاحة في مختلف أحياء حائل. يمكنك التصفية حسب نوع النشاط، الموقع، والسعر.",
    action: { label: "استعرض الأراضي", href: "/lands" },
    tips: ["استخدم خيارات التصفية للعثور على الموقع الأنسب", "انتبه لمعلومات المرافق المتاحة", "قارن بين أكثر من موقع قبل الاختيار"],
    icon: <SearchCheck size={20} color="#0A2342" />,
  },
  {
    num: "02",
    title: "حلّل الفرصة الاستثمارية",
    desc: "استخدم أدوات التحليل الذكي في صفحة تفاصيل الأرض لفهم مستوى المخاطرة والجدوى الاقتصادية.",
    action: { label: "حاسبة العائد", href: "/calculator" },
    tips: ["راجع مؤشر الربحية ومؤشر الجدوى", "افهم مستوى المخاطرة وأسبابها", "احسب ROI وفترة الاسترداد"],
    icon: <TrendingUp size={20} color="#0A2342" />,
  },
  {
    num: "03",
    title: "اقرأ الشروط والمتطلبات",
    desc: "راجع ملخص الشروط بلغة بسيطة وتأكد من توفر جميع المستندات المطلوبة قبل التقديم.",
    action: null,
    tips: ["السجل التجاري ساري المفعول", "الهوية الوطنية", "وصف واضح للنشاط", "الميزانية التقديرية للمشروع"],
    icon: <FileCheck2 size={20} color="#0A2342" />,
  },
  {
    num: "04",
    title: "قدّم طلبك عبر منصة فرص",
    desc: "بعد دراسة الفرصة بالكامل، اضغط على زر 'تقديم طلب استئجار' لتُحوَّل مباشرة إلى الفرصة في منصة فرص السعودية.",
    action: { label: "استعرض الأراضي للتقديم", href: "/lands" },
    tips: ["تأكد من صحة جميع البيانات", "ارفع الوثائق المطلوبة بصيغة PDF", "الانتقال لمنصة فرص يتم تلقائياً"],
    icon: <Send size={20} color="#0A2342" />,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
      <section className="px-4 py-14" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div className="text-right text-white">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
              <ShieldCheck size={16} />
              مسار قرار قبل التقديم
            </span>
            <h1 className="text-4xl font-black leading-tight mb-4">كيف تعمل المنصة من البداية حتى فرص؟</h1>
            <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto">هذا المسار يوضح ببساطة كيف تنتقل من استكشاف الفرصة إلى فهمها ثم تجهيز ملفك قبل الوصول إلى منصة فرص السعودية للتقديم الرسمي.</p>
          </div>
          <div className="glass-panel rounded-[1.6rem] p-6 text-right text-white">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "اكتشاف وتحليل", value: "مرحلتان" },
                { label: "الانتقال الرسمي", value: "منصة فرص" },
                { label: "درجة الوضوح", value: "تنفيذية" },
                { label: "الملف المطلوب", value: "جاهز" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-2xl font-black">{item.value}</p>
                  <p className="text-sm text-white/65 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(10,35,66,0.06)] flex items-start gap-4 text-right">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="font-black text-base mb-2" style={{ color: "#0A2342" }}>هذه المنصة تسبق الإجراء الرسمي ولا تستبدله</h3>
            <p className="text-gray-600 text-sm leading-8">دور المنصة هو تبسيط القرار ورفع الجاهزية: فهم الشروط، تحليل الجدوى، وتجهيز الملف قبل الدخول إلى المسار الرسمي عبر منصة فرص السعودية.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {steps.map((step) => (
          <div key={step.num} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(10,35,66,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-5 items-start">
              <div className="flex items-center gap-4 justify-end lg:justify-start">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#EEF4FF" }}>
                  {step.icon}
                </div>
                <div className="text-5xl font-black leading-none" style={{ color: "rgba(201,168,76,0.45)" }}>{step.num}</div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-black mb-2" style={{ color: "#0A2342" }}>{step.title}</h2>
                <p className="text-gray-600 leading-8 mb-5">{step.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                  {step.tips.map((tip) => (
                    <div key={tip} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-gray-600 flex items-center gap-2 justify-end border border-slate-200">
                      <span>{tip}</span>
                      <CheckCircle size={14} className="text-green-600 shrink-0" />
                    </div>
                  ))}
                </div>
                {step.action ? (
                  <Link href={step.action.href} className="btn-primary text-sm px-5 py-3">
                    {step.action.label}
                    <ArrowLeft size={14} />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
