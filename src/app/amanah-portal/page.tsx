"use client";
import { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, FileSearch, FileText, Landmark, LayoutDashboard, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import AmanahWorkspaceShell from "@/components/amanah/AmanahWorkspaceShell";
import { useAppStore } from "@/store/appStore";
import {
  getAmanahLeadershipBriefs,
  getAmanahOpportunityAssessments,
  getAmanahPriorityAreas,
  getAmanahProposedOpportunities,
  getAmanahRequirementBlueprints,
} from "@/lib/amanah";

const portalSections = [
  { key: "assessments", label: "تقييم الفرص", icon: FileSearch },
  { key: "generator", label: "مولد الفرص", icon: Sparkles },
  { key: "priorities", label: "مرصد الأولويات", icon: BarChart3 },
  { key: "requirements", label: "الجاهزية والاشتراطات", icon: ShieldCheck },
  { key: "briefs", label: "تقارير القيادات", icon: FileText },
] as const;

type PortalSectionKey = typeof portalSections[number]["key"];

export default function AmanahPortalPage() {
  const currentUser = useAppStore((state) => state.currentUser);
  const loginAccount = useAppStore((state) => state.loginAccount);
  const [activeSection, setActiveSection] = useState<PortalSectionKey>("assessments");
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const assessments = useMemo(() => getAmanahOpportunityAssessments(), []);
  const proposals = useMemo(() => getAmanahProposedOpportunities(), []);
  const priorities = useMemo(() => getAmanahPriorityAreas(), []);
  const blueprints = useMemo(() => getAmanahRequirementBlueprints(), []);
  const briefs = useMemo(() => getAmanahLeadershipBriefs(), []);

  const workspaceItems = [
    {
      key: "admin",
      label: "إدارة الأمانة",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      key: "portal-home",
      label: "بوابة الأمانة",
      icon: Landmark,
      href: "/amanah-portal",
      isActive: true,
    },
    {
      key: "executive",
      label: "العرض التنفيذي",
      icon: FileText,
      href: "/amanah-executive",
    },
  ];

  const sectionItems = portalSections.map((section) => ({
      key: section.key,
      label: section.label,
      icon: section.icon,
      isActive: activeSection === section.key,
      onSelect: () => setActiveSection(section.key),
    }));

  const selectedBlueprint = blueprints.find((item) => item.opportunityId === selectedBlueprintId) ?? blueprints[0];

  const handleAuthorityLogin = (event: FormEvent) => {
    event.preventDefault();
    const result = loginAccount(loginForm.email, loginForm.password);
    if (!result.ok) {
      setLoginMessage(result.message ?? "تعذر تسجيل الدخول");
      return;
    }

    setLoginMessage("تم تسجيل الدخول. إذا كان الحساب مخولاً ستظهر خدمات الأمانة مباشرة.");
  };

  if (!currentUser || currentUser.role !== "authority") {
    return (
      <div className="min-h-screen px-4 py-14" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-6 items-start">
          <section className="rounded-[2rem] p-7 text-white" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 62%, #183B6B 100%)" }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6" style={{ backgroundColor: "rgba(201,168,76,0.14)", color: "#F5D88E" }}>
              <Landmark size={16} />
              بوابة الأمانة
            </span>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">مركز القرار الاستثماري للجهة التنظيمية</h1>
            <p className="text-white/75 leading-8 max-w-2xl mr-0 ml-auto">
              هذه البوابة مخصصة للحسابات المخولة من الجهة التنظيمية، وتعرض خدمات تقييم الفرص، توليد المقترحات، ترتيب الأولويات، وتجهيز تقارير القرار قبل الانتقال إلى المسارات الرسمية.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_rgba(10,35,66,0.08)] text-right">
            <p className="text-xs text-slate-400 mb-2">Authority Access</p>
            <h2 className="text-2xl font-black text-navy mb-3">الدخول متاح للحسابات المخولة فقط</h2>
            <p className="text-sm text-gray-600 leading-8 mb-6">
              للوصول إلى هذه الخدمات يلزم تسجيل الدخول بحساب أمانة أو حساب مفوض لقراءة خدمات التقييم والقرار الداخلي.
            </p>
            {loginMessage ? (
              <div className="rounded-2xl px-4 py-3 mb-5 text-sm" style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}>
                {loginMessage}
              </div>
            ) : null}
            <form onSubmit={handleAuthorityLogin} className="space-y-4 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  placeholder="amanah@hail.gov.sa"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">كلمة المرور</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
              <button type="submit" className="btn-gold w-full justify-center py-3">
                دخول بوابة الأمانة
                <ArrowLeft size={16} />
              </button>
            </form>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-5">
              <p className="font-bold text-navy mb-2">حساب العرض الحالي</p>
              <p className="text-sm text-gray-600 leading-7">البريد: amanah@hail.gov.sa</p>
              <p className="text-sm text-gray-600 leading-7">المرور: 123456</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-end">
              <Link href="/account" className="btn-outline">
                افتح بوابة الحساب
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
      identityIcon={<Landmark size={22} color="#07192E" />}
      identityTitle="بوابة الأمانة"
      identitySubtitle="أمانة منطقة حائل"
      identityDescription="مسار مؤسسي لقراءة الفرص، ترتيب الأولويات، وتجهيز تقارير القرار قبل الرفع الرسمي."
      workspaceItems={workspaceItems}
      sectionItems={sectionItems}
      statusEyebrow="وضع القرار"
      statusTitle="تحليل وتوصية قبل الطرح"
      statusDescription="الأولوية الحالية موجهة لرفع جودة الفرص، ترتيب الأحياء، وتجهيز موجزات أوضح للقيادات."
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="rounded-[2.15rem] p-6 md:p-8 text-white overflow-hidden relative border border-white/10" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 58%, #17355F 100%)" }}>
          <div className="absolute inset-0 opacity-35" style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.24), transparent 28%), radial-gradient(circle at bottom left, rgba(255,255,255,0.09), transparent 30%)" }} />
          <div className="relative grid grid-cols-1 xl:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
            <div className="text-right">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.14)", color: "#F5D88E" }}>
                <Landmark size={16} />
                بوابة الأمانة | مركز القرار الاستثماري
              </span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">طبقة استدلالية مخصصة للجهة التنظيمية</h1>
              <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto mb-6">
                هذه البوابة لا تنفذ الإجراءات الرسمية ولا تستبدل المنصات الحكومية، بل ترفع جودة قرار الأمانة عبر تقييم الفرص قبل الطرح، اقتراح فرص جديدة، قراءة الجاهزية، وتجهيز تقارير قيادية أوضح.
              </p>
              <div className="flex flex-wrap gap-3 justify-end">
                <Link href="/admin" className="btn-outline">
                  افتح إدارة الأمانة
                </Link>
                <Link href="/" className="btn-gold">
                  العودة إلى الواجهة العامة
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "فرص مقيمة", value: `${assessments.length}` },
                { label: "فرص مقترحة", value: `${proposals.length}` },
                { label: "أحياء تحت الأولوية", value: `${priorities.length}` },
                { label: "موجزات قيادية", value: `${briefs.length}` },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.35rem] border border-white/10 p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-2xl md:text-3xl font-black" style={{ color: "#F5D88E" }}>{item.value}</p>
                  <p className="text-sm text-white/65 mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="md:hidden rounded-[1.85rem] border border-slate-200 bg-white p-4 md:p-5 shadow-[0_18px_50px_rgba(10,35,66,0.06)]">
          <div className="flex flex-wrap gap-3 justify-end">
            {portalSections.map((section) => {
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

        {activeSection === "assessments" ? (
          <section className="grid grid-cols-1 xl:grid-cols-[0.88fr_1.12fr] gap-6">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">Core Service 01</p>
              <h2 className="text-2xl font-black text-navy mb-3">مركز تقييم الفرص قبل الطرح</h2>
              <p className="text-sm text-gray-600 leading-8 mb-5">
                يقدّم قراءة داخلية للأمانة حول نضج الفرصة، وضوحها، مستوى المخاطر، ومدى جاهزيتها للانتقال إلى المرحلة الرسمية دون أن يقوم بأي اعتماد أو رفع تنفيذي.
              </p>
              <div className="space-y-3">
                {assessments.slice(0, 4).map((item) => (
                  <div key={item.id} className="rounded-[1.3rem] border border-slate-200 p-4" style={{ backgroundColor: "#F8FAFD" }}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: item.readinessTone + "16", color: item.readinessTone }}>{item.readinessLabel}</span>
                      <div>
                        <p className="font-black text-navy">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.neighborhood}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <p className="text-sm text-gray-500">درجة الجاهزية</p>
                      <p className="text-xl font-black" style={{ color: item.readinessTone }}>{item.readinessScore}%</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-7 mb-3">{item.recommendation}</p>
                    <div className="rounded-xl px-3 py-3 text-sm" style={{ backgroundColor: "white" }}>
                      <p className="font-bold text-navy mb-1">أهم نقطة معالجة</p>
                      <p className="text-gray-600 leading-7">{item.blockers[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right overflow-x-auto">
              <p className="text-xs text-slate-400 mb-2">Assessment Matrix</p>
              <h3 className="text-xl font-black text-navy mb-4">مصفوفة الجاهزية الحالية</h3>
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["العقبة الأوضح", "أولوية التوصية", "الجاهزية", "الحي", "الفرصة"].map((header) => (
                      <th key={header} className="text-right text-xs text-slate-400 font-bold pb-3">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 align-top">
                      <td className="py-4 text-gray-600 leading-7">{item.blockers[0]}</td>
                      <td className="py-4">
                        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: "#F4F7FB", color: "#0A2342" }}>{item.priorityLabel}</span>
                      </td>
                      <td className="py-4 font-black" style={{ color: item.readinessTone }}>{item.readinessScore}%</td>
                      <td className="py-4 text-gray-600">{item.neighborhood}</td>
                      <td className="py-4 font-bold text-navy">{item.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {activeSection === "generator" ? (
          <section className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
            <p className="text-xs text-slate-400 mb-2">Core Service 02</p>
            <h2 className="text-2xl font-black text-navy mb-3">مولد الفرص المقترحة</h2>
            <p className="text-sm text-gray-600 leading-8 mb-6">
              يحلل بيانات الأحياء والأصول الحالية ليقترح على الأمانة فرصاً جديدة أو بدائل طرح محتملة دون أن يعتبرها قرارات نهائية، بل كطبقة ذكاء أولي تساعد على بناء فرصة أوضح.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {proposals.map((item) => (
                <div key={item.id} className="rounded-[1.55rem] border border-slate-200 p-5 shadow-[0_14px_30px_rgba(10,35,66,0.04)]" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 100%)" }}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">{item.neighborhood}</p>
                      <h3 className="font-black text-navy leading-7">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-8 mb-4">{item.rationale}</p>
                  <div className="space-y-3 text-sm mb-4">
                    <div className="rounded-xl px-3 py-3 bg-white border border-slate-200">
                      <p className="text-slate-400 mb-1">الأصل المرجعي</p>
                      <p className="font-bold text-navy">{item.anchorAsset}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl px-3 py-3 bg-white border border-slate-200">
                        <p className="text-slate-400 mb-1">الطلب</p>
                        <p className="font-black" style={{ color: "#166534" }}>{item.demandScore}%</p>
                      </div>
                      <div className="rounded-xl px-3 py-3 bg-white border border-slate-200">
                        <p className="text-slate-400 mb-1">التشبع</p>
                        <p className="font-black" style={{ color: "#B45309" }}>{item.saturationScore}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl px-3 py-3" style={{ backgroundColor: "#F7FAFE" }}>
                    <p className="font-bold text-navy mb-1">قراءة أولية</p>
                    <p className="text-sm text-gray-600 leading-7">{item.expectedImpact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {activeSection === "priorities" ? (
          <section className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">Core Service 03</p>
              <h2 className="text-2xl font-black text-navy mb-3">مرصد الأولويات الاستثمارية</h2>
              <p className="text-sm text-gray-600 leading-8 mb-6">
                يوجه الأمانة نحو الأحياء والأنشطة الأولى بالتركيز، ويكشف أين توجد فرص جاهزة للطرح وأين يلزم التريث أو المعالجة قبل بناء فرص جديدة.
              </p>
              <div className="space-y-4">
                {priorities.map((item) => (
                  <div key={item.neighborhood} className="rounded-[1.35rem] border border-slate-200 p-4 bg-white">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>{item.statusLabel}</span>
                      <div>
                        <p className="font-black text-navy">{item.neighborhood}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.note}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: "الأولوية", value: item.priorityScore, tone: "#0A2342" },
                        { label: "الطلب", value: item.demandLevel, tone: "#166534" },
                        { label: "المنافسة", value: item.competitionLevel, tone: "#B45309" },
                      ].map((metric) => (
                        <div key={metric.label} className="rounded-xl px-3 py-3" style={{ backgroundColor: "#F8FAFD" }}>
                          <p className="text-lg font-black" style={{ color: metric.tone }}>{metric.value}%</p>
                          <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">Neighborhood Signal</p>
              <h3 className="text-xl font-black text-navy mb-4">قراءة مقارنة بين الأحياء</h3>
              <div className="space-y-5">
                {priorities.slice(0, 5).map((item) => (
                  <div key={item.neighborhood}>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <p className="text-sm font-bold text-navy">{item.neighborhood}</p>
                      <p className="text-xs text-slate-500">درجة موسمية {item.seasonalStrength}%</p>
                    </div>
                    <div className="w-full rounded-full h-3" style={{ backgroundColor: "#E9EEF5" }}>
                      <div className="h-3 rounded-full" style={{ width: `${item.priorityScore}%`, background: "linear-gradient(90deg, #0A2342 0%, #C9A84C 100%)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {activeSection === "requirements" ? (
          <section className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <p className="text-xs text-slate-400 mb-2">Core Service 04</p>
              <h2 className="text-2xl font-black text-navy mb-3">خريطة الجاهزية والاشتراطات</h2>
              <p className="text-sm text-gray-600 leading-8 mb-6">
                لا تنفذ الاشتراطات أو الموافقات داخل استنار، لكنها تفكك المسار المتوقع للأمانة وتوضح مصادر التعقيد والمتطلبات المحتملة قبل الرفع الرسمي.
              </p>
              <div className="space-y-3">
                {blueprints.map((item) => (
                  <button
                    key={item.opportunityId}
                    onClick={() => setSelectedBlueprintId(item.opportunityId)}
                    className="w-full rounded-[1.2rem] border px-4 py-4 text-right transition-colors"
                    style={selectedBlueprint?.opportunityId === item.opportunityId ? { borderColor: "#0A2342", backgroundColor: "#EEF4FF" } : { borderColor: "#E2E8F0", backgroundColor: "white" }}
                  >
                    <p className="font-black text-navy">{item.opportunityTitle}</p>
                    <p className="text-xs mt-1" style={{ color: item.complexityTone }}>{item.complexityLabel}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
              <div className="flex items-start justify-between gap-4 mb-5">
                <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: selectedBlueprint?.complexityTone + "16", color: selectedBlueprint?.complexityTone }}>
                  {selectedBlueprint?.complexityLabel}
                </span>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Readiness Blueprint</p>
                  <h3 className="text-xl font-black text-navy">{selectedBlueprint?.opportunityTitle}</h3>
                </div>
              </div>
              <div className="space-y-4">
                {selectedBlueprint?.steps.map((step) => (
                  <div key={step.title} className="rounded-[1.3rem] border border-slate-200 p-4" style={{ backgroundColor: "#F8FAFD" }}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: step.status === "واضح" ? "#ECFDF3" : step.status === "يتطلب تنسيقاً" ? "#FFF7E8" : "#EEF4FF", color: step.status === "واضح" ? "#166534" : step.status === "يتطلب تنسيقاً" ? "#B45309" : "#1D4ED8" }}>
                        {step.status}
                      </span>
                      <p className="font-black text-navy">{step.title}</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-8 mb-2">{step.detail}</p>
                    <p className="text-xs text-slate-400">المرجع الإرشادي: {step.source}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {activeSection === "briefs" ? (
          <section className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(10,35,66,0.06)] text-right">
            <p className="text-xs text-slate-400 mb-2">Core Service 05</p>
            <h2 className="text-2xl font-black text-navy mb-3">تقارير قرار للقيادات</h2>
            <p className="text-sm text-gray-600 leading-8 mb-6">
              موجزات تنفيذية جاهزة للعرض أمام القيادات، تختصر لماذا هذه الفرصة أو هذا الحي، وما التوصية الحالية، دون الحاجة إلى المرور على كل البيانات التشغيلية التفصيلية.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {briefs.map((brief) => (
                <div key={brief.id} className="rounded-[1.55rem] border border-slate-200 p-5" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 100%)" }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
                    <MapPinned size={18} />
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{brief.title}</p>
                  <h3 className="font-black text-navy leading-7 mb-3">{brief.angle}</h3>
                  <p className="text-sm text-gray-600 leading-8 mb-4">{brief.summary}</p>
                  <div className="space-y-2 mb-4">
                    {brief.indicators.map((indicator) => (
                      <div key={indicator} className="rounded-xl px-3 py-2 text-sm border border-slate-200 bg-white text-gray-600">{indicator}</div>
                    ))}
                  </div>
                  <div className="rounded-xl px-3 py-3" style={{ backgroundColor: "#F6F8FB" }}>
                    <p className="font-bold text-navy mb-1">التوصية</p>
                    <p className="text-sm text-gray-600 leading-7">{brief.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </AmanahWorkspaceShell>
  );
}