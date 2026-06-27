"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Layers3, MapPinned, Star, Store, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NeighborhoodPlace {
  id: string;
  name: string;
  mappedBusinessType: string;
  rating: number;
  userRatingsTotal: number;
  address: string;
  mapPoint: { x: number; y: number };
  lat: number;
  lng: number;
  isOperational: boolean;
}

interface NeighborhoodDetailPayload {
  neighborhood: {
    slug: string;
    name: string;
    city: string;
    districtCluster: string;
    landAreaKm2: number;
    center: { lat: number; lng: number };
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
  "مقاهٍ": "#7C5CFF",
  "مطاعم": "#F97316",
  "مخابز": "#16A34A",
  "تجزئة": "#2563EB",
  "عيادات": "#0EA5E9",
  "مغاسل": "#7C3AED",
  "صيدليات": "#14B8A6",
  "خدمات": "#64748B",
  "وجهات": "#DC2626",
};

function buildOpenStreetMapUrl(center?: { lat: number; lng: number }) {
  const lat = center?.lat ?? 27.5231;
  const lng = center?.lng ?? 41.6884;
  const delta = 0.018;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

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

      const detail = (await response.json()) as NeighborhoodDetailPayload;
      setPayload(detail);
      setActivePlaceId(detail.places?.[0]?.id ?? null);
    }

    if (params.slug) void loadDetail();
  }, [params.slug]);

  const activePlace = payload?.places.find((place) => place.id === activePlaceId) ?? payload?.places[0] ?? null;
  const mapUrl = useMemo(() => buildOpenStreetMapUrl(payload?.neighborhood.center), [payload?.neighborhood.center]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F7F9FC_0%,#EEF3F8_100%)] text-[#0A2342]" dir="rtl">
      <header className="border-b border-slate-200 bg-white/88 px-4 py-4 shadow-[0_10px_35px_rgba(10,35,66,0.05)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/location-analysis" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-[#0A2342] hover:bg-slate-50">
            العودة إلى تحليل الأحياء
          </Link>
          <nav className="flex items-center gap-5 text-sm font-bold text-slate-500">
            <Link href="/dashboard">لوحة التحكم</Link>
            <Link href="/opportunities">الفرص الاستثمارية</Link>
            <Link href="/consulting/request">الاستشارات</Link>
          </nav>
          <Link href="/" className="text-xl font-black">استنار</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-6 text-center">
          <p className="text-sm font-bold text-[#B88D35]">تحليل حي تفصيلي</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">{payload?.neighborhood.name ?? "جار التحميل..."}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-8 text-slate-500">
            قراءة مكانية تجمع الأنشطة المرصودة، التنافس، الطلب، وتوزيع الفئات داخل الحي لمساعدة المستثمر على فهم الموقع قبل طلب الاستشارة أو مقارنة الفرص.
          </p>
        </section>

        <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {([
            ["الأنشطة", payload?.analytics?.totalPlaces ?? 0, Layers3, "#EEF4FF"],
            ["متوسط التقييم", `${payload?.analytics?.averageRating ?? 0} / 5`, Star, "#FFF7E1"],
            ["درجة المنافسة", `${payload?.analytics?.competitionScore ?? 0}%`, TrendingUp, "#ECFDF5"],
            ["المساحة", `${payload?.neighborhood.landAreaKm2 ?? 0} كم²`, MapPinned, "#F5F3FF"],
          ] as Array<[string, string | number, LucideIcon, string]>).map(([label, value, Icon, surface]) => (
            <article key={label} className="rounded-[1.35rem] border border-slate-200 bg-white p-5 text-right shadow-[0_16px_40px_rgba(10,35,66,0.06)]">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-[1rem]" style={{ backgroundColor: surface }}>
                <Icon size={22} />
              </span>
              <p className="text-2xl font-black">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_22px_55px_rgba(10,35,66,0.08)]">
            <div className="relative h-[560px] bg-slate-100">
              <iframe
                title={`خريطة ${payload?.neighborhood.name ?? "الحي"}`}
                src={mapUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute left-5 top-5 rounded-[1.1rem] border border-slate-200 bg-white/92 p-4 text-right shadow-[0_12px_35px_rgba(10,35,66,0.12)] backdrop-blur">
                <p className="mb-3 text-sm font-black">الفئات</p>
                <div className="grid gap-2 text-xs text-slate-600">
                  {Object.entries(payload?.analytics?.categoryCounts ?? {}).slice(0, 6).map(([category, count]) => (
                    <button key={category} className="flex items-center justify-between gap-8 rounded-xl bg-slate-50 px-3 py-2">
                      <span>{count}</span>
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: categoryColors[category] ?? "#0A2342" }} />
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <section className="rounded-[1.6rem] border border-slate-200 bg-white p-5 text-right shadow-[0_18px_45px_rgba(10,35,66,0.06)]">
              <p className="text-sm font-bold text-[#B88D35]">ملف النشاط المحدد</p>
              {activePlace ? (
                <div className="mt-4">
                  <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: categoryColors[activePlace.mappedBusinessType] ?? "#0A2342" }}>
                    {activePlace.mappedBusinessType}
                  </span>
                  <h2 className="mt-4 text-2xl font-black">{activePlace.name}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{activePlace.address}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-[1rem] bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">التقييم</p>
                      <p className="mt-1 text-xl font-black">{activePlace.rating} / 5</p>
                    </div>
                    <div className="rounded-[1rem] bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">المراجعات</p>
                      <p className="mt-1 text-xl font-black">{activePlace.userRatingsTotal}</p>
                    </div>
                  </div>
                </div>
              ) : <p className="mt-4 text-sm text-slate-500">لا توجد أنشطة مرصودة حالياً.</p>}
            </section>

            <section className="rounded-[1.6rem] border border-slate-200 bg-white p-5 text-right shadow-[0_18px_45px_rgba(10,35,66,0.06)]">
              <p className="mb-3 text-sm font-bold text-[#B88D35]">روابط القرار التالية</p>
              <div className="grid gap-2">
                <Link href={`/consulting/request?neighborhood=${encodeURIComponent(payload?.neighborhood.name ?? "")}`} className="btn-primary justify-center">
                  افتح طلب استشاري
                  <ArrowLeft size={16} />
                </Link>
                <Link href="/opportunities" className="btn-gold justify-center">
                  قارن مع الفرص
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </section>
          </aside>
        </section>

        <section className="mt-6 rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(10,35,66,0.06)]">
          <div className="mb-4 text-right">
            <h2 className="text-2xl font-black">قائمة الأنشطة</h2>
            <p className="mt-1 text-sm text-slate-500">اختر أي نشاط لتحديث بطاقة التفاصيل.</p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {payload?.places.map((place) => (
              <button
                key={place.id}
                onClick={() => setActivePlaceId(place.id)}
                className={`flex items-center justify-between gap-4 rounded-[1.1rem] border p-3 text-right transition ${
                  place.id === activePlaceId ? "border-[#7C5CFF] bg-[#F5F3FF]" : "border-slate-200 bg-slate-50 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-5 text-sm text-slate-500">
                  <span className="font-black text-[#0A2342]">{place.rating}</span>
                  <span>{place.userRatingsTotal} مراجعة</span>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-black">{place.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{place.mappedBusinessType}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-white text-[#0A2342]">
                    <Store size={17} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
