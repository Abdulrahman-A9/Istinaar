import type {
  AdvisoryNoteVisibility,
  AdvisoryReviewPriority,
  AdvisoryWorkflowStatus,
} from "@/store/appStore";

export const advisoryWorkflowMeta: Record<
  AdvisoryWorkflowStatus,
  { label: string; tone: string; surface: string }
> = {
  submitted: { label: "تم الاستلام", tone: "#1D4ED8", surface: "#DBEAFE" },
  queued: { label: "بانتظار المراجع", tone: "#A16207", surface: "#FEF3C7" },
  assigned: { label: "تم التعيين", tone: "#2563EB", surface: "#E0E7FF" },
  in_review: { label: "قيد المراجعة البشرية", tone: "#7C3AED", surface: "#EDE9FE" },
  awaiting_client: { label: "بانتظار إفادة العميل", tone: "#C2410C", surface: "#FFEDD5" },
  review_complete: { label: "أغلقت المراجعة", tone: "#166534", surface: "#DCFCE7" },
};

export const advisoryPriorityMeta: Record<
  AdvisoryReviewPriority,
  { label: string; tone: string; surface: string }
> = {
  standard: { label: "اعتيادي", tone: "#475569", surface: "#E2E8F0" },
  high: { label: "مرتفع", tone: "#B45309", surface: "#FEF3C7" },
  urgent: { label: "عاجل", tone: "#B91C1C", surface: "#FEE2E2" },
};

export const advisoryNoteVisibilityMeta: Record<
  AdvisoryNoteVisibility,
  { label: string; tone: string; surface: string }
> = {
  internal: { label: "داخلي", tone: "#6B7280", surface: "#F3F4F6" },
  client: { label: "مرئي للعميل", tone: "#1D4ED8", surface: "#DBEAFE" },
};

export function getAdvisoryWorkflowMeta(status?: AdvisoryWorkflowStatus | string | null) {
  if (!status) {
    return advisoryWorkflowMeta.submitted;
  }

  return advisoryWorkflowMeta[status as keyof typeof advisoryWorkflowMeta] ?? advisoryWorkflowMeta.submitted;
}

export function getAdvisoryPriorityMeta(priority?: AdvisoryReviewPriority | string | null) {
  if (!priority) {
    return advisoryPriorityMeta.standard;
  }

  return advisoryPriorityMeta[priority as keyof typeof advisoryPriorityMeta] ?? advisoryPriorityMeta.standard;
}

export function getAdvisoryNoteVisibilityMeta(visibility?: AdvisoryNoteVisibility | string | null) {
  if (!visibility) {
    return advisoryNoteVisibilityMeta.internal;
  }

  return advisoryNoteVisibilityMeta[visibility as keyof typeof advisoryNoteVisibilityMeta] ?? advisoryNoteVisibilityMeta.internal;
}