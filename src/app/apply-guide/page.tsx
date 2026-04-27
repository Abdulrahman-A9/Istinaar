import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";

const checklist = [
  "افهم ملخص الفرصة وتبسيط الشروط قبل أي خطوة رسمية.",
  "راجع ROI والمخاطر وفترة الاسترداد مقارنة بميزانيتك الحقيقية.",
  "تأكد من جاهزية الشريك أو الفريق التشغيلي إذا كان المشروع مشتركاً.",
  "أكمل بيانات التقديم الرسمية عبر منصة فرص فقط.",
];

export default function ApplyGuidePage() {
  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="px-4 py-14" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-6xl mx-auto text-right text-white">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
            <Sparkles size={16} />
            دليل التقديم الذكي
          </span>
          <h1 className="text-4xl font-black leading-tight mb-4">من التحليل إلى التقديم الرسمي بخطوات واضحة</h1>
          <p className="text-white/75 leading-8 max-w-4xl mr-0 ml-auto">هذا الدليل لا يستبدل منصة فرص، لكنه يضمن أن المستثمر يصل إلى مرحلة التقديم بعد أن يفهم الشروط والجدوى والمخاطر وما يجب تحضيره.</p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "اكتشف", desc: "اختر فرصة أو أرضاً مناسبة" },
              { title: "حلّل", desc: "راجع المؤشرات والمخاطر" },
              { title: "جهّز", desc: "استكمل الملف والوثائق" },
              { title: "قدّم", desc: "انتقل إلى منصة فرص" },
            ].map((item) => (
              <div key={item.title} className="soft-card p-5 text-right">
                <p className="text-2xl font-black text-navy mb-2">{item.title}</p>
                <p className="text-sm text-gray-500 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">Checklist قبل التقديم</h2>
              <div className="space-y-4">
                {checklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 justify-end rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    <span>{item}</span>
                    <CheckCircle2 size={16} color="#16A34A" className="mt-1 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">ما الذي تدعمه المنصة هنا؟</h2>
              <div className="space-y-4 mb-6">
                {[
                  { icon: <FileCheck2 size={18} color="#0A2342" />, text: "تبسيط الالتزامات والتكاليف والمخاطر إلى نقاط مفهومة." },
                  { icon: <ShieldCheck size={18} color="#0A2342" />, text: "إظهار محرك مخاطر واضح بالعربية قبل التقديم." },
                  { icon: <Sparkles size={18} color="#0A2342" />, text: "توصيات استشارية أو شراكات قبل تثبيت القرار." },
                ].map((item) => (
                  <div key={item.text} className="rounded-xl bg-gray-50 px-4 py-3 flex items-start justify-between gap-3 text-sm text-gray-600">
                    <span>{item.text}</span>
                    {item.icon}
                  </div>
                ))}
              </div>
              <div className="rounded-[1.4rem] p-5 text-white" style={{ background: "linear-gradient(135deg, #0A2342 0%, #143A6B 100%)" }}>
                <p className="font-black mb-2">المسار الرسمي النهائي</p>
                <p className="text-sm text-white/75 leading-7 mb-4">بعد اكتمال القراءة والتحضير، تنتقل الجهة أو المستثمر إلى منصة فرص لتنفيذ الإجراء الرسمي وفق المسار المعتمد.</p>
                <div className="flex flex-wrap gap-3 justify-end">
                  <Link href="/opportunities" className="btn-gold text-sm px-5 py-3">ابدأ من الفرص</Link>
                  <Link href="/consulting/request" className="btn-outline text-sm px-5 py-3">أو اطلب استشارة</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}