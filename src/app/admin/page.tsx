"use client";

import Link from "next/link";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  FileCheck2,
  FileText,
  Handshake,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MessageSquarePlus,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCircle2,
  Users,
} from "lucide-react";
import { AdminReferenceDashboard } from "@/components/amanah/reference/ReferenceViews";
import { useAppStore } from "@/store/appStore";

function UtilityRailButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-[68px] w-[68px] items-center justify-center rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(16,35,56,0.96)_0%,rgba(9,22,36,0.98)_100%)] text-white/78 shadow-[0_18px_38px_rgba(0,0,0,0.22)] transition hover:border-[#D0A243]/30 hover:text-[#E8C97C]">
      {icon}
    </button>
  );
}

function SidebarLink({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-[1.05rem] px-4 py-3 transition ${
        active
          ? "bg-[#D0A243] text-[#09121D] shadow-[0_18px_38px_rgba(208,162,67,0.22)]"
          : "text-white/84 hover:bg-white/[0.04]"
      }`}
    >
      <span className="text-[15px] font-bold">{label}</span>
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-[1rem] border ${
          active ? "border-[#0B1726]/10 bg-[#0B1726]/8" : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {icon}
      </span>
    </Link>
  );
}

function SupportShortcut({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.05rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-[#D0A243]/28 bg-white/[0.03] text-[#D7B45E]">
          {icon}
        </span>
        <div>
          <p className="font-['Tajawal'] text-[1rem] font-black text-white">{title}</p>
          <p className="mt-1.5 text-[12px] text-white/46">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const currentUser = useAppStore((state) => state.currentUser);

  if (!currentUser || currentUser.role !== "authority") {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#13263c_0%,#091420_42%,#07111c_100%)] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(8,19,31,0.98)_100%)] p-10 text-right shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
          <p className="font-['IBM_Plex_Sans_Arabic'] text-sm text-[#D8B46A]">غرفة قيادة الاستثمار الحضري</p>
          <h1 className="mt-3 font-['Tajawal'] text-[3rem] font-black text-white">الوصول يتطلب حساب أمانة مخول</h1>
          <p className="mt-5 max-w-3xl text-base leading-9 text-white/68">
            صفحة الأمانة مخصصة للحسابات الداخلية فقط. ادخل من حساب جهة الأمانة ثم افتح لوحة الإدارة
            والذكاء الاستثماري.
          </p>
          <div className="mt-8 flex justify-end gap-3">
            <Link href="/account" className="rounded-[1rem] border border-white/10 px-6 py-3 text-sm font-semibold text-white/84">
              الحساب الموحد
            </Link>
            <Link href="/investment-intelligence" className="rounded-[1rem] bg-[#C79C45] px-6 py-3 text-sm font-black text-[#0B1726]">
              لوحة الذكاء الاستثماري
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#13263B_0%,#09131E_42%,#06101A_100%)] text-white">
      <div className="mx-auto grid max-w-[1880px] grid-cols-1 gap-3 px-3 py-3 xl:grid-cols-[320px_minmax(0,1fr)_74px]">
        <aside className="sticky top-3 hidden h-[calc(100vh-1.5rem)] overflow-hidden rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,#0A1828_0%,#0B1C2F_100%)] px-5 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)] xl:flex xl:flex-col">
          <div className="flex items-start justify-between">
            <div className="flex h-15 w-15 items-center justify-center rounded-[1.1rem] bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#D0A243_100%)] text-[#0B1726] shadow-[0_14px_28px_rgba(208,162,67,0.22)]">
              <Sparkles size={24} />
            </div>
            <div className="text-right">
              <h2 className="font-['Tajawal'] text-[2.1rem] font-black text-white">استنار</h2>
              <p className="mt-1.5 text-[12px] leading-6 text-white/46">منصة الذكاء الاستثماري ودعم القرار</p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.35rem] border border-white/8 bg-white/[0.03] px-4 py-5 text-right">
            <p className="font-['Tajawal'] text-[1.7rem] font-black text-white">المركز التنفيذي</p>
            <p className="mt-2 text-sm leading-8 text-white/46">لوحة تشغيل ومتابعة القرار الاستثماري</p>
          </div>

          <div className="mt-6 border-t border-white/8 pt-5">
            <div className="space-y-2">
              <SidebarLink href="/admin" label="الرئيسية" icon={<LayoutDashboard size={18} />} active />
              <SidebarLink href="/investment-intelligence" label="الذكاء الاستثماري" icon={<Sparkles size={18} />} />
              <SidebarLink href="/investment-intelligence?tab=spatial" label="التحليل المكاني" icon={<MapPin size={18} />} />
              <SidebarLink href="/investment-intelligence?tab=opportunities" label="الفرص الاستثمارية" icon={<BriefcaseBusiness size={18} />} />
              <SidebarLink href="#" label="الاعتمادات والموافقات" icon={<FileCheck2 size={18} />} />
              <SidebarLink href="#" label="الشركاء والمستثمرون" icon={<Users size={18} />} />
              <SidebarLink href="#" label="الطلبات والاعتراضات" icon={<FileText size={18} />} />
              <SidebarLink href="#" label="التقارير واللوحات" icon={<Building2 size={18} />} />
              <SidebarLink href="#" label="الأداء والمؤشرات" icon={<TrendingUp size={18} />} />
              <SidebarLink href="#" label="الإعدادات" icon={<Settings size={18} />} />
            </div>
          </div>

          <div className="mt-auto border-t border-white/8 pt-5">
            <div className="space-y-3">
              <button className="flex w-full items-center justify-between rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-right">
                <span className="text-sm font-bold text-white/82">دليل المستخدم</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-white/10 bg-white/[0.03] text-white/72">
                  <MessageSquarePlus size={18} />
                </span>
              </button>
              <button className="flex w-full items-center justify-between rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-right">
                <span className="text-sm font-bold text-white/82">تسجيل خروج</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-white/10 bg-white/[0.03] text-white/72">
                  <LogOut size={18} />
                </span>
              </button>
            </div>
            <p className="mt-6 text-center text-[12px] leading-6 text-white/34">
              © 2024 استنار
              <br />
              جميع الحقوق محفوظة
            </p>
          </div>
        </aside>

        <main className="min-w-0 space-y-3">
          <header className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,19,31,0.94)_0%,rgba(9,23,38,0.98)_100%)] px-5 py-4 shadow-[0_18px_44px_rgba(0,0,0,0.2)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-right">
                <h1 className="font-['Tajawal'] text-[2.5rem] font-black leading-none text-white">غرفة قيادة الاستثمار الحضري</h1>
                <p className="mt-2 text-[13px] text-white/52">مركز القرار التنفيذي - أمانة منطقة حائل</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="border-r border-white/10 pr-4 text-right">
                  <p className="font-['Tajawal'] text-[1rem] font-black text-[#E4C982]">مكتب دعم القرار الاستثماري</p>
                  <p className="mt-1 text-[12px] text-white/44">غرفة المتابعة التنفيذية</p>
                </div>
                <div className="border-r border-white/10 pr-4 text-right">
                  <p className="text-[12px] text-white/52">الأربعاء 05/01/1448 هـ</p>
                  <p className="mt-1 font-['Tajawal'] text-[1.15rem] font-black text-white">10:30 AM</p>
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
          </header>

          <AdminReferenceDashboard />

          <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-5">
            <SupportShortcut title="تصدير تقرير" description="تقرير الأداء الشهري" icon={<FileCheck2 size={18} />} />
            <SupportShortcut title="اجتماع لجنة الاستثمار" description="غداً - 10:00 ص" icon={<Building2 size={18} />} />
            <SupportShortcut title="توقيع إلكتروني" description="3 مستندات بانتظار التوقيع" icon={<FileText size={18} />} />
            <SupportShortcut title="مركز المساعدة" description="الدعم والمساندة" icon={<ShieldCheck size={18} />} />
            <SupportShortcut title="اسأل مساعد استنار الذكي" description="اكتب استفسارك هنا..." icon={<Sparkles size={18} />} />
          </div>
        </main>

        <aside className="sticky top-3 hidden h-[calc(100vh-1.5rem)] rounded-[1.65rem] border border-white/8 bg-[linear-gradient(180deg,#091624_0%,#0B1C2F_100%)] px-3 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] xl:flex xl:flex-col xl:items-center xl:gap-3">
          <UtilityRailButton icon={<MapPin size={22} />} />
          <UtilityRailButton icon={<ShieldCheck size={22} />} />
          <UtilityRailButton icon={<Building2 size={22} />} />
          <UtilityRailButton icon={<FileText size={22} />} />
          <UtilityRailButton icon={<BriefcaseBusiness size={22} />} />
          <UtilityRailButton icon={<Users size={22} />} />
          <UtilityRailButton icon={<Handshake size={22} />} />
          <div className="mt-auto">
            <UtilityRailButton icon={<Settings size={22} />} />
          </div>
        </aside>
      </div>
    </div>
  );
}
