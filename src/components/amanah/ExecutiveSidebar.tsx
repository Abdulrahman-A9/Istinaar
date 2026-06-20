"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  FileCheck2,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  LogOut,
  MapPin,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

type ExecutiveSidebarPage = "admin" | "overview" | "spatial" | "opportunities" | "approvals" | "partners" | "reports" | "settings";

function SidebarLink({
  href,
  label,
  hint,
  icon,
  active,
}: {
  href: string;
  label: string;
  hint: string;
  icon: ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-[0.9rem] px-3 py-2.5 transition ${
        active
          ? "bg-[#D0A243] text-[#09121D] shadow-[0_18px_38px_rgba(208,162,67,0.22)]"
          : "border border-white/8 bg-white/[0.02] text-white/82 hover:bg-white/[0.04]"
      }`}
    >
      <div className="text-right">
        <p className={`text-[12px] font-bold ${active ? "text-[#09121D]" : "text-white"}`}>{label}</p>
        <p className={`mt-0.5 hidden text-[10px] 2xl:block ${active ? "text-[#09121D]/70" : "text-white/40"}`}>{hint}</p>
      </div>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.85rem] border ${
          active ? "border-[#0B1726]/10 bg-[#0B1726]/6" : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {icon}
      </span>
    </Link>
  );
}

export default function ExecutiveSidebar({ page }: { page: ExecutiveSidebarPage }) {
  return (
    <>
      <aside
        className="fixed inset-y-3 right-3 z-30 hidden w-[286px] overflow-y-auto overscroll-contain rounded-[1.4rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.08),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(58,111,160,0.12),transparent_24%),linear-gradient(180deg,#0C1C2D_0%,#10253A_100%)] px-3 py-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)] xl:block 2xl:w-[320px]"
        dir="rtl"
      >
        <div className="space-y-3.5">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#D0A243_100%)] text-[#0B1726] shadow-[0_16px_30px_rgba(208,162,67,0.2)]">
            <Sparkles size={22} />
          </div>
          <div className="text-right">
            <h2 className="font-['Tajawal'] text-[1.55rem] font-black text-white">استنار</h2>
            <p className="mt-0.5 text-[10px] leading-5 text-white/44">منصة الذكاء الاستثماري ودعم القرار</p>
          </div>
        </div>

        <div className="rounded-[1rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-3 py-3 text-right">
          <p className="font-['Tajawal'] text-[1.08rem] font-black text-white">المركز التنفيذي</p>
          <p className="mt-1 text-[10px] leading-6 text-white/44">لوحة متابعة القيادة الداخلية</p>
        </div>

        <div className="border-t border-white/8 pt-3">
          <p className="mb-2 text-right text-[10px] font-bold text-white/38">المسارات الرئيسية</p>
          <div className="space-y-1.5">
            <SidebarLink href="/admin" label="الرئيسية" hint="ملخص التشغيل اليومي" icon={<LayoutDashboard size={18} />} active={page === "admin"} />
            <SidebarLink href="/investment-intelligence" label="الذكاء الاستثماري" hint="القراءة التنفيذية" icon={<Sparkles size={18} />} active={page === "overview"} />
            <SidebarLink href="/investment-intelligence?tab=spatial" label="التحليل المكاني" hint="الأحياء والأولويات" icon={<MapPin size={18} />} active={page === "spatial"} />
            <SidebarLink href="/investment-intelligence?tab=opportunities" label="الفرص الاستثمارية" hint="السجل والجاهزية" icon={<BriefcaseBusiness size={18} />} active={page === "opportunities"} />
          </div>
        </div>

        <div className="border-t border-white/8 pt-3">
          <p className="mb-2 text-right text-[10px] font-bold text-white/38">الإدارة والمتابعة</p>
          <div className="space-y-1.5">
            <SidebarLink href="/investment-intelligence?tab=approvals" label="الاعتمادات والموافقات" hint="الرفع والاعتماد" icon={<FileCheck2 size={18} />} active={page === "approvals"} />
            <SidebarLink href="/investment-intelligence?tab=partners" label="الشركاء والمستثمرون" hint="الأطراف ذات العلاقة" icon={<Users size={18} />} active={page === "partners"} />
            <SidebarLink href="/investment-intelligence?tab=reports" label="التقارير واللوحات" hint="العروض التنفيذية" icon={<LineChart size={18} />} active={page === "reports"} />
            <SidebarLink href="/investment-intelligence?tab=settings" label="الإعدادات" hint="التفضيلات والصلاحيات" icon={<Settings size={18} />} active={page === "settings"} />
          </div>
        </div>

        <div className="border-t border-white/8 pt-3">
          <p className="mb-2 text-right text-[10px] font-bold text-white/38">الخدمات السريعة</p>
          <div className="space-y-1.5">
            <SidebarLink href="#" label="مركز المساعدة" hint="الدعم والمساندة" icon={<HelpCircle size={18} />} />
            <SidebarLink href="#" label="تسجيل الخروج" hint="العودة للبوابة" icon={<LogOut size={18} />} />
          </div>
        </div>

        <p className="pt-1 text-center text-[10px] leading-5 text-white/30">
          © 2024 استنار
          <br />
          جميع الحقوق محفوظة
        </p>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-40 flex gap-1 overflow-x-auto rounded-[1.15rem] border border-white/10 bg-[#0B1C2E]/95 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur xl:hidden" dir="rtl">
        {[
          { href: "/admin", label: "الرئيسية", icon: <LayoutDashboard size={17} />, active: page === "admin" },
          { href: "/investment-intelligence", label: "الذكاء", icon: <Sparkles size={17} />, active: page === "overview" },
          { href: "/investment-intelligence?tab=spatial", label: "المكاني", icon: <MapPin size={17} />, active: page === "spatial" },
          { href: "/investment-intelligence?tab=opportunities", label: "الفرص", icon: <BriefcaseBusiness size={17} />, active: page === "opportunities" },
          { href: "/investment-intelligence?tab=approvals", label: "الاعتمادات", icon: <FileCheck2 size={17} />, active: page === "approvals" },
          { href: "/investment-intelligence?tab=partners", label: "الشركاء", icon: <Users size={17} />, active: page === "partners" },
          { href: "/investment-intelligence?tab=reports", label: "التقارير", icon: <LineChart size={17} />, active: page === "reports" },
          { href: "/investment-intelligence?tab=settings", label: "الإعدادات", icon: <Settings size={17} />, active: page === "settings" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-w-[68px] shrink-0 flex-col items-center gap-1 rounded-[0.85rem] px-2 py-2 text-[10px] font-bold ${item.active ? "bg-[#D0A243] text-[#09121D]" : "text-white/68"}`}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
