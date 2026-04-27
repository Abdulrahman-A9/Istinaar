"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CircleAlert,
  LineChart,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import lands from "@/data/lands";
import { calculateRisk } from "@/lib/analysis";

const demandTrend = [
  { month: "أكتوبر", visitors: 42, applications: 18, readiness: 58 },
  { month: "نوفمبر", visitors: 61, applications: 27, readiness: 64 },
  { month: "ديسمبر", visitors: 79, applications: 36, readiness: 71 },
  { month: "يناير", visitors: 93, applications: 44, readiness: 78 },
  { month: "فبراير", visitors: 88, applications: 39, readiness: 76 },
  { month: "مارس", visitors: 65, applications: 24, readiness: 68 },
];

const pipelineData = [
  { name: "قيد الدراسة", value: 18, color: "#C9A84C" },
  { name: "جاهزة للطرح", value: 27, color: "#0A2342" },
  { name: "تحتاج معالجة", value: 8, color: "#D97706" },
  { name: "مقفلة", value: 5, color: "#CBD5E1" },
];

export default function SmartAnalysisPage() {
  const [chartsReady, setChartsReady] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("الكل");

  useEffect(() => {
    setChartsReady(true);
  }, []);

  const availableNeighborhoods = useMemo(
    () => ["الكل", ...Array.from(new Set(lands.map((land) => land.neighborhood)))],
    []
  );

  const filteredLands = useMemo(() => {
    return selectedNeighborhood === "الكل"
      ? lands
      : lands.filter((land) => land.neighborhood === selectedNeighborhood);
  }, [selectedNeighborhood]);

  const rankedLands = useMemo(() => {
    return filteredLands
      .map((land) => {
        const risk = calculateRisk(
          land.competitionDensity,
          land.marketDemand,
          land.costLevel,
          land.activitySaturation
        );
        const strategicScore = Math.round(
          land.profitabilityScore * 0.4 +
            land.feasibilityScore * 0.35 +
            (100 - risk.score) * 0.25
        );

        return {
          ...land,
          risk,
          strategicScore,
        };
      })
      .sort((left, right) => right.strategicScore - left.strategicScore);
  }, [filteredLands]);

  const neighborhoodComparison = useMemo(() => {
    const grouped = new Map<string, { opportunities: number; avgProfitability: number; avgDemand: number; avgRisk: number }>();

    for (const land of lands) {
      const risk = calculateRisk(
        land.competitionDensity,
        land.marketDemand,
        land.costLevel,
        land.activitySaturation
      );
      const current = grouped.get(land.neighborhood) ?? {
        opportunities: 0,
        avgProfitability: 0,
        avgDemand: 0,
        avgRisk: 0,
      };

      grouped.set(land.neighborhood, {
        opportunities: current.opportunities + 1,
        avgProfitability: current.avgProfitability + land.profitabilityScore,
        avgDemand: current.avgDemand + land.marketDemand,
        avgRisk: current.avgRisk + risk.score,
      });
    }

    return Array.from(grouped.entries())
      .map(([name, value]) => ({
        name,
        opportunities: value.opportunities,
        profitability: Math.round(value.avgProfitability / value.opportunities),
        demand: Math.round(value.avgDemand / value.opportunities),
        risk: Math.round(value.avgRisk / value.opportunities),
      }))
      .sort((left, right) => right.profitability - left.profitability);
  }, []);

  const bestLand = rankedLands[0];
  const averageProfitability = Math.round(
    rankedLands.reduce((sum, land) => sum + land.profitabilityScore, 0) / Math.max(rankedLands.length, 1)
  );
  const averageFeasibility = Math.round(
    rankedLands.reduce((sum, land) => sum + land.feasibilityScore, 0) / Math.max(rankedLands.length, 1)
  );
  const averageRisk = Math.round(
    rankedLands.reduce((sum, land) => sum + land.risk.score, 0) / Math.max(rankedLands.length, 1)
  );

  const radarData = bestLand
    ? [
        { metric: "الربحية", value: bestLand.profitabilityScore },
        { metric: "الجدوى", value: bestLand.feasibilityScore },
        { metric: "الطلب", value: bestLand.marketDemand },
        { metric: "المنافسة العكسية", value: 100 - bestLand.competitionDensity },
        { metric: "المخاطر العكسية", value: 100 - bestLand.risk.score },
      ]
    : [];

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="relative overflow-hidden px-4 py-14" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 58%, #17355f 100%)" }}>
        <div className="grid-glow absolute inset-0 opacity-60" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.85fr] gap-8 items-start">
            <div className="text-right">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6"
                style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "#F5D88E", border: "1px solid rgba(201,168,76,0.2)" }}>
                <Sparkles size={16} />
                لوحة التحليل الذكي لاتخاذ القرار الاستثماري
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                قراءة تنفيذية جاهزة
                <span style={{ color: "#C9A84C" }}> أمام الأمانة</span>
              </h1>
              <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto mb-8">
                هذه الصفحة تجمع الصورة الكلية للفرص الموسمية في حائل: أين يتركز الطلب، ما الأحياء الأكثر جاهزية،
                وما الأراضي التي تستحق أولوية الطرح أو الترويج في الموسم الحالي.
              </p>
              <div className="flex flex-wrap gap-3 justify-end">
                <Link href="/admin" className="btn-gold text-sm px-6 py-3">
                  الذهاب إلى لوحة الأمانة
                  <ArrowLeft size={16} />
                </Link>
                <Link href="/lands" className="btn-outline text-sm px-6 py-3">
                  مراجعة الأراضي تفصيليًا
                </Link>
              </div>
            </div>

            <div className="glass-panel rounded-[1.5rem] p-5 text-white">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm text-white/60">التوصية التنفيذية الحالية</span>
                <span className="badge-available">جاهز للعرض</span>
              </div>
              <div className="space-y-4">
                <div className="soft-card p-4 text-right">
                  <p className="text-xs text-gray-500 mb-1">أفضل فرصة مركبة</p>
                  <p className="text-lg font-black text-navy">{bestLand?.name ?? "لا توجد بيانات"}</p>
                  <p className="text-sm text-gray-500 mt-1">{bestLand?.neighborhood ?? "-"} • درجة استراتيجية {bestLand?.strategicScore ?? 0}/100</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "الربحية", value: `${averageProfitability}%` },
                    { label: "الجدوى", value: `${averageFeasibility}%` },
                    { label: "متوسط المخاطر", value: `${averageRisk}%` },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl p-3 text-center" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                      <p className="text-xl font-black">{item.value}</p>
                      <p className="text-xs text-white/65 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl p-4 text-right" style={{ backgroundColor: "rgba(201,168,76,0.12)" }}>
                  <p className="text-sm font-bold" style={{ color: "#F5D88E" }}>الخلاصة الرسمية</p>
                  <p className="text-sm text-white/75 leading-7 mt-2">
                    المؤشرات الحالية ترجّح أن الأولوية في العرض والترويج ينبغي أن تذهب إلى المواقع ذات الطلب المرتفع
                    والمنافسة المنخفضة في `مشار` و`النقرة`، مع إبقاء المواقع ذات المنافسة الأعلى ضمن حزمة طرح موجهة لشريحة مختلفة من المستثمرين.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "فرص قيد التحليل", value: rankedLands.length, icon: <Building2 size={18} /> },
            { label: "مؤشر الجاهزية الكلي", value: `${Math.round((averageProfitability + averageFeasibility) / 2)}%`, icon: <ShieldCheck size={18} /> },
            { label: "أعلى طلب موسمي", value: `${Math.max(...lands.map((land) => land.marketDemand))}%`, icon: <LineChart size={18} /> },
            { label: "أولوية العرض", value: bestLand?.neighborhood ?? "-", icon: <MapPinned size={18} /> },
          ].map((stat) => (
            <div key={stat.label} className="soft-card p-5 text-right">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(10,35,66,0.08)", color: "#0A2342" }}>
                  {stat.icon}
                </div>
                <p className="text-3xl font-black text-navy">{stat.value}</p>
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-2 flex-wrap">
                {availableNeighborhoods.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedNeighborhood(item)}
                    className="px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
                    style={selectedNeighborhood === item ? { backgroundColor: "#0A2342", color: "white" } : { backgroundColor: "#F4F6FA", color: "#526071" }}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="text-right">
                <h2 className="text-xl font-black text-navy">مقارنة جاذبية الأحياء</h2>
                <p className="text-sm text-gray-500">قياس الربحية والطلب مقابل المخاطر على مستوى الأحياء</p>
              </div>
            </div>
            <div className="h-88">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={neighborhoodComparison} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="profitability" radius={[8, 8, 0, 0]} fill="#0A2342" name="الربحية" />
                    <Bar dataKey="demand" radius={[8, 8, 0, 0]} fill="#C9A84C" name="الطلب" />
                    <Bar dataKey="risk" radius={[8, 8, 0, 0]} fill="#D97706" name="المخاطر" />
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>

          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-xl font-black text-navy">ملف الفرصة الأعلى أولوية</h2>
              <p className="text-sm text-gray-500">تمثيل بصري مركب لأفضل موقع وفق المؤشر الاستراتيجي</p>
            </div>
            <div className="h-72 mb-5">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="72%">
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "#526071", fontSize: 12 }} />
                    <Radar dataKey="value" stroke="#0A2342" fill="#0A2342" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : null}
            </div>
            <div className="rounded-2xl p-4 text-right" style={{ backgroundColor: "#F6F8FB" }}>
              <p className="text-sm font-black text-navy">{bestLand?.name}</p>
              <p className="text-sm text-gray-500 mt-2 leading-7">
                الموقع يجمع بين طلب مرتفع وربحية أعلى من المتوسط، مع مخاطر تشغيلية قابلة للإدارة،
                لذلك يصلح كواجهة أولى في العرض الرسمي أمام المستثمرين والجهات المانحة للتراخيص.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-xl font-black text-navy">منحنى الطلب والجاهزية خلال الموسم</h2>
              <p className="text-sm text-gray-500">قراءة استباقية تساعد الأمانة على توقيت الطرح والتسويق للمواقع</p>
            </div>
            <div className="h-80">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandTrend} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0A2342" stopOpacity={0.24} />
                        <stop offset="100%" stopColor="#0A2342" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="readinessFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.28} />
                        <stop offset="100%" stopColor="#C9A84C" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="visitors" stroke="#0A2342" fill="url(#visitorsFill)" strokeWidth={3} name="اهتمام المستثمرين" />
                    <Area type="monotone" dataKey="readiness" stroke="#C9A84C" fill="url(#readinessFill)" strokeWidth={3} name="جاهزية الطرح" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>

          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-xl font-black text-navy">توزيع محفظة الفرص</h2>
              <p className="text-sm text-gray-500">مؤشر يوضح وضع المخزون الحالي من المواقع ضمن دورة القرار</p>
            </div>
            <div className="h-72">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pipelineData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>
                      {pipelineData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {pipelineData.map((item) => (
                <div key={item.name} className="rounded-xl p-3 text-right" style={{ backgroundColor: "#F6F8FB" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <p className="text-lg font-black text-navy">{item.value}</p>
                  </div>
                  <p className="text-xs text-gray-500">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14">
        <div className="max-w-7xl mx-auto card p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "#FFF7E5", color: "#A16207" }}>
              تحديث مخصص للعرض التنفيذي
            </span>
            <div className="text-right">
              <h2 className="text-xl font-black text-navy">قائمة الأولويات المقترحة للطرح</h2>
              <p className="text-sm text-gray-500">ترتيب موحد يساعد على تقديم سردية واضحة أمام الأمانة والمستثمرين</p>
            </div>
          </div>
          <div className="space-y-3">
            {rankedLands.slice(0, 5).map((land, index) => (
              <div key={land.id} className="soft-card p-4 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg" style={{ backgroundColor: "#0A2342", color: "white" }}>
                    {index + 1}
                  </div>
                  <div className="text-right">
                    <p className="font-black text-navy">{land.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{land.neighborhood} • {land.type} • درجة مركبة {land.strategicScore}/100</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-available">ربحية {land.profitabilityScore}%</span>
                  <span className="badge-review">جدوى {land.feasibilityScore}%</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: land.risk.bgColor, color: land.risk.color }}>
                    {land.risk.label}
                  </span>
                  <Link href={`/lands/${land.id}`} className="btn-primary text-sm px-4 py-2">
                    فتح الفرصة
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-4 mt-5 text-right" style={{ backgroundColor: "#FFF9EC", border: "1px solid rgba(201,168,76,0.24)" }}>
            <p className="font-bold flex items-center justify-end gap-2 text-sm" style={{ color: "#9A6700" }}>
              <CircleAlert size={16} />
              توصية ختامية للعرض الرسمي
            </p>
            <p className="text-sm text-gray-700 leading-7 mt-2">
              أفضل مسار للعرض أمام الأمانة هو إبراز أن المنصة لا تكرر إجراءات `فرص`، بل ترفع جودة القرار قبل التقديم عبر
              تحليل الطلب، مقارنة الأحياء، وإبراز أولويات الطرح والاستثمار بشكل مرئي قابل للفهم خلال دقائق.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}