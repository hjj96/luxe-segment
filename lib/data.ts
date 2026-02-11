import type { Product, Category, HomeVideo } from "./types";

export const TELEGRAM_CHANNEL = "https://t.me/luxe_segment";
export const TELEGRAM_CHAT = "https://t.me/luxesegment";

export const CATEGORIES: Category[] = [
  { slug: "clothing", name: "Одежда", href: "/catalog?category=clothing" },
  { slug: "shoes", name: "Обувь", href: "/catalog?category=shoes" },
  { slug: "bags", name: "Сумки", href: "/catalog?category=bags" },
  { slug: "accessories", name: "Аксессуары", href: "/catalog?category=accessories" },
];

export const BRANDS = ["Brunello Cucinelli", "Loro Piana", "Hermès", "Loewe", "The Row"];

export const COLORS = ["Чёрный", "Белый", "Серый", "Бежевый", "Коричневый", "Синий", "Бордовый", "Оливковый"];

// Mock products — in production would come from CMS/API
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Кашемировое пальто",
    brand: "Brunello Cucinelli",
    price: 285000,
    currency: "₽",
    description: "Классическое пальто из двойного кашемира. Однобортная модель с отложным воротником.",
    category: "clothing",
    images: ["/img/p1.jpg", "/img/p1-2.jpg"],
    specs: [
      { label: "Материал", value: "100% кашемир" },
      { label: "Цвет", value: "Серый меланж" },
      { label: "Размер", value: "48 (IT)" },
    ],
    inStock: true,
    madeToOrder: false,
    colors: ["Серый меланж", "Бежевый", "Чёрный"],
    sizes: ["46", "48", "50", "52"],
    createdAt: "2025-03-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Кожаные ботинки",
    brand: "Loro Piana",
    price: 89000,
    currency: "₽",
    description: "Ботинки из мягкой кожи с резиновой подошвой.",
    category: "shoes",
    images: ["/img/p2.jpg"],
    specs: [
      { label: "Материал", value: "Натуральная кожа" },
      { label: "Цвет", value: "Коричневый" },
      { label: "Размер", value: "42" },
    ],
    inStock: true,
    madeToOrder: false,
    colors: ["Коричневый", "Чёрный"],
    sizes: ["40", "41", "42", "43"],
    createdAt: "2025-02-28T12:00:00Z",
  },
  {
    id: "3",
    name: "Сумка из кожи",
    brand: "Hermès",
    price: 420000,
    currency: "₽",
    description: "Компактная сумка из телячьей кожи с золотой фурнитурой.",
    category: "bags",
    images: ["/img/p3.jpg"],
    specs: [
      { label: "Материал", value: "Телячья кожа" },
      { label: "Цвет", value: "Чёрный" },
    ],
    inStock: false,
    madeToOrder: true,
    colors: ["Чёрный", "Бордовый"],
    sizes: [],
    createdAt: "2025-02-25T09:00:00Z",
  },
  {
    id: "4",
    name: "Шёлковый платок",
    brand: "Hermès",
    price: 45000,
    currency: "₽",
    description: "Платок 90×90 см из шёлкового твила.",
    category: "accessories",
    images: ["/img/p4.jpg"],
    specs: [
      { label: "Материал", value: "Шёлковый твил" },
      { label: "Размер", value: "90×90 см" },
    ],
    inStock: true,
    madeToOrder: false,
    colors: ["Синий", "Бордовый", "Бежевый"],
    sizes: [],
    createdAt: "2025-03-02T14:00:00Z",
  },
  {
    id: "5",
    name: "Кожаный ремень",
    brand: "Loewe",
    price: 32000,
    currency: "₽",
    description: "Ремень из гладкой кожи с металлической пряжкой.",
    category: "accessories",
    images: ["/img/p5.jpg"],
    specs: [
      { label: "Материал", value: "Натуральная кожа" },
      { label: "Цвет", value: "Чёрный" },
    ],
    inStock: true,
    madeToOrder: false,
    colors: ["Чёрный", "Коричневый"],
    sizes: ["85", "90", "95", "100"],
    createdAt: "2025-02-20T11:00:00Z",
  },
  {
    id: "6",
    name: "Шерстяной свитер",
    brand: "The Row",
    price: 78000,
    currency: "₽",
    description: "Объёмный свитер из чистой шерсти мерено.",
    category: "clothing",
    images: ["/img/p6.jpg"],
    specs: [
      { label: "Материал", value: "100% шерсть мерено" },
      { label: "Цвет", value: "Оливковый" },
    ],
    inStock: true,
    madeToOrder: false,
    colors: ["Оливковый", "Серый", "Чёрный"],
    sizes: ["S", "M", "L"],
    createdAt: "2025-03-03T08:00:00Z",
  },
];

// Placeholder images (use real URLs or /public/img in production)
export function getProductImageUrl(product: Product, index = 0): string {
  const img = product.images[index] || product.images[0];
  if (img?.startsWith("http")) return img;
  // Placeholder for demo when no images in public
  return `https://placehold.co/600x800/f5f5f7/86868b?text=${encodeURIComponent(product.name)}`;
}

// Homepage videos — managed via config (could be admin later)
export const HOME_VIDEOS: HomeVideo[] = [
  {
    id: "v1",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    caption: "Новая коллекция весна–лето 2025",
    order: 1,
  },
  {
    id: "v2",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    caption: "Кашемир и шерсть",
    order: 2,
  },
  {
    id: "v3",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    caption: "Аксессуары",
    order: 3,
  },
  {
    id: "v4",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    caption: "Доставка по миру",
    order: 4,
  },
];

export function getProductsNewestFirst(): Product[] {
  return [...MOCK_PRODUCTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
