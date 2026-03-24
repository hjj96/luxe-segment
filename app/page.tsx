import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProductsNewestFirst } from "@/lib/data";

export default function HomePage() {
  const newArrivals = getProductsNewestFirst().slice(0, 8);

  return (
    <section className="min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="mb-10 sm:mb-14">
          <h2 className="section-title whitespace-nowrap">Новинки</h2>
        </header>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link
            href="/catalog"
            className="inline-block rounded-sm border border-luxe-ink px-5 py-3 text-xs uppercase tracking-[0.18em] text-luxe-ink transition hover:bg-luxe-ink hover:text-white"
          >
            Перейти каталог
          </Link>
        </div>
      </div>
    </section>
  );
}
