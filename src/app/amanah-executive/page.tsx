"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, Building2, FileText, Landmark, LayoutDashboard, ShieldCheck, Sparkles } from "lucide-react";
import AmanahWorkspaceShell from "@/components/amanah/AmanahWorkspaceShell";
import {
  getAmanahDecisionWorkflow,
  getAmanahLeadershipBriefs,
  getAmanahPriorityAreas,
  getAmanahProposedOpportunities,
} from "@/lib/amanah";
import { useAppStore } from "@/store/appStore";

const executiveSections = [
  { key: "overview", label: "الملخص التنفيذي", icon: FileText },
  { key: "value", label: "قيمة الأمانة", icon: Landmark },
  { key: "decision", label: "لوحة القرار", icon: BarChart3 },
  { key: "governance", label: "الحوكمة والنطاق", icon: ShieldCheck },
] as const;

type ExecutiveSectionKey = typeof executiveSections[number]["key"];

export default function AmanahExecutivePage() {
  const currentUser = useAppStore((state) => state.currentUser);
  const [activeSection, setActiveSection] = useState<ExecutiveSectionKey>("overview");

  const leadershipBriefs = useMemo(() => getAmanahLeadershipBriefs(), []);
  const priorities = useMemo(() => getAmanahPriorityAreas(), []);
  const proposals = useMemo(() => getAmanahProposedOpportunities(), []);
  const workflow = useMemo(() => getAmanahDecisionWorkflow(), []);

  const workspaceItems = [
    { key: "admin", label: "إدارة الأمانة", icon: LayoutDashboard, href: "/admin" },
    { key: "portal", label: "بوابة الأمانة", icon: Landmark, href: "/amanah-portal" },
    { key: "executive-home", label: "العرض التنفيذي", icon: FileText, href: "/amanah-executive", isActive: true },
  ];

  const sectionItems = executiveSections.map((section) => ({
      key: section.key,
      label: section.label,
      icon: section.icon,
      isActive: activeSection === section.key,
      onSelect: () => setActiveSection(section.key),
    }));

  if (!currentUser || currentUser.role !== "authority") {
    return (
      <div className="min-h-screen px-4 py-14" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-6 items-start">
          <section className="rounded-[2rem] p-7 text-white" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 62%, #183B6B 100%)" }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6" style={{ backgroundColor: "rgba(201,168,76,0.14)", color: "#F5D88E" }}>
              <Building2 size={16} />
              العرض التنفيذي للأمانة
            </span>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">نسخة عرض مختصرة للقيادات وصناع القرار</h1>
            <p className="text-white/75 leading-8 max-w-2xl mr-0 ml-auto">
              تجمع هذه الصفحة الرسالة المؤسسية، قيمة الأمانة، أبرز الحالات الجاهزة، ومسار القرار دون التوسع في التفاصيل التشغيلية اليومية.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_rgba(10,35,66,0.08)] text-right">
            <p className="text-xs text-slate-400 mb-2">Executive Access</p>
            <h2 className="text-2xl font-black text-navy mb-3">افتح الصفحة من مساحة الأمانة</h2>
            <p className="text-sm text-gray-600 leading-8 mb-6">
              للوصول إلى هذه النسخة الرسمية من العرض، ادخل أولاً إلى بوابة الأمانة أو لوحة الإدارة باستخدام الحساب المخول.
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              <Link href="/amanah-portal" className="btn-gold">بوابة الأمانة</Link>
              <Link href="/admin" className="btn-outline">إدارة الأمانة</Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <AmanahWorkspaceShell
      identityIcon={<Building2 size={22} color="#07192E" />}
      identityTitle="العرض التنفيذي للأمانة"
      identitySubtitle="نسخة قيادية مختصرة"
      identityDescription="مسار عرض رسمي يركّز على قيمة الأمانة، أولويات القرار، وحدود الدور التحليلي للمشروع قبل المسارات النظامية."
      workspaceItems={workspaceItems}
      sectionItems={sectionItems}
      statusEyebrow="وضع العرض"
      statusTitle="جاهز للاجتماعات والعروض"
      statusDescription="هذه النسخة تبقي الحديث على مستوى القرار، وتفصل بين الدعم التحليلي وبين الأنظمة الحكومية الرسمية."
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="rounded-[2.15rem] p-6 md:p-8 text-white overflow-hidden relative border border-white/10" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 58%, #17355F 100%)" }}>
          <div className="absolute inset-0 opacity-35" style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.24), transparent 28%), radial-gradient(circle at bottom left, rgba(255,255,255,0.09), transparent 30%)" }} />
          <div className="relative grid grid-cols-1 xl:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
            <div className="text-right">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.14)", color: "#F5D88E" }}>
                <Landmark size={16} />
                صفحة عرض مخصصة للقيادات
              </span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">منصة دعم قرار استثماري تسبق الطرح الرسمي</h1>
              <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto mb-6">
                يقدّم استنار للأمانة طبقة تحليل وتهيئة قرار تساعد على تقييم الفرص، ترتيب الأولويات المكانية، وصياغة موجزات أوضح للقيادة قبل الإحالة إلى المسارات والأنظمة الحكومية الرسمية.
              </p>
              <div className="flex flex-wrap gap-3 justify-end">
                <Link href="/admin" className="btn-outline">افتح إدارة الأمانة</Link>
                <Link href="/amanah-portal" className="btn-gold">
                  افتح بوابة الأمانة
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "موجزات قرار", value: `${leadershipBriefs.length}` },
                { label: "حالات جارية", value: `${workflow.cases.length}` },
                { label: "أحياء ذات أولوية", value: `${priorities.length}` },
                { label: "فرص مقترحة", value: `${proposals.length}` },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.35rem] border border-white/10 p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-2xl md:text-3xl font-black" style={{ color: "#F5D88E" }}>{item.value}</p>
                  <p className="text-sm text-white/65 mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="md:hidden rounded-[1.85rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(10,35,66,0.06)]">
          <div className="flex flex-wrap gap-3 justify-end">
            {executiveSections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-colors"
                  style={active ? { backgroundColor: "#0A2342", color: "white" } : { backgroundColor: "#F4F7FB", color: "#526071" }}
                >
                  <Icon size={16} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </section>

        {activeSection === "overview" ? (
          <section className="grid grid-cols-1 xl:grid-cols-[1.02fr_0.98fr] gap-6">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">Executive Narrative</p>
              <h2 className="text-2xl font-black text-navy mb-4">الرسالة التنفيذية المقترحة للعرض</h2>
              <div className="space-y-4 text-sm text-gray-600 leading-8">
                <div className="rounded-[1.3rem] border border-slate-200 p-4 bg-slate-50">
                  <p className="font-black text-navy mb-2">أولاً: المنصة تخدم قرار الأمانة قبل أن تخدم السوق</p>
                  <p>من خلال رفع جودة الملفات الأولية، وتقليل الإحالات غير الناضجة، وتقديم صورة أوضح عن أولوية الأحياء والفرص قبل أي طرح أو إحالة نظامية.</p>
                </div>
                <div className="rounded-[1.3rem] border border-slate-200 p-4 bg-slate-50">
                  <p className="font-black text-navy mb-2">ثانياً: القيمة المباشرة قيمة قرارية وليست تنفيذية</p>
                  <p>المنصة لا تصدر موافقات ولا تدير تعاقدات أو اعتمادات، لكنها تختصر على الأمانة وقت القراءة الأولية، وتدعم توحيد الرؤية الداخلية قبل العرض على القيادة.</p>
                </div>
                <div className="rounded-[1.3rem] border border-slate-200 p-4 bg-slate-50">
                  <p className="font-black text-navy mb-2">ثالثاً: المخرج النهائي هو قرار أعلى جودة</p>
                  <p>النتيجة المستهدفة ليست زيادة عدد الشاشات أو المؤشرات، بل تمكين القيادة من رؤية ملفات أوضح، وسيناريوهات أكثر واقعية، وأولويات أكثر انضباطاً.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">Current Recommendation Pack</p>
              <h3 className="text-xl font-black text-navy mb-4">أبرز الموجزات التنفيذية الجاهزة</h3>
              <div className="space-y-4">
                {leadershipBriefs.map((brief) => (
                  <div key={brief.id} className="rounded-[1.35rem] border border-slate-200 p-4 bg-white">
                    <p className="text-xs text-slate-400 mb-1">{brief.title}</p>
                    <p className="font-black text-navy mb-2">{brief.angle}</p>
                    <p className="text-sm text-gray-600 leading-7 mb-3">{brief.summary}</p>
                    <div className="space-y-2">
                      {brief.indicators.map((indicator) => (
                        <div key={indicator} className="rounded-xl px-3 py-2 border border-slate-200 bg-slate-50 text-sm text-gray-600">{indicator}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {activeSection === "value" ? (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              {
                title: "رفع جودة الملفات قبل الإحالة",
                detail: "تقييم نضج الفرص قبل الإحالة يحد من انتقال ملفات غير مكتملة أو ضعيفة الصياغة إلى المستويات الأعلى.",
              },
              {
                title: "ترتيب الأولويات المكانية",
                detail: "إظهار الأحياء الأولى بالتركيز يعزز كفاءة التخطيط المكاني بدلاً من التعامل مع الفرص كحالات منفصلة غير مترابطة.",
              },
              {
                title: "اقتراح فرص جديدة",
                detail: "المولد الاستدلالي يساعد الأمانة على اكتشاف فرص جديدة أو إعادة صياغة فرص قائمة بناءً على مؤشرات محلية فعلية.",
              },
              {
                title: "موجزات أوضح للقيادة",
                detail: "تُختصر المؤشرات والقراءة في موجزات جاهزة للنقاش بما يحافظ على مستوى القرار دون إغراق في تفاصيل تشغيلية.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.55rem] border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(10,35,66,0.04)] text-right">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
                  <Landmark size={18} />
                </div>
                <p className="font-black text-navy mb-3">{item.title}</p>
                <p className="text-sm text-gray-600 leading-8">{item.detail}</p>
              </div>
            ))}
          </section>
        ) : null}

        {activeSection === "decision" ? (
          <section className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">Decision Board</p>
              <h2 className="text-2xl font-black text-navy mb-4">سيناريوهات عرض واقعية مرتبطة بحائل</h2>
              <div className="space-y-4">
                {workflow.cases.map((caseItem) => (
                  <div key={caseItem.id} className="rounded-[1.35rem] border border-slate-200 p-4 bg-slate-50">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: caseItem.stageTone + "16", color: caseItem.stageTone }}>{caseItem.stageLabel}</span>
                      <div>
                        <p className="font-black text-navy">{caseItem.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{caseItem.neighborhood} • {caseItem.anchorAsset}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center mb-3">
                      <div className="rounded-xl px-3 py-3 bg-white border border-slate-200">
                        <p className="text-xs text-slate-400 mb-1">الجاهزية</p>
                        <p className="text-lg font-black" style={{ color: caseItem.stageTone }}>{caseItem.readinessScore}%</p>
                      </div>
                      <div className="rounded-xl px-3 py-3 bg-white border border-slate-200">
                        <p className="text-xs text-slate-400 mb-1">المسؤول الحالي</p>
                        <p className="text-sm font-bold text-navy">{caseItem.owner}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-xl px-4 py-3 bg-white border border-slate-200 text-right">
                        <p className="text-xs text-slate-400 mb-1">الزاوية القرارّية</p>
                        <p className="text-sm text-gray-600 leading-7">{caseItem.decisionLens}</p>
                      </div>
                      <div className="rounded-xl px-4 py-3 bg-white border border-slate-200 text-right">
                        <p className="text-xs text-slate-400 mb-1">القيمة المباشرة للأمانة</p>
                        <p className="text-sm text-gray-600 leading-7">{caseItem.municipalityValue}</p>
                      </div>
                      <div className="rounded-xl px-4 py-3 bg-white border border-slate-200 text-right">
                        <p className="text-xs text-slate-400 mb-1">الإجراء التالي المقترح</p>
                        <p className="text-sm text-gray-600 leading-7">{caseItem.nextAction}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
                <p className="text-xs text-slate-400 mb-2">Priority Areas</p>
                <h3 className="text-xl font-black text-navy mb-4">أعلى الأحياء أولوية</h3>
                <div className="space-y-4">
                  {priorities.slice(0, 3).map((item) => (
                    <div key={item.neighborhood}>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <p className="text-sm font-bold text-navy">{item.neighborhood}</p>
                        <p className="text-xs text-slate-500">{item.statusLabel}</p>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: "#E9EEF5" }}>
                        <div className="h-3 rounded-full" style={{ width: `${item.priorityScore}%`, background: "linear-gradient(90deg, #0A2342 0%, #C9A84C 100%)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
                <p className="text-xs text-slate-400 mb-2">Generated Opportunities</p>
                <h3 className="text-xl font-black text-navy mb-4">فرص مقترحة قابلة للتحويل إلى دراسات أولية</h3>
                <div className="space-y-3">
                  {proposals.slice(0, 3).map((item) => (
                    <div key={item.id} className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4">
                      <p className="font-black text-navy mb-2">{item.title}</p>
                      <p className="text-sm text-gray-600 leading-7 mb-2">{item.expectedImpact}</p>
                      <p className="text-xs text-slate-500">الأصل المرجعي: {item.anchorAsset}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {activeSection === "governance" ? (
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">What The Platform Does</p>
              <h2 className="text-2xl font-black text-navy mb-4">ما الذي يقدمه استنار للأمانة؟</h2>
              <div className="space-y-3">
                {[
                  "تقييم أولي للفرص قبل الانتقال إلى المسارات الرسمية ذات العلاقة.",
                  "تحديد الأحياء والأنشطة الأكثر أولوية من زاوية قرارية ومكانية.",
                  "اقتراح فرص جديدة استناداً إلى فجوات الطلب والتشبع المحلي.",
                  "إعداد موجزات مختصرة تساعد القيادة على فهم الوضع واتخاذ توجيه أولي.",
                ].map((item) => (
                  <div key={item} className="rounded-xl px-4 py-3 border border-slate-200 bg-slate-50 text-sm text-gray-600 leading-7">{item}</div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">What The Platform Does Not Do</p>
              <h2 className="text-2xl font-black text-navy mb-4">ما الذي لا يدّعي استنار تنفيذه؟</h2>
              <div className="space-y-3">
                {[
                  "لا يصدر موافقات أو بدائل عن الأنظمة الحكومية الرسمية المعتمدة.",
                  "لا يدير العقود أو المنافسات أو الترسية أو الاعتماد المالي أو التعاقدي.",
                  "لا يحل محل بلدي أو فرص أو بوابات الموافقات الحكومية ذات الصلة.",
                  "لا ينفذ القرار النهائي، بل يرفع جودة القرار قبل الوصول إلى تلك المسارات.",
                ].map((item) => (
                  <div key={item} className="rounded-xl px-4 py-3 border border-slate-200 bg-slate-50 text-sm text-gray-600 leading-7">{item}</div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </AmanahWorkspaceShell>
  );
}