"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPinned, Sparkles, ShieldCheck, Users2 } from "lucide-react";
import { type ProjectPartner, useAppStore } from "@/store/appStore";
import { neighborhoodInsights } from "@/data/commercialInsights";
import { buildLocationSnapshot } from "@/lib/advisory";
import { getNeighborhoodSlugByName } from "@/data/neighborhoodTables";

const activityOptions = ["كافيه", "مطعم", "مخبز", "متجر", "عيادة", "مغسلة"];
const businessModels = ["صالة", "Drive-Thru", "Kiosk", "وجهة عائلية", "اقتصادي", "موسمي"];

export default function ConsultingRequestPage() {
  const router = useRouter();
  const { currentUser, partnerProfiles, submitAdvisoryRequest } = useAppStore();
  const [form, setForm] = useState({
    projectName: "",
    activityType: "كافيه",
    businessModel: "Drive-Thru",
    city: "حائل",
    neighborhood: neighborhoodInsights[0].neighborhood,
    exactLocation: "",
    frontageType: "رئيسي" as const,
    parkingAvailability: "متوسط" as const,
    nearbyCompetitors: 4,
    siteArea: 180,
    capital: 300000,
    setupCost: 120000,
    monthlyCosts: 35000,
    expectedMonthlyRent: 16000,
    teamSize: 6,
    launchMonths: 4,
    targetAudience: "",
    notes: "",
    wantsHumanReview: true,
  });
  const [isSharedProject, setIsSharedProject] = useState(false);
  const [partners, setPartners] = useState<Array<Pick<ProjectPartner, "profileId" | "name" | "role" | "contribution" | "equityShare" | "profitShare" | "responsibilities">>>([]);
  const [error, setError] = useState<string | null>(null);

  const selectedNeighborhood = neighborhoodInsights.find((item) => item.neighborhood === form.neighborhood);
  const neighborhoodSlug = getNeighborhoodSlugByName(form.neighborhood);

  useEffect(() => {
    const queryNeighborhood = new URLSearchParams(window.location.search).get("neighborhood");

    if (queryNeighborhood && neighborhoodInsights.some((item) => item.neighborhood === queryNeighborhood)) {
      setForm((current) => ({ ...current, neighborhood: queryNeighborhood }));
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!currentUser) {
      setError("يجب إنشاء حساب أو تسجيل الدخول أولاً قبل إرسال الطلب الاستشاري.");
      return;
    }

    const additionalPartners = partners
      .filter((partner) => partner.name.trim())
      .map((partner, index) => ({
        id: `DRAFT-PARTNER-${index + 1}`,
        profileId: partner.profileId,
        name: partner.name,
        role: partner.role,
        contribution: partner.contribution,
        equityShare: partner.equityShare,
        profitShare: partner.profitShare,
        responsibilities: partner.responsibilities,
        status: "invited" as const,
        approvalStatus: "pending_partner" as const,
        invitedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      }));
    const totalPartnerContribution = additionalPartners.reduce((sum, partner) => sum + partner.contribution, 0);
    const totalPartnerEquity = additionalPartners.reduce((sum, partner) => sum + partner.equityShare, 0);
    const totalPartnerProfit = additionalPartners.reduce((sum, partner) => sum + partner.profitShare, 0);
    const ownerPartner = currentUser ? {
      id: "OWNER-DRAFT",
      accountId: currentUser.id,
      profileId: partnerProfiles.find((profile) => profile.accountId === currentUser.id)?.id,
      email: currentUser.email,
      name: currentUser.fullName,
      role: "owner" as const,
      contribution: Math.max(form.capital - totalPartnerContribution, 0),
      equityShare: Math.max(100 - totalPartnerEquity, 0),
      profitShare: Math.max(100 - totalPartnerProfit, 0),
      responsibilities: "المالك الرئيسي وصاحب القرار الاستثماري النهائي.",
      status: "owner" as const,
      approvalStatus: "owner_approved" as const,
      invitedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      respondedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      approvalNote: "اعتماد تلقائي من المالك الرئيسي عند إنشاء الملف.",
    } : undefined;

    const requestId = submitAdvisoryRequest({
      ...form,
      locationSnapshot: buildLocationSnapshot(form),
      partners: isSharedProject && ownerPartner ? [ownerPartner, ...additionalPartners] : undefined,
    });
    router.push(`/consulting/report/${requestId}`);
  };

  const addPartnerRow = () => {
    if (partners.length >= 4) {
      return;
    }

    setPartners((current) => [
      ...current,
      {
        name: "",
        role: "investor",
        contribution: 0,
        equityShare: 0,
        profitShare: 0,
        responsibilities: "",
      },
    ]);
  };

  const updatePartner = (index: number, updates: Partial<(typeof partners)[number]>) => {
    setPartners((current) => current.map((partner, partnerIndex) => partnerIndex === index ? { ...partner, ...updates } : partner));
  };

  const removePartner = (index: number) => {
    setPartners((current) => current.filter((_, partnerIndex) => partnerIndex !== index));
  };

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#F8F9FB" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6 items-start">
        <div className="space-y-5 xl:sticky xl:top-24">
          <div className="rounded-[1.75rem] p-6 text-white" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 58%, #17355F 100%)" }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.14)", color: "#F5D88E" }}>
              <Sparkles size={15} />
              الطلب الاستشاري الذكي
            </span>
            <h1 className="text-3xl font-black leading-tight mb-3">أدخل مشروعك وسننتج لك تقرير قرار أولي</h1>
            <p className="text-white/75 leading-8 text-sm mb-5">
              هذا المسار مخصص للمشاريع الحرة غير المرتبطة بمنصة فرص. أدخل الموقع، نوع النشاط، والميزانية، وستحصل على تقرير أولي مع خيار مراجعة بشرية من الفريق.
            </p>
            <div className="space-y-3 text-sm">
              {[
                "تحليل موقع وملاءمة سوق",
                "تقدير مخاطر وتشبع ومنافسة",
                "قراءة مالية أولية وسيناريوهات",
                "اقتراح أفضل أحياء بديلة حسب النشاط",
              ].map((item) => (
                <div key={item} className="glass-panel rounded-xl px-4 py-3">{item}</div>
              ))}
            </div>
          </div>

          <div className="soft-card p-5 text-right">
            <div className="flex items-center justify-between mb-3">
              <ShieldCheck size={18} color="#0A2342" />
              <h2 className="font-black text-base text-navy">قراءة سريعة للحي المختار</h2>
            </div>
            <p className="text-sm text-gray-600 leading-7 mb-4">{selectedNeighborhood?.notes}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-gray-400 mb-1">الحركة</p>
                <p className="font-bold text-navy">{selectedNeighborhood?.footfall}%</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-gray-400 mb-1">المنافسة</p>
                <p className="font-bold text-navy">{selectedNeighborhood?.competition}%</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-gray-400 mb-1">الإيجار المرجعي</p>
                <p className="font-bold text-navy">{selectedNeighborhood?.averageRent.toLocaleString()} ريال</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-gray-400 mb-1">ملائم لـ</p>
                <p className="font-bold text-navy text-xs leading-6">{selectedNeighborhood?.suitableFor.slice(0, 2).join("، ")}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-gray-400 mb-1">الوصول</p>
                <p className="font-bold text-navy">{selectedNeighborhood?.accessibility}%</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-gray-400 mb-1">المواقف</p>
                <p className="font-bold text-navy">{selectedNeighborhood?.parkingEase}%</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">أبرز المنافسين / الفئات المسيطرة</p>
              <div className="flex flex-wrap gap-2">
                {selectedNeighborhood?.competitorCategories.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1 text-xs text-gray-600 border border-gray-200">{item}</span>
                ))}
              </div>
            </div>
            {neighborhoodSlug ? (
              <Link href={`/location-analysis/${neighborhoodSlug}`} className="btn-primary mt-4 text-sm px-5 py-3">
                افتح خريطة الحي وتحليله
                <ArrowLeft size={16} />
              </Link>
            ) : null}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-7">
          <div className="flex items-start justify-between gap-4">
            <div className="text-right">
              <h2 className="text-2xl font-black text-navy">نموذج طلب استشاري</h2>
              <p className="text-sm text-gray-500">المرحلة الأولى: تقرير أولي آلي مع إمكانية مراجعة بشرية</p>
            </div>
            {!currentUser ? (
              <Link href="/account" className="btn-outline text-sm px-4 py-2">إنشاء حساب أولاً</Link>
            ) : null}
          </div>

          {currentUser ? (
            <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700 text-right">
              الجلسة الحالية مفعّلة باسم {currentUser.fullName}. سيُربط الطلب بملفك الاستثماري مباشرة.
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700 text-right">
              لا توجد جلسة نشطة حالياً. يمكنك تعبئة النموذج، لكن الإرسال الفعلي يتطلب الدخول من [بوابة الحساب](/account).
            </div>
          )}

          {error ? (
            <div className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}>
              {error}
            </div>
          ) : null}

          <div>
            <h3 className="font-black text-base text-navy mb-4">بيانات المشروع</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">اسم المشروع</label>
                <input value={form.projectName} onChange={(event) => setForm({ ...form, projectName: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">نوع النشاط</label>
                <select value={form.activityType} onChange={(event) => setForm({ ...form, activityType: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  {activityOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">نموذج التشغيل</label>
                <select value={form.businessModel} onChange={(event) => setForm({ ...form, businessModel: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  {businessModels.map((option) => <option key={option}>{option}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">الجمهور المستهدف</label>
                <input value={form.targetAudience} onChange={(event) => setForm({ ...form, targetAudience: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" placeholder="طلاب، عائلات، موظفون..." required />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-black text-base text-navy mb-4">بيانات الموقع</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">المدينة</label>
                <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">الحي</label>
                <select value={form.neighborhood} onChange={(event) => setForm({ ...form, neighborhood: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  {neighborhoodInsights.map((item) => <option key={item.neighborhood}>{item.neighborhood}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-600 mb-2">الوصف الدقيق للموقع أو عنوانه</label>
                <div className="relative">
                  <MapPinned size={18} className="absolute right-4 top-3.5 text-gray-400" />
                  <input value={form.exactLocation} onChange={(event) => setForm({ ...form, exactLocation: event.target.value })} className="w-full border border-gray-200 rounded-xl pr-11 pl-4 py-3 text-sm focus:outline-none" placeholder="مثال: طريق الملك عبدالعزيز، زاوية تقاطع مع شارع خدمات" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">مساحة الموقع بالمتر</label>
                <input type="number" value={form.siteArea} onChange={(event) => setForm({ ...form, siteArea: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">مدة الإطلاق المتوقعة بالأشهر</label>
                <input type="number" value={form.launchMonths} onChange={(event) => setForm({ ...form, launchMonths: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">نوع الواجهة</label>
                <select value={form.frontageType} onChange={(event) => setForm({ ...form, frontageType: event.target.value as typeof form.frontageType })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  <option value="رئيسي">شارع رئيسي</option>
                  <option value="زاوية">زاوية / تقاطع</option>
                  <option value="داخلي">شارع داخلي</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">توفر المواقف</label>
                <select value={form.parkingAvailability} onChange={(event) => setForm({ ...form, parkingAvailability: event.target.value as typeof form.parkingAvailability })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  <option value="مرتفع">مرتفع</option>
                  <option value="متوسط">متوسط</option>
                  <option value="محدود">محدود</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">عدد المنافسين المباشرين القريبين</label>
                <input type="number" min={0} value={form.nearbyCompetitors} onChange={(event) => setForm({ ...form, nearbyCompetitors: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-black text-base text-navy mb-4">المدخلات المالية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">رأس المال المتاح</label>
                <input type="number" value={form.capital} onChange={(event) => setForm({ ...form, capital: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">تكلفة التأسيس</label>
                <input type="number" value={form.setupCost} onChange={(event) => setForm({ ...form, setupCost: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">المصاريف التشغيلية الشهرية</label>
                <input type="number" value={form.monthlyCosts} onChange={(event) => setForm({ ...form, monthlyCosts: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">الإيجار الشهري المتوقع</label>
                <input type="number" value={form.expectedMonthlyRent} onChange={(event) => setForm({ ...form, expectedMonthlyRent: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">عدد الفريق المتوقع</label>
                <input type="number" value={form.teamSize} onChange={(event) => setForm({ ...form, teamSize: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">ملاحظات إضافية أو وصف للمخطط</label>
            <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" placeholder="مثال: أفضّل واجهة 2 خطوط خدمة، مواقف مباشرة، تشغيل مسائي قوي..." />
          </div>

          <div className="rounded-[1.5rem] border border-gray-100 bg-gray-50 p-5">
            <div className="flex items-center justify-between mb-4 gap-4">
              <button type="button" onClick={addPartnerRow} className="btn-outline text-sm px-4 py-2" disabled={!isSharedProject || partners.length >= 4}>إضافة شريك</button>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <Users2 size={18} color="#0A2342" />
                  <h3 className="font-black text-base text-navy">هيكلة الشركاء داخل الطلب</h3>
                </div>
                <p className="text-sm text-gray-500">يمكنك رفع الطلب كمشروع مشترك، ثم توزيع المساهمة والملكية والأرباح بين الشركاء.</p>
              </div>
            </div>
            <label className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 cursor-pointer mb-4">
              <input type="checkbox" checked={isSharedProject} onChange={(event) => setIsSharedProject(event.target.checked)} className="mt-1" style={{ accentColor: "#0A2342" }} />
              <span className="text-sm text-gray-600 leading-7">هذا الطلب يمثل <strong>مشروعاً مشتركاً</strong> وليس ملفاً فردياً فقط. سيتم إظهار هيكل الشركاء ضمن التقرير النهائي.</span>
            </label>

            {isSharedProject ? (
              <div className="space-y-4">
                {partners.length === 0 ? (
                  <div className="rounded-xl bg-white px-4 py-4 text-sm text-gray-500 text-right">لا يوجد شركاء إضافيون بعد. سيُسجل مالك الطلب تلقائياً كشريك رئيسي.</div>
                ) : partners.map((partner, index) => (
                  <div key={`partner-${index}`} className="rounded-2xl border border-gray-100 bg-white p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <button type="button" onClick={() => removePartner(index)} className="text-sm text-red-500 hover:text-red-600">إزالة</button>
                      <p className="font-black text-navy">الشريك {index + 1}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">اسم الشريك</label>
                        <input value={partner.name} onChange={(event) => updatePartner(index, { name: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" placeholder="اسم الشريك أو الجهة" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">أو اختر من دليل الشركاء</label>
                        <select
                          value={partner.profileId ?? ""}
                          onChange={(event) => {
                            const profile = partnerProfiles.find((item) => item.id === event.target.value);
                            updatePartner(index, {
                              profileId: profile?.id,
                              name: profile?.displayName ?? partner.name,
                              role: (profile?.role as typeof partner.role | undefined) ?? partner.role,
                              responsibilities: profile ? `شريك ${profile.role} يضيف خبرة في ${profile.preferredSectors.join("، ")}.` : partner.responsibilities,
                            });
                          }}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                        >
                          <option value="">اختيار اختياري</option>
                          {partnerProfiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.displayName} - {profile.role}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">الدور</label>
                        <select value={partner.role} onChange={(event) => updatePartner(index, { role: event.target.value as typeof partner.role })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                          <option value="investor">مستثمر</option>
                          <option value="operator">مشغّل</option>
                          <option value="specialist">متخصص</option>
                          <option value="observer">مساهم غير تشغيلي</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">المساهمة المالية</label>
                        <input type="number" value={partner.contribution} onChange={(event) => updatePartner(index, { contribution: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">نسبة الملكية</label>
                        <input type="number" value={partner.equityShare} onChange={(event) => updatePartner(index, { equityShare: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">نسبة الأرباح</label>
                        <input type="number" value={partner.profitShare} onChange={(event) => updatePartner(index, { profitShare: Number(event.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">المسؤوليات أو القيمة المضافة</label>
                        <textarea value={partner.responsibilities} onChange={(event) => updatePartner(index, { responsibilities: event.target.value })} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 cursor-pointer">
            <input type="checkbox" checked={form.wantsHumanReview} onChange={(event) => setForm({ ...form, wantsHumanReview: event.target.checked })} className="mt-1" style={{ accentColor: "#0A2342" }} />
            <span className="text-sm text-gray-600 leading-7">
              أريد تفعيل <strong>المراجعة البشرية الاختيارية</strong> من الفريق بعد التقرير الآلي، لإضافة قراءة تشغيلية أكثر عمقًا على الموقع والنشاط.
            </span>
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-gold text-base px-6 py-3">
              إنشاء التقرير الأولي
              <ArrowLeft size={17} />
            </button>
            <Link href="/lands" className="btn-primary text-base px-6 py-3">العودة إلى الأراضي الموسمية</Link>
          </div>
        </form>
      </div>
    </div>
  );
}