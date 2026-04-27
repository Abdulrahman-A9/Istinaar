"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowLeft, CircleAlert, Download, FileCheck2, MapPinned, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { generateAdvisoryReport } from "@/lib/advisory";
import { advisoryNoteVisibilityMeta, advisoryPriorityMeta, advisoryWorkflowMeta } from "@/lib/consultingWorkflow";
import { summarizePartnership } from "@/lib/opportunities";
import { canCurrentUserActOnPartner, getPartnerApprovalMeta, getPartnershipWorkflowMeta, summarizePartnershipApprovals } from "@/lib/partnershipWorkflow";
import { exportSectionsToPdf } from "@/lib/pdfExport";

export default function ConsultingReportPage() {
  const params = useParams<{ id: string }>();
  const getAdvisoryRequestById = useAppStore((state) => state.getAdvisoryRequestById);
  const currentUser = useAppStore((state) => state.currentUser);
  const respondToProjectPartnerApproval = useAppStore((state) => state.respondToProjectPartnerApproval);
  const request = getAdvisoryRequestById(params.id);
  const [approvalNotes, setApprovalNotes] = useState<Record<string, string>>({});
  const executiveSectionRef = useRef<HTMLDivElement>(null);
  const partnershipSectionRef = useRef<HTMLDivElement>(null);

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F8F9FB" }}>
        <div className="card p-8 text-center max-w-lg">
          <p className="text-2xl font-black text-navy mb-3">التقرير غير موجود</p>
          <p className="text-gray-500 mb-5">قد يكون المعرف غير صحيح أو لم يتم إنشاء الطلب بعد.</p>
          <Link href="/consulting/request" className="btn-primary">إنشاء طلب استشاري جديد</Link>
        </div>
      </div>
    );
  }

  const report = generateAdvisoryReport(request);
  const workflowMeta = advisoryWorkflowMeta[request.workflowStatus];
  const priorityMeta = advisoryPriorityMeta[request.reviewPriority];
  const clientVisibleNotes = request.workflowNotes.filter((item) => item.visibility === "client");
  const partnershipSummary = summarizePartnership(request.partners);
  const partnershipApprovals = summarizePartnershipApprovals(request);
  const partnershipMeta = getPartnershipWorkflowMeta(request.partnershipWorkflowStatus);

  const handlePartnerDecision = (partnerId: string, status: "approved" | "changes_requested" | "rejected") => {
    respondToProjectPartnerApproval(request.id, partnerId, status, approvalNotes[partnerId]);
    setApprovalNotes((current) => ({ ...current, [partnerId]: "" }));
  };

  const handleExecutivePdfExport = async () => {
    await exportSectionsToPdf({
      fileName: `executive-report-${request.id}.pdf`,
      sections: [
        { element: executiveSectionRef.current, title: `Executive Report - ${request.projectName}` },
      ],
    });
  };

  const handlePartnershipPdfExport = async () => {
    await exportSectionsToPdf({
      fileName: `partnership-structure-${request.id}.pdf`,
      sections: [
        { element: partnershipSectionRef.current, title: `Partnership Structure - ${request.projectName}` },
      ],
    });
  };

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#F8F9FB" }}>
      <div className="max-w-7xl mx-auto space-y-6" ref={executiveSectionRef}>
        <section className="rounded-[2rem] p-8 text-white" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="text-right max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
                <Sparkles size={16} />
                التقرير الاستشاري الأولي الآلي
              </span>
              <h1 className="text-4xl font-black leading-tight mb-3">{request.projectName}</h1>
              <p className="text-white/75 leading-8 max-w-3xl">{report.executiveSummary}</p>
            </div>
            <div className="glass-panel rounded-[1.5rem] p-5 min-w-[280px] text-right">
              <p className="text-sm text-white/60 mb-2">قرار أولي للمشروع</p>
              <p className="text-4xl font-black" style={{ color: "#F5D88E" }}>{report.overallScore}%</p>
              <p className="text-sm text-white/70 mt-2">{report.decisionLabel}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-end">
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: workflowMeta.surface, color: workflowMeta.tone }}>{workflowMeta.label}</span>
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: priorityMeta.surface, color: priorityMeta.tone }}>{priorityMeta.label}</span>
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: partnershipMeta.surface, color: partnershipMeta.tone }}>{partnershipMeta.label}</span>
              </div>
              <p className="text-xs text-white/60 mt-3">{request.wantsHumanReview ? "المراجعة البشرية مفعّلة" : "التقرير الحالي آلي فقط"}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "تقييم الموقع", value: `${report.locationScore}%`, icon: <MapPinned size={18} /> },
            { label: "ملاءمة السوق", value: `${report.marketFitScore}%`, icon: <TrendingUp size={18} /> },
            { label: "الجاهزية المالية", value: `${report.financialReadinessScore}%`, icon: <FileCheck2 size={18} /> },
            { label: "مستوى المخاطر", value: report.risk.label, icon: <ShieldCheck size={18} /> },
          ].map((item) => (
            <div key={item.label} className="soft-card p-5 text-right">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(10,35,66,0.08)", color: "#0A2342" }}>
                  {item.icon}
                </div>
                <p className="text-2xl font-black text-navy">{item.value}</p>
              </div>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-2xl font-black text-navy">القراءة المالية الأولية</h2>
              <p className="text-sm text-gray-500">مخرجات آلية مبنية على رأس المال، التشغيل، ونوع النشاط</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {[
                { label: "صافي الربح المتوقع", value: `${report.investment.netProfit.toLocaleString()} ريال` },
                { label: "العائد على الاستثمار", value: `${report.investment.roi}%` },
                { label: "فترة الاسترداد", value: `${report.investment.paybackMonths} أشهر` },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-gray-50 p-4 text-right">
                  <p className="text-xl font-black text-navy mb-1">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(report.investment.scenarios).map((scenario) => (
                <div key={scenario.label} className="rounded-2xl p-4 text-right" style={{ backgroundColor: "#F8FAFC" }}>
                  <p className="text-sm font-black text-navy mb-2">{scenario.label}</p>
                  <p className="text-sm text-gray-500">إيراد متوقع: {scenario.revenue.toLocaleString()} ريال</p>
                  <p className="text-sm text-gray-500">صافي ربح: {scenario.profit.toLocaleString()} ريال</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-2xl font-black text-navy">ملخص الموقع والمشروع</h2>
              <p className="text-sm text-gray-500">البيانات المدخلة التي بُني عليها التقرير</p>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["النشاط", request.activityType],
                ["النموذج", request.businessModel],
                ["الحي", request.neighborhood],
                ["الموقع", request.exactLocation],
                ["نوع الواجهة", request.frontageType],
                ["المواقف", request.parkingAvailability],
                ["المنافسون المباشرون", `${request.nearbyCompetitors}`],
                ["المساحة", `${request.siteArea} م²`],
                ["رأس المال", `${request.capital.toLocaleString()} ريال`],
                ["الإيجار الشهري", `${request.expectedMonthlyRent.toLocaleString()} ريال`],
                ["الفريق", `${request.teamSize} أفراد`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-gray-50 p-3 flex items-center justify-between gap-3">
                  <p className="font-bold text-navy">{value}</p>
                  <p className="text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[0.94fr_1.06fr] gap-6">
          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-2xl font-black text-navy">حالة المراجعة البشرية</h2>
              <p className="text-sm text-gray-500">تدفق العمل الحالي بين التقرير الآلي والفريق الاستشاري</p>
            </div>
            <div className="space-y-4">
              <div className="soft-card p-4 flex items-center justify-between">
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: workflowMeta.surface, color: workflowMeta.tone }}>{workflowMeta.label}</span>
                <div className="text-right">
                  <p className="font-black text-navy">حالة السير الحالية</p>
                  <p className="text-sm text-gray-500">الأولوية: {priorityMeta.label}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-4 text-right">
                  <p className="text-gray-400 mb-1">المراجع المكلّف</p>
                  <p className="font-bold text-navy">{request.assignedReviewerName ?? "لم يتم التعيين بعد"}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 text-right">
                  <p className="text-gray-400 mb-1">تاريخ الاستحقاق</p>
                  <p className="font-bold text-navy">{request.reviewDueDate ?? "غير محدد"}</p>
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <p className="text-gray-400 mb-1">ملخص المراجعة</p>
                <p className="text-sm text-gray-600 leading-7">{request.reviewSummary ?? "لا يوجد ملخص نهائي بعد. ما زالت المراجعة جارية أو بانتظار التحديث."}</p>
              </div>
              <div className="space-y-3">
                {clientVisibleNotes.length > 0 ? clientVisibleNotes.map((note) => {
                  const visibilityMeta = advisoryNoteVisibilityMeta[note.visibility];
                  return (
                    <div key={note.id} className="rounded-xl border border-gray-100 px-4 py-3 text-right">
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
                }) : (
                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500 text-right">لا توجد ملاحظات موجهة للعميل حتى الآن.</div>
                )}
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-2xl font-black text-navy">ذكاء الموقع والمنافسة</h2>
              <p className="text-sm text-gray-500">تفصيل أعمق للجمهور، المنافسة، والجاهزية المكانية</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
              {[
                { label: "ملاءمة الجمهور", value: `${report.fitBreakdown.audienceFit}%` },
                { label: "فجوة التنافس", value: `${report.fitBreakdown.competitiveGap}%` },
                { label: "جاهزية الموقع", value: `${report.fitBreakdown.siteReadiness}%` },
                { label: "كفاءة الإيجار", value: `${report.fitBreakdown.rentEfficiency}%` },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-gray-50 p-4 text-right">
                  <p className="text-xl font-black text-navy">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 text-right mb-4">
              <p className="font-black text-navy mb-2">قراءة الموقع</p>
              <p className="text-sm text-gray-600 leading-7">{report.locationNarrative}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 text-right mb-4">
              <p className="font-black text-navy mb-2">قراءة المنافسة</p>
              <p className="text-sm text-gray-600 leading-7">{report.competitorSummary}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="rounded-xl bg-white border border-gray-100 p-4 text-right">
                <p className="text-gray-400 mb-1">الملاءمة المركبة</p>
                <p className="font-bold text-navy">{report.locationSnapshot.fitLabel}</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-100 p-4 text-right">
                <p className="text-gray-400 mb-1">الوصول</p>
                <p className="font-bold text-navy">{report.locationSnapshot.accessibilityScore}%</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-100 p-4 text-right">
                <p className="text-gray-400 mb-1">المواقف</p>
                <p className="font-bold text-navy">{report.locationSnapshot.parkingScore}%</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-100 p-4 text-right">
                <p className="text-gray-400 mb-1">المنافسون</p>
                <p className="font-bold text-navy">{report.locationSnapshot.estimatedCompetitors}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-6">
          <div className="card p-6" ref={partnershipSectionRef}>
            <div className="text-right mb-5">
              <h2 className="text-2xl font-black text-navy">هيكلة الشراكة الاستثمارية</h2>
              <p className="text-sm text-gray-500">الملف الحالي يدعم المشروع الفردي أو المشروع المشترك حتى خمسة شركاء</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-4 text-right flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-navy mb-1">مراجعة قانونية ومالية قبل الاعتماد النهائي</p>
                <p className="text-sm text-gray-600 leading-7">راجع فروقات التمويل، نسب الملكية، توزيع الأرباح، ومسؤوليات التوقيع لكل شريك قبل تثبيت قرار الاعتماد النهائي.</p>
              </div>
              <Link href={`/consulting/report/${request.id}/comparison`} className="btn-outline whitespace-nowrap">
                فتح صفحة المقارنة
                <ArrowLeft size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "إجمالي التمويل", value: `${partnershipSummary.totalContribution.toLocaleString()} ريال` },
                { label: "الشركاء المؤكدون", value: `${partnershipSummary.confirmedPartners}` },
                { label: "دعوات معلقة", value: `${partnershipApprovals.pending}` },
                { label: "اعتمادات مكتملة", value: `${partnershipApprovals.approved}` },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-gray-50 p-4 text-right">
                  <p className="text-lg font-black text-navy">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 text-right mb-4">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: partnershipMeta.surface, color: partnershipMeta.tone }}>{partnershipMeta.label}</span>
                <p className="font-black text-navy">Workflow الموافقات الشراكية</p>
              </div>
              <p className="text-sm text-gray-600 leading-7">يتم اعتماد الهيكل الشراكي من كل شريك على حدة. عند طلب تعديل أو رفض أحد الشركاء، تعود الهيكلة إلى حالة التفاوض حتى يتم تحديث الشروط وإعادة اعتمادها.</p>
            </div>
            <div className="space-y-3">
              {request.partners.map((partner) => (
                <div key={partner.id} className="rounded-2xl border border-gray-100 p-4 text-right">
                  {(() => {
                    const partnerMeta = getPartnerApprovalMeta(partner.approvalStatus);
                    return (
                      <>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: partnerMeta.surface, color: partnerMeta.tone }}>
                        {partnerMeta.label}
                      </span>
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: partner.status === "confirmed" || partner.status === "owner" ? "#DCFCE7" : "#FEF3C7", color: partner.status === "confirmed" || partner.status === "owner" ? "#166534" : "#92400E" }}>
                        {partner.status === "owner" ? "مالك" : partner.status === "confirmed" ? "مؤكد" : "دعوة معلقة"}
                      </span>
                    </div>
                    <div>
                      <p className="font-black text-navy">{partner.name}</p>
                      <p className="text-xs text-gray-400">{partner.role}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600 mb-3">
                    <div className="rounded-xl bg-gray-50 p-3">مساهمة {partner.contribution.toLocaleString()} ريال</div>
                    <div className="rounded-xl bg-gray-50 p-3">ملكية {partner.equityShare}%</div>
                    <div className="rounded-xl bg-gray-50 p-3">أرباح {partner.profitShare}%</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-7">{partner.responsibilities}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm text-gray-500">
                    <div className="rounded-xl bg-gray-50 p-3">تمت الدعوة: {partner.invitedAt ?? "غير محدد"}</div>
                    <div className="rounded-xl bg-gray-50 p-3">آخر رد: {partner.respondedAt ?? "بانتظار الرد"}</div>
                  </div>
                  {partner.approvalNote ? (
                    <div className="rounded-xl bg-gray-50 p-3 mt-3 text-sm text-gray-600 leading-7">ملاحظة الموافقة: {partner.approvalNote}</div>
                  ) : null}
                  {canCurrentUserActOnPartner(partner, currentUser?.id) ? (
                    <div className="rounded-2xl border border-dashed border-gray-200 p-4 mt-4">
                      <p className="font-black text-navy mb-3">إجراء الشريك الحالي</p>
                      <textarea
                        value={approvalNotes[partner.id] ?? ""}
                        onChange={(event) => setApprovalNotes((current) => ({ ...current, [partner.id]: event.target.value }))}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none mb-3"
                        placeholder="أضف تعليقك على التوزيع أو اطلب تعديلاً محدداً..."
                      />
                      <div className="flex flex-wrap gap-3 justify-end">
                        <button onClick={() => handlePartnerDecision(partner.id, "approved")} className="btn-primary text-sm px-4 py-2">اعتماد</button>
                        <button onClick={() => handlePartnerDecision(partner.id, "changes_requested")} className="px-4 py-2 rounded-xl border border-amber-200 text-sm font-semibold text-amber-700 bg-amber-50">طلب تعديل</button>
                        <button onClick={() => handlePartnerDecision(partner.id, "rejected")} className="px-4 py-2 rounded-xl border border-red-200 text-sm font-semibold text-red-700 bg-red-50">رفض</button>
                      </div>
                    </div>
                  ) : null}
                      </>
                    );
                  })()}
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 mt-4 text-right">
              <p className="font-black text-navy mb-2">سجل الموافقات</p>
              <div className="space-y-2">
                {request.partnerApprovalHistory.map((event) => (
                  <div key={event.id} className="rounded-xl bg-white px-4 py-3 text-sm text-gray-600 flex items-start justify-between gap-4">
                    <div className="text-left text-xs text-gray-400">{event.createdAt}</div>
                    <div className="text-right">
                      <p><span className="font-semibold text-navy">{event.actorName}</span> - {event.action}</p>
                      {event.note ? <p className="mt-1 leading-6">{event.note}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-2xl font-black text-navy">أفضل أحياء بديلة مقترحة</h2>
              <p className="text-sm text-gray-500">هذه التوصيات تساعدك على مقارنة الموقع الحالي قبل تثبيت القرار</p>
            </div>
            <div className="space-y-3">
              {report.recommendedNeighborhoods.map((item, index) => (
                <div key={item.neighborhood} className="soft-card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white" style={{ backgroundColor: "#0A2342" }}>
                      {index + 1}
                    </div>
                    <div className="text-right">
                      <p className="font-black text-navy">{item.neighborhood}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.note}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-navy">{item.score}%</p>
                    <p className="text-xs text-gray-500">إيجار مرجعي {item.averageRent.toLocaleString()} ريال</p>
                    <p className="text-xs text-gray-400 mt-1">منافسون مرصودون: {item.competitorCount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <div className="text-right mb-4">
                <h2 className="text-xl font-black text-navy">نقاط القوة</h2>
              </div>
              <div className="space-y-3">
                {report.strengths.map((item) => (
                  <div key={item} className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "#ECFDF5", color: "#166534" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div className="text-right mb-4">
                <h2 className="text-xl font-black text-navy">تنبيهات يجب الانتباه لها</h2>
              </div>
              <div className="space-y-3">
                {report.warnings.map((item) => (
                  <div key={item} className="rounded-xl px-4 py-3 text-sm flex items-start gap-2" style={{ backgroundColor: "#FFF7ED", color: "#9A3412" }}>
                    <CircleAlert size={16} className="shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div className="text-right mb-4">
                <h2 className="text-xl font-black text-navy">الخطوات التالية</h2>
              </div>
              <ol className="space-y-3 text-sm text-gray-600 leading-7">
                {report.nextSteps.map((item, index) => (
                  <li key={item} className="rounded-xl bg-gray-50 px-4 py-3">
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <button onClick={handleExecutivePdfExport} className="btn-primary">
            <Download size={16} />
            تصدير PDF التنفيذي
          </button>
          <button onClick={handlePartnershipPdfExport} className="btn-outline">
            <Download size={16} />
            تصدير PDF الشراكة
          </button>
          <Link href="/consulting/request" className="btn-gold">
            طلب استشارة جديدة
            <ArrowLeft size={16} />
          </Link>
          <Link href="/dashboard" className="btn-primary">العودة إلى لوحة التحكم</Link>
          <Link href="/lands" className="px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            متابعة الأراضي الموسمية
          </Link>
        </section>
      </div>
    </div>
  );
}