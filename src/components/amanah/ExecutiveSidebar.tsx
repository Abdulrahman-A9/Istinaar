"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  BriefcaseBusiness,
  FileCheck2,
  Home,
  LayoutDashboard,
  LineChart,
  LogOut,
  MapPin,
  Menu,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  executiveShellItems,
  type ExecutiveShellItem,
  type ExecutiveShellPage,
} from "@/components/amanah/executiveShellConfig";
import { useAppStore } from "@/store/appStore";

function resolveIcon(icon: ExecutiveShellItem["icon"]): ReactNode {
  switch (icon) {
    case "dashboard":
      return <LayoutDashboard size={18} />;
    case "insights":
      return <Sparkles size={18} />;
    case "map":
      return <MapPin size={18} />;
    case "monetization_on":
      return <BriefcaseBusiness size={18} />;
    case "fact_check":
      return <FileCheck2 size={18} />;
    case "handshake":
      return <Users size={18} />;
    case "analytics":
      return <LineChart size={18} />;
    case "monitoring":
      return <Activity size={18} />;
    case "settings":
      return <Settings size={18} />;
    default:
      return <Home size={18} />;
  }
}

function SidebarLink({
  item,
  active,
}: {
  item: ExecutiveShellItem;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`group flex min-h-[58px] items-center justify-between gap-3 rounded-[18px] border px-3 py-2.5 transition-all duration-200 ${
        active
          ? "border-[#eac170]/70 bg-[linear-gradient(135deg,#eac170_0%,#b08b41_100%)] text-[#261900] shadow-[0_18px_34px_rgba(176,139,65,0.24)]"
          : "border-white/10 bg-white/[0.03] text-white/82 hover:-translate-x-0.5 hover:border-[#eac170]/24 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      <div className="min-w-0 text-right">
        <p className={`text-[13px] font-extrabold leading-5 ${active ? "text-[#261900]" : "text-white"}`}>{item.label}</p>
        <p className={`mt-0.5 text-[10px] leading-5 ${active ? "text-[#261900]/70" : "text-white/42"}`}>{item.hint}</p>
      </div>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border ${
          active ? "border-[#261900]/10 bg-[#261900]/5" : "border-white/10 bg-white/[0.04]"
        }`}
      >
        {resolveIcon(item.icon)}
      </span>
    </Link>
  );
}

export default function ExecutiveSidebar({ page }: { page: ExecutiveShellPage }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const logoutAccount = useAppStore((state) => state.logoutAccount);
  const primaryItems = useMemo(
    () => executiveShellItems.filter((item) => item.group === "primary"),
    [],
  );
  const managementItems = useMemo(
    () => executiveShellItems.filter((item) => item.group === "management"),
    [],
  );

  const handleLogout = () => {
    logoutAccount();
    setIsOpen(false);
    router.push("/account");
  };

  return (
    <>
      {isOpen ? (
        <button
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-[#04101c]/72 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <button
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={isOpen}
        className="fixed right-3 top-3 z-[70] flex h-11 w-11 items-center justify-center rounded-2xl border border-white/14 bg-[linear-gradient(135deg,#eac170_0%,#b08b41_100%)] text-[#261900] shadow-[0_14px_30px_rgba(0,0,0,0.28)] lg:hidden"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        dir="rtl"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(88vw,280px)] flex-col overflow-y-auto border-l border-white/10 bg-[radial-gradient(circle_at_60%_0%,rgba(234,193,112,0.1),transparent_22%),linear-gradient(135deg,rgba(6,16,27,0.98),rgba(12,24,38,0.96))] px-4 py-6 shadow-[-24px_0_54px_rgba(2,9,16,0.36)] transition-transform duration-300 ease-out lg:z-30 lg:w-[280px] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setIsOpen(false);
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-5">
          <div className="grid h-[52px] w-[52px] place-items-center rounded-[18px] bg-[radial-gradient(circle_at_40%_20%,#ffedbd_0%,#d1a247_72%)] text-[#06101b] shadow-[0_18px_34px_rgba(209,162,71,0.22)]">
            <Sparkles size={22} />
          </div>
          <div className="text-right">
            <h2 className="text-[26px] font-black leading-none text-white">استنار</h2>
            <p className="mt-2 text-[11px] leading-6 text-white/50">منصة الذكاء الاستثماري ودعم القرار</p>
          </div>
        </div>

        <div className="mt-4 rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] px-4 py-5 text-right">
          <strong className="block text-[20px] font-black leading-8 text-white">المركز التنفيذي</strong>
          <span className="mt-2 block text-[11px] leading-6 text-white/48">لوحة القيادة والمتابعة الداخلية</span>
        </div>

        <div className="mt-4 border-t border-white/8 pt-4">
          <p className="mb-2 text-right text-[11px] font-bold text-white/42">المسارات الرئيسية</p>
          <div className="space-y-2">
            {primaryItems.map((item) => (
              <SidebarLink key={item.page} item={item} active={item.page === page} />
            ))}
          </div>
        </div>

        <div className="mt-4 border-t border-white/8 pt-4">
          <p className="mb-2 text-right text-[11px] font-bold text-white/42">الإدارة والمتابعة</p>
          <div className="space-y-2">
            {managementItems.map((item) => (
              <SidebarLink key={item.page} item={item} active={item.page === page} />
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-white/8 pt-4">
          <div className="space-y-2">
            <Link
              href="/"
              className="flex min-h-[54px] items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-3 py-2.5 text-white/82 transition-all duration-200 hover:-translate-x-0.5 hover:border-[#eac170]/24 hover:bg-white/[0.06] hover:text-white"
            >
              <div className="text-right">
                <p className="text-[13px] font-extrabold text-white">الرئيسية العامة</p>
                <p className="mt-0.5 text-[10px] text-white/42">العودة إلى واجهة المنصة</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04]">
                <Home size={18} />
              </span>
            </Link>

            <Link
              href="/account"
              className="flex min-h-[54px] items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-3 py-2.5 text-white/82 transition-all duration-200 hover:-translate-x-0.5 hover:border-[#eac170]/24 hover:bg-white/[0.06] hover:text-white"
            >
              <div className="text-right">
                <p className="text-[13px] font-extrabold text-white">إدارة الحساب</p>
                <p className="mt-0.5 text-[10px] text-white/42">الملف الشخصي وإعدادات الدخول</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04]">
                <Settings size={18} />
              </span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-[54px] w-full items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-3 py-2.5 text-white/82 transition-all duration-200 hover:-translate-x-0.5 hover:border-[#ff8f8f]/24 hover:bg-white/[0.06] hover:text-white"
            >
              <div className="text-right">
                <p className="text-[13px] font-extrabold text-white">تسجيل الخروج</p>
                <p className="mt-0.5 text-[10px] text-white/42">إنهاء الجلسة الحالية والعودة للحساب</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04]">
                <LogOut size={18} />
              </span>
            </button>
          </div>

          <p className="mt-5 text-center text-[10px] leading-6 text-white/32">
            © 2024 استنار
            <br />
            جميع الحقوق محفوظة
          </p>
        </div>
      </aside>
    </>
  );
}
