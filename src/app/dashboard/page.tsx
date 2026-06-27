"use client";

import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Calculator,
  FileBadge2,
  FileText,
  Handshake,
  LayoutDashboard,
  LogOut,
  Map,
  MapPinned,
  MessageCircleMore,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { getAdvisoryPriorityMeta, getAdvisoryWorkflowMeta } from "@/lib/consultingWorkflow";
import { getOpportunityById } from "@/data/opportunities";

type DashboardSection = "overview" | "lands" | "advisory" | "opportunities" | "partnerships" | "tools";

const statusConfig = {
  review: { label: "قيد المراجعة", class: "badge-review" },
  accepted: { label: "مقبول", class: "badge-accepted" },
  rejected: { label: "مرفوض", class: "badge-rejected" },
  pending_payment: { label: "بانتظار الدفع", class: "badge-review" },
} as const;

const investorNav: Array<{ key: DashboardSection; label: string; hint: string; icon: LucideIcon }> = [
  { key: "overview", label: "لوحة المستثمر", hint: "ملخص الحساب", icon: LayoutDashboard },
  { key: "lands", label: "أراضي المستثمر", hint: "طلبات ومحفوظات", icon: Map },
  { key: "advisory", label: "طلباتي الاستشارية", hint: "الحالات والتقارير", icon: FileBadge2 },
  { key: "opportunities", label: "فرصي الاستثمارية", hint: "محفوظات ومتابعة", icon: BriefcaseBusiness },
  { key: "partnerships", label: "شراكاتي", hint: "الطلبات والربط", icon: Handshake },
  { key: "tools", label: "أدواتي المحفوظة", hint: "حاسبة وتحليل", icon: Calculator },
];

function Panel({
  title,
  subtitle,
  icon,
  children,
  action,
  className = "",
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(10,35,66,0.06)] ${className}`}>
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

function EmptyState({ message, action }: { message: string; action: ReactNode }) {
  return (
    <div className="rounded-[1.1rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
      <p className="mb-4 text-sm font-bold text-slate-500">{message}</p>
      {action}
    </div>
  );
}

function InvestorSidebar({
  activeSection,
  setActiveSection,
  name,
  email,
  company,
}: {
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
  name: string;
  email: string;
  company?: string;
}) {
  return (
    <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[292px] shrink-0 flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,#0B2238_0%,#081A2C_100%)] p-4 text-white shadow-[0_20px_55px_rgba(8,20,34,0.2)] lg:flex">
      <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 text-right">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#D0A243] text-[#07192E]">
            <UserRound size={21} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-black">{name}</p>
            <p className="mt-1 truncate text-[11px] text-white/45">{company || "مستثمر"}</p>
          </div>
        </div>
        <p className="truncate text-[11px] text-white/50">{email}</p>
      </div>

      <nav className="mt-4 flex-1 space-y-2 overflow-y-auto pl-1">
        {investorNav.map((item) => {
          const Icon = item.icon;
          const active = item.key === activeSection;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveSection(item.key)}
              className={`flex w-full items-center justify-between rounded-[1rem] px-3 py-3 text-right transition ${
                active
                  ? "bg-[#D0A243] text-[#07192E] shadow-[0_14px_32px_rgba(208,162,67,0.18)]"
                  : "border border-white/8 bg-white/[0.025] text-white/78 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span>
                <span className="block text-sm font-black">{item.label}</span>
                <span className={`mt-1 block text-[10px] ${active ? "text-[#07192E]/62" : "text-white/36"}`}>{item.hint}</span>
              </span>
              <Icon size={18} />
            </button>
          );
        })}
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
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");
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
  const landRequests = applications;
  const activeNav = investorNav.find((item) => item.key === activeSection) ?? investorNav[0];

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

  const renderOverview = () => (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {([
          ["طلبات الأراضي", landRequests.length, FileText, "bg-[#EEF4FF] text-[#0A2342]"],
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
            <p className="text-2xl font-black">{value}</p>
            <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        {renderLandRequests(false)}
        {renderAlerts()}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {renderAdvisory(false)}
        {renderSaved(false)}
        {renderTools(false)}
      </div>
    </>
  );

  function renderLandRequests(full = true) {
    const visibleRequests = full ? landRequests : landRequests.slice(0, 4);

    return (
      <Panel
        title="أراضي المستثمر"
        subtitle="طلبات الأراضي والحالات"
        icon={<Map size={20} />}
        action={<Link href="/lands" className="text-xs font-black text-[#B88D35]">طلب أرض جديد</Link>}
        className={full ? "xl:col-span-2" : ""}
      >
        {visibleRequests.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-right text-sm">
              <thead className="text-xs text-slate-400">
                <tr className="border-b border-slate-100">
                  {["الأرض", "الحي", "النشاط", "تاريخ الطلب", "الحالة", "الإجراء"].map((header) => <th key={header} className="px-3 py-3 font-bold">{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {visibleRequests.map((app) => {
                  const status = statusConfig[app.status];
                  return (
                    <tr key={app.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-3 py-4 font-black">{app.landName}</td>
                      <td className="px-3 py-4 text-slate-500">{app.neighborhood}</td>
                      <td className="px-3 py-4 text-slate-500">{app.activityType}</td>
                      <td className="px-3 py-4 text-slate-500">{app.submittedAt}</td>
                      <td className="px-3 py-4"><span className={status.class}>{status.label}</span></td>
                      <td className="px-3 py-4"><Link href="/lands" className="text-xs font-black text-[#B88D35]">عرض الأراضي</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="لا توجد طلبات أراض مرتبطة بالحساب حالياً." action={<Link href="/lands" className="btn-gold">استعرض الأراضي</Link>} />
        )}
      </Panel>
    );
  }

  function renderAlerts() {
    return (
      <Panel title="التنبيهات" subtitle="آخر التحديثات" icon={<Bell size={20} />}>
        <div className="space-y-2">
          {alerts.slice(0, 5).map((alert) => (
            <button key={alert.id} onClick={() => markAlertRead(alert.id)} className={`w-full rounded-[1rem] border px-4 py-3 text-right text-sm leading-7 ${alert.read ? "border-slate-200 bg-slate-50 text-slate-500" : "border-amber-200 bg-amber-50/70 text-[#0A2342]"}`}>
              <span className="block font-bold">{alert.message}</span>
              <span className="text-xs text-slate-400">{alert.time}</span>
            </button>
          ))}
        </div>
      </Panel>
    );
  }

  function renderAdvisory(full = true) {
    const visibleRequests = full ? myAdvisoryRequests : myAdvisoryRequests.slice(0, 2);

    return (
      <Panel
        title="طلباتي الاستشارية"
        subtitle="طلبات سابقة وقيد المراجعة"
        icon={<FileBadge2 size={20} />}
        action={<Link href="/consulting/request" className="text-xs font-black text-[#B88D35]">طلب جديد</Link>}
      >
        {visibleRequests.length ? (
          <div className="space-y-3">
            {visibleRequests.map((request) => {
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
                  <div className="mt-3 flex justify-end">
                    <Link href={`/consulting/report/${request.id}`} className="text-xs font-black text-[#B88D35]">فتح التقرير</Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState message="لا توجد طلبات استشارية محفوظة في الحساب." action={<Link href="/consulting/request" className="btn-primary">طلب استشاري جديد</Link>} />
        )}
      </Panel>
    );
  }

  function renderSaved(full = true) {
    const opportunities = full ? savedOpportunities : savedOpportunities.slice(0, 2);
    const lands = full ? savedLands : savedLands.slice(0, 2);

    return (
      <Panel title="فرصي الاستثمارية" subtitle="الفرص والأراضي المحفوظة" icon={<Bookmark size={20} />} action={<Link href="/opportunities" className="text-xs font-black text-[#B88D35]">عرض فرص جديدة</Link>}>
        <div className="grid gap-3">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-right">
              <p className="font-bold">{opportunity.title}</p>
              <p className="mt-1 text-xs text-slate-500">{opportunity.neighborhood} · ROI {opportunity.roi}%</p>
              <div className="mt-2 flex justify-end gap-2">
                <Link href={`/opportunities/${getOpportunityById(opportunity.id)?.slug ?? "al-naqrah-drive-thru-cafe"}`} className="text-xs font-black text-[#B88D35]">عرض</Link>
                <button onClick={() => removeOpportunity(opportunity.id)} className="text-xs font-bold text-red-500">حذف</button>
              </div>
            </div>
          ))}
          {lands.map((land) => (
            <div key={land.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3 text-right">
              <p className="font-bold">{land.name}</p>
              <p className="mt-1 text-xs text-slate-500">{land.neighborhood} · {land.area.toLocaleString()} م²</p>
              <div className="mt-2 flex justify-end gap-2">
                <Link href={`/lands/${land.id}`} className="text-xs font-black text-[#B88D35]">عرض</Link>
                <button onClick={() => removeLand(land.id)} className="text-xs font-bold text-red-500">حذف</button>
              </div>
            </div>
          ))}
          {opportunities.length === 0 && lands.length === 0 ? <EmptyState message="لا توجد فرص أو أراض محفوظة حالياً." action={<Link href="/opportunities" className="btn-gold">استعرض الفرص</Link>} /> : null}
        </div>
      </Panel>
    );
  }

  function renderPartnerships() {
    return (
      <Panel title="شراكاتي" subtitle="طلبات الربط والشركاء" icon={<Handshake size={20} />} action={<Link href="/partnerships" className="text-xs font-black text-[#B88D35]">شراكة جديدة</Link>} className="xl:col-span-2">
        {myPartnershipRequests.length ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {myPartnershipRequests.map((request) => (
              <article key={request.id} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4 text-right">
                <p className="font-black">{request.projectName}</p>
                <p className="mt-2 text-sm leading-7 text-slate-500">{request.message}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <span className="rounded-xl bg-white px-3 py-2 font-bold">{request.proposedContribution.toLocaleString()} ر.س</span>
                  <span className="rounded-xl bg-white px-3 py-2 font-bold">{request.proposedEquity}% حصة</span>
                  <span className="rounded-xl bg-white px-3 py-2 font-bold">{request.status === "pending" ? "قيد المتابعة" : request.status}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState message="لا توجد شراكات مرتبطة بحساب المستثمر حالياً." action={<Link href="/partnerships" className="btn-gold">استعراض بوابة الشراكات</Link>} />
        )}
      </Panel>
    );
  }

  function renderTools(full = true) {
    const tools = [
      { title: "حاسبة العائد", desc: "آخر حساب محفوظ: عائد متوقع 27% وفترة استرداد 24 يوماً.", href: "/calculator", icon: Calculator },
      { title: "تحليل المواقع", desc: "حي الجامعيين محفوظ للمقارنة المكانية والمتابعة.", href: "/location-analysis/al-jamieen", icon: MapPinned },
      { title: "التحليل الذكي", desc: "قراءة محفوظة لفرصة موسمية في حي مشار.", href: "/smart-analysis", icon: TrendingUp },
    ].slice(0, full ? 3 : 2);

    return (
      <Panel title="أدواتي المحفوظة" subtitle="نتائج يمكن الرجوع لها" icon={<Calculator size={20} />} action={<Link href="/calculator" className="text-xs font-black text-[#B88D35]">حساب جديد</Link>}>
        <div className="grid gap-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.title} href={tool.href} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-[#D0A243]/50 hover:bg-[#FFF9EA]">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-[0.9rem] bg-white text-[#B88D35]">
                  <Icon size={18} />
                </span>
                <p className="font-black">{tool.title}</p>
                <p className="mt-2 text-xs leading-6 text-slate-500">{tool.desc}</p>
              </Link>
            );
          })}
        </div>
      </Panel>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F5F7FB_0%,#EEF2F7_100%)] p-3 text-[#0A2342] md:p-4" dir="rtl">
      <div className="mx-auto grid max-w-[1760px] gap-4 lg:grid-cols-[minmax(0,1fr)_292px]" dir="ltr">
        <main className="min-w-0 space-y-4" dir="rtl">
          <section className="relative overflow-hidden rounded-[1.7rem] border border-[#0A2342]/10 bg-[linear-gradient(135deg,#07192E_0%,#0A2342_52%,#143656_100%)] p-5 text-white shadow-[0_20px_60px_rgba(10,35,66,0.12)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(76,132,180,0.18),transparent_32%)]" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:hidden">
                {investorNav.map((item) => {
                  const Icon = item.icon;
                  const active = item.key === activeSection;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveSection(item.key)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-[0.95rem] border px-3 py-2 text-xs font-bold ${
                        active ? "border-[#D0A243] bg-[#D0A243] text-[#07192E]" : "border-slate-200 bg-slate-50 text-[#0A2342]"
                      }`}
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <div className="text-right">
                <p className="mb-1 text-xs font-bold text-[#E4C36A]">ملف المستثمر</p>
                <h1 className="text-2xl font-black md:text-3xl">{activeNav.label}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-white/68">
                  مرحباً، {investorName}. هنا تتابع طلباتك ومحفوظاتك وشراكاتك من مساحة واحدة واضحة ومرتبة.
                </p>
              </div>
            </div>
          </section>

          {activeSection === "overview" ? renderOverview() : null}
          {activeSection === "lands" ? <div className="grid gap-4 xl:grid-cols-2">{renderLandRequests(true)}{renderSaved(true)}</div> : null}
          {activeSection === "advisory" ? <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">{renderAdvisory(true)}{renderAlerts()}</div> : null}
          {activeSection === "opportunities" ? <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">{renderSaved(true)}{renderTools(true)}</div> : null}
          {activeSection === "partnerships" ? <div className="grid gap-4">{renderPartnerships()}</div> : null}
          {activeSection === "tools" ? <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">{renderTools(true)}{renderAlerts()}</div> : null}
        </main>

        <InvestorSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          name={investorName}
          email={currentUser.email}
          company={currentUser.company}
        />
      </div>
    </div>
  );
}
