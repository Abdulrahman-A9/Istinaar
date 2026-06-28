"use client";

import Link from "next/link";
import ExecutiveHeader from "@/components/amanah/ExecutiveHeader";
import ExecutiveSidebar from "@/components/amanah/ExecutiveSidebar";
import { executivePageChrome } from "@/components/amanah/executiveShellConfig";
import { AdminReferenceDashboard } from "@/components/amanah/reference/ReferenceViews";
import { useAppStore } from "@/store/appStore";

export default function AdminPage() {
  const currentUser = useAppStore((state) => state.currentUser);
  const chrome = executivePageChrome.admin;

  if (!currentUser || currentUser.role !== "authority") {
    return (
      <div className="min-h-screen bg-[#F5F1E8] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(8,19,31,0.98)_100%)] p-10 text-right shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
          <p className="text-sm text-[#D8B46A]">المركز التنفيذي</p>
          <h1 className="mt-3 text-[3rem] font-black text-white">الوصول يتطلب حساب أمانة مخول</h1>
          <p className="mt-5 max-w-3xl text-base leading-9 text-white/68">
            هذه الصفحة مخصصة للحسابات الداخلية فقط. ادخل بحساب الأمانة ثم افتح مركز الإدارة والتحليل الاستثماري من
            المسار الداخلي.
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
    <div className="relative isolate min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_16%_0%,rgba(59,71,90,0.58),transparent_28%),radial-gradient(circle_at_76%_20%,rgba(176,139,65,0.14),transparent_32%),linear-gradient(180deg,#101C2C_0%,#0e141a_50%,#080f14_100%)] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.038)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.038)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20 animate-pulse [animation-duration:10s]" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.06)_38%,transparent_52%),linear-gradient(305deg,transparent_0%,rgba(255,255,255,0.045)_42%,transparent_58%)] opacity-20 animate-pulse [animation-duration:12s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.16),transparent_12%),radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.12),transparent_10%),radial-gradient(circle_at_52%_72%,rgba(255,255,255,0.1),transparent_13%)] opacity-30 blur-3xl animate-pulse [animation-duration:8s]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1920px] px-1 py-1 pb-24 lg:pr-[280px] lg:pb-1">
        <main className="min-w-0 space-y-3 p-2" dir="rtl">
          <ExecutiveHeader title={chrome.title} subtitle={chrome.subtitle} displayName={currentUser.fullName} />
          <AdminReferenceDashboard />
        </main>

        <ExecutiveSidebar page="admin" />
      </div>
    </div>
  );
}
