export interface OpportunityReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

export interface OpportunityTerm {
  label: string;
  value: string;
}

export interface OpportunityScenario {
  label: string;
  monthlyRevenue: number;
  monthlyProfit: number;
  note: string;
}

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  category: string;
  neighborhood: string;
  districtCluster: string;
  targetAudience: string[];
  businessModel: string;
  summary: string;
  officialSummary: string;
  areaRange: string;
  capexRange: string;
  operatingCostRange: string;
  roi: number;
  paybackMonths: number;
  profitabilityScore: number;
  feasibilityScore: number;
  marketDemand: number;
  competitionDensity: number;
  saturation: number;
  riskFactors: string[];
  strengths: string[];
  marketSignals: string[];
  applicationChecklist: string[];
  simplifiedTerms: OpportunityTerm[];
  scenarios: OpportunityScenario[];
  reviews: OpportunityReview[];
  forasUrl: string;
  featured: boolean;
}

export const opportunities: Opportunity[] = [
  {
    id: "OPP001",
    slug: "al-naqrah-drive-thru-cafe",
    title: "كوفي درايف ثرو على محور النقرة",
    category: "مقاهٍ ومشروبات",
    neighborhood: "حي النقرة",
    districtCluster: "المحور التجاري الشمالي",
    targetAudience: ["العائلات", "الموظفون", "السائقون"],
    businessModel: "Drive-Thru",
    summary: "فرصة على شارع نشط لعلامة قهوة سريعة تستفيد من المرور اليومي والطلب المسائي.",
    officialSummary: "تستهدف هذه الفرصة نموذج خدمة سريع بواجهة واضحة ومسار مركبات منظم على محور تجاري ذي حركة مرتفعة.",
    areaRange: "180 - 260 م²",
    capexRange: "420,000 - 560,000 ريال",
    operatingCostRange: "36,000 - 49,000 ريال/شهر",
    roi: 31,
    paybackMonths: 19,
    profitabilityScore: 86,
    feasibilityScore: 82,
    marketDemand: 89,
    competitionDensity: 52,
    saturation: 49,
    riskFactors: ["كثافة منافسة متوسطة", "حساسية عالية لسرعة الخدمة", "ارتفاع نسبي في تكلفة الواجهة"],
    strengths: ["طلب ثابت طوال الأسبوع", "وضوح بصري ممتاز", "قابلية عالية لعمليات الإضافة السريعة"],
    marketSignals: ["ارتفاع طلب المشروبات الباردة مساءً", "قوة الحركة على المحور بعد الدوام", "زيادة ملحوظة في الإنفاق العائلي نهاية الأسبوع"],
    applicationChecklist: ["تأكيد مخطط الدخول والخروج", "مراجعة عقد الإيجار", "تقدير الطاقة التشغيلية في ساعات الذروة"],
    simplifiedTerms: [
      { label: "الالتزامات الرئيسية", value: "تشغيل يومي، التزام بالهوية البصرية، وإدارة صف المركبات" },
      { label: "التكاليف", value: "إيجار متوسط مرتفع مع تجهيز واجهة ومعدات خدمة سريعة" },
      { label: "المخاطر", value: "التشبع النسبي وضرورة التميز بالسرعة والجودة" },
    ],
    scenarios: [
      { label: "أفضل حالة", monthlyRevenue: 168000, monthlyProfit: 61000, note: "تشغيل سريع مع معدل عودة قوي" },
      { label: "المتوسط", monthlyRevenue: 134000, monthlyProfit: 39000, note: "استقرار جيد مع صرف تسويقي محدود" },
      { label: "أسوأ حالة", monthlyRevenue: 102000, monthlyProfit: 16000, note: "بطء في بناء التميز أمام المنافسين" },
    ],
    reviews: [
      { id: "OR001", author: "شركة المحور الذهبي", rating: 5, title: "تنفيذ ممتاز للموقع", comment: "المنطقة مناسبة جداً لنموذج الدرايف ثرو إذا ضُبطت العمليات جيداً.", date: "فبراير ٢٠٢٦" },
      { id: "OR002", author: "مشعل الشمري", rating: 4, title: "فرصة قوية لكن تحتاج انضباط", comment: "السوق جيد لكن أي بطء تشغيلي ينعكس مباشرة على التجربة.", date: "يناير ٢٠٢٦" },
    ],
    forasUrl: "https://foras.sa/opportunities/hail-smart-opp-001",
    featured: true,
  },
  {
    id: "OPP002",
    slug: "al-jamieen-bakery-lab",
    title: "مخبز وحلويات سريع قرب الجامعيين",
    category: "مخابز وحلويات",
    neighborhood: "حي الجامعيين",
    districtCluster: "شريط الجامعة",
    targetAudience: ["الطلاب", "الموظفون", "سكان الحي"],
    businessModel: "Economy Counter",
    summary: "فرصة لمخبز حديث وحلويات خفيفة تستهدف الطلب الصباحي والمسائي السريع.",
    officialSummary: "يتناسب الموقع مع مشروع منخفض إلى متوسط التكاليف يركز على البيع السريع والمنتجات اليومية المتكررة.",
    areaRange: "110 - 170 م²",
    capexRange: "210,000 - 320,000 ريال",
    operatingCostRange: "24,000 - 31,000 ريال/شهر",
    roi: 27,
    paybackMonths: 21,
    profitabilityScore: 79,
    feasibilityScore: 84,
    marketDemand: 82,
    competitionDensity: 44,
    saturation: 38,
    riskFactors: ["تذبذب الطلب خارج أوقات الذروة", "اعتماد واضح على التسعير", "حاجة إلى جودة إنتاج ثابتة"],
    strengths: ["رأس مال متوسط", "دورية شراء عالية", "ملائمة جيدة للحي"],
    marketSignals: ["إقبال صباحي قوي", "تفضيل واضح للطلبات السريعة", "قابلية جيدة لدمج القهوة مع المخبوزات"],
    applicationChecklist: ["حساب الطاقة الإنتاجية اليومية", "تحديد الموردين الأساسيين", "اعتماد خطة هوية بسيطة وواضحة"],
    simplifiedTerms: [
      { label: "الالتزامات الرئيسية", value: "تشغيل يومي مبكر، ضبط جودة، وتدفق مخزون سريع" },
      { label: "التكاليف", value: "معدات مخبز أساسية وتشطيب بسيط وواجهة عملية" },
      { label: "المخاطر", value: "ضغط سعري واحتياج مستمر للثبات في الجودة" },
    ],
    scenarios: [
      { label: "أفضل حالة", monthlyRevenue: 112000, monthlyProfit: 36000, note: "نجاح قوي في الفترة الصباحية" },
      { label: "المتوسط", monthlyRevenue: 91000, monthlyProfit: 25000, note: "استقرار جيد مع طلب ثابت" },
      { label: "أسوأ حالة", monthlyRevenue: 69000, monthlyProfit: 9000, note: "حساسية مرتفعة لأي ضعف في الجودة" },
    ],
    reviews: [
      { id: "OR003", author: "سارة الحمد", rating: 4, title: "مناسب جداً لمنتج يومي", comment: "الموقع عملي ومناسب للمخبوزات والقهوة السريعة.", date: "مارس ٢٠٢٦" },
    ],
    forasUrl: "https://foras.sa/opportunities/hail-smart-opp-002",
    featured: false,
  },
  {
    id: "OPP003",
    slug: "mashar-seasonal-family-destination",
    title: "وجهة عائلية موسمية في مشار",
    category: "وجهات وتجارب",
    neighborhood: "حي مشار",
    districtCluster: "المنطقة السياحية",
    targetAudience: ["العائلات", "الزوار الموسميون", "السياح"],
    businessModel: "Destination Venue",
    summary: "تجربة موسمية تجمع جلسات خارجية وخدمات ضيافة خفيفة في منطقة ذات سحب سياحي مرتفع.",
    officialSummary: "فرصة مناسبة للمستثمر الذي يبحث عن منتج موسمي قوي التأثير وبقيمة وجهة واضحة خلال موسم حائل.",
    areaRange: "900 - 1500 م²",
    capexRange: "650,000 - 980,000 ريال",
    operatingCostRange: "54,000 - 79,000 ريال/شهر",
    roi: 34,
    paybackMonths: 17,
    profitabilityScore: 91,
    feasibilityScore: 76,
    marketDemand: 94,
    competitionDensity: 24,
    saturation: 19,
    riskFactors: ["موسمية قوية", "اعتماد على جودة التجربة", "حاجة إلى إدارة ميدانية متماسكة"],
    strengths: ["منافسة منخفضة", "سحب سياحي مرتفع", "قابلية عالية للتسعير المتميز"],
    marketSignals: ["نمو مستمر في زيارات نهاية الأسبوع", "استعداد عالٍ للإنفاق على التجربة", "انخفاض نسبي في التشبع"],
    applicationChecklist: ["اعتماد مخطط التشغيل الموسمي", "تأكيد خدمات المواقف والتنظيم", "مراجعة تصاريح الفعاليات المساندة"],
    simplifiedTerms: [
      { label: "الالتزامات الرئيسية", value: "تشغيل موسمي منظم، عناصر تجربة واضحة، وإدارة مواقع ميدانية" },
      { label: "التكاليف", value: "تجهيزات خارجية، جلسات، عناصر ضيافة، وحلول لوجستية موسمية" },
      { label: "المخاطر", value: "الاعتماد على الموسم والتنفيذ التجريبي الكامل" },
    ],
    scenarios: [
      { label: "أفضل حالة", monthlyRevenue: 240000, monthlyProfit: 87000, note: "زخم مرتفع مع تسعير جيد للتجربة" },
      { label: "المتوسط", monthlyRevenue: 198000, monthlyProfit: 62000, note: "إشغال جيد مع إنفاق عائلي مستقر" },
      { label: "أسوأ حالة", monthlyRevenue: 142000, monthlyProfit: 18000, note: "تأثر بالحضور أو تقلبات الطقس" },
    ],
    reviews: [
      { id: "OR004", author: "شركة الجبلين", rating: 5, title: "أفضلية واضحة للموقع", comment: "الموقع من أقوى مواقع الوجهات الموسمية إذا تم تقديم تجربة مقنعة.", date: "فبراير ٢٠٢٦" },
    ],
    forasUrl: "https://foras.sa/opportunities/hail-smart-opp-003",
    featured: true,
  },
  {
    id: "OPP004",
    slug: "downtown-heritage-gifts",
    title: "متجر هدايا ومنتجات تراثية بوسط المدينة",
    category: "تجزئة وتراث",
    neighborhood: "وسط المدينة",
    districtCluster: "النطاق التاريخي",
    targetAudience: ["السياح", "الزوار", "المشترون الموسميون"],
    businessModel: "Boutique Retail",
    summary: "فرصة لتجزئة خفيفة مرتبطة بالهوية المحلية والشراء السريع في مركز المدينة.",
    officialSummary: "تلائم هذه الفرصة المستثمر الباحث عن مشروع تجزئة بهوية محلية في موقع عالي الوضوح لكن أكثر تشبعاً.",
    areaRange: "90 - 140 م²",
    capexRange: "180,000 - 260,000 ريال",
    operatingCostRange: "19,000 - 27,000 ريال/شهر",
    roi: 22,
    paybackMonths: 25,
    profitabilityScore: 71,
    feasibilityScore: 77,
    marketDemand: 74,
    competitionDensity: 67,
    saturation: 71,
    riskFactors: ["تشبع مرتفع", "حاجة قوية للتميز البصري", "تأثر سريع بالحركة السياحية"],
    strengths: ["وضوح تجاري ممتاز", "قابلية جيدة لهدايا وتراث", "رأس مال أقل من الوجهات"],
    marketSignals: ["زيادة الشراء التذكاري بالمواسم", "وضوح مرتفع للمارة", "فرصة جيدة للتغليف والهوية التراثية"],
    applicationChecklist: ["اعتماد هوية تجارية واضحة", "تجهيز واجهة عالية الوضوح", "تحديد توليفة المنتجات الرئيسية"],
    simplifiedTerms: [
      { label: "الالتزامات الرئيسية", value: "تشغيل يومي، عناية بالعرض، وتجديد مستمر للمنتجات" },
      { label: "التكاليف", value: "تشطيب متوسط، مخزون افتتاحي، وهوية عرض قوية" },
      { label: "المخاطر", value: "تشبع واضح واعتماد على عنصر التميز والانتقاء" },
    ],
    scenarios: [
      { label: "أفضل حالة", monthlyRevenue: 86000, monthlyProfit: 24000, note: "نجاح موسمي عالي مع منتجات مميزة" },
      { label: "المتوسط", monthlyRevenue: 68000, monthlyProfit: 15000, note: "مبيعات مستقرة مع إنفاق سياحي متوسط" },
      { label: "أسوأ حالة", monthlyRevenue: 49000, monthlyProfit: 3000, note: "تراجع في قوة العرض أو وضوح الهوية" },
    ],
    reviews: [
      { id: "OR005", author: "هدى القحطاني", rating: 4, title: "ينجح إذا كانت الهوية أصيلة", comment: "التجربة التراثية المصاغة جيداً هي العامل الفارق في هذا النوع.", date: "يناير ٢٠٢٦" },
    ],
    forasUrl: "https://foras.sa/opportunities/hail-smart-opp-004",
    featured: false,
  },
  {
    id: "OPP005",
    slug: "al-musayf-family-restaurant",
    title: "مطعم عائلي هادئ في المصيف",
    category: "مطاعم",
    neighborhood: "حي المصيف",
    districtCluster: "الوجهات العائلية",
    targetAudience: ["العائلات", "الزوار", "سكان الحي"],
    businessModel: "Family Dining",
    summary: "مطعم يستند إلى الجلسات المريحة والخدمة العائلية في حي منخفض التشبع نسبياً.",
    officialSummary: "تتلاءم الفرصة مع مستثمر يبحث عن مشروع متوسط إلى قوي يعتمد على الجلسات والتجربة أكثر من السرعة.",
    areaRange: "260 - 380 م²",
    capexRange: "520,000 - 710,000 ريال",
    operatingCostRange: "38,000 - 52,000 ريال/شهر",
    roi: 29,
    paybackMonths: 20,
    profitabilityScore: 83,
    feasibilityScore: 80,
    marketDemand: 84,
    competitionDensity: 35,
    saturation: 33,
    riskFactors: ["حساسية لتجربة الخدمة", "احتياج واضح للهوية الغذائية", "تكاليف تجهيز أعلى من النماذج السريعة"],
    strengths: ["ملاءمة قوية للعائلات", "تشبع أقل", "قوة جيدة للزيارات المتكررة"],
    marketSignals: ["إقبال عائلي نهاية الأسبوع", "زيادة الطلب على الجلسات المريحة", "تقبل واضح للإنفاق المتوسط إلى المرتفع"],
    applicationChecklist: ["تحديد المساحات العائلية", "حساب الطاقة التشغيلية للمطبخ", "مراجعة دراسة المنيو والتسعير"],
    simplifiedTerms: [
      { label: "الالتزامات الرئيسية", value: "خدمة عائلية مستقرة، جودة مطبخ، وإدارة وقت انتظار" },
      { label: "التكاليف", value: "مطبخ وتجهيزات وجلسات وتشطيب أقوى من النماذج السريعة" },
      { label: "المخاطر", value: "أي ضعف في التجربة ينعكس سريعاً على التقييمات" },
    ],
    scenarios: [
      { label: "أفضل حالة", monthlyRevenue: 176000, monthlyProfit: 53000, note: "إشغال عالٍ مع تجربة أسرية مميزة" },
      { label: "المتوسط", monthlyRevenue: 142000, monthlyProfit: 35000, note: "أداء جيد مع تشغيل منضبط" },
      { label: "أسوأ حالة", monthlyRevenue: 108000, monthlyProfit: 11000, note: "تأثر بضعف الخدمة أو المنيو" },
    ],
    reviews: [
      { id: "OR006", author: "شركة دار الجلسات", rating: 5, title: "فرصة مطعم عائلي ناضجة", comment: "المصيف من أفضل الأحياء للمشاريع التي تعتمد على الجلسات والزيارة المتكررة.", date: "مارس ٢٠٢٦" },
    ],
    forasUrl: "https://foras.sa/opportunities/hail-smart-opp-005",
    featured: true,
  },
  {
    id: "OPP006",
    slug: "al-maghwah-neighborhood-laundry",
    title: "مغسلة ذكية في المغواة",
    category: "خدمات",
    neighborhood: "حي المغواة",
    districtCluster: "الخدمات اليومية",
    targetAudience: ["سكان الحي", "العزاب", "الأسر الصغيرة"],
    businessModel: "Service Utility",
    summary: "فرصة تشغيلية خدمية بتكاليف منضبطة ومنافسة أقل من الأنشطة الاستهلاكية العالية.",
    officialSummary: "فرصة عملية منخفضة نسبياً في التشبع، مناسبة لمن يبحث عن نموذج تشغيلي مستقر يخدم الطلب اليومي المتكرر.",
    areaRange: "80 - 120 م²",
    capexRange: "130,000 - 210,000 ريال",
    operatingCostRange: "16,000 - 22,000 ريال/شهر",
    roi: 23,
    paybackMonths: 26,
    profitabilityScore: 68,
    feasibilityScore: 81,
    marketDemand: 71,
    competitionDensity: 26,
    saturation: 21,
    riskFactors: ["حساسية للتشغيل اليومي", "هامش ربح أقل من الضيافة", "اعتماد كبير على السمعة المحلية"],
    strengths: ["تشبع منخفض", "طلب يومي متكرر", "رأس مال أولي منخفض نسبياً"],
    marketSignals: ["نمو في الطلب على الخدمات العملية", "قبول جيد للنماذج الاقتصادية", "فرصة للتوسع عبر الاشتراكات"],
    applicationChecklist: ["تقدير الأجهزة والطاقة", "مراجعة تكاليف العمالة", "بناء خطة اشتراكات أو عروض دورية"],
    simplifiedTerms: [
      { label: "الالتزامات الرئيسية", value: "تشغيل يومي، جودة خدمة، وانضباط مواعيد التسليم" },
      { label: "التكاليف", value: "معدات تشغيل، محل عملي، ورواتب تشغيلية" },
      { label: "المخاطر", value: "أثر سريع للسمعة والخدمة على التكرار" },
    ],
    scenarios: [
      { label: "أفضل حالة", monthlyRevenue: 58000, monthlyProfit: 17000, note: "نجاح جيد مع اشتراكات حي" },
      { label: "المتوسط", monthlyRevenue: 47000, monthlyProfit: 11000, note: "تشغيل مستقر دون توسع كبير" },
      { label: "أسوأ حالة", monthlyRevenue: 35000, monthlyProfit: 2500, note: "تأثر بالسمعة أو ارتفاع التكاليف" },
    ],
    reviews: [
      { id: "OR007", author: "فهد المطير", rating: 4, title: "خدمة عملية ومجدية", comment: "ليست الأكثر لمعاناً بصرياً لكنها من الفرص التشغيلية الجيدة.", date: "فبراير ٢٠٢٦" },
    ],
    forasUrl: "https://foras.sa/opportunities/hail-smart-opp-006",
    featured: false,
  },
  {
    id: "OPP007",
    slug: "al-naqrah-dessert-kiosk",
    title: "كشك حلويات متنقل في النقرة",
    category: "حلويات سريعة",
    neighborhood: "حي النقرة",
    districtCluster: "الممرات الحيوية",
    targetAudience: ["الشباب", "العائلات", "زوار الأمسيات"],
    businessModel: "Kiosk",
    summary: "فرصة خفيفة لتشغيل كشك حلويات أو مشروبات صغيرة في موقع مرتفع الحركة.",
    officialSummary: "تناسب المستثمر المبتدئ أو المشروع الثانوي الذي يحتاج رأس مال أقل وسرعة إطلاق أعلى.",
    areaRange: "35 - 60 م²",
    capexRange: "95,000 - 145,000 ريال",
    operatingCostRange: "11,000 - 17,000 ريال/شهر",
    roi: 26,
    paybackMonths: 18,
    profitabilityScore: 74,
    feasibilityScore: 88,
    marketDemand: 81,
    competitionDensity: 47,
    saturation: 43,
    riskFactors: ["حساسية كبيرة للموقع الدقيق", "تأثر بالطقس", "منافسة عالية على المنتجات السريعة"],
    strengths: ["إطلاق سريع", "رأس مال منخفض", "اختبار سوق جيد قبل التوسع"],
    marketSignals: ["حركة أمسيات نشطة", "ميل واضح للشراء السريع", "قابلية جيدة للمنتجات الموسمية"],
    applicationChecklist: ["تحديد نقطة التمركز", "تصميم عرض سريع واضح", "ضبط خطوط الإمداد اليومية"],
    simplifiedTerms: [
      { label: "الالتزامات الرئيسية", value: "تشغيل مرن وسريع ومراقبة مستمرة للجودة" },
      { label: "التكاليف", value: "وحدة بيع وتجهيزات خفيفة ومواد تشغيل يومية" },
      { label: "المخاطر", value: "تغير الإقبال بسرعة مع المنافسة أو الطقس" },
    ],
    scenarios: [
      { label: "أفضل حالة", monthlyRevenue: 73000, monthlyProfit: 25000, note: "اختيار نقطة قوية وتنفيذ بصري جيد" },
      { label: "المتوسط", monthlyRevenue: 56000, monthlyProfit: 15000, note: "استقرار جيد مع حركة مساء" },
      { label: "أسوأ حالة", monthlyRevenue: 38000, monthlyProfit: 4500, note: "اختيار نقطة ضعيفة أو ازدحام منافسين" },
    ],
    reviews: [
      { id: "OR008", author: "نورة العبدالله", rating: 4, title: "خيار جيد للبداية", comment: "يناسب من يريد دخول السوق بسرعة واختبار المنتج.", date: "مارس ٢٠٢٦" },
    ],
    forasUrl: "https://foras.sa/opportunities/hail-smart-opp-007",
    featured: false,
  },
  {
    id: "OPP008",
    slug: "jameen-health-clinic-lite",
    title: "عيادة سريعة متخصصة قرب الجامعيين",
    category: "صحة وخدمات",
    neighborhood: "حي الجامعيين",
    districtCluster: "الامتداد الخدمي",
    targetAudience: ["الطلاب", "الموظفون", "السكان"],
    businessModel: "Specialty Clinic",
    summary: "نموذج عيادة خفيفة في تخصص سريع الطلب ضمن حي ذي وصول مرتفع.",
    officialSummary: "فرصة خدمية مهنية تحتاج تشغيلاً منضبطاً لكنها تستفيد من الكثافة الوظيفية والطلابية في الحي.",
    areaRange: "140 - 220 م²",
    capexRange: "480,000 - 690,000 ريال",
    operatingCostRange: "42,000 - 58,000 ريال/شهر",
    roi: 24,
    paybackMonths: 28,
    profitabilityScore: 73,
    feasibilityScore: 72,
    marketDemand: 77,
    competitionDensity: 39,
    saturation: 35,
    riskFactors: ["متطلبات تشغيلية وتنظيمية", "حساسية للكوادر", "زمن أطول للوصول للاستقرار"],
    strengths: ["خدمة مستقرة الطلب", "وضوح جيد للموقع", "قابلية للسمعة المتراكمة"],
    marketSignals: ["طلب متزايد على الخدمات المتخصصة الخفيفة", "قرب من شريحة شبابية ووظيفية", "فرصة لتشغيل ساعات ممتدة"],
    applicationChecklist: ["مراجعة المتطلبات النظامية", "خطة تشغيل الكادر", "تحليل التخصص الأدق داخل الحي"],
    simplifiedTerms: [
      { label: "الالتزامات الرئيسية", value: "التزام تنظيمي وتشغيلي وكادر مهني" },
      { label: "التكاليف", value: "تجهيز طبي وتشطيب أعلى نسبياً من التجزئة" },
      { label: "المخاطر", value: "اعتماد أكبر على التخصص والكفاءة والسمعة" },
    ],
    scenarios: [
      { label: "أفضل حالة", monthlyRevenue: 148000, monthlyProfit: 34000, note: "تخصص مناسب وتشغيل جيد" },
      { label: "المتوسط", monthlyRevenue: 121000, monthlyProfit: 21000, note: "استقرار تدريجي في الحجوزات" },
      { label: "أسوأ حالة", monthlyRevenue: 92000, monthlyProfit: 4000, note: "تباطؤ اكتساب العملاء" },
    ],
    reviews: [
      { id: "OR009", author: "مستشار القطاع الصحي", rating: 4, title: "خيار ناضج لكن يحتاج تخصصاً دقيقاً", comment: "مناسب إذا تم اختيار التخصص وفق فجوة فعلية في الحي.", date: "يناير ٢٠٢٦" },
    ],
    forasUrl: "https://foras.sa/opportunities/hail-smart-opp-008",
    featured: false,
  }
];

export function getOpportunityBySlug(slug: string) {
  return opportunities.find((opportunity) => opportunity.slug === slug);
}

export function getOpportunityById(id: string) {
  return opportunities.find((opportunity) => opportunity.id === id);
}