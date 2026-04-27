"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, LoaderCircle, Upload } from "lucide-react";
import lands from "@/data/lands";
import { getLandPrimaryIcon } from "@/lib/landVisuals";

const activityOptions = ["مطعم", "كافيه", "مخيم", "سوق شعبي", "فعاليات ترفيهية", "مهرجان", "حرف يدوية", "متاجر متنوعة", "أخرى"];

export default function ApplyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const land = lands.find((l) => l.id === id);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", idNumber: "", phone: "", email: "",
    activityType: "", description: "", budget: 50000, terms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Redirect to Foras after 3 seconds
    setTimeout(() => {
      if (land?.forasLink) {
        window.open(land.forasLink, "_blank");
      }
    }, 3000);
  };

  if (!land) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">الأرض غير موجودة</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card p-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#dcfce7" }}>
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black mb-2" style={{ color: "#0A2342" }}>تم تسجيل طلبك</h2>
          <p className="text-gray-500 mb-4 leading-relaxed">
            تم استلام بيانات طلبك بنجاح. سيتم توجيهك الآن إلى منصة فرص السعودية لإتمام التقديم الرسمي.
          </p>
          <div className="p-3 rounded-xl text-sm text-white font-medium flex items-center gap-2 justify-center"
            style={{ backgroundColor: "#0A2342" }}>
            <LoaderCircle size={16} className="animate-spin" /> جارٍ التوجيه لمنصة فرص...
          </div>
          <a href={land.forasLink} target="_blank" rel="noopener noreferrer"
            className="btn-gold mt-4 w-full justify-center text-sm">
            انتقل الآن لمنصة فرص
            <ArrowLeft size={14} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FB" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#0A2342" }} className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link href={`/lands/${id}`} className="hover:text-white">تفاصيل الأرض</Link>
            <span>/</span>
            <span style={{ color: "#C9A84C" }}>تقديم الطلب</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-1">تقديم طلب الاستئجار</h1>
          <p className="text-white/60 text-sm">{land.name}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="card p-4 mb-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "اختيار الأرض" },
              { num: 2, label: "تعبئة الطلب" },
              { num: 3, label: "المراجعة والقبول" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${step >= s.num ? "text-white" : "text-gray-400 border-2 border-gray-200"}`}
                    style={step >= s.num ? { backgroundColor: "#0A2342" } : {}}>
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${step >= s.num ? "" : "text-gray-400"}`}
                    style={step >= s.num ? { color: "#0A2342" } : {}}>{s.label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 mx-3 ${step > s.num ? "" : "bg-gray-200"}`}
                  style={step > s.num ? { backgroundColor: "#0A2342" } : {}} />}
              </div>
            ))}
          </div>
        </div>

        {/* Land Summary */}
        <div className="card p-4 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white">
            {getLandPrimaryIcon(land, 26)}
          </div>
          <div className="flex-1">
            <p className="font-black text-sm" style={{ color: "#0A2342" }}>{land.name}</p>
            <p className="text-gray-500 text-xs">{land.neighborhood} • {land.season}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">أرض متاحة</p>
            <p className="font-black text-sm" style={{ color: "#C9A84C" }}>{land.price.toLocaleString()} ريال</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-6">
          <div>
            <h3 className="font-black text-base mb-4" style={{ color: "#0A2342" }}>
              <span className="ml-2" style={{ color: "#C9A84C" }}>|</span> المعلومات الشخصية
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-600">الاسم الكامل</label>
                <input required placeholder="أدخل اسمك الثلاثي" value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-600">رقم الهوية الوطنية</label>
                <input required placeholder="1XXXXXXXXX" value={form.idNumber}
                  onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-600">رقم الجوال</label>
                <input required placeholder="05XXXXXXXX" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-600">البريد الإلكتروني</label>
                <input required type="email" placeholder="example@mail.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-black text-base mb-4" style={{ color: "#0A2342" }}>
              <span className="ml-2" style={{ color: "#C9A84C" }}>|</span> تفاصيل المشروع
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-600">نوع النشاط التجاري</label>
                <select required value={form.activityType}
                  onChange={(e) => setForm({ ...form, activityType: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400">
                  <option value="">اختر نوع النشاط</option>
                  {activityOptions.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-600">وصف المشروع المقترح</label>
                <textarea required rows={4} placeholder="اشرح لنا فكرة مشروعك وكيف ستستغل الأرض..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-600">
                  الميزانية التقريبية: <span style={{ color: "#C9A84C" }} className="font-black">{form.budget.toLocaleString()} ريال</span>
                </label>
                <input type="range" min={5000} max={500000} step={5000} value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: +e.target.value })}
                  className="w-full" style={{ accentColor: "#C9A84C" }} />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>٥٠٠,٠٠٠+</span>
                  <span>٥,٠٠٠</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="font-black text-base mb-4" style={{ color: "#0A2342" }}>
              <span className="ml-2" style={{ color: "#C9A84C" }}>|</span> المرفقات والمستندات
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["الهوية الوطنية", "السجل التجاري"].map((doc) => (
                <div key={doc} className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-gray-300 transition-colors">
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-semibold text-gray-600">{doc}</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (حد أقصى 5MB)</p>
                </div>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
            <input type="checkbox" required id="terms" checked={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.checked })}
              className="mt-1 w-4 h-4" style={{ accentColor: "#0A2342" }} />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
              أقر بصحة جميع البيانات المدخلة والمرفقات، كما أوافق على{" "}
              <span className="font-bold" style={{ color: "#0A2342" }}>الشروط والأحكام</span> الخاصة بالاستئجار الموسمي في منطقة حائل.
            </label>
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-base justify-center">
            إرسال الطلب ← الانتقال لمنصة فرص
            <ArrowLeft size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
