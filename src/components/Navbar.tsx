"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Menu, X, MapPin } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/lands", label: "الأراضي" },
  { href: "/opportunities", label: "الفرص" },
  { href: "/amanah-portal", label: "بوابة الأمانة" },
  { href: "/investor-journey", label: "رحلة المستثمر" },
  { href: "/consulting", label: "الاستشارات" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const alerts = useAppStore((s) => s.alerts);
  const currentUser = useAppStore((s) => s.currentUser);
  const unread = alerts.filter((a) => !a.read).length;
  const isAuthority = currentUser?.role === "authority";
  const primaryHref = isAuthority ? "/admin" : currentUser ? "/dashboard" : "/account";
  const primaryLabel = isAuthority ? "إدارة الأمانة" : currentUser ? "لوحة التحكم" : "ابدأ الآن";
  const visibleNavLinks = isAuthority ? navLinks.filter((link) => link.href !== "/amanah-portal") : navLinks;
  const accountLabel = isAuthority ? "الحساب" : currentUser ? currentUser.fullName.split(" ")[0] : "الحساب";

  return (
    <nav style={{ backgroundColor: "rgba(10,35,66,0.72)" }} className="sticky top-0 z-50 border-b border-white/10 shadow-[0_12px_40px_rgba(10,35,66,0.18)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Auth buttons */}
          <div className="flex items-center gap-3">
            <Link href={currentUser ? "/dashboard" : "/account"} className="relative p-2 text-white hover:text-yellow-400 transition-colors">
              <Bell size={20} />
              {currentUser && unread > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                  {unread}
                </span>
              )}
            </Link>
            <Link href={primaryHref}
              className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#C9A84C", color: "#0A2342" }}>
              {primaryLabel}
            </Link>
            <Link href="/account"
              className="hidden sm:block text-sm font-medium px-3 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors">
              {accountLabel}
            </Link>
          </div>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-1 rounded-2xl border border-white/10 px-2 py-1" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
            {visibleNavLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-yellow-400 bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#C9A84C" }}>
              <MapPin size={16} color="#0A2342" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">استنار | Istinaar</p>
              <p className="text-white/60 text-xs leading-tight">منصة استدلالية لدعم القرار الاستثماري</p>
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10" style={{ backgroundColor: "rgba(10,35,66,0.92)" }}>
          <div className="px-4 py-3 space-y-1">
            {visibleNavLinks.map((link) => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === link.href ? "text-yellow-400" : "text-white/80"
                }`}>
                {link.label}
              </Link>
            ))}
            <Link href={primaryHref} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-yellow-400">
              {primaryLabel}
            </Link>
            <Link href="/account" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-white/70">
              الحساب
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
