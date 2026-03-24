import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProductsNewestFirst } from "@/lib/data";

export default function HomePage() {
  const newArrivals = getProductsNewestFirst().slice(0, 8);

  return (
    <section className="min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
        <header className="mb-14 text-center sm:mb-20">
          <p className="section-label mb-5 sm:mb-6">Подборка</p>
          <h1 className="font-editorial text-[2rem] font-normal leading-[1.15] tracking-editorial text-luxe-ink sm:text-4xl sm:leading-[1.1]">
            Новые поступления
          </h1>
          <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed tracking-[0.06em] text-luxe-mute sm:text-sm">
            Актуальные позиции — в день появления в Telegram
          </p>
          <div className="mx-auto mt-10 h-px w-12 bg-gradient-to-r from-transparent via-luxe-accent/40 to-transparent sm:mt-12" aria-hidden />
        </header>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
          {newArrivals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mt-20 flex justify-center sm:mt-24">
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-3 border border-luxe-border bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.22em] text-luxe-ink transition-all duration-300 ease-luxe hover:border-luxe-graphite hover:bg-luxe-graphite hover:text-luxe-surface"
          >
            Каталог
          </Link>
        </div>
      </div>
    </section>
  );
}
