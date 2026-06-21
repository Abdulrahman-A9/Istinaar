"use client";

export type ReferenceMetric = {
  label: string;
  value: string;
  unit: string;
  delta: string;
  icon: "coins" | "trend" | "users" | "bars" | "briefcase" | "clipboard";
  accent: string;
};

export type ReferenceDecision = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusTone: "green" | "amber" | "red";
  action: string;
  age: string;
  icon: "tower" | "file" | "shield" | "handshake";
};

export type ReferenceMapPoint = {
  id: string;
  label: string;
  state: "ready" | "review" | "blocked";
  top: string;
  right: string;
};

export const executiveMetrics: ReferenceMetric[] = [
  {
    label: "قيمة الاستثمار المتوقعة",
    value: "211.7",
    unit: "مليون ريال",
    delta: "+18% عن الشهر الماضي",
    icon: "coins",
    accent: "#d8a84f",
  },
  {
    label: "مؤشر جاهزية الاستثمار",
    value: "83%",
    unit: "",
    delta: "+7% عن الشهر الماضي",
    icon: "trend",
    accent: "#d7a14a",
  },
  {
    label: "الوظائف المتوقعة",
    value: "1,248",
    unit: "وظيفة",
    delta: "+26% عن الشهر الماضي",
    icon: "users",
    accent: "#d3a04a",
  },
  {
    label: "العوائد السنوية المتوقعة",
    value: "28.4",
    unit: "مليون ريال",
    delta: "+15% عن الشهر الماضي",
    icon: "bars",
    accent: "#d3a04a",
  },
  {
    label: "عدد الفرص الاستثمارية",
    value: "24",
    unit: "فرصة",
    delta: "جاهزة للطرح",
    icon: "briefcase",
    accent: "#d4a04b",
  },
  {
    label: "القرارات المطلوبة",
    value: "6",
    unit: "قرارات",
    delta: "تحتاج إجراء",
    icon: "clipboard",
    accent: "#d3a24e",
  },
];

export const executiveDecisions: ReferenceDecision[] = [
  {
    id: "dec-1",
    title: "رفع فرصة تطوير موقع حي مشار",
    subtitle: "جاهزية عالية - بانتظار الاعتماد",
    status: "عالية",
    statusTone: "green",
    action: "اتخاذ إجراء",
    age: "منذ 2 يوم",
    icon: "tower",
  },
  {
    id: "dec-2",
    title: "اعتماد دراسة تطوير حي النقرة",
    subtitle: "جاهزة للاعتماد",
    status: "متوسطة",
    statusTone: "amber",
    action: "اتخاذ إجراء",
    age: "منذ 1 يوم",
    icon: "file",
  },
  {
    id: "dec-3",
    title: "مراجعة اعتراض على شروط كراسة المنافسة",
    subtitle: "اعتراض مقدم من شركة نسك",
    status: "عالية",
    statusTone: "red",
    action: "مراجعة الاعتراض",
    age: "منذ 3 أيام",
    icon: "shield",
  },
  {
    id: "dec-4",
    title: "اعتماد شراكة استثمارية - مشروع الوسيطاء",
    subtitle: "شريك استراتيجي - جاهز للتوقيع",
    status: "منخفضة",
    statusTone: "green",
    action: "اتخاذ إجراء",
    age: "منذ 4 أيام",
    icon: "handshake",
  },
];

export const executiveMapPoints: ReferenceMapPoint[] = [
  { id: "naqrah", label: "حي النقرة", state: "blocked", top: "33%", right: "58%" },
  { id: "mashar", label: "حي مشار", state: "review", top: "58%", right: "41%" },
  { id: "wasitah", label: "حي الوسيطاء", state: "ready", top: "56%", right: "67%" },
  { id: "jamieen", label: "حي الجامعيين", state: "review", top: "46%", right: "34%" },
  { id: "zubarah", label: "حي الزبارة", state: "ready", top: "24%", right: "24%" },
  { id: "sifain", label: "حي الشفاء", state: "ready", top: "21%", right: "74%" },
  { id: "muntazah", label: "حي منتزه", state: "ready", top: "69%", right: "55%" },
  { id: "salam", label: "حي السلام", state: "blocked", top: "74%", right: "19%" },
];

export const recommendationFeed = [
  {
    title: "رفع جاهزية فرصة تطوير موقع حي مشار",
    badge: "توصية جاهزة",
    readiness: 83,
    roi: "28.5",
  },
  {
    title: "اعتماد دراسة تطوير حي النقرة",
    badge: "توصية متوسطة",
    readiness: 71,
    roi: "15.2",
  },
  {
    title: "مراجعة اعتراض على شروط كراسة المنافسة",
    badge: "توصية معالجة",
    readiness: 42,
    roi: "8.7",
  },
];

export const spatialNeighborhoodCards = [
  { name: "حي المنتزه", score: "62%", opportunities: "2", value: "7.4", state: "قابلية نمو", tone: "amber" },
  { name: "حي الوسيطاء", score: "65%", opportunities: "2", value: "8.7", state: "جاهزية متوسطة", tone: "amber" },
  { name: "حي النقرة", score: "71%", opportunities: "3", value: "15.2", state: "جاهزية جيدة", tone: "green" },
  { name: "حي الجامعيين", score: "83%", opportunities: "6", value: "32.5", state: "جاهزة للطرح", tone: "green" },
];

export const opportunityRows = [
  {
    title: "تطوير موقع حي مشار",
    category: "تجاري",
    location: "حي مشار - شمال حائل",
    readiness: "83%",
    value: "28.5 مليون ر.س",
    roi: "27%",
    stage: "جاهزة للطرح",
    updated: "منذ 2 يوم",
  },
  {
    title: "تطوير حي النقرة",
    category: "سكني",
    location: "حي النقرة - غرب حائل",
    readiness: "71%",
    value: "15.2 مليون ر.س",
    roi: "23%",
    stage: "قيد الدراسة",
    updated: "منذ 5 يوم",
  },
  {
    title: "مشروع الوسيطاء التجاري",
    category: "تجاري",
    location: "حي الوسيطاء - جنوب حائل",
    readiness: "65%",
    value: "8.7 مليون ر.س",
    roi: "19%",
    stage: "قيد المراجعة",
    updated: "منذ 1 أسبوع",
  },
  {
    title: "مركز تجاري حي الجامعة",
    category: "تجاري",
    location: "حي الجامعة - شرق حائل",
    readiness: "42%",
    value: "3.1 مليون ر.س",
    roi: "14%",
    stage: "قيد الدراسة",
    updated: "منذ 2 أسبوع",
  },
  {
    title: "تطوير الواجهة الشمالية",
    category: "ترفيهي",
    location: "الواجهة الشمالية",
    readiness: "38%",
    value: "12.4 مليون ر.س",
    roi: "18%",
    stage: "معتمدة",
    updated: "منذ 3 أسبوع",
  },
];

export const intelligenceSidebarItems = [
  "النظرة التنفيذية",
  "الفرص الاستثمارية",
  "التحليل المكاني",
  "محرك الاستدلال",
  "استوديو القرار",
  "الجاهزية التنظيمية",
  "التقارير التنفيذية",
];
