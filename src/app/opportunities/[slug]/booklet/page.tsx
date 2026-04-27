import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, BookOpenText, BriefcaseBusiness, CalendarRange, CircleCheckBig, FileText, Landmark, ShieldCheck } from "lucide-react";
import BookletChecklistTracker from "@/components/BookletChecklistTracker";
import { getOpportunityBySlug } from "@/data/opportunities";
import { getOpportunityBookletBySlug } from "@/data/opportunityBooklets";
import { getOpportunityExecutiveSnapshot } from "@/lib/opportunities";

const severityStyles = {
  high: { icon: AlertTriangle, bg: "#FFF4E8", color: "#B45309", border: "#F5C58B" },
  medium: { icon: ShieldCheck, bg: "#FDF6E4", color: "#8A6A14", border: "#E6CF8A" },
  info: { icon: CircleCheckBig, bg: "#EEF4FF", color: "#1D4ED8", border: "#B9CEF8" },
} as const;

export default async function OpportunityBookletPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const opportunity = getOpportunityBySlug(slug);
  const booklet = getOpportunityBookletBySlug(slug);

  if (!opportunity || !booklet) {
    notFound();
  }

  const executiveSnapshot = getOpportunityExecutiveSnapshot(opportunity);

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="px-4 py-12" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div className="text-right text-white">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.16)", color: "#F5D88E" }}>
              <BookOpenText size={16} />
              قارئ الكراسة الذكي
            </span>
            <h1 className="text-4xl font-black leading-tight mb-4">{opportunity.title}</h1>
            <p className="text-white/75 leading-8 mb-6 max-w-4xl mr-0 ml-auto">{booklet.executiveSummary}</p>
            <div className="rounded-[1.4rem] border p-5 text-right" style={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.14)" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "#F5D88E" }}>تنبيه مرجعي</p>
              <p className="text-sm text-white/80 leading-7">
                هذه الصفحة تقدم قراءة منظمة للكراسة دون إسقاط أي محور جوهري، لكن المرجع الرسمي النهائي يبقى كراسة المنافسة الأصلية المنشورة ضمن مسار الطرح الرسمي في فرص.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-end mt-6">
              <a href={opportunity.forasUrl} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm px-6 py-3">
                افتح الطرح في فرص
                <ArrowLeft size={16} />
              </a>
              <Link href={`/opportunities/${opportunity.slug}`} className="btn-outline text-sm px-6 py-3">العودة إلى ملف الفرصة</Link>
            </div>
          </div>

          <div className="glass-panel rounded-[1.6rem] p-6 text-right text-white">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "عدد صفحات الكراسة", value: `${booklet.pageCount} صفحة` },
                { label: "نوع المنافسة", value: booklet.competitionType },
                { label: "الضمان الابتدائي", value: booklet.initialGuarantee },
                { label: "آخر موعد", value: booklet.submissionDeadline },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-lg font-black leading-8">{item.value}</p>
                  <p className="text-sm text-white/65 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 md:p-7 shadow-[0_24px_60px_rgba(10,35,66,0.07)] text-right overflow-hidden relative">
            <div className="absolute inset-0 opacity-45" style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.14), transparent 28%), radial-gradient(circle at bottom left, rgba(10,35,66,0.05), transparent 32%)" }} />
            <div className="relative space-y-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="rounded-[1.15rem] px-4 py-3 text-sm font-black border" style={{ backgroundColor: executiveSnapshot.suitability.surface, color: executiveSnapshot.suitability.tone, borderColor: executiveSnapshot.suitability.tone + "22" }}>
                  {executiveSnapshot.suitability.symbol} {executiveSnapshot.suitability.label}
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-slate-400 mb-1">ملخص القرار التنفيذي</p>
                  <h2 className="text-2xl md:text-[1.75rem] font-black text-navy">قرار أولي بنظرة واحدة</h2>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 p-5 md:p-6" style={{ background: "linear-gradient(135deg, #FCFDFE 0%, #F7FAFD 100%)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-5 items-start">
                  <div className="rounded-[1.35rem] p-5" style={{ backgroundColor: executiveSnapshot.recommendation.surface }}>
                    <p className="text-xs font-bold tracking-wide mb-2" style={{ color: executiveSnapshot.recommendation.tone }}>التوصية الحالية</p>
                    <p className="text-2xl font-black mb-3" style={{ color: executiveSnapshot.recommendation.tone }}>{executiveSnapshot.recommendation.label}</p>
                    <p className="text-sm leading-8" style={{ color: executiveSnapshot.recommendation.tone }}>
                      {executiveSnapshot.recommendation.reason}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "هل الفرصة مناسبة؟", value: `${executiveSnapshot.suitability.symbol} ${executiveSnapshot.suitability.label}`, tone: executiveSnapshot.suitability.tone, surface: executiveSnapshot.suitability.surface },
                      { label: "مستوى المخاطرة", value: executiveSnapshot.risk.label, tone: executiveSnapshot.risk.tone, surface: executiveSnapshot.risk.surface },
                      { label: "رأس المال المتوقع", value: executiveSnapshot.expectedCapital, tone: "#0A2342", surface: "#F6F8FB" },
                      { label: "قرار الدخول", value: executiveSnapshot.recommendation.label, tone: executiveSnapshot.recommendation.tone, surface: executiveSnapshot.recommendation.surface },
                      { label: "العقبات المحتملة", value: executiveSnapshot.obstacles, tone: "#92400E", surface: "#FFF7E8", wide: true },
                    ].map((item) => (
                      <div key={item.label} className={`rounded-[1.25rem] border border-slate-200 p-4 ${item.wide ? "md:col-span-2" : ""}`} style={{ backgroundColor: item.surface }}>
                        <p className="text-[0.72rem] font-bold tracking-wide text-slate-500 mb-2">{item.label}</p>
                        <p className="text-sm md:text-[0.95rem] font-black leading-7" style={{ color: item.tone }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">قراءة الجاهزية للمستثمر</h2>
              <p className="text-sm text-gray-600 leading-8 mb-5">{booklet.readinessSummary}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl p-5" style={{ backgroundColor: "#F6F8FB" }}>
                  <p className="font-black text-navy mb-3">مناسبة غالباً لـ</p>
                  <div className="space-y-3">
                    {booklet.suitableFor.map((item) => (
                      <div key={item} className="flex items-start gap-2 justify-end text-sm text-gray-600">
                        <span>{item}</span>
                        <CircleCheckBig size={16} color="#16A34A" className="mt-1 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: "#FCF7EA" }}>
                  <p className="font-black text-navy mb-3">تحتاج انتباهاً إذا كنت</p>
                  <div className="space-y-3">
                    {booklet.cautionFor.map((item) => (
                      <div key={item} className="flex items-start gap-2 justify-end text-sm text-gray-600">
                        <span>{item}</span>
                        <AlertTriangle size={16} color="#B45309" className="mt-1 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">البيانات المرجعية السريعة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: FileText, label: "رقم المرجع", value: booklet.referenceCode },
                  { icon: CalendarRange, label: "تاريخ الإصدار", value: booklet.issueDate },
                  { icon: Landmark, label: "مدة العقد", value: booklet.contractDuration },
                  { icon: BriefcaseBusiness, label: "نافذة التشغيل", value: booklet.operationWindow },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-gray-100 p-4 bg-white">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <Icon size={18} color="#C9A84C" />
                        <p className="text-sm text-gray-500">{item.label}</p>
                      </div>
                      <p className="font-black text-navy leading-7">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card p-6 text-right">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
              <div className="flex flex-wrap gap-2 justify-end">
                {booklet.sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                    {section.title}
                  </a>
                ))}
              </div>
              <div>
                <h2 className="text-2xl font-black text-navy">تفكيك الكراسة إلى محاور مفهومة</h2>
                <p className="text-sm text-gray-500 mt-2">كل محور أدناه مرتبط بمدى صفحات واضح حتى يعرف المستثمر أين يعود للنص المرجعي الأصلي.</p>
              </div>
            </div>

            <div className="space-y-5">
              {booklet.sections.map((section) => (
                <div key={section.id} id={section.id} className="rounded-[1.4rem] border border-gray-100 p-5 bg-white scroll-mt-24">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "#EEF4FF", color: "#1D4ED8" }}>{section.pageRange}</span>
                    <div>
                      <h3 className="text-xl font-black text-navy">{section.title}</h3>
                      <p className="text-sm text-gray-600 leading-7 mt-2">{section.overview}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item) => (
                      <div key={`${section.id}-${item.label}`} className="rounded-2xl p-4" style={{ backgroundColor: "#F8FAFD" }}>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-xs font-semibold text-gray-400">{item.sourcePage}</span>
                          <p className="text-sm font-black text-navy">{item.label}</p>
                        </div>
                        <p className="text-sm text-gray-600 leading-7">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.02fr_0.98fr] gap-6">
            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">التنبيهات الحرجة قبل القرار</h2>
              <div className="space-y-4">
                {booklet.alerts.map((alert) => {
                  const style = severityStyles[alert.severity];
                  const Icon = style.icon;

                  return (
                    <div key={`${alert.title}-${alert.sourcePage}`} className="rounded-[1.25rem] border p-4" style={{ backgroundColor: style.bg, borderColor: style.border }}>
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-xs font-semibold" style={{ color: style.color }}>{alert.sourcePage}</span>
                        <div className="flex items-center gap-2">
                          <Icon size={16} color={style.color} />
                          <p className="font-black" style={{ color: style.color }}>{alert.title}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-7" style={{ color: style.color }}>{alert.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">خارطة الجاهزية العملية</h2>
              <BookletChecklistTracker bookletId={booklet.referenceCode} checklist={booklet.checklist} />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">قاموس المصطلحات</h2>
              <div className="space-y-4">
                {booklet.glossary.map((item) => (
                  <div key={item.term} className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm font-black text-navy mb-2">{item.term}</p>
                    <p className="text-sm text-gray-600 leading-7">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">أسئلة متكررة من المستثمر</h2>
              <div className="space-y-4 mb-6">
                {booklet.faq.map((item) => (
                  <div key={`${item.question}-${item.sourcePage}`} className="rounded-2xl border border-gray-100 p-4 bg-white">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-xs font-semibold text-gray-400">{item.sourcePage}</span>
                      <p className="font-black text-navy">{item.question}</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-7">{item.answer}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[1.4rem] p-5 text-white" style={{ background: "linear-gradient(135deg, #0A2342 0%, #143A6B 100%)" }}>
                <p className="font-black mb-2">المبدأ الحاكم لهذه القراءة</p>
                <p className="text-sm text-white/75 leading-7 mb-4">
                  لا يتم حذف أي محور جوهري من الكراسة، بل يعاد ترتيبه بطريقة أوضح للمستثمر، مع بقاء الكراسة الأصلية مرجعاً نهائياً عند أي اختلاف أو استفسار تفصيلي.
                </p>
                <div className="flex flex-wrap gap-3 justify-end">
                  <Link href="/apply-guide" className="btn-gold text-sm px-5 py-3">افتح دليل التقديم</Link>
                  <a href={opportunity.forasUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm px-5 py-3">انتقل إلى فرص</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}