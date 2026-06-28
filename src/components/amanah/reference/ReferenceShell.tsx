"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import ExecutiveHeader from "@/components/amanah/ExecutiveHeader";
import ExecutiveSidebar from "@/components/amanah/ExecutiveSidebar";
import { useAppStore } from "@/store/appStore";

type PageKey = "overview" | "spatial" | "opportunities" | "approvals" | "partners" | "reports" | "performance" | "settings";

const pageMeta: Record<PageKey, { title: string; subtitle: string; chips: string[] }> = {
  overview: {
    title: "مركز الذكاء الاستثماري",
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
  approvals: {
    title: "الاعتمادات والموافقات",
    subtitle: "مسار موحد لمراجعة الملفات الاستثمارية واعتمادها ونشر القرارات التنفيذية.",
    chips: ["124 اعتماداً", "32 قيد المراجعة", "12 ملفاً متأخراً", "سجل تدقيق موحد"],
  },
  partners: {
    title: "الشركاء والمستثمرون",
    subtitle: "إدارة علاقات المستثمرين والشراكات وربطها بالفرص ذات الأولوية داخل الأمانة.",
    chips: ["256 مستثمراً", "38 شراكة قائمة", "91% نجاح مطابقة", "64 فرصة مرتبطة"],
  },
  reports: {
    title: "التقارير واللوحات",
    subtitle: "مكتبة تنفيذية تجمع التقارير الجاهزة، لوحات المتابعة، وجدولة النشر القيادي.",
    chips: ["18 تقريراً جاهزاً", "12 لوحة تنفيذية", "6 قيد المراجعة", "جدولة أسبوعية"],
  },
  performance: {
    title: "الأداء والمؤشرات",
    subtitle: "قراءة مختصرة لمؤشرات الأداء، توزيع الفرص، وسرعة الاعتماد.",
    chips: ["87% مؤشر عام", "83% جاهزية", "32% تحول فرص", "24 يوم اعتماد"],
  },
  settings: {
    title: "إعدادات الإدارة",
    subtitle: "ضبط هوية مساحة الأمانة، الصلاحيات، التنبيهات، وسياسات العمل الداخلية.",
    chips: ["42 مستخدماً", "4 مستويات وصول", "تدقيق مفعل", "حماية متقدمة"],
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
    <div className="relative isolate min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_16%_0%,rgba(59,71,90,0.58),transparent_28%),radial-gradient(circle_at_76%_20%,rgba(176,139,65,0.14),transparent_32%),linear-gradient(180deg,#101C2C_0%,#0e141a_50%,#080f14_100%)] text-[#dde3eb]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.038)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.038)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20 animate-pulse [animation-duration:10s]" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.06)_38%,transparent_52%),linear-gradient(305deg,transparent_0%,rgba(255,255,255,0.045)_42%,transparent_58%)] opacity-20 animate-pulse [animation-duration:12s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.16),transparent_12%),radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.12),transparent_10%),radial-gradient(circle_at_52%_72%,rgba(255,255,255,0.1),transparent_13%)] opacity-30 blur-3xl animate-pulse [animation-duration:8s]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1920px] px-1 py-1 pb-24 xl:pr-[280px] xl:pb-1">
        <main className="min-w-0 space-y-2 p-2" dir="rtl">
          <ExecutiveHeader title={meta.title} subtitle={meta.subtitle} displayName={displayName} />

          <section className="rounded-lg border border-white/10 bg-[#1a2026]/80 px-3 py-2 shadow-[0_14px_34px_rgba(0,0,0,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav className="flex max-w-full items-center gap-2 overflow-x-auto rounded-lg border border-white/10 bg-[#080f14]/40 p-1.5">
                <Link
                  href="/investment-intelligence"
                  className={`shrink-0 rounded-[0.9rem] px-4 py-2.5 text-sm font-bold ${page === "overview" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/84"}`}
                >
                  المركز التنفيذي
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
                <Link
                  href="/investment-intelligence?tab=approvals"
                  className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold ${page === "approvals" ? "bg-[#eac170] text-[#261900]" : "text-white/84"}`}
                >
                  الاعتمادات
                </Link>
                <Link
                  href="/investment-intelligence?tab=partners"
                  className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold ${page === "partners" ? "bg-[#eac170] text-[#261900]" : "text-white/84"}`}
                >
                  الشركاء
                </Link>
                <Link
                  href="/investment-intelligence?tab=reports"
                  className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold ${page === "reports" ? "bg-[#eac170] text-[#261900]" : "text-white/84"}`}
                >
                  التقارير
                </Link>
                <Link
                  href="/investment-intelligence?tab=performance"
                  className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold ${page === "performance" ? "bg-[#eac170] text-[#261900]" : "text-white/84"}`}
                >
                  الأداء
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
          </section>

          {children}
        </main>

        <ExecutiveSidebar page={page} />
      </div>
    </div>
  );
}
