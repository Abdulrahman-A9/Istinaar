"use client";

import Link from "next/link";
import { Bell, Mail, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ExecutiveHeader({
  title,
  subtitle,
  displayName,
}: {
  title: string;
  subtitle: string;
  displayName: string;
}) {
  const [riyadhTime, setRiyadhTime] = useState("10:30 AM");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Riyadh",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const updateTime = () => setRiyadhTime(formatter.format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="executive-header rounded-[1.25rem] border border-white/10 bg-[linear-gradient(115deg,rgba(13,34,53,0.98)_0%,rgba(8,22,36,0.98)_52%,rgba(11,29,46,0.98)_100%)] px-5 py-3.5 shadow-[0_18px_44px_rgba(0,0,0,0.2)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-right">
          <p className="mb-1 text-[10px] font-bold tracking-[0.16em] text-[#E4C982]">استنار · المركز التنفيذي</p>
          <h1 className="font-['Noto_Kufi_Arabic'] text-[1.2rem] font-extrabold leading-relaxed text-white sm:text-[1.45rem] 2xl:text-[1.6rem]">{title}</h1>
          <p className="mt-1 text-[11px] text-white/52">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="border-r border-white/10 pr-4 text-right">
            <p className="font-['Tajawal'] text-[0.92rem] font-black text-[#E4C982]">{displayName}</p>
            <p className="mt-0.5 text-[11px] text-white/42">مكتب دعم القرار الاستثماري</p>
          </div>
          <div className="border-r border-white/10 pr-4 text-right">
            <p className="text-[11px] text-white/52">توقيت الرياض</p>
            <p className="mt-0.5 font-['Tajawal'] text-[1rem] font-black text-white">{riyadhTime}</p>
          </div>
          <Link href="/dashboard" aria-label="الرسائل" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80">
            <Mail size={17} />
          </Link>
          <Link href="/dashboard" aria-label="التنبيهات" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80">
            <Bell size={17} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF434A] text-[10px] font-black text-white">3</span>
          </Link>
          <Link href="/account" aria-label="الحساب" title="فتح حسابي" className="flex h-11 w-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#F0E3BA_0%,#C89C45_100%)] text-[#0B1726] shadow-[0_14px_28px_rgba(208,162,67,0.22)]">
            <UserCircle2 size={19} />
          </Link>
        </div>
      </div>
    </header>
  );
}
