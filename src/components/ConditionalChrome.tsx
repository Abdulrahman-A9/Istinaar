"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const chromeLessPrefixes = ["/admin"];

export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChromeLess = chromeLessPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (isChromeLess) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
