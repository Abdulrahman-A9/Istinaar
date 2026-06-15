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

const pageMeta: Record<PageKey, { title: string; subtitle: string; navLabel: string }> = {
  overview: {
    title: "الذكاء الاستثماري",
    subtitle: "تحليل يدعم قرارات الاستثمار وصياغة المواقع المثلى",
    navLabel: "توصيات ذكية",
  },
  spatial: {
    title: "التحليل المكاني",
    subtitle: "تحليل مكاني مرئي لدعم قرارات الاستثمار وتحديد المواقع المثلى",
    navLabel: "تحليل الأحياء",
  },
  opportunities: {
    title: "الفرص الاستثمارية",
    subtitle: "إدارة ومتابعة جميع الفرص الاستثمارية في المدينة",
    navLabel: "الفرص الاستثمارية",
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
          ? "bg-[#D0A243] text-[#0B1726] shadow-[0_14px_32px_rgba(208,162,67,0.24)]"
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
  const fullName = currentUser?.fullName ?? "أ. محمد الشمري";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#13263c_0%,#091420_42%,#07111c_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1820px]">
        <main className="min-w-0 flex-1 border-l border-white/7 px-5 pb-8 pt-5">
          <header className="mb-5 rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,19,31,0.94)_0%,rgba(8,20,33,0.98)_100%)] px-7 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Bell size={18} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4A4A] text-[11px] font-black text-white">
                      3
                    </span>
                  </button>
                  <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Mail size={18} />
                  </button>
                </div>
                <div className="border-l border-white/10 pl-6 text-right">
                  <p className="font-['Tajawal'] text-[1.15rem] font-black text-[#E4C982]">{fullName}</p>
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/48">مدير إدارة الاستثمار</p>
                </div>
                <div className="border-l border-white/10 pl-6 text-right">
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/52">الأربعاء 05/01/1448 هـ</p>
                  <p className="font-['Tajawal'] text-[16px] font-bold text-white/86">10:30 AM</p>
                </div>
              </div>

              <div className="flex min-w-0 items-start justify-end gap-8">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button className="rounded-[1rem] bg-[#D0A243] px-6 py-3 text-sm font-black text-[#0B1726]">إدارة الأمانة</button>
                    <button className="rounded-[1rem] border border-white/12 px-6 py-3 text-sm font-semibold text-white/84">الحساب</button>
                  </div>
                </div>
                <div className="min-w-0 text-right">
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/42">استنار | منصة الذكاء الاستثماري ودعم القرار</p>
                  <h1 className="mt-2 font-['Tajawal'] text-[2.3rem] font-black leading-none text-white">{meta.title}</h1>
                  <p className="mt-2 font-['IBM_Plex_Sans_Arabic'] text-[14px] text-white/54">{meta.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <nav className="flex flex-wrap items-center gap-2 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-2">
                <Link href="/investment-intelligence" className={`rounded-[0.95rem] px-8 py-3 text-sm font-bold ${page === "overview" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/88"}`}>لوحة الذكاء الاستثماري</Link>
                <Link href="/investment-intelligence?tab=opportunities" className={`rounded-[0.95rem] px-8 py-3 text-sm font-bold ${page === "opportunities" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/88"}`}>الفرص</Link>
                <Link href="/investment-intelligence?tab=spatial" className={`rounded-[0.95rem] px-8 py-3 text-sm font-bold ${page === "spatial" ? "bg-[#D0A243] text-[#0B1726]" : "text-white/88"}`}>الأراضي</Link>
                <span className="rounded-[0.95rem] px-8 py-3 text-sm font-bold text-white/88">الرئيسية</span>
              </nav>
            </div>
          </header>

          {children}
        </main>

        <aside className="w-[340px] shrink-0 px-5 pb-8 pt-5">
          <div className="sticky top-5 space-y-5">
            <section className="rounded-[1.85rem] border border-white/8 bg-[linear-gradient(180deg,#081522_0%,#0B1D30_100%)] px-6 py-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-[#D0A243]/35 bg-[radial-gradient(circle_at_top,#f0e0b7_0%,#d0a243_100%)] text-[#0B1726]">
                  <Sparkles size={22} />
                </div>
                <div className="text-right">
                  <h2 className="font-['Tajawal'] text-[2.15rem] font-black text-white">استنار</h2>
                  <p className="mt-2 font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/46">منصة الذكاء الاستثماري ودعم القرار</p>
                </div>
              </div>

              <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-5 py-5 text-right">
                <p className="font-['Tajawal'] text-[1.35rem] font-black text-white">المركز التنفيذي</p>
                <p className="mt-2 font-['IBM_Plex_Sans_Arabic'] text-[13px] text-white/42">المركز التنفيذي</p>
              </div>

              <div className="mt-5 border-t border-white/8 pt-5">
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

              <div className="mt-5 space-y-3 border-t border-white/8 pt-5">
                <button className="flex w-full items-center justify-between rounded-[1.15rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-right">
                  <span>
                    <span className="block text-base font-black text-white">تسجيل خروج</span>
                    <span className="mt-1 block text-[12px] text-white/40">العودة للبوابة الرئيسية</span>
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.03]">
                    <LogOut size={18} />
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
