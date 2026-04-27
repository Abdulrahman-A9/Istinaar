"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, BadgePercent, BriefcaseBusiness, FileText, Gavel, HandCoins, Landmark, Scale, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { getPartnerApprovalMeta, getPartnershipWorkflowMeta } from "@/lib/partnershipWorkflow";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function roundValue(value: number) {
  return Number.isFinite(value) ? Math.round(value * 10) / 10 : 0;
}

export default function PartnerComparisonPage() {
  const params = useParams<{ id: string }>();
  const getAdvisoryRequestById = useAppStore((state) => state.getAdvisoryRequestById);
  const request = getAdvisoryRequestById(params.id);

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F8F9FB" }}>
        <div className="card p-8 text-center max-w-lg">
          <p className="text-2xl font-black text-navy mb-3">صفحة المقارنة غير متاحة</p>
          <p className="text-gray-500 mb-5">تعذر العثور على ملف الاستشارة المرتبط بهذه المقارنة.</p>
          <Link href="/consulting/request" className="btn-primary">إنشاء طلب استشاري جديد</Link>
        </div>
      </div>
    );
  }

  const totalContribution = request.partners.reduce((sum, partner) => sum + partner.contribution, 0);
  const totalEquity = request.partners.reduce((sum, partner) => sum + partner.equityShare, 0);
  const totalProfit = request.partners.reduce((sum, partner) => sum + partner.profitShare, 0);
  const workflowMeta = getPartnershipWorkflowMeta(request.partnershipWorkflowStatus);

  const partnerComparisons = request.partners.map((partner) => {
    const contributionShare = totalContribution > 0 ? (partner.contribution / totalContribution) * 100 : 0;
    const equityDelta = roundValue(partner.equityShare - contributionShare);
    const profitDelta = roundValue(partner.profitShare - contributionShare);
    const alignmentGap = Math.max(Math.abs(equityDelta), Math.abs(profitDelta));
    const alignmentLabel = alignmentGap <= 5 ? "متوازن" : alignmentGap <= 12 ? "يحتاج توثيق" : "مرتفع الحساسية";
    const alignmentTone = alignmentGap <= 5 ? { tone: "#166534", surface: "#DCFCE7" } : alignmentGap <= 12 ? { tone: "#92400E", surface: "#FEF3C7" } : { tone: "#991B1B", surface: "#FEE2E2" };

    return {
      ...partner,
      contributionShare: roundValue(contributionShare),
      equityDelta,
      profitDelta,
      alignmentLabel,
      alignmentTone,
      signatureAuthority: partner.role === "owner" ? "صلاحية اعتماد نهائي" : partner.role === "operator" ? "صلاحية تشغيلية مشتركة" : "صلاحية موافقة على الشروط",
      legalFocus: partner.role === "owner"
        ? "تأكيد الصلاحية التمثيلية ومسؤولية التوقيع النهائي على العقد التشغيلي والالتزامات الحكومية."
        : partner.role === "investor"
          ? "توثيق مصدر المساهمة وجدول الضخ وآلية التخارج أو إعادة الهيكلة عند التعديل."
          : partner.role === "operator"
            ? "تحديد مسؤوليات التنفيذ ومؤشرات الأداء والتعويض عند الإخلال التشغيلي."
            : "تحديد نطاق الخدمة أو التخصص وآلية مراجعة القرارات الجوهرية دون تعارض أدوار.",
    };
  });

  const legalAlerts = [
    totalEquity !== 100 ? "إجمالي نسب الملكية لا يساوي 100٪، ويجب تعديل التوزيع قبل الاعتماد النهائي." : null,
    totalProfit !== 100 ? "إجمالي نسب الأرباح لا يساوي 100٪، ويجب إعادة موازنة توزيع الأرباح أو توثيق الاستثناء نظامياً." : null,
    request.partnershipWorkflowStatus !== "fully_approved" ? "حالة الشراكة ليست اعتماداً كاملاً بعد، لذلك لا يزال الملف في مرحلة مراجعة أو تفاوض." : null,
    ...partnerComparisons
      .filter((partner) => Math.max(Math.abs(partner.equityDelta), Math.abs(partner.profitDelta)) > 12)
      .map((partner) => `الشريك ${partner.name} لديه فرق مرتفع بين مساهمته الفعلية ونسب الملكية أو الأرباح، ويحتاج توثيقاً قانونياً واضحاً.`),
    ...partnerComparisons
      .filter((partner) => partner.approvalStatus === "changes_requested" || partner.approvalStatus === "rejected")
      .map((partner) => `الشريك ${partner.name} لم يمنح الاعتماد النهائي على الهيكلة الحالية.`),
  ].filter(Boolean) as string[];

  const governanceChecklist = [
    "توثيق آلية اتخاذ القرار في المسائل الجوهرية مثل زيادة رأس المال أو تغيير النشاط أو التخارج.",
    "إرفاق جدول مساهمات الشركاء ومواعيد الضخ المالي وربطها بحقوق التصويت والتوزيع.",
    "تحديد مسؤولية الإدارة التشغيلية اليومية وحدود الصلاحيات التعاقدية لكل طرف.",
    "اعتماد بند واضح لمعالجة طلبات التعديل أو الانسحاب أو الإخلال التشغيلي.",
  ];

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "linear-gradient(180deg, #F4F7FB 0%, #FFFFFF 100%)" }}>
      <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto space-y-6">
        <motion.section variants={fadeUp} className="rounded-[2rem] p-8 text-white overflow-hidden relative" style={{ background: "linear-gradient(135deg, #07192E 0%, #0A2342 58%, #173B67 100%)" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at top right, rgba(201,168,76,0.35), transparent 35%)" }} />
          <div className="relative flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="text-right max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#F5D88E" }}>
                <Scale size={16} />
                المقارنة القانونية والمالية للشركاء
              </span>
              <h1 className="text-4xl font-black leading-tight mb-3">مراجعة ما قبل الاعتماد النهائي</h1>
              <p className="text-white/75 leading-8 max-w-3xl">
                هذه الصفحة تجمع فروقات التمويل، نسب الملكية، توزيع الأرباح، الصلاحيات القانونية، وحالة الموافقات لكل شريك في ملف واحد مهيأ للمراجعة التنفيذية قبل تثبيت القرار النهائي.
              </p>
            </div>
            <div className="glass-panel rounded-[1.5rem] p-5 min-w-[280px] text-right">
              <p className="text-sm text-white/60 mb-2">حالة ملف الشراكة</p>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold mb-3" style={{ backgroundColor: workflowMeta.surface, color: workflowMeta.tone }}>
                {workflowMeta.label}
              </span>
              <p className="text-sm text-white/70 leading-7">المشروع: {request.projectName}</p>
              <p className="text-sm text-white/70 leading-7">الحي: {request.neighborhood}</p>
            </div>
          </div>
        </motion.section>

        <motion.section variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "إجمالي التمويل", value: `${totalContribution.toLocaleString()} ريال`, icon: <HandCoins size={18} /> },
            { label: "إجمالي الملكية", value: `${roundValue(totalEquity)}%`, icon: <BadgePercent size={18} /> },
            { label: "إجمالي الأرباح", value: `${roundValue(totalProfit)}%`, icon: <Landmark size={18} /> },
            { label: "جاهزية الحوكمة", value: legalAlerts.length === 0 ? "مكتملة" : `${legalAlerts.length} ملاحظة`, icon: <ShieldCheck size={18} /> },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(10,35,66,0.06)] text-right">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(10,35,66,0.08)", color: "#0A2342" }}>
                  {item.icon}
                </div>
                <p className="text-2xl font-black text-navy">{item.value}</p>
              </div>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </motion.section>

        <motion.section variants={fadeUp} className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="card p-6">
            <div className="text-right mb-5">
              <h2 className="text-2xl font-black text-navy">مقارنة مالية تفصيلية بين الشركاء</h2>
              <p className="text-sm text-gray-500">مقارنة مباشرة بين نسبة المساهمة الفعلية ونسب الملكية والأرباح لكل طرف</p>
            </div>
            <div className="space-y-4">
              {partnerComparisons.map((partner) => (
                <div key={partner.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-right">
                  {(() => {
                    const partnerMeta = getPartnerApprovalMeta(partner.approvalStatus);
                    return (
                      <>
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: partner.alignmentTone.surface, color: partner.alignmentTone.tone }}>
                        {partner.alignmentLabel}
                      </span>
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: partnerMeta.surface, color: partnerMeta.tone }}>
                        {partnerMeta.label}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-black text-navy">{partner.name}</p>
                      <p className="text-sm text-gray-500">{partner.role}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-gray-400 text-xs mb-1">المساهمة</p>
                      <p className="font-black text-navy">{partner.contribution.toLocaleString()} ريال</p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-gray-400 text-xs mb-1">حصة التمويل</p>
                      <p className="font-black text-navy">{partner.contributionShare}%</p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-gray-400 text-xs mb-1">فرق الملكية</p>
                      <p className="font-black text-navy">{partner.equityDelta > 0 ? "+" : ""}{partner.equityDelta}%</p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-gray-400 text-xs mb-1">فرق الأرباح</p>
                      <p className="font-black text-navy">{partner.profitDelta > 0 ? "+" : ""}{partner.profitDelta}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                    <div className="rounded-xl bg-white p-4 leading-7">
                      <p className="font-bold text-navy mb-1">المسؤوليات التنفيذية</p>
                      {partner.responsibilities}
                    </div>
                    <div className="rounded-xl bg-white p-4 leading-7">
                      <p className="font-bold text-navy mb-1">المحور القانوني الأهم</p>
                      {partner.legalFocus}
                    </div>
                  </div>
                      </>
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <div className="text-right mb-4">
                <h2 className="text-2xl font-black text-navy">مصفوفة الصلاحيات والاعتماد</h2>
                <p className="text-sm text-gray-500">مراجعة سريعة لسلطة كل طرف قبل الانتقال لاعتماد الشراكة</p>
              </div>
              <div className="space-y-3">
                {partnerComparisons.map((partner) => (
                  <div key={partner.id} className="rounded-xl bg-gray-50 p-4 text-right">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <Gavel size={18} color="#C9A84C" />
                      <p className="font-black text-navy">{partner.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{partner.signatureAuthority}</p>
                    <p className="text-xs text-gray-400">آخر استجابة: {partner.respondedAt ?? "بانتظار الرد"}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div className="text-right mb-4">
                <h2 className="text-2xl font-black text-navy">تنبيهات قانونية ومالية</h2>
                <p className="text-sm text-gray-500">أي بند هنا يجب حسمه قبل الاعتماد النهائي</p>
              </div>
              <div className="space-y-3">
                {legalAlerts.length > 0 ? legalAlerts.map((alert) => (
                  <div key={alert} className="rounded-xl px-4 py-3 text-sm flex items-start gap-2" style={{ backgroundColor: "#FFF7ED", color: "#9A3412" }}>
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <span>{alert}</span>
                  </div>
                )) : (
                  <div className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "#ECFDF5", color: "#166534" }}>
                    لا توجد فروقات حرجة حالياً، ويمكن الانتقال إلى الاعتماد النهائي بعد استكمال التوثيق التعاقدي.
                  </div>
                )}
              </div>
            </div>

            <div className="card p-6">
              <div className="text-right mb-4">
                <h2 className="text-2xl font-black text-navy">Checklist الحوكمة</h2>
                <p className="text-sm text-gray-500">عناصر التحقق التي يُستحسن تضمينها في اتفاقية الشراكة أو محضر الاعتماد</p>
              </div>
              <div className="space-y-3">
                {governanceChecklist.map((item) => (
                  <div key={item} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600 leading-7 flex items-start gap-3">
                    <FileText size={16} color="#C9A84C" className="shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={fadeUp} className="flex flex-wrap gap-3 justify-end">
          <Link href={`/consulting/report/${request.id}`} className="btn-primary">
            العودة إلى التقرير
            <ArrowLeft size={16} />
          </Link>
          <Link href="/dashboard" className="btn-outline">لوحة التحكم</Link>
        </motion.section>
      </motion.div>
    </div>
  );
}