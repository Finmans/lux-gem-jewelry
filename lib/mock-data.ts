// ── LUX GEM Mock Data ─────────────────────────────────────

export type DiamondShape =
  | "Round"
  | "Princess"
  | "Cushion"
  | "Oval"
  | "Radiant"
  | "Emerald"
  | "Pear"
  | "Marquise"
  | "Asscher"
  | "Heart";

export interface Diamond {
  id: string;
  shape: DiamondShape;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  lab: "GIA" | "IGI" | "HRD";
  certificate: string;
  priceTHB: number;
  priceUSD: number;
  available: boolean;
}

export interface JewelryProduct {
  id: string;
  name: string;
  collection: string;
  category: string;
  metals: string[];
  centerStone: string;
  priceTHB: number;
  priceUSD: number;
  badge?: string;
  description: string;
  gradient: string;
}

export interface Collection {
  id: string;
  name: string;
  nameTH: string;
  count: number;
  startingPriceTHB: number;
  description: string;
  gradient: string;
}

// ── Diamond Stock ─────────────────────────────────────────
export const diamonds: Diamond[] = [
  {
    id: "D001",
    shape: "Round",
    carat: 1.51,
    color: "D",
    clarity: "VVS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "GIA",
    certificate: "2387654321",
    priceTHB: 318000,
    priceUSD: 9100,
    available: true,
  },
  {
    id: "D002",
    shape: "Oval",
    carat: 2.03,
    color: "E",
    clarity: "VS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "Faint",
    lab: "IGI",
    certificate: "LG43210987",
    priceTHB: 425000,
    priceUSD: 12150,
    available: true,
  },
  {
    id: "D003",
    shape: "Cushion",
    carat: 1.80,
    color: "F",
    clarity: "VS2",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "IGI",
    certificate: "LG58743210",
    priceTHB: 295000,
    priceUSD: 8430,
    available: true,
  },
  {
    id: "D004",
    shape: "Emerald",
    carat: 2.50,
    color: "D",
    clarity: "VVS2",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "GIA",
    certificate: "7654321089",
    priceTHB: 590000,
    priceUSD: 16860,
    available: true,
  },
  {
    id: "D005",
    shape: "Pear",
    carat: 1.22,
    color: "E",
    clarity: "VVS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "None",
    lab: "IGI",
    certificate: "LG21098765",
    priceTHB: 245000,
    priceUSD: 7000,
    available: true,
  },
  {
    id: "D006",
    shape: "Round",
    carat: 3.01,
    color: "D",
    clarity: "IF",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "GIA",
    certificate: "5432109876",
    priceTHB: 785000,
    priceUSD: 22430,
    available: true,
  },
  {
    id: "D007",
    shape: "Radiant",
    carat: 1.65,
    color: "F",
    clarity: "SI1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "None",
    lab: "IGI",
    certificate: "LG98765432",
    priceTHB: 198000,
    priceUSD: 5660,
    available: true,
  },
  {
    id: "D008",
    shape: "Princess",
    carat: 1.40,
    color: "E",
    clarity: "VS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "IGI",
    certificate: "LG87654321",
    priceTHB: 265000,
    priceUSD: 7570,
    available: true,
  },
];

// ── Collections ───────────────────────────────────────────
export const collections: Collection[] = [
  {
    id: "engagement",
    name: "Engagement Rings",
    nameTH: "แหวนหมั้น",
    count: 48,
    startingPriceTHB: 95000,
    description: "Timeless solitaires and intricate halos for your forever moment.",
    gradient: "from-[#1a1410] via-[#2d2318] to-[#1a1410]",
  },
  {
    id: "wedding",
    name: "Wedding Bands",
    nameTH: "แหวนแต่งงาน",
    count: 32,
    startingPriceTHB: 45000,
    description: "Eternity bands and matching sets crafted for a lifetime.",
    gradient: "from-[#111520] via-[#1a2035] to-[#111520]",
  },
  {
    id: "earrings",
    name: "Fine Earrings",
    nameTH: "ต่างหู",
    count: 56,
    startingPriceTHB: 38000,
    description: "Studs, drops, and huggies that elevate every occasion.",
    gradient: "from-[#0e1a18] via-[#162825] to-[#0e1a18]",
  },
  {
    id: "necklace",
    name: "Pendant & Necklace",
    nameTH: "สร้อยคอ",
    count: 41,
    startingPriceTHB: 52000,
    description: "Delicate diamonds suspended in sculpted precious metal.",
    gradient: "from-[#1a1015] via-[#281520] to-[#1a1015]",
  },
  {
    id: "bracelet",
    name: "Tennis Bracelets",
    nameTH: "กำไล",
    count: 18,
    startingPriceTHB: 128000,
    description: "Continuous diamond lines of unrivalled brilliance.",
    gradient: "from-[#151a10] via-[#202818] to-[#151a10]",
  },
  {
    id: "high-jewelry",
    name: "High Jewelry",
    nameTH: "ไฮจิวเวลรี่",
    count: 12,
    startingPriceTHB: 380000,
    description: "One-of-a-kind masterworks for the extraordinary.",
    gradient: "from-[#1a1205] via-[#261a08] to-[#1a1205]",
  },
];

// ── Featured Products ─────────────────────────────────────
export const featuredProducts: JewelryProduct[] = [
  {
    id: "P001",
    name: "Aurora Solitaire",
    collection: "engagement",
    category: "Engagement Ring",
    metals: ["White Gold", "Yellow Gold", "Rose Gold", "Platinum"],
    centerStone: "1.0ct Round D VVS1",
    priceTHB: 185000,
    priceUSD: 5290,
    badge: "Best Seller",
    description: "A breathtaking solitaire where a single round brilliant takes center stage, held by the thinnest of four-prong claws.",
    gradient: "from-[#C6A878]/20 to-[#F6F1E8]/5",
  },
  {
    id: "P002",
    name: "Lumière Halo",
    collection: "engagement",
    category: "Engagement Ring",
    metals: ["White Gold", "Platinum"],
    centerStone: "1.5ct Oval E VS1",
    priceTHB: 285000,
    priceUSD: 8140,
    badge: "New",
    description: "An oval center diamond encircled by a micro-pavé halo, creating a brilliance that seems to multiply endlessly.",
    gradient: "from-[#8A8F98]/20 to-[#C6A878]/5",
  },
  {
    id: "P003",
    name: "Éclat Eternity",
    collection: "wedding",
    category: "Wedding Band",
    metals: ["White Gold", "Yellow Gold", "Rose Gold", "Platinum"],
    centerStone: "0.5ct tw Round D-F VVS",
    priceTHB: 98000,
    priceUSD: 2800,
    badge: "Classic",
    description: "A full eternity band of perfectly matched round brilliants, the eternal symbol of unending love.",
    gradient: "from-[#C6A878]/15 to-[#D9DDE3]/10",
  },
  {
    id: "P004",
    name: "Cascade Drop Earrings",
    collection: "earrings",
    category: "Fine Earrings",
    metals: ["White Gold", "Yellow Gold"],
    centerStone: "2 × 0.8ct Pear F VS1",
    priceTHB: 320000,
    priceUSD: 9140,
    badge: "Limited",
    description: "Pear-shaped diamonds suspended from pavé-set bails — movement, light, and impeccable craft in each pair.",
    gradient: "from-[#D9DDE3]/20 to-[#8A8F98]/10",
  },
];

// ── The 4Cs Education Data ────────────────────────────────
export const fourCs = [
  {
    letter: "C",
    name: "Cut",
    description:
      "The most critical factor determining a diamond's brilliance. Our Excellent-cut diamonds reflect light with maximum intensity, creating that signature sparkle.",
    grades: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
    activeGrade: "Excellent",
  },
  {
    letter: "C",
    name: "Color",
    description:
      "Graded D (colorless) to Z (light yellow). LUX GEM sources primarily D–F color diamonds — the pinnacle of colorlessness, allowing maximum light transmission.",
    grades: ["D", "E", "F", "G", "H", "I"],
    activeGrade: "D",
  },
  {
    letter: "C",
    name: "Clarity",
    description:
      "Measures internal and external characteristics. We offer VS1 and above for our signature collection, ensuring no visible inclusions to the naked eye.",
    grades: ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1"],
    activeGrade: "VVS1",
  },
  {
    letter: "C",
    name: "Carat",
    description:
      "A unit of weight, not size. Our collection spans 0.30ct to 5.00ct, with each diamond individually selected for ideal proportions regardless of weight.",
    grades: ["0.5ct", "1.0ct", "1.5ct", "2.0ct", "3.0ct", "5.0ct"],
    activeGrade: "1.0ct",
  },
];

// ── Testimonials ──────────────────────────────────────────
export const testimonials = [
  {
    name: "นภัสสร วิชัยดิษฐ",
    nameEN: "Naphatson W.",
    role: "Bride 2024",
    quote:
      "แหวนหมั้นจาก LUX GEM สวยเกินคาดมาก เพชรใสมากจนแทบไม่เชื่อว่าเป็น lab-grown ทีมให้คำปรึกษาดีมาก อธิบายทุกอย่างละเอียดมาก",
    rating: 5,
    ring: "Aurora Solitaire 1.5ct D VVS1",
  },
  {
    name: "Priya & James",
    nameEN: "Priya & James",
    role: "Couple, Bangkok",
    quote:
      "The Build Your Ring experience was incredible. We designed our wedding bands together and the 3D preview matched the final piece perfectly. Simply exceptional.",
    rating: 5,
    ring: "Custom Éclat Band",
  },
  {
    name: "ธนากร เพชรพิทักษ์",
    nameEN: "Thanakorn P.",
    role: "Gift Purchase",
    quote:
      "ซื้อสร้อยคอเป็นของขวัญให้แฟน คุณภาพระดับนี้ราคายุติธรรมมากครับ GIA cert ทำให้มั่นใจมาก บริการก็ดีมากตั้งแต่ต้นจนจบ",
    rating: 5,
    ring: "Lumière Pendant 1.0ct E VS1",
  },
  {
    name: "Sarah Chen",
    nameEN: "Sarah Chen",
    role: "High Jewelry Client",
    quote:
      "I had a bespoke piece created for my anniversary and the craftsmanship is breathtaking. LUX GEM truly bridges the gap between luxury heritage and modern ethics.",
    rating: 5,
    ring: "Custom High Jewelry Commission",
  },
];

// ── Certifications & Trust ────────────────────────────────
export const certifications = [
  { name: "GIA Certified", description: "Gemological Institute of America" },
  { name: "IGI Certified", description: "International Gemological Institute" },
  { name: "HRD Antwerp", description: "HRD Antwerp Diamond Grading" },
];

export const trustPoints = [
  {
    title: "Lifetime Warranty",
    description: "Every piece comes with our lifetime craftsmanship warranty and complimentary annual servicing.",
  },
  {
    title: "30-Day Returns",
    description: "Not in love with it? Return any item within 30 days for a full refund, no questions asked.",
  },
  {
    title: "Secure Payment",
    description: "Bank transfer, credit card, installment plans. All transactions secured with bank-grade encryption.",
  },
  {
    title: "Diamond Certificate",
    description: "Every diamond over 0.30ct ships with its official GIA or IGI grading certificate.",
  },
];
