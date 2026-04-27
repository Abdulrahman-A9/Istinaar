"use client";
import Link from "next/link";
import { ArrowLeft, Brain, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { recommendOpportunities } from "@/lib/opportunities";

export default function AdvisorPage() {
  const [budget, setBudget] = useState(400000);
  const [experience, setExperience] = useState<"مبتدئ" | "متوسط" | "متقدم">("متوسط");
  const [businessType, setBusinessType] = useState("كافيه");
  const [preferredNeighborhood, setPreferredNeighborhood] = useState("حي النقرة");

  const recommendations = useMemo(
    () => recommendOpportunities({ budget, experience, businessType, preferredNeighborhood }),
    [budget, experience, businessType, preferredNeighborhood]
  );

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="px-4 py-14" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
          <div className="glass-panel rounded-[1.6rem] p-6 text-right text-white">
            <p className="text-sm text-white/60 mb-3">منطق التوصية</p>
            <div className="space-y-3 text-sm text-white/75">
              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>يوازن بين رأس المال، المخاطر، ونوع النشاط.</div>
              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>يعاقب الفرص الأعلى خطراً للمستخدم المبتدئ.</div>
              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>يرفع أولوية الأحياء المتوافقة مع تفضيلك ونوع مشروعك.</div>
            </div>
          </div>
          <div className="text-right text-white">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#F5D88E" }}>
              <Sparkles size={16} />
              المستشار الذكي المحاكى
            </span>
            <h1 className="text-4xl font-black leading-tight mb-4">أفضل 3 فرص بناءً على ملفك الاستثماري</h1>
            <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto">أدخل نوع النشاط وخبرتك ورأس المال، وسيقترح لك المستشار الذكي فرصاً متوازنة مع تفسير واضح بالعربية.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
          <div className="card p-6 space-y-5 text-right">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">رأس المال</label>
              <input type="number" value={budget} onChange={(event) => setBudget(Number(event.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">الخبرة</label>
              <select value={experience} onChange={(event) => setExperience(event.target.value as typeof experience)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                <option value="مبتدئ">مبتدئ</option>
                <option value="متوسط">متوسط</option>
                <option value="متقدم">متقدم</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">نوع النشاط</label>
              <input value={businessType} onChange={(event) => setBusinessType(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">الحي المفضل</label>
              <input value={preferredNeighborhood} onChange={(event) => setPreferredNeighborhood(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600 leading-7">
              هذه التوصيات محاكاة قرار أولي. إذا وجدت فرصة مناسبة، انتقل لتفاصيلها أو أنشئ طلب استشاري يقرأ موقعك الفعلي بدقة أكبر.
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((item, index) => (
              <div key={item.opportunity.id} className="card p-6 text-right">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black" style={{ backgroundColor: "#0A2342" }}>{index + 1}</div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">درجة التوصية {item.score}%</p>
                    <h2 className="text-2xl font-black text-navy">{item.opportunity.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{item.opportunity.neighborhood} • {item.opportunity.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-8 mb-4">{item.opportunity.summary}</p>
                <div className="space-y-2 mb-5">
                  {item.reasoning.map((reason) => (
                    <div key={reason} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">{reason}</div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 justify-end">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: item.risk.bgColor, color: item.risk.color }}>{item.risk.label}</span>
                  <Link href={`/opportunities/${item.opportunity.slug}`} className="btn-primary text-sm px-5 py-3">
                    افتح الفرصة
                    <ArrowLeft size={16} />
                  </Link>
                </div>
              </div>
            ))}
            <div className="rounded-[1.5rem] p-6 text-right text-white" style={{ background: "linear-gradient(135deg, #0A2342 0%, #143A6B 100%)" }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link href="/consulting/request" className="btn-gold text-sm px-5 py-3">تحويلها إلى استشارة مخصصة</Link>
                <div>
                  <p className="text-xl font-black mb-2">الخطوة الأذكى بعد التوصية</p>
                  <p className="text-sm text-white/75 leading-7">إذا أردت نفس المنطق لكن على موقع محدد وتمويل فعلي وشركاء، افتح طلب استشاري مشترك.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}