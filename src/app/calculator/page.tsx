"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, Calculator, Clock3, ShieldCheck, Sparkles, TrendingUp, Wallet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateInvestment, activityMultipliers } from "@/lib/analysis";

export default function CalculatorPage() {
  const [chartsReady, setChartsReady] = useState(false);
  const [capital, setCapital] = useState(50000);
  const [monthlyCosts, setMonthlyCosts] = useState(8000);
  const [seasonMonths, setSeasonMonths] = useState(3);
  const [activityType, setActivityType] = useState("مطعم");
  const [calcDone, setCalcDone] = useState(false);

  const multiplier = activityMultipliers[activityType] || 1.0;
  const result = calculateInvestment(capital, monthlyCosts, seasonMonths, multiplier);
  const scenarioData = calcDone
    ? [
        { name: result.scenarios.conservative.label, revenue: result.scenarios.conservative.revenue, profit: result.scenarios.conservative.profit, color: "#D97706" },
        { name: result.scenarios.average.label, revenue: result.scenarios.average.revenue, profit: result.scenarios.average.profit, color: "#0A2342" },
        { name: result.scenarios.optimistic.label, revenue: result.scenarios.optimistic.revenue, profit: result.scenarios.optimistic.profit, color: "#16A34A" },
      ]
    : [];
  const cashFlowData = calcDone
    ? result.monthlyFlow
    : [
        { month: "أكتوبر", value: -50000 },
        { month: "نوفمبر", value: 0 },
        { month: "ديسمبر", value: 0 },
        { month: "يناير", value: 0 },
      ];

  useEffect(() => {
    setChartsReady(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <div style={{ backgroundColor: "#0A2342" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto text-right">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5"
            style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
            <Sparkles size={15} />
            نسخة عرض تنفيذية للمستثمر والجهة المنظمة
          </span>
          <h1 className="text-4xl font-black text-white mb-2">حاسبة العائد الاستثماري</h1>
          <p className="text-white/70 leading-8 max-w-3xl mr-0 ml-auto">
            أداة تقدير سريعة تساعد على تقديم قرار أولي مدروس قبل التوجه إلى منصة فرص. تم تصميمها لتبسيط قراءة
            الربحية، المخاطر، وسرعة استرداد رأس المال ضمن موسم حائل.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "قرار أولي خلال دقائق", value: "سريع" },
            { label: "مقارنة 3 سيناريوهات", value: "تفصيلي" },
            { label: "ربط مباشر بالفرص", value: "جاهز" },
          ].map((item) => (
            <div key={item.label} className="soft-card p-4 text-right">
              <p className="text-2xl font-black text-navy">{item.value}</p>
              <p className="text-sm text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Inputs */}
          <div className="card p-6 space-y-5">
            <h2 className="font-black text-base" style={{ color: "#0A2342" }}>مدخلات الاستثمار</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">رأس المال المتاح</label>
              <div className="relative">
                <input type="number" value={capital} onChange={(e) => setCapital(+e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                <span className="absolute left-3 top-3 text-sm text-gray-400">ريال</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">التكاليف التشغيلية الشهرية</label>
              <div className="relative">
                <input type="number" value={monthlyCosts} onChange={(e) => setMonthlyCosts(+e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                <span className="absolute left-3 top-3 text-sm text-gray-400">ريال</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">المدة الموسمية</label>
              <select value={seasonMonths} onChange={(e) => setSeasonMonths(+e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                <option value={3}>٣ أشهر</option>
                <option value={4}>٤ أشهر</option>
                <option value={6}>٦ أشهر</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">نوع النشاط</label>
              <select value={activityType} onChange={(e) => setActivityType(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                {Object.keys(activityMultipliers).map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>

            <button onClick={() => setCalcDone(true)} className="btn-gold w-full py-3 text-base">
              احسب العائد
            </button>

            <div className="p-3 rounded-xl text-xs text-gray-500 border border-gray-100 bg-gray-50">
              <p className="font-semibold mb-1" style={{ color: "#C9A84C" }}>تنبيه ذكي</p>
              <p>تعتمد النتائج على سيناريو تشغيلي موسمي مبني على الطلب الحالي في حائل، وهي مناسبة لمرحلة الفرز الأولي قبل التقديم الرسمي.</p>
            </div>

            <div className="rounded-2xl p-4 text-right" style={{ backgroundColor: "#0A2342" }}>
              <p className="text-sm font-bold text-white mb-2">مسار العرض المقترح</p>
              <p className="text-xs leading-7 text-white/70">
                استخدم هذه الحاسبة أثناء العرض لإظهار كيف تدعم المنصة اتخاذ القرار بسرعة، ثم انتقل بعدها إلى صفحة التحليل الذكي أو تفاصيل الأرض.
              </p>
              <Link href="/coming-soon" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#C9A84C" }}>
                فتح التحليل الذكي
                <ArrowLeft size={14} />
              </Link>
            </div>
          </div>

          {/* Results */}
          <div className="md:col-span-2 space-y-5">
            {/* Main Results */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "صافي الربح المتوقع", value: calcDone ? `${result.netProfit.toLocaleString()} ريال` : "—", color: calcDone ? (result.netProfit > 0 ? "#16a34a" : "#dc2626") : "#9ca3af", icon: <Wallet size={20} /> },
                { label: "نسبة العائد ROI", value: calcDone ? `${result.roi}٪` : "—", color: calcDone ? "#0A2342" : "#9ca3af", icon: <TrendingUp size={20} /> },
                { label: "فترة الاسترداد", value: calcDone ? `${result.paybackMonths} أشهر` : "—", color: calcDone ? "#0A2342" : "#9ca3af", icon: <Clock3 size={20} /> },
              ].map((r) => (
                <div key={r.label} className="card p-5 text-center">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#EEF4FF", color: r.color }}>{r.icon}</div>
                  <p className="text-2xl font-black mb-1" style={{ color: r.color }}>{r.value}</p>
                  <p className="text-xs text-gray-500">{r.label}</p>
                </div>
              ))}
            </div>

            {/* Scenarios */}
            <div className="card p-5">
              <h3 className="font-black text-base mb-4" style={{ color: "#0A2342" }}>سيناريوهات الأداء</h3>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {calcDone ? [
                  { ...result.scenarios.conservative, color: "#f97316", bg: "#fff7ed", icon: <ShieldCheck size={20} /> },
                  { ...result.scenarios.average, color: "#2563eb", bg: "#eff6ff", icon: <BarChart3 size={20} /> },
                  { ...result.scenarios.optimistic, color: "#16a34a", bg: "#f0fdf4", icon: <TrendingUp size={20} /> },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-xl text-center" style={{ backgroundColor: s.bg }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: "white", color: s.color }}>{s.icon}</div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2"
                      style={{ backgroundColor: s.color, color: "white" }}>{s.label}</span>
                    <p className="font-black text-xl" style={{ color: s.color }}>{s.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mb-1">إيراد متوقع</p>
                    <p className="font-bold text-sm" style={{ color: s.color }}>
                      {s.profit > 0 ? "+" : ""}{s.profit.toLocaleString()} ريال
                    </p>
                    <p className="text-xs text-gray-400">صافي الربح</p>
                  </div>
                )) : (
                  <div className="col-span-3 text-center py-10 text-gray-300">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#F3F6FB", color: "#94A3B8" }}>
                      <Calculator size={28} />
                    </div>
                    <p className="text-sm">أدخل البيانات واضغط "احسب العائد" لعرض السيناريوهات</p>
                  </div>
                )}
              </div>
              <div className="h-64">
                {calcDone && chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scenarioData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="profit" radius={[8, 8, 0, 0]} name="صافي الربح">
                        {scenarioData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
              </div>
            </div>

            {/* Cash Flow Chart */}
            <div className="card p-5">
              <h3 className="font-black text-base mb-4" style={{ color: "#0A2342" }}>تحليل التدفقات النقدية المتوقعة</h3>
              <div className="h-72">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cashFlowData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} name="التدفق النقدي">
                        {cashFlowData.map((item, index) => (
                          <Cell key={`${item.month}-${index}`} fill={item.value < 0 ? "#EF4444" : item.value === 0 ? "#CBD5E1" : "#C9A84C"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
