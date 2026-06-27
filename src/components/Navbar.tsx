"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, MapPin, Menu, X } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/lands", label: "الأراضي" },
  { href: "/opportunities", label: "الفرص" },
  { href: "/investor-journey", label: "رحلة المستثمر" },
  { href: "/consulting", label: "الاستشارات" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const alerts = useAppStore((state) => state.alerts);
  const currentUser = useAppStore((state) => state.currentUser);
  const unread = alerts.filter((alert) => !alert.read).length;
  const isAuthority = currentUser?.role === "authority";
  const primaryHref = isAuthority ? "/admin" : currentUser ? "/dashboard" : "/account";
  const primaryLabel = isAuthority ? "إدارة الأمانة" : currentUser ? "لوحة التحكم" : "ابدأ الآن";
  const accountLabel = isAuthority ? "الحساب" : currentUser ? currentUser.fullName.split(" ")[0] : "الحساب";

  return (
    <nav
      style={{ backgroundColor: "rgba(6,18,31,0.82)" }}
      className="sticky top-0 z-50 border-b border-white/10 shadow-[0_12px_40px_rgba(2,10,22,0.32)] backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-3 lg:gap-6">
          <div className="flex min-w-0 flex-1 items-center justify-start gap-2 sm:gap-3">
            <button
              className="rounded-xl p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href={currentUser ? "/dashboard" : "/account"} className="relative rounded-xl p-2 text-white transition-colors hover:bg-white/10 hover:text-[#D4B469]">
              <Bell size={20} />
              {currentUser && unread > 0 ? (
                <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unread}
                </span>
              ) : null}
            </Link>

            <Link
              href={primaryHref}
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold transition-colors md:block"
              style={{ backgroundColor: "#B6913E", color: "#0B1F33" }}
            >
              {primaryLabel}
            </Link>

            <Link
              href="/account"
              className="hidden rounded-xl border border-white/25 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 xl:block"
            >
              {accountLabel}
            </Link>
          </div>

          <div
            className="hidden shrink-0 items-center gap-1 rounded-2xl border border-white/10 px-2 py-1 lg:flex"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href ? "bg-white/10 text-[#D4B469]" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "#B6913E" }}>
              <MapPin size={16} color="#0B1F33" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-white">استنار | Istinaar</p>
              <p className="truncate text-xs leading-tight text-white/60">منصة الذكاء الاستثماري ودعم القرار</p>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 lg:hidden" style={{ backgroundColor: "rgba(6,18,31,0.94)" }}>
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${pathname === link.href ? "text-[#D4B469]" : "text-white/80"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href={primaryHref} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#D4B469]">
              {primaryLabel}
            </Link>
            <Link href="/account" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-white/70">
              الحساب
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
