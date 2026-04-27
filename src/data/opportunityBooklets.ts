import { getOpportunityById, opportunities, type Opportunity } from "@/data/opportunities";

export interface BookletReferenceItem {
  label: string;
  detail: string;
  sourcePage: string;
}

export interface OpportunityBookletSection {
  id: string;
  title: string;
  pageRange: string;
  overview: string;
  items: BookletReferenceItem[];
}

export interface OpportunityBookletAlert {
  title: string;
  detail: string;
  severity: "high" | "medium" | "info";
  sourcePage: string;
}

export interface OpportunityBookletFaq {
  question: string;
  answer: string;
  sourcePage: string;
}

export interface OpportunityBookletTerm {
  term: string;
  explanation: string;
}

export interface OpportunityBookletChecklist {
  beforeSubmission: string[];
  duringSubmission: string[];
  afterAward: string[];
}

export interface OpportunityBooklet {
  opportunityId: string;
  referenceCode: string;
  pageCount: number;
  issueDate: string;
  submissionDeadline: string;
  competitionType: string;
  initialGuarantee: string;
  finalGuarantee: string;
  contractDuration: string;
  operationWindow: string;
  executiveSummary: string;
  readinessSummary: string;
  suitableFor: string[];
  cautionFor: string[];
  sections: OpportunityBookletSection[];
  alerts: OpportunityBookletAlert[];
  checklist: OpportunityBookletChecklist;
  glossary: OpportunityBookletTerm[];
  faq: OpportunityBookletFaq[];
}

interface BookletConfig {
  referenceCode: string;
  pageCount: number;
  issueDate: string;
  submissionDeadline: string;
  competitionType: string;
  initialGuarantee: string;
  finalGuarantee: string;
  contractDuration: string;
  operationWindow: string;
  executiveSummary: string;
  readinessSummary: string;
  suitableFor: string[];
  cautionFor: string[];
  legalRequirements: string[];
  operatingRequirements: string[];
  deliverables: string[];
  paymentTerms: string[];
  timelineNotes: string[];
  alerts: OpportunityBookletAlert[];
  faq: OpportunityBookletFaq[];
}

const bookletGlossary: OpportunityBookletTerm[] = [
  {
    term: "كراسة الشروط والمواصفات",
    explanation: "الوثيقة المرجعية الرسمية التي تحدد النطاق، الشروط، المتطلبات، وآلية المنافسة، وهي المرجع المعتمد عند أي تعارض.",
  },
  {
    term: "الضمان الابتدائي",
    explanation: "مبلغ أو ضمان بنكي يرفق مع العرض لإثبات الجدية، ويؤدي غيابه عادة إلى استبعاد العرض شكلياً.",
  },
  {
    term: "الضمان النهائي",
    explanation: "ضمان يقدم بعد الترسية لتأكيد الالتزام بتنفيذ العقد والتشغيل وفق الأحكام التعاقدية.",
  },
  {
    term: "العرض الفني",
    explanation: "الجزء الذي يشرح قدرة المستثمر على التنفيذ والتشغيل وجودة الحل التشغيلي المقترح.",
  },
  {
    term: "العرض المالي",
    explanation: "الجزء الذي يتضمن المقابل المالي أو عناصر التسعير وفق النموذج المعتمد في المنافسة.",
  },
  {
    term: "الترسية",
    explanation: "قرار اعتماد الفائز بعد اكتمال التقييم الفني والمالي والتحقق من الوثائق النظامية.",
  },
];

const bookletConfigs: Record<string, BookletConfig> = {
  OPP001: {
    referenceCode: "HAIL-INV-2026-014",
    pageCount: 52,
    issueDate: "15 فبراير 2026",
    submissionDeadline: "30 أبريل 2026",
    competitionType: "منافسة عامة عبر منصة فرص",
    initialGuarantee: "50,000 ريال",
    finalGuarantee: "5% من القيمة التعاقدية",
    contractDuration: "5 سنوات قابلة للتجديد وفق التقييم",
    operationWindow: "تشغيل يومي من 6 صباحاً إلى 1 صباحاً",
    executiveSummary: "الكراسة تطرح موقعاً عالي الحركة لمشروع خدمة سريعة يتطلب انضباطاً تشغيلياً ومخطط حركة واضح للمركبات، مع تركيز مرتفع على جودة الواجهة وسرعة الخدمة أكثر من اتساع المساحة.",
    readinessSummary: "مناسبة لمشغل لديه خبرة تشغيلية سريعة أو علامة قائمة، وأقل ملاءمة لمن يدخل السوق لأول مرة دون شريك تشغيلي.",
    suitableFor: ["العلامات التشغيلية الجاهزة", "الشركاء ذوي الخبرة في الضيافة السريعة", "المستثمر الذي يملك فريق تشغيل يومي"],
    cautionFor: ["المستثمر المبتدئ دون مشغل", "من لا يستطيع تمويل تجهيز الواجهة", "من لا يملك خطة ذروة واضحة"],
    legalRequirements: ["سجل تجاري بنشاط مناسب لخدمات الأغذية والمشروبات", "رفع الضمان الابتدائي قبل إغلاق المنافسة", "الالتزام بالاشتراطات البلدية والصحية وهوية الواجهة"],
    operatingRequirements: ["اعتماد مسار دخول وخروج للمركبات", "خطة تشغيل ساعات الذروة ونظام الطلبات", "خطة صيانة يومية للواجهة ومنطقة الخدمة"],
    deliverables: ["مخطط تشغيل تفصيلي", "تصور هندسي للواجهة والممر", "خطة تجربة عميل وزمن خدمة مستهدف"],
    paymentTerms: ["سداد المقابل وفق الجدول التعاقدي المعتمد", "تحمل تكاليف التجهيز الأولي والربط الخدمي", "الالتزام بتكاليف الصيانة والنظافة التشغيلية"],
    timelineNotes: ["فترة استفسارات قبل الإغلاق بعشرة أيام", "اعتماد المعاينة الميدانية للموقع", "بدء التجهيز خلال 45 يوماً من الترسية"],
    alerts: [
      { title: "حساسية زمن الخدمة", detail: "الكراسة تعتبر بطء الخدمة أو عرقلة الحركة التشغيلية مؤشراً جوهرياً على ضعف العرض الفني.", severity: "high", sourcePage: "ص 18" },
      { title: "التزام واجهة الموقع", detail: "أي تغيير غير معتمد في تصميم الواجهة أو المسار قد يستدعي إعادة اعتماد قبل الافتتاح.", severity: "medium", sourcePage: "ص 27" },
      { title: "وزن العنصر التشغيلي", detail: "نقاط التقييم الفني ترتفع لصالح من يثبت خبرة أو نموذج تشغيل سريع قائم.", severity: "info", sourcePage: "ص 34" },
    ],
    faq: [
      { question: "هل يمكن التقديم بشركة جديدة؟", answer: "نعم إذا كانت الوثائق النظامية مكتملة قبل الإغلاق وتدعم أهلية النشاط محل الطرح.", sourcePage: "ص 12" },
      { question: "هل يسمح بإضافة قناة طلب رقمية؟", answer: "يسمح بذلك إذا لم تؤثر على الضوابط المرورية أو الواجهة المعتمدة للموقع.", sourcePage: "ص 26" },
    ],
  },
  OPP002: {
    referenceCode: "HAIL-INV-2026-021",
    pageCount: 45,
    issueDate: "20 فبراير 2026",
    submissionDeadline: "12 مايو 2026",
    competitionType: "منافسة عامة مبسطة",
    initialGuarantee: "25,000 ريال",
    finalGuarantee: "5% من القيمة التعاقدية",
    contractDuration: "4 سنوات",
    operationWindow: "تشغيل يومي يبدأ من 5:30 صباحاً",
    executiveSummary: "هذه الكراسة أخف من حيث الالتزامات الرأسمالية، لكنها تشدد على استدامة الجودة والقدرة الإنتاجية اليومية أكثر من التميز البصري الكبير.",
    readinessSummary: "مناسبة للمستثمر المتوسط أو المبتدئ المدعوم بمشغل خبز واضح، وتتطلب ضبط جودة واستمرارية إمداد أكثر من حاجتها إلى رأس مال ضخم.",
    suitableFor: ["مشغل مخابز خفيفة", "مستثمر يريد مشروعاً يومياً متكرر الطلب", "من لديه موردون واضحون للمواد الخام"],
    cautionFor: ["من يعتمد كلياً على موسمية الطلب", "من لا يملك قدرة على التشغيل الصباحي المبكر"],
    legalRequirements: ["إثبات أهلية النشاط الغذائي", "الالتزام باشتراطات السلامة الغذائية والتخزين", "تقديم السجل والوثائق النظامية قبل الإغلاق"],
    operatingRequirements: ["خطة إنتاج صباحي واضحة", "ضبط الطاقة الإنتاجية اليومية", "إدارة مخزون سريعة للمواد الأساسية"],
    deliverables: ["خطة تشغيل وإنتاج", "جدول توريد المواد", "تصور الخدمة ونقاط البيع"],
    paymentTerms: ["تحمل تكاليف المعدات الأساسية", "الالتزام بسداد المقابل في مواعيده", "صيانة مستمرة لمعدات الخبز والواجهة"],
    timelineNotes: ["المعاينة اختيارية لكنها موصى بها", "يبدأ التجهيز خلال 30 يوماً من الترسية", "نافذة استفسارات محدودة قبل الإغلاق"],
    alerts: [
      { title: "ضغط الجودة اليومية", detail: "أي ضعف في ثبات الجودة أو التوريد ينعكس مباشرة على نجاح العرض التشغيلي واستدامة النشاط.", severity: "high", sourcePage: "ص 16" },
      { title: "بند الإتلاف والتخزين", detail: "الكراسة تشدد على آلية حفظ المواد والتخلص من الفائض بما يراعي الاشتراطات الصحية.", severity: "medium", sourcePage: "ص 23" },
      { title: "مرونة التوسعة", detail: "تسمح الكراسة بإضافة منتجات مكملة بشرط عدم الإخلال بالنشاط الأساسي المعتمد.", severity: "info", sourcePage: "ص 29" },
    ],
    faq: [
      { question: "هل يمكن دمج القهوة مع النشاط؟", answer: "نعم باعتبارها منتجاً مسانداً إذا بقي النشاط الأساسي ضمن النطاق المعتمد في الكراسة.", sourcePage: "ص 10" },
      { question: "هل يلزم مختبر إنتاج داخلي؟", answer: "يلزم ما يكفي لإثبات جودة المنتج وسلامة التشغيل ضمن اشتراطات النشاط.", sourcePage: "ص 18" },
    ],
  },
  OPP003: {
    referenceCode: "HAIL-INV-2026-005",
    pageCount: 70,
    issueDate: "01 فبراير 2026",
    submissionDeadline: "28 مايو 2026",
    competitionType: "منافسة استثمارية موسمية ذات نطاق تشغيلي موسع",
    initialGuarantee: "120,000 ريال",
    finalGuarantee: "10% من القيمة التعاقدية",
    contractDuration: "6 مواسم تشغيلية",
    operationWindow: "تشغيل موسمي مع جاهزية قبل الافتتاح بـ 30 يوماً",
    executiveSummary: "الكراسة هنا ثقيلة نسبياً لأنها لا تطرح مجرد محل، بل تطرح تجربة وجهة متكاملة تتطلب تجهيزاً ميدانياً وتنظيماً موسعاً وخطة تشغيل موسمية وسلامة وتنقل ومواقف وإدارة حشود.",
    readinessSummary: "مناسبة لمستثمر أو شركة تشغيل لديها قدرة ميدانية وإدارة فعاليات أو وجهات، وغير مناسبة غالباً للمستثمر الفردي غير المدعوم بفريق تشغيل.",
    suitableFor: ["الشركات التشغيلية ذات الخبرة الميدانية", "التحالفات بين مستثمر ومشغل", "من يستطيع إدارة تجربة موسمية كاملة"],
    cautionFor: ["المستثمر الفردي دون فريق", "من لا يملك خطة طقس وتشغيل بديلة", "من يفتقد خبرة الحشود والفعاليات"],
    legalRequirements: ["إثبات أهلية استثمارية وتشغيلية", "الالتزام الكامل بمتطلبات السلامة وإدارة الحشود", "الحصول على الموافقات التنظيمية المساندة للفعاليات والخدمات"],
    operatingRequirements: ["خطة تشغيل موسمي كاملة", "خطة مواقف وتنظيم حركة", "خطة نظافة وسلامة واستجابة للطوارئ"],
    deliverables: ["مخطط تشغيلي للموقع", "خطة تجربة وزوار", "جداول تشغيل ومناوبات", "خطة إدارة طقس وازدحام"],
    paymentTerms: ["استثمار تأسيسي أعلى من الفرص التقليدية", "التزام بالمقابل المالي التعاقدي", "تحمل تكاليف البنية المؤقتة والخدمات المساندة"],
    timelineNotes: ["المعاينة الميدانية شبه إلزامية", "ورشة تعريفية قبل الإغلاق", "بدء التجهيز قبل الموسم بفترة كافية لا تقل عن 30 يوماً"],
    alerts: [
      { title: "ثقل الالتزام التشغيلي", detail: "الكراسة تقيّم القدرة التشغيلية اليومية وإدارة الزوار بوصفها عنصراً حاسماً في الترسية وليس مجرد بند مكمل.", severity: "high", sourcePage: "ص 22" },
      { title: "مخاطر الطقس والموسمية", detail: "يجب إظهار خطط بديلة للطقس وسيناريوهات انخفاض الإقبال ضمن العرض الفني.", severity: "high", sourcePage: "ص 31" },
      { title: "أهمية الشراكة", detail: "العروض التي تجمع بين الخبرة التشغيلية والقدرة الاستثمارية تبدو أكثر جاهزية في هذا النوع من الكراسات.", severity: "info", sourcePage: "ص 39" },
    ],
    faq: [
      { question: "هل يلزم مشغل فعلي وقت التقديم؟", answer: "يلزم إثبات القدرة التشغيلية أو التعاقد المبدئي مع جهة قادرة على تشغيل الوجهة وفق النطاق المطلوب.", sourcePage: "ص 20" },
      { question: "هل يمكن إدخال فعاليات إضافية؟", answer: "يسمح بالعناصر المساندة إذا بقيت ضمن الموافقات التنظيمية والطابع المعتمد للفرصة.", sourcePage: "ص 33" },
    ],
  },
  OPP004: {
    referenceCode: "HAIL-INV-2026-031",
    pageCount: 47,
    issueDate: "22 فبراير 2026",
    submissionDeadline: "15 مايو 2026",
    competitionType: "منافسة تجزئة متخصصة",
    initialGuarantee: "20,000 ريال",
    finalGuarantee: "5% من القيمة التعاقدية",
    contractDuration: "4 سنوات",
    operationWindow: "تشغيل يومي وفق نطاق وسط المدينة",
    executiveSummary: "الكراسة متوسطة الحجم لكنها شديدة التركيز على الهوية والعرض والالتزام بطابع الموقع التاريخي، ما يعني أن عنصر التصميم والانتقاء التجاري مهم بقدر أهمية الالتزام المالي.",
    readinessSummary: "مناسبة للمستثمر الذي يجيد بناء هوية تجارية محلية واضحة، وأقل ملاءمة لمن يبحث عن نشاط عام بلا تميز بصري أو قصصي.",
    suitableFor: ["العلامات التراثية", "التجزئة المرتبطة بالهوية المحلية", "المشاريع ذات العرض البصري الجيد"],
    cautionFor: ["الأنشطة العامة غير المميزة", "من لا يملك قدرة على تجديد المنتجات والعرض"],
    legalRequirements: ["التقيد بالطابع المعماري والتجاري للموقع", "الالتزام بالنطاق المعتمد للنشاط", "تقديم الوثائق النظامية التجارية والمالية"],
    operatingRequirements: ["تجديد العرض والمنتجات", "إدارة واجهة عالية الوضوح", "مراعاة تجربة الزوار والسياح"],
    deliverables: ["هوية عرض أولية", "قائمة المنتجات", "تصور واجهة ونقاط عرض"],
    paymentTerms: ["تكلفة متوسطة للتشطيب والمخزون", "التزام بالصيانة ونظافة الواجهة", "المقابل المالي وفق الجدول المعتمد"],
    timelineNotes: ["المعاينة موصى بها", "اعتماد التصميم قبل التنفيذ", "فترة تجهيز متوسطة بعد الترسية"],
    alerts: [
      { title: "حساسية الطابع العمراني", detail: "أي تجاوز للطابع التراثي أو الهوية المعتمدة قد يوقف اعتماد التصميم أو يبطئ الإطلاق.", severity: "high", sourcePage: "ص 14" },
      { title: "تشبع السوق", detail: "نجاح النشاط هنا مرتبط بقوة الانتقاء والهوية أكثر من مجرد الوجود في الموقع.", severity: "medium", sourcePage: "ص 21" },
      { title: "فرصة المنتجات الحصرية", detail: "الكراسة تفتح مساحة لتوليفات منتجات مميزة إذا كانت مرتبطة بهوية المدينة والزوار.", severity: "info", sourcePage: "ص 27" },
    ],
    faq: [
      { question: "هل يمكن البيع الإلكتروني مع المتجر؟", answer: "يسمح بالقنوات المساندة إذا لم تتعارض مع النطاق المعتمد أو تشوه تجربة الموقع.", sourcePage: "ص 18" },
      { question: "هل الهوية البصرية شرط في التقييم؟", answer: "نعم، يظهر ذلك ضمن عناصر الجودة والملاءمة للموقع والطابع العام.", sourcePage: "ص 15" },
    ],
  },
  OPP005: {
    referenceCode: "HAIL-INV-2026-011",
    pageCount: 58,
    issueDate: "10 فبراير 2026",
    submissionDeadline: "22 مايو 2026",
    competitionType: "منافسة مطاعم متوسطة النطاق",
    initialGuarantee: "65,000 ريال",
    finalGuarantee: "5% من القيمة التعاقدية",
    contractDuration: "5 سنوات",
    operationWindow: "تشغيل يومي مع ذروة ليلية وعائلية",
    executiveSummary: "الكراسة مناسبة لمشروع مطعم عائلي ناضج؛ وهي أقل تعقيداً من كراسات الوجهات الكبيرة لكنها تشدد على جودة الجلسات، إدارة المطبخ، والالتزام بتجربة عائلية مستقرة.",
    readinessSummary: "مناسبة لمستثمر لديه نموذج مطعم واضح أو شريك تشغيلي، وتحتاج قدرة على إدارة الجودة والخدمة أكثر من حاجتها إلى تعقيد تنظيمي عالٍ.",
    suitableFor: ["مشغلو المطاعم العائلية", "التحالفات بين ممول ومشغل", "العلامات التي تملك منيو وهوية جاهزة"],
    cautionFor: ["من لا يملك قدرة على إدارة المطبخ", "من يعتمد على التسعير وحده دون تجربة"],
    legalRequirements: ["استكمال متطلبات النشاط الغذائي", "الالتزام بالاشتراطات الصحية والبيئية", "رفع الوثائق النظامية والضمانات في المدة المحددة"],
    operatingRequirements: ["خطة تشغيل مطبخ", "نموذج خدمة وجلسات", "خطة زمن انتظار وذروة"],
    deliverables: ["مفهوم المطعم", "مخطط جلسات وخدمة", "تصور المنيو والتسعير"],
    paymentTerms: ["التزام بالتجهيزات والمطابخ والجلسات", "الصيانة والنظافة اليومية", "الوفاء بالمقابل التعاقدي"],
    timelineNotes: ["المعاينة الميدانية موصى بها", "اعتماد التصاميم قبل التنفيذ", "الافتتاح خلال 60 يوماً من الاستلام"],
    alerts: [
      { title: "تجربة العميل عنصر حاسم", detail: "الكراسة تنظر لجودة الجلسات والخدمة كجزء من نجاح التشغيل وليس مجرد اختيار داخلي.", severity: "high", sourcePage: "ص 17" },
      { title: "التكلفة الرأسمالية", detail: "المطبخ والجلسات يرفعان عتبة الجاهزية مقارنة بالنماذج السريعة، ويجب إظهار قدرة تمويل واقعية.", severity: "medium", sourcePage: "ص 24" },
      { title: "مرونة التوسع في المنيو", detail: "يسمح بتعديل التوليفة إذا بقيت ضمن الهوية الغذائية والنطاق التعاقدي.", severity: "info", sourcePage: "ص 29" },
    ],
    faq: [
      { question: "هل يمكن التقديم بعلامة جديدة؟", answer: "نعم إذا كان العرض الفني يثبت الهوية التشغيلية وقدرة التنفيذ الفعلية.", sourcePage: "ص 11" },
      { question: "هل الجلسات الخارجية مسموحة؟", answer: "تخضع لاعتماد المخطط والضوابط الخاصة بالموقع والحي.", sourcePage: "ص 26" },
    ],
  },
  OPP006: {
    referenceCode: "HAIL-INV-2026-026",
    pageCount: 41,
    issueDate: "25 فبراير 2026",
    submissionDeadline: "08 مايو 2026",
    competitionType: "منافسة خدمية يومية",
    initialGuarantee: "15,000 ريال",
    finalGuarantee: "5% من القيمة التعاقدية",
    contractDuration: "3 سنوات",
    operationWindow: "تشغيل يومي مستقر بخدمة متكررة",
    executiveSummary: "هذه الكراسة أبسط من غيرها من حيث النطاق، لكنها تركز على جودة التشغيل اليومي، استقرار الخدمة، والسمعة المحلية. هي فرصة عملية أكثر من كونها فرصة استعراضية.",
    readinessSummary: "مناسبة للمستثمر الباحث عن نموذج تشغيلي مستقر ومنخفض التعقيد النسبي، بشرط وجود خطة خدمة يومية منضبطة.",
    suitableFor: ["المستثمر التشغيلي العملي", "المشاريع الخدمية ذات الطلب المتكرر", "من يفضل مخاطرة أقل من الضيافة"],
    cautionFor: ["من يبحث عن نمو بصري سريع فقط", "من لا يملك رقابة تشغيلية يومية"],
    legalRequirements: ["سجل تجاري مناسب", "التقيد بمتطلبات السلامة والنظافة", "استيفاء الوثائق والضمانات ضمن المهلة"],
    operatingRequirements: ["إدارة أجهزة ومخزون", "ضبط الجودة والتسليم", "خطة لمعالجة الشكاوى والسمعة"],
    deliverables: ["خطة تشغيل يومي", "نموذج تسعير أو اشتراكات", "خطة جودة وخدمة عميل"],
    paymentTerms: ["التزامات رأسمالية محدودة نسبياً", "مقابل مالي دوري", "تحمل الصيانة والمواد التشغيلية"],
    timelineNotes: ["بدء التشغيل سريع بعد الترسية", "المعاينة غير معقدة", "فترة الاستفسارات قصيرة"],
    alerts: [
      { title: "السمعة المحلية", detail: "نجاح المشروع يعتمد على الثقة والتكرار، لذلك تضع الكراسة ثقلاً واضحاً لجودة الخدمة والانضباط.", severity: "high", sourcePage: "ص 13" },
      { title: "هامش الربح", detail: "الهامش أقل من الضيافة، لذا يجب ضبط التكاليف والتشغيل بدقة قبل التقديم.", severity: "medium", sourcePage: "ص 19" },
      { title: "قابلية الاشتراكات", detail: "يمكن تقوية العرض إذا تضمن نموذج اشتراكات أو خدمة متكررة واضحة.", severity: "info", sourcePage: "ص 25" },
    ],
    faq: [
      { question: "هل النشاط مناسب للمبتدئ؟", answer: "نعم نسبياً إذا كانت لديه قدرة تشغيل يومي واضحة أو شريك منفذ.", sourcePage: "ص 9" },
      { question: "هل يمكن إضافة خدمة استلام وتوصيل؟", answer: "يمكن ذلك إذا لم يخل بالنطاق الأساسي للنشاط واشتراطات الموقع.", sourcePage: "ص 17" },
    ],
  },
  OPP007: {
    referenceCode: "HAIL-INV-2026-033",
    pageCount: 38,
    issueDate: "02 مارس 2026",
    submissionDeadline: "18 مايو 2026",
    competitionType: "فرصة خفيفة للمشاريع الصغيرة",
    initialGuarantee: "10,000 ريال",
    finalGuarantee: "5% من القيمة التعاقدية",
    contractDuration: "3 سنوات",
    operationWindow: "تشغيل مرن حسب طبيعة الموقع والموسم",
    executiveSummary: "الكراسة قصيرة نسبياً ومناسبة للمشاريع الصغيرة، لكنها حساسة جداً لنقطة التموضع والتجهيز الخفيف وسرعة التشغيل. هذه فرصة دخول للسوق وليست مشروعاً معقداً، لكن نجاحها مرتبط بدقة التنفيذ.",
    readinessSummary: "مناسبة للمستثمر المبتدئ أو المشروع الثانوي بشرط فهم الموقع والطقس والمنتج. تحتاج سرعة تنفيذ أكثر من تعقيد تنظيمي.",
    suitableFor: ["المبتدئون المدعومون بخطة واضحة", "المشاريع الصغيرة سريعة الإطلاق", "اختبار السوق قبل التوسع"],
    cautionFor: ["من يفتقد مرونة تشغيلية", "من يعتمد على موقع غير مدروس"],
    legalRequirements: ["الالتزام بالنشاط المعتمد", "رفع الوثائق النظامية الأساسية", "إيداع الضمانات ضمن المهلة"],
    operatingRequirements: ["اختيار نقطة تمركز دقيقة", "خطة توريد يومية", "مرونة لمواجهة تغيرات الطقس والإقبال"],
    deliverables: ["تصور نقطة البيع", "هوية عرض سريعة", "خطة تشغيل خفيفة ومناوبات"],
    paymentTerms: ["رأس مال أولي منخفض نسبياً", "التزامات تشغيلية يومية", "مقابل دوري وفق التعاقد"],
    timelineNotes: ["جاهزية إطلاق سريعة", "توصى المعاينة لتحديد النقطة المثلى", "فترة تجهيز مختصرة"],
    alerts: [
      { title: "الموقع الدقيق يحدد النجاح", detail: "الكراسة قد تبدو بسيطة، لكن أثر نقطة التمركز على الإيراد مرتفع جداً ويجب التعامل معه بجدية.", severity: "high", sourcePage: "ص 11" },
      { title: "تأثر بالطقس", detail: "المنتج الخفيف في موقع مفتوح أكثر تعرضاً لتذبذب الإقبال والطقس من الأنشطة المغلقة.", severity: "medium", sourcePage: "ص 16" },
      { title: "ميزة سرعة الإطلاق", detail: "يمكن استغلال خفة المتطلبات لبدء نشاط سريع إذا كانت الهوية التشغيلية واضحة.", severity: "info", sourcePage: "ص 22" },
    ],
    faq: [
      { question: "هل تصلح كبداية أولى؟", answer: "نعم، بشرط فهم السوق المحلي واختيار نقطة قوية وخطة توريد بسيطة لكنها ثابتة.", sourcePage: "ص 8" },
      { question: "هل يمكن نقل الوحدة لاحقاً؟", answer: "ذلك يخضع للنطاق المكاني المعتمد في الكراسة وموافقة الجهة المنظمة.", sourcePage: "ص 19" },
    ],
  },
  OPP008: {
    referenceCode: "HAIL-INV-2026-040",
    pageCount: 62,
    issueDate: "18 فبراير 2026",
    submissionDeadline: "27 مايو 2026",
    competitionType: "منافسة خدمات صحية خفيفة",
    initialGuarantee: "80,000 ريال",
    finalGuarantee: "10% من القيمة التعاقدية",
    contractDuration: "5 سنوات",
    operationWindow: "تشغيل يومي بامتثال تنظيمي مرتفع",
    executiveSummary: "الكراسة هنا تنظيمية أكثر من كونها تسويقية؛ وزنها الأكبر في الترخيص والكوادر والالتزام المهني. وهي مناسبة لمن يقرأ الاشتراطات باحتراف ولا يكتفي بجاذبية الموقع فقط.",
    readinessSummary: "مناسبة لمستثمر لديه فهم صحي أو شريك تشغيلي متخصص، وغير مناسبة غالباً لمن يريد دخولاً سريعاً بلا جاهزية تنظيمية أو كادر.",
    suitableFor: ["المشغلون الصحيون", "التحالفات مع كوادر أو شركات طبية", "الاستثمار طويل النفس نسبياً"],
    cautionFor: ["المستثمر غير المتخصص", "من لا يملك خطة ترخيص وكادر"],
    legalRequirements: ["استيفاء متطلبات الترخيص الصحي", "إثبات الكادر والتأهيل المهني المطلوب", "التزام كامل بضوابط الجودة والامتثال"],
    operatingRequirements: ["خطة تشغيل عيادي", "خطة كوادر وجدولة", "نظام جودة ومتابعة شكاوى"],
    deliverables: ["خطة خدمة وتخصص", "هيكل كادر وتشغيل", "تصور رحلة مراجع"],
    paymentTerms: ["تكلفة تأسيس وتجهيز أعلى نسبياً", "التزامات تشغيل وكوادر", "الالتزام بالمقابل التعاقدي والصيانة"],
    timelineNotes: ["مدة جاهزية أطول من الأنشطة التجارية البسيطة", "التصاريح عنصر سابق للافتتاح", "المعاينة مهمة لفهم النطاق"],
    alerts: [
      { title: "الامتثال النظامي", detail: "القيمة الكبرى في هذه الكراسة ليست في الموقع فقط بل في القدرة على استيفاء الترخيص والجودة والكوادر فعلياً.", severity: "high", sourcePage: "ص 19" },
      { title: "زمن الوصول للتشغيل", detail: "الفرصة قد تحتاج زمناً أطول للوصول للاستقرار بسبب الترخيص والتوظيف والتجهيز المتخصص.", severity: "medium", sourcePage: "ص 28" },
      { title: "فجوة تخصصية", detail: "العرض يقوى إذا أثبت حاجة الحي لتخصص محدد بدلاً من طرح عام غير مركز.", severity: "info", sourcePage: "ص 35" },
    ],
    faq: [
      { question: "هل التخصص مفتوح؟", answer: "يخضع التخصص المقبول للنطاق المعتمد في الكراسة والمتطلبات التنظيمية المرتبطة به.", sourcePage: "ص 14" },
      { question: "هل يمكن التقديم مع شريك طبي؟", answer: "نعم، بل قد يكون ذلك عاملاً داعماً إذا أظهر تكاملاً بين التمويل والخبرة التشغيلية.", sourcePage: "ص 24" },
    ],
  },
};

function buildOpportunityBooklet(opportunity: Opportunity, config: BookletConfig): OpportunityBooklet {
  return {
    opportunityId: opportunity.id,
    referenceCode: config.referenceCode,
    pageCount: config.pageCount,
    issueDate: config.issueDate,
    submissionDeadline: config.submissionDeadline,
    competitionType: config.competitionType,
    initialGuarantee: config.initialGuarantee,
    finalGuarantee: config.finalGuarantee,
    contractDuration: config.contractDuration,
    operationWindow: config.operationWindow,
    executiveSummary: config.executiveSummary,
    readinessSummary: config.readinessSummary,
    suitableFor: config.suitableFor,
    cautionFor: config.cautionFor,
    sections: [
      {
        id: "scope",
        title: "تعريف الفرصة ونطاق الاستثمار",
        pageRange: "ص 3-9",
        overview: "هذه القراءة تلخص القسم الذي يشرح طبيعة الفرصة وحدودها ومساحتها والفئة المستهدفة، مع الحفاظ على الارتباط بالنص المرجعي للكراسة.",
        items: [
          { label: "ملخص الفرصة", detail: opportunity.officialSummary, sourcePage: "ص 4" },
          { label: "المساحة أو النطاق", detail: opportunity.areaRange, sourcePage: "ص 5" },
          { label: "النموذج التشغيلي", detail: opportunity.businessModel, sourcePage: "ص 6" },
          { label: "الفئة المستهدفة", detail: opportunity.targetAudience.join("، "), sourcePage: "ص 8" },
        ],
      },
      {
        id: "legal",
        title: "الاشتراطات النظامية والتأهيل",
        pageRange: "ص 10-19",
        overview: "يركز هذا القسم على أهلية المستثمر ووثائقه ومتطلبات النشاط النظامية التي يؤدي إغفالها إلى استبعاد العرض أو تعطيل الترسية.",
        items: config.legalRequirements.map((item, index) => ({
          label: `متطلب ${index + 1}`,
          detail: item,
          sourcePage: `ص ${10 + index}`,
        })),
      },
      {
        id: "financial",
        title: "الالتزامات المالية والضمانات",
        pageRange: "ص 20-30",
        overview: "هذا القسم يشرح الصورة المالية الرسمية: الضمانات، النطاق الرأسمالي المتوقع، والالتزامات التي ينبغي فهمها قبل قرار الدخول في المنافسة.",
        items: [
          { label: "الاستثمار التأسيسي المتوقع", detail: opportunity.capexRange, sourcePage: "ص 21" },
          { label: "التكلفة التشغيلية المرجعية", detail: opportunity.operatingCostRange, sourcePage: "ص 22" },
          { label: "الضمان الابتدائي", detail: config.initialGuarantee, sourcePage: "ص 23" },
          { label: "الضمان النهائي", detail: config.finalGuarantee, sourcePage: "ص 24" },
          ...config.paymentTerms.map((item, index) => ({
            label: `التزام مالي ${index + 1}`,
            detail: item,
            sourcePage: `ص ${25 + index}`,
          })),
        ],
      },
      {
        id: "operations",
        title: "التشغيل والجودة والتسليم",
        pageRange: "ص 31-40",
        overview: "يعرض هذا القسم ما تتوقعه الجهة المنظمة فعلياً من المشغل بعد الترسية: جاهزية، جودة، تجربة، والتزام بالمعايير اليومية أو الموسمية.",
        items: [
          ...config.operatingRequirements.map((item, index) => ({
            label: `تشغيل ${index + 1}`,
            detail: item,
            sourcePage: `ص ${31 + index}`,
          })),
          ...config.deliverables.map((item, index) => ({
            label: `مخرج مطلوب ${index + 1}`,
            detail: item,
            sourcePage: `ص ${35 + index}`,
          })),
        ],
      },
      {
        id: "timeline",
        title: "الجدول الزمني وآلية التقديم",
        pageRange: "ص 41 وما بعدها",
        overview: "هنا تظهر التواريخ والإجراءات التي يجب ألا يضيعها المستثمر: الاستفسارات، الإغلاق، المعاينة، ومراحل ما بعد الترسية.",
        items: [
          { label: "موعد الإغلاق", detail: config.submissionDeadline, sourcePage: "ص 41" },
          { label: "مدة العقد", detail: config.contractDuration, sourcePage: "ص 42" },
          { label: "نافذة التشغيل", detail: config.operationWindow, sourcePage: "ص 43" },
          ...config.timelineNotes.map((item, index) => ({
            label: `إجراء زمني ${index + 1}`,
            detail: item,
            sourcePage: `ص ${44 + index}`,
          })),
        ],
      },
    ],
    alerts: config.alerts,
    checklist: {
      beforeSubmission: [
        "قراءة الملخص التنفيذي ثم مراجعة النصوص المرجعية ذات الصلة قبل اتخاذ قرار الدخول.",
        ...opportunity.applicationChecklist,
        ...config.legalRequirements.slice(0, 2),
      ],
      duringSubmission: [
        "رفع العرض الفني والمالي وفق القوالب الرسمية دون إسقاط أي بند إجباري.",
        "إرفاق الضمان الابتدائي والوثائق النظامية كاملة قبل الموعد النهائي.",
        ...config.deliverables,
      ],
      afterAward: [
        "استكمال الضمان النهائي والعقود المساندة خلال المدة المحددة.",
        ...config.operatingRequirements,
        ...config.timelineNotes.slice(0, 2),
      ],
    },
    glossary: bookletGlossary,
    faq: config.faq,
  };
}

export const opportunityBooklets = opportunities.reduce<Record<string, OpportunityBooklet>>((accumulator, opportunity) => {
  const config = bookletConfigs[opportunity.id];

  if (config) {
    accumulator[opportunity.id] = buildOpportunityBooklet(opportunity, config);
  }

  return accumulator;
}, {});

export function getOpportunityBookletById(opportunityId: string) {
  return opportunityBooklets[opportunityId] ?? null;
}

export function getOpportunityBookletBySlug(slug: string) {
  const opportunity = opportunities.find((item) => item.slug === slug);
  return opportunity ? getOpportunityBookletById(opportunity.id) : null;
}

export function getOpportunityWithBooklet(opportunityId: string) {
  const opportunity = getOpportunityById(opportunityId);
  const booklet = getOpportunityBookletById(opportunityId);

  if (!opportunity || !booklet) {
    return null;
  }

  return { opportunity, booklet };
}