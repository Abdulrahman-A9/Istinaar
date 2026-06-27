"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  FileCheck2,
  Home,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  MapPin,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? <button aria-label="إغلاق القائمة" className="fixed inset-0 z-40 bg-[#04101C]/70 backdrop-blur-sm xl:hidden" onClick={() => setIsOpen(false)} /> : null}
      <button
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={isOpen}
        className="fixed right-3 top-3 z-[60] flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-white/12 bg-[#102B43]/95 text-[#E5C876] shadow-[0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur xl:hidden"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-[min(88vw,320px)] overflow-y-auto overscroll-contain border-l border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.09),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(58,111,160,0.13),transparent_24%),linear-gradient(180deg,#1A3A54_0%,#16324A_24%,#122B42_52%,#10263C_76%,#0D2235_100%)] px-3 py-5 shadow-[-18px_0_48px_rgba(3,12,22,0.22)] transition-transform duration-300 ease-out xl:z-30 xl:w-[286px] xl:translate-x-0 2xl:w-[320px] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        dir="rtl"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setIsOpen(false);
        }}
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
            <SidebarLink href="/" label="الرئيسية العامة" hint="العودة لواجهة المنصة" icon={<Home size={18} />} />
            <SidebarLink href="/account" label="تسجيل الخروج" hint="إدارة الحساب" icon={<LogOut size={18} />} />
          </div>
        </div>

        <p className="pt-1 text-center text-[10px] leading-5 text-white/30">
          © 2024 استنار
          <br />
          جميع الحقوق محفوظة
        </p>
        </div>
      </aside>

    </>
  );
}
