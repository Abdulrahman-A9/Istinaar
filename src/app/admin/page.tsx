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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpLeft,
  BadgeDollarSign,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  Database,
  Eye,
  FileBadge2,
  FileCheck2,
  FileText,
  FolderKanban,
  Handshake,
  Landmark,
  Layers3,
  LayoutDashboard,
  LogOut,
  Mail,
  Map,
  MapPin,
  MessageSquarePlus,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Settings,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
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

function ExecutiveMetricCard({
  label,
  value,
  unit,
  delta,
  icon,
}: {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex h-[148px] flex-col justify-between rounded-[1.55rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,28,48,0.96)_0%,rgba(10,24,41,0.94)_100%)] p-4 shadow-[0_18px_50px_rgba(2,10,20,0.34)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B6913E]/20 bg-[#B6913E]/8 text-[#D9BA72]">
          {icon}
        </div>
        <div className="text-right">
          <p className="text-xs text-white/50">{label}</p>
          <p className="mt-2 text-[2rem] font-black leading-none text-white">{value}</p>
          {unit ? <p className="mt-1 text-sm text-white/42">{unit}</p> : null}
        </div>
      </div>
      <p className="text-sm font-semibold text-emerald-400">{delta}</p>
    </div>
  );
}

function ReadinessRing({ value, label, tone }: { value: number; label: string; tone: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
      <div
        className="relative h-16 w-16 rounded-full"
        style={{
          background: `conic-gradient(${tone} ${value * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
        }}
      >
        <div className="absolute inset-[7px] flex items-center justify-center rounded-full bg-[#08172A] text-sm font-black text-white">
          {value}%
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-xs text-white/45">مؤشر تنفيذي سريع</p>
      </div>
    </div>
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

  const rightRailItems = [
    { key: "overview", label: "الرئيسية", icon: LayoutDashboard, onSelect: () => setActiveTab("overview") },
    { key: "intelligence", label: "الذكاء الاستثماري", icon: Bot, href: "/investment-intelligence" },
    { key: "spatial", label: "التحليل المكاني", icon: MapPin, href: "/investment-intelligence?tab=spatial" },
    { key: "assets", label: "الفرص الاستثمارية", icon: BriefcaseBusiness, onSelect: () => setActiveTab("assets") },
    { key: "requests", label: "الاعتمادات والموافقات", icon: FileCheck2, onSelect: () => setActiveTab("requests") },
    { key: "relations", label: "الشركاء والمستثمرون", icon: Users, onSelect: () => setActiveTab("relations") },
    { key: "cases", label: "الطلبات والاعتراضات", icon: FolderKanban, onSelect: () => setActiveTab("requests") },
    { key: "reports", label: "التقارير واللوحات", icon: FileText, onSelect: () => setActiveTab("governance") },
    { key: "governance", label: "الأداء والمؤشرات", icon: BarChart3, onSelect: () => setActiveTab("governance") },
    { key: "settings", label: "الإعدادات", icon: Settings, href: "#" },
  ];

  const utilityIcons = [MapPin, ShieldCheck, Layers3, FileCheck2, BriefcaseBusiness, Users, Bot, Settings];

  const executiveRailItems = [
    { key: "overview", label: "الرئيسية", icon: LayoutDashboard, onSelect: () => setActiveTab("overview") },
    { key: "intelligence", label: "الذكاء الاستثماري", icon: Bot, href: "/investment-intelligence" },
    { key: "spatial", label: "التحليل المكاني", icon: MapPin, href: "/investment-intelligence?tab=spatial" },
    { key: "assets", label: "الفرص الاستثمارية", icon: BriefcaseBusiness, onSelect: () => setActiveTab("assets") },
    { key: "requests", label: "الاعتمادات والموافقات", icon: FileCheck2, onSelect: () => setActiveTab("requests") },
    { key: "relations", label: "الشركاء والمستثمرون", icon: Users, onSelect: () => setActiveTab("relations") },
    { key: "cases", label: "الطلبات والاعتراضات", icon: FolderKanban, onSelect: () => setActiveTab("requests") },
    { key: "reports", label: "التقارير واللوحات", icon: FileText, onSelect: () => setActiveTab("governance") },
    { key: "governance", label: "الأداء والمؤشرات", icon: BarChart3, onSelect: () => setActiveTab("governance") },
    { key: "settings", label: "الإعدادات", icon: Settings, href: "#" },
  ];

  const executiveOverviewMetrics = [
    { label: "قيمة الاستثمار المتوقعة", value: "211.7", unit: "مليون ريال", delta: "+18% عن الشهر الماضي", icon: <BadgeDollarSign size={22} /> },
    { label: "مؤشر جاهزية الاستثمار", value: "83%", delta: "+7% عن الشهر الماضي", icon: <TrendingUp size={22} /> },
    { label: "الوظائف المتوقعة", value: "1,248", unit: "وظيفة", delta: "+26% عن الشهر الماضي", icon: <Users size={22} /> },
    { label: "العوائد السنوية المتوقعة", value: "28.4", unit: "مليون ريال", delta: "+15% عن الشهر الماضي", icon: <ChartColumn size={22} /> },
    { label: "عدد الفرص الاستثمارية", value: `${opportunities.length}`, unit: "فرصة", delta: `${opportunities.filter((item) => item.featured).length} جاهزة للطرح`, icon: <BriefcaseBusiness size={22} /> },
    { label: "القرارات المطلوبة", value: `${amanahDecisionWorkflow.cases.length + 2}`, unit: "قرارات", delta: "تحتاج إجراء هذا الأسبوع", icon: <ClipboardList size={22} /> },
  ];

  const executiveMapNodes = [
    { name: "حي النقرة", top: "18%", right: "46%", status: "جاهزة", tone: "#2DD36F" },
    { name: "حي الجامعة", top: "57%", right: "32%", status: "متعثرة", tone: "#FF5A5F" },
    { name: "حي المصيف", top: "30%", right: "24%", status: "قيد المراجعة", tone: "#F4B844" },
    { name: "حي مشار", top: "70%", right: "52%", status: "جاهزة", tone: "#2DD36F" },
    { name: "الوسيطاء", top: "58%", right: "61%", status: "جاهزة", tone: "#2DD36F" },
    { name: "أجا", top: "42%", right: "72%", status: "قيد المراجعة", tone: "#F4B844" },
  ];

  const executiveQuickAlerts = [
    "فرصة تجاوزت مدة الاعتماد المستهدفة في حي النقرة.",
    "دراسة ميدانية لمشروع حي الوسيطاء تحتاج تحديثاً عاجلاً.",
    "ملف شراكة جديد جاهز للطرح بعد استكمال التوقيع.",
  ];

  const overviewMetrics = [
    { label: "قيمة الاستثمار المتوقعة", value: "211.7", unit: "مليون ريال", delta: "+18% عن الشهر الماضي", icon: <BadgeDollarSign size={22} /> },
    { label: "مؤشر جاهزية الاستثمار", value: "83%", delta: "+7% عن الشهر الماضي", icon: <TrendingUp size={22} /> },
    { label: "الوظائف المتوقعة", value: "1,248", unit: "وظيفة", delta: "+26% عن الشهر الماضي", icon: <Users size={22} /> },
    { label: "العوائد السنوية المتوقعة", value: "28.4", unit: "مليون ريال", delta: "+15% عن الشهر الماضي", icon: <ChartColumn size={22} /> },
    { label: "عدد الفرص الاستثمارية", value: `${opportunities.length}`, unit: "فرصة", delta: `${opportunities.filter((item) => item.featured).length} جاهزة للطرح`, icon: <BriefcaseBusiness size={22} /> },
    { label: "القرارات المطلوبة", value: `${amanahDecisionWorkflow.cases.length + 2}`, unit: "قرارات", delta: "تحتاج إجراء هذا الأسبوع", icon: <ClipboardList size={22} /> },
  ];

  const mapNodes = [
    { name: "حي النقرة", top: "18%", right: "46%", status: "جاهزة", tone: "#2DD36F" },
    { name: "حي الجامعة", top: "57%", right: "32%", status: "متعثرة", tone: "#FF5A5F" },
    { name: "حي المصيف", top: "30%", right: "24%", status: "قيد المراجعة", tone: "#F4B844" },
    { name: "حي مشار", top: "70%", right: "52%", status: "جاهزة", tone: "#2DD36F" },
    { name: "الوسيطاء", top: "58%", right: "61%", status: "جاهزة", tone: "#2DD36F" },
    { name: "أجا", top: "42%", right: "72%", status: "قيد المراجعة", tone: "#F4B844" },
  ];

  const topExecutiveBrief = leadershipBriefs[0];
  const quickAlerts = [
    "فرصة تجاوزت مدة الاعتماد المستهدفة في حي النقرة.",
    "دراسة ميدانية لمشروع حي الوسيطاء تحتاج تحديثاً.",
    "ملف شراكة جديد جاهز للطرح بعد استكمال التوقيع.",
  ];

  void rightRailItems;
  void overviewMetrics;
  void mapNodes;
  void quickAlerts;

  const isExecutiveOverview = activeTab === "overview";

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
    <div className={isExecutiveOverview ? "h-[100dvh] overflow-hidden bg-[linear-gradient(180deg,#07111D_0%,#081523_100%)] text-white" : "min-h-screen bg-[linear-gradient(180deg,#07111D_0%,#081523_100%)] text-white"}>
      <div className={isExecutiveOverview ? "mx-auto grid h-full max-w-[1700px] grid-cols-1 gap-2 p-2 xl:grid-cols-[minmax(0,1fr)_64px_294px]" : "mx-auto grid min-h-screen max-w-[1700px] grid-cols-1 gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_66px_300px]"}>
        <main className={isExecutiveOverview ? "grid min-w-0 grid-rows-[110px_1fr] gap-2 overflow-hidden" : "min-w-0 space-y-3"}>
        <section className={isExecutiveOverview ? "h-[110px] rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,#081624_0%,#091726_100%)] px-5 py-4 shadow-[0_24px_70px_rgba(2,10,20,0.32)]" : "rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,#081624_0%,#091726_100%)] px-5 py-4 shadow-[0_24px_70px_rgba(2,10,20,0.32)]"}>
          <div className="flex flex-col gap-5 2xl:flex-row 2xl:items-center 2xl:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D1AF68]/55 bg-[radial-gradient(circle_at_30%_30%,#f4e1b0_0%,#8d6b2f_100%)] text-[#0A1524] shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                <span className="text-sm font-black">أ</span>
              </div>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-white/70">
                <Bell size={16} />
                <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-black text-white">3</span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-white/70">
                <Mail size={16} />
              </button>
              <div className="border-r border-white/8 pr-4 text-right">
                <p className="text-sm font-black text-[#E8D6A5]">{currentUser.fullName}</p>
                <p className="text-xs text-white/45">مدير إدارة الاستثمار</p>
              </div>
              <div className="border-r border-white/8 pr-4 text-right text-white/60">
                <p className="text-xs">الأربعاء 05/01/1448 هـ</p>
                <p className="text-sm font-semibold text-white/85">10:30 AM</p>
              </div>
            </div>

            <div className="text-right">
              <h1 className="text-3xl font-black text-white">غرفة قيادة الاستثمار الحضري</h1>
              <p className="mt-1 text-sm text-white/55">مركز القرار التنفيذي - أمانة منطقة حائل</p>
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
          <div className="grid h-full grid-cols-1 gap-2 overflow-hidden 2xl:grid-cols-[repeat(6,minmax(0,1fr))_1.18fr]">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:col-span-6 2xl:grid-cols-6">
              {executiveOverviewMetrics.map((metric) => (
                <ExecutiveMetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  unit={metric.unit}
                  delta={metric.delta}
                  icon={metric.icon}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2 2xl:col-span-6 2xl:grid-cols-[1.3fr_0.94fr]">
              <section className="h-[372px] overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,46,0.98)_0%,rgba(9,23,39,0.96)_100%)] p-4 shadow-[0_20px_60px_rgba(2,10,20,0.35)]">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <button className="rounded-2xl border border-[#B6913E]/20 bg-[#B6913E]/10 px-4 py-2 text-sm font-bold text-[#E9DFC8]">
                    عرض طبقات الخريطة
                  </button>
                  <div className="text-right">
                    <p className="text-xs text-[#B6913E]">التحليل المكاني المباشر</p>
                    <h2 className="mt-1 text-2xl font-black text-white">خريطة أولويات الأحياء</h2>
                  </div>
                </div>

                <div className="grid gap-3 xl:grid-cols-[0.22fr_0.78fr]">
                  <div className="space-y-3">
                    <select
                      value={selectedNeighborhoodSlug}
                      onChange={(event) => setSelectedNeighborhoodSlug(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-right text-sm text-white/85 focus:outline-none"
                    >
                      {neighborhoodOptions.map((item) => (
                        <option key={item.slug} value={item.slug} className="text-slate-900">
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4 text-right">
                      <p className="text-sm font-bold text-white">حالة الأحياء</p>
                      <div className="mt-4 space-y-2 text-sm text-white/60">
                        <div className="flex items-center justify-between">
                          <span className="h-3 w-3 rounded-full bg-[#2DD36F]" />
                          <span>جاهزة للطرح</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="h-3 w-3 rounded-full bg-[#F4B844]" />
                          <span>قيد المراجعة</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="h-3 w-3 rounded-full bg-[#FF5A5F]" />
                          <span>متعثرة</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-[286px] overflow-hidden rounded-[1.7rem] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(182,145,62,0.08),transparent_38%),linear-gradient(180deg,#0C1B2D_0%,#091520_100%)]">
                    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
                    <div className="absolute inset-[8%] rounded-[50%] border border-[#D7B76F]/10" />
                    <div className="absolute inset-[17%] rounded-[42%] border border-[#D7B76F]/12" />
                    <div className="absolute inset-[28%] rounded-[35%] border border-[#D7B76F]/14" />
                    <div className="absolute left-[11%] top-[50%] h-px w-[72%] bg-[#D7B76F]/16" />
                    <div className="absolute left-[18%] top-[22%] h-[58%] w-px bg-[#D7B76F]/16" />
                    <div className="absolute left-[34%] top-[18%] h-[64%] w-px bg-[#D7B76F]/16" />
                    <div className="absolute left-[56%] top-[15%] h-[68%] w-px bg-[#D7B76F]/16" />
                    <div className="absolute left-[24%] top-[32%] h-px w-[42%] bg-[#D7B76F]/16" />
                    <div className="absolute left-[28%] top-[64%] h-px w-[34%] bg-[#D7B76F]/16" />

                    {executiveMapNodes.map((node) => (
                      <div key={node.name} className="absolute flex flex-col items-center gap-2" style={{ top: node.top, right: node.right }}>
                        <div className="h-5 w-5 rounded-full border-4 border-[#0C1B2D] shadow-[0_0_0_8px_rgba(255,255,255,0.03)]" style={{ backgroundColor: node.tone }} />
                        <span className="rounded-full bg-[#081624]/90 px-3 py-1 text-[11px] font-bold text-white/80">{node.name}</span>
                      </div>
                    ))}

                    <div className="absolute bottom-5 left-5 rounded-2xl border border-white/8 bg-[#0A1726]/88 px-4 py-3 text-right">
                      <p className="text-xs text-white/40">الحي المحدد</p>
                      <p className="mt-1 text-sm font-bold text-white">{selectedNeighborhoodItem?.name ?? "حي النقرة"}</p>
                      <p className="mt-1 text-xs text-[#E9DFC8]">آخر تحديث: {selectedNeighborhoodItem?.analytics?.updatedAt ?? "—"}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="h-[372px] overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,46,0.98)_0%,rgba(9,23,39,0.96)_100%)] p-4 shadow-[0_20px_60px_rgba(2,10,20,0.35)]">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <button onClick={() => setActiveTab("requests")} className="text-sm font-bold text-[#DAB971]">
                    عرض الكل
                  </button>
                  <div className="text-right">
                    <p className="text-xs text-white/45">المطلوب الآن</p>
                    <h2 className="mt-1 text-2xl font-black text-white">أهم القرارات اليوم</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {amanahDecisionWorkflow.cases.slice(0, 4).map((caseItem) => (
                    <div key={caseItem.id} className="rounded-[1.45rem] border border-white/8 bg-white/[0.03] p-3.5 text-right">
                      <div className="flex items-start justify-between gap-4">
                        <button onClick={() => setActiveTab("requests")} className="rounded-xl border border-[#DAB971]/20 bg-[#DAB971]/10 px-4 py-2 text-sm font-bold text-[#E9DFC8]">
                          اتخاذ إجراء
                        </button>
                        <div>
                          <h3 className="text-base font-black text-white">{caseItem.title}</h3>
                          <p className="mt-1 text-sm text-white/45">{caseItem.anchorAsset}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${caseItem.stageTone}20`, color: caseItem.stageTone }}>
                          {caseItem.stageLabel}
                        </span>
                        <div className="text-left">
                          <p className="text-xs text-white/35">الجاهزية</p>
                          <p className="text-sm font-black text-white">{caseItem.readinessScore}%</p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm text-white/55">
                        <div className="flex items-center justify-between">
                          <span className="text-white/35">الإجراء التالي</span>
                          <span>{caseItem.nextAction}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/35">المالك</span>
                          <span>{caseItem.owner}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/35">الإطار الزمني</span>
                          <span>{amanahDecisionWorkflow.steps.find((step) => step.id === caseItem.stageId)?.duration ?? "2 - 5 أيام"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="h-[372px] overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,46,0.98)_0%,rgba(9,23,39,0.96)_100%)] p-4 shadow-[0_20px_60px_rgba(2,10,20,0.35)] 2xl:col-start-7 2xl:row-start-1 2xl:row-span-2">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-xl bg-[#DAB971]/12 px-3 py-1 text-xs font-black text-[#DAB971]">AI</span>
                  <div className="text-right">
                    <p className="text-xs text-white/45">الذكاء التنفيذي يقترح</p>
                    <h2 className="mt-1 text-xl font-black text-white">توصية جاهزة</h2>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-4 text-right">
                  <p className="text-xs text-[#DAB971]">يوصى بالإسراع في اعتماد فرصة</p>
                  <h3 className="mt-3 text-2xl font-black text-white">{topExecutiveBrief?.angle ?? "تطوير موقع حي مشار"}</h3>
                  <p className="mt-3 text-sm leading-8 text-white/55">{topExecutiveBrief?.summary ?? "فرصة ذات جاهزية عالية وعائد استثماري مرتفع مع معوقات محدودة."}</p>

                  <div className="mt-4">
                    <ReadinessRing value={83} label="نسبة الجاهزية" tone="#2DD36F" />
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="rounded-2xl bg-white/[0.03] px-4 py-3 text-white/70">
                      <span className="text-white/35">عائد استثماري متوقع:</span> مرتفع
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] px-4 py-3 text-white/70">
                      <span className="text-white/35">جاهزية النظام:</span> عالية
                    </div>
                  </div>

                  <button onClick={() => setActiveTab("governance")} className="mt-4 w-full rounded-2xl bg-[#C59B49] px-4 py-3 text-sm font-black text-[#07192E] transition hover:bg-[#d2ad63]">
                    مراجعة الآن
                  </button>
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 gap-2 2xl:col-span-7 2xl:grid-cols-[0.98fr_0.9fr_0.98fr_1.08fr]">
              <section className="h-[232px] overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,46,0.98)_0%,rgba(9,23,39,0.96)_100%)] p-4 shadow-[0_20px_60px_rgba(2,10,20,0.35)]">
                <div className="mb-4 flex items-center justify-between">
                  <button className="text-sm font-bold text-[#DAB971]">عرض الكل</button>
                  <h2 className="text-xl font-black text-white">مؤشرات الأداء الرئيسية</h2>
                </div>
                <div className="grid gap-4">
                  <ReadinessRing value={83} label="جاهزية الأحياء" tone="#DAB971" />
                  <ReadinessRing value={76} label="سرعة الاعتماد" tone="#7DDA7E" />
                  <ReadinessRing value={91} label="رضا المستثمرين" tone="#7DDA7E" />
                  <ReadinessRing value={68} label="استغلال الأراضي" tone="#DAB971" />
                </div>
              </section>

              <section className="h-[232px] overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,46,0.98)_0%,rgba(9,23,39,0.96)_100%)] p-4 shadow-[0_20px_60px_rgba(2,10,20,0.35)]">
                <div className="mb-4 flex items-center justify-between">
                  <button className="text-sm font-bold text-[#DAB971]">عرض الكل</button>
                  <h2 className="text-xl font-black text-white">تنبيهات ذكية</h2>
                </div>
                <div className="space-y-3">
                  {executiveQuickAlerts.map((alert, index) => (
                    <div key={alert} className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <span className={`mt-1 h-3 w-3 rounded-full ${index === 0 ? "bg-red-500" : index === 1 ? "bg-[#F4B844]" : "bg-emerald-400"}`} />
                        <p className="text-sm leading-7 text-white/70">{alert}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="h-[232px] overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,46,0.98)_0%,rgba(9,23,39,0.96)_100%)] p-4 shadow-[0_20px_60px_rgba(2,10,20,0.35)]">
                <div className="mb-4 flex items-center justify-between">
                  <button className="text-sm font-bold text-[#DAB971]">عرض الكل</button>
                  <h2 className="text-xl font-black text-white">رحلة الفرصة الاستثمارية</h2>
                </div>
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-3">
                  {[
                    "فكرة مكتملة",
                    "تحليل مكتمل",
                    "دراسة جارية",
                    "اعتماد قريباً",
                    "طرح قريباً",
                    "تشغيل قريباً",
                  ].map((label, index) => (
                    <div key={label} className="flex min-w-[88px] flex-col items-center gap-2 text-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${index < 2 ? "bg-emerald-500 text-white" : index === 2 ? "bg-[#C59B49] text-[#07192E]" : "bg-white/10 text-white/45"}`}>
                        {index < 2 ? "✓" : index + 1}
                      </div>
                      <p className="text-xs leading-5 text-white/60">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3 text-center">
                  {[
                    { label: "قيد التشغيل", value: "1" },
                    { label: "قيد التحليل", value: "8" },
                    { label: "قيد الاعتماد", value: "3" },
                    { label: "كل الإنجازات", value: "2" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/[0.03] px-3 py-4">
                      <p className="text-lg font-black text-white">{item.value}</p>
                      <p className="mt-1 text-xs text-white/45">{item.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="h-[232px] overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,46,0.98)_0%,rgba(9,23,39,0.96)_100%)] p-4 shadow-[0_20px_60px_rgba(2,10,20,0.35)]">
                <div className="mb-4 flex items-center justify-between">
                  <button className="text-sm font-bold text-[#DAB971]">عرض التقرير</button>
                  <h2 className="text-xl font-black text-white">الأثر الاقتصادي المتوقع</h2>
                </div>
                <div className="h-[162px]">
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyApplications} margin={{ top: 10, right: 6, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="execRevenuePrimary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#33D17A" stopOpacity={0.28} />
                            <stop offset="100%" stopColor="#33D17A" stopOpacity={0.03} />
                          </linearGradient>
                          <linearGradient id="execRevenueSecondary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#DAB971" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#DAB971" stopOpacity={0.04} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: "#081624", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
                        <Area type="monotone" dataKey="revenue" stroke="#33D17A" fill="url(#execRevenuePrimary)" strokeWidth={3} name="الأثر الاقتصادي المتوقع" />
                        <Area type="monotone" dataKey="accepted" stroke="#DAB971" fill="url(#execRevenueSecondary)" strokeWidth={2.5} name="الفرص المعتمدة" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 2xl:col-span-7 2xl:grid-cols-5">
              {[
                { title: "تصدير تقرير", note: "تقرير الأداء الشهري", icon: <FileText size={18} /> },
                { title: "اجتماع لجنة الاستثمار", note: "غداً - 10:00 ص", icon: <CalendarDays size={18} /> },
                { title: "توقيع إلكتروني", note: "3 مستندات بانتظار التوقيع", icon: <Mail size={18} /> },
                { title: "مركز المساعدة", note: "الدعم والمساندة", icon: <MessageSquarePlus size={18} /> },
                { title: "اسأل مساعد استنار الذكي", note: "اكتب استفسارك هنا...", icon: <Sparkles size={18} /> },
              ].map((item) => (
                <div key={item.title} className="h-[82px] overflow-hidden rounded-[1.45rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,27,46,0.98)_0%,rgba(9,23,39,0.96)_100%)] px-5 py-4 shadow-[0_16px_42px_rgba(2,10,20,0.28)]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DAB971]/20 bg-[#DAB971]/8 text-[#DAB971]">
                      {item.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-white/45">{item.note}</p>
                    </div>
                  </div>
                </div>
              ))}
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

        {false && activeTab === "relations" && (
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
          <div className="space-y-6">
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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
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

                  <div className="xl:col-span-3">
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
                <div className="xl:col-span-3 card p-8 text-center text-gray-500">لا توجد طلبات استشارية حالياً.</div>
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
        </main>

        <aside className="hidden xl:flex flex-col items-center rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,24,38,0.98)_0%,rgba(8,18,30,0.98)_100%)] py-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D3B06B]/25 bg-[#D3B06B]/10 text-[#DDBD79]">
            <MapPin size={18} />
          </div>
          <div className="flex flex-1 flex-col items-center gap-3">
            {utilityIcons.map((Icon, index) => (
              <button
                key={index}
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition ${
                  index === 0
                    ? "border-[#D3B06B]/25 bg-[#D3B06B]/10 text-[#E7CB8E]"
                    : "border-white/8 bg-white/[0.02] text-white/55 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
          <button className="mt-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] text-white/55 hover:bg-white/[0.05] hover:text-white">
            <Settings size={18} />
          </button>
        </aside>

        <aside className="hidden xl:flex flex-col rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,20,34,0.98)_0%,rgba(7,16,28,0.98)_100%)] px-6 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <div className="border-b border-white/8 pb-6 text-right">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D3B06B]/25 bg-[#D3B06B]/10 text-[#DDBD79]">
                <Sparkles size={22} />
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-black text-white">استنار</h2>
                <p className="mt-2 text-xs leading-6 text-white/50">منصة الذكاء الاستثماري ودعم القرار</p>
              </div>
              <div className="hidden">
                <h2 className="text-3xl font-black text-white">استنار</h2>
                <p className="mt-2 text-xs leading-6 text-white/50">منصة الذكاء الاستثماري ودعم القرار</p>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
              <p className="text-sm text-white/70">المركز التنفيذي</p>
              <p className="text-sm text-white/45">المركز التنفيذي</p>
            </div>
          </div>

          <nav className="mt-6 flex-1 space-y-1.5">
            {executiveRailItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === "overview" ? activeTab === "overview" : item.key === activeTab;
              const classes = `flex w-full items-center justify-between rounded-[1.15rem] px-4 py-3.5 text-[15px] font-semibold transition ${
                isActive ? "bg-[#C79A48] text-[#07111D] shadow-[0_12px_28px_rgba(199,154,72,0.22)]" : "text-white/72 hover:bg-white/[0.04] hover:text-white"
              }`;

              if (item.href) {
                return (
                  <Link key={item.key} href={item.href} className={classes}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <button key={item.key} onClick={item.onSelect} className={classes}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-4 border-t border-white/8 pt-6">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-[0px] font-semibold text-white/75 hover:bg-white/[0.04]">
              <MessageSquarePlus size={16} />
              <span className="text-sm">دليل المستخدم</span>
              دليل المستخدم
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-transparent px-4 py-4 text-[0px] font-semibold text-white/55 hover:bg-white/[0.04] hover:text-white">
              <LogOut size={16} />
              <span className="text-sm">تسجيل خروج</span>
              تسجيل خروج
            </button>
            <p className="text-center text-xs leading-6 text-white/35">2024 استنار<br />جميع الحقوق محفوظة</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
