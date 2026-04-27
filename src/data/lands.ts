export interface Land {
  id: string;
  name: string;
  neighborhood: string;
  location: string;
  area: number;
  price: number;
  season: string;
  seasonDates: string;
  status: "available" | "closed" | "reserved";
  type: string;
  activities: string[];
  activityIcons: string[];
  description: string;
  utilities: string[];
  soilType: string;
  images: string[];
  forasLink: string;
  seasonMonths?: number;
  profitabilityScore: number;
  feasibilityScore: number;
  competitionDensity: number;
  marketDemand: number;
  costLevel: number;
  activitySaturation: number;
  reviews: Review[];
  alerts: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  activityType: string;
}

const lands: Land[] = [
  {
    id: "L001",
    name: "أرض فعاليات الشتاء - حي النقرة",
    neighborhood: "حي النقرة",
    location: "حائل - حي النقرة، المنطقة التجارية",
    area: 1200,
    price: 12500,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "ترفيهي",
    activities: ["فعاليات ترفيهية", "كافيهات", "مطاعم"],
    activityIcons: ["🎪", "☕", "🍽️"],
    description: "أرض استثمارية موسمية في قلب حي النقرة التجاري، تتميز بموقعها الاستراتيجي بالقرب من المراكز التجارية الكبرى وحركة المرور العالية خلال موسم الشتاء. مجهزة بالكامل بالبنية التحتية اللازمة.",
    utilities: ["كهرباء", "ماء", "صرف صحي", "إنترنت"],
    soilType: "أرض مستوية مرصوفة",
    images: ["/lands/land1.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-winter-001",
    profitabilityScore: 85,
    feasibilityScore: 78,
    competitionDensity: 25,
    marketDemand: 90,
    costLevel: 40,
    activitySaturation: 20,
    reviews: [
      { id: "R1", name: "محمد العتيبي", rating: 5, comment: "موقع ممتاز وحركة زوار عالية جداً خلال موسم الشتاء، حققنا أرباحاً تفوق التوقعات.", date: "مارس ٢٠٢٥", activityType: "كافيه" },
      { id: "R2", name: "مطاعم الجبل الأحمر", rating: 4, comment: "الموقع استراتيجي والخدمات اللوجستية متوفرة. أنصح به للمطاعم والكافيهات.", date: "فبراير ٢٠٢٥", activityType: "مطعم" }
    ],
    alerts: ["منافسة منخفضة - فرصة مثالية", "طلب مرتفع في الموسم"]
  },
  {
    id: "L002",
    name: "موقع كافيه تلة - حي الجامعيين",
    neighborhood: "حي الجامعيين",
    location: "حائل - حي الجامعيين، طريق الجامعة",
    area: 450,
    price: 8000,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "تجاري",
    activities: ["كافيهات", "مقاهي مفتوحة"],
    activityIcons: ["☕", "🌿"],
    description: "موقع مميز على تلة مطلة على حي الجامعيين، يوفر منظراً بانورامياً رائعاً. مثالي لمشاريع الكافيهات والمقاهي المفتوحة التي تستهدف طلاب الجامعة والشباب.",
    utilities: ["كهرباء", "ماء", "إنترنت"],
    soilType: "أرض جبلية مستوية",
    images: ["/lands/land2.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-cafe-002",
    profitabilityScore: 72,
    feasibilityScore: 80,
    competitionDensity: 60,
    marketDemand: 75,
    costLevel: 30,
    activitySaturation: 55,
    reviews: [
      { id: "R3", name: "سلمى الشمري", rating: 4, comment: "المنظر رائع يجذب الزبائن، لكن المنافسة موجودة من كافيهات قريبة.", date: "يناير ٢٠٢٥", activityType: "كافيه" }
    ],
    alerts: ["منافسة متوسطة في المنطقة"]
  },
  {
    id: "L003",
    name: "أرض منتزه مشار الطبيعي",
    neighborhood: "حي مشار",
    location: "حائل - حي مشار، المنطقة الطبيعية",
    area: 2800,
    price: 15000,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "سياحي",
    activities: ["مخيمات فاخرة", "فعاليات ترفيهية", "مطاعم موسمية"],
    activityIcons: ["⛺", "🎭", "🍽️"],
    description: "أرض واسعة في منطقة مشار الطبيعية المعروفة بجمال طبيعتها الشتوية. تعد من أفضل المواقع السياحية في حائل، مما يجعلها مثالية للمخيمات الفاخرة وتجارب التخييم الراقية.",
    utilities: ["كهرباء", "ماء", "طريق معبد"],
    soilType: "أرض جبلية مستوية",
    images: ["/lands/land3.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-mashar-003",
    profitabilityScore: 90,
    feasibilityScore: 75,
    competitionDensity: 15,
    marketDemand: 95,
    costLevel: 55,
    activitySaturation: 10,
    reviews: [
      { id: "R4", name: "مخيمات حائل الفاخرة", rating: 4, comment: "تجهيز الموقع وإمكانية الوصول ممتازة. سهّلت الأمور كثيراً.", date: "مارس ٢٠٢٥", activityType: "مخيم فاخر" },
      { id: "R5", name: "فعاليات شمال الجزيرة", rating: 5, comment: "الموقع نادر وجميل، وإمكانية الوصول جعلتنا الأكثر مبيعاً في الموسم.", date: "مارس ٢٠٢٥", activityType: "فعاليات ترفيهية" }
    ],
    alerts: ["فرصة نادرة - منافسة منخفضة جداً", "أعلى طلب سياحي في حائل"]
  },
  {
    id: "L004",
    name: "مجمع السوق الشعبي - حي السلام",
    neighborhood: "حي السلام",
    location: "حائل - حي السلام، الشارع التجاري الرئيسي",
    area: 3500,
    price: 25000,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "تجاري",
    activities: ["أسواق شعبية", "ملابس", "مأكولات شعبية"],
    activityIcons: ["🛍️", "👗", "🥙"],
    description: "مجمع تجاري واسع في قلب حي السلام على الشارع التجاري الرئيسي. يتميز بكثافة مرور سكانية عالية ومناسب للأسواق الشعبية والمحلات التجارية المتنوعة.",
    utilities: ["كهرباء", "ماء", "صرف صحي", "مواقف سيارات"],
    soilType: "أرض مستوية مرصوفة",
    images: ["/lands/land4.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-market-004",
    profitabilityScore: 70,
    feasibilityScore: 65,
    competitionDensity: 75,
    marketDemand: 80,
    costLevel: 70,
    activitySaturation: 70,
    reviews: [
      { id: "R6", name: "عبدالله الرشيدي", rating: 3, comment: "موقع جيد لكن المنافسة شديدة من أسواق قريبة. يحتاج ميزانية تسويق عالية.", date: "فبراير ٢٠٢٥", activityType: "سوق شعبي" }
    ],
    alerts: ["منافسة عالية - يحتاج تميز واضح"]
  },
  {
    id: "L005",
    name: "ميدان الفعاليات الكبرى",
    neighborhood: "حي الجامعيين",
    location: "حائل - حي الجامعيين، ميدان المناسبات",
    area: 8500,
    price: 45000,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "مهرجانات",
    activities: ["مهرجانات", "فعاليات كبرى", "عروض ترفيهية"],
    activityIcons: ["🎡", "🎭", "🎆"],
    description: "أكبر ميدان للفعاليات في حائل، مجهز بالبنية التحتية الكاملة لاستقبال الفعاليات والمهرجانات الكبرى. تاريخ طويل في استضافة أبرز فعاليات الشتاء.",
    utilities: ["كهرباء صناعية", "ماء", "صرف صحي", "أنظمة إضاءة", "مواقف واسعة"],
    soilType: "أرض مستوية واسعة",
    images: ["/lands/land5.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-festival-005",
    profitabilityScore: 88,
    feasibilityScore: 70,
    competitionDensity: 10,
    marketDemand: 95,
    costLevel: 80,
    activitySaturation: 5,
    reviews: [
      { id: "R7", name: "ترفيه حائل الدولي", rating: 4, comment: "المكان المثالي للفعاليات الكبرى. الإقبال الجماهيري منقطع النظير في موسم الشتاء.", date: "مارس ٢٠٢٥", activityType: "مهرجان" }
    ],
    alerts: ["أكبر ميدان فعاليات في حائل", "احتياج رأس مال كبير"]
  },
  {
    id: "L006",
    name: "مساحة مطاعم سريعة - حي النقرة",
    neighborhood: "حي النقرة",
    location: "حائل - حي النقرة، شارع المطاعم",
    area: 150,
    price: 5500,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "مطاعم",
    activities: ["مطاعم سريعة", "وجبات خفيفة"],
    activityIcons: ["🍔", "🌮"],
    description: "مساحة صغيرة مثالية للمطاعم السريعة والأكشاك في منطقة حيوية بحي النقرة. تكلفة منخفضة مع حركة زوار كثيفة.",
    utilities: ["كهرباء", "ماء"],
    soilType: "أرض مستوية",
    images: ["/lands/land6.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-food-006",
    profitabilityScore: 75,
    feasibilityScore: 85,
    competitionDensity: 65,
    marketDemand: 85,
    costLevel: 25,
    activitySaturation: 60,
    reviews: [],
    alerts: ["تكلفة منخفضة - مناسب لأول مشروع"]
  },
  {
    id: "L007",
    name: "منطقة مخيمات فاخرة - حي المصيف",
    neighborhood: "حي المصيف",
    location: "حائل - حي المصيف، المنطقة السياحية",
    area: 2800,
    price: 18200,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "سياحي",
    activities: ["مخيمات فاخرة", "جلسات مفتوحة", "تجارب طبيعية"],
    activityIcons: ["⛺", "🏕️", "🌄"],
    description: "منطقة متميزة في حي المصيف السياحي، مثالية للمخيمات الفاخرة والجلسات المفتوحة. المنطقة تشهد إقبالاً سياحياً متناماً في السنوات الأخيرة.",
    utilities: ["كهرباء", "ماء", "طريق معبد"],
    soilType: "أرض جبلية مستوية",
    images: ["/lands/land7.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-camp-007",
    profitabilityScore: 82,
    feasibilityScore: 77,
    competitionDensity: 20,
    marketDemand: 88,
    costLevel: 45,
    activitySaturation: 15,
    reviews: [
      { id: "R8", name: "فهد الحربي", rating: 4, comment: "منطقة هادئة وجميلة، الزوار يعودون كل موسم. الطلب على المخيمات الفاخرة في تصاعد.", date: "يناير ٢٠٢٥", activityType: "مخيم فاخر" }
    ],
    alerts: ["نمو سياحي مستمر في المنطقة"]
  },
  {
    id: "L008",
    name: "أرض رقم ١٠٤ - منطقة المغواة",
    neighborhood: "حي المغواة",
    location: "حائل - حي المغواة، المنطقة الشمالية",
    area: 900,
    price: 9800,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "تجاري",
    activities: ["متاجر متنوعة", "خدمات", "مطاعم"],
    activityIcons: ["🏪", "🛠️", "🍽️"],
    description: "أرض تجارية متعددة الأغراض في المنطقة الشمالية من حائل. المنطقة في طور التطوير مما يمنح المستثمرين فرصة سبق استراتيجي.",
    utilities: ["كهرباء", "ماء", "صرف صحي"],
    soilType: "أرض مستوية",
    images: ["/lands/land8.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-maghwah-008",
    profitabilityScore: 65,
    feasibilityScore: 70,
    competitionDensity: 30,
    marketDemand: 65,
    costLevel: 35,
    activitySaturation: 25,
    reviews: [],
    alerts: ["منطقة في طور النمو - فرصة مبكرة"]
  },
  {
    id: "L009",
    name: "أرض مطلة على جبال أجا",
    neighborhood: "حي الجامعيين",
    location: "حائل - حي الجامعيين، المنطقة الشمالية",
    area: 5000,
    price: 45000,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "سياحي / ترفيهي",
    activities: ["مقاهي مفتوحة", "مطاعم موسمية", "فعاليات ترفيهية", "جلسات تأملية"],
    activityIcons: ["☕", "🍽️", "🎭", "🏔️"],
    description: "أرض استثنائية تتميز بإطلالتها البانورامية على جبال أجا التاريخية. تمثل نقطة استثمارية فريدة من نوعها في حائل حيث تجمع بين الجمال الطبيعي والموقع الاستراتيجي.",
    utilities: ["كهرباء", "ماء", "طريق معبد", "إنترنت"],
    soilType: "أرض جبلية مستوية",
    images: ["/lands/land9.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-aja-009",
    profitabilityScore: 92,
    feasibilityScore: 82,
    competitionDensity: 5,
    marketDemand: 97,
    costLevel: 65,
    activitySaturation: 5,
    reviews: [
      { id: "R9", name: "مطاعم أجا الجبلية", rating: 4, comment: "تجهيز الموقع والوصول إليه ممتاز. المنصة سهّلت علينا الكثير من الوقت والجهد.", date: "مارس ٢٠٢٥", activityType: "مطعم موسمي" },
      { id: "R10", name: "سياحة حائل الذكية", rating: 5, comment: "الموقع رائع وإطلالته جلبت لنا أكثر من الزوار المتوقعين. سنعود للموسم القادم.", date: "مارس ٢٠٢٥", activityType: "فعاليات ترفيهية" }
    ],
    alerts: ["أفضل إطلالة في حائل", "منافسة شبه معدومة"]
  },
  {
    id: "L010",
    name: "أرض حي عقدة - منطقة سياحية",
    neighborhood: "منطقة عقدة السياحية",
    location: "حائل - منطقة عقدة السياحية",
    area: 1800,
    price: 8000,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "ترافيهي",
    activities: ["تسوق وترفيه", "فعاليات عائلية"],
    activityIcons: ["🎠", "👨‍👩‍👧"],
    description: "أرض في المنطقة السياحية الجديدة بعقدة، تستهدف العائلات والزوار. منطقة حديثة التطوير مع بنية تحتية متكاملة.",
    utilities: ["كهرباء", "ماء", "صرف صحي"],
    soilType: "أرض مستوية",
    images: ["/lands/land10.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-uqdah-010",
    profitabilityScore: 68,
    feasibilityScore: 72,
    competitionDensity: 35,
    marketDemand: 70,
    costLevel: 30,
    activitySaturation: 30,
    reviews: [],
    alerts: ["منطقة حديثة التطوير"]
  },
  {
    id: "L011",
    name: "موقع طريق المغواة الرئيسي",
    neighborhood: "حي المغواة",
    location: "حائل - طريق المغواة الرئيسي",
    area: 600,
    price: 12500,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "reserved",
    type: "مطاعم",
    activities: ["مطاعم", "مطابخ سريعة"],
    activityIcons: ["🍽️", "🥗"],
    description: "موقع على الطريق الرئيسي بحي المغواة، مناسب للمطاعم والمطابخ الموسمية مع كثافة مرورية عالية.",
    utilities: ["كهرباء", "ماء"],
    soilType: "أرض مستوية مرصوفة",
    images: ["/lands/land11.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-maghwah-road-011",
    profitabilityScore: 74,
    feasibilityScore: 76,
    competitionDensity: 50,
    marketDemand: 80,
    costLevel: 40,
    activitySaturation: 45,
    reviews: [],
    alerts: []
  },
  {
    id: "L012",
    name: "ركن الحرف البدوية - وسط المدينة",
    neighborhood: "وسط المدينة",
    location: "حائل - وسط المدينة، شارع الثقافة",
    area: 400,
    price: 7200,
    season: "موسم الشتاء 1447",
    seasonDates: "١ نوفمبر ٢٠٢٥ - ٢٨ فبراير ٢٠٢٦",
    status: "available",
    type: "تراثي",
    activities: ["حرف يدوية", "منتجات بدوية", "تراث"],
    activityIcons: ["🏺", "🧶", "🎨"],
    description: "موقع مميز في وسط المدينة لعرض وبيع الحرف اليدوية والمنتجات البدوية الأصيلة. مثالي للمشاريع التراثية والسياحة الثقافية.",
    utilities: ["كهرباء", "ماء"],
    soilType: "أرض مستوية",
    images: ["/lands/land12.jpg"],
    forasLink: "https://foras.sa/opportunities/hail-heritage-012",
    profitabilityScore: 60,
    feasibilityScore: 68,
    competitionDensity: 20,
    marketDemand: 60,
    costLevel: 20,
    activitySaturation: 15,
    reviews: [
      { id: "R11", name: "هدى القحطاني", rating: 4, comment: "الزوار يقدّرون التجربة التراثية الأصيلة. دخل جيد خاصة من السياح.", date: "فبراير ٢٠٢٥", activityType: "حرف يدوية" }
    ],
    alerts: ["تجربة فريدة - منافسة قليلة"]
  }
];

export default lands;
