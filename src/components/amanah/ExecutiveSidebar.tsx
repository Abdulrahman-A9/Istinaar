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

type ExecutiveSidebarPage = "admin" | "overview" | "spatial" | "opportunities";

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
      className={`flex items-center justify-between rounded-[1rem] px-4 py-3 transition ${
        active
          ? "bg-[#D0A243] text-[#09121D] shadow-[0_18px_38px_rgba(208,162,67,0.22)]"
          : "border border-white/8 bg-white/[0.02] text-white/82 hover:bg-white/[0.04]"
      }`}
    >
      <div className="text-right">
        <p className={`text-[14px] font-bold ${active ? "text-[#09121D]" : "text-white"}`}>{label}</p>
        <p className={`mt-1 text-[11px] ${active ? "text-[#09121D]/70" : "text-white/40"}`}>{hint}</p>
      </div>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-[0.95rem] border ${
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
    <aside
      className="sticky top-3 hidden h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[1.65rem] border border-white/8 bg-[linear-gradient(180deg,#091624_0%,#0B1C2F_100%)] px-5 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] xl:block"
      dir="rtl"
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.2rem] bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#D0A243_100%)] text-[#0B1726] shadow-[0_16px_30px_rgba(208,162,67,0.2)]">
            <Sparkles size={26} />
          </div>
          <div className="text-right">
            <h2 className="font-['Tajawal'] text-[2rem] font-black text-white">استنار</h2>
            <p className="mt-1.5 text-[11px] leading-6 text-white/44">منصة الذكاء الاستثماري ودعم القرار</p>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-4 text-right">
          <p className="font-['Tajawal'] text-[1.35rem] font-black text-white">المركز التنفيذي</p>
          <p className="mt-2 text-[12px] leading-7 text-white/44">لوحة تشغيل مختصرة للقيادة والمتابعة الداخلية</p>
        </div>

        <div className="border-t border-white/8 pt-4">
          <p className="mb-3 text-right text-[11px] font-bold text-white/38">المسارات الرئيسية</p>
          <div className="space-y-2">
            <SidebarLink href="/admin" label="الرئيسية" hint="ملخص التشغيل اليومي" icon={<LayoutDashboard size={18} />} active={page === "admin"} />
            <SidebarLink href="/investment-intelligence" label="الذكاء الاستثماري" hint="القراءة التنفيذية" icon={<Sparkles size={18} />} active={page === "overview"} />
            <SidebarLink href="/investment-intelligence?tab=spatial" label="التحليل المكاني" hint="الأحياء والأولويات" icon={<MapPin size={18} />} active={page === "spatial"} />
            <SidebarLink href="/investment-intelligence?tab=opportunities" label="الفرص الاستثمارية" hint="السجل والجاهزية" icon={<BriefcaseBusiness size={18} />} active={page === "opportunities"} />
          </div>
        </div>

        <div className="border-t border-white/8 pt-4">
          <p className="mb-3 text-right text-[11px] font-bold text-white/38">الإدارة والمتابعة</p>
          <div className="space-y-2">
            <SidebarLink href="#" label="الاعتمادات والموافقات" hint="الرفع والاعتماد" icon={<FileCheck2 size={18} />} />
            <SidebarLink href="#" label="الشركاء والمستثمرون" hint="الأطراف ذات العلاقة" icon={<Users size={18} />} />
            <SidebarLink href="#" label="التقارير واللوحات" hint="العروض التنفيذية" icon={<LineChart size={18} />} />
            <SidebarLink href="#" label="الإعدادات" hint="التفضيلات والصلاحيات" icon={<Settings size={18} />} />
          </div>
        </div>

        <div className="border-t border-white/8 pt-4">
          <p className="mb-3 text-right text-[11px] font-bold text-white/38">الخدمات السريعة</p>
          <div className="space-y-2">
            <SidebarLink href="#" label="مركز المساعدة" hint="الدعم والمساندة" icon={<HelpCircle size={18} />} />
            <SidebarLink href="#" label="تسجيل الخروج" hint="العودة للبوابة" icon={<LogOut size={18} />} />
          </div>
        </div>

        <p className="pt-1 text-center text-[11px] leading-6 text-white/30">
          © 2024 استنار
          <br />
          جميع الحقوق محفوظة
        </p>
      </div>
    </aside>
  );
}
