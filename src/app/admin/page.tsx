"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpLeft,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  ChartColumn,
  CircleDollarSign,
  ClipboardList,
  Database,
  Eye,
  FileBadge2,
  FileText,
  Handshake,
  Landmark,
  LayoutDashboard,
  LineChart,
  Map,
  MessageSquarePlus,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import AmanahWorkspaceShell from "@/components/amanah/AmanahWorkspaceShell";
import lands from "@/data/lands";
import { opportunities } from "@/data/opportunities";
import { useAppStore } from "@/store/appStore";
import {
  advisoryNoteVisibilityMeta,
  advisoryPriorityMeta,
  advisoryWorkflowMeta,
  getAdvisoryNoteVisibilityMeta,
  getAdvisoryPriorityMeta,
  getAdvisoryWorkflowMeta,
} from "@/lib/consultingWorkflow";
import { getAmanahDecisionWorkflow, getAmanahLeadershipBriefs } from "@/lib/amanah";
import { getOpportunityRisk } from "@/lib/opportunities";
import { getPartnerApprovalMeta, getPartnershipWorkflowMeta, summarizePartnershipApprovals } from "@/lib/partnershipWorkflow";

const mockApplications = [
  { id: "A001", name: "شركة واحة حائل للمقاولات", land: "حي الرواي - الموقع أ-١٢٠", activity: "منطقة ألعاب أطفال وترفيه", date: "١٢ أكتوبر ٢٠٢٥", status: "review" as const },
  { id: "A002", name: "سلطان الشمري", land: "الموقع ج-١٠", activity: "كشك قهوة ومأكولات", date: "١٤ أكتوبر ٢٠٢٥", status: "pending_payment" as const },
  { id: "A003", name: "مؤسسة الفارس للتجارة", land: "ميدان الفعاليات - ب-٥", activity: "سوق شعبي موسمي", date: "١٥ أكتوبر ٢٠٢٥", status: "accepted" as const },
  { id: "A004", name: "محمد العتيبي", land: "حي النقرة - م-٢", activity: "مطعم عائلي", date: "١٦ أكتوبر ٢٠٢٥", status: "rejected" as const },
];

const monthlyApplications = [
  { month: "أكتوبر", applications: 12, accepted: 7, revenue: 160 },
  { month: "نوفمبر", applications: 18, accepted: 11, revenue: 220 },
  { month: "ديسمبر", applications: 25, accepted: 15, revenue: 310 },
  { month: "يناير", applications: 31, accepted: 19, revenue: 410 },
  { month: "فبراير", applications: 28, accepted: 18, revenue: 385 },
  { month: "مارس", applications: 35, accepted: 23, revenue: 470 },
];

const neighborhoodDemand = [
  { name: "حي النقرة", value: 35, color: "#0A2342" },
  { name: "الجامعيين", value: 28, color: "#C9A84C" },
  { name: "مشار", value: 22, color: "#16A34A" },
  { name: "المصيف", value: 15, color: "#D97706" },
];

const landStatusLabels = {
  available: { label: "متاحة", class: "badge-available" },
  closed: { label: "مغلقة", class: "badge-closed" },
  reserved: { label: "محجوزة", class: "badge-review" },
};

const applicationStatusMeta = {
  review: { label: "قيد المراجعة", surface: "#FEF3C7", tone: "#92400E" },
  pending_payment: { label: "بانتظار الدفع", surface: "#DBEAFE", tone: "#1D4ED8" },
  accepted: { label: "مقبول", surface: "#DCFCE7", tone: "#166534" },
  rejected: { label: "مرفوض", surface: "#FEE2E2", tone: "#B91C1C" },
} as const;

const navItems = [
  { key: "overview", label: "مركز التشغيل", icon: LayoutDashboard },
  { key: "requests", label: "الطلبات والاعتمادات", icon: ClipboardList },
  { key: "assets", label: "الأصول والفرص", icon: Map },
  { key: "relations", label: "الشراكات والاستشارات", icon: Handshake },
  { key: "governance", label: "الحوكمة والمتابعة", icon: ChartColumn },
] as const;

type ActiveTab = typeof navItems[number]["key"];

type AdminNeighborhoodItem = {
  id: string;
  slug: string;
  name: string;
  city: string;
  analytics?: {
    totalPlaces: number;
    averageRating: number;
    competitionScore: number;
    updatedAt: string;
  } | null;
};

function ShellCard({ title, subtitle, children, action, icon }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode; icon?: React.ReactNode }) {
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

export default function AdminPage() {
  const [chartsReady, setChartsReady] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [reviewerId, setReviewerId] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState<keyof typeof advisoryWorkflowMeta>("submitted");
  const [priority, setPriority] = useState<keyof typeof advisoryPriorityMeta>("standard");
  const [reviewDueDate, setReviewDueDate] = useState("");
  const [reviewSummary, setReviewSummary] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteVisibility, setNoteVisibility] = useState<"internal" | "client">("internal");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [partnerContribution, setPartnerContribution] = useState(0);
  const [partnerEquity, setPartnerEquity] = useState(0);
  const [partnerProfit, setPartnerProfit] = useState(0);
  const [partnerResponsibilities, setPartnerResponsibilities] = useState("");
  const [partnerApprovalNote, setPartnerApprovalNote] = useState("");
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<AdminNeighborhoodItem[]>([]);
  const [selectedNeighborhoodSlug, setSelectedNeighborhoodSlug] = useState("");
  const [refreshingNeighborhood, setRefreshingNeighborhood] = useState(false);
  const [refreshFeedback, setRefreshFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const currentUser = useAppStore((state) => state.currentUser);

  const advisoryRequests = useAppStore((state) => state.advisoryRequests);
  const reviewers = useAppStore((state) => state.reviewers);
  const partnershipRequests = useAppStore((state) => state.partnershipRequests);
  const partnerProfiles = useAppStore((state) => state.partnerProfiles);
  const assignReviewer = useAppStore((state) => state.assignReviewer);
  const updateAdvisoryWorkflow = useAppStore((state) => state.updateAdvisoryWorkflow);
  const addAdvisoryNote = useAppStore((state) => state.addAdvisoryNote);
  const respondToPartnershipRequest = useAppStore((state) => state.respondToPartnershipRequest);
  const updateProjectPartnerTerms = useAppStore((state) => state.updateProjectPartnerTerms);

  const selectedRequest = useMemo(
    () => advisoryRequests.find((request) => request.id === selectedRequestId) ?? advisoryRequests[0],
    [advisoryRequests, selectedRequestId]
  );

  const stats = {
    totalLands: lands.length,
    incoming: mockApplications.length,
    accepted: mockApplications.filter((application) => application.status === "accepted").length,
    revenue: lands.reduce((sum, land) => sum + land.price, 0),
    advisory: advisoryRequests.length,
    humanReview: advisoryRequests.filter((request) => request.wantsHumanReview).length,
  };

  const workflowCounts = useMemo(
    () => advisoryRequests.reduce<Record<string, number>>((accumulator, request) => {
      accumulator[request.workflowStatus] = (accumulator[request.workflowStatus] ?? 0) + 1;
      return accumulator;
    }, {}),
    [advisoryRequests]
  );

  const partnershipCounts = useMemo(
    () => partnershipRequests.reduce<Record<string, number>>((accumulator, request) => {
      accumulator[request.status] = (accumulator[request.status] ?? 0) + 1;
      return accumulator;
    }, {}),
    [partnershipRequests]
  );

  const amanahDecisionWorkflow = useMemo(() => getAmanahDecisionWorkflow(), []);
  const leadershipBriefs = useMemo(() => getAmanahLeadershipBriefs(), []);

  useEffect(() => {
    setChartsReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadNeighborhoods = async () => {
      try {
        const response = await fetch("/api/neighborhoods", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("تعذر تحميل الأحياء");
        }

        const payload = await response.json();
        if (cancelled) {
          return;
        }

        const items = Array.isArray(payload.items) ? payload.items as AdminNeighborhoodItem[] : [];
        setNeighborhoodOptions(items);
        setSelectedNeighborhoodSlug((current) => current || items[0]?.slug || "");
      } catch {
        if (!cancelled) {
          setRefreshFeedback({ type: "error", message: "تعذر تحميل قائمة الأحياء من مخزن البيانات." });
        }
      }
    };

    loadNeighborhoods();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedRequestId && advisoryRequests.length > 0) {
      setSelectedRequestId(advisoryRequests[0].id);
    }
  }, [advisoryRequests, selectedRequestId]);

  useEffect(() => {
    if (!selectedRequest) {
      return;
    }

    setReviewerId(selectedRequest.assignedReviewerId ?? "");
    setWorkflowStatus(selectedRequest.workflowStatus);
    setPriority(selectedRequest.reviewPriority);
    setReviewDueDate(selectedRequest.reviewDueDate ?? "");
    setReviewSummary(selectedRequest.reviewSummary ?? "");

    const editablePartner = selectedRequest.partners.find((partner) => partner.role !== "owner") ?? selectedRequest.partners[0];
    if (!editablePartner) {
      return;
    }

    setSelectedPartnerId(editablePartner.id);
    setPartnerContribution(editablePartner.contribution);
    setPartnerEquity(editablePartner.equityShare);
    setPartnerProfit(editablePartner.profitShare);
    setPartnerResponsibilities(editablePartner.responsibilities);
    setPartnerApprovalNote(editablePartner.approvalNote ?? "");
  }, [selectedRequest]);

  useEffect(() => {
    const editablePartner = selectedRequest?.partners.find((partner) => partner.id === selectedPartnerId);
    if (!editablePartner) {
      return;
    }

    setPartnerContribution(editablePartner.contribution);
    setPartnerEquity(editablePartner.equityShare);
    setPartnerProfit(editablePartner.profitShare);
    setPartnerResponsibilities(editablePartner.responsibilities);
    setPartnerApprovalNote(editablePartner.approvalNote ?? "");
  }, [selectedPartnerId, selectedRequest]);

  const handleSaveWorkflow = () => {
    if (!selectedRequest) {
      return;
    }

    if (reviewerId && reviewerId !== selectedRequest.assignedReviewerId) {
      assignReviewer(selectedRequest.id, reviewerId);
    }

    updateAdvisoryWorkflow(selectedRequest.id, {
      workflowStatus,
      reviewPriority: priority,
      reviewDueDate: reviewDueDate || undefined,
      reviewSummary: reviewSummary || undefined,
    });
  };

  const handleAddNote = () => {
    if (!selectedRequest || !noteContent.trim()) {
      return;
    }

    addAdvisoryNote(selectedRequest.id, {
      authorName: selectedRequest.assignedReviewerName ?? "فريق الأمانة",
      authorRole: selectedRequest.assignedReviewerName ? "reviewer" : "system",
      visibility: noteVisibility,
      content: noteContent.trim(),
    });
    setNoteContent("");
  };

  const handleSavePartnerTerms = () => {
    if (!selectedRequest || !selectedPartnerId) {
      return;
    }

    updateProjectPartnerTerms(selectedRequest.id, selectedPartnerId, {
      contribution: partnerContribution,
      equityShare: partnerEquity,
      profitShare: partnerProfit,
      responsibilities: partnerResponsibilities,
      approvalNote: partnerApprovalNote,
    });
  };

  const handleNeighborhoodRefresh = async () => {
    if (!selectedNeighborhoodSlug) {
      return;
    }

    try {
      setRefreshingNeighborhood(true);
      setRefreshFeedback(null);

      const response = await fetch(`/api/admin/neighborhoods/${selectedNeighborhoodSlug}/refresh`, {
        method: "POST",
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? "فشل تحديث بيانات الحي");
      }

      setRefreshFeedback({
        type: "success",
        message: `تم تحديث ${payload.placesCount} نشاطاً وربطها بالحي المختار.`,
      });

      setNeighborhoodOptions((current) => current.map((item) => item.slug === selectedNeighborhoodSlug ? {
        ...item,
        analytics: payload.analytics,
      } : item));
    } catch (error) {
      setRefreshFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "فشل تحديث بيانات الحي",
      });
    } finally {
      setRefreshingNeighborhood(false);
    }
  };

  const selectedNeighborhoodItem = useMemo(
    () => neighborhoodOptions.find((item) => item.slug === selectedNeighborhoodSlug) ?? null,
    [neighborhoodOptions, selectedNeighborhoodSlug]
  );

  const currentTitle = {
    overview: "مركز التشغيل اليومي",
    requests: "الطلبات والاعتمادات",
    assets: "الأصول والفرص",
    relations: "الشراكات والاستشارات",
    governance: "الحوكمة والمتابعة",
  }[activeTab];

  const primaryNavItem = navItems[0];
  const secondaryNavItems = navItems.slice(1);
  const workspaceItems = [
    {
      key: "admin-home",
      label: "إدارة الأمانة",
      icon: LayoutDashboard,
      href: "/admin",
      isActive: true,
    },
    {
      key: "portal",
      label: "لوحة الذكاء الاستثماري",
      icon: Landmark,
      href: "/investment-intelligence",
    },
    {
      key: "executive",
      label: "التقارير التنفيذية",
      icon: FileText,
      href: "/investment-intelligence?tab=executive",
    },
  ];

  const sectionItems = [
    {
      key: primaryNavItem.key,
      label: primaryNavItem.label,
      icon: primaryNavItem.icon,
      isActive: activeTab === primaryNavItem.key,
      onSelect: () => setActiveTab(primaryNavItem.key),
    },
    ...secondaryNavItems.map((item) => ({
      key: item.key,
      label: item.label,
      icon: item.icon,
      isActive: activeTab === item.key,
      onSelect: () => setActiveTab(item.key),
    })),
  ];

  if (!currentUser || currentUser.role !== "authority") {
    return (
      <div className="min-h-screen px-4 py-14" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-6 items-start">
          <section className="rounded-[2rem] p-7 text-white" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 62%, #183B6B 100%)" }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6" style={{ backgroundColor: "rgba(201,168,76,0.14)", color: "#F5D88E" }}>
              <Building2 size={16} />
              إدارة الأمانة
            </span>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">الصفحة التشغيلية الخاصة بالأمانة</h1>
            <p className="text-white/75 leading-8 max-w-2xl mr-0 ml-auto">
              هذه الصفحة مخصصة للحسابات المخولة من أمانة منطقة حائل، وتجمع الإدارة التنفيذية للأراضي والطلبات والفرص والشراكات والتقارير في مستوى تشغيلي واحد.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_rgba(10,35,66,0.08)] text-right">
            <p className="text-xs text-slate-400 mb-2">Amanah Administration</p>
            <h2 className="text-2xl font-black text-navy mb-3">الوصول يتطلب حساب أمانة مخول</h2>
            <p className="text-sm text-gray-600 leading-8 mb-6">
              يمكنك تسجيل الدخول من لوحة الذكاء الاستثماري أولاً، ثم الانتقال إلى هذه الصفحة لإدارة التشغيل اليومي والمحتوى والتقارير التنفيذية.
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              <Link href="/investment-intelligence" className="btn-gold">
                افتح لوحة الذكاء الاستثماري
                <ArrowUpLeft size={16} />
              </Link>
              <Link href="/" className="btn-primary">العودة إلى الرئيسية</Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <AmanahWorkspaceShell
      identityIcon={<Building2 size={22} color="#07192E" />}
      identityTitle="إدارة الأمانة التشغيلية"
      identitySubtitle="أمانة منطقة حائل"
      identityDescription="لوحة تنفيذية موحدة لإدارة الأراضي والطلبات والشراكات والمراجعة الاستشارية."
      workspaceItems={workspaceItems}
      sectionItems={sectionItems}
      statusEyebrow="وضع التشغيل"
      statusTitle="متابعة تنفيذية يومية"
      statusDescription="الأولوية الحالية موجهة لرفع جودة العرض، تصفية الطلبات، واعتماد ملفات الشراكة."
    >
        <section className="rounded-[2rem] p-6 md:p-8 mb-6 border border-slate-200/80 bg-white shadow-[0_22px_60px_rgba(10,35,66,0.08)] overflow-hidden relative">
          <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at top left, rgba(201,168,76,0.14), transparent 28%), radial-gradient(circle at bottom right, rgba(10,35,66,0.06), transparent 34%)" }} />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="text-right max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold mb-4" style={{ backgroundColor: "rgba(10,35,66,0.05)", color: "#0A2342" }}>
                <Sparkles size={14} color="#C9A84C" />
                لوحة تنفيذية محدثة
              </div>
              <h1 className="text-3xl md:text-4xl font-black" style={{ color: "#0A2342" }}>{currentTitle}</h1>
              <p className="text-slate-500 text-sm md:text-base text-right mt-3 leading-8">واجهة تشغيل احترافية تجمع المؤشرات والسجلات والتقارير والموافقات في مستوى عرض واحد واضح ورسمي.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto">
              <Link href="/investment-intelligence?tab=executive" className="px-4 py-3 rounded-2xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50">التقارير التنفيذية</Link>
              <button className="btn-primary px-5 py-3">
                <Plus size={16} />
                إجراء تنفيذي جديد
              </button>
            </div>
          </div>
        </section>

        <section className="md:hidden rounded-[1.85rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(10,35,66,0.06)] mb-6">
          <div className="flex flex-wrap gap-3 justify-end">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-colors"
                  style={active ? { backgroundColor: "#0A2342", color: "white" } : { backgroundColor: "#F4F7FB", color: "#526071" }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </section>

        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              {[
                { label: "إجمالي الأراضي", value: stats.totalLands, icon: Map, color: "#0A2342", surface: "#EEF4FF" },
                { label: "الطلبات الواردة", value: stats.incoming, icon: ClipboardList, color: "#C2891B", surface: "#FFF7E1" },
                { label: "الطلبات المقبولة", value: stats.accepted, icon: ShieldCheck, color: "#15803D", surface: "#ECFDF3" },
                { label: "إيرادات الموسم", value: `${stats.revenue.toLocaleString()} ر`, icon: CircleDollarSign, color: "#7C3AED", surface: "#F4F0FF" },
                { label: "الطلبات الاستشارية", value: stats.advisory, icon: FileBadge2, color: "#2563EB", surface: "#EFF6FF" },
                { label: "مراجعات بشرية", value: stats.humanReview, icon: Users, color: "#B45309", surface: "#FFF7ED" },
                { label: "الفرص الاستثمارية", value: opportunities.length, icon: BriefcaseBusiness, color: "#7C3AED", surface: "#F5F3FF" },
                { label: "طلبات الشراكة", value: partnershipRequests.length, icon: Handshake, color: "#059669", surface: "#ECFDF5" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(10,35,66,0.06)]">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: stat.surface, color: stat.color }}>
                        <Icon size={22} />
                      </div>
                      <p className="text-3xl font-black leading-none" style={{ color: stat.color }}>{stat.value}</p>
                    </div>
                    <p className="text-sm text-slate-400 text-right mb-2">المؤشر التنفيذي</p>
                    <p className="text-sm font-bold text-right" style={{ color: "#0A2342" }}>{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6 mb-6">
              <ShellCard title="ملخص تنفيذي للعرض أمام الأمانة" subtitle="Executive Summary" icon={<Landmark size={22} />}>
                <p className="text-sm text-gray-600 leading-8 mb-5 text-right">الجزء الاستشاري أصبح الآن يدار بمسار تشغيلي فعلي: استقبال الطلب، تعيين المراجع، تدوين الملاحظات، ثم إغلاق المراجعة مع بقاء التقرير الآلي كأساس للقرار.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(advisoryWorkflowMeta).map(([key, meta]) => (
                    <div key={key} className="rounded-2xl px-4 py-4 text-right border border-white/70" style={{ backgroundColor: meta.surface, color: meta.tone }}>
                      <p className="font-black text-sm">{meta.label}</p>
                      <p className="text-xs mt-1">{workflowCounts[key] ?? 0} طلب</p>
                    </div>
                  ))}
                </div>
              </ShellCard>

              <ShellCard
                title="أحدث الطلبات الاستشارية"
                subtitle="Latest Advisory Queue"
                icon={<ShieldCheck size={22} />}
                action={<button onClick={() => setActiveTab("relations")} className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: "#0A2342" }}><ArrowUpLeft size={13} />فتح مركز المراجعة</button>}
              >
                <div className="space-y-3">
                  {advisoryRequests.slice(0, 3).map((request) => {
                    const workflowMeta = getAdvisoryWorkflowMeta(request.workflowStatus);
                    return (
                      <div key={request.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-4 hover:bg-white transition-colors">
                        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: workflowMeta.surface, color: workflowMeta.tone }}>{workflowMeta.label}</span>
                        <div className="text-right">
                          <p className="font-bold text-sm" style={{ color: "#0A2342" }}>{request.projectName}</p>
                          <p className="text-xs text-gray-400">{request.assignedReviewerName ?? "غير معيّن"} • {request.neighborhood}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ShellCard>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <ShellCard title="منحنى الطلب والقبول الشهري" subtitle="Demand Curve" icon={<LineChart size={20} />}>
                <div className="h-72">
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyApplications} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="applicationsFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0A2342" stopOpacity={0.22} />
                            <stop offset="100%" stopColor="#0A2342" stopOpacity={0.03} />
                          </linearGradient>
                          <linearGradient id="acceptedFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#C9A84C" stopOpacity={0.04} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="applications" stroke="#0A2342" fill="url(#applicationsFill)" strokeWidth={3} name="الطلبات" />
                        <Area type="monotone" dataKey="accepted" stroke="#C9A84C" fill="url(#acceptedFill)" strokeWidth={3} name="المقبول" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
              </ShellCard>

              <ShellCard title="توزيع الطلب على الأحياء" subtitle="Neighborhood Mix" icon={<TrendingUp size={20} />}>
                <div className="h-72">
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={neighborhoodDemand} dataKey="value" nameKey="name" innerRadius={50} outerRadius={86}>
                          {neighborhoodDemand.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
              </ShellCard>

              <ShellCard
                title="مركز العمليات الموحد"
                subtitle="Unified Operations"
                icon={<BadgeDollarSign size={20} />}
                action={<button onClick={() => setActiveTab("relations")} className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: "#0A2342" }}><ArrowUpLeft size={13} />فتح إدارة الشراكات</button>}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-4">
                  <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 text-right">
                    <p className="text-lg font-black text-navy mb-1">{opportunities.filter((item) => item.featured).length} فرص مميزة</p>
                    <p className="text-sm text-gray-500">قابلة للعرض المباشر أو التحويل إلى دراسة تفصيلية.</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 text-right">
                    <p className="text-lg font-black text-navy mb-1">{partnershipCounts.pending ?? 0} شراكات معلقة</p>
                    <p className="text-sm text-gray-500">تحتاج اعتماداً أو توجيهاً من الإدارة قبل تثبيت الهيكلة.</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 text-right">
                    <p className="text-lg font-black text-navy mb-1">{advisoryRequests.filter((request) => request.partnershipWorkflowStatus === "fully_approved").length} ملفات مشتركة مكتملة</p>
                    <p className="text-sm text-gray-500">جاهزة للتقديم أو للتصدير التنفيذي ومشاركة القرار.</p>
                  </div>
                </div>
              </ShellCard>
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-6">
            <ShellCard title="مسار القرار داخل الأمانة" subtitle="Executive Workflow" icon={<Sparkles size={20} />}>
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                {amanahDecisionWorkflow.steps.map((step, index) => (
                  <div key={step.id} className="rounded-[1.45rem] border border-slate-200 bg-slate-50 p-5 text-right relative overflow-hidden">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 text-sm font-black" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
                      {index + 1}
                    </div>
                    <p className="font-black text-navy mb-2">{step.title}</p>
                    <p className="text-sm text-gray-600 leading-7 mb-4">{step.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 gap-3">
                      <span>{step.duration}</span>
                      <span>{step.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ShellCard>

            <div className="grid grid-cols-1 xl:grid-cols-[1.08fr_0.92fr] gap-6">
              <ShellCard title="الحالات الجارية على المسار" subtitle="Current Cases" icon={<ClipboardList size={20} />}>
                <div className="space-y-4">
                  {amanahDecisionWorkflow.cases.map((caseItem) => (
                    <div key={caseItem.id} className="rounded-[1.4rem] border border-slate-200 p-5 bg-white text-right">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: caseItem.stageTone + "16", color: caseItem.stageTone }}>{caseItem.stageLabel}</span>
                        <div>
                          <p className="font-black text-navy">{caseItem.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{caseItem.neighborhood} • {caseItem.anchorAsset}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3 text-center">
                        <div className="rounded-xl px-3 py-3" style={{ backgroundColor: "#F8FAFD" }}>
                          <p className="text-xs text-slate-400 mb-1">درجة الجاهزية</p>
                          <p className="text-lg font-black" style={{ color: caseItem.stageTone }}>{caseItem.readinessScore}%</p>
                        </div>
                        <div className="rounded-xl px-3 py-3" style={{ backgroundColor: "#F8FAFD" }}>
                          <p className="text-xs text-slate-400 mb-1">الإجراء التالي</p>
                          <p className="text-sm font-bold text-navy leading-6">{caseItem.stageLabel}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-xl px-4 py-3 border border-slate-200 bg-slate-50">
                          <p className="text-xs text-slate-400 mb-1">الزاوية القرارّية</p>
                          <p className="text-sm text-gray-600 leading-7">{caseItem.decisionLens}</p>
                        </div>
                        <div className="rounded-xl px-4 py-3 border border-slate-200 bg-slate-50">
                          <p className="text-xs text-slate-400 mb-1">القيمة المباشرة للأمانة</p>
                          <p className="text-sm text-gray-600 leading-7">{caseItem.municipalityValue}</p>
                        </div>
                        <div className="rounded-xl px-4 py-3 border border-slate-200 bg-slate-50">
                          <p className="text-xs text-slate-400 mb-1">الخطوة القادمة</p>
                          <p className="text-sm text-gray-600 leading-7">{caseItem.nextAction}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ShellCard>

              <div className="space-y-6">
                <ShellCard title="ملخص اعتماد القرار" subtitle="Decision Gate" icon={<Landmark size={20} />}>
                  <div className="space-y-4 text-right">
                    <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs text-slate-400 mb-2">قاعدة العمل</p>
                      <p className="text-base font-black text-navy mb-2">استنار يدعم القرار ولا ينفذ القرار الرسمي</p>
                      <p className="text-sm text-gray-600 leading-7">المسار ينتهي عند التوصية والموجز القيادي، ثم تنتقل الحالة إلى القنوات الرسمية خارج المنصة.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        "الإشارة الجديدة لا تعني موافقة، بل بداية قراءة داخلية.",
                        "الجاهزية العالية تنقل الملف إلى موجز قرار لا إلى طرح مباشر تلقائي.",
                        "أي اعتماد أو اشتراط نهائي يبقى في المنصات الرسمية الحكومية.",
                      ].map((item) => (
                        <div key={item} className="rounded-xl px-4 py-3 border border-slate-200 bg-white text-sm text-gray-600 leading-7">{item}</div>
                      ))}
                    </div>
                  </div>
                </ShellCard>

                <ShellCard title="موجزات جاهزة للقيادة" subtitle="Leadership Briefs" icon={<FileText size={20} />}>
                  <div className="space-y-3">
                    {leadershipBriefs.map((brief) => (
                      <div key={brief.id} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-right">
                        <p className="text-xs text-slate-400 mb-1">{brief.title}</p>
                        <p className="font-black text-navy mb-2">{brief.angle}</p>
                        <p className="text-sm text-gray-600 leading-7 mb-3">{brief.recommendation}</p>
                        <Link href="/investment-intelligence?tab=executive" className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: "#0A2342" }}>
                          <ArrowUpLeft size={13} />
                          افتح التبويب التنفيذي
                        </Link>
                      </div>
                    ))}
                  </div>
                </ShellCard>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assets" && (
          <ShellCard title="سجل الأراضي الموسمية" subtitle="Land Registry" icon={<Map size={20} />} action={<button className="btn-gold text-sm px-4 py-2"><Plus size={14} />إضافة أرض جديدة</button>}>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 md:p-5 mb-5">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold mb-3" style={{ backgroundColor: "rgba(10,35,66,0.06)", color: "#0A2342" }}>
                    <Database size={14} />
                    مزامنة Google Places
                  </div>
                  <h3 className="text-lg font-black" style={{ color: "#0A2342" }}>تحديث بيانات الحي من المصدر الفعلي</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-7">اختر الحي ثم شغّل المزامنة لجلب الأنشطة التجارية والتقييمات والمنافسة من Google Places وتحديث مخزن التحليل الداخلي.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:items-center">
                  <select value={selectedNeighborhoodSlug} onChange={(event) => setSelectedNeighborhoodSlug(event.target.value)} className="min-w-[220px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none">
                    {neighborhoodOptions.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                  <button onClick={handleNeighborhoodRefresh} disabled={!selectedNeighborhoodSlug || refreshingNeighborhood} className="btn-primary px-5 py-3 disabled:opacity-60 disabled:cursor-not-allowed">
                    <RefreshCw size={16} className={refreshingNeighborhood ? "animate-spin" : ""} />
                    {refreshingNeighborhood ? "جارٍ تحديث الحي" : "تحديث بيانات الحي"}
                  </button>
                  {selectedNeighborhoodSlug ? <Link href={`/location-analysis/${selectedNeighborhoodSlug}`} className="px-4 py-3 rounded-2xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-white">فتح التحليل</Link> : null}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div className="rounded-2xl bg-white border border-slate-200 px-4 py-4 text-right">
                  <p className="text-xs text-slate-400 mb-1">الأنشطة الحالية</p>
                  <p className="text-lg font-black" style={{ color: "#0A2342" }}>{selectedNeighborhoodItem?.analytics?.totalPlaces ?? 0}</p>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 px-4 py-4 text-right">
                  <p className="text-xs text-slate-400 mb-1">متوسط التقييم</p>
                  <p className="text-lg font-black" style={{ color: "#0A2342" }}>{selectedNeighborhoodItem?.analytics?.averageRating?.toFixed(1) ?? "0.0"}</p>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 px-4 py-4 text-right">
                  <p className="text-xs text-slate-400 mb-1">حدة المنافسة</p>
                  <p className="text-lg font-black" style={{ color: "#0A2342" }}>{selectedNeighborhoodItem?.analytics?.competitionScore ?? 0}/100</p>
                </div>
              </div>

              {refreshFeedback ? (
                <div className="mt-4 rounded-2xl px-4 py-3 text-sm font-semibold text-right" style={refreshFeedback.type === "success" ? { backgroundColor: "#ECFDF3", color: "#166534" } : { backgroundColor: "#FEF2F2", color: "#B91C1C" }}>
                  {refreshFeedback.message}
                </div>
              ) : null}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["إجراءات", "الموسم", "الحالة", "م²", "الحي", "اسم الأرض"].map((header) => (
                      <th key={header} className="text-right text-xs text-gray-400 font-medium pb-3">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lands.map((land) => (
                    <tr key={land.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3"><button className="text-xs px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100">تعديل</button></td>
                      <td className="py-3 text-xs text-gray-500">{land.season}</td>
                      <td className="py-3"><span className={landStatusLabels[land.status].class + " text-xs"}>{landStatusLabels[land.status].label}</span></td>
                      <td className="py-3 text-gray-600 text-xs">{land.area.toLocaleString()}</td>
                      <td className="py-3 text-gray-600 text-xs">{land.neighborhood}</td>
                      <td className="py-3 font-medium text-xs" style={{ color: "#0A2342" }}>{land.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ShellCard>
        )}

        {activeTab === "requests" && (
          <ShellCard title="إدارة الطلبات الواردة" subtitle="Incoming Applications" icon={<ClipboardList size={20} />}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["الحالة", "نوع النشاط", "الأرض المطلوبة", "التاريخ", "اسم المتقدم"].map((header) => (
                      <th key={header} className="text-right text-xs text-gray-400 font-medium pb-3">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockApplications.map((app) => {
                    const meta = applicationStatusMeta[app.status];
                    return (
                      <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3"><span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: meta.surface, color: meta.tone }}>{meta.label}</span></td>
                        <td className="py-3 text-gray-600 text-xs">{app.activity}</td>
                        <td className="py-3 text-gray-600 text-xs">{app.land}</td>
                        <td className="py-3 text-gray-500 text-xs">{app.date}</td>
                        <td className="py-3 font-medium text-xs" style={{ color: "#0A2342" }}>{app.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ShellCard>
        )}

        {activeTab === "assets" && (
          <ShellCard title="إدارة الفرص الاستثمارية" subtitle="Opportunity Management" icon={<BriefcaseBusiness size={20} />} action={<button className="btn-gold text-sm px-4 py-2"><Plus size={14} />إضافة فرصة جديدة</button>}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["إجراءات", "المخاطر", "ROI", "الجدوى", "الحي", "التصنيف", "اسم الفرصة"].map((header) => (
                      <th key={header} className="text-right text-xs text-gray-400 font-medium pb-3">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opportunity) => {
                    const risk = getOpportunityRisk(opportunity);
                    return (
                      <tr key={opportunity.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3"><Link href={`/opportunities/${opportunity.slug}`} className="text-xs px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100">فتح</Link></td>
                        <td className="py-3"><span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: risk.bgColor, color: risk.color }}>{risk.label}</span></td>
                        <td className="py-3 text-xs text-gray-500">{opportunity.roi}%</td>
                        <td className="py-3 text-xs text-gray-500">{opportunity.feasibilityScore}%</td>
                        <td className="py-3 text-xs text-gray-500">{opportunity.neighborhood}</td>
                        <td className="py-3 text-xs text-gray-500">{opportunity.category}</td>
                        <td className="py-3 font-medium text-xs" style={{ color: "#0A2342" }}>{opportunity.title}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ShellCard>
        )}

        {activeTab === "relations" && (
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "جميع الطلبات", value: partnershipRequests.length },
                  { label: "معلقة", value: partnershipCounts.pending ?? 0 },
                  { label: "مقبولة", value: partnershipCounts.accepted ?? 0 },
                  { label: "ملفات الشركاء", value: partnerProfiles.length },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.4rem] border border-slate-200 bg-white p-5 text-right shadow-[0_12px_35px_rgba(10,35,66,0.05)]">
                    <p className="text-2xl font-black text-navy">{item.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>

              <ShellCard title="طلبات الشراكة الواردة" subtitle="Partnership Requests" icon={<Handshake size={20} />}>
                <div className="space-y-3">
                  {partnershipRequests.map((request) => (
                    <div key={request.id} className="rounded-2xl border border-gray-100 p-4 text-right">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex gap-2">
                          {request.status === "pending" ? (
                            <>
                              <button onClick={() => respondToPartnershipRequest(request.id, "accepted")} className="btn-primary text-xs px-3 py-2">اعتماد</button>
                              <button onClick={() => respondToPartnershipRequest(request.id, "declined")} className="px-3 py-2 rounded-xl border border-red-200 text-xs font-semibold text-red-600 bg-red-50">رفض</button>
                            </>
                          ) : null}
                        </div>
                        <div>
                          <p className="font-black text-navy">{request.projectName}</p>
                          <p className="text-xs text-gray-400">{request.fromName} • {request.createdAt}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-7 mb-3">{request.message}</p>
                      <div className="flex flex-wrap gap-3 justify-end text-xs text-gray-500">
                        <span>المساهمة {request.proposedContribution.toLocaleString()} ريال</span>
                        <span>ملكية {request.proposedEquity}%</span>
                        <span className="font-semibold">{request.status === "accepted" ? "مقبول" : request.status === "declined" ? "مرفوض" : "قيد الانتظار"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ShellCard>
            </div>

            <div className="space-y-6">
              <ShellCard title="ملفات المشاريع المشتركة" subtitle="Joint Projects" icon={<ShieldCheck size={20} />}>
                <div className="space-y-3">
                  {advisoryRequests.filter((request) => request.partners.length > 1).map((request) => {
                    const meta = getPartnershipWorkflowMeta(request.partnershipWorkflowStatus);
                    const approvals = summarizePartnershipApprovals(request);
                    return (
                      <div key={request.id} className="rounded-2xl bg-gray-50 p-4 text-right border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: meta.surface, color: meta.tone }}>{meta.label}</span>
                          <div>
                            <p className="font-black text-navy">{request.projectName}</p>
                            <p className="text-xs text-gray-400">{request.partners.length} شركاء • {request.neighborhood}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs text-gray-500">
                          <div className="rounded-xl bg-white p-3">موافقات {approvals.approved}</div>
                          <div className="rounded-xl bg-white p-3">بانتظار {approvals.pending}</div>
                          <div className="rounded-xl bg-white p-3">تعديلات {approvals.changesRequested}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ShellCard>

              <ShellCard title="دليل الشركاء" subtitle="Partner Directory" icon={<Users size={20} />}>
                <div className="space-y-3">
                  {partnerProfiles.map((profile) => (
                    <div key={profile.id} className="rounded-2xl border border-gray-100 p-4 text-right">
                      <p className="font-black text-navy">{profile.displayName}</p>
                      <p className="text-xs text-gray-400 mb-2">{profile.role} • {profile.city}</p>
                      <p className="text-sm text-gray-600 leading-7">{profile.bio}</p>
                    </div>
                  ))}
                </div>
              </ShellCard>
            </div>
          </div>
        )}

        {activeTab === "relations" && (
          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(advisoryWorkflowMeta).map(([key, meta]) => (
                  <div key={key} className="rounded-[1.4rem] border border-slate-200 bg-white p-5 text-right shadow-[0_12px_35px_rgba(10,35,66,0.05)]">
                    <p className="text-2xl font-black" style={{ color: meta.tone }}>{workflowCounts[key] ?? 0}</p>
                    <p className="text-sm mt-1" style={{ color: meta.tone }}>{meta.label}</p>
                  </div>
                ))}
              </div>

              <ShellCard title="قائمة الطلبات الاستشارية" subtitle="Consulting Pipeline" icon={<FileBadge2 size={20} />}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {["تفاصيل", "المراجع", "الأولوية", "الحالة", "المنافسون", "الملاءمة", "المشروع"].map((header) => (
                          <th key={header} className="text-right text-xs text-gray-400 font-medium pb-3">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {advisoryRequests.map((request) => {
                        const workflowMeta = getAdvisoryWorkflowMeta(request.workflowStatus);
                        const priorityMeta = getAdvisoryPriorityMeta(request.reviewPriority);
                        const isSelected = selectedRequest?.id === request.id;
                        return (
                          <tr key={request.id} className={`border-b border-gray-50 cursor-pointer transition-colors ${isSelected ? "bg-blue-50/60" : "hover:bg-gray-50"}`} onClick={() => setSelectedRequestId(request.id)}>
                            <td className="py-3"><button className="text-xs px-2 py-1 rounded-lg border border-gray-200 text-gray-600 inline-flex items-center gap-1"><Eye size={11} />فتح</button></td>
                            <td className="py-3 text-xs text-gray-500">{request.assignedReviewerName ?? "غير معيّن"}</td>
                            <td className="py-3"><span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: priorityMeta.surface, color: priorityMeta.tone }}>{priorityMeta.label}</span></td>
                            <td className="py-3"><span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: workflowMeta.surface, color: workflowMeta.tone }}>{workflowMeta.label}</span></td>
                            <td className="py-3 text-xs text-gray-500">{request.locationSnapshot.estimatedCompetitors}</td>
                            <td className="py-3 text-xs text-gray-500">{request.locationSnapshot.fitScore}%</td>
                            <td className="py-3">
                              <div className="text-right">
                                <p className="font-medium text-xs" style={{ color: "#0A2342" }}>{request.projectName}</p>
                                <p className="text-xs text-gray-400">{request.activityType} • {request.neighborhood}</p>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </ShellCard>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              {selectedRequest ? (
                <>
                  <ShellCard title={selectedRequest.projectName} subtitle="Consulting Detail" icon={<ShieldCheck size={20} />}>
                    {(() => {
                      const selectedWorkflowMeta = getAdvisoryWorkflowMeta(selectedRequest.workflowStatus);
                      const selectedPartnershipMeta = getPartnershipWorkflowMeta(selectedRequest.partnershipWorkflowStatus);
                      return (
                        <div className="text-right">
                          <div className="flex items-center justify-between mb-4">
                            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: selectedWorkflowMeta.surface, color: selectedWorkflowMeta.tone }}>{selectedWorkflowMeta.label}</span>
                            <p className="text-xs text-gray-400">{selectedRequest.activityType} • {selectedRequest.businessModel} • {selectedRequest.neighborhood}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                            <div className="rounded-xl bg-gray-50 p-4"><p className="text-gray-400 mb-1">الملاءمة المركبة</p><p className="font-bold text-navy">{selectedRequest.locationSnapshot.fitLabel}</p></div>
                            <div className="rounded-xl bg-gray-50 p-4"><p className="text-gray-400 mb-1">الجمهور الأساسي</p><p className="font-bold text-navy text-xs leading-6">{selectedRequest.locationSnapshot.primaryAudience.join("، ")}</p></div>
                            <div className="rounded-xl bg-gray-50 p-4"><p className="text-gray-400 mb-1">المنافسون المباشرون</p><p className="font-bold text-navy">{selectedRequest.locationSnapshot.estimatedCompetitors}</p></div>
                            <div className="rounded-xl bg-gray-50 p-4"><p className="text-gray-400 mb-1">المراجع الحالي</p><p className="font-bold text-navy">{selectedRequest.assignedReviewerName ?? "بانتظار التعيين"}</p></div>
                            <div className="rounded-xl bg-gray-50 p-4 col-span-2"><p className="text-gray-400 mb-1">Workflow الشراكة</p><span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: selectedPartnershipMeta.surface, color: selectedPartnershipMeta.tone }}>{selectedPartnershipMeta.label}</span></div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div>
                              <label className="block text-sm font-semibold text-gray-600 mb-2">تعيين المراجع</label>
                              <select value={reviewerId} onChange={(event) => setReviewerId(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                                <option value="">اختر مراجعاً</option>
                                {reviewers.map((reviewer) => <option key={reviewer.id} value={reviewer.id}>{reviewer.name} • {reviewer.activeAssignments} تكليف</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-600 mb-2">حالة المراجعة</label>
                              <select value={workflowStatus} onChange={(event) => setWorkflowStatus(event.target.value as keyof typeof advisoryWorkflowMeta)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                                {Object.entries(advisoryWorkflowMeta).map(([key, meta]) => <option key={key} value={key}>{meta.label}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-600 mb-2">الأولوية</label>
                              <select value={priority} onChange={(event) => setPriority(event.target.value as keyof typeof advisoryPriorityMeta)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                                {Object.entries(advisoryPriorityMeta).map(([key, meta]) => <option key={key} value={key}>{meta.label}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-600 mb-2">تاريخ الاستحقاق</label>
                              <input type="date" value={reviewDueDate} onChange={(event) => setReviewDueDate(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600 mb-2">ملخص المراجعة</label>
                            <textarea value={reviewSummary} onChange={(event) => setReviewSummary(event.target.value)} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" placeholder="اكتب ملخصاً تنفيذياً للقرار أو الملاحظات الأساسية..." />
                          </div>

                          <button onClick={handleSaveWorkflow} className="btn-primary w-full justify-center py-3"><UserCheck size={16} />حفظ حالة المراجعة</button>
                        </div>
                      );
                    })()}
                  </ShellCard>

                  <ShellCard title="إدارة شروط الشركاء" subtitle="Partner Terms" icon={<Handshake size={20} />}>
                    <div className="text-right">
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">اختر الشريك</label>
                        <select value={selectedPartnerId} onChange={(event) => setSelectedPartnerId(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                          {selectedRequest.partners.map((partner) => <option key={partner.id} value={partner.id}>{partner.name} • {partner.role}</option>)}
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">المساهمة</label><input type="number" value={partnerContribution} onChange={(event) => setPartnerContribution(Number(event.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">الملكية</label><input type="number" value={partnerEquity} onChange={(event) => setPartnerEquity(Number(event.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" /></div>
                        <div><label className="block text-sm font-semibold text-gray-600 mb-2">الأرباح</label><input type="number" value={partnerProfit} onChange={(event) => setPartnerProfit(Number(event.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" /></div>
                      </div>
                      <div className="mb-4"><label className="block text-sm font-semibold text-gray-600 mb-2">المسؤوليات</label><textarea value={partnerResponsibilities} onChange={(event) => setPartnerResponsibilities(event.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" /></div>
                      <div className="mb-4"><label className="block text-sm font-semibold text-gray-600 mb-2">ملاحظة إعادة التفاوض</label><textarea value={partnerApprovalNote} onChange={(event) => setPartnerApprovalNote(event.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" placeholder="سيتم إعادة فتح موافقة الشريك بعد حفظ هذه الشروط." /></div>
                      <button onClick={handleSavePartnerTerms} className="btn-gold w-full justify-center py-3">حفظ شروط الشريك وإعادة فتح الموافقة</button>
                      <div className="space-y-3 mt-4">
                        {selectedRequest.partners.map((partner) => {
                          const partnerMeta = getPartnerApprovalMeta(partner.approvalStatus);
                          return (
                            <div key={partner.id} className="rounded-xl border border-gray-100 px-4 py-3 flex items-center justify-between gap-4">
                              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: partnerMeta.surface, color: partnerMeta.tone }}>{partnerMeta.label}</span>
                              <div className="text-right">
                                <p className="text-sm font-bold text-navy">{partner.name}</p>
                                <p className="text-xs text-gray-400">{partner.contribution.toLocaleString()} ريال • ملكية {partner.equityShare}%</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ShellCard>

                  <div className="xl:col-span-2">
                    <ShellCard title="إضافة ملاحظة جديدة" subtitle="Workflow Notes" icon={<MessageSquarePlus size={20} />}>
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 mb-3">
                        <textarea value={noteContent} onChange={(event) => setNoteContent(event.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" placeholder="أضف ملاحظة تشغيلية أو ميدانية أو موجهة للعميل..." />
                        <div className="space-y-3 min-w-[160px]">
                          <select value={noteVisibility} onChange={(event) => setNoteVisibility(event.target.value as "internal" | "client")} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                            {Object.entries(advisoryNoteVisibilityMeta).map(([key, meta]) => <option key={key} value={key}>{meta.label}</option>)}
                          </select>
                          <button onClick={handleAddNote} className="btn-gold w-full justify-center py-3">إضافة</button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {selectedRequest.workflowNotes.map((note) => {
                          const visibilityMeta = getAdvisoryNoteVisibilityMeta(note.visibility);
                          return (
                            <div key={note.id} className="rounded-xl border border-gray-100 px-4 py-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ backgroundColor: visibilityMeta.surface, color: visibilityMeta.tone }}>{visibilityMeta.label}</span>
                                <div>
                                  <p className="text-sm font-bold text-navy">{note.authorName}</p>
                                  <p className="text-xs text-gray-400">{note.createdAt}</p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 leading-7">{note.content}</p>
                            </div>
                          );
                        })}
                      </div>
                    </ShellCard>
                  </div>
                </>
              ) : (
                <div className="xl:col-span-2 card p-8 text-center text-gray-500">لا توجد طلبات استشارية حالياً.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "governance" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ShellCard title="عدد الطلبات الشهرية" subtitle="Monthly Volume" icon={<ChartColumn size={20} />}>
              <div className="h-72">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyApplications} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="applications" radius={[8, 8, 0, 0]} fill="#0A2342" name="الطلبات" />
                      <Bar dataKey="accepted" radius={[8, 8, 0, 0]} fill="#C9A84C" name="المقبول" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
              </div>
            </ShellCard>

            <ShellCard title="القيمة الاقتصادية المتوقعة بالموسم" subtitle="Economic Impact" icon={<BadgeDollarSign size={20} />}>
              <div className="h-72">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyApplications} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="revenue" radius={[8, 8, 0, 0]} name="قيمة اقتصادية متوقعة (ألف ريال)">
                        {monthlyApplications.map((item) => (
                          <Cell key={item.month} fill={item.revenue >= 400 ? "#C9A84C" : "#0A2342"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
              </div>
            </ShellCard>
          </div>
        )}
    </AmanahWorkspaceShell>
  );
}
