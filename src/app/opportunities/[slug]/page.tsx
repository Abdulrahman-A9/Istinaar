"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Bookmark, BookmarkCheck, BookOpenText, CheckCircle2, ShieldAlert, Sparkles, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { getOpportunityBySlug } from "@/data/opportunities";
import { getOpportunityBookletById } from "@/data/opportunityBooklets";
import { getNeighborhoodSlugByName } from "@/data/neighborhoodTables";
import { calculateInvestment } from "@/lib/analysis";
import { getOpportunityRisk } from "@/lib/opportunities";
import { useAppStore } from "@/store/appStore";

export default function OpportunityDetailsPage() {
  const params = useParams<{ slug: string }>();
  const opportunity = getOpportunityBySlug(params.slug);
  const saveOpportunity = useAppStore((state) => state.saveOpportunity);
  const removeOpportunity = useAppStore((state) => state.removeOpportunity);
  const isOpportunitySaved = useAppStore((state) => state.isOpportunitySaved);
  const [capital, setCapital] = useState(350000);
  const [monthlyCosts, setMonthlyCosts] = useState(30000);

  const investment = useMemo(() => calculateInvestment(capital, monthlyCosts, 6, 1.08), [capital, monthlyCosts]);

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F8F9FB" }}>
        <div className="card p-8 text-center max-w-lg">
          <p className="text-2xl font-black text-navy mb-3">الفرصة غير موجودة</p>
          <Link href="/opportunities" className="btn-primary">العودة إلى قائمة الفرص</Link>
        </div>
      </div>
    );
  }

  const risk = getOpportunityRisk(opportunity);
  const saved = isOpportunitySaved(opportunity.id);
  const booklet = getOpportunityBookletById(opportunity.id);
  const neighborhoodSlug = getNeighborhoodSlugByName(opportunity.neighborhood);

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="px-4 py-12" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div className="text-right text-white">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
              <Sparkles size={16} />
              ملف فرصة استثمارية ذكي
            </span>
            <h1 className="text-4xl font-black leading-tight mb-4">{opportunity.title}</h1>
            <p className="text-white/75 leading-8 mb-6 max-w-4xl mr-0 ml-auto">{opportunity.officialSummary}</p>
            <div className="flex flex-wrap gap-3 justify-end">
              <a href={opportunity.forasUrl} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm px-6 py-3">
                التقديم عبر فرص
                <ArrowLeft size={16} />
              </a>
              <Link href="/apply-guide" className="btn-outline text-sm px-6 py-3">افتح دليل التقديم</Link>
              {neighborhoodSlug ? (
                <Link href={`/location-analysis/${neighborhoodSlug}`} className="btn-outline text-sm px-6 py-3">حلّل الحي على الخريطة</Link>
              ) : null}
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
                className="btn-outline text-sm px-6 py-3"
              >
                {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                {saved ? "محفوظة" : "احفظ الفرصة"}
              </button>
            </div>
          </div>
          <div className="glass-panel rounded-[1.6rem] p-6 text-right text-white">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "ROI", value: `${opportunity.roi}%` },
                { label: "فترة الاسترداد", value: `${opportunity.paybackMonths} شهر` },
                { label: "الربحية", value: `${opportunity.profitabilityScore}%` },
                { label: "الجدوى", value: `${opportunity.feasibilityScore}%` },
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
          {booklet ? (
            <div className="card p-6 text-right">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-wrap gap-3">
                  <Link href={`/opportunities/${opportunity.slug}/booklet`} className="btn-primary text-sm px-5 py-3">
                    افتح قارئ الكراسة الذكي
                    <ArrowLeft size={16} />
                  </Link>
                  {neighborhoodSlug ? (
                    <Link href={`/location-analysis/${neighborhoodSlug}`} className="btn-outline text-sm px-5 py-3">شاهد منافسي الحي</Link>
                  ) : null}
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <BookOpenText size={18} color="#C9A84C" />
                    <p className="text-xl font-black text-navy">قراءة رسمية للكراسة قبل التقديم</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-7 max-w-3xl mr-0 ml-auto">
                    {booklet.pageCount} صفحة تم تفكيكها إلى محاور تنفيذية واضحة مع تنبيهات حرجة، متطلبات عملية، وربط مرجعي يحافظ على مصداقية الكراسة الأصلية.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 xl:grid-cols-[1.08fr_0.92fr] gap-6">
            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">التحليل الذكي والمخاطر</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {[
                  { label: "الطلب السوقي", value: `${opportunity.marketDemand}%` },
                  { label: "كثافة المنافسة", value: `${opportunity.competitionDensity}%` },
                  { label: "درجة التشبع", value: `${opportunity.saturation}%` },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xl font-black text-navy">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border p-5 mb-5" style={{ backgroundColor: risk.bgColor, borderColor: `${risk.color}25` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: risk.color, color: "white" }}>{risk.label}</span>
                  <p className="font-black" style={{ color: risk.color }}>محرك المخاطر المتقدم</p>
                </div>
                <p className="text-sm leading-8" style={{ color: risk.color }}>{risk.explanation}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="font-black text-navy mb-3">أسباب القوة</p>
                  <div className="space-y-3">
                    {opportunity.strengths.map((item) => (
                      <div key={item} className="flex items-start gap-2 justify-end text-sm text-gray-600">
                        <span>{item}</span>
                        <CheckCircle2 size={16} color="#16A34A" className="mt-1 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="font-black text-navy mb-3">عناصر الخطر</p>
                  <div className="space-y-3">
                    {opportunity.riskFactors.map((item) => (
                      <div key={item} className="flex items-start gap-2 justify-end text-sm text-gray-600">
                        <span>{item}</span>
                        <ShieldAlert size={16} color="#D97706" className="mt-1 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">تبسيط الشروط</h2>
              <div className="space-y-4 mb-6">
                {opportunity.simplifiedTerms.map((term) => (
                  <div key={term.label} className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm font-black text-navy mb-1">{term.label}</p>
                    <p className="text-sm text-gray-600 leading-7">{term.value}</p>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-black text-navy mb-3">Checklist قبل التقديم</h3>
              <div className="space-y-3">
                {opportunity.applicationChecklist.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-600">{item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.98fr_1.02fr] gap-6">
            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">حاسبة استثمار مباشرة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">رأس المال</label>
                  <input type="number" value={capital} onChange={(event) => setCapital(Number(event.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">التكلفة الشهرية</label>
                  <input type="number" value={monthlyCosts} onChange={(event) => setMonthlyCosts(Number(event.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {[
                  { label: "صافي الربح", value: `${investment.netProfit.toLocaleString()} ريال` },
                  { label: "ROI", value: `${investment.roi}%` },
                  { label: "الاسترداد", value: `${investment.paybackMonths} شهر` },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                    <p className="text-lg font-black text-navy">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.values(opportunity.scenarios).map((scenario) => (
                  <div key={scenario.label} className="rounded-xl border border-gray-100 p-4 bg-white">
                    <p className="font-black text-navy mb-2">{scenario.label}</p>
                    <p className="text-sm text-gray-600">إيراد: {scenario.monthlyRevenue.toLocaleString()} ريال</p>
                    <p className="text-sm text-gray-600">ربح: {scenario.monthlyProfit.toLocaleString()} ريال</p>
                    <p className="text-xs text-gray-400 mt-2 leading-6">{scenario.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">التقييمات والانطباعات</h2>
              <div className="space-y-4 mb-6">
                {opportunity.reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={`${review.id}-${index}`} size={14} fill={index < review.rating ? "#C9A84C" : "none"} stroke={index < review.rating ? "#C9A84C" : "#CBD5E1"} />
                        ))}
                      </div>
                      <div>
                        <p className="font-black text-navy">{review.author}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-navy mb-1">{review.title}</p>
                    <p className="text-sm text-gray-600 leading-7">{review.comment}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #0A2342 0%, #143A6B 100%)" }}>
                <p className="font-black mb-2">الخطوة التالية</p>
                <p className="text-sm text-white/75 leading-7 mb-4">إذا بدت الفرصة مناسبة، انتقل إلى دليل التقديم ثم إلى منصة فرص. وإذا احتجت قراءة أدق، افتح طلب استشاري يراجع الفرضيات نفسها مع موقعك الفعلي.</p>
                <div className="flex flex-wrap gap-3 justify-end">
                  <Link href="/consulting/request" className="btn-gold text-sm px-5 py-3">اطلب استشارة</Link>
                  <a href={opportunity.forasUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm px-5 py-3">اذهب إلى فرص</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}