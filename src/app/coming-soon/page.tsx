"use client";
import Link from "next/link";
import { ArrowLeft, Clock, Mail, Phone, Sparkles } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0A2342 0%, #1a3a6b 100%)" }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full border border-white/5 opacity-50" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full border border-white/5 opacity-50" />
      </div>
      
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(201,168,76,0.15)" }}>
              <Clock size={40} color="#C9A84C" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              قيد التطوير
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-2">
              هذه الخدمة ستكون متاحة قريباً
            </p>
            <p className="text-base text-white/60 max-w-2xl mx-auto leading-8">
              نعمل حالياً على تطوير هذه الميزة لتقديم أفضل تجربة ممكنة للمستثمرين والجهات الحكومية في منطقة حائل.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "تحليل متقدم",
                desc: "أدوات تحليلية متطورة لدراسة الجدوى والمخاطر",
                icon: <Sparkles size={24} color="#C9A84C" />
              },
              {
                title: "تقارير مفصلة",
                desc: "تقارير شاملة تشمل كافة جوانب الاستثمار",
                icon: <Mail size={24} color="#C9A84C" />
              },
              {
                title: "دعم فني",
                desc: "فريق متخصص لمساعدتك في اتخاذ القرار الاستثماري",
                icon: <Phone size={24} color="#C9A84C" />
              }
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 p-6 text-white" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(201,168,76,0.15)" }}>
                  {feature.icon}
                </div>
                <h3 className="font-black text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Link href="/" className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-lg">
              العودة للرئيسية
              <ArrowLeft size={20} />
            </Link>
            <div className="text-center">
              <p className="text-white/60 text-sm">
                للاستفسارات، تواصل معنا على: <span style={{ color: "#C9A84C" }}>amanah@hail.gov.sa</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
