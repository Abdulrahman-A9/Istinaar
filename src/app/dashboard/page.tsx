"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  FileBadge2,
  FileText,
  Handshake,
  LayoutDashboard,
  LogOut,
  Map,
  MessageCircleMore,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { getAdvisoryPriorityMeta, getAdvisoryWorkflowMeta } from "@/lib/consultingWorkflow";
import { getOpportunityById } from "@/data/opportunities";

const statusConfig = {
  review: { label: "قيد المراجعة", class: "badge-review" },
  accepted: { label: "مقبول", class: "badge-accepted" },
  rejected: { label: "مرفوض", class: "badge-rejected" },
  pending_payment: { label: "بانتظار الدفع", class: "badge-review" },
} as const;

const investorNav = [
  { label: "لوحة المستثمر", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "الأراضي المتاحة", href: "/lands", icon: <Map size={18} /> },
  { label: "طلب استشاري", href: "/consulting/request", icon: <FileBadge2 size={18} /> },
  { label: "الفرص الاستثمارية", href: "/opportunities", icon: <BriefcaseBusiness size={18} /> },
  { label: "بوابة الشراكات", href: "/partnerships", icon: <Handshake size={18} /> },
];

function Panel({
  title,
  subtitle,
  icon,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(10,35,66,0.06)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        {action ?? <span />}
        <div className="flex items-center gap-3 text-right">
          <div>
            {subtitle ? <p className="mb-1 text-xs text-slate-400">{subtitle}</p> : null}
            <h2 className="text-[1rem] font-black text-[#0A2342]">{title}</h2>
          </div>
          {icon ? (
            <span className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-[#EEF4FF] text-[#0A2342]">
              {icon}
            </span>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function InvestorSidebar({ name, email, company }: { name: string; email: string; company?: string }) {
  return (
    <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[286px] shrink-0 flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,#0B2238_0%,#081A2C_100%)] p-4 text-white shadow-[0_20px_55px_rgba(8,20,34,0.2)] lg:flex">
      <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 text-right">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#D0A243] text-[#07192E]">
            <UserRound size={21} />
          </span>
          <div>
            <p className="text-sm font-black">{name}</p>
            <p className="mt-1 text-[11px] text-white/45">{company || "مستثمر"}</p>
          </div>
        </div>
        <p className="truncate text-[11px] text-white/50">{email}</p>
      </div>

      <nav className="mt-4 flex-1 space-y-2 overflow-y-auto pl-1">
        {investorNav.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between rounded-[1rem] px-3 py-3 text-sm font-bold transition ${
              index === 0
                ? "bg-[#D0A243] text-[#07192E] shadow-[0_14px_32px_rgba(208,162,67,0.18)]"
                : "border border-white/8 bg-white/[0.025] text-white/78 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <span>{item.label}</span>
            {item.icon}
          </Link>
        ))}
      </nav>

      <div className="mt-4 grid gap-2">
        <Link href="/account" className="rounded-[1rem] border border-white/10 px-3 py-3 text-center text-xs font-bold text-white/75 hover:bg-white/[0.05]">
          إدارة الحساب
        </Link>
        <Link href="/account" className="flex items-center justify-center gap-2 rounded-[1rem] border border-white/10 px-3 py-3 text-xs font-bold text-white/55 hover:bg-white/[0.05]">
          <LogOut size={15} />
          تسجيل الخروج
        </Link>
      </div>
    </aside>
  );
}

export default function DashboardPage() {
  const {
    currentUser,
    savedLands,
    savedOpportunities,
    applications,
    alerts,
    advisoryRequests,
    partnershipRequests,
    removeLand,
    removeOpportunity,
    markAlertRead,
  } = useAppStore();

  const investorName = currentUser?.fullName ?? "عبدالرحمن الشمري";
  const unreadAlerts = alerts.filter((alert) => !alert.read).length;
  const myAdvisoryRequests = currentUser ? advisoryRequests.filter((request) => request.accountId === currentUser.id) : advisoryRequests.slice(0, 1);
  const myPartnershipRequests = currentUser ? partnershipRequests.filter((request) => request.fromAccountId === currentUser.id) : partnershipRequests.slice(0, 1);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#F5F7FB_0%,#EEF2F7_100%)] px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel title="ابدأ من حسابك" subtitle="Investor Access" icon={<LayoutDashboard size={20} />}>
            <p className="mb-5 text-right text-sm leading-8 text-slate-500">
              افتح الحساب التجريبي أو سجل الدخول حتى تظهر لك الطلبات، التقارير، التنبيهات، والشراكات في لوحة واحدة.
            </p>
            <div className="flex flex-wrap justify-end gap-3">
              <Link href="/account" className="btn-primary">فتح الحساب</Link>
              <Link href="/lands" className="btn-gold">استعراض الأراضي</Link>
            </div>
          </Panel>
          <section className="rounded-[2rem] bg-[linear-gradient(135deg,#061629_0%,#0A2342_70%,#17355F_100%)] p-8 text-right text-white">
            <h1 className="text-4xl font-black">لوحة المستثمر</h1>
            <p className="mt-4 leading-8 text-white/72">تجمع هذه اللوحة طلبات المستثمر ومحفوظاته وتنبيهاته وروابط الخدمات الأساسية في مساحة واحدة.</p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F5F7FB_0%,#EEF2F7_100%)] p-3 text-[#0A2342] md:p-4">
      <div className="mx-auto flex max-w-[1760px] flex-row-reverse gap-4">
        <InvestorSidebar name={investorName} email={currentUser.email} company={currentUser.company} />

        <main className="min-w-0 flex-1 space-y-4">
          <section className="relative overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(10,35,66,0.07)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(208,162,67,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(10,35,66,0.06),transparent_35%)]" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {investorNav.slice(1).map((item) => (
                  <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 rounded-[0.95rem] border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-[#0A2342] lg:hidden">
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="text-right">
                <p className="mb-1 text-xs font-bold text-[#B88D35]">ملف المستثمر</p>
                <h1 className="text-2xl font-black md:text-3xl">مرحباً، {investorName}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">متابعة الطلبات والاستشارات والتنبيهات والمحفظة الاستثمارية من مكان واحد.</p>
              </div>
            </div>
          </section>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            {([
              ["طلباتي", applications.length, FileText, "bg-[#EEF4FF] text-[#0A2342]"],
              ["استشاراتي", myAdvisoryRequests.length, FileBadge2, "bg-[#EFF6FF] text-[#2563EB]"],
              ["فرص محفوظة", savedOpportunities.length, BriefcaseBusiness, "bg-[#F5F3FF] text-[#7C3AED]"],
              ["أراض محفوظة", savedLands.length, Map, "bg-[#FFF7E1] text-[#B88D35]"],
              ["شراكات", myPartnershipRequests.length, Handshake, "bg-[#ECFDF5] text-[#059669]"],
              ["تنبيهات", unreadAlerts, Bell, "bg-[#FEF2F2] text-[#DC2626]"],
            ] as Array<[string, number, LucideIcon, string]>).map(([label, value, Icon, tone]) => (
              <article key={label} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 text-right shadow-[0_14px_34px_rgba(10,35,66,0.05)]">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[0.9rem] ${tone}`}>
                  <Icon size={19} />
                </div>
                <p className="text-2xl font-black">{value as number}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <Panel title="الطلبات الحالية" subtitle="Applications" icon={<FileText size={20} />} action={<Link href="/lands" className="text-xs font-black text-[#B88D35]">طلب جديد</Link>}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-right text-sm">
                  <thead className="text-xs text-slate-400">
                    <tr className="border-b border-slate-100">
                      {["الأرض", "الحي", "النشاط", "التاريخ", "الحالة", "الإجراء"].map((header) => <th key={header} className="px-3 py-3 font-bold">{header}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => {
                      const status = statusConfig[app.status];
                      return (
                        <tr key={app.id} className="border-b border-slate-100 last:border-0">
                          <td className="px-3 py-4 font-black">{app.landName}</td>
                          <td className="px-3 py-4 text-slate-500">{app.neighborhood}</td>
                          <td className="px-3 py-4 text-slate-500">{app.activityType}</td>
                          <td className="px-3 py-4 text-slate-500">{app.submittedAt}</td>
                          <td className="px-3 py-4"><span className={status.class}>{status.label}</span></td>
                          <td className="px-3 py-4"><Link href="/lands" className="text-xs font-black text-[#B88D35]">عرض</Link></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel title="التنبيهات" subtitle="Alerts" icon={<Bell size={20} />}>
              <div className="space-y-2">
                {alerts.slice(0, 5).map((alert) => (
                  <button key={alert.id} onClick={() => markAlertRead(alert.id)} className={`w-full rounded-[1rem] border px-4 py-3 text-right text-sm leading-7 ${alert.read ? "border-slate-200 bg-slate-50 text-slate-500" : "border-amber-200 bg-amber-50/70 text-[#0A2342]"}`}>
                    <span className="block font-bold">{alert.message}</span>
                    <span className="text-xs text-slate-400">{alert.time}</span>
                  </button>
                ))}
              </div>
            </Panel>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <Panel title="الاستشارات" subtitle="Advisory" icon={<FileBadge2 size={20} />} action={<Link href="/consulting/request" className="text-xs font-black text-[#B88D35]">طلب استشارة</Link>}>
              <div className="space-y-3">
                {myAdvisoryRequests.map((request) => {
                  const workflowMeta = getAdvisoryWorkflowMeta(request.workflowStatus);
                  const priorityMeta = getAdvisoryPriorityMeta(request.reviewPriority);
                  return (
                    <article key={request.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4 text-right">
                      <p className="font-black">{request.projectName}</p>
                      <p className="mt-1 text-xs text-slate-500">{request.neighborhood} · {request.businessModel}</p>
                      <div className="mt-3 flex flex-wrap justify-end gap-2">
                        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: workflowMeta.surface, color: workflowMeta.tone }}>{workflowMeta.label}</span>
                        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: priorityMeta.surface, color: priorityMeta.tone }}>{priorityMeta.label}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Panel>

            <Panel title="المحفوظات" subtitle="Saved" icon={<Bookmark size={20} />}>
              <div className="grid gap-3">
                {savedOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-right">
                    <p className="font-bold">{opportunity.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{opportunity.neighborhood} · ROI {opportunity.roi}%</p>
                    <div className="mt-2 flex justify-end gap-2">
                      <Link href={`/opportunities/${getOpportunityById(opportunity.id)?.slug ?? "al-naqrah-drive-thru-cafe"}`} className="text-xs font-black text-[#B88D35]">عرض</Link>
                      <button onClick={() => removeOpportunity(opportunity.id)} className="text-xs font-bold text-red-500">حذف</button>
                    </div>
                  </div>
                ))}
                {savedLands.map((land) => (
                  <div key={land.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-right">
                    <p className="font-bold">{land.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{land.neighborhood} · {land.area.toLocaleString()} م²</p>
                    <button onClick={() => removeLand(land.id)} className="mt-2 text-xs font-bold text-red-500">حذف</button>
                  </div>
                ))}
                {savedOpportunities.length === 0 && savedLands.length === 0 ? <p className="rounded-[1rem] border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">لا توجد عناصر محفوظة حالياً.</p> : null}
              </div>
            </Panel>

            <Panel title="روابط سريعة" subtitle="Quick actions" icon={<MessageCircleMore size={20} />}>
              <div className="grid gap-2">
                <Link href="/consulting/request" className="btn-primary justify-center">بدء طلب استشاري</Link>
                <Link href="/lands" className="btn-gold justify-center">استعراض الأراضي</Link>
                <Link href="/opportunities" className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-600 hover:bg-slate-50">استعراض الفرص</Link>
                <Link href="/partnerships" className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-600 hover:bg-slate-50">بوابة الشراكات</Link>
              </div>
            </Panel>
          </div>
        </main>
      </div>
    </div>
  );
}
