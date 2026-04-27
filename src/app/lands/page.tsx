"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowLeft, Ruler, SearchX, ShieldAlert, SlidersHorizontal } from "lucide-react";
import lands from "@/data/lands";
import { calculateRisk } from "@/lib/analysis";
import { getLandActivityIcon, getLandPrimaryIcon } from "@/lib/landVisuals";

const activityTypes = ["الكل", "مطاعم", "كافيهات", "ترفيهي", "سياحي", "تجاري", "مهرجانات", "تراثي"];
const neighborhoods = ["جميع الأحياء", "حي النقرة", "حي الجامعيين", "حي السلام", "حي مشار", "حي المصيف", "حي المغواة", "وسط المدينة", "منطقة عقدة السياحية"];
const priceRanges = ["أي سعر", "أقل من ١٠,٠٠٠", "١٠,٠٠٠ - ٢٠,٠٠٠", "أكثر من ٢٠,٠٠٠"];

export default function LandsPage() {
  const [activityFilter, setActivityFilter] = useState("الكل");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState("جميع الأحياء");
  const [priceFilter, setPriceFilter] = useState("أي سعر");

  const filtered = lands.filter((land) => {
    const matchActivity = activityFilter === "الكل" || land.type.includes(activityFilter) || land.activities.some((a) => a.includes(activityFilter));
    const matchNeighborhood = neighborhoodFilter === "جميع الأحياء" || land.neighborhood === neighborhoodFilter;
    const matchPrice =
      priceFilter === "أي سعر" ||
      (priceFilter === "أقل من ١٠,٠٠٠" && land.price < 10000) ||
      (priceFilter === "١٠,٠٠٠ - ٢٠,٠٠٠" && land.price >= 10000 && land.price <= 20000) ||
      (priceFilter === "أكثر من ٢٠,٠٠٠" && land.price > 20000);
    return matchActivity && matchNeighborhood && matchPrice;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div style={{ backgroundColor: "#0A2342" }} className="py-10 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>/</span>
            <span style={{ color: "#C9A84C" }}>الأراضي المتاحة</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">الأراضي الموسمية المتاحة</h1>
          <p className="text-sm md:text-base text-white/70 leading-7">اكتشف الفرص الاستثمارية الموسمية في قلب منطقة حائل</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="card p-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
            <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#0A2342" }}>
              <SlidersHorizontal size={16} />
              تصفية:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400">
                {activityTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
              <select
                value={neighborhoodFilter}
                onChange={(e) => setNeighborhoodFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400">
                {neighborhoods.map((n) => <option key={n}>{n}</option>)}
              </select>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400">
                {priceRanges.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <span className="text-sm text-gray-500 text-right lg:text-left">{filtered.length} نتيجة</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((land) => {
            const risk = calculateRisk(land.competitionDensity, land.marketDemand, land.costLevel, land.activitySaturation);
            return (
              <div key={land.id} className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                {/* Image area */}
                <div className="h-52 relative bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center border border-white/10 bg-white/8 text-white opacity-85">
                    {getLandPrimaryIcon(land, 40)}
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={land.status === "available" ? "badge-available" : "badge-closed"}>
                      {land.status === "available" ? "متاحة" : land.status === "reserved" ? "محجوزة" : "مغلقة"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "rgba(201,168,76,0.85)" }}>{land.type}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-black text-base leading-tight mb-1" style={{ color: "#0A2342" }}>{land.name}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin size={12} />
                    <span>{land.neighborhood}</span>
                  </div>

                  {/* Specs row */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1"><Ruler size={12} />{land.area.toLocaleString()} م²</span>
                    <span>|</span>
                    <span style={{ color: "#C9A84C" }} className="font-bold">{land.price.toLocaleString()} ريال</span>
                  </div>

                  {/* Activity icons */}
                  <div className="flex gap-1 mb-3 flex-wrap">
                    {land.activities.map((a, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg border border-gray-100 text-gray-600">
                        {getLandActivityIcon(a, 12)} {a}
                      </span>
                    ))}
                  </div>

                  {/* Risk badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: risk.bgColor, color: risk.color }}>
                      <ShieldAlert size={12} /> {risk.label}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link href={`/lands/${land.id}`} className="btn-primary text-sm px-5 py-2 w-full sm:w-auto justify-center">
                      عرض التفاصيل
                      <ArrowLeft size={14} />
                    </Link>
                    <div className="flex gap-1 text-sm justify-end">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: i < Math.round(land.profitabilityScore / 20) ? "#C9A84C" : "#d1d5db" }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-slate-100 text-slate-400">
              <SearchX size={30} />
            </div>
            <p className="text-lg font-semibold">لا توجد نتائج للفلاتر المحددة</p>
            <p className="text-sm mt-2">جرّب تغيير خيارات التصفية</p>
          </div>
        )}
      </div>
    </div>
  );
}
