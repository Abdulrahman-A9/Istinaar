"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPinned, Sparkles, TrendingUp, Users, Star, BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { historicalMarketData } from "@/data/historicalMarket";

interface NeighborhoodSummary {
  id: string;
  slug: string;
  name: string;
  city: string;
  districtCluster: string;
  landAreaKm2: number;
  lastVerifiedAt: string;
  analytics?: {
    totalPlaces: number;
    averageRating: number;
    totalReviews: number;
    competitionScore: number;
    demandScore: number;
    topCategory: string;
    categoryCounts: Record<string, number>;
    sourceCoverage: string;
    updatedAt: string;
  };
}

export default function LocationAnalysisPage() {
  const [chartsReady, setChartsReady] = useState(false);
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodSummary[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isChartsLoading, setIsChartsLoading] = useState(true);
  const currentNeighborhood = useMemo(
    () => neighborhoods.find((item) => item.slug === selectedSlug) ?? neighborhoods[0],
    [neighborhoods, selectedSlug]
  );
  const currentHistory = historicalMarketData.find((item) => item.neighborhood === currentNeighborhood?.name);
  const density = currentNeighborhood?.analytics
    ? [
        { label: "مقاهٍ", value: currentNeighborhood.analytics.categoryCounts["مقاهٍ"] ?? 0, color: "#0A2342" },
        { label: "مطاعم", value: currentNeighborhood.analytics.categoryCounts["مطاعم"] ?? 0, color: "#C9A84C" },
        { label: "تجزئة", value: currentNeighborhood.analytics.categoryCounts["تجزئة"] ?? 0, color: "#2563EB" },
        { label: "خدمات", value: (currentNeighborhood.analytics.categoryCounts["خدمات"] ?? 0) + (currentNeighborhood.analytics.categoryCounts["مغاسل"] ?? 0) + (currentNeighborhood.analytics.categoryCounts["صيدليات"] ?? 0), color: "#16A34A" },
      ]
    : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartsReady(true);
      setIsChartsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadNeighborhoods() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/neighborhoods", { cache: "no-store" });
        const payload = await response.json();
        setNeighborhoods(payload.items ?? []);
        setSelectedSlug((current) => current || payload.items?.[0]?.slug || "");
      } catch (error) {
        console.error("Failed to load neighborhoods:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadNeighborhoods();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="px-4 py-14" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
          <div className="glass-panel rounded-[1.6rem] p-6 text-right text-white">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "الأماكن المرصودة", value: `${currentNeighborhood?.analytics?.totalPlaces ?? 0}`, icon: <MapPinned size={20} />, color: "rgba(201,168,76,0.2)" },
                { label: "متوسط التقييم", value: `${currentNeighborhood?.analytics?.averageRating ?? 0} / 5`, icon: <Star size={20} />, color: "rgba(34,197,94,0.2)" },
                { label: "المنافسة", value: `${currentNeighborhood?.analytics?.competitionScore ?? 0}%`, icon: <BarChart3 size={20} />, color: "rgba(239,68,68,0.2)" },
                { label: "التغطية", value: currentNeighborhood?.analytics?.sourceCoverage ?? "-", icon: <Users size={20} />, color: "rgba(59,130,246,0.2)" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-4 flex items-center justify-between" style={{ backgroundColor: item.color }}>
                  <div className="text-right">
                    <p className="text-2xl font-black">{item.value}</p>
                    <p className="text-sm text-white/75 mt-1">{item.label}</p>
                  </div>
                  <div className="text-white/60">
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-right text-white">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#F5D88E" }}>
              <Sparkles size={16} />
              ذكاء المواقع والأحياء
            </span>
            <h1 className="text-4xl font-black leading-tight mb-4">من قراءة عامة إلى خريطة حي فعلية</h1>
            <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto">تعرض هذه الصفحة ملخصاً حياً للأحياء، ثم تفتح لك صفحة حي تفاعلية فيها الأنشطة المرصودة، كثافة الفئات، والتقييمات التي يستند عليها التحليل الاستثماري.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="card p-5 text-right flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">اختر الحي</label>
              <select value={selectedSlug} onChange={(event) => setSelectedSlug(event.target.value)} className="w-full md:w-80 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                {neighborhoods.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
            </div>
            {currentNeighborhood ? (
              <Link href={`/location-analysis/${currentNeighborhood.slug}`} className="btn-primary text-sm px-5 py-3 self-start md:self-auto">
                افتح خريطة الحي التفاعلية
                <ArrowLeft size={16} />
              </Link>
            ) : null}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="card p-6 text-right">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} color="#0A2342" />
                  <span className="text-xs font-semibold text-navy bg-blue-50 px-2 py-1 rounded-full">تحليل زمني</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-navy">تطور السوق في {currentNeighborhood?.name ?? "-"}</h2>
                  <p className="text-sm text-gray-500 mt-1">{currentHistory?.highlight}</p>
                </div>
              </div>
              <div className="h-80">
                {isChartsLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">جاري تحميل الرسم البياني...</p>
                    </div>
                  </div>
                ) : chartsReady && currentHistory ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentHistory.series} margin={{ top: 12, right: 12, left: 12, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="period" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0A2342", border: "none", borderRadius: "8px" }}
                        labelStyle={{ color: "#F5D88E" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Line type="monotone" dataKey="demandIndex" stroke="#0A2342" strokeWidth={3} dot={{ r: 5, fill: "#0A2342" }} name="مؤشر الطلب" />
                      <Line type="monotone" dataKey="competitionIndex" stroke="#C9A84C" strokeWidth={3} dot={{ r: 5, fill: "#C9A84C" }} name="مؤشر المنافسة" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">لا توجد بيانات متاحة</p>
                  </div>
                )}
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">ملخص الفئات المرصودة داخل الحي</h2>
              <div className="h-80 mb-5">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={density} layout="vertical" margin={{ top: 12, right: 12, left: 12, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                      <XAxis type="number" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="label" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                        {density.map((item) => <Cell key={item.label} fill={item.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-black text-navy mb-2">الخلاصة السريعة</p>
                <p className="text-sm text-gray-600 leading-7">الفئة الأكثر حضوراً حالياً: {currentNeighborhood?.analytics?.topCategory ?? "-"}، مع {currentNeighborhood?.analytics?.totalReviews ?? 0} مراجعة مرصودة ودرجة طلب مشتقة عند {currentNeighborhood?.analytics?.demandScore ?? 0}%.</p>
                <p className="text-xs text-gray-400 mt-2">آخر تحديث: {currentNeighborhood?.analytics?.updatedAt ?? "-"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] p-6 text-white text-right" style={{ background: "linear-gradient(135deg, #0A2342 0%, #143A6B 100%)" }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Link href={`/consulting/request?neighborhood=${encodeURIComponent(currentNeighborhood?.name ?? "")}`} className="btn-gold text-sm px-5 py-3">
                حوّل القراءة إلى طلب استشاري
                <ArrowLeft size={16} />
              </Link>
              <div>
                <p className="text-xl font-black mb-2">الخطوة التالية الطبيعية</p>
                <p className="text-sm text-white/75 leading-7">بعد قراءة الحي، افتح خريطة الحي التفاعلية ثم انتقل إلى الاستشارة أو إلى الفرصة المناسبة داخل نفس الحي.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}