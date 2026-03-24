"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { getProductImageUrl } from "@/lib/data";
import { IconHeart } from "./Icons";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  /** Для каскадной анимации появления */
  index?: number;
}) {
  const { toggleFavorite, isFavorite } = useCartFavorites();
  const fav = isFavorite(product.id);
  const imgUrl = getProductImageUrl(product, 0, 640);
  const secondImgUrl = product.images.length > 1 ? getProductImageUrl(product, 1, 640) : null;
  const delay = Math.min(index * 55, 400);

  return (
    <article
      className="group relative luxe-card-enter"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link href={`/product/${product.id}`} className="luxe-tap block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-luxe-bg-alt/60 shadow-luxe-sm ring-1 ring-luxe-border/90 transition-[box-shadow,ring-color] duration-500 ease-luxe group-hover:shadow-luxe-hover group-hover:ring-luxe-accent/15">
          <Image
            src={imgUrl}
            alt={product.name}
            width={600}
            height={800}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`h-full w-full object-cover transition-all duration-700 ease-luxe group-hover:scale-[1.02] ${secondImgUrl ? "group-hover:opacity-0" : ""}`}
            unoptimized={imgUrl.startsWith("https://placehold")}
          />
          {secondImgUrl && (
            <Image
              src={secondImgUrl}
              alt=""
              width={600}
              height={800}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 ease-luxe group-hover:scale-[1.02] group-hover:opacity-100"
              unoptimized={secondImgUrl.startsWith("https://placehold")}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxe-graphite/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>

      <div className="mt-5 flex flex-col gap-1.5 sm:mt-6">
        <Link
          href={`/catalog?brand=${encodeURIComponent(product.brand)}`}
          className="inline-block max-w-full truncate text-[10px] uppercase tracking-[0.22em] text-luxe-mute transition-colors duration-300 hover:text-luxe-ink-soft"
        >
          {product.brand}
        </Link>
        <Link href={`/product/${product.id}`} className="group/title block">
          <p className="line-clamp-2 text-[0.9375rem] font-medium leading-snug tracking-tight text-luxe-ink transition-colors duration-300 group-hover/title:text-luxe-ink-soft">
            {product.name}
          </p>
          <p className="mt-3 text-base font-medium tabular-nums tracking-tight text-luxe-ink">
            {product.price.toLocaleString("ru-RU")} {product.currency}
          </p>
        </Link>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.id);
        }}
        className="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-luxe-border/60 bg-luxe-surface/90 text-luxe-graphite shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-luxe-accent/35 hover:bg-luxe-surface active:scale-95"
        aria-label={fav ? "Убрать из избранного" : "В избранное"}
      >
        <IconHeart size="sm" filled={fav} className={fav ? "text-luxe-accent" : "text-luxe-mute/80"} />
      </button>
    </article>
  );
}
