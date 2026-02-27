import type { Product, Category, HomeVideo } from "./types";
import { GENERATED_PRODUCTS } from "./products.generated";

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

// Товары загружаются из таблицы data/products.csv (команда: npm run products)
export const MOCK_PRODUCTS: Product[] = GENERATED_PRODUCTS;

// Placeholder images (use real URLs or /public/img in production)
export function getProductImageUrl(product: Product, index = 0): string {
  if (product.images.length === 0) {
    return `https://placehold.co/600x800/f5f5f7/86868b?text=${encodeURIComponent(product.name)}`;
  }
  const img = product.images[index] || product.images[0];
  // Ссылка (https) или локальный путь (/img/...) — используем как есть
  if (img && (img.startsWith("http") || img.startsWith("/"))) return img;
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
