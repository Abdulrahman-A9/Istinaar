"use client";

import Link from "next/link";
import { Bell, Mail, UserCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  const [riyadhDate, setRiyadhDate] = useState("الأربعاء 05/01/1448 هـ");

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Riyadh",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    [],
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
        timeZone: "Asia/Riyadh",
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [],
  );

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setRiyadhTime(timeFormatter.format(now));
      setRiyadhDate(dateFormatter.format(now));
    };

    updateClock();
    const interval = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(interval);
  }, [dateFormatter, timeFormatter]);

  return (
    <header className="sticky top-1 z-50 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_60%_0%,rgba(234,193,112,0.1),transparent_22%),linear-gradient(135deg,#06101b,#0c1826)] px-5 py-4 shadow-[0_18px_44px_rgba(0,0,0,0.22)] sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-right">
          <p className="mb-1 text-[11px] font-bold text-[#e4c982]">استنار · المركز التنفيذي</p>
          <h1 className="text-[1.85rem] font-black leading-tight text-white sm:text-[2.15rem]">{title}</h1>
          <p className="mt-1 text-[11px] leading-6 text-white/52 sm:text-[12px]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3" dir="ltr">
          <Link
            href="/account"
            aria-label="الحساب"
            title="فتح الحساب"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#f0e3ba_0%,#c89c45_100%)] text-[#0b1726] shadow-[0_14px_28px_rgba(208,162,67,0.22)]"
          >
            <UserCircle2 size={21} />
          </Link>

          <button
            type="button"
            aria-label="التنبيهات"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80"
          >
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff434a] text-[10px] font-black text-white">
              3
            </span>
          </button>

          <button
            type="button"
            aria-label="الرسائل"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80"
          >
            <Mail size={18} />
          </button>

          <div className="border-l border-white/10 pl-4 text-right" dir="rtl">
            <p className="text-[10px] text-white/52">{riyadhDate}</p>
            <p className="mt-0.5 text-[1.05rem] font-black text-white">{riyadhTime}</p>
          </div>

          <div className="border-l border-white/10 pl-4 text-right" dir="rtl">
            <p className="text-[0.86rem] font-black text-[#e4c982]">{displayName}</p>
            <p className="mt-0.5 text-[10px] text-white/42">مكتب دعم القرار الاستثماري</p>
          </div>
        </div>
      </div>
    </header>
  );
}
