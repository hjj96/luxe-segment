"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { MOCK_PRODUCTS, getProductImageUrl } from "@/lib/data";
import { IconHeart } from "@/components/Icons";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useCartFavorites();
  const products = useMemo(
    () => MOCK_PRODUCTS.filter((p) => favorites.includes(p.id)),
    [favorites]
  );

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-luxe-border" />
          <h1 className="section-title whitespace-nowrap">Избранное</h1>
          <div className="h-px flex-1 bg-luxe-border" />
        </div>
        <p className="mt-4 text-sm text-luxe-mute">Пока ничего нет.</p>
        <Link
          href="/catalog"
          className="mt-8 inline-block border-b border-luxe-ink pb-1 text-xs uppercase tracking-label text-luxe-ink"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">
          Избранное
        </h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>
      <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <article key={p.id} className="group relative">
            <Link href={`/product/${p.id}`}>
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-luxe-bg-alt shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-300 group-hover:shadow-card-hover">
                <Image
                  src={getProductImageUrl(p, 0, 640)}
                  alt={p.name}
                  width={400}
                  height={533}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  unoptimized={getProductImageUrl(p, 0, 640).startsWith("https://placehold")}
                />
              </div>
              <div className="mt-3">
                <p className="mt-3 text-[11px] uppercase tracking-label text-luxe-mute">{p.brand}</p>
                <p className="text-sm text-luxe-ink">{p.name}</p>
                <p className="text-sm text-luxe-ink">
                  {p.price.toLocaleString("ru-RU")} {p.currency}
                </p>
              </div>
            </Link>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => addToCart({
                  productId: p.id,
                  name: p.name,
                  brand: p.brand,
                  price: p.price,
                  image: getProductImageUrl(p, 0, 640),
                  options: {},
                })}
                className="flex flex-1 items-center justify-center rounded-sm border border-luxe-ink py-2.5 text-xs uppercase tracking-label text-luxe-ink transition-colors hover:bg-luxe-bg-alt"
              >
                В корзину
              </button>
              <button
                type="button"
                onClick={() => toggleFavorite(p.id)}
                className="flex items-center justify-center rounded-sm border border-luxe-border p-2.5 text-luxe-ink transition-colors hover:bg-luxe-bg-alt"
                aria-label="Удалить из избранного"
              >
                <IconHeart size="sm" filled />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
