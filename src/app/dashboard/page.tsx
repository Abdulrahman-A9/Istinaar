"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpLeft,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Eye,
  FileBadge2,
  FileCheck2,
  FileText,
  Handshake,
  LayoutDashboard,
  Map,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { getAdvisoryPriorityMeta, getAdvisoryWorkflowMeta } from "@/lib/consultingWorkflow";
import { getOpportunityById } from "@/data/opportunities";

const statusConfig = {
  review: { label: "قيد المراجعة", class: "badge-review", icon: <FileText size={12} /> },
  accepted: { label: "مقبول", class: "badge-accepted", icon: <ShieldCheck size={12} /> },
  rejected: { label: "مرفوض", class: "badge-rejected", icon: <FileCheck2 size={12} /> },
  pending_payment: { label: "بانتظار الدفع", class: "badge-review", icon: <Bell size={12} /> },
} as const;

const alertMeta = {
  new_land: { icon: <Map size={16} />, surface: "#EEF4FF", tone: "#0A2342" },
  deadline: { icon: <Bell size={16} />, surface: "#FFF7E1", tone: "#B45309" },
  accepted: { icon: <ShieldCheck size={16} />, surface: "#ECFDF3", tone: "#166534" },
  market: { icon: <BriefcaseBusiness size={16} />, surface: "#F5F3FF", tone: "#6D28D9" },
  partnership: { icon: <Handshake size={16} />, surface: "#ECFDF5", tone: "#047857" },
} as const;

function SectionCard({ title, subtitle, children, action, icon }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode; icon?: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)]">
      <div className="flex items-center justify-between gap-4 mb-5">
        {action ?? <div />}
        <div className="flex items-center gap-3">
          {icon ? <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>{icon}</div> : null}
          <div className="text-right">
            {subtitle ? <p className="text-xs text-slate-400 mb-1">{subtitle}</p> : null}
            <h2 className="font-black text-base" style={{ color: "#0A2342" }}>{title}</h2>
          </div>
        </div>
      </div>
      {children}
    </section>
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

  const unreadAlerts = alerts.filter((alert) => !alert.read).length;
  const myAdvisoryRequests = currentUser ? advisoryRequests.filter((request) => request.accountId === currentUser.id) : [];
  const myPartnershipRequests = currentUser ? partnershipRequests.filter((request) => request.fromAccountId === currentUser.id) : [];

  if (!currentUser) {
    return (
      <div className="min-h-screen px-4 py-14" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
          <div className="rounded-[2rem] p-6 md:p-8 text-white" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
            <h1 className="text-3xl md:text-4xl font-black mb-4">لوحة المستثمر تبدأ بعد تفعيل الحساب</h1>
            <p className="text-white/75 leading-8 mb-6">بعد تسجيل الدخول ستظهر لك الطلبات الحالية، التقارير الاستشارية، المحفوظات، والتنبيهات التشغيلية في واجهة موحدة وواضحة.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                "ملف استثماري واحد لكل مستثمر",
                "عرض واضح للطلبات والحالات دون تعقيد",
                "ربط مباشر بالأراضي والاستشارات والشراكات",
              ].map((item) => (
                <div key={item} className="glass-panel rounded-xl px-4 py-3 text-sm">{item}</div>
              ))}
            </div>
          </div>
          <SectionCard title="ابدأ من هنا" subtitle="Investor Access" icon={<LayoutDashboard size={20} />}>
            <p className="text-sm text-gray-500 leading-7 mb-5 text-right">يمكنك فتح بوابة الحساب، البدء بطلب استشاري، أو استعراض الأراضي المتاحة قبل تفعيل الجلسة الكاملة.</p>
            <div className="flex flex-wrap gap-3 justify-end">
              <Link href="/account" className="btn-gold">افتح بوابة الحساب</Link>
              <Link href="/consulting" className="btn-primary">استعرض المسار الاستشاري</Link>
              <Link href="/lands" className="px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">الأراضي الموسمية</Link>
            </div>
          </SectionCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
      <aside className="hidden md:flex w-72 shrink-0 flex-col p-5 border-l border-white/5" style={{ backgroundColor: "#07192E" }}>
        <div className="rounded-[1.75rem] p-5 mb-6 border border-white/10" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#C9A84C" }}>
              <Users size={22} color="#07192E" />
            </div>
            <div>
              <p className="text-white text-sm font-black leading-tight">ملف المستثمر</p>
              <p className="text-white/45 text-xs mt-1">{currentUser.company || "مستثمر فردي"}</p>
              <p className="text-white/65 text-xs mt-3 leading-6">متابعة الطلبات والاستشارات والفرص المحفوظة من واجهة موحدة وواضحة.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] px-4 py-4 mb-6 border border-white/10 text-right" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
          <p className="text-xs text-white/40 mb-1">المستثمر الحالي</p>
          <p className="text-sm font-bold text-white">{currentUser.fullName}</p>
          <p className="text-xs text-white/50 mt-2">{currentUser.email}</p>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { label: "الرئيسية", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
            { label: "الأراضي المتاحة", href: "/lands", icon: <Map size={18} /> },
            { label: "الاستشارات", href: "/consulting/request", icon: <FileBadge2 size={18} /> },
            { label: "الفرص الاستثمارية", href: "/opportunities", icon: <BriefcaseBusiness size={18} /> },
            { label: "بوابة الشراكات", href: "/partnerships", icon: <Handshake size={18} /> },
          ].map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${index === 0 ? "shadow-[0_14px_30px_rgba(201,168,76,0.16)]" : "text-white/68 hover:text-white hover:bg-white/6"}`}
              style={index === 0 ? { backgroundColor: "#F2E6C7", color: "#07192E" } : {}}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-3 mt-6">
          <Link href="/lands" className="btn-gold w-full justify-center py-3">
            <Map size={16} />
            تقديم طلب جديد
          </Link>
          <Link href="/consulting/request" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl text-sm font-bold border border-white/15 text-white/85 hover:bg-white/10">
            <FileBadge2 size={16} />
            طلب استشاري
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <section className="rounded-[2rem] p-6 md:p-8 mb-6 border border-slate-200/80 bg-white shadow-[0_22px_60px_rgba(10,35,66,0.08)] overflow-hidden relative">
          <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at top left, rgba(201,168,76,0.14), transparent 28%), radial-gradient(circle at bottom right, rgba(10,35,66,0.06), transparent 34%)" }} />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="text-right max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold mb-4" style={{ backgroundColor: "rgba(10,35,66,0.05)", color: "#0A2342" }}>
                <Sparkles size={14} color="#C9A84C" />
                لوحة مستثمر محدثة
              </div>
              <h1 className="text-3xl md:text-4xl font-black" style={{ color: "#0A2342" }}>مرحباً، {currentUser.fullName}</h1>
              <p className="text-slate-500 text-sm md:text-base text-right mt-3 leading-8">هذه اللوحة تجمع كل ما يخص ملفك الاستثماري في مكان واحد: الطلبات، الاستشارات، المحفوظات، والتنبيهات التشغيلية بشكل واضح وبدون تعقيد.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto">
              <div className="rounded-2xl px-4 py-3 border border-slate-200 text-sm text-slate-600 bg-slate-50 inline-flex items-center gap-2">
                <Bell size={16} />
                {unreadAlerts} إشعارات جديدة
              </div>
              <Link href="/account" className="btn-primary px-5 py-3">
                <ArrowUpLeft size={16} />
                إدارة الحساب
              </Link>
            </div>
          </div>
        </section>

        <section className="md:hidden grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "الأراضي", href: "/lands", icon: <Map size={16} /> },
            { label: "الاستشارات", href: "/consulting/request", icon: <FileBadge2 size={16} /> },
            { label: "الفرص", href: "/opportunities", icon: <BriefcaseBusiness size={16} /> },
            { label: "الشراكات", href: "/partnerships", icon: <Handshake size={16} /> },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-navy inline-flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(10,35,66,0.05)]">
              {item.icon}
              {item.label}
            </Link>
          ))}
        </section>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-8">
          {[
            { label: "طلباتي", value: applications.length, icon: <FileText size={22} />, color: "#0A2342", surface: "#EEF4FF" },
            { label: "استشاراتي", value: myAdvisoryRequests.length, icon: <FileBadge2 size={22} />, color: "#2563EB", surface: "#EFF6FF" },
            { label: "الفرص المحفوظة", value: savedOpportunities.length, icon: <BriefcaseBusiness size={22} />, color: "#7C3AED", surface: "#F5F3FF" },
            { label: "الأراضي المحفوظة", value: savedLands.length, icon: <Map size={22} />, color: "#C2891B", surface: "#FFF7E1" },
            { label: "طلبات الشراكة", value: myPartnershipRequests.length, icon: <Handshake size={22} />, color: "#059669", surface: "#ECFDF5" },
            { label: "إشعارات جديدة", value: unreadAlerts, icon: <Bell size={22} />, color: "#DC2626", surface: "#FEF2F2" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(10,35,66,0.06)]">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: stat.surface, color: stat.color }}>
                  {stat.icon}
                </div>
                <p className="text-3xl font-black leading-none" style={{ color: stat.color }}>{stat.value}</p>
              </div>
              <p className="text-sm text-slate-400 text-right mb-2">المؤشر الحالي</p>
              <p className="text-sm font-bold text-right" style={{ color: "#0A2342" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="space-y-6">
            <SectionCard title="طلباتي الحالية" subtitle="Applications" icon={<FileText size={20} />} action={<Link href="/lands" className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: "#0A2342" }}><ArrowUpLeft size={13} />عرض الكل</Link>}>
              {applications.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-gray-500">
                  <FileText size={30} className="mx-auto mb-3" />
                  <p className="text-sm">لا توجد طلبات حالياً</p>
                </div>
              ) : (
                <>
                <div className="md:hidden space-y-3">
                  {applications.map((app) => {
                    const meta = statusConfig[app.status];
                    return (
                      <div key={app.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className={`${meta.class} inline-flex items-center gap-1`}>{meta.icon}{meta.label}</span>
                          <p className="font-black text-sm text-navy">{app.landName}</p>
                        </div>
                        <p className="text-sm text-gray-600">{app.activityType}</p>
                        <p className="text-xs text-gray-500 mt-1">{app.neighborhood} • {app.submittedAt}</p>
                        <button className="text-xs font-medium inline-flex items-center gap-1 mt-3" style={{ color: "#0A2342" }}><Eye size={12} />عرض</button>
                      </div>
                    );
                  })}
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {["إجراءات", "الحالة", "النشاط", "التاريخ", "الحي", "اسم الأرض"].map((header) => (
                          <th key={header} className="text-right text-xs text-gray-400 font-medium pb-3">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => {
                        const meta = statusConfig[app.status];
                        return (
                          <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-3"><button className="text-xs font-medium inline-flex items-center gap-1" style={{ color: "#0A2342" }}><Eye size={12} />عرض</button></td>
                            <td className="py-3"><span className={`${meta.class} inline-flex items-center gap-1`}>{meta.icon}{meta.label}</span></td>
                            <td className="py-3 text-gray-600">{app.activityType}</td>
                            <td className="py-3 text-gray-500">{app.submittedAt}</td>
                            <td className="py-3 text-gray-600">{app.neighborhood}</td>
                            <td className="py-3 font-medium" style={{ color: "#0A2342" }}>{app.landName}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                </>
              )}
            </SectionCard>

            <SectionCard title="طلباتي الاستشارية" subtitle="Advisory Requests" icon={<FileBadge2 size={20} />} action={<Link href="/consulting/request" className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: "#0A2342" }}><ArrowUpLeft size={13} />طلب جديد</Link>}>
              {myAdvisoryRequests.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-gray-500">
                  <FileBadge2 size={30} className="mx-auto mb-3" />
                  <p className="text-sm">لم تُنشئ أي طلبات استشارية بعد</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myAdvisoryRequests.map((request) => {
                    const workflowMeta = getAdvisoryWorkflowMeta(request.workflowStatus);
                    const priorityMeta = getAdvisoryPriorityMeta(request.reviewPriority);
                    return (
                      <div key={request.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                        <div className="text-right">
                          <p className="font-black text-navy">{request.projectName}</p>
                          <p className="text-sm text-gray-500 mt-1">{request.activityType} • {request.neighborhood} • {request.businessModel}</p>
                          <p className="text-xs text-gray-400 mt-1">{request.assignedReviewerName ? `المراجع: ${request.assignedReviewerName}` : "لم يتم تعيين مراجع بعد"}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: workflowMeta.surface, color: workflowMeta.tone }}>{workflowMeta.label}</span>
                          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: priorityMeta.surface, color: priorityMeta.tone }}>{priorityMeta.label}</span>
                          <Link href={`/consulting/report/${request.id}`} className="btn-primary text-sm px-4 py-2">عرض التقرير</Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </SectionCard>

            <SectionCard title="المحفوظات" subtitle="Saved Items" icon={<Bookmark size={20} />}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <h3 className="font-black text-sm mb-3 text-right" style={{ color: "#0A2342" }}>الفرص المحفوظة</h3>
                  {savedOpportunities.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-gray-500">
                      <BriefcaseBusiness size={24} className="mx-auto mb-2" />
                      <p className="text-sm">لم تحفظ فرصاً بعد</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedOpportunities.map((opportunity) => (
                        <div key={opportunity.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white text-navy border border-slate-200 shrink-0">
                            <BriefcaseBusiness size={18} />
                          </div>
                          <div className="flex-1 text-right">
                            <p className="font-bold text-sm" style={{ color: "#0A2342" }}>{opportunity.title}</p>
                            <p className="text-xs text-gray-500">{opportunity.neighborhood} • ROI {opportunity.roi}% • {opportunity.riskLabel}</p>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <Link href={`/opportunities/${getOpportunityById(opportunity.id)?.slug ?? "al-naqrah-drive-thru-cafe"}`} className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ backgroundColor: "#0A2342" }}>عرض</Link>
                            <button onClick={() => removeOpportunity(opportunity.id)} className="text-xs px-2 py-1.5 rounded-lg font-medium text-red-400 hover:bg-red-50">حذف</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-black text-sm mb-3 text-right" style={{ color: "#0A2342" }}>الأراضي المحفوظة</h3>
                  {savedLands.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-gray-500">
                      <Map size={24} className="mx-auto mb-2" />
                      <p className="text-sm">لم تحفظ أي أراضٍ بعد</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedLands.map((land) => (
                        <div key={land.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white text-navy border border-slate-200 shrink-0">
                            <Map size={18} />
                          </div>
                          <div className="flex-1 text-right">
                            <p className="font-bold text-sm" style={{ color: "#0A2342" }}>{land.name}</p>
                            <p className="text-xs text-gray-500">{land.neighborhood} • {land.area.toLocaleString()} م²</p>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <Link href={`/lands/${land.id}`} className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ backgroundColor: "#0A2342" }}>عرض</Link>
                            <button onClick={() => removeLand(land.id)} className="text-xs px-2 py-1.5 rounded-lg font-medium text-red-400 hover:bg-red-50">حذف</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard title="التنبيهات" subtitle="Alerts" icon={<Bell size={20} />}>
              <div className="space-y-3">
                {alerts.map((alert) => {
                  const meta = alertMeta[alert.type];
                  return (
                    <div key={alert.id} className={`rounded-2xl border p-4 text-right ${alert.read ? "border-slate-200 bg-slate-50" : "border-amber-200 bg-amber-50/60"}`}>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: meta.surface, color: meta.tone }}>
                          {meta.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 leading-7">{alert.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                          {!alert.read ? <button onClick={() => markAlertRead(alert.id)} className="text-xs font-semibold mt-3" style={{ color: "#0A2342" }}>تمييز كمقروء</button> : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard title="طلباتي الشراكية" subtitle="Partnership Requests" icon={<Handshake size={20} />} action={<Link href="/coming-soon" className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: "#0A2342" }}><ArrowUpLeft size={13} />بوابة الشراكات</Link>}>
              {myPartnershipRequests.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-gray-500">
                  <Handshake size={28} className="mx-auto mb-3" />
                  <p className="text-sm">لا توجد طلبات شراكة بعد</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myPartnershipRequests.map((request) => (
                    <div key={request.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col gap-4">
                      <div className="text-right">
                        <p className="font-black text-navy">{request.projectName}</p>
                        <p className="text-sm text-gray-500 mt-1">مساهمة مقترحة {request.proposedContribution.toLocaleString()} ريال • ملكية {request.proposedEquity}%</p>
                      </div>
                      <div className="flex justify-end">
                        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: request.status === "accepted" ? "#DCFCE7" : request.status === "declined" ? "#FEE2E2" : "#FEF3C7", color: request.status === "accepted" ? "#166534" : request.status === "declined" ? "#B91C1C" : "#92400E" }}>
                          {request.status === "accepted" ? "مقبول" : request.status === "declined" ? "مرفوض" : "قيد الانتظار"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title="دعم سريع" subtitle="Support" icon={<MessageCircleMore size={20} />}>
              <p className="text-sm text-gray-600 leading-7 text-right mb-4">إذا كنت تحتاج مساعدة في ترتيب ملفك الاستثماري أو قراءة تقريرك الاستشاري، يمكنك الانتقال مباشرة إلى المسار المناسب من الأزرار التالية.</p>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/consulting/request" className="btn-primary w-full justify-center py-3">
                  <FileBadge2 size={16} />
                  بدء طلب استشاري
                </Link>
                <Link href="/lands" className="btn-gold w-full justify-center py-3">
                  <Map size={16} />
                  استعراض الأراضي
                </Link>
                <Link href="/opportunities" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 inline-flex items-center justify-center gap-2">
                  <BriefcaseBusiness size={16} />
                  استعراض الفرص
                </Link>
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}