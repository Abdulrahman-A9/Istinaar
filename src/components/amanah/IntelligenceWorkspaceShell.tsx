"use client";

import Link from "next/link";
import { ArrowUpLeft, ChevronLeft, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ShellNavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  isActive?: boolean;
  onSelect?: () => void;
  badge?: string;
};

type ShellFilter = {
  label: string;
  value: string;
};

type IntelligenceWorkspaceShellProps = {
  title: string;
  subtitle: string;
  description: string;
  eyebrow: string;
  commandLabel: string;
  commandValue: string;
  statusTitle: string;
  statusDescription: string;
  statusBadge: string;
  workspaceItems: ShellNavItem[];
  moduleItems: ShellNavItem[];
  filters: ShellFilter[];
  actionArea?: ReactNode;
  children: ReactNode;
};

function ShellNavLink({ item }: { item: ShellNavItem }) {
  const Icon = item.icon;
  const className = `nav-chip group flex w-full items-center justify-between gap-3 rounded-[1.15rem] px-4 py-3 font-['IBM_Plex_Sans_Arabic'] text-sm font-semibold transition-all ${
    item.isActive ? "shadow-[0_16px_32px_rgba(182,145,62,0.18)]" : "text-white/72 hover:bg-white/6 hover:text-white"
  }`;
  const style = item.isActive ? { backgroundColor: "#E9DFC8", color: "#0B1F33" } : {};
  const iconClassName = item.isActive
    ? "border-[#B6913E]/20 bg-[#0B1F33]/6"
    : "border-white/10 bg-white/4 group-hover:border-white/15";

  const content = (
    <>
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${iconClassName}`}>
          <Icon size={17} />
        </span>
        <span>{item.label}</span>
      </div>
      {item.badge ? (
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-bold">
          {item.badge}
        </span>
      ) : null}
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={item.onSelect} className={className} style={style}>
      {content}
    </button>
  );
}

export default function IntelligenceWorkspaceShell({
  title,
  subtitle,
  description,
  eyebrow,
  commandLabel,
  commandValue,
  statusTitle,
  statusDescription,
  statusBadge,
  workspaceItems,
  moduleItems,
  filters,
  actionArea,
  children,
}: IntelligenceWorkspaceShellProps) {
  return (
    <div className="dashboard-shell min-h-screen bg-[linear-gradient(180deg,#07111D_0%,#081523_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1760px]">
        <aside
          className="hidden w-[272px] shrink-0 flex-col border-l border-white/8 p-4 xl:flex"
          style={{ background: "linear-gradient(180deg, #071726 0%, #0B1F33 48%, #10253D 100%)" }}
        >
          <div
            className="rise-in rounded-[2rem] border border-white/10 p-5 text-right"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)" }}
          >
            <div
              className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[1.35rem] shadow-[0_18px_40px_rgba(182,145,62,0.24)]"
              style={{ background: "linear-gradient(135deg, #E9DFC8 0%, #B6913E 100%)", color: "#0B1F33" }}
            >
              <span className="text-sm font-black tracking-[0.18em]">IS</span>
            </div>
            <p className="font-['IBM_Plex_Sans_Arabic'] text-xs font-bold tracking-[0.18em] text-[#E9DFC8]">{eyebrow}</p>
            <h1 className="display-title mt-2 font-['Tajawal'] text-[2.1rem] font-black text-white">{title}</h1>
            <p className="mt-1 font-['IBM_Plex_Sans_Arabic'] text-sm text-white/60">{subtitle}</p>
            <p className="mt-4 font-['IBM_Plex_Sans_Arabic'] text-sm leading-8 text-white/74">{description}</p>
          </div>

          <div className="mt-6 flex-1 space-y-6 overflow-auto">
            <section className="text-right">
              <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-white/35">المساحات الرئيسية</p>
              <div className="space-y-2">
                {workspaceItems.map((item) => (
                  <ShellNavLink key={item.key} item={item} />
                ))}
              </div>
            </section>

            <section className="text-right">
              <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-white/35">وحدات اللوحة</p>
              <div className="space-y-2">
                {moduleItems.map((item) => (
                  <ShellNavLink key={item.key} item={item} />
                ))}
              </div>
            </section>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rise-in stagger-1 rounded-[1.5rem] border border-white/10 bg-white/4 px-4 py-4 text-right">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-full border border-[#B6913E]/40 px-3 py-1 text-[11px] font-bold text-[#E9DFC8]">{statusBadge}</span>
                <p className="text-xs text-white/35">{commandLabel}</p>
              </div>
              <p className="font-['Tajawal'] text-base font-black text-white">{statusTitle}</p>
              <p className="mt-2 font-['IBM_Plex_Sans_Arabic'] text-xs leading-7 text-white/58">{statusDescription}</p>
              <p className="mt-3 font-['IBM_Plex_Sans_Arabic'] text-xs font-semibold text-[#E9DFC8]">{commandValue}</p>
            </div>

            <a
              href="https://foras.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-chip flex items-center justify-center gap-2 rounded-[1.2rem] border px-4 py-3 text-sm font-bold"
              style={{ borderColor: "rgba(182,145,62,0.34)", color: "#E9DFC8" }}
            >
              <ArrowUpLeft size={16} />
              منصة فرص السعودية
            </a>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-3 md:p-4 xl:p-5">
          <div className="rise-in rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,22,38,0.92)_0%,rgba(7,18,31,0.95)_100%)] p-3 shadow-[0_22px_80px_rgba(11,31,51,0.18)]">
            <div className="official-navy-surface mb-4 rounded-[1.75rem] border border-white/8 p-5 md:p-6">
              <div className="space-y-5">
                <div className="executive-divider pr-5 text-right">
                  <div className="mb-3 flex items-center justify-end gap-2 text-xs text-white/58">
                    <span>{title}</span>
                    <ChevronLeft size={14} />
                    <span>{subtitle}</span>
                    <ChevronLeft size={14} />
                    <span>{eyebrow}</span>
                  </div>
                  <h2 className="display-title font-['Tajawal'] text-[2.35rem] font-black text-white md:text-[2.55rem]">{title}</h2>
                  <p className="mt-2 max-w-3xl font-['IBM_Plex_Sans_Arabic'] text-sm leading-8 text-white/76 md:text-[0.96rem]">{description}</p>
                </div>
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px] xl:items-start">
                  <div className="flex min-w-0 flex-wrap justify-end gap-2">
                    {filters.map((filter) => (
                      <span
                        key={filter.label}
                        className="panel-hover inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 font-['IBM_Plex_Sans_Arabic'] text-xs font-semibold text-white/72 backdrop-blur-sm"
                      >
                        <span style={{ color: "#E9DFC8" }}>{filter.value}</span>
                        <span>{filter.label}</span>
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="panel-hover rounded-[1.45rem] border border-[#E9DFC8]/18 bg-white/6 p-4 backdrop-blur-sm">
                      <p className="font-['IBM_Plex_Sans_Arabic'] text-xs font-bold tracking-[0.18em] text-[#E9DFC8]">{commandLabel}</p>
                      <p className="mt-2 font-['Tajawal'] text-xl font-black text-white">{commandValue}</p>
                      <p className="mt-2 font-['IBM_Plex_Sans_Arabic'] text-sm leading-7 text-white/72">{statusDescription}</p>
                    </div>
                  </div>
                </div>
                {actionArea ? <div className="flex justify-end">{actionArea}</div> : null}
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
