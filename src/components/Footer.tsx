import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A2342" }} className="text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#C9A84C" }}>
                <MapPin size={20} color="#0A2342" />
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">استنار | Istinaar</p>
                <p className="text-white/60 text-sm">منصة استدلالية لدعم القرار الاستثماري لأمانة منطقة حائل</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              منصة تحليل واستكشاف وتوجيه استثماري تربط بين الفرص، الأراضي، الشركاء، والتقارير الاستشارية قبل التقديم الرسمي عبر منصة فرص السعودية.
            </p>
            <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
              <MapPin size={14} />
              <span>أمانة منطقة حائل، المملكة العربية السعودية</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-4" style={{ color: "#C9A84C" }}>روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/opportunities", label: "الفرص الاستثمارية" },
                { href: "/lands", label: "الأراضي المتاحة" },
                { href: "/partnerships", label: "بوابة الشراكات" },
                { href: "/location-analysis", label: "تحليل المواقع" },
                { href: "/calculator", label: "حاسبة العائد" },
                { href: "/dashboard", label: "لوحة التحكم" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-4" style={{ color: "#C9A84C" }}>تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Phone size={14} />
                <span>920004150</span>
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Mail size={14} />
                <span>invest@hail.gov.sa</span>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-lg text-xs text-white/60 border border-white/10">
              <p className="font-semibold mb-1" style={{ color: "#C9A84C" }}>ملاحظة هامة</p>
              <p>هذه المنصة طبقة قرار وتحليل وشراكات. التقديم الرسمي والتنفيذ الإجرائي يتم عبر منصة <strong>فرص</strong> السعودية.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">© ٢٠٢٦ أمانة منطقة حائل. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <Link href="/how-it-works" className="text-white/50 hover:text-white text-sm transition-colors">عن المنصة</Link>
            <Link href="/apply-guide" className="text-white/50 hover:text-white text-sm transition-colors">دليل التقديم</Link>
            <Link href="/investor-journey" className="text-white/50 hover:text-white text-sm transition-colors">رحلة المستثمر</Link>
            <Link href="/consulting" className="text-white/50 hover:text-white text-sm transition-colors">الاستشارات</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
