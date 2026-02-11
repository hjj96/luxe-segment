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
  const imgUrl = getProductImageUrl(product);

  return (
    <article className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-[3/4] overflow-hidden bg-luxe-bg-alt relative">
          <Image
            src={imgUrl}
            alt={product.name}
            width={600}
            height={800}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            unoptimized={imgUrl.startsWith("https://placehold")}
          />
          <div className="absolute inset-0 border border-black/0 group-hover:border-black/5 transition-colors" />
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-[11px] uppercase tracking-label text-luxe-mute">
            {product.brand}
          </p>
          <p className="text-sm text-luxe-ink line-clamp-2">{product.name}</p>
          <p className="text-sm font-medium text-luxe-ink">
            {product.price.toLocaleString("ru-RU")} {product.currency}
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.id);
        }}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-white/90 backdrop-blur-sm transition hover:bg-white"
        aria-label={fav ? "Убрать из избранного" : "В избранное"}
      >
        <IconHeart size="sm" filled={fav} className={fav ? "text-black" : "text-luxe-mute"} />
      </button>
    </article>
  );
}
