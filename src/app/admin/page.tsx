"use client";

import Link from "next/link";
import ExecutiveHeader from "@/components/amanah/ExecutiveHeader";
import ExecutiveSidebar from "@/components/amanah/ExecutiveSidebar";
import { AdminReferenceDashboard } from "@/components/amanah/reference/ReferenceViews";
import { useAppStore } from "@/store/appStore";

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
              مركز الإدارة
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_top_left,rgba(94,145,194,0.26),transparent_24%),radial-gradient(circle_at_top_right,rgba(61,122,176,0.24),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(42,96,144,0.18),transparent_34%),linear-gradient(180deg,#1A3A54_0%,#16324A_24%,#122B42_52%,#10263C_76%,#0D2235_100%)] text-[#0B1726]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.038)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.038)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20 animate-pulse [animation-duration:10s]" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.06)_38%,transparent_52%),linear-gradient(305deg,transparent_0%,rgba(255,255,255,0.045)_42%,transparent_58%)] opacity-20 animate-pulse [animation-duration:12s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.16),transparent_12%),radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.12),transparent_10%),radial-gradient(circle_at_52%_72%,rgba(255,255,255,0.1),transparent_13%)] opacity-30 blur-3xl animate-pulse [animation-duration:8s]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1880px] px-3 py-3 pb-24 xl:pr-[286px] xl:pb-3 2xl:pr-[320px]">
        <main className="min-w-0 space-y-3" dir="rtl">
          <ExecutiveHeader title="المركز التنفيذي" subtitle="لوحة القيادة والمتابعة الداخلية" displayName={currentUser.fullName} />

          <AdminReferenceDashboard />
        </main>

        <ExecutiveSidebar page="admin" />
      </div>
    </div>
  );
}
