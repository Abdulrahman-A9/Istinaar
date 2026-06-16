"use client";

import Link from "next/link";
import {
  Bell,
  Building2,
  FileCheck2,
  FileText,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCircle2,
} from "lucide-react";
import ExecutiveSidebar from "@/components/amanah/ExecutiveSidebar";
import { AdminReferenceDashboard } from "@/components/amanah/reference/ReferenceViews";
import { useAppStore } from "@/store/appStore";

function SupportShortcut({
  title,
  description,
  icon,
  toneClass,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  toneClass: string;
}) {
  return (
    <div
      className={`rounded-[1rem] border border-white/8 px-3.5 py-3 text-right shadow-[0_12px_28px_rgba(15,23,42,0.14)] ${toneClass}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-[0.9rem] border border-[#D0A243]/28 bg-white/[0.03] text-[#D7B45E]">
          {icon}
        </span>
        <div>
          <p className="font-['Tajawal'] text-[0.9rem] font-black text-white">{title}</p>
          <p className="mt-1 text-[11px] text-white/46">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const currentUser = useAppStore((state) => state.currentUser);

  if (!currentUser || currentUser.role !== "authority") {
    return (
      <div className="min-h-screen bg-[#F5F1E8] px-6 py-16 text-white">
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(94,145,194,0.26),transparent_24%),radial-gradient(circle_at_top_right,rgba(61,122,176,0.24),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(42,96,144,0.18),transparent_34%),linear-gradient(180deg,#16324A_0%,#122B42_32%,#10263C_68%,#0D2235_100%)] text-[#0B1726]">
      <div
        className="mx-auto grid max-w-[1880px] grid-cols-1 gap-3 px-3 py-3 xl:grid-cols-[minmax(0,1fr)_332px]"
        style={{ direction: "ltr" }}
      >
        <main className="min-w-0 space-y-3" dir="rtl">
          <header className="rounded-[1.45rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,19,31,0.94)_0%,rgba(9,23,38,0.98)_100%)] px-5 py-4 shadow-[0_18px_44px_rgba(0,0,0,0.2)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-right">
                <h1 className="font-['Tajawal'] text-[2.35rem] font-black leading-none text-white">غرفة قيادة الاستثمار الحضري</h1>
                <p className="mt-2 text-[13px] text-white/52">مركز القرار التنفيذي - أمانة منطقة حائل</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="border-r border-white/10 pr-4 text-right">
                  <p className="font-['Tajawal'] text-[0.98rem] font-black text-[#E4C982]">مكتب دعم القرار الاستثماري</p>
                  <p className="mt-1 text-[12px] text-white/44">غرفة المتابعة التنفيذية</p>
                </div>
                <div className="border-r border-white/10 pr-4 text-right">
                  <p className="text-[12px] text-white/52">الأربعاء 05/01/1448 هـ</p>
                  <p className="mt-1 font-['Tajawal'] text-[1.1rem] font-black text-white">10:30 AM</p>
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

          <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            <SupportShortcut
              title="تصدير تقرير"
              description="تقرير الأداء الشهري"
              icon={<FileCheck2 size={18} />}
              toneClass="bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.18),transparent_38%),linear-gradient(180deg,rgba(13,31,51,0.98)_0%,rgba(9,22,37,0.98)_100%)]"
            />
            <SupportShortcut
              title="اجتماع لجنة الاستثمار"
              description="غداً - 10:00 ص"
              icon={<Building2 size={18} />}
              toneClass="bg-[radial-gradient(circle_at_top_right,rgba(61,211,128,0.16),transparent_38%),linear-gradient(180deg,rgba(13,31,51,0.98)_0%,rgba(9,22,37,0.98)_100%)]"
            />
            <SupportShortcut
              title="توقيع إلكتروني"
              description="3 مستندات بانتظار التوقيع"
              icon={<FileText size={18} />}
              toneClass="bg-[radial-gradient(circle_at_top_right,rgba(78,163,255,0.18),transparent_38%),linear-gradient(180deg,rgba(13,31,51,0.98)_0%,rgba(9,22,37,0.98)_100%)]"
            />
            <SupportShortcut
              title="مركز المساعدة"
              description="الدعم والمساندة"
              icon={<ShieldCheck size={18} />}
              toneClass="bg-[radial-gradient(circle_at_top_right,rgba(188,125,255,0.14),transparent_38%),linear-gradient(180deg,rgba(13,31,51,0.98)_0%,rgba(9,22,37,0.98)_100%)]"
            />
            <SupportShortcut
              title="اسأل مساعد استنار الذكي"
              description="اكتب استفسارك هنا..."
              icon={<Sparkles size={18} />}
              toneClass="bg-[radial-gradient(circle_at_top_right,rgba(255,124,124,0.14),transparent_38%),linear-gradient(180deg,rgba(13,31,51,0.98)_0%,rgba(9,22,37,0.98)_100%)]"
            />
          </div>
        </main>

        <ExecutiveSidebar page="admin" />
      </div>
    </div>
  );
}
