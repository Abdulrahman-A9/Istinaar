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
import { AdminReferenceDashboard } from "@/components/amanah/reference/ReferenceViews";

function RailIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-[56px] w-[56px] items-center justify-center rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,37,58,0.92)_0%,rgba(11,28,45,0.98)_100%)] text-white/78 shadow-[0_14px_26px_rgba(0,0,0,0.16)] transition hover:border-[#D0A243]/28 hover:text-[#E7CB84]">
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
      className={`flex items-center justify-between rounded-[1rem] px-4 py-3 transition ${
        active
          ? "bg-[#D0A243] text-[#0B1726] shadow-[0_16px_34px_rgba(208,162,67,0.24)]"
          : "text-white/84 hover:bg-white/[0.04]"
      }`}
    >
      <span className="text-[14px] font-bold">{label}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-[0.95rem] border ${
          active ? "border-[#0B1726]/10 bg-[#0B1726]/5" : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {icon}
      </span>
    </Link>
  );
}

export default function AdminPage() {
  const currentUser = useAppStore((state) => state.currentUser);
  const authorityDisplayName = "مكتب دعم القرار الاستثماري";

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#14263b_0%,#09131f_44%,#06101b_100%)] text-white">
      <div className="mx-auto flex max-w-[1760px] items-start gap-3 px-2 py-2">
        <aside className="sticky top-2 hidden h-[calc(100vh-1rem)] w-[68px] shrink-0 rounded-[1.55rem] border border-white/8 bg-[linear-gradient(180deg,#0B1A2B_0%,#081321_100%)] px-2 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] xl:flex xl:flex-col xl:items-center xl:gap-2.5">
          <RailIcon icon={<MapPin size={20} />} />
          <RailIcon icon={<ShieldCheck size={20} />} />
          <RailIcon icon={<Building2 size={20} />} />
          <RailIcon icon={<FileText size={20} />} />
          <RailIcon icon={<BriefcaseBusiness size={20} />} />
          <RailIcon icon={<Users size={20} />} />
          <RailIcon icon={<Handshake size={20} />} />
          <div className="mt-auto">
            <RailIcon icon={<Settings size={20} />} />
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-3">
          <header className="rounded-[1.45rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,19,31,0.94)_0%,rgba(8,20,33,0.98)_100%)] px-5 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#C89C45_100%)] text-[#0B1726] shadow-[0_14px_28px_rgba(208,162,67,0.26)]">
                  <UserCircle2 size={18} />
                </button>
                <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Bell size={17} />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF434A] text-[11px] font-black text-white">3</span>
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <Mail size={17} />
                </button>
                <div className="border-r border-white/10 pr-4 text-right">
                  <p className="font-['Tajawal'] text-[1rem] font-black text-[#E4C982]">{authorityDisplayName}</p>
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/45">غرفة المتابعة التنفيذية</p>
                </div>
                <div className="border-r border-white/10 pr-4 text-right">
                  <p className="font-['IBM_Plex_Sans_Arabic'] text-[12px] text-white/55">الأربعاء 05/01/1448 هـ</p>
                  <p className="font-['Tajawal'] text-[14px] font-bold text-white/85">10:30 AM</p>
                </div>
              </div>

              <div className="text-right">
                <h1 className="font-['Tajawal'] text-[2.25rem] font-black leading-none text-white">غرفة قيادة الاستثمار الحضري</h1>
                <p className="mt-1.5 font-['IBM_Plex_Sans_Arabic'] text-[13px] text-white/55">مركز القرار التنفيذي - أمانة منطقة حائل</p>
              </div>
            </div>
          </header>

          <AdminReferenceDashboard />

          <div className="grid gap-3 xl:grid-cols-[repeat(4,minmax(0,1fr))_1.15fr]">
            {[
              ["تصدير تقرير", "تقرير الأداء الشهري", <FileCheck2 key="a" size={18} />],
              ["اجتماع لجنة الاستثمار", "غداً - 10:00 ص", <Building2 key="b" size={18} />],
              ["توقيع إلكتروني", "3 مستندات بانتظار التوقيع", <FileText key="c" size={18} />],
              ["مركز المساعدة", "الدعم والمساندة", <MessageSquarePlus key="d" size={18} />],
            ].map(([title, desc, icon]) => (
              <div key={String(title)} className="rounded-[1.15rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.96)_0%,rgba(10,23,38,0.98)_100%)] px-4 py-4 text-right shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-[#D0A243]/28 bg-white/[0.03] text-[#D7AF57]">{icon}</span>
                  <div>
                    <p className="font-['Tajawal'] text-[1.02rem] font-black text-white">{title}</p>
                    <p className="mt-1.5 text-[13px] text-white/46">{desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-[1.15rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.96)_0%,rgba(10,23,38,0.98)_100%)] px-4 py-4 text-right shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-[#D0A243]/28 bg-[#D0A243]/18 text-[#E1C376]">
                  <Sparkles size={18} />
                </span>
                <div>
                  <p className="font-['Tajawal'] text-[1.02rem] font-black text-white">اسأل مساعد استنار الذكي</p>
                  <p className="mt-1.5 text-[13px] text-white/46">اكتب استفسارك هنا...</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="sticky top-2 h-[calc(100vh-1rem)] w-[286px] shrink-0 overflow-hidden rounded-[1.65rem] border border-white/8 bg-[linear-gradient(180deg,#091624_0%,#0B1C2F_100%)] px-4 py-4 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#D0A243]/35 bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#D0A243_100%)] text-[#0B1726]">
                <Sparkles size={20} />
              </div>
              <div className="text-right">
                <h2 className="font-['Tajawal'] text-[2rem] font-black text-white">استنار</h2>
                <p className="mt-2 text-[12px] text-white/46">منصة الذكاء الاستثماري ودعم القرار</p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-right">
              <p className="font-['Tajawal'] text-[1.2rem] font-black text-white">المركز التنفيذي</p>
              <p className="mt-2 text-sm text-white/44">لوحة تشغيل ومتابعة القرار الاستثماري</p>
            </div>

            <div className="mt-5 border-t border-white/8 pt-4">
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

            <div className="mt-auto border-t border-white/8 pt-4">
              <div className="space-y-3">
                {[
                  ["دليل المستخدم", <MessageSquarePlus key="u" size={18} />],
                  ["تسجيل خروج", <LogOut key="l" size={18} />],
                ].map(([label, icon]) => (
                  <button key={String(label)} className="flex w-full items-center justify-between rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-right">
                    <span className="text-sm font-bold text-white/82">{label}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-white/10 bg-white/[0.03] text-white/72">{icon}</span>
                  </button>
                ))}
              </div>
              <p className="mt-6 text-center text-[12px] leading-6 text-white/34">© 2024 استنار<br />جميع الحقوق محفوظة</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
