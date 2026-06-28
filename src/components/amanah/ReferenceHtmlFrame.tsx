"use client";

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

export default function ReferenceHtmlFrame({ page }: ReferenceHtmlFrameProps) {
  return (
    <div className="min-h-screen bg-[#0e141a]">
      <iframe
        key={page}
        title={`استنار - ${page}`}
        src={pageSources[page]}
        className="block h-screen w-full border-0 bg-[#0e141a]"
      />
    </div>
  );
}
