"use client";

import Link from "next/link";
import { Landmark } from "lucide-react";
import ReferenceHtmlFrame from "@/components/amanah/ReferenceHtmlFrame";
import { useAppStore } from "@/store/appStore";

type InvestmentIntelligenceClientProps = {
  initialTab?: string;
};

type SupportedTab = "overview" | "spatial" | "opportunities" | "approvals" | "partners" | "reports" | "performance" | "settings";

function resolveTab(tab?: string): SupportedTab {
  if (tab === "spatial") {
    return "spatial";
  }
  if (tab === "opportunities") {
    return "opportunities";
  }
  if (tab === "approvals" || tab === "partners" || tab === "reports" || tab === "performance" || tab === "settings") {
    return tab;
  }
  return "overview";
}

export default function InvestmentIntelligenceClient({
  initialTab,
}: InvestmentIntelligenceClientProps) {
  const currentUser = useAppStore((state) => state.currentUser);
  const activeTab = resolveTab(initialTab);

  if (!currentUser || currentUser.role !== "authority") {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#13263c_0%,#091420_42%,#07111c_100%)] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(8,19,31,0.98)_100%)] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D0A243]/28 bg-[#D0A243]/14 px-4 py-2 text-sm font-bold text-[#E9CF8A]">
              <Landmark size={16} />
              مركز الذكاء الاستثماري
            </span>
            <h1 className="mt-6 font-['Tajawal'] text-[3rem] font-black leading-tight text-white">الوصول يتطلب حساب أمانة مخول</h1>
            <p className="mt-5 max-w-3xl text-base leading-9 text-white/68">
              المساحة الداخلية تعرض لوحات التنفيذ، التحليل المكاني، والفرص الاستثمارية للجهات المخولة فقط.
            </p>
          </section>

          <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,45,0.98)_0%,rgba(8,19,31,0.98)_100%)] p-10 text-right shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <p className="text-sm text-white/44">Investment Intelligence Access</p>
            <h2 className="mt-3 font-['Tajawal'] text-[2.2rem] font-black text-white">ادخل من حساب الأمانة أولاً</h2>
            <p className="mt-4 text-sm leading-8 text-white/66">
              بعد تسجيل الدخول بحساب جهة الأمانة ستظهر لك صفحة النظرة التنفيذية، التحليل المكاني، وصفحة الفرص الاستثمارية بنفس الهيكل الداخلي المرجعي.
            </p>
            <div className="mt-7 flex justify-end gap-3">
              <Link href="/account" className="rounded-[1rem] border border-white/10 px-6 py-3 text-sm font-semibold text-white/84">
                الحساب الموحد
              </Link>
              <Link href="/admin" className="rounded-[1rem] bg-[#C79C45] px-6 py-3 text-sm font-black text-[#0B1726]">
                إدارة الأمانة
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return <ReferenceHtmlFrame page={activeTab} />;
}
