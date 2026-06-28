export type ExecutiveShellPage =
  | "admin"
  | "overview"
  | "spatial"
  | "opportunities"
  | "approvals"
  | "partners"
  | "reports"
  | "performance"
  | "settings";

export type ExecutiveShellItem = {
  page: ExecutiveShellPage;
  label: string;
  hint: string;
  icon: string;
  href: string;
  group: "primary" | "management";
};

export const executiveShellItems: ExecutiveShellItem[] = [
  {
    page: "admin",
    label: "الرئيسية",
    hint: "ملخص التشغيل اليومي",
    icon: "dashboard",
    href: "/admin",
    group: "primary",
  },
  {
    page: "overview",
    label: "الذكاء الاستثماري",
    hint: "القراءة التنفيذية",
    icon: "insights",
    href: "/investment-intelligence",
    group: "primary",
  },
  {
    page: "spatial",
    label: "التحليل المكاني",
    hint: "الأحياء والأولويات",
    icon: "map",
    href: "/investment-intelligence?tab=spatial",
    group: "primary",
  },
  {
    page: "opportunities",
    label: "الفرص الاستثمارية",
    hint: "السجل والجاهزية",
    icon: "monetization_on",
    href: "/investment-intelligence?tab=opportunities",
    group: "primary",
  },
  {
    page: "approvals",
    label: "الاعتمادات والموافقات",
    hint: "الرفع والاعتماد",
    icon: "fact_check",
    href: "/investment-intelligence?tab=approvals",
    group: "management",
  },
  {
    page: "partners",
    label: "الشركاء والمستثمرون",
    hint: "الأطراف ذات العلاقة",
    icon: "handshake",
    href: "/investment-intelligence?tab=partners",
    group: "management",
  },
  {
    page: "reports",
    label: "التقارير واللوحات",
    hint: "المخرجات التنفيذية",
    icon: "analytics",
    href: "/investment-intelligence?tab=reports",
    group: "management",
  },
  {
    page: "performance",
    label: "الأداء والمؤشرات",
    hint: "مؤشرات القرار",
    icon: "monitoring",
    href: "/investment-intelligence?tab=performance",
    group: "management",
  },
  {
    page: "settings",
    label: "الإعدادات",
    hint: "التفضيلات والصلاحيات",
    icon: "settings",
    href: "/investment-intelligence?tab=settings",
    group: "management",
  },
];

export const executivePageChrome: Record<
  ExecutiveShellPage,
  { title: string; subtitle: string; eyebrow: string }
> = {
  admin: {
    title: "المركز التنفيذي",
    subtitle: "لوحة القيادة والمتابعة الداخلية",
    eyebrow: "استنار · المركز التنفيذي",
  },
  overview: {
    title: "الذكاء الاستثماري",
    subtitle: "رؤية تنفيذية موحدة لمسار الفرص والجاهزية",
    eyebrow: "استنار · الذكاء الاستثماري",
  },
  spatial: {
    title: "التحليل المكاني",
    subtitle: "خريطة أحياء حائل وأولويات التحرك الاستثماري",
    eyebrow: "استنار · التحليل المكاني",
  },
  opportunities: {
    title: "الفرص الاستثمارية",
    subtitle: "سجل القرار والجاهزية والقيمة المتوقعة",
    eyebrow: "استنار · الفرص الاستثمارية",
  },
  approvals: {
    title: "الاعتمادات والموافقات",
    subtitle: "مسار الرفع والاعتماد وحالة الملفات النشطة",
    eyebrow: "استنار · الاعتمادات والموافقات",
  },
  partners: {
    title: "الشركاء والمستثمرون",
    subtitle: "العلاقات الاستثمارية وملفات المطابقة والتواصل",
    eyebrow: "استنار · الشركاء والمستثمرون",
  },
  reports: {
    title: "التقارير واللوحات",
    subtitle: "المخرجات التنفيذية والتقارير الجاهزة للعرض",
    eyebrow: "استنار · التقارير واللوحات",
  },
  performance: {
    title: "الأداء والمؤشرات",
    subtitle: "القياس التنفيذي ونبض الأداء الاستثماري",
    eyebrow: "استنار · الأداء والمؤشرات",
  },
  settings: {
    title: "الإعدادات",
    subtitle: "الحوكمة والتفضيلات ومسارات الإدارة الرقمية",
    eyebrow: "استنار · الإعدادات",
  },
};
