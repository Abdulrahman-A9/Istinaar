"use client";
import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Handshake, Layers3, Sparkles, Users2 } from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function PartnershipsPage() {
  const currentUser = useAppStore((state) => state.currentUser);
  const partnerProfiles = useAppStore((state) => state.partnerProfiles);
  const partnershipRequests = useAppStore((state) => state.partnershipRequests);
  const createPartnershipRequest = useAppStore((state) => state.createPartnershipRequest);
  const respondToPartnershipRequest = useAppStore((state) => state.respondToPartnershipRequest);
  const upsertPartnerProfile = useAppStore((state) => state.upsertPartnerProfile);

  const [message, setMessage] = useState("نرغب في شريك يضيف قيمة تمويلية وتشغيلية ضمن مشروع منظم وتقرير استثماري واضح.");
  const [selectedPartnerId, setSelectedPartnerId] = useState(partnerProfiles[0]?.id ?? "");
  const [projectName, setProjectName] = useState("مشروع استثماري مشترك جديد");
  const [contribution, setContribution] = useState(150000);
  const [equity, setEquity] = useState(30);

  const myRequests = useMemo(() => partnershipRequests, [partnershipRequests]);

  const handleCreateProfile = (event: FormEvent) => {
    event.preventDefault();
    if (!currentUser) {
      return;
    }

    upsertPartnerProfile({
      accountId: currentUser.id,
      displayName: currentUser.fullName,
      role: "investor",
      city: currentUser.city,
      bio: "مستثمر يسعى إلى شراكات منضبطة ومبنية على قراءة جدوى ومخاطر واضحة.",
      investmentRange: "200,000 - 800,000 ريال",
      interests: ["كافيهات", "مطاعم", "فرص نمو"],
      expertise: ["تمويل", "مفاوضات", "تقييم مشاريع"],
      preferredSectors: ["الضيافة", "التجزئة"],
      completedProjects: 3,
      availability: "open",
      compatibilityScore: 90,
    });
  };

  const handleRequest = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedPartnerId) {
      return;
    }

    createPartnershipRequest({
      projectId: `PJT-${Date.now()}`,
      projectName,
      toPartnerId: selectedPartnerId,
      message,
      proposedContribution: contribution,
      proposedEquity: equity,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      <section className="px-4 py-14" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 60%, #17355F 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div className="text-right text-white">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#F5D88E" }}>
              <Sparkles size={16} />
              بوابة الشراكات الاستثمارية
            </span>
            <h1 className="text-4xl font-black leading-tight mb-4">ابنِ الشراكة قبل أن تبدأ المخاطرة</h1>
            <p className="text-white/75 leading-8 max-w-3xl mr-0 ml-auto">هذه البوابة تجعل الشراكة جزءاً من القرار نفسه: ملفات شركاء، طلبات ارتباط، واقتراح مساهمات ونسب قبل دمجها داخل الاستشارة الاستثمارية.</p>
          </div>
          <div className="glass-panel rounded-[1.6rem] p-6 text-right text-white">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "ملفات شركاء", value: partnerProfiles.length, icon: <Users2 size={18} /> },
                { label: "طلبات جارية", value: myRequests.filter((item) => item.status === "pending").length, icon: <Handshake size={18} /> },
                { label: "نماذج مشتركة", value: myRequests.filter((item) => item.status === "accepted").length, icon: <Layers3 size={18} /> },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <div className="mb-2">{item.icon}</div>
                  <p className="text-2xl font-black">{item.value}</p>
                  <p className="text-sm text-white/65 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6 items-start">
          <div className="space-y-6">
            <form onSubmit={handleCreateProfile} className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-3">تفعيل ملف الشريك</h2>
              <p className="text-sm text-gray-500 leading-7 mb-5">كل مستثمر أو مشغل يمكن أن يملك ملفاً يمكن دعوته لاحقاً إلى مشروع مشترك أو طلب استشاري متعدد الشركاء.</p>
              <button type="submit" className="btn-primary text-sm px-5 py-3">
                فعّل أو حدّث ملفي الشريكي
                <ArrowLeft size={16} />
              </button>
            </form>

            <form onSubmit={handleRequest} className="card p-6 text-right space-y-4">
              <h2 className="text-2xl font-black text-navy">إرسال طلب شراكة</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">اسم المشروع</label>
                <input value={projectName} onChange={(event) => setProjectName(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">الشريك المستهدف</label>
                <select value={selectedPartnerId} onChange={(event) => setSelectedPartnerId(event.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  {partnerProfiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.displayName} - {profile.role}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">المساهمة المقترحة</label>
                  <input type="number" value={contribution} onChange={(event) => setContribution(Number(event.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">نسبة الملكية المقترحة</label>
                  <input type="number" value={equity} onChange={(event) => setEquity(Number(event.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">رسالة الطلب</label>
                <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" />
              </div>
              <button type="submit" className="btn-gold text-sm px-5 py-3">
                إرسال الطلب
                <ArrowLeft size={16} />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">دليل الشركاء المحتملين</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partnerProfiles.map((profile) => (
                  <div key={profile.id} className="rounded-2xl border border-gray-100 p-5 bg-white">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "#EEF4FF", color: "#2563EB" }}>{profile.role}</span>
                      <div>
                        <p className="font-black text-navy">{profile.displayName}</p>
                        <p className="text-xs text-gray-400">{profile.city}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-7 mb-4">{profile.bio}</p>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><span className="font-semibold text-navy">النطاق:</span> {profile.investmentRange}</p>
                      <p><span className="font-semibold text-navy">الاهتمامات:</span> {profile.interests.join("، ")}</p>
                      <p><span className="font-semibold text-navy">الخبرات:</span> {profile.expertise.join("، ")}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">ملاءمة {profile.compatibilityScore}%</span>
                      <span className="text-navy font-bold">{profile.completedProjects} مشاريع</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 text-right">
              <h2 className="text-2xl font-black text-navy mb-4">طلبات الشراكة</h2>
              <div className="space-y-4">
                {myRequests.map((request) => (
                  <div key={request.id} className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: request.status === "accepted" ? "#DCFCE7" : request.status === "declined" ? "#FEE2E2" : "#FEF3C7", color: request.status === "accepted" ? "#166534" : request.status === "declined" ? "#B91C1C" : "#92400E" }}>
                        {request.status === "accepted" ? "مقبول" : request.status === "declined" ? "مرفوض" : "قيد الانتظار"}
                      </span>
                      <div>
                        <p className="font-black text-navy">{request.projectName}</p>
                        <p className="text-xs text-gray-400">{request.createdAt}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-7 mb-3">{request.message}</p>
                    <p className="text-sm text-gray-500 mb-3">المساهمة المقترحة: {request.proposedContribution.toLocaleString()} ريال • ملكية {request.proposedEquity}%</p>
                    {request.status === "pending" ? (
                      <div className="flex flex-wrap gap-3 justify-end">
                        <button onClick={() => respondToPartnershipRequest(request.id, "accepted")} className="btn-primary text-sm px-4 py-2">قبول</button>
                        <button onClick={() => respondToPartnershipRequest(request.id, "declined")} className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">رفض</button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}