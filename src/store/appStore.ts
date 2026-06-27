import { create } from "zustand";
import { persist } from "zustand/middleware";
import { partnerProfilesSeed, type PartnerProfileData } from "@/data/partnerships";

export interface SavedLand {
  id: string;
  name: string;
  neighborhood: string;
  price: number;
  area: number;
}

export interface SavedOpportunity {
  id: string;
  title: string;
  neighborhood: string;
  category: string;
  roi: number;
  riskLabel: string;
}

export interface Application {
  id: string;
  landId: string;
  landName: string;
  neighborhood: string;
  activityType: string;
  submittedAt: string;
  status: "review" | "accepted" | "rejected" | "pending_payment";
}

export interface Alert {
  id: string;
  message: string;
  type: "new_land" | "deadline" | "accepted" | "market" | "partnership";
  time: string;
  read: boolean;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  city: string;
  role: "investor" | "consultant" | "authority";
  password: string;
}

export type AdvisoryWorkflowStatus =
  | "submitted"
  | "queued"
  | "assigned"
  | "in_review"
  | "awaiting_client"
  | "review_complete";

export type AdvisoryReviewPriority = "standard" | "high" | "urgent";

export type AdvisoryNoteVisibility = "internal" | "client";

export interface AdvisoryReviewer {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  activeAssignments: number;
}

export interface AdvisoryNote {
  id: string;
  authorName: string;
  authorRole: "system" | "reviewer" | "client";
  visibility: AdvisoryNoteVisibility;
  content: string;
  createdAt: string;
}

export interface AdvisoryLocationSnapshot {
  fitScore: number;
  fitLabel: string;
  primaryAudience: string[];
  estimatedCompetitors: number;
  competitorCategories: string[];
  accessibilityScore: number;
  parkingScore: number;
  visibilityScore: number;
  neighborhoodMomentum: number;
}

export interface ProjectPartner {
  id: string;
  profileId?: string;
  accountId?: string;
  email?: string;
  name: string;
  role: "owner" | "investor" | "operator" | "specialist" | "observer";
  contribution: number;
  equityShare: number;
  profitShare: number;
  responsibilities: string;
  status: "owner" | "invited" | "confirmed";
  approvalStatus: "owner_approved" | "pending_partner" | "approved" | "changes_requested" | "rejected";
  invitedAt?: string;
  respondedAt?: string;
  approvalNote?: string;
}

export interface PartnerApprovalEvent {
  id: string;
  partnerId: string;
  actorName: string;
  action: "invited" | "approved" | "changes_requested" | "rejected" | "terms_updated";
  note?: string;
  createdAt: string;
}

export interface PartnershipRequest {
  id: string;
  projectId: string;
  projectName: string;
  fromAccountId: string;
  fromName: string;
  toPartnerId: string;
  message: string;
  proposedContribution: number;
  proposedEquity: number;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

export interface AdvisoryRequest {
  id: string;
  accountId: string;
  projectName: string;
  activityType: string;
  businessModel: string;
  city: string;
  neighborhood: string;
  exactLocation: string;
  frontageType: "رئيسي" | "زاوية" | "داخلي";
  parkingAvailability: "مرتفع" | "متوسط" | "محدود";
  nearbyCompetitors: number;
  siteArea: number;
  capital: number;
  setupCost: number;
  monthlyCosts: number;
  expectedMonthlyRent: number;
  teamSize: number;
  launchMonths: number;
  targetAudience: string;
  notes: string;
  wantsHumanReview: boolean;
  status: "submitted" | "under_review" | "report_ready";
  workflowStatus: AdvisoryWorkflowStatus;
  reviewPriority: AdvisoryReviewPriority;
  assignedReviewerId?: string;
  assignedReviewerName?: string;
  reviewDueDate?: string;
  reviewCompletedAt?: string;
  reviewSummary?: string;
  workflowNotes: AdvisoryNote[];
  locationSnapshot: AdvisoryLocationSnapshot;
  partnershipWorkflowStatus: "not_required" | "drafting" | "awaiting_partner_approval" | "changes_requested" | "partially_approved" | "fully_approved";
  partners: ProjectPartner[];
  partnerApprovalHistory: PartnerApprovalEvent[];
  createdAt: string;
}

interface AppStore {
  currentUser: UserAccount | null;
  users: UserAccount[];
  reviewers: AdvisoryReviewer[];
  savedLands: SavedLand[];
  savedOpportunities: SavedOpportunity[];
  applications: Application[];
  alerts: Alert[];
  advisoryRequests: AdvisoryRequest[];
  partnerProfiles: PartnerProfileData[];
  partnershipRequests: PartnershipRequest[];
  registerAccount: (account: Omit<UserAccount, "id" | "role"> & { company?: string; role?: "investor" | "consultant" | "authority" }) => UserAccount;
  loginAccount: (email: string, password: string) => { ok: boolean; message?: string };
  loginAsDemoUser: () => void;
  logoutAccount: () => void;
  saveLand: (land: SavedLand) => void;
  removeLand: (id: string) => void;
  isLandSaved: (id: string) => boolean;
  saveOpportunity: (opportunity: SavedOpportunity) => void;
  removeOpportunity: (id: string) => void;
  isOpportunitySaved: (id: string) => boolean;
  markAlertRead: (id: string) => void;
  submitAdvisoryRequest: (request: Omit<AdvisoryRequest, "id" | "accountId" | "createdAt" | "status" | "workflowStatus" | "reviewPriority" | "workflowNotes" | "partnershipWorkflowStatus" | "partnerApprovalHistory" | "partners"> & { partners?: ProjectPartner[] }) => string;
  assignReviewer: (requestId: string, reviewerId: string) => void;
  updateAdvisoryWorkflow: (requestId: string, updates: Partial<Pick<AdvisoryRequest, "workflowStatus" | "reviewPriority" | "reviewSummary" | "reviewDueDate" | "reviewCompletedAt">>) => void;
  addAdvisoryNote: (requestId: string, note: Omit<AdvisoryNote, "id" | "createdAt">) => void;
  upsertPartnerProfile: (profile: Omit<PartnerProfileData, "id" | "compatibilityScore"> & { id?: string; compatibilityScore?: number }) => string;
  createPartnershipRequest: (payload: Omit<PartnershipRequest, "id" | "fromAccountId" | "fromName" | "status" | "createdAt">) => void;
  respondToPartnershipRequest: (requestId: string, status: "accepted" | "declined") => void;
  respondToProjectPartnerApproval: (requestId: string, partnerId: string, status: "approved" | "changes_requested" | "rejected", note?: string) => void;
  updateProjectPartnerTerms: (requestId: string, partnerId: string, updates: Partial<Pick<ProjectPartner, "contribution" | "equityShare" | "profitShare" | "responsibilities" | "approvalNote">>) => void;
  getAdvisoryRequestById: (id: string) => AdvisoryRequest | undefined;
}

const defaultUser: UserAccount = {
  id: "USR001",
  fullName: "عبدالرحمن الشمري",
  email: "abdulrahman@hailinvest.sa",
  phone: "0551234567",
  company: "الشمري للاستثمار",
  city: "حائل",
  role: "investor",
  password: "123456",
};

const partnerUser: UserAccount = {
  id: "USR002",
  fullName: "شركة المدار التشغيلي",
  email: "operator@hailinvest.sa",
  phone: "0557654321",
  company: "شركة المدار التشغيلي",
  city: "حائل",
  role: "investor",
  password: "123456",
};

const specialistUser: UserAccount = {
  id: "USR003",
  fullName: "سارة الدخيل",
  email: "sara@hailinvest.sa",
  phone: "0559988776",
  company: "خبيرة مستقلة",
  city: "حائل",
  role: "consultant",
  password: "123456",
};

const authorityUser: UserAccount = {
  id: "USR004",
  fullName: "مكتب دعم القرار الاستثماري",
  email: "amanah@hail.gov.sa",
  phone: "0554411223",
  company: "أمانة منطقة حائل",
  city: "حائل",
  role: "authority",
  password: "123456",
};

const defaultReviewers: AdvisoryReviewer[] = [
  {
    id: "REV001",
    name: "سارة الدخيل",
    title: "قائدة مراجعة المواقع التجارية",
    specialties: ["كافيهات", "مطاعم", "تحليل أحياء"],
    activeAssignments: 2,
  },
  {
    id: "REV002",
    name: "عبدالعزيز الشمري",
    title: "مستشار تشغيل واسترداد مالي",
    specialties: ["تشغيل", "نماذج Drive-Thru", "الجدوى المالية"],
    activeAssignments: 1,
  },
  {
    id: "REV003",
    name: "لولوة الحربي",
    title: "مستشارة تجربة عميل ومواقع عائلية",
    specialties: ["وجهات عائلية", "حركة المشاة", "تجزئة"],
    activeAssignments: 1,
  },
];

function createTimestamp() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

function sanitizeProjectPartner(partner: ProjectPartner, request: AdvisoryRequest, users: UserAccount[]) {
  const linkedUser = users.find((user) => user.id === partner.accountId);

  return {
    ...partner,
    email: partner.email ?? linkedUser?.email,
    status: partner.status ?? (partner.role === "owner" ? "owner" : "invited"),
    approvalStatus:
      partner.approvalStatus ??
      (partner.role === "owner"
        ? "owner_approved"
        : partner.status === "confirmed"
          ? "approved"
          : "pending_partner"),
    invitedAt: partner.invitedAt ?? request.createdAt,
    respondedAt: partner.respondedAt,
    approvalNote: partner.approvalNote,
  };
}

function sanitizeAdvisoryRequest(request: AdvisoryRequest, users: UserAccount[]) {
  const basePartners = request.partners?.length
    ? request.partners
    : [
        {
          id: `${request.id}-OWNER`,
          accountId: request.accountId,
          email: users.find((user) => user.id === request.accountId)?.email,
          name: users.find((user) => user.id === request.accountId)?.fullName ?? "مالك المشروع",
          role: "owner" as const,
          contribution: request.capital,
          equityShare: 100,
          profitShare: 100,
          responsibilities: "المالك الرئيسي للمشروع.",
          status: "owner" as const,
          approvalStatus: "owner_approved" as const,
          invitedAt: request.createdAt,
          respondedAt: request.createdAt,
          approvalNote: "تمت تهيئة ملف الشراكة تلقائياً.",
        },
      ];

  const partners = basePartners.map((partner) => sanitizeProjectPartner(partner, request, users));
  const hasExternalPartners = partners.some((partner) => partner.role !== "owner");
  const nonOwnerPartners = partners.filter((partner) => partner.role !== "owner");
  const approvedCount = nonOwnerPartners.filter((partner) => partner.approvalStatus === "approved").length;
  const hasRejected = nonOwnerPartners.some((partner) => partner.approvalStatus === "rejected");
  const hasChanges = nonOwnerPartners.some((partner) => partner.approvalStatus === "changes_requested");
  const allApproved = nonOwnerPartners.length > 0 && nonOwnerPartners.every((partner) => partner.approvalStatus === "approved");

  return {
    ...request,
    workflowStatus:
      request.workflowStatus && ["submitted", "queued", "assigned", "in_review", "awaiting_client", "review_complete"].includes(request.workflowStatus)
        ? request.workflowStatus
        : request.wantsHumanReview
          ? "queued"
          : "submitted",
    reviewPriority:
      request.reviewPriority && ["standard", "high", "urgent"].includes(request.reviewPriority)
        ? request.reviewPriority
        : "standard",
    partners,
    workflowNotes: (request.workflowNotes ?? []).map((note) => ({
      ...note,
      visibility: note.visibility === "client" ? "client" : "internal",
    })),
    partnershipWorkflowStatus:
      request.partnershipWorkflowStatus ??
      (!hasExternalPartners
        ? "not_required"
        : hasRejected || hasChanges
          ? "changes_requested"
          : allApproved
            ? "fully_approved"
            : approvedCount > 0
              ? "partially_approved"
              : "awaiting_partner_approval"),
    partnerApprovalHistory: request.partnerApprovalHistory ?? [],
  };
}

function decrementReviewerLoad(reviewers: AdvisoryReviewer[], reviewerId?: string) {
  if (!reviewerId) {
    return reviewers;
  }

  return reviewers.map((reviewer) =>
    reviewer.id === reviewerId
      ? { ...reviewer, activeAssignments: Math.max(0, reviewer.activeAssignments - 1) }
      : reviewer
  );
}

function incrementReviewerLoad(reviewers: AdvisoryReviewer[], reviewerId?: string) {
  if (!reviewerId) {
    return reviewers;
  }

  return reviewers.map((reviewer) =>
    reviewer.id === reviewerId
      ? { ...reviewer, activeAssignments: reviewer.activeAssignments + 1 }
      : reviewer
  );
}

export const useAppStore = create<AppStore>()(persist((set, get) => ({
  currentUser: null,
  users: [defaultUser, partnerUser, specialistUser, authorityUser],
  reviewers: defaultReviewers,
  savedLands: [],
  savedOpportunities: [],
  applications: [
    {
      id: "APP001",
      landId: "L003",
      landName: "حي النقرة",
      neighborhood: "حي النقرة",
      activityType: "فعاليات ترفيهية",
      submittedAt: "2025-05-12",
      status: "review"
    },
    {
      id: "APP002",
      landId: "L006",
      landName: "حي النقرة",
      neighborhood: "حي النقرة",
      activityType: "مطعم",
      submittedAt: "2025-04-28",
      status: "accepted"
    },
    {
      id: "APP003",
      landId: "L012",
      landName: "وسط المدينة",
      neighborhood: "وسط المدينة",
      activityType: "تسوق وترفيه",
      submittedAt: "2025-04-15",
      status: "rejected"
    }
  ],
  alerts: [
    { id: "A1", message: "تمت إضافة ٥ قطع أراضي موسمية جديدة في حي المصيف.", type: "new_land", time: "منذ ساعتين", read: false },
    { id: "A2", message: "باق يومين فقط على انتهاء التقديم لأرض النقرة.", type: "deadline", time: "منذ ٥ ساعات", read: false },
    { id: "A3", message: "تم قبول طلبك رقم #9842 (عربات طعام). تمت الموافقة عليه مبدئياً.", type: "accepted", time: "يوم أمس", read: true },
    { id: "A4", message: "يوجد طلب شراكة جديد على مشروع كوفي درايف ثرو حي الجامعيين.", type: "partnership", time: "منذ ٣ ساعات", read: false }
  ],
  advisoryRequests: [
    {
      id: "ADV001",
      accountId: defaultUser.id,
      projectName: "كوفي درايف ثرو حي الجامعيين",
      activityType: "كافيه",
      businessModel: "Drive-Thru",
      city: "حائل",
      neighborhood: "حي الجامعيين",
      exactLocation: "طريق الجامعة مقابل مجمع الخدمات",
      frontageType: "رئيسي",
      parkingAvailability: "متوسط",
      nearbyCompetitors: 6,
      siteArea: 180,
      capital: 380000,
      setupCost: 160000,
      monthlyCosts: 42000,
      expectedMonthlyRent: 18000,
      teamSize: 8,
      launchMonths: 4,
      targetAudience: "طلاب الجامعة والموظفون وسكان الحي",
      notes: "أفضلية لواجهة سريعة وتدفق سيارات مرتفع بعد العصر.",
      wantsHumanReview: true,
      status: "report_ready",
      workflowStatus: "in_review",
      reviewPriority: "high",
      assignedReviewerId: "REV001",
      assignedReviewerName: "سارة الدخيل",
      reviewDueDate: "2026-04-05",
      reviewSummary: "القراءة الأولية إيجابية، مع حاجة لضبط الإيجار ورفع وضوح خطة التمايز عن المنافسين القريبين.",
      workflowNotes: [
        {
          id: "NOTE001",
          authorName: "النظام",
          authorRole: "system",
          visibility: "client",
          content: "تم إنشاء التقرير الأولي وتحويل الطلب إلى مسار المراجعة البشرية.",
          createdAt: "2026-03-20 09:15",
        },
        {
          id: "NOTE002",
          authorName: "سارة الدخيل",
          authorRole: "reviewer",
          visibility: "internal",
          content: "التشبع مرتفع نسبياً في محيط الجامعة، لكن الموقع ما زال مناسباً إذا تم بناء ميزة سرعة وخدمة واضحة.",
          createdAt: "2026-03-21 13:40",
        },
        {
          id: "NOTE003",
          authorName: "سارة الدخيل",
          authorRole: "reviewer",
          visibility: "client",
          content: "يوصى بتأكيد تقدير الإيجار ومراجعة خطة التشغيل في فترات الذروة المسائية قبل تثبيت القرار النهائي.",
          createdAt: "2026-03-22 10:05",
        },
      ],
      locationSnapshot: {
        fitScore: 76,
        fitLabel: "ملاءمة جيدة قابلة للتحسين",
        primaryAudience: ["طلاب", "موظفون", "سكان الحي"],
        estimatedCompetitors: 6,
        competitorCategories: ["كافيهات سريعة", "حلويات", "مشروبات مختصة"],
        accessibilityScore: 84,
        parkingScore: 62,
        visibilityScore: 87,
        neighborhoodMomentum: 78,
      },
      partnershipWorkflowStatus: "partially_approved",
      partners: [
        {
          id: "AP001-P1",
          profileId: "PART001",
          accountId: defaultUser.id,
          email: defaultUser.email,
          name: "عبدالرحمن الشمري",
          role: "owner",
          contribution: 240000,
          equityShare: 55,
          profitShare: 50,
          responsibilities: "قيادة الاستثمار، التفاوض، واعتماد الميزانية النهائية.",
          status: "owner",
          approvalStatus: "owner_approved",
          invitedAt: "2026-03-20 09:15",
          respondedAt: "2026-03-20 09:15",
          approvalNote: "تم اعتماد الهيكل المبدئي من المالك.",
        },
        {
          id: "AP001-P2",
          profileId: "PART003",
          accountId: partnerUser.id,
          email: partnerUser.email,
          name: "شركة المدار التشغيلي",
          role: "operator",
          contribution: 140000,
          equityShare: 45,
          profitShare: 50,
          responsibilities: "إدارة التشغيل، بناء إجراءات الخدمة، وضبط سلسلة الإمداد.",
          status: "confirmed",
          approvalStatus: "approved",
          invitedAt: "2026-03-21 11:10",
          respondedAt: "2026-03-22 12:10",
          approvalNote: "تمت الموافقة بعد مراجعة التوزيع المالي وخطة التشغيل.",
        },
      ],
      partnerApprovalHistory: [
        {
          id: "PA001",
          partnerId: "AP001-P1",
          actorName: "عبدالرحمن الشمري",
          action: "invited",
          note: "تم إنشاء الملف الشراكي وإضافة الشريك التشغيلي.",
          createdAt: "2026-03-20 09:15",
        },
        {
          id: "PA002",
          partnerId: "AP001-P2",
          actorName: "شركة المدار التشغيلي",
          action: "approved",
          note: "موافقة على هيكل الملكية والتشغيل.",
          createdAt: "2026-03-22 12:10",
        },
      ],
      createdAt: "2026-03-20",
    },
  ],
  partnerProfiles: partnerProfilesSeed,
  partnershipRequests: [
    {
      id: "PR001",
      projectId: "ADV001",
      projectName: "كوفي درايف ثرو حي الجامعيين",
      fromAccountId: defaultUser.id,
      fromName: "عبدالرحمن الشمري",
      toPartnerId: "PART003",
      message: "نرغب في إشراككم كمشغل وشريك تشغيل بنسبة عادلة مقابل مساهمة تشغيلية وتمويلية.",
      proposedContribution: 140000,
      proposedEquity: 45,
      status: "accepted",
      createdAt: "2026-03-22 12:10",
    },
  ],
  registerAccount: (account) => {
    const existing = get().users.find((user) => user.email.toLowerCase() === account.email.toLowerCase());
    if (existing) {
      set({ currentUser: existing });
      return existing;
    }

    const newAccount: UserAccount = {
      id: `USR${Date.now()}`,
      fullName: account.fullName,
      email: account.email,
      phone: account.phone,
      company: account.company,
      city: account.city,
      role: account.role ?? "investor",
      password: account.password,
    };

    set((state) => ({
      users: [...state.users, newAccount],
      currentUser: newAccount,
      alerts: [
        {
          id: `A${Date.now()}`,
          message: `مرحباً ${newAccount.fullName}، تم إنشاء حسابك ويمكنك الآن تقديم طلب استشاري أو متابعة الأراضي الموسمية.`,
          type: "market",
          time: "الآن",
          read: false,
        },
        ...state.alerts,
      ],
    }));

    return newAccount;
  },
  loginAccount: (email, password) => {
    const fallbackAuthorityUser = authorityUser.email.toLowerCase() === email.toLowerCase() && authorityUser.password === password ? authorityUser : undefined;
    const found = get().users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password) ?? fallbackAuthorityUser;
    if (!found) {
      return { ok: false, message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
    }

    set((state) => ({
      currentUser: found,
      users: state.users.some((user) => user.id === found.id) ? state.users : [...state.users, found],
    }));
    return { ok: true };
  },
  loginAsDemoUser: () => set({ currentUser: defaultUser }),
  logoutAccount: () => set({ currentUser: null }),
  saveLand: (land) => set((state) => ({
    savedLands: state.isLandSaved(land.id)
      ? state.savedLands
      : [...state.savedLands, land]
  })),
  removeLand: (id) => set((state) => ({
    savedLands: state.savedLands.filter((l) => l.id !== id)
  })),
  isLandSaved: (id) => get().savedLands.some((l) => l.id === id),
  saveOpportunity: (opportunity) => set((state) => ({
    savedOpportunities: state.isOpportunitySaved(opportunity.id)
      ? state.savedOpportunities
      : [...state.savedOpportunities, opportunity]
  })),
  removeOpportunity: (id) => set((state) => ({
    savedOpportunities: state.savedOpportunities.filter((item) => item.id !== id)
  })),
  isOpportunitySaved: (id) => get().savedOpportunities.some((item) => item.id === id),
  markAlertRead: (id) => set((state) => ({
    alerts: state.alerts.map((a) => a.id === id ? { ...a, read: true } : a)
  })),
  submitAdvisoryRequest: (request) => {
    const currentUser = get().currentUser;
    if (!currentUser) {
      throw new Error("يجب تسجيل الدخول أولاً قبل إرسال الطلب الاستشاري");
    }

    const requestId = `ADV${Date.now()}`;
    set((state) => ({
      advisoryRequests: [
        {
          ...request,
          id: requestId,
          accountId: currentUser.id,
          createdAt: new Date().toISOString().slice(0, 10),
          status: "report_ready",
          workflowStatus: request.wantsHumanReview ? "queued" : "submitted",
          reviewPriority: "standard",
          partnershipWorkflowStatus: request.partners?.length ? "awaiting_partner_approval" : "not_required",
          partners: request.partners?.length
            ? request.partners
            : [
                {
                  id: `${requestId}-OWNER`,
                  accountId: currentUser.id,
                  profileId: get().partnerProfiles.find((profile) => profile.accountId === currentUser.id)?.id,
                  email: currentUser.email,
                  name: currentUser.fullName,
                  role: "owner",
                  contribution: request.capital,
                  equityShare: 100,
                  profitShare: 100,
                  responsibilities: "المالك الرئيسي وصاحب القرار الاستثماري.",
                  status: "owner",
                  approvalStatus: "owner_approved",
                  invitedAt: createTimestamp(),
                  respondedAt: createTimestamp(),
                  approvalNote: "اعتماد تلقائي من مالك المشروع.",
                },
              ],
          partnerApprovalHistory: request.partners?.length
            ? request.partners.map((partner, index) => ({
                id: `PA-${Date.now()}-${index}`,
                partnerId: partner.id,
                actorName: currentUser.fullName,
                action: "invited" as const,
                note: `تمت إضافة ${partner.name} إلى الهيكلة الشراكية الأولية.`,
                createdAt: createTimestamp(),
              }))
            : [],
          workflowNotes: [
            {
              id: `N${Date.now()}`,
              authorName: "النظام",
              authorRole: "system",
              visibility: "client",
              content: request.wantsHumanReview
                ? "تم إنشاء التقرير الأولي وإدراج الطلب ضمن قائمة المراجعة البشرية."
                : "تم إنشاء التقرير الأولي، ويمكن تفعيل المراجعة البشرية في أي وقت.",
              createdAt: createTimestamp(),
            },
          ],
        },
        ...state.advisoryRequests,
      ],
      alerts: [
        {
          id: `A${Date.now()}`,
          message: `تم إنشاء تقرير استشاري أولي لمشروع ${request.projectName}${request.wantsHumanReview ? " وتم تحويله أيضاً إلى المراجعة البشرية" : ""}.`,
          type: "market",
          time: "الآن",
          read: false,
        },
        ...state.alerts,
      ],
    }));
    return requestId;
  },
  upsertPartnerProfile: (profile) => {
    const currentUser = get().currentUser;
    const profileId = profile.id ?? `PART${Date.now()}`;
    const normalizedProfile: PartnerProfileData = {
      ...profile,
      id: profileId,
      accountId: profile.accountId ?? currentUser?.id,
      compatibilityScore: profile.compatibilityScore ?? 80,
    };

    set((state) => ({
      partnerProfiles: state.partnerProfiles.some((item) => item.id === profileId)
        ? state.partnerProfiles.map((item) => (item.id === profileId ? normalizedProfile : item))
        : [normalizedProfile, ...state.partnerProfiles],
    }));

    return profileId;
  },
  createPartnershipRequest: (payload) => {
    const currentUser = get().currentUser;
    if (!currentUser) {
      throw new Error("يجب تسجيل الدخول أولاً قبل إرسال طلب شراكة");
    }

    set((state) => ({
      partnershipRequests: [
        {
          ...payload,
          id: `PR${Date.now()}`,
          fromAccountId: currentUser.id,
          fromName: currentUser.fullName,
          status: "pending",
          createdAt: createTimestamp(),
        },
        ...state.partnershipRequests,
      ],
      alerts: [
        {
          id: `A${Date.now()}`,
          message: `تم إرسال طلب شراكة جديد على مشروع ${payload.projectName}.`,
          type: "partnership",
          time: "الآن",
          read: false,
        },
        ...state.alerts,
      ],
    }));
  },
  respondToPartnershipRequest: (requestId, status) => {
    set((state) => ({
      partnershipRequests: state.partnershipRequests.map((request) =>
        request.id === requestId ? { ...request, status } : request
      ),
      alerts: [
        {
          id: `A${Date.now()}`,
          message: status === "accepted"
            ? "تم قبول أحد طلبات الشراكة وتحديث ملف المشروع."
            : "تم رفض أحد طلبات الشراكة المقترحة.",
          type: "partnership",
          time: "الآن",
          read: false,
        },
        ...state.alerts,
      ],
    }));
  },
  respondToProjectPartnerApproval: (requestId, partnerId, status, note) => {
    const currentUser = get().currentUser;
    const actorName = currentUser?.fullName ?? "شريك المشروع";

    set((state) => ({
      advisoryRequests: state.advisoryRequests.map((request) => {
        if (request.id !== requestId) {
          return request;
        }

        const updatedPartners = request.partners.map((partner) =>
          partner.id === partnerId
            ? {
                ...partner,
                status: status === "approved" ? "confirmed" : partner.status,
                approvalStatus: status,
                approvalNote: note ?? partner.approvalNote,
                respondedAt: createTimestamp(),
              }
            : partner
        );

        const nonOwnerPartners = updatedPartners.filter((partner) => partner.role !== "owner");
        const allApproved = nonOwnerPartners.length > 0 && nonOwnerPartners.every((partner) => partner.approvalStatus === "approved");
        const hasRejected = nonOwnerPartners.some((partner) => partner.approvalStatus === "rejected");
        const hasChanges = nonOwnerPartners.some((partner) => partner.approvalStatus === "changes_requested");
        const approvedCount = nonOwnerPartners.filter((partner) => partner.approvalStatus === "approved").length;

        const partnershipWorkflowStatus = request.partners.length <= 1
          ? "not_required"
          : hasRejected
            ? "changes_requested"
            : hasChanges
              ? "changes_requested"
              : allApproved
                ? "fully_approved"
                : approvedCount > 0
                  ? "partially_approved"
                  : "awaiting_partner_approval";

        return {
          ...request,
          partnershipWorkflowStatus,
          partners: updatedPartners,
          partnerApprovalHistory: [
            {
              id: `PA${Date.now()}`,
              partnerId,
              actorName,
              action: status,
              note,
              createdAt: createTimestamp(),
            },
            ...request.partnerApprovalHistory,
          ],
        };
      }),
    }));
  },
  updateProjectPartnerTerms: (requestId, partnerId, updates) => {
    const currentUser = get().currentUser;
    const actorName = currentUser?.fullName ?? "مدير المشروع";

    set((state) => ({
      advisoryRequests: state.advisoryRequests.map((request) => {
        if (request.id !== requestId) {
          return request;
        }

        return {
          ...request,
          partnershipWorkflowStatus: request.partners.length > 1 ? "awaiting_partner_approval" : request.partnershipWorkflowStatus,
          partners: request.partners.map((partner) =>
            partner.id === partnerId
              ? {
                  ...partner,
                  ...updates,
                  status: partner.role === "owner" ? partner.status : "invited",
                  approvalStatus: partner.role === "owner" ? partner.approvalStatus : "pending_partner",
                  approvalNote: updates.approvalNote ?? partner.approvalNote,
                }
              : partner
          ),
          partnerApprovalHistory: [
            {
              id: `PA${Date.now()}`,
              partnerId,
              actorName,
              action: "terms_updated",
              note: updates.approvalNote ?? "تم تحديث شروط الشريك وإعادة فتح الموافقة.",
              createdAt: createTimestamp(),
            },
            ...request.partnerApprovalHistory,
          ],
        };
      }),
    }));
  },
  assignReviewer: (requestId, reviewerId) => {
    set((state) => {
      const request = state.advisoryRequests.find((item) => item.id === requestId);
      const reviewer = state.reviewers.find((item) => item.id === reviewerId);
      if (!request || !reviewer) {
        return state;
      }

      const releasedReviewers = decrementReviewerLoad(state.reviewers, request.assignedReviewerId);
      const updatedReviewers = incrementReviewerLoad(releasedReviewers, reviewerId);

      return {
        reviewers: updatedReviewers,
        advisoryRequests: state.advisoryRequests.map((item) =>
          item.id === requestId
            ? {
                ...item,
                assignedReviewerId: reviewer.id,
                assignedReviewerName: reviewer.name,
                workflowStatus: item.workflowStatus === "review_complete" ? item.workflowStatus : "assigned",
                status: "under_review",
              }
            : item
        ),
      };
    });
  },
  updateAdvisoryWorkflow: (requestId, updates) => {
    set((state) => ({
      advisoryRequests: state.advisoryRequests.map((item) => {
        if (item.id !== requestId) {
          return item;
        }

        const workflowStatus = updates.workflowStatus ?? item.workflowStatus;
        return {
          ...item,
          ...updates,
          workflowStatus,
          status: workflowStatus === "review_complete" ? "report_ready" : item.assignedReviewerId || item.wantsHumanReview ? "under_review" : item.status,
          reviewCompletedAt: workflowStatus === "review_complete" ? updates.reviewCompletedAt ?? createTimestamp() : updates.reviewCompletedAt ?? item.reviewCompletedAt,
        };
      }),
    }));
  },
  addAdvisoryNote: (requestId, note) => {
    set((state) => ({
      advisoryRequests: state.advisoryRequests.map((item) =>
        item.id === requestId
          ? {
              ...item,
              workflowNotes: [
                {
                  ...note,
                  id: `N${Date.now()}`,
                  createdAt: createTimestamp(),
                },
                ...item.workflowNotes,
              ],
            }
          : item
      ),
    }));
  },
  getAdvisoryRequestById: (id) => get().advisoryRequests.find((request) => request.id === id),
}), {
  name: "hail-platform-store",
  version: 7,
  migrate: (persistedState, version) => {
    const state = persistedState as Partial<AppStore> | undefined;

    if (!state) {
      return state as unknown as AppStore;
    }

    if (version < 2) {
      return {
        ...state,
        currentUser: null,
        reviewers: state.reviewers ?? defaultReviewers,
        savedOpportunities: state.savedOpportunities ?? [],
        partnerProfiles: state.partnerProfiles ?? partnerProfilesSeed,
        partnershipRequests: state.partnershipRequests ?? [],
      } as AppStore;
    }

    if (version < 3) {
      return {
        ...state,
        savedOpportunities: state.savedOpportunities ?? [],
        partnerProfiles: state.partnerProfiles ?? partnerProfilesSeed,
        partnershipRequests: state.partnershipRequests ?? [],
        advisoryRequests: (state.advisoryRequests ?? []).map((request) => ({
          ...request,
          partners: request.partners ?? [
            {
              id: `${request.id}-OWNER`,
              accountId: request.accountId,
              name: state.users?.find((user) => user.id === request.accountId)?.fullName ?? "مالك المشروع",
              role: "owner",
              contribution: request.capital,
              equityShare: 100,
              profitShare: 100,
              responsibilities: "المالك الرئيسي للمشروع.",
              status: "owner",
            },
          ],
        })),
      } as AppStore;
    }

    if (version < 4) {
      return {
        ...state,
        users: state.users ?? [defaultUser, partnerUser, specialistUser],
        advisoryRequests: (state.advisoryRequests ?? []).map((request) => ({
          ...request,
          partnershipWorkflowStatus: request.partners && request.partners.length > 1 ? "awaiting_partner_approval" : "not_required",
          partners: (request.partners ?? []).map((partner) => ({
            ...partner,
            email: partner.email ?? state.users?.find((user) => user.id === partner.accountId)?.email,
            approvalStatus: partner.approvalStatus ?? (partner.role === "owner" ? "owner_approved" : partner.status === "confirmed" ? "approved" : "pending_partner"),
            invitedAt: partner.invitedAt ?? request.createdAt,
            approvalNote: partner.approvalNote,
          })),
          partnerApprovalHistory: request.partnerApprovalHistory ?? [],
        })),
      } as AppStore;
    }

    if (version < 5) {
      const users = state.users ?? [defaultUser, partnerUser, specialistUser];
      return {
        ...state,
        users,
        reviewers: state.reviewers ?? defaultReviewers,
        savedOpportunities: state.savedOpportunities ?? [],
        partnerProfiles: state.partnerProfiles ?? partnerProfilesSeed,
        partnershipRequests: state.partnershipRequests ?? [],
        advisoryRequests: (state.advisoryRequests ?? []).map((request) => sanitizeAdvisoryRequest(request, users)),
      } as AppStore;
    }

    if (version < 6) {
      const users = state.users ?? [defaultUser, partnerUser, specialistUser];
      return {
        ...state,
        users,
        reviewers: state.reviewers ?? defaultReviewers,
        savedOpportunities: state.savedOpportunities ?? [],
        partnerProfiles: state.partnerProfiles ?? partnerProfilesSeed,
        partnershipRequests: state.partnershipRequests ?? [],
        advisoryRequests: (state.advisoryRequests ?? []).map((request) => sanitizeAdvisoryRequest(request, users)),
      } as AppStore;
    }

    if (version < 7) {
      const users = (state.users ?? [defaultUser, partnerUser, specialistUser, authorityUser]).map((user) =>
        user.id === defaultUser.id ? defaultUser : user
      );
      const landNamesById: Record<string, string> = {
        APP001: "حي النقرة",
        APP002: "حي النقرة",
        APP003: "وسط المدينة",
      };

      return {
        ...state,
        currentUser: state.currentUser?.id === defaultUser.id ? defaultUser : state.currentUser ?? null,
        users,
        applications: (state.applications ?? []).map((application) => ({
          ...application,
          landName: landNamesById[application.id] ?? application.landName,
        })),
        advisoryRequests: (state.advisoryRequests ?? []).map((request) =>
          request.accountId === defaultUser.id
            ? sanitizeAdvisoryRequest(
                {
                  ...request,
                  partners: (request.partners ?? []).map((partner) =>
                    partner.accountId === defaultUser.id
                      ? {
                          ...partner,
                          email: defaultUser.email,
                          name: defaultUser.fullName,
                        }
                      : partner
                  ),
                  partnerApprovalHistory: (request.partnerApprovalHistory ?? []).map((event) =>
                    event.partnerId.includes("OWNER")
                      ? {
                          ...event,
                          actorName: defaultUser.fullName,
                        }
                      : event
                  ),
                },
                users
              )
            : sanitizeAdvisoryRequest(request, users)
        ),
        partnershipRequests: (state.partnershipRequests ?? []).map((request) =>
          request.fromAccountId === defaultUser.id
            ? {
                ...request,
                fromName: defaultUser.fullName,
              }
            : request
        ),
        alerts: state.alerts ?? [],
      } as AppStore;
    }

    return state as unknown as AppStore;
  },
  partialize: (state) => ({
    currentUser: state.currentUser,
    users: state.users,
    reviewers: state.reviewers,
    savedLands: state.savedLands,
    savedOpportunities: state.savedOpportunities,
    applications: state.applications,
    alerts: state.alerts,
    advisoryRequests: state.advisoryRequests,
    partnerProfiles: state.partnerProfiles,
    partnershipRequests: state.partnershipRequests,
  }),
}));
