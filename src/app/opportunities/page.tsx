"use client";
import Link from "next/link";
import { ArrowLeft, BookOpenText, Bookmark, BookmarkCheck, Building2, Filter, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { opportunities } from "@/data/opportunities";
import { getOpportunityBookletById } from "@/data/opportunityBooklets";
import { getOpportunityCompositeScore, getOpportunityRisk } from "@/lib/opportunities";
import { useAppStore } from "@/store/appStore";

const categories = ["الكل", ...Array.from(new Set(opportunities.map((item) => item.category)))];
const neighborhoods = ["الكل", ...Array.from(new Set(opportunities.map((item) => item.neighborhood)))];

export default function OpportunitiesPage() {
  const [category, setCategory] = useState("الكل");
  const [neighborhood, setNeighborhood] = useState("الكل");
  const saveOpportunity = useAppStore((state) => state.saveOpportunity);
  const removeOpportunity = useAppStore((state) => state.removeOpportunity);
  const isOpportunitySaved = useAppStore((state) => state.isOpportunitySaved);

  const filtered = useMemo(() => {
    return opportunities.filter((item) => {
      const categoryOk = category === "الكل" || item.category === category;
      const neighborhoodOk = neighborhood === "الكل" || item.neighborhood === neighborhood;
      return categoryOk && neighborhoodOk;
    });
  }, [category, neighborhood]);

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="px-4 py-10 md:py-14" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div className="text-right text-white">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#F5D88E" }}>
              <Sparkles size={16} />
              سوق الفرص الاستثمارية الذكي
            </span>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
              فرص جاهزة للفهم
              <span style={{ color: "#C9A84C" }}> قبل التقديم الرسمي</span>
            </h1>
            <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto">
              هذه الصفحة تجمع فرصاً استثمارية واقعية في أحياء حائل، مع مؤشرات عائد ومخاطر وجدوى، ثم تربط المستثمر بمنصة فرص بعد أن يفهم القرار بوضوح.
            </p>
          </div>
          <div className="glass-panel rounded-[1.6rem] p-5 text-right text-white">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "إجمالي الفرص", value: opportunities.length },
                { label: "فرص مميزة", value: opportunities.filter((item) => item.featured).length },
                { label: "أحياء مغطاة", value: neighborhoods.length - 1 },
                { label: "متوسط ROI", value: `${Math.round(opportunities.reduce((sum, item) => sum + item.roi, 0) / opportunities.length)}%` },
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

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="card p-4 md:p-5 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
            <div className="text-right">
              <label className="block text-sm font-semibold text-gray-600 mb-2">تصنيف الفرصة</label>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="text-right">
              <label className="block text-sm font-semibold text-gray-600 mb-2">الحي</label>
              <select value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                {neighborhoods.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-center h-12 rounded-xl px-4 w-full md:w-auto" style={{ backgroundColor: "#F6F8FB", color: "#0A2342" }}>
              <Filter size={16} className="ml-2" />
              <span className="text-sm font-bold">{filtered.length} فرصة</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filtered.map((opportunity) => {
              const risk = getOpportunityRisk(opportunity);
              const score = getOpportunityCompositeScore(opportunity);
              const saved = isOpportunitySaved(opportunity.id);
              const booklet = getOpportunityBookletById(opportunity.id);

              return (
                <div key={opportunity.id} className="card p-5 md:p-6 text-right">
                  <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-4 mb-4">
                    <button
                      onClick={() => saved
                        ? removeOpportunity(opportunity.id)
                        : saveOpportunity({
                            id: opportunity.id,
                            title: opportunity.title,
                            neighborhood: opportunity.neighborhood,
                            category: opportunity.category,
                            roi: opportunity.roi,
                            riskLabel: risk.label,
                          })}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                    >
                      {saved ? <BookmarkCheck size={18} color="#0A2342" /> : <Bookmark size={18} />}
                    </button>
                    <div className="w-full sm:w-auto">
                      <div className="flex flex-wrap gap-2 justify-end mb-3">
                        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: risk.bgColor, color: risk.color }}>{risk.label}</span>
                        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "#EEF4FF", color: "#2563EB" }}>{opportunity.category}</span>
                      </div>
                      <h2 className="text-2xl font-black text-navy">{opportunity.title}</h2>
                      <p className="text-sm text-gray-500 mt-2">{opportunity.neighborhood} • {opportunity.businessModel} • {opportunity.areaRange}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-8 mb-5">{opportunity.summary}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {[
                      { label: "ROI", value: `${opportunity.roi}%` },
                      { label: "الاسترداد", value: `${opportunity.paybackMonths} شهر` },
                      { label: "الجدوى", value: `${opportunity.feasibilityScore}%` },
                      { label: "النتيجة المركبة", value: `${score}%` },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-gray-50 p-3 text-right">
                        <p className="font-black text-navy">{item.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end mb-5">
                    {opportunity.marketSignals.slice(0, 3).map((signal) => (
                      <span key={signal} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">{signal}</span>
                    ))}
                  </div>

                  {booklet ? (
                    <div className="rounded-2xl border border-gray-100 p-4 mb-5" style={{ backgroundColor: "#F8FAFD" }}>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-xs font-semibold text-gray-400">{booklet.pageCount} صفحة</span>
                        <div className="flex items-center gap-2">
                          <BookOpenText size={16} color="#C9A84C" />
                          <p className="text-sm font-black text-navy">قارئ الكراسة الذكي</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-7">{booklet.readinessSummary}</p>
                    </div>
                  ) : null}

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-end">
                    <Link href={`/opportunities/${opportunity.slug}`} className="btn-primary text-sm px-5 py-3 w-full sm:w-auto justify-center">
                      افتح تفاصيل الفرصة
                      <ArrowLeft size={16} />
                    </Link>
                    {booklet ? (
                      <Link href={`/opportunities/${opportunity.slug}/booklet`} className="btn-outline text-sm px-5 py-3 w-full sm:w-auto justify-center">اقرأ الكراسة</Link>
                    ) : null}
                    <Link href="/advisor" className="btn-outline text-sm px-5 py-3 w-full sm:w-auto justify-center">اسأل المستشار الذكي</Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-[1.5rem] p-5 md:p-6 text-right text-white" style={{ background: "linear-gradient(135deg, #0A2342 0%, #143A6B 100%)" }}>
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 flex-wrap">
              <Link href="/coming-soon" className="btn-gold text-sm px-5 py-3 w-full md:w-auto justify-center">
                فتح تحليل المواقع
                <ArrowLeft size={16} />
              </Link>
              <div>
                <p className="text-2xl font-black mb-2">الفرص ليست بديلاً عن منصة فرص</p>
                <p className="text-white/75 text-sm leading-7 max-w-3xl">هذه الطبقة تساعد على الفهم والمقارنة والتصفية فقط، ثم تنتقل بعد ذلك إلى مسار التقديم الرسمي.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}