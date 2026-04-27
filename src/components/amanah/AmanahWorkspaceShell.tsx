"use client";

import Link from "next/link";
import { ArrowUpLeft, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type AmanahNavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  isActive?: boolean;
  onSelect?: () => void;
};

type AmanahWorkspaceShellProps = {
  identityIcon: ReactNode;
  identityTitle: string;
  identitySubtitle: string;
  identityDescription: string;
  workspaceItems: AmanahNavItem[];
  sectionItems?: AmanahNavItem[];
  statusEyebrow: string;
  statusTitle: string;
  statusDescription: string;
  children: ReactNode;
};

function NavigationItem({ item }: { item: AmanahNavItem }) {
  const Icon = item.icon;
  const className = `flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-semibold w-full transition-all ${
    item.isActive ? "shadow-[0_14px_30px_rgba(201,168,76,0.16)]" : "text-white/68 hover:text-white hover:bg-white/6"
  }`;
  const style = item.isActive ? { backgroundColor: "#F2E6C7", color: "#07192E" } : {};

  if (item.href) {
    return (
      <Link href={item.href} className={className} style={style}>
        <Icon size={18} />
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={item.onSelect} className={className} style={style}>
      <Icon size={18} />
      <span>{item.label}</span>
    </button>
  );
}

export default function AmanahWorkspaceShell({
  identityIcon,
  identityTitle,
  identitySubtitle,
  identityDescription,
  workspaceItems,
  sectionItems = [],
  statusEyebrow,
  statusTitle,
  statusDescription,
  children,
}: AmanahWorkspaceShellProps) {
  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(180deg, #F5F7FB 0%, #EEF2F7 100%)" }}>
      <aside className="hidden md:flex w-72 shrink-0 flex-col p-5 border-l border-white/5" style={{ backgroundColor: "#07192E" }}>
        <div className="rounded-[1.75rem] p-5 mb-6 border border-white/10" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#C9A84C" }}>
              {identityIcon}
            </div>
            <div>
              <p className="text-white text-sm font-black leading-tight">{identityTitle}</p>
              <p className="text-white/45 text-xs mt-1">{identitySubtitle}</p>
              <p className="text-white/65 text-xs mt-3 leading-6">{identityDescription}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-auto">
          <section>
            <p className="text-[11px] font-bold tracking-wide text-white/35 text-right mb-3">المساحات الرئيسية</p>
            <nav className="space-y-2">
              {workspaceItems.map((item) => (
                <NavigationItem key={item.key} item={item} />
              ))}
            </nav>
          </section>

          {sectionItems.length > 0 ? (
            <section>
              <p className="text-[11px] font-bold tracking-wide text-white/35 text-right mb-3">أقسام الصفحة الحالية</p>
              <nav className="space-y-2">
                {sectionItems.map((item) => (
                  <NavigationItem key={item.key} item={item} />
                ))}
              </nav>
            </section>
          ) : null}
        </div>

        <div className="space-y-3 mt-6">
          <a href="https://foras.sa" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl text-sm font-bold border" style={{ borderColor: "rgba(201,168,76,0.45)", color: "#F2E6C7" }}>
            <ArrowUpLeft size={16} />
            منصة فرص السعودية
          </a>
          <div className="rounded-2xl px-4 py-4 text-right border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <p className="text-xs text-white/40 mb-1">{statusEyebrow}</p>
            <p className="text-sm font-bold text-white">{statusTitle}</p>
            <p className="text-xs text-white/50 mt-2 leading-6">{statusDescription}</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}