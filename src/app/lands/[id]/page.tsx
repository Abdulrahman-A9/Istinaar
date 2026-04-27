"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { MapPin, ArrowLeft, Bookmark, BookmarkCheck, CalendarDays, CheckCircle, Landmark, MapPinned, MessageSquareMore, Ruler, ShieldCheck, Star, Wallet, AlertTriangle } from "lucide-react";
import lands from "@/data/lands";
import { calculateRisk, calculateInvestment, activityMultipliers } from "@/lib/analysis";
import { useAppStore } from "@/store/appStore";
import { getLandActivityIcon, getLandPrimaryIcon } from "@/lib/landVisuals";

export default function LandDetailPage() {
  const { id } = useParams<{ id: string }>();
  const land = lands.find((l) => l.id === id);
  const { saveLand, removeLand, isLandSaved } = useAppStore();
  const [capital, setCapital] = useState(50000);
  const [monthlyCosts, setMonthlyCosts] = useState(8000);
  const [seasonMonths, setSeasonMonths] = useState(3);
  const [calcDone, setCalcDone] = useState(false);

  if (!land) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-500">الأرض غير موجودة</p>
          <Link href="/lands" className="mt-4 btn-primary inline-flex">العودة للأراضي</Link>
        </div>
      </div>
    );
  }

  const risk = calculateRisk(land.competitionDensity, land.marketDemand, land.costLevel, land.activitySaturation);
  const multiplier = activityMultipliers[land.activities[0]] || 1.0;
  const calcResult = calculateInvestment(capital, monthlyCosts, seasonMonths, multiplier);
  const saved = isLandSaved(land.id);

  const handleSave = () => {
    if (saved) {
      removeLand(land.id);
    } else {
      saveLand({ id: land.id, name: land.name, neighborhood: land.neighborhood, price: land.price, area: land.area });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#0A2342" }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>/</span>
            <Link href="/lands" className="hover:text-white">الأراضي</Link>
            <span>/</span>
            <span style={{ color: "#C9A84C" }}>{land.name}</span>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="badge-available">متاحة</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: "rgba(201,168,76,0.8)" }}>{land.type}</span>
              </div>
              <h1 className="text-3xl font-black text-white mb-2">{land.name}</h1>
              <div className="flex items-center gap-1 text-white/70 text-sm">
                <MapPin size={14} />
                <span>{land.location}</span>
              </div>
            </div>
            <button onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all"
              style={{ borderColor: saved ? "#C9A84C" : "rgba(255,255,255,0.3)", color: saved ? "#C9A84C" : "white", backgroundColor: "transparent" }}>
              {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              {saved ? "محفوظة" : "حفظ الأرض"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image + Map */}
            <div className="card overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative">
                <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center bg-white/8 border border-white/10 text-white opacity-90">
                  {getLandPrimaryIcon(land, 46)}
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: "#C9A84C", color: "#0A2342" }}>{land.season}</div>
              </div>
              <div className="h-48 bg-gray-100 flex items-center justify-center border-t border-gray-100">
                <div className="text-center text-gray-400">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-white border border-slate-200 text-navy">
                    <MapPinned size={26} />
                  </div>
                  <p className="text-sm font-medium">{land.neighborhood} - حائل</p>
                  <p className="text-xs">الخريطة التفاعلية</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="card p-6">
              <h2 className="text-xl font-black mb-4" style={{ color: "#0A2342" }}>عن الموقع</h2>
              <p className="text-gray-600 leading-relaxed">{land.description}</p>
            </div>

            {/* Specs */}
            <div className="card p-6">
              <h2 className="text-xl font-black mb-4" style={{ color: "#0A2342" }}>المواصفات الفنية</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "المساحة الإجمالية", value: `${land.area.toLocaleString()} م²` },
                  { label: "نوع الموقع", value: land.soilType },
                  { label: "فترة الإيجار", value: `${land.seasonMonths || 3} أشهر (موسمي)` },
                  { label: "السعر التقديري", value: `${land.price.toLocaleString()} ريال` },
                  { label: "الموسم الحالي", value: land.season },
                  { label: "حالة التوفر", value: "متاحة للتقديم" },
                ].map((spec, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">{spec.label}</p>
                    <p className="font-bold text-sm" style={{ color: "#0A2342" }}>{spec.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-500 mb-2">المرافق المتاحة:</p>
                <div className="flex flex-wrap gap-2">
                  {land.utilities.map((u, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg border border-gray-200 text-gray-600">
                      <CheckCircle size={12} className="text-green-500" /> {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suitable Activities */}
            <div className="card p-6">
              <h2 className="text-xl font-black mb-4" style={{ color: "#0A2342" }}>الأنشطة المناسبة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {land.activities.map((activity, i) => (
                  <div key={i} className="text-center p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-white border border-slate-200 text-navy">
                      {getLandActivityIcon(activity, 22)}
                    </div>
                    <p className="text-sm font-semibold" style={{ color: "#0A2342" }}>{activity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Analysis */}
            <div className="card p-6">
              <h2 className="text-xl font-black mb-6" style={{ color: "#0A2342" }}>التحليل الذكي للفرصة</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "مؤشر الربحية", value: land.profitabilityScore, desc: "توقعات عوائد مرتفعة مقارنة بالسوق" },
                  { label: "مؤشر الجدوى", value: land.feasibilityScore, desc: "قابلية التنفيذ والتشغيل السريع" },
                ].map((indicator, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.9" fill="none"
                          stroke={indicator.value >= 80 ? "#16a34a" : indicator.value >= 60 ? "#C9A84C" : "#dc2626"}
                          strokeWidth="3"
                          strokeDasharray={`${indicator.value} 100`}
                          strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-black" style={{ color: "#0A2342" }}>{indicator.value}%</span>
                      </div>
                    </div>
                    <p className="font-bold text-sm" style={{ color: "#0A2342" }}>{indicator.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{indicator.desc}</p>
                  </div>
                ))}
              </div>

              {/* Risk Engine */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: risk.bgColor, borderColor: risk.color + "40" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium" style={{ color: risk.color }}>مستوى المخاطرة</span>
                  <span className="px-4 py-1.5 rounded-full font-black text-sm"
                    style={{ backgroundColor: risk.color, color: "white" }}>{risk.label}</span>
                </div>
                <div className="space-y-3 mb-4">
                  {[
                    { label: "كثافة المنافسة", value: land.competitionDensity },
                    { label: "الطلب السوقي", value: land.marketDemand, invert: true },
                    { label: "مستوى التكلفة", value: land.costLevel },
                    { label: "تشبع نوع النشاط", value: land.activitySaturation },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium" style={{ color: risk.color }}>{item.value}%</span>
                        <span className="text-gray-600">{item.label}</span>
                      </div>
                      <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${item.value}%`, backgroundColor: risk.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 text-sm" style={{ color: risk.color }}>
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <p>{risk.explanation}</p>
                </div>
              </div>
            </div>

            {/* Simplified Terms */}
            <div className="card p-6">
              <h2 className="text-xl font-black mb-4" style={{ color: "#0A2342" }}>ملخص الشروط بلغة بسيطة</h2>
              <div className="space-y-3">
                {[
                  { icon: <ShieldCheck size={18} color="#166534" />, label: "الالتزامات الرئيسية", text: "المحافظة على نظافة الموقع والالتزام بساعات التشغيل الرسمية المحددة من الأمانة." },
                  { icon: <Wallet size={18} color="#C2891B" />, label: "التكاليف", text: `إيجار موسمي ${land.price.toLocaleString()} ريال + تأمين مسترد + تكاليف الخدمات اللوجستية التي توفرها الأمانة.` },
                  { icon: <AlertTriangle size={18} color="#B45309" />, label: "المخاطر المتوقعة", text: "تقلبات الطقس الموسمية وتغيرات في حركة الزوار. يُنصح بخطة احتياطية للأيام ذات الطقس السيء." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                    <span className="shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-bold text-sm mb-1" style={{ color: "#0A2342" }}>{item.label}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Calculator */}
            <div className="card p-6">
              <h2 className="text-xl font-black mb-6" style={{ color: "#0A2342" }}>حاسبة العائد الاستثماري</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">رأس المال المتاح (ريال)</label>
                  <input type="number" value={capital} onChange={(e) => setCapital(+e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">التكاليف الشهرية (ريال)</label>
                  <input type="number" value={monthlyCosts} onChange={(e) => setMonthlyCosts(+e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">المدة الموسمية</label>
                  <select value={seasonMonths} onChange={(e) => setSeasonMonths(+e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400">
                    <option value={3}>٣ أشهر</option>
                    <option value={4}>٤ أشهر</option>
                    <option value={6}>٦ أشهر</option>
                  </select>
                </div>
              </div>
              <button onClick={() => setCalcDone(true)} className="btn-gold w-full py-3 text-base mb-6">
                احسب العائد
              </button>

              {calcDone && (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "صافي الربح المتوقع", value: `${calcResult.netProfit.toLocaleString()} ريال`, color: calcResult.netProfit > 0 ? "#16a34a" : "#dc2626" },
                      { label: "نسبة العائد ROI", value: `${calcResult.roi}٪`, color: "#0A2342" },
                      { label: "فترة الاسترداد", value: `${calcResult.paybackMonths} أشهر`, color: "#0A2342" },
                    ].map((result, i) => (
                      <div key={i} className="text-center p-4 rounded-xl bg-gray-50">
                        <p className="text-2xl font-black mb-1" style={{ color: result.color }}>{result.value}</p>
                        <p className="text-xs text-gray-500">{result.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Scenarios */}
                  <h3 className="font-bold text-base mb-3" style={{ color: "#0A2342" }}>سيناريوهات الأداء</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { ...calcResult.scenarios.conservative, color: "#f97316", bg: "#fff7ed" },
                      { ...calcResult.scenarios.average, color: "#2563eb", bg: "#eff6ff" },
                      { ...calcResult.scenarios.optimistic, color: "#16a34a", bg: "#f0fdf4" },
                    ].map((scenario, i) => (
                      <div key={i} className="p-4 rounded-xl text-center" style={{ backgroundColor: scenario.bg }}>
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2"
                          style={{ backgroundColor: scenario.color, color: "white" }}>{scenario.label}</span>
                        <p className="font-black text-lg" style={{ color: scenario.color }}>
                          {scenario.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">إيراد متوقع</p>
                        <p className="text-sm font-bold mt-1" style={{ color: scenario.color }}>
                          {scenario.profit > 0 ? "+" : ""}{scenario.profit.toLocaleString()} ريال
                        </p>
                        <p className="text-xs text-gray-400">صافي ربح</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews */}
            {land.reviews.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-black mb-4" style={{ color: "#0A2342" }}>آراء المستثمرين السابقين</h2>
                <div className="space-y-4">
                  {land.reviews.map((review) => (
                    <div key={review.id} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-sm" style={{ color: "#0A2342" }}>{review.name}</p>
                          <p className="text-xs text-gray-400">{review.activityType} • {review.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? "#C9A84C" : "none"}
                              stroke={i < review.rating ? "#C9A84C" : "#d1d5db"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Price & CTA */}
            <div className="card p-6 sticky top-24">
              <div className="mb-4">
                <p className="text-gray-400 text-sm">تكلفة الإيجار الموسمي</p>
                <p className="text-4xl font-black" style={{ color: "#C9A84C" }}>{land.price.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">ريال سعودي</p>
              </div>
              <p className="text-xs text-gray-500 mb-4 inline-flex items-center gap-2"><CalendarDays size={12} />{land.seasonDates}</p>

              <a href={land.forasLink} target="_blank" rel="noopener noreferrer"
                className="btn-gold w-full text-center py-3 text-base mb-3 justify-center">
                تقديم طلب استئجار عبر فرص
                <ArrowLeft size={16} />
              </a>
              <Link href={`/apply/${land.id}`}
                className="btn-primary w-full text-center py-3 text-sm justify-center">
                تعبئة نموذج الطلب هنا أولاً
              </Link>

              <p className="text-xs text-gray-400 text-center mt-3">
                ستُحوَّل لمنصة فرص السعودية للتقديم الرسمي
              </p>

              {/* Requirements checklist */}
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="font-bold text-sm mb-3" style={{ color: "#0A2342" }}>متطلبات التقديم</p>
                <ul className="space-y-2">
                  {[
                    { text: "سجل تجاري ساري المفعول", done: true },
                    { text: "هوية وطنية سارية", done: true },
                    { text: "وصف النشاط", done: false },
                    { text: "الميزانية التقديرية", done: false },
                  ].map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className={req.done ? "text-green-500" : "text-gray-300"} />
                      <span className={req.done ? "text-gray-600" : "text-gray-400"}>{req.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="text-xs text-gray-400 mb-2">هل تحتاج استفساراً من هذه الأرض؟</p>
                <button className="text-sm font-medium flex items-center gap-2" style={{ color: "#0A2342" }}>
                  <MessageSquareMore size={14} />
                  تحدث مع الدعم الفني
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
