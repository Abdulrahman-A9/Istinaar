export interface PartnerProfileData {
  id: string;
  accountId?: string;
  displayName: string;
  role: "investor" | "operator" | "specialist" | "developer";
  city: string;
  bio: string;
  investmentRange: string;
  interests: string[];
  expertise: string[];
  preferredSectors: string[];
  completedProjects: number;
  availability: "open" | "selective" | "committed";
  compatibilityScore: number;
}

export const partnerProfilesSeed: PartnerProfileData[] = [
  {
    id: "PART001",
    accountId: "USR001",
    displayName: "عبدالرحمن الشمري",
    role: "investor",
    city: "حائل",
    bio: "مستثمر يبحث عن فرص تشغيل وضيافة ومشاريع موسمية أو شبه موسمية في حائل.",
    investmentRange: "250,000 - 900,000 ريال",
    interests: ["مطاعم", "كافيهات", "وجهات موسمية"],
    expertise: ["تمويل", "إدارة شراكات", "تفاوض عقود"],
    preferredSectors: ["الضيافة", "التجزئة الخفيفة"],
    completedProjects: 4,
    availability: "open",
    compatibilityScore: 92,
  },
  {
    id: "PART002",
    accountId: "USR003",
    displayName: "سارة الدخيل",
    role: "specialist",
    city: "حائل",
    bio: "متخصصة في تحليل المواقع والواجهة التجارية ورفع ملاءمة القرار قبل التشغيل.",
    investmentRange: "مساهمة تشغيلية أو خبرات",
    interests: ["تحليل مواقع", "كافيهات", "مطاعم"],
    expertise: ["Site Selection", "Market Fit", "Concept Positioning"],
    preferredSectors: ["الضيافة", "الأحياء التجارية"],
    completedProjects: 11,
    availability: "selective",
    compatibilityScore: 88,
  },
  {
    id: "PART003",
    accountId: "USR002",
    displayName: "شركة المدار التشغيلي",
    role: "operator",
    city: "حائل",
    bio: "مشغل محلي يشارك في بناء وتشغيل مشاريع الخدمة السريعة والوجهات الصغيرة.",
    investmentRange: "150,000 - 450,000 ريال",
    interests: ["Drive-Thru", "حلويات", "مخابز"],
    expertise: ["تشغيل", "سلاسل إمداد", "جودة خدمة"],
    preferredSectors: ["الخدمة السريعة", "المخابز"],
    completedProjects: 7,
    availability: "open",
    compatibilityScore: 85,
  },
  {
    id: "PART004",
    displayName: "لولوة الحربي",
    role: "developer",
    city: "الرياض",
    bio: "تدعم تأسيس الهوية وتجربة العميل للمشاريع العائلية والوجهات عالية الزيارة.",
    investmentRange: "شريك خبرة + مساهمة محدودة",
    interests: ["وجهات عائلية", "علامات محلية", "هدايا وتجزئة"],
    expertise: ["Brand Experience", "UX", "Service Design"],
    preferredSectors: ["الوجهات", "التجزئة"],
    completedProjects: 9,
    availability: "selective",
    compatibilityScore: 81,
  },
];
