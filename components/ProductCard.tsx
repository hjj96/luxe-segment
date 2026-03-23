"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { getProductImageUrl } from "@/lib/data";
import { IconHeart } from "./Icons";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite } = useCartFavorites();
  const fav = isFavorite(product.id);
  const imgUrl = getProductImageUrl(product, 0, 640);
  const secondImgUrl =
    product.images.length > 1 ? getProductImageUrl(product, 1, 640) : null;

  return (
    <article className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-luxe-bg-alt shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-300 group-hover:shadow-card-hover">
          <Image
            src={imgUrl}
            alt={product.name}
            width={600}
            height={800}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${secondImgUrl ? "group-hover:opacity-0" : ""}`}
            unoptimized={imgUrl.startsWith("https://placehold")}
          />
          {secondImgUrl && (
            <Image
              src={secondImgUrl}
              alt=""
              width={600}
              height={800}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-[1.03]"
              unoptimized={secondImgUrl.startsWith("https://placehold")}
            />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500 pointer-events-none" />
        </div>
      </Link>
      <div className="mt-5 space-y-1">
        <Link
          href={`/catalog?brand=${encodeURIComponent(product.brand)}`}
          className="inline-block text-[10px] uppercase tracking-[0.2em] text-luxe-mute hover:text-luxe-ink transition-colors"
        >
          {product.brand}
        </Link>
        <Link href={`/product/${product.id}`} className="block">
          <p className="text-sm text-luxe-ink line-clamp-2 leading-relaxed">
            {product.name}
          </p>
          <p className="text-sm font-light tracking-wide text-luxe-ink mt-2">
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
        className="absolute right-4 top-4 z-10 flex items-center justify-center p-1.5 text-white/90 transition-all duration-300 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
        aria-label={fav ? "Убрать из избранного" : "В избранное"}
      >
        <IconHeart size="sm" filled={fav} className={fav ? "text-white" : "text-white/80"} />
      </button>
    </article>
  );
}
