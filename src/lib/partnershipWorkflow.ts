import type { AdvisoryRequest, ProjectPartner } from "@/store/appStore";

export const partnerApprovalMeta = {
  owner_approved: {
    label: "اعتماد المالك",
    tone: "#0F766E",
    surface: "#CCFBF1",
  },
  pending_partner: {
    label: "بانتظار الشريك",
    tone: "#92400E",
    surface: "#FEF3C7",
  },
  approved: {
    label: "معتمد",
    tone: "#166534",
    surface: "#DCFCE7",
  },
  changes_requested: {
    label: "طلب تعديل",
    tone: "#B45309",
    surface: "#FFEDD5",
  },
  rejected: {
    label: "مرفوض",
    tone: "#B91C1C",
    surface: "#FEE2E2",
  },
} as const;

export const partnershipWorkflowMeta = {
  not_required: {
    label: "لا يتطلب شراكة",
    tone: "#475569",
    surface: "#E2E8F0",
  },
  drafting: {
    label: "تهيئة الهيكل",
    tone: "#1D4ED8",
    surface: "#DBEAFE",
  },
  awaiting_partner_approval: {
    label: "بانتظار الموافقات",
    tone: "#92400E",
    surface: "#FEF3C7",
  },
  changes_requested: {
    label: "تعديلات مطلوبة",
    tone: "#B45309",
    surface: "#FFEDD5",
  },
  partially_approved: {
    label: "اعتماد جزئي",
    tone: "#2563EB",
    surface: "#DBEAFE",
  },
  fully_approved: {
    label: "اعتماد كامل",
    tone: "#166534",
    surface: "#DCFCE7",
  },
} as const;

export function getPartnerApprovalMeta(status?: ProjectPartner["approvalStatus"] | string | null) {
  if (!status) {
    return partnerApprovalMeta.pending_partner;
  }

  return partnerApprovalMeta[status as keyof typeof partnerApprovalMeta] ?? partnerApprovalMeta.pending_partner;
}

export function getPartnershipWorkflowMeta(status?: AdvisoryRequest["partnershipWorkflowStatus"] | string | null) {
  if (!status) {
    return partnershipWorkflowMeta.drafting;
  }

  return partnershipWorkflowMeta[status as keyof typeof partnershipWorkflowMeta] ?? partnershipWorkflowMeta.drafting;
}

export function summarizePartnershipApprovals(request: AdvisoryRequest) {
  const partners = request.partners.filter((partner) => partner.role !== "owner");
  return {
    totalPartners: request.partners.length,
    externalPartners: partners.length,
    approved: partners.filter((partner) => partner.approvalStatus === "approved").length,
    pending: partners.filter((partner) => partner.approvalStatus === "pending_partner").length,
    changesRequested: partners.filter((partner) => partner.approvalStatus === "changes_requested").length,
    rejected: partners.filter((partner) => partner.approvalStatus === "rejected").length,
  };
}

export function canCurrentUserActOnPartner(partner: ProjectPartner, currentUserId?: string | null) {
  if (!currentUserId) {
    return false;
  }

  return partner.accountId === currentUserId;
}