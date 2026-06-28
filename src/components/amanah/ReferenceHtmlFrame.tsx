"use client";

import { useCallback } from "react";

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

const sidebarItems: Array<{ page: ReferenceHtmlFrameProps["page"] | "admin"; label: string; hint: string; icon: string; href: string }> = [
  { page: "admin", label: "الرئيسية", hint: "ملخص التشغيل اليومي", icon: "dashboard", href: "/admin" },
  { page: "overview", label: "الذكاء الاستثماري", hint: "القراءة التنفيذية", icon: "insights", href: "/investment-intelligence" },
  { page: "spatial", label: "التحليل المكاني", hint: "الأحياء والأولويات", icon: "map", href: "/investment-intelligence?tab=spatial" },
  { page: "opportunities", label: "الفرص الاستثمارية", hint: "السجل والجاهزية", icon: "monetization_on", href: "/investment-intelligence?tab=opportunities" },
  { page: "approvals", label: "الاعتمادات والموافقات", hint: "الرفع والاعتماد", icon: "fact_check", href: "/investment-intelligence?tab=approvals" },
  { page: "partners", label: "الشركاء والمستثمرون", hint: "الأطراف ذات العلاقة", icon: "handshake", href: "/investment-intelligence?tab=partners" },
  { page: "reports", label: "التقارير واللوحات", hint: "العروض التنفيذية", icon: "analytics", href: "/investment-intelligence?tab=reports" },
  { page: "performance", label: "الأداء والمؤشرات", hint: "مؤشرات القرار", icon: "monitoring", href: "/investment-intelligence?tab=performance" },
  { page: "settings", label: "الإعدادات", hint: "التفضيلات والصلاحيات", icon: "settings", href: "/investment-intelligence?tab=settings" },
];

function sidebarStyles() {
  return `
    :root { --istinaar-sidebar-width: 280px; }
    body { background: #0e141a !important; }
    aside {
      width: var(--istinaar-sidebar-width) !important;
      right: 0 !important;
      left: auto !important;
      top: 0 !important;
      bottom: 0 !important;
      height: 100vh !important;
      padding: 24px 18px !important;
      background:
        radial-gradient(circle at 48% 0%, rgba(234, 193, 112, 0.12), transparent 26%),
        linear-gradient(180deg, #06101b 0%, #0f1c2d 42%, #26303a 74%, #5f646b 100%) !important;
      border-left: 1px solid rgba(255,255,255,0.1) !important;
      box-shadow: -24px 0 54px rgba(2, 9, 16, 0.36) !important;
      overflow-y: auto !important;
      z-index: 60 !important;
    }
    main { margin-right: var(--istinaar-sidebar-width) !important; margin-left: 0 !important; }
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
      border-radius: 16px;
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
      border-radius: 16px !important;
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
    @media (max-width: 1120px) {
      :root { --istinaar-sidebar-width: 248px; }
      aside { padding: 18px 12px !important; }
      .istinaar-sidebar-title { font-size: 22px; }
      .istinaar-sidebar-link { min-height: 52px; }
    }
    @media (max-width: 860px) {
      body { overflow: auto !important; }
      main { margin-right: 0 !important; min-width: 900px; }
      aside { transform: translateX(102%) !important; transition: transform .24s ease !important; }
      body.istinaar-sidebar-open aside { transform: translateX(0) !important; }
      .istinaar-sidebar-toggle { display: grid; place-items: center; }
    }
  `;
}

export default function ReferenceHtmlFrame({ page }: ReferenceHtmlFrameProps) {
  const unifySidebar = useCallback(
    (frame: HTMLIFrameElement | null) => {
      const doc = frame?.contentDocument;
      const win = frame?.contentWindow;
      if (!doc || !win) return;

      const previousStyle = doc.getElementById("istinaar-unified-sidebar-style");
      previousStyle?.remove();

      const style = doc.createElement("style");
      style.id = "istinaar-unified-sidebar-style";
      style.textContent = sidebarStyles();
      doc.head.appendChild(style);

      const aside = doc.querySelector("aside");
      if (!aside) return;

      const navItems = sidebarItems
        .map((item) => {
          const active = item.page === page ? " is-active" : "";
          return `<a class="istinaar-sidebar-link${active}" href="${item.href}" data-istinaar-href="${item.href}">
            <span class="istinaar-sidebar-text"><strong>${item.label}</strong><span>${item.hint}</span></span>
            <span class="istinaar-sidebar-icon material-symbols-outlined">${item.icon}</span>
          </a>`;
        })
        .join("");

      aside.innerHTML = `
        <div class="istinaar-sidebar-brand">
          <div class="istinaar-brand-mark material-symbols-outlined">auto_awesome</div>
          <div>
            <h2 class="istinaar-sidebar-title">استنار</h2>
            <p class="istinaar-sidebar-subtitle">منصة الذكاء الاستثماري ودعم القرار</p>
          </div>
        </div>
        <div class="istinaar-sidebar-panel">
          <strong>المركز التنفيذي</strong>
          <span>لوحة قيادة ومتابعة داخلية</span>
        </div>
        <div class="istinaar-sidebar-group-title">المسارات الرئيسية</div>
        <nav class="istinaar-sidebar-list">${navItems}</nav>
        <div class="istinaar-sidebar-footer">© 2024 استنار<br/>جميع الحقوق محفوظة</div>
      `;

      let toggle = doc.querySelector<HTMLButtonElement>(".istinaar-sidebar-toggle");
      if (!toggle) {
        toggle = doc.createElement("button");
        toggle.type = "button";
        toggle.className = "istinaar-sidebar-toggle material-symbols-outlined";
        toggle.setAttribute("aria-label", "فتح القائمة");
        toggle.textContent = "menu";
        doc.body.appendChild(toggle);
      }

      toggle.onclick = () => {
        doc.body.classList.toggle("istinaar-sidebar-open");
        toggle.textContent = doc.body.classList.contains("istinaar-sidebar-open") ? "close" : "menu";
      };

      aside.querySelectorAll<HTMLAnchorElement>("[data-istinaar-href]").forEach((link) => {
        link.onclick = (event) => {
          event.preventDefault();
          const href = link.dataset.istinaarHref || "/admin";
          (win.top ?? win).location.href = href;
        };
      });
    },
    [page],
  );

  return (
    <div className="min-h-screen bg-[#0e141a]">
      <iframe
        key={page}
        title={`استنار - ${page}`}
        src={pageSources[page]}
        onLoad={(event) => unifySidebar(event.currentTarget)}
        className="block h-screen w-full border-0 bg-[#0e141a]"
      />
    </div>
  );
}
