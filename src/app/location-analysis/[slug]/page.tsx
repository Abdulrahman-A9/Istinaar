"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPinned, Star, Store } from "lucide-react";

interface NeighborhoodPlace {
  id: string;
  name: string;
  mappedBusinessType: string;
  rating: number;
  userRatingsTotal: number;
  address: string;
  mapPoint: { x: number; y: number };
  isOperational: boolean;
}

interface NeighborhoodDetailPayload {
  neighborhood: {
    slug: string;
    name: string;
    districtCluster: string;
    landAreaKm2: number;
    polygon: Array<{ x: number; y: number }>;
    lastVerifiedAt: string;
  };
  places: NeighborhoodPlace[];
  analytics: {
    totalPlaces: number;
    averageRating: number;
    totalReviews: number;
    competitionScore: number;
    demandScore: number;
    topCategory: string;
    categoryCounts: Record<string, number>;
    sourceCoverage: string;
    updatedAt: string;
  } | null;
}

const categoryColors: Record<string, string> = {
  "مقاهٍ": "#0A2342",
  "مطاعم": "#C9A84C",
  "مخابز": "#F97316",
  "تجزئة": "#2563EB",
  "عيادات": "#16A34A",
  "مغاسل": "#7C3AED",
  "صيدليات": "#14B8A6",
  "خدمات": "#64748B",
  "وجهات": "#DC2626",
};

export default function NeighborhoodDetailPage() {
  const params = useParams<{ slug: string }>();
  const [payload, setPayload] = useState<NeighborhoodDetailPayload | null>(null);
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null);

  useEffect(() => {
    async function loadDetail() {
      const response = await fetch(`/api/neighborhoods/${params.slug}`, { cache: "no-store" });
      if (!response.ok) {
        setPayload(null);
        return;
      }

      const detail = await response.json();
      setPayload(detail);
      setActivePlaceId(detail.places?.[0]?.id ?? null);
    }

    if (params.slug) {
      void loadDetail();
    }
  }, [params.slug]);

  const polygonPoints = useMemo(
    () => payload?.neighborhood.polygon.map((point) => `${point.x},${point.y}`).join(" ") ?? "",
    [payload]
  );
  const activePlace = payload?.places.find((place) => place.id === activePlaceId) ?? payload?.places[0] ?? null;

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="px-4 py-12" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-8 items-start text-right text-white">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#F5D88E" }}>
              <MapPinned size={16} />
              خريطة الحي التفاعلية
            </span>
            <h1 className="text-4xl font-black leading-tight mb-4">{payload?.neighborhood.name ?? "جار التحميل..."}</h1>
            <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto">تعرض هذه الصفحة الأنشطة المرصودة داخل الحي، توزعها المكاني التقريبي، ومتوسط التقييم والمنافسة والفئة المسيطرة حتى تستخدمها مباشرة في قرار الفرصة أو الاستشارة.</p>
          </div>
          <div className="glass-panel rounded-[1.6rem] p-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "الأنشطة", value: `${payload?.analytics?.totalPlaces ?? 0}` },
                { label: "متوسط التقييم", value: `${payload?.analytics?.averageRating ?? 0} / 5` },
                { label: "درجة المنافسة", value: `${payload?.analytics?.competitionScore ?? 0}%` },
                { label: "المساحة", value: `${payload?.neighborhood.landAreaKm2 ?? 0} كم²` },
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.08fr_0.92fr] gap-6">
          <div className="card p-6 text-right">
            <div className="flex items-center justify-between mb-5">
              <Link href="/location-analysis" className="btn-outline text-sm px-5 py-3">
                العودة إلى تحليل الأحياء
              </Link>
              <div>
                <h2 className="text-2xl font-black text-navy">الخريطة التشغيلية للحي</h2>
                <p className="text-sm text-gray-500 mt-1">نقاط الأنشطة موزعة داخل حدود الحي بشكل تفاعلي أولي</p>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF4FF_100%)] p-5">
              <svg viewBox="0 0 100 100" className="w-full h-[420px] rounded-[1.25rem] bg-white/70">
                <defs>
                  <linearGradient id="neighborhoodFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DCEBFF" />
                    <stop offset="100%" stopColor="#EEF6FF" />
                  </linearGradient>
                </defs>
                <polygon points={polygonPoints} fill="url(#neighborhoodFill)" stroke="#0A2342" strokeWidth="1.2" />
                {payload?.places.map((place) => {
                  const isActive = place.id === activePlaceId;
                  const color = categoryColors[place.mappedBusinessType] ?? "#0A2342";

                  return (
                    <g key={place.id} onMouseEnter={() => setActivePlaceId(place.id)} style={{ cursor: "pointer" }}>
                      <circle cx={place.mapPoint.x} cy={place.mapPoint.y} r={isActive ? 4.6 : 3.4} fill={color} opacity={0.92} />
                      <circle cx={place.mapPoint.x} cy={place.mapPoint.y} r={isActive ? 8 : 0} fill={color} opacity={0.12} />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">ملف النشاط المحدد</h2>
              {activePlace ? (
                <div className="rounded-2xl bg-gray-50 p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: categoryColors[activePlace.mappedBusinessType] ?? "#0A2342" }}>
                      {activePlace.mappedBusinessType}
                    </span>
                    <p className="font-black text-navy">{activePlace.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{activePlace.address}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-gray-400 mb-1">التقييم</p>
                      <p className="font-black text-navy">{activePlace.rating} / 5</p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-gray-400 mb-1">عدد المراجعات</p>
                      <p className="font-black text-navy">{activePlace.userRatingsTotal}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-gray-50 p-5 text-sm text-gray-500">لا توجد أماكن مرصودة حالياً.</div>
              )}
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">الفئات والهيكلة التنافسية</h2>
              <div className="space-y-3">
                {Object.entries(payload?.analytics?.categoryCounts ?? {}).map(([category, count]) => (
                  <div key={category} className="rounded-xl bg-gray-50 px-4 py-3 flex items-center justify-between gap-3">
                    <span className="font-black text-navy">{count}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[category] ?? "#0A2342" }} />
                      <span className="text-sm text-gray-600">{category}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-gray-50 p-4 mt-4 text-sm text-gray-600 leading-7">
                الفئة المسيطرة حالياً: <span className="font-black text-navy">{payload?.analytics?.topCategory ?? "-"}</span>. التغطية الحالية للمصادر: <span className="font-black text-navy">{payload?.analytics?.sourceCoverage ?? "-"}</span>.
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">روابط القرار التالية</h2>
              <div className="grid grid-cols-1 gap-3">
                <Link href={`/consulting/request?neighborhood=${encodeURIComponent(payload?.neighborhood.name ?? "")}`} className="btn-primary w-full justify-center">
                  افتح طلب استشاري لهذا الحي
                  <ArrowLeft size={16} />
                </Link>
                <Link href="/opportunities" className="btn-gold w-full justify-center">
                  قارن مع الفرص الاستثمارية
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">قائمة الأنشطة</h2>
              <div className="space-y-3 max-h-[420px] overflow-auto pl-1">
                {payload?.places.map((place) => (
                  <button key={place.id} onClick={() => setActivePlaceId(place.id)} className={`w-full rounded-xl border px-4 py-3 text-right ${place.id === activePlaceId ? "border-navy bg-blue-50" : "border-gray-100 bg-white"}`}>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="inline-flex items-center gap-1 text-xs text-amber-500">
                        <Star size={12} fill="currentColor" />
                        {place.rating}
                      </div>
                      <div className="flex items-center gap-2">
                        <Store size={14} color={categoryColors[place.mappedBusinessType] ?? "#0A2342"} />
                        <span className="font-bold text-navy text-sm">{place.name}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{place.mappedBusinessType} • {place.userRatingsTotal} مراجعة</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}