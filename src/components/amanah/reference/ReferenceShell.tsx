"use client";

import Link from "next/link";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPinned,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAppStore } from "@/store/appStore";

type PageKey = "overview" | "spatial" | "opportunities";

const pageMeta: Record<PageKey, { title: string; subtitle: string }> = {
  overview: {
    title: "الذكاء الاستثماري",
    subtitle: "تحليل يدعم قرارات الاستثمار وصياغة المواقع المثلى",
  },
  spatial: {
    title: "التحليل المكاني",
    subtitle: "تحليل مكاني مرئي لدعم قرارات الاستثمار وتحديد نطاق الأولوية",
  },
  opportunities: {
    title: "الفرص الاستثمارية",
    subtitle: "إدارة ومتابعة جميع الفرص الاستثمارية في المدينة",
  },
};

function SidebarItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-[1rem] px-4 py-3 transition ${
        active
          ? "bg-[#D0A243] text-[#0B1726] shadow-[0_14px_28px_rgba(208,162,67,0.22)]"
          : "text-white/84 hover:bg-white/[0.04]"
      }`}
    >
      <span className="text-sm font-semibold">{label}</span>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-[0.95rem] border ${
          active ? "border-[#0B1726]/10 bg-[#0B1726]/5" : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {icon}
      </span>
    </Link>
  );
}

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#13263c_0%,#091420_42%,#07111c_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1760px]">
        <main className="min-w-0 flex-1 border-l border-white/7 px-4 pb-6 pt-4 xl:px-5">
          <header className="mb-4 rounded-[1.65rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,19,31,0.94)_0%,rgba(8,20,33,0.98)_100%)] px-6 py-5 shadow-[0_20px_48px_rgba(0,0,0,0.24)]">
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-3">
                  <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Bell size={17} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4A4A] text-[11px] font-black text-white">
                      3
                    </span>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Mail size={17} />
                  </button>
                </div>
                <div className="border-l border-white/10 pl-5 text-right">
                  <p className="font-['Tajawal'] text-[1.05rem] font-black text-[#E4C982]">{displayName}</p>
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/48">مدير إدارة الاستثمار</p>
                </div>
                <div className="border-l border-white/10 pl-5 text-right">
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/52">الأربعاء 05/01/1448 هـ</p>
                  <p className="font-['Tajawal'] text-[15px] font-bold text-white/86">10:30 AM</p>
                </div>
              </div>

              <div className="flex min-w-0 items-start justify-end gap-6">
                <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-3 py-3">
                  <div className="flex items-center gap-3">
                    <button className="rounded-[0.95rem] bg-[#D0A243] px-5 py-2.5 text-sm font-black text-[#0B1726]">إدارة الأمانة</button>
                    <button className="rounded-[0.95rem] border border-white/12 px-5 py-2.5 text-sm font-semibold text-white/84">الحساب</button>
                  </div>
                </div>
                <div className="min-w-0 text-right">
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/42">استنار | منصة الذكاء الاستثماري ودعم القرار</p>
                  <h1 className="mt-2 font-['Tajawal'] text-[2.1rem] font-black leading-none text-white">{meta.title}</h1>
                  <p className="mt-2 font-['IBM_Plex_Sans_Arabic'] text-[13px] text-white/54">{meta.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <nav className="flex flex-wrap items-center gap-2 rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-2">
                <Link
                  href="/investment-intelligence"
                  className={`rounded-[0.9rem] px-7 py-2.5 text-sm font-bold ${page === "overview" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/88"}`}
                >
                  لوحة الذكاء الاستثماري
                </Link>
                <Link
                  href="/investment-intelligence?tab=opportunities"
                  className={`rounded-[0.9rem] px-7 py-2.5 text-sm font-bold ${page === "opportunities" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/88"}`}
                >
                  الفرص
                </Link>
                <Link
                  href="/investment-intelligence?tab=spatial"
                  className={`rounded-[0.9rem] px-7 py-2.5 text-sm font-bold ${page === "spatial" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/88"}`}
                >
                  الأراضي
                </Link>
                <span className="rounded-[0.9rem] px-7 py-2.5 text-sm font-bold text-white/88">الرئيسية</span>
              </nav>
            </div>
          </header>

          {children}
        </main>

        <aside className="w-[300px] shrink-0 px-4 pb-6 pt-4">
          <div className="sticky top-4 space-y-4">
            <section className="rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,#081522_0%,#0B1D30_100%)] px-5 py-5 shadow-[0_20px_48px_rgba(0,0,0,0.24)]">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#D0A243]/35 bg-[radial-gradient(circle_at_top,#f0e0b7_0%,#d0a243_100%)] text-[#0B1726]">
                  <Sparkles size={20} />
                </div>
                <div className="text-right">
                  <h2 className="font-['Tajawal'] text-[1.95rem] font-black text-white">استنار</h2>
                  <p className="mt-1 font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/46">منصة الذكاء الاستثماري ودعم القرار</p>
                </div>
              </div>

              <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
                <p className="font-['Tajawal'] text-[1.2rem] font-black text-white">المركز التنفيذي</p>
                <p className="mt-1 font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/42">لوحات مرجعية للعرض الداخلي والقراءة التنفيذية</p>
              </div>

              <div className="mt-4 border-t border-white/8 pt-4">
                <div className="space-y-2">
                  <SidebarItem href="/admin" label="لوحة القيادة" icon={<LayoutDashboard size={18} />} active={false} />
                  <SidebarItem href="/investment-intelligence" label="الذكاء الاستثماري" icon={<Sparkles size={18} />} active={page === "overview"} />
                  <SidebarItem href="/investment-intelligence?tab=spatial" label="التحليل المكاني" icon={<MapPinned size={18} />} active={page === "spatial"} />
                  <SidebarItem href="/investment-intelligence?tab=opportunities" label="الفرص الاستثمارية" icon={<Target size={18} />} active={page === "opportunities"} />
                  <SidebarItem href="#" label="الاعتمادات والموافقات" icon={<ClipboardList size={18} />} />
                  <SidebarItem href="#" label="الشركاء والمستثمرون" icon={<Building2 size={18} />} />
                  <SidebarItem href="#" label="الطلبات والاعتراضات" icon={<FileText size={18} />} />
                  <SidebarItem href="#" label="التقارير واللوحات" icon={<BriefcaseBusiness size={18} />} />
                  <SidebarItem href="#" label="الأداء والمؤشرات" icon={<ShieldCheck size={18} />} />
                  <SidebarItem href="#" label="الإعدادات" icon={<Settings size={18} />} />
                </div>
              </div>

              <div className="mt-4 border-t border-white/8 pt-4">
                <button className="flex w-full items-center justify-between rounded-[1.05rem] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-right">
                  <span>
                    <span className="block text-base font-black text-white">تسجيل خروج</span>
                    <span className="mt-1 block text-[12px] text-white/40">العودة للبوابة الرئيسية</span>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-white/10 bg-white/[0.03]">
                    <LogOut size={17} />
                  </span>
                </button>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}
