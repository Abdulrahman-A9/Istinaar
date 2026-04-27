import Link from "next/link";
import { ArrowLeft, Building2, FileCheck2, MapPinned, ShieldCheck, Sparkles } from "lucide-react";

export default function ConsultingPage() {
  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "#F8F9FB" }}>
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="rounded-[2rem] p-8 text-white" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
            <Sparkles size={16} />
            مسار الاستشارات الذكية للمشاريع التجارية
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div className="text-right">
              <h1 className="text-4xl font-black leading-tight mb-4">
                حلّل مشروعك حتى لو لم يكن مرتبطًا
                <span style={{ color: "#C9A84C" }}> بمنصة فرص</span>
              </h1>
              <p className="text-white/75 leading-8 mb-8 max-w-3xl mr-0 ml-auto">
                هذا المسار مخصص للمستثمر الذي يريد دراسة مشروعه الخاص مثل الكوفي أو المطعم أو المتجر. تدخل الموقع والنشاط والميزانية، ونقدّم لك تقرير قرار أولي مع خيار مراجعة بشرية من الفريق.
              </p>
              <div className="flex flex-wrap gap-3 justify-end">
                <Link href="/consulting/request" className="btn-gold">
                  ابدأ طلب استشاري
                  <ArrowLeft size={16} />
                </Link>
                <Link href="/lands" className="btn-outline">استمرار مسار الأراضي الموسمية</Link>
              </div>
            </div>
            <div className="glass-panel rounded-[1.5rem] p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                {[
                  { title: "إدخال الموقع", desc: "تحديد الحي والعنوان والوصف التشغيلي للموقع." },
                  { title: "التحليل المالي", desc: "رأس المال، التأسيس، التشغيل، الإيجار، والاسترداد." },
                  { title: "المخاطر والملاءمة", desc: "تشبع، منافسة، ملاءمة النشاط، وتقييم مبدئي للقرار." },
                  { title: "مراجعة بشرية", desc: "تصعيد اختياري للفريق لإضافة قراءة أكثر عمقاً." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                    <p className="font-black text-base text-white mb-2">{item.title}</p>
                    <p className="text-sm text-white/70 leading-7">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "طلب استشاري", icon: <MapPinned size={20} color="#0A2342" />, desc: "إدخال كامل للمشروع والموقع والميزانية" },
            { title: "تقرير أولي", icon: <FileCheck2 size={20} color="#0A2342" />, desc: "نتيجة آلية فورية تقيس الجدوى والمخاطر" },
            { title: "توصية قرار", icon: <ShieldCheck size={20} color="#0A2342" />, desc: "استمرار، تعديل، أو مقارنة موقع بديل" },
            { title: "تكامل مع الملف الاستثماري", icon: <Building2 size={20} color="#0A2342" />, desc: "ضمن نفس الحساب الذي يتابع الأراضي الموسمية" },
          ].map((item) => (
            <div key={item.title} className="soft-card p-5 text-right">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(10,35,66,0.08)" }}>
                {item.icon}
              </div>
              <p className="font-black text-base text-navy mb-2">{item.title}</p>
              <p className="text-sm text-gray-500 leading-7">{item.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}