"use client";

import Link from "next/link";
import { Bell, Mail, UserCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import ExecutiveSidebar from "@/components/amanah/ExecutiveSidebar";
import { useAppStore } from "@/store/appStore";

type PageKey = "overview" | "spatial" | "opportunities";

const pageMeta: Record<PageKey, { title: string; subtitle: string; chips: string[] }> = {
  overview: {
    title: "لوحة الذكاء الاستثماري",
    subtitle: "قراءة تنفيذية موحدة تجمع التنبيهات والقرار والأثر الاقتصادي في مساحة واحدة.",
    chips: ["7 تبويبات تشغيلية", "قراءة قرار فورية", "أولوية حي اليوم", "دليل المنطقة"],
  },
  spatial: {
    title: "التحليل المكاني",
    subtitle: "خريطة أولويات مكانية مدعومة بطبقات جاهزية وجاذبية وفرص قابلة للرفع التنفيذي.",
    chips: ["6 طبقات خريطة", "قياس الجاذبية", "جاهزية الحي", "توجيه التوسع"],
  },
  opportunities: {
    title: "الفرص الاستثمارية",
    subtitle: "لوحة إدارة الفرص مع سجل موحد للجاهزية والقيمة والعائد والمسار الإجرائي.",
    chips: ["24 فرصة فعالة", "فلترة تشغيلية", "حالة الطرح", "ملخص القيمة"],
  },
};

export default function ReferenceShell({
  page,
  children,
}: {
  page: PageKey;
  children: ReactNode;
}) {
  const currentUser = useAppStore((state) => state.currentUser);
  const meta = pageMeta[page];
  const displayName = currentUser?.fullName || "أ. محمد الشمري";

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_top_left,rgba(94,145,194,0.26),transparent_24%),radial-gradient(circle_at_top_right,rgba(61,122,176,0.24),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(42,96,144,0.18),transparent_34%),linear-gradient(180deg,#1A3A54_0%,#16324A_24%,#122B42_52%,#10263C_76%,#0D2235_100%)] text-[#0B1726]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.038)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.038)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20 animate-pulse [animation-duration:10s]" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.06)_38%,transparent_52%),linear-gradient(305deg,transparent_0%,rgba(255,255,255,0.045)_42%,transparent_58%)] opacity-20 animate-pulse [animation-duration:12s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.16),transparent_12%),radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.12),transparent_10%),radial-gradient(circle_at_52%_72%,rgba(255,255,255,0.1),transparent_13%)] opacity-30 blur-3xl animate-pulse [animation-duration:8s]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1880px] px-3 py-3 pb-24 xl:pr-[312px] xl:pb-3 2xl:pr-[346px]">
        <main className="min-w-0 space-y-3" dir="rtl">
          <header className="rounded-[1.45rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,19,31,0.94)_0%,rgba(9,23,38,0.98)_100%)] px-5 py-4 shadow-[0_18px_44px_rgba(0,0,0,0.2)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-right">
                <h1 className="font-['Tajawal'] text-[1.7rem] font-black leading-none text-white sm:text-[2rem] 2xl:text-[2.15rem]">{meta.title}</h1>
                <p className="mt-2 max-w-3xl text-[13px] leading-7 text-white/56">{meta.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="border-r border-white/10 pr-4 text-right">
                  <p className="font-['Tajawal'] text-[0.98rem] font-black text-[#E4C982]">{displayName}</p>
                  <p className="mt-1 text-[12px] text-white/44">مدير إدارة الاستثمار</p>
                </div>
                <div className="border-r border-white/10 pr-4 text-right">
                  <p className="text-[12px] text-white/52">الأربعاء 05/01/1448 هـ</p>
                  <p className="mt-1 font-['Tajawal'] text-[1.1rem] font-black text-white">10:30 AM</p>
                </div>
                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Mail size={18} />
                </button>
                <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Bell size={18} />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF434A] text-[11px] font-black text-white">
                    3
                  </span>
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#C89C45_100%)] text-[#0B1726] shadow-[0_14px_28px_rgba(208,162,67,0.22)]">
                  <UserCircle2 size={20} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <nav className="flex max-w-full items-center gap-2 overflow-x-auto rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-2">
                <Link
                  href="/investment-intelligence"
                  className={`shrink-0 rounded-[0.9rem] px-4 py-2.5 text-sm font-bold ${page === "overview" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/84"}`}
                >
                  لوحة الذكاء الاستثماري
                </Link>
                <Link
                  href="/investment-intelligence?tab=spatial"
                  className={`shrink-0 rounded-[0.9rem] px-4 py-2.5 text-sm font-bold ${page === "spatial" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/84"}`}
                >
                  التحليل المكاني
                </Link>
                <Link
                  href="/investment-intelligence?tab=opportunities"
                  className={`shrink-0 rounded-[0.9rem] px-4 py-2.5 text-sm font-bold ${page === "opportunities" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/84"}`}
                >
                  الفرص الاستثمارية
                </Link>
              </nav>

              <div className="hidden flex-wrap justify-end gap-2 2xl:flex">
                {meta.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] font-semibold text-white/74"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {children}
        </main>

        <ExecutiveSidebar page={page} />
      </div>
    </div>
  );
}
