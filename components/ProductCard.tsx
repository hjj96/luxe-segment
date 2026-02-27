"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { getProductImageUrl } from "@/lib/data";
import { IconHeart } from "./Icons";
import type { Product } from "@/lib/types";

const NEW_DAYS = 30;

function isNew(product: Product): boolean {
  if (!product.createdAt) return false;
  const created = new Date(product.createdAt).getTime();
  const now = Date.now();
  return (now - created) / (1000 * 60 * 60 * 24) <= NEW_DAYS;
}

export function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite } = useCartFavorites();
  const fav = isFavorite(product.id);
  const imgUrl = getProductImageUrl(product, 0);
  const secondImgUrl = product.images.length > 1 ? getProductImageUrl(product, 1) : null;
  const showNew = isNew(product);

  return (
    <article className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-[3/4] overflow-hidden bg-[#f8f8f8] relative">
          <Image
            src={imgUrl}
            alt={product.name}
            width={600}
            height={800}
            className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${secondImgUrl ? "group-hover:opacity-0" : ""}`}
            unoptimized={imgUrl.startsWith("https://placehold")}
          />
          {secondImgUrl && (
            <Image
              src={secondImgUrl}
              alt=""
              width={600}
              height={800}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-[1.03]"
              unoptimized={secondImgUrl.startsWith("https://placehold")}
            />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500 pointer-events-none" />
          {showNew && (
            <span className="absolute left-4 top-4 bg-luxe-ink px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
              Новинка
            </span>
          )}
        </div>
        <div className="mt-5 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-mute">
            {product.brand}
          </p>
          <p className="text-sm text-luxe-ink line-clamp-2 leading-relaxed">
            {product.name}
          </p>
          <p className="text-sm font-light tracking-wide text-luxe-ink mt-2">
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
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-white/95 backdrop-blur-sm transition-all duration-300 hover:bg-white"
        aria-label={fav ? "Убрать из избранного" : "В избранное"}
      >
        <IconHeart size="sm" filled={fav} className={fav ? "text-luxe-ink" : "text-luxe-mute"} />
      </button>
    </article>
  );
}
