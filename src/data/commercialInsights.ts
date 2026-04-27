export interface NeighborhoodInsight {
  neighborhood: string;
  city: string;
  footfall: number;
  purchasingPower: number;
  visibility: number;
  accessibility: number;
  parkingEase: number;
  familyDensity: number;
  officeDensity: number;
  studentDensity: number;
  tourismPull: number;
  competition: number;
  seasonalStrength: number;
  averageRent: number;
  suitableFor: string[];
  competitorCategories: string[];
  knownCompetitors: Array<{
    name: string;
    category: string;
    strength: "high" | "medium" | "growing";
  }>;
  activityFit: Record<string, { demand: number; saturation: number; notes: string }>;
  notes: string;
}

export const neighborhoodInsights: NeighborhoodInsight[] = [
  {
    neighborhood: "حي الجامعيين",
    city: "حائل",
    footfall: 86,
    purchasingPower: 73,
    visibility: 85,
    accessibility: 88,
    parkingEase: 60,
    familyDensity: 58,
    officeDensity: 81,
    studentDensity: 93,
    tourismPull: 42,
    competition: 62,
    seasonalStrength: 68,
    averageRent: 18000,
    suitableFor: ["كافيه", "مطعم", "Drive-Thru", "حلويات", "مخبز"],
    competitorCategories: ["كافيهات سريعة", "حلويات", "وجبات خفيفة"],
    knownCompetitors: [
      { name: "ركن الجامعة", category: "كافيه", strength: "high" },
      { name: "مخبز المسار", category: "مخبز", strength: "medium" },
      { name: "بوابة الطلاب", category: "Drive-Thru", strength: "growing" },
    ],
    activityFit: {
      "كافيه": { demand: 86, saturation: 66, notes: "ينجح إذا كان التشغيل سريعاً والهوية واضحة." },
      "مطعم": { demand: 78, saturation: 59, notes: "الموقع مناسب للوجبات اليومية أكثر من الوجهات الطويلة." },
      "Drive-Thru": { demand: 90, saturation: 48, notes: "أفضل نماذج الحي هي الخدمة السريعة ذات وضوح الدخول والخروج." },
      "مخبز": { demand: 72, saturation: 44, notes: "جيد للخبز والقهوة الصباحية مع تسعير منضبط." },
    },
    notes: "حي سريع الحركة ويخدم شريحة طلابية ووظيفية مع طلب مرتفع على الخدمات السريعة.",
  },
  {
    neighborhood: "حي النقرة",
    city: "حائل",
    footfall: 91,
    purchasingPower: 78,
    visibility: 88,
    accessibility: 86,
    parkingEase: 68,
    familyDensity: 72,
    officeDensity: 69,
    studentDensity: 54,
    tourismPull: 61,
    competition: 58,
    seasonalStrength: 82,
    averageRent: 22000,
    suitableFor: ["كافيه", "مطعم", "مقهى عائلي", "موسمي", "ترفيهي"],
    competitorCategories: ["مطاعم عائلية", "كوفي متخصص", "حلويات"],
    knownCompetitors: [
      { name: "ساحة النقرة", category: "مطعم", strength: "high" },
      { name: "ركن الحلوى", category: "حلويات", strength: "medium" },
      { name: "كوفي الحي", category: "كافيه", strength: "growing" },
    ],
    activityFit: {
      "كافيه": { demand: 88, saturation: 57, notes: "قوي للمقاهي إذا كانت التجربة أوضح من المنافسين." },
      "مطعم": { demand: 85, saturation: 54, notes: "الطلب اليومي والعائلي قوي، لكن الجودة التشغيلية ضرورية." },
      "موسمي": { demand: 92, saturation: 40, notes: "الحي مناسب للمشاريع ذات الذروة الموسمية والفعاليات." },
      "وجهة عائلية": { demand: 83, saturation: 36, notes: "مناسب للمشاريع التي تعتمد على المكوث والزيارة المتكررة." },
    },
    notes: "حي قوي للطلب اليومي والموسمي، مناسب للمشاريع التي تحتاج تعرضاً عالياً وواجهة تجارية مباشرة.",
  },
  {
    neighborhood: "حي مشار",
    city: "حائل",
    footfall: 74,
    purchasingPower: 77,
    visibility: 71,
    accessibility: 73,
    parkingEase: 84,
    familyDensity: 69,
    officeDensity: 38,
    studentDensity: 27,
    tourismPull: 94,
    competition: 29,
    seasonalStrength: 93,
    averageRent: 14000,
    suitableFor: ["كافيه", "مخيم", "سياحي", "جلسات", "مطعم موسمي"],
    competitorCategories: ["وجهات سياحية", "مخيمات", "جلسات مفتوحة"],
    knownCompetitors: [
      { name: "مزار مشار", category: "جلسات", strength: "medium" },
      { name: "مخيم الروابي", category: "مخيم", strength: "growing" },
    ],
    activityFit: {
      "كافيه": { demand: 71, saturation: 29, notes: "يناسب الكافيهات التجريبية والهوية الوجهة أكثر من الطلب السريع." },
      "مطعم": { demand: 76, saturation: 26, notes: "مناسب للمطاعم ذات التجربة السياحية أو الخارجية." },
      "موسمي": { demand: 94, saturation: 18, notes: "أفضل أحياء حائل للأنشطة الموسمية المرتبطة بالوجهة." },
      "وجهة عائلية": { demand: 87, saturation: 22, notes: "قوي للزيارات العائلية الممتدة في عطلات نهاية الأسبوع." },
    },
    notes: "أفضلية قوية للمشاريع السياحية وتجارب الوجهات ذات الطابع المفتوح والموسمي.",
  },
  {
    neighborhood: "حي المصيف",
    city: "حائل",
    footfall: 69,
    purchasingPower: 82,
    visibility: 70,
    accessibility: 74,
    parkingEase: 79,
    familyDensity: 85,
    officeDensity: 35,
    studentDensity: 22,
    tourismPull: 73,
    competition: 32,
    seasonalStrength: 84,
    averageRent: 15000,
    suitableFor: ["كافيه", "مطعم", "جلسات", "سياحي"],
    competitorCategories: ["مطاعم عائلية", "جلسات", "كوفي هادئ"],
    knownCompetitors: [
      { name: "جلسات المصيف", category: "جلسات", strength: "medium" },
      { name: "كوفي النسيم", category: "كافيه", strength: "growing" },
    ],
    activityFit: {
      "كافيه": { demand: 74, saturation: 31, notes: "ممتاز للمقاهي الهادئة والعائلية أكثر من الخدمة السريعة." },
      "مطعم": { demand: 79, saturation: 34, notes: "مناسب للمطاعم التي تركز على الجلسات والراحة." },
      "وجهة عائلية": { demand: 88, saturation: 25, notes: "مناسب للوجهات التي تعتمد على تجربة متكاملة." },
    },
    notes: "حي جيد للمشاريع التي تستهدف العائلات والوجهات الهادئة بجودة تجربة أعلى.",
  },
  {
    neighborhood: "وسط المدينة",
    city: "حائل",
    footfall: 83,
    purchasingPower: 66,
    visibility: 89,
    accessibility: 90,
    parkingEase: 46,
    familyDensity: 57,
    officeDensity: 76,
    studentDensity: 48,
    tourismPull: 78,
    competition: 71,
    seasonalStrength: 60,
    averageRent: 16500,
    suitableFor: ["تجزئة", "كوفي", "مخبز", "تراثي", "هدايا"],
    competitorCategories: ["تجزئة", "حلويات", "كوفي", "هدايا"],
    knownCompetitors: [
      { name: "سوق المركز", category: "تجزئة", strength: "high" },
      { name: "مقهى البلد", category: "كوفي", strength: "high" },
      { name: "بيت الهدايا", category: "هدايا", strength: "medium" },
    ],
    activityFit: {
      "متجر": { demand: 84, saturation: 73, notes: "الحركة ممتازة لكن التميز البصري والسعري ضروري." },
      "كافيه": { demand: 71, saturation: 68, notes: "يناسب المقاهي الصغيرة أو المرتبطة بتجربة تراثية." },
      "مخبز": { demand: 76, saturation: 42, notes: "الخبز والحلويات السريعة يملكان فرصة جيدة صباحاً ومساءً." },
    },
    notes: "ممتاز للحركة والوضوح التجاري، لكن التشبع أعلى ويحتاج المشروع إلى تميز واضح.",
  },
  {
    neighborhood: "حي المغواة",
    city: "حائل",
    footfall: 63,
    purchasingPower: 64,
    visibility: 66,
    accessibility: 72,
    parkingEase: 82,
    familyDensity: 61,
    officeDensity: 44,
    studentDensity: 29,
    tourismPull: 33,
    competition: 34,
    seasonalStrength: 58,
    averageRent: 11000,
    suitableFor: ["مطعم", "متجر", "خدمات", "كوفي اقتصادي"],
    competitorCategories: ["خدمات", "مطاعم اقتصادية", "متاجر حي"],
    knownCompetitors: [
      { name: "مطعم السريع", category: "مطعم", strength: "medium" },
      { name: "تموينات المغواة", category: "متجر", strength: "high" },
    ],
    activityFit: {
      "مطعم": { demand: 67, saturation: 36, notes: "مناسب للمطاعم الاقتصادية والخدمة اليومية السريعة." },
      "متجر": { demand: 70, saturation: 34, notes: "قوي للمتاجر العملية والمتكررة الزيارة." },
      "اقتصادي": { demand: 74, saturation: 28, notes: "الحي ملائم للنماذج المنضبطة سعرياً أكثر من التجارب الفاخرة." },
      "مغسلة": { demand: 72, saturation: 21, notes: "الخدمات العملية تملك قابلية نمو جيدة في الحي." },
    },
    notes: "مناسب للمشاريع التشغيلية العملية أو النماذج الاقتصادية ذات التكاليف المنضبطة.",
  },
];