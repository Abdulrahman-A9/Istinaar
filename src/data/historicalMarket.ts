export interface HistoricalSeriesPoint {
  period: string;
  cafes: number;
  restaurants: number;
  retail: number;
  services: number;
  competitionIndex: number;
  demandIndex: number;
}

export interface NeighborhoodHistoricalMarket {
  neighborhood: string;
  highlight: string;
  dominantCategories: string[];
  businessDensity: {
    cafes: number;
    restaurants: number;
    retail: number;
    services: number;
  };
  trend: "up" | "stable" | "cautious";
  annualGrowth: number;
  series: HistoricalSeriesPoint[];
}

export const historicalMarketData: NeighborhoodHistoricalMarket[] = [
  {
    neighborhood: "حي النقرة",
    highlight: "أعلى كثافة طلب يومي مع نمو صحي في المطاعم والمقاهي.",
    dominantCategories: ["مطاعم", "كافيهات", "حلويات"],
    businessDensity: { cafes: 70, restaurants: 54, retail: 38, services: 21 },
    trend: "up",
    annualGrowth: 14,
    series: [
      { period: "2022", cafes: 51, restaurants: 39, retail: 31, services: 16, competitionIndex: 48, demandIndex: 68 },
      { period: "2023", cafes: 58, restaurants: 43, retail: 33, services: 18, competitionIndex: 52, demandIndex: 72 },
      { period: "2024", cafes: 64, restaurants: 49, retail: 35, services: 20, competitionIndex: 56, demandIndex: 77 },
      { period: "2025", cafes: 70, restaurants: 54, retail: 38, services: 21, competitionIndex: 59, demandIndex: 83 },
    ],
  },
  {
    neighborhood: "حي الجامعيين",
    highlight: "نمو قوي في الأنشطة السريعة والخدمات المرتبطة بالطلاب والموظفين.",
    dominantCategories: ["كافيهات", "مخابز", "خدمات سريعة"],
    businessDensity: { cafes: 25, restaurants: 18, retail: 16, services: 22 },
    trend: "up",
    annualGrowth: 11,
    series: [
      { period: "2022", cafes: 16, restaurants: 11, retail: 12, services: 15, competitionIndex: 33, demandIndex: 61 },
      { period: "2023", cafes: 19, restaurants: 13, retail: 13, services: 17, competitionIndex: 37, demandIndex: 66 },
      { period: "2024", cafes: 22, restaurants: 16, retail: 15, services: 20, competitionIndex: 42, demandIndex: 71 },
      { period: "2025", cafes: 25, restaurants: 18, retail: 16, services: 22, competitionIndex: 45, demandIndex: 76 },
    ],
  },
  {
    neighborhood: "حي مشار",
    highlight: "الوجهة السياحية الأسرع نمواً للمشاريع الموسمية وتجارب الوجهة.",
    dominantCategories: ["وجهات", "جلسات", "مطاعم موسمية"],
    businessDensity: { cafes: 14, restaurants: 12, retail: 7, services: 6 },
    trend: "up",
    annualGrowth: 18,
    series: [
      { period: "2022", cafes: 7, restaurants: 6, retail: 4, services: 3, competitionIndex: 14, demandIndex: 55 },
      { period: "2023", cafes: 9, restaurants: 8, retail: 5, services: 4, competitionIndex: 18, demandIndex: 64 },
      { period: "2024", cafes: 12, restaurants: 10, retail: 6, services: 5, competitionIndex: 23, demandIndex: 77 },
      { period: "2025", cafes: 14, restaurants: 12, retail: 7, services: 6, competitionIndex: 27, demandIndex: 88 },
    ],
  },
  {
    neighborhood: "حي المصيف",
    highlight: "حي متزن لعروض العائلات والوجهات الهادئة مع منافسة مقبولة.",
    dominantCategories: ["مطاعم عائلية", "جلسات", "كافيهات هادئة"],
    businessDensity: { cafes: 19, restaurants: 21, retail: 10, services: 8 },
    trend: "stable",
    annualGrowth: 9,
    series: [
      { period: "2022", cafes: 13, restaurants: 15, retail: 7, services: 6, competitionIndex: 25, demandIndex: 58 },
      { period: "2023", cafes: 15, restaurants: 17, retail: 8, services: 7, competitionIndex: 28, demandIndex: 63 },
      { period: "2024", cafes: 17, restaurants: 19, retail: 9, services: 8, competitionIndex: 30, demandIndex: 68 },
      { period: "2025", cafes: 19, restaurants: 21, retail: 10, services: 8, competitionIndex: 32, demandIndex: 72 },
    ],
  },
  {
    neighborhood: "وسط المدينة",
    highlight: "وضوح تجاري مرتفع لكن نمو أكثر حذراً بسبب التشبع.",
    dominantCategories: ["تجزئة", "هدايا", "كوفيات صغيرة"],
    businessDensity: { cafes: 33, restaurants: 27, retail: 49, services: 18 },
    trend: "cautious",
    annualGrowth: 5,
    series: [
      { period: "2022", cafes: 27, restaurants: 22, retail: 41, services: 16, competitionIndex: 58, demandIndex: 63 },
      { period: "2023", cafes: 29, restaurants: 24, retail: 44, services: 17, competitionIndex: 62, demandIndex: 65 },
      { period: "2024", cafes: 31, restaurants: 25, retail: 47, services: 18, competitionIndex: 66, demandIndex: 66 },
      { period: "2025", cafes: 33, restaurants: 27, retail: 49, services: 18, competitionIndex: 70, demandIndex: 67 },
    ],
  },
  {
    neighborhood: "حي المغواة",
    highlight: "حي عملي للمشاريع الاقتصادية والخدمية مع مساحة نمو مستقرة.",
    dominantCategories: ["خدمات", "متاجر حي", "مطاعم اقتصادية"],
    businessDensity: { cafes: 11, restaurants: 16, retail: 21, services: 19 },
    trend: "stable",
    annualGrowth: 7,
    series: [
      { period: "2022", cafes: 8, restaurants: 12, retail: 16, services: 14, competitionIndex: 21, demandIndex: 49 },
      { period: "2023", cafes: 9, restaurants: 13, retail: 18, services: 16, competitionIndex: 24, demandIndex: 53 },
      { period: "2024", cafes: 10, restaurants: 15, retail: 19, services: 17, competitionIndex: 27, demandIndex: 56 },
      { period: "2025", cafes: 11, restaurants: 16, retail: 21, services: 19, competitionIndex: 29, demandIndex: 60 },
    ],
  },
];

export function getHistoricalMarketByNeighborhood(neighborhood: string) {
  return historicalMarketData.find((item) => item.neighborhood === neighborhood);
}