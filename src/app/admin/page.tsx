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
import { useAppStore } from "@/store/appStore";
import { AdminBottomSupport, AdminReferenceDashboard } from "@/components/amanah/reference/ReferenceViews";

function RailIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-[66px] w-[66px] items-center justify-center rounded-[1.3rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,37,58,0.92)_0%,rgba(11,28,45,0.98)_100%)] text-white/78 shadow-[0_14px_26px_rgba(0,0,0,0.16)] transition hover:border-[#D0A243]/28 hover:text-[#E7CB84]">
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
      className={`flex items-center justify-between rounded-[1.15rem] px-5 py-4 transition ${
        active
          ? "bg-[#D0A243] text-[#0B1726] shadow-[0_16px_34px_rgba(208,162,67,0.24)]"
          : "text-white/84 hover:bg-white/[0.04]"
      }`}
    >
      <span className="text-[15px] font-bold">{label}</span>
      <span className={`flex h-10 w-10 items-center justify-center rounded-[1rem] border ${active ? "border-[#0B1726]/10 bg-[#0B1726]/5" : "border-white/10 bg-white/[0.03]"}`}>
        {icon}
      </span>
    </Link>
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
            صفحة الأمانة مخصصة للحسابات الداخلية فقط. ادخل من حساب جهة الأمانة ثم افتح لوحة الإدارة والذكاء الاستثماري.
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#14263b_0%,#09131f_44%,#06101b_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1860px] gap-5 px-2 py-3">
        <aside className="hidden w-[76px] shrink-0 rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,#0B1A2B_0%,#081321_100%)] px-2 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] xl:flex xl:flex-col xl:items-center xl:gap-3">
          <RailIcon icon={<MapPin size={21} />} />
          <RailIcon icon={<ShieldCheck size={21} />} />
          <RailIcon icon={<Building2 size={21} />} />
          <RailIcon icon={<FileText size={21} />} />
          <RailIcon icon={<BriefcaseBusiness size={21} />} />
          <RailIcon icon={<Users size={21} />} />
          <RailIcon icon={<Handshake size={21} />} />
          <div className="mt-auto">
            <RailIcon icon={<Settings size={21} />} />
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-5">
          <header className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,19,31,0.94)_0%,rgba(8,20,33,0.98)_100%)] px-7 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#C89C45_100%)] text-[#0B1726] shadow-[0_14px_28px_rgba(208,162,67,0.26)]">
                  <UserCircle2 size={18} />
                </button>
                <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Bell size={18} />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF434A] text-[11px] font-black text-white">3</span>
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Mail size={18} />
                </button>
                <div className="border-r border-white/10 pr-5 text-right">
                  <p className="font-['Tajawal'] text-[1.2rem] font-black text-[#E4C982]">{currentUser.fullName}</p>
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/45">مكتب دعم القرار الاستثماري</p>
                </div>
                <div className="border-r border-white/10 pr-5 text-right">
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/55">الأربعاء 05/01/1448 هـ</p>
                  <p className="font-['Tajawal'] text-[16px] font-bold text-white/85">10:30 AM</p>
                </div>
              </div>

              <div className="text-right">
                <h1 className="font-['Tajawal'] text-[3.45rem] font-black leading-none text-white">غرفة قيادة الاستثمار الحضري</h1>
                <p className="mt-3 font-['IBM_Plex_Sans_Arabic'] text-[14px] text-white/55">مركز القرار التنفيذي - أمانة منطقة حائل</p>
              </div>
            </div>
          </header>

          <AdminReferenceDashboard />
          <AdminBottomSupport />

          <div className="grid gap-4 xl:grid-cols-[repeat(4,minmax(0,1fr))_1.35fr]">
            {[
              ["تصدير تقرير", "تقرير الأداء الشهري", <FileCheck2 key="a" size={20} />],
              ["اجتماع لجنة الاستثمار", "غداً - 10:00 ص", <Building2 key="b" size={20} />],
              ["توقيع إلكتروني", "3 مستندات بانتظار التوقيع", <FileText key="c" size={20} />],
              ["مركز المساعدة", "الدعم والمساندة", <MessageSquarePlus key="d" size={20} />],
            ].map(([title, desc, icon]) => (
              <div key={String(title)} className="rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.96)_0%,rgba(10,23,38,0.98)_100%)] px-5 py-5 text-right shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#D0A243]/28 bg-white/[0.03] text-[#D7AF57]">{icon}</span>
                  <div>
                    <p className="font-['Tajawal'] text-[1.2rem] font-black text-white">{title}</p>
                    <p className="mt-2 text-sm text-white/46">{desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.96)_0%,rgba(10,23,38,0.98)_100%)] px-5 py-5 text-right shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#D0A243]/28 bg-[#D0A243]/18 text-[#E1C376]">
                  <Sparkles size={20} />
                </span>
                <div>
                  <p className="font-['Tajawal'] text-[1.2rem] font-black text-white">اسأل مساعد استنار الذكي</p>
                  <p className="mt-2 text-sm text-white/46">اكتب استفسارك هنا...</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-[312px] shrink-0 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#091624_0%,#0B1C2F_100%)] px-5 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-[#D0A243]/35 bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#D0A243_100%)] text-[#0B1726]">
              <Sparkles size={22} />
            </div>
            <div className="text-right">
              <h2 className="font-['Tajawal'] text-[2.3rem] font-black text-white">استنار</h2>
              <p className="mt-2 text-[12px] text-white/46">منصة الذكاء الاستثماري ودعم القرار</p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-5 text-right">
            <p className="font-['Tajawal'] text-[1.4rem] font-black text-white">المركز التنفيذي</p>
            <p className="mt-2 text-sm text-white/44">المركز التنفيذي</p>
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

          <div className="mt-6 border-t border-white/8 pt-5">
            <div className="space-y-3">
              {[
                ["دليل المستخدم", <MessageSquarePlus key="u" size={18} />],
                ["تسجيل خروج", <LogOut key="l" size={18} />],
              ].map(([label, icon]) => (
                <button key={String(label)} className="flex w-full items-center justify-between rounded-[1.15rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-right">
                  <span className="text-sm font-bold text-white/82">{label}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.03] text-white/72">{icon}</span>
                </button>
              ))}
            </div>
            <p className="mt-8 text-center text-[12px] text-white/34">© 2024 استنار<br />جميع الحقوق محفوظة</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
