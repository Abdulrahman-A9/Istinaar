"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  FileBadge2,
  LayoutDashboard,
  LogIn,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function AccountPage() {
  const { currentUser, registerAccount, loginAccount, loginAsDemoUser, logoutAccount } = useAppStore();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [message, setMessage] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    city: "حائل",
    password: "",
  });

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    const result = loginAccount(loginForm.email, loginForm.password);
    setMessage(result.ok ? "تم تسجيل الدخول بنجاح" : result.message ?? "تعذر تسجيل الدخول");
  };

  const handleRegister = (event: FormEvent) => {
    event.preventDefault();
    registerAccount(registerForm);
    setMessage("تم إنشاء الحساب بنجاح ويمكنك الآن تشغيل ملفك الاستثماري.");
  };

  const handleDemoAccess = () => {
    loginAsDemoUser();
    setMode("login");
    setMessage("تم فتح الحساب التجريبي. يمكنك الآن استعراض اللوحة أو بدء طلب استشاري.");
  };

  const roleLabel = currentUser?.role === "authority" ? "مسؤول أمانة" : currentUser?.role === "consultant" ? "مستشار" : "مستثمر";
  const primaryWorkspaceHref = currentUser?.role === "authority" ? "/investment-intelligence" : "/dashboard";
  const primaryWorkspaceLabel = currentUser?.role === "authority" ? "افتح مركز الإدارة" : "افتح لوحة المستثمر";

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6 items-start">
        <section className="rounded-[2rem] p-7 text-white overflow-hidden relative" style={{ background: "linear-gradient(135deg, #061629 0%, #0A2342 62%, #183B6B 100%)" }}>
          <div className="absolute inset-0 opacity-35" style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.2), transparent 32%), radial-gradient(circle at bottom left, rgba(255,255,255,0.08), transparent 25%)" }} />
          <div className="relative text-right">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6" style={{ backgroundColor: "rgba(201,168,76,0.14)", color: "#F5D88E" }}>
              <ShieldCheck size={16} />
              بوابة التشغيل الموحّدة
            </span>
            <h1 className="text-4xl font-black leading-tight mb-4">دخول رسمي إلى مسارات الاستثمار والقرار</h1>
            <p className="text-white/75 leading-8 mb-8 max-w-2xl mr-0 ml-auto">
              الصفحة أصبحت نقطة تشغيل واضحة للحسابات الاستثمارية وحسابات الأمانة، مع انتقال منظم إلى اللوحة المناسبة لكل دور دون تعقيد أو تداخل مع المسارات الرسمية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { title: "ملف موحد بحسب الدور", desc: "تجميع الطلبات، المحفوظات، والتنبيهات أو خدمات القرار المؤسسي داخل حساب واحد." },
                { title: "جاهزية تشغيلية", desc: "انتقال مباشر بين الحساب، المسار الاستثماري، ومركز الإدارة دون تشتت." },
                { title: "دخول تجريبي منضبط", desc: "إمكانية الدخول إلى المسارات الداخلية بسرعة دون كسر المسار الرسمي." },
                { title: "توافق بصري كامل", desc: "هيكل واضح للمستثمر والجهة التنظيمية ضمن لغة مؤسسية موحدة." },
              ].map((item) => (
                <div key={item.title} className="glass-panel rounded-2xl p-4">
                  <p className="font-black text-base mb-2">{item.title}</p>
                  <p className="text-sm text-white/70 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "وصول سريع", value: "حساب" },
                { label: "مسار المستثمر", value: "اللوحة" },
                { label: "مسار الأمانة", value: "البوابة" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-lg font-black" style={{ color: "#F5D88E" }}>{item.value}</p>
                  <p className="text-xs text-white/60 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_22px_60px_rgba(10,35,66,0.08)]">
          <div className="flex items-center justify-between gap-4 mb-6">
            {!currentUser ? <div className="flex gap-2">
              <button
                onClick={() => setMode("register")}
                className="px-4 py-2 rounded-xl text-sm font-bold"
                style={mode === "register" ? { backgroundColor: "#0A2342", color: "white" } : { backgroundColor: "#F3F6FB", color: "#526071" }}>
                إنشاء حساب
              </button>
              <button
                onClick={() => setMode("login")}
                className="px-4 py-2 rounded-xl text-sm font-bold"
                style={mode === "login" ? { backgroundColor: "#0A2342", color: "white" } : { backgroundColor: "#F3F6FB", color: "#526071" }}>
                دخول
              </button>
            </div> : <div />}
            <div className="text-right">
              <p className="text-xs text-slate-400 mb-1">Account Access</p>
              <h2 className="text-2xl font-black text-navy">{currentUser ? "ملفك الحالي" : "ابدأ من بوابة واضحة"}</h2>
            </div>
          </div>

          {message ? (
            <div className="rounded-2xl px-4 py-3 mb-5 text-sm" style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}>
              {message}
            </div>
          ) : null}

          {currentUser ? (
            <div className="space-y-5">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-right">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
                    <UserRound size={26} />
                  </div>
                  <div>
                    <p className="font-black text-xl text-navy">{currentUser.fullName}</p>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-xl bg-white p-4 border border-slate-200">
                    <p className="text-gray-400 mb-1">الجوال</p>
                    <p className="font-bold text-navy">{currentUser.phone}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-slate-200">
                    <p className="text-gray-400 mb-1">المدينة</p>
                    <p className="font-bold text-navy">{currentUser.city}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-slate-200">
                    <p className="text-gray-400 mb-1">الجهة</p>
                    <p className="font-bold text-navy">{currentUser.company || "مستثمر فردي"}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-slate-200">
                    <p className="text-gray-400 mb-1">الدور</p>
                    <p className="font-bold text-navy">{roleLabel}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  currentUser.role === "authority"
                    ? { title: "مركز الإدارة", desc: "الدخول إلى التحليل، الاستدلال، الجهات التنظيمية، والتقارير التنفيذية داخل منصة واحدة.", href: "/investment-intelligence", icon: <LayoutDashboard size={18} /> }
                    : { title: "لوحة المستثمر", desc: "متابعة الطلبات والاستشارات والتنبيهات التنفيذية.", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
                  currentUser.role === "authority"
                    ? { title: "الفرص الاستثمارية", desc: "مراجعة الفرص الحالية وربطها بمسار التقييم الداخلي قبل الطرح.", href: "/opportunities", icon: <FileBadge2 size={18} /> }
                    : { title: "طلب استشاري", desc: "بدء ملف مشروع جديد ورفع البيانات التشغيلية والمالية.", href: "/consulting/request", icon: <FileBadge2 size={18} /> },
                  currentUser.role === "authority"
                    ? { title: "الأراضي المتاحة", desc: "الرجوع إلى الأصول والمواقع التي يمكن أن تشكل فرصاً مقترحة للأمانة.", href: "/lands", icon: <Building2 size={18} /> }
                    : { title: "الأراضي المتاحة", desc: "العودة إلى الفرص الموسمية من نفس الملف الاستثماري.", href: "/lands", icon: <Building2 size={18} /> },
                ].map((item) => (
                  <Link key={item.title} href={item.href} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_14px_30px_rgba(10,35,66,0.05)] text-right hover:-translate-y-0.5 transition-transform">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
                      {item.icon}
                    </div>
                    <p className="font-black text-navy mb-2">{item.title}</p>
                    <p className="text-sm text-gray-500 leading-7">{item.desc}</p>
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
                <Link href={primaryWorkspaceHref} className="btn-primary">{primaryWorkspaceLabel}</Link>
                {currentUser.role === "authority" ? <Link href="/opportunities" className="btn-gold">راجع الفرص الحالية</Link> : <Link href="/consulting/request" className="btn-gold">ابدأ طلب استشاري</Link>}
                <button onClick={logoutAccount} className="px-5 py-3 rounded-xl border text-sm font-semibold text-gray-600 border-gray-200 hover:bg-gray-50">
                  تسجيل خروج
                </button>
              </div>
            </div>
          ) : mode === "login" ? (
            <div className="space-y-5">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-right">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
                    <LogIn size={18} />
                  </div>
                  <div>
                    <p className="font-black text-navy">مسار دخول واضح</p>
                    <p className="text-sm text-gray-500">ادخل إلى الملف الحالي أو فعّل الحساب التجريبي للاستعراض الداخلي.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  {[
                    "تسجيل دخول بالحساب الحالي",
                    "تشغيل حساب تجريبي عند العرض",
                    "انتقال مباشر إلى اللوحة بعد الدخول",
                  ].map((item) => (
                    <div key={item} className="rounded-xl bg-white px-4 py-3 border border-slate-200 text-gray-600">{item}</div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-start">
                <form onSubmit={handleLogin} className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-5">
                  <div className="text-right mb-2">
                    <p className="text-xs text-slate-400 mb-1">Secure Sign-In</p>
                    <h3 className="font-black text-lg text-navy">الدخول إلى الملف الاستثماري</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">البريد الإلكتروني</label>
                    <input value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">كلمة المرور</label>
                    <input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-3">
                    <LogIn size={16} />
                    دخول
                  </button>
                </form>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-right">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "#FFF7E1", color: "#C2891B" }}>
                    <Sparkles size={18} />
                  </div>
                  <p className="font-black text-navy mb-2">حسابات تجريبية</p>
                  <p className="text-sm text-gray-500 leading-7 mb-4">استخدمها لاختبار مسار الطلبات والموافقات دون إنشاء حساب جديد.</p>
                  <div className="space-y-3 text-sm mb-4">
                    <div className="rounded-xl bg-white p-3 border border-slate-200">
                      <p>البريد: abdulrahman@hailinvest.sa</p>
                      <p>المرور: 123456</p>
                    </div>
                    <div className="rounded-xl bg-white p-3 border border-slate-200">
                      <p className="font-semibold text-navy mb-1">حساب شريك</p>
                      <p>البريد: operator@hailinvest.sa</p>
                      <p>المرور: 123456</p>
                    </div>
                    <div className="rounded-xl bg-white p-3 border border-slate-200">
                      <p className="font-semibold text-navy mb-1">حساب الأمانة</p>
                      <p>البريد: amanah@hail.gov.sa</p>
                      <p>المرور: 123456</p>
                    </div>
                  </div>
                  <button onClick={handleDemoAccess} className="btn-gold w-full justify-center py-3">فتح الحساب التجريبي</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-right">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EEF4FF", color: "#0A2342" }}>
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="font-black text-navy">مسار onboarding رسمي</p>
                    <p className="text-sm text-gray-500">ثلاث خطوات فقط لفتح الملف والانتقال إلى المسار التنفيذي.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  {[
                    { title: "إنشاء الحساب", desc: "بناء ملف استثماري باسمك أو باسم الجهة." },
                    { title: "تفعيل الجلسة", desc: "فتح مباشر للجلسة بعد التسجيل دون تعقيد إضافي." },
                    { title: "بدء التشغيل", desc: "الانتقال إلى اللوحة أو المسار الاستشاري فوراً." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl bg-white p-4 border border-slate-200">
                      <p className="font-bold text-navy mb-1">{item.title}</p>
                      <p className="text-gray-500 leading-7">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">الاسم الكامل</label>
                  <input value={registerForm.fullName} onChange={(event) => setRegisterForm({ ...registerForm, fullName: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">البريد الإلكتروني</label>
                  <input type="email" value={registerForm.email} onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">رقم الجوال</label>
                  <input value={registerForm.phone} onChange={(event) => setRegisterForm({ ...registerForm, phone: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">الشركة أو الصفة</label>
                  <input value={registerForm.company} onChange={(event) => setRegisterForm({ ...registerForm, company: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">المدينة</label>
                  <input value={registerForm.city} onChange={(event) => setRegisterForm({ ...registerForm, city: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">كلمة المرور</label>
                  <input type="password" value={registerForm.password} onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none" required />
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-3 justify-end">
                  <Link href="/consulting" className="btn-primary px-6 py-3">
                    استعرض المسار الاستشاري أولاً
                    <ArrowLeft size={16} />
                  </Link>
                  <button type="submit" className="btn-gold justify-center py-3 px-6">إنشاء الحساب وبدء الاستخدام</button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
