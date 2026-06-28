"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  executivePageChrome,
  executiveShellItems,
  type ExecutiveShellPage,
} from "@/components/amanah/executiveShellConfig";

type ReferenceHtmlFrameProps = {
  page:
    | "overview"
    | "spatial"
    | "opportunities"
    | "approvals"
    | "partners"
    | "reports"
    | "performance"
    | "settings";
  displayName?: string;
};

const pageSources: Record<ReferenceHtmlFrameProps["page"], string> = {
  overview: "/amanah-reference/overview.html",
  spatial: "/amanah-reference/spatial.html",
  opportunities: "/amanah-reference/opportunities.html",
  approvals: "/amanah-reference/approvals.html",
  partners: "/amanah-reference/partners.html",
  reports: "/amanah-reference/reports.html",
  performance: "/amanah-reference/performance.html",
  settings: "/amanah-reference/settings.html",
};

const pageCache = new Map<string, string>();

function getCacheKey(page: ReferenceHtmlFrameProps["page"], displayName: string) {
  return `${page}::${displayName}`;
}

function buildUnifiedStyles() {
  return `
    :root { --istinaar-sidebar-width: 280px; }
    html, body {
      min-height: 100%;
      max-width: 100%;
      background: #0c1724 !important;
      overflow-x: clip !important;
    }
    body.istinaar-reference-body {
      margin: 0 !important;
      color: #f8fafc !important;
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      background:
        radial-gradient(circle at 16% 0%, rgba(59,71,90,0.58), transparent 28%),
        radial-gradient(circle at 76% 20%, rgba(176,139,65,0.14), transparent 32%),
        linear-gradient(180deg, #101c2c 0%, #0e141a 54%, #080f14 100%) !important;
      overflow: hidden !important;
      position: relative;
    }
    body.istinaar-reference-body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background:
        linear-gradient(rgba(255,255,255,0.032) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.032) 1px, transparent 1px);
      background-size: 88px 88px;
      opacity: .16;
      animation: istinaar-grid-pulse 10s ease-in-out infinite;
    }
    body.istinaar-reference-body::after {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(circle at 18% 14%, rgba(255,255,255,0.15), transparent 10%),
        radial-gradient(circle at 74% 24%, rgba(255,255,255,0.11), transparent 8%),
        radial-gradient(circle at 52% 72%, rgba(255,255,255,0.08), transparent 11%);
      filter: blur(44px);
      opacity: .26;
      animation: istinaar-glow-pulse 8s ease-in-out infinite;
    }
    body.istinaar-reference-body * {
      box-sizing: border-box;
    }
    @keyframes istinaar-grid-pulse {
      0%, 100% { opacity: .12; }
      50% { opacity: .22; }
    }
    @keyframes istinaar-glow-pulse {
      0%, 100% { opacity: .18; transform: scale(1); }
      50% { opacity: .34; transform: scale(1.02); }
    }
    aside {
      width: var(--istinaar-sidebar-width) !important;
      right: 0 !important;
      left: auto !important;
      top: 0 !important;
      bottom: 0 !important;
      height: 100vh !important;
      padding: 24px 18px !important;
      background:
        radial-gradient(circle at 48% 0%, rgba(234,193,112,0.12), transparent 26%),
        linear-gradient(180deg, #06101b 0%, #0f1c2d 42%, #26303a 74%, #5f646b 100%) !important;
      border-left: 1px solid rgba(255,255,255,0.1) !important;
      box-shadow: -24px 0 54px rgba(2, 9, 16, 0.36) !important;
      overflow-y: auto !important;
      z-index: 60 !important;
    }
    main {
      display: block !important;
      flex: none !important;
      margin-right: var(--istinaar-sidebar-width) !important;
      margin-left: 0 !important;
      width: calc(100vw - var(--istinaar-sidebar-width)) !important;
      max-width: calc(100vw - var(--istinaar-sidebar-width)) !important;
      min-height: 100vh !important;
      height: 100vh !important;
      overflow: auto !important;
      background: transparent !important;
      position: relative !important;
      padding-bottom: 32px !important;
      scroll-behavior: smooth;
    }
    header.istinaar-unified-header {
      position: sticky;
      top: 0;
      z-index: 55;
      margin: 8px 8px 0;
      padding: 18px 24px;
      border-radius: 28px;
      border: 1px solid rgba(255,255,255,0.1);
      background:
        radial-gradient(circle at 60% 0%, rgba(234,193,112,0.1), transparent 22%),
        linear-gradient(135deg, rgba(6,16,27,0.98), rgba(12,24,38,0.96));
      box-shadow: 0 18px 44px rgba(0,0,0,0.22);
      backdrop-filter: blur(18px);
    }
    .istinaar-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .istinaar-header-copy {
      text-align: right;
    }
    .istinaar-header-copy p {
      margin: 0 0 4px;
      color: #e4c982;
      font-size: 11px;
      font-weight: 700;
    }
    .istinaar-header-copy h1 {
      margin: 0;
      color: #fff;
      font-size: 34px;
      line-height: 1.15;
      font-weight: 900;
    }
    .istinaar-header-copy span {
      display: block;
      margin-top: 6px;
      color: rgba(255,255,255,0.52);
      font-size: 12px;
      line-height: 1.8;
    }
    .istinaar-header-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .istinaar-account-pill {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border: 0;
      border-radius: 999px;
      background: radial-gradient(circle at top, #f0e3ba 0%, #c89c45 100%);
      color: #0b1726;
      box-shadow: 0 14px 28px rgba(208,162,67,0.22);
      cursor: pointer;
    }
    .istinaar-circle-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.82);
    }
    .istinaar-circle-button .istinaar-badge {
      position: absolute;
      right: -4px;
      top: -4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 999px;
      background: #ff434a;
      color: #fff;
      font-size: 10px;
      font-weight: 900;
    }
    .istinaar-meta-block {
      border-left: 1px solid rgba(255,255,255,0.1);
      padding-left: 14px;
      text-align: right;
    }
    .istinaar-meta-block small {
      display: block;
      color: rgba(255,255,255,0.52);
      font-size: 10px;
      line-height: 1.4;
    }
    .istinaar-meta-block strong {
      display: block;
      margin-top: 3px;
      color: #fff;
      font-size: 16px;
      line-height: 1.5;
      font-weight: 900;
    }
    .istinaar-sidebar-brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .istinaar-brand-mark {
      width: 52px;
      height: 52px;
      border-radius: 18px;
      display: grid;
      place-items: center;
      background: radial-gradient(circle at 40% 20%, #ffedbd, #d1a247 72%);
      color: #06101b;
      box-shadow: 0 18px 34px rgba(209,162,71,0.22);
    }
    .istinaar-sidebar-title {
      margin: 0;
      color: #fff;
      font-size: 26px;
      font-weight: 800;
      line-height: 1.1;
    }
    .istinaar-sidebar-subtitle {
      margin: 8px 0 0;
      color: rgba(226,232,240,0.52);
      font-size: 11px;
      line-height: 1.7;
    }
    .istinaar-sidebar-panel {
      margin: 18px 0;
      padding: 18px;
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.1);
      background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025));
      text-align: right;
    }
    .istinaar-sidebar-panel strong {
      display: block;
      color: #fff;
      font-size: 20px;
      line-height: 1.3;
    }
    .istinaar-sidebar-panel span {
      display: block;
      margin-top: 8px;
      color: rgba(226,232,240,0.48);
      font-size: 11px;
    }
    .istinaar-sidebar-group-title {
      margin: 18px 0 8px;
      color: rgba(226,232,240,0.42);
      font-size: 11px;
      font-weight: 700;
      text-align: right;
    }
    .istinaar-sidebar-list {
      display: grid;
      gap: 8px;
    }
    .istinaar-sidebar-link {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
      min-height: 58px;
      padding: 10px 12px !important;
      border-radius: 18px !important;
      border: 1px solid rgba(255,255,255,0.08) !important;
      background: rgba(255,255,255,0.025) !important;
      color: rgba(226,232,240,0.82) !important;
      text-decoration: none !important;
      transition: transform .18s ease, background .18s ease, border-color .18s ease, color .18s ease !important;
    }
    .istinaar-sidebar-link:hover {
      transform: translateX(-3px);
      border-color: rgba(234,193,112,0.25) !important;
      background: rgba(255,255,255,0.06) !important;
      color: #fff !important;
    }
    .istinaar-sidebar-link.is-active {
      background: linear-gradient(135deg, #eac170, #b08b41) !important;
      color: #261900 !important;
      border-color: rgba(234,193,112,0.75) !important;
      box-shadow: 0 16px 32px rgba(176,139,65,0.24);
    }
    .istinaar-sidebar-text {
      text-align: right;
      min-width: 0;
    }
    .istinaar-sidebar-text strong {
      display: block;
      color: inherit;
      font-size: 13px;
      font-weight: 800;
      line-height: 1.45;
    }
    .istinaar-sidebar-text span {
      display: block;
      margin-top: 2px;
      color: currentColor;
      opacity: .58;
      font-size: 10px;
      line-height: 1.5;
    }
    .istinaar-sidebar-icon {
      width: 34px;
      height: 34px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .istinaar-sidebar-link.is-active .istinaar-sidebar-icon {
      background: rgba(38,25,0,0.08);
      border-color: rgba(38,25,0,0.12);
    }
    .istinaar-sidebar-footer {
      margin-top: 18px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.08);
      color: rgba(226,232,240,0.36);
      text-align: center;
      font-size: 10px;
      line-height: 1.8;
    }
    .istinaar-sidebar-toggle {
      display: none;
      position: fixed;
      top: 14px;
      right: 14px;
      z-index: 80;
      width: 44px;
      height: 44px;
      border: 1px solid rgba(255,255,255,0.16);
      border-radius: 14px;
      background: linear-gradient(135deg, #eac170, #b08b41);
      color: #261900;
      box-shadow: 0 14px 30px rgba(0,0,0,0.28);
      cursor: pointer;
    }
    .istinaar-shell-canvas {
      padding: 8px 8px 32px !important;
    }
    .istinaar-spatial-main {
      padding-bottom: 48px !important;
    }
    .istinaar-spatial-stage {
      position: relative;
      min-height: 690px;
      margin: 12px 8px 0;
      border-radius: 28px;
      border: 1px solid rgba(255,255,255,0.08);
      overflow: hidden;
      background: rgba(7,16,26,0.72);
      box-shadow: 0 18px 36px rgba(0,0,0,0.24);
    }
    .istinaar-spatial-stage > .absolute.inset-0.z-0 {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      opacity: .96;
      filter: saturate(1.05);
    }
    .istinaar-spatial-stage > .map-overlay-gradient {
      background: linear-gradient(180deg, rgba(7,16,26,0.2), rgba(7,16,26,0.12)) !important;
    }
    .istinaar-spatial-stage .absolute.top-lg.right-lg.bottom-lg.w-80 {
      width: 320px !important;
      border-radius: 24px !important;
      background: rgba(12,24,38,0.88) !important;
    }
    .istinaar-spatial-cards-grid {
      display: grid !important;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px !important;
      margin: 18px 8px 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      mask-image: none !important;
      position: static !important;
    }
    .istinaar-spatial-cards-grid > div {
      min-width: 0 !important;
      border-radius: 22px !important;
      background: linear-gradient(180deg, rgba(20,34,52,0.86), rgba(10,18,28,0.92)) !important;
      padding: 18px !important;
    }
    .istinaar-spatial-cards-grid button {
      min-height: 42px;
      border-radius: 14px !important;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.04) !important;
    }
    @media (max-width: 1400px) {
      .istinaar-spatial-cards-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 1120px) {
      :root { --istinaar-sidebar-width: 248px; }
      aside { padding: 18px 12px !important; }
      .istinaar-sidebar-title { font-size: 22px; }
      .istinaar-sidebar-link { min-height: 52px; }
      header.istinaar-unified-header { margin: 6px 6px 0; padding: 16px 18px; }
      .istinaar-header-copy h1 { font-size: 28px; }
      .istinaar-spatial-stage .absolute.top-lg.right-lg.bottom-lg.w-80 { width: 286px !important; }
    }
    @media (max-width: 860px) {
      html, body {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: hidden !important;
      }
      body.istinaar-reference-body { overflow: auto !important; }
      main {
        margin-right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        min-height: auto !important;
        height: auto !important;
        overflow: visible !important;
        padding: 8px 0 28px !important;
      }
      aside {
        transform: translateX(102%) !important;
        transition: transform .24s ease !important;
      }
      body.istinaar-sidebar-open aside { transform: translateX(0) !important; }
      .istinaar-sidebar-toggle { display: grid; place-items: center; }
      header.istinaar-unified-header { margin: 60px 8px 0; }
      .istinaar-header-meta { justify-content: flex-end; }
      .istinaar-spatial-stage {
        min-height: auto;
        display: flex;
        flex-direction: column;
        margin-inline: 8px !important;
      }
      .istinaar-spatial-stage .absolute.top-lg.right-lg.bottom-lg.w-80 {
        position: relative !important;
        top: auto !important;
        right: auto !important;
        bottom: auto !important;
        left: auto !important;
        width: auto !important;
        margin: 16px !important;
      }
      .istinaar-spatial-stage .absolute.top-lg.left-1\\/2,
      .istinaar-spatial-stage .absolute.top-lg.left-lg {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        transform: none !important;
        margin: 12px 16px 0 !important;
        width: auto !important;
        max-width: calc(100% - 32px) !important;
        flex-wrap: wrap !important;
      }
      .istinaar-spatial-stage .absolute.top-lg.left-lg {
        flex-direction: row !important;
        width: fit-content;
      }
      .istinaar-spatial-stage .absolute.top-lg.right-lg.bottom-lg.w-80 + * { margin-top: 0 !important; }
      .istinaar-spatial-cards-grid {
        grid-template-columns: 1fr !important;
        margin-inline: 8px !important;
      }
    }
  `;
}

function buildSidebarMarkup(page: ExecutiveShellPage) {
  const primaryItems = executiveShellItems.filter((item) => item.group === "primary");
  const managementItems = executiveShellItems.filter((item) => item.group === "management");

  const renderItems = (items: typeof executiveShellItems) =>
    items
      .map((item) => {
        const active = item.page === page ? " is-active" : "";
        return `<a class="istinaar-sidebar-link${active}" href="${item.href}" data-istinaar-nav="${item.href}">
          <span class="istinaar-sidebar-text"><strong>${item.label}</strong><span>${item.hint}</span></span>
          <span class="istinaar-sidebar-icon material-symbols-outlined">${item.icon}</span>
        </a>`;
      })
      .join("");

  return `
    <div class="istinaar-sidebar-brand">
      <div class="istinaar-brand-mark material-symbols-outlined">auto_awesome</div>
      <div>
        <h2 class="istinaar-sidebar-title">استنار</h2>
        <p class="istinaar-sidebar-subtitle">منصة الذكاء الاستثماري ودعم القرار</p>
      </div>
    </div>
    <div class="istinaar-sidebar-panel">
      <strong>المركز التنفيذي</strong>
      <span>لوحة القيادة والمتابعة الداخلية</span>
    </div>
    <div class="istinaar-sidebar-group-title">المسارات الرئيسية</div>
    <nav class="istinaar-sidebar-list">${renderItems(primaryItems)}</nav>
    <div class="istinaar-sidebar-group-title">الإدارة والمتابعة</div>
    <nav class="istinaar-sidebar-list">${renderItems(managementItems)}</nav>
    <div class="istinaar-sidebar-footer">© 2024 استنار<br/>جميع الحقوق محفوظة</div>
  `;
}

function buildHeaderMarkup(page: ExecutiveShellPage, displayName: string) {
  const chrome = executivePageChrome[page];

  return `
    <header class="istinaar-unified-header" dir="rtl">
      <div class="istinaar-header-row">
        <div class="istinaar-header-copy">
          <p>${chrome.eyebrow}</p>
          <h1>${chrome.title}</h1>
          <span>${chrome.subtitle}</span>
        </div>
        <div class="istinaar-header-meta" dir="ltr">
          <button type="button" class="istinaar-account-pill" data-istinaar-nav="/account" aria-label="الحساب">
            <span class="material-symbols-outlined">person</span>
          </button>
          <button type="button" class="istinaar-circle-button" aria-label="التنبيهات">
            <span class="material-symbols-outlined">notifications</span>
            <span class="istinaar-badge">3</span>
          </button>
          <button type="button" class="istinaar-circle-button" aria-label="الرسائل">
            <span class="material-symbols-outlined">mail</span>
          </button>
          <div class="istinaar-meta-block" dir="rtl">
            <small id="istinaar-date-label">الأربعاء 05/01/1448 هـ</small>
            <strong id="istinaar-time-label">10:30 AM</strong>
          </div>
          <div class="istinaar-meta-block" dir="rtl">
            <small>مكتب دعم القرار الاستثماري</small>
            <strong>${displayName}</strong>
          </div>
        </div>
      </div>
    </header>
  `;
}

function injectUnifiedScript(doc: Document) {
  doc.getElementById("istinaar-unified-script")?.remove();
  const script = doc.createElement("script");
  script.id = "istinaar-unified-script";
  script.textContent = `
    (function () {
      const nav = (href) => window.parent.postMessage({ type: "istinaar-nav", href }, "*");
      const bindNav = () => {
        document.querySelectorAll("[data-istinaar-nav]").forEach((node) => {
          node.addEventListener("click", (event) => {
            event.preventDefault();
            const href = node.getAttribute("data-istinaar-nav");
            if (href) nav(href);
          });
        });
      };

      const applyResponsiveShell = () => {
        const compact = window.innerWidth <= 860;
        const main = document.querySelector("main");
        const aside = document.querySelector("aside");
        const body = document.body;
        const stage = document.querySelector(".istinaar-spatial-stage");
        const stageTabs = stage?.querySelector(".absolute.top-lg.left-1\\/2");
        const stageLegend = stage?.querySelector(".absolute.top-lg.left-lg");

        if (body) {
          body.style.width = "100%";
          body.style.maxWidth = "100%";
          body.style.overflowX = "hidden";
        }

        if (main instanceof HTMLElement) {
          if (compact) {
            main.style.marginRight = "0";
            main.style.width = "100%";
            main.style.maxWidth = "100%";
            main.style.height = "auto";
            main.style.minHeight = "auto";
            main.style.overflow = "visible";
          } else {
            main.style.marginRight = "var(--istinaar-sidebar-width)";
            main.style.width = "calc(100% - var(--istinaar-sidebar-width))";
            main.style.maxWidth = "calc(100% - var(--istinaar-sidebar-width))";
            main.style.height = "100vh";
            main.style.minHeight = "100vh";
            main.style.overflow = "auto";
          }
        }

        if (aside instanceof HTMLElement && compact && !body.classList.contains(toggleClass)) {
          aside.style.pointerEvents = "none";
          aside.style.visibility = "hidden";
        } else if (aside instanceof HTMLElement) {
          aside.style.pointerEvents = "auto";
          aside.style.visibility = "visible";
        }

        if (stageTabs instanceof HTMLElement && compact) {
          stageTabs.style.width = "auto";
          stageTabs.style.maxWidth = "calc(100% - 32px)";
          stageTabs.style.flexWrap = "wrap";
        }

        if (stageLegend instanceof HTMLElement && compact) {
          stageLegend.style.width = "fit-content";
          stageLegend.style.maxWidth = "calc(100% - 32px)";
          stageLegend.style.flexWrap = "wrap";
        }
      };

      const toggleClass = "istinaar-sidebar-open";
      let toggle = document.querySelector(".istinaar-sidebar-toggle");
      if (!toggle) {
        toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "istinaar-sidebar-toggle material-symbols-outlined";
        toggle.textContent = "menu";
        toggle.setAttribute("aria-label", "فتح القائمة");
        document.body.appendChild(toggle);
      }
      toggle.addEventListener("click", function () {
        document.body.classList.toggle(toggleClass);
        toggle.textContent = document.body.classList.contains(toggleClass) ? "close" : "menu";
        applyResponsiveShell();
      });

      const dateLabel = document.getElementById("istinaar-date-label");
      const timeLabel = document.getElementById("istinaar-time-label");
      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Riyadh",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      const dateFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
        timeZone: "Asia/Riyadh",
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
      const updateClock = () => {
        const now = new Date();
        if (timeLabel) timeLabel.textContent = timeFormatter.format(now);
        if (dateLabel) dateLabel.textContent = dateFormatter.format(now);
      };
      updateClock();
      window.setInterval(updateClock, 30000);
      window.addEventListener("resize", applyResponsiveShell);

      bindNav();
      applyResponsiveShell();
    })();
  `;
  doc.body.appendChild(script);
}

function transformSpatialLayout(doc: Document) {
  const main = doc.querySelector("main");
  const stage = doc.querySelector("main > div.flex-1.relative") as HTMLElement | null;
  if (!main || !stage) return;

  main.classList.add("istinaar-spatial-main");
  stage.className = "istinaar-spatial-stage";

  const stageBackground = stage.querySelector("div.absolute.inset-0.z-0") as HTMLElement | null;
  if (stageBackground) {
    stageBackground.style.backgroundImage = "url('/amanah-reference/hail-map-dark.svg')";
    stageBackground.setAttribute("data-location", "Hail, Saudi Arabia");
    stageBackground.removeAttribute("data-alt");
  }

  const directChildren = Array.from(stage.children) as HTMLElement[];
  const cardStrip = directChildren.find((element) => {
    const className = element.className ?? "";
    return (
      className.includes("overflow-x-auto") ||
      element.getAttribute("style")?.includes("mask-image") ||
      element.querySelector("h4")?.textContent?.includes("حي") ||
      false
    );
  });
  if (cardStrip) {
    cardStrip.className = "istinaar-spatial-cards-grid";
    cardStrip.removeAttribute("style");
    main.appendChild(cardStrip);
  }

  const shells = Array.from(doc.querySelectorAll("h4"));
  shells.forEach((heading) => {
    if (heading.textContent?.trim() === "حي الجامعة") {
      heading.textContent = "حي الجامعيين";
    }
  });
}

function transformHtml(rawHtml: string, page: ReferenceHtmlFrameProps["page"], displayName: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");
  const body = doc.body;
  const head = doc.head;

  let viewportMeta = head.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    viewportMeta = doc.createElement("meta");
    viewportMeta.setAttribute("name", "viewport");
    head.prepend(viewportMeta);
  }
  viewportMeta.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");

  body.classList.add("istinaar-reference-body");
  const styleNode = doc.createElement("style");
  styleNode.id = "istinaar-unified-shell-style";
  styleNode.textContent = buildUnifiedStyles();
  head.appendChild(styleNode);

  const main = doc.querySelector("main");
  if (main) {
    main.classList.add("istinaar-shell-canvas");
  }

  const aside = doc.querySelector("aside");
  if (aside) {
    aside.innerHTML = buildSidebarMarkup(page);
  }

  const header = doc.querySelector("header");
  if (header) {
    header.outerHTML = buildHeaderMarkup(page, displayName);
  } else if (main) {
    main.insertAdjacentHTML("afterbegin", buildHeaderMarkup(page, displayName));
  }

  if (page === "spatial") {
    transformSpatialLayout(doc);
  }

  injectUnifiedScript(doc);

  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
}

async function loadPageMarkup(page: ReferenceHtmlFrameProps["page"], displayName: string) {
  const cacheKey = getCacheKey(page, displayName);
  const cached = pageCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch(pageSources[page], { cache: "force-cache" });
  const rawHtml = await response.text();
  const transformed = transformHtml(rawHtml, page, displayName);
  pageCache.set(cacheKey, transformed);
  return transformed;
}

export default function ReferenceHtmlFrame({ page, displayName = "أ. محمد الشهري" }: ReferenceHtmlFrameProps) {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [html, setHtml] = useState<string | null>(pageCache.get(getCacheKey(page, displayName)) ?? null);

  const allRoutes = useMemo(
    () => executiveShellItems.map((item) => item.href),
    [],
  );

  useEffect(() => {
    let active = true;
    setHtml(pageCache.get(getCacheKey(page, displayName)) ?? null);

    loadPageMarkup(page, displayName).then((markup) => {
      if (active) {
        setHtml(markup);
      }
    });

    return () => {
      active = false;
    };
  }, [displayName, page]);

  useEffect(() => {
    allRoutes.forEach((href) => router.prefetch(href));
  }, [allRoutes, router]);

  useEffect(() => {
    const preload = async () => {
      await Promise.all(
        (Object.keys(pageSources) as ReferenceHtmlFrameProps["page"][]).map((key) =>
          key === page ? Promise.resolve() : loadPageMarkup(key, displayName),
        ),
      );
    };

    preload();
  }, [displayName, page]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!event.data || event.data.type !== "istinaar-nav") return;
      if (typeof event.data.href !== "string") return;
      router.push(event.data.href);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  if (!html) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#101c2c_0%,#0e141a_50%,#080f14_100%)]">
        <div className="h-16 w-16 animate-spin rounded-full border-2 border-[#eac170]/30 border-t-[#eac170]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e141a]">
      <iframe
        ref={iframeRef}
        title={`استنار - ${page}`}
        srcDoc={html}
        className="block h-screen w-full border-0 bg-[#0e141a]"
      />
    </div>
  );
}
