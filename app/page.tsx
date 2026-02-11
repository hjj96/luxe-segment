import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { VideoRow } from "@/components/VideoRow";
import { CategoryTiles } from "@/components/CategoryTiles";
import { InfoCards } from "@/components/InfoCards";
import {
  CATEGORIES,
  HOME_VIDEOS,
  getProductsNewestFirst,
} from "@/lib/data";

export default function HomePage() {
  const newArrivals = getProductsNewestFirst().slice(0, 8);

  return (
    <>
      {/* Hero section with decorative line */}
      <section className="border-t border-luxe-border bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex items-center gap-4 sm:mb-14">
            <div className="h-px flex-1 bg-luxe-border" />
            <Link href="/catalog" className="section-title whitespace-nowrap hover:opacity-70 transition-opacity">
              Новые поступления
            </Link>
            <div className="h-px flex-1 bg-luxe-border" />
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <VideoRow videos={HOME_VIDEOS} />

      <CategoryTiles categories={CATEGORIES} />

      <InfoCards />
    </>
  );
}
