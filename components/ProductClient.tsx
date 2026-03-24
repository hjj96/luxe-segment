"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { getProductImageUrl, TELEGRAM_CHAT } from "@/lib/data";
import { formatColorLabel } from "@/lib/colorLabels";
import { IconHeart, IconTelegram } from "./Icons";
import type { Product } from "@/lib/types";

const chip = (active: boolean) =>
  `rounded-full border px-3.5 py-2 text-[11px] uppercase tracking-[0.12em] transition-all duration-300 ease-luxe ${
    active
      ? "border-luxe-accent/45 bg-luxe-accent-faint text-luxe-ink ring-1 ring-luxe-accent/10"
      : "border-luxe-border text-luxe-ink hover:border-luxe-accent/30"
  }`;

export function ProductClient({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useCartFavorites();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors.length > 0 ? product.colors[0] : "");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes.length > 0 ? product.sizes[0] : "");
  const fav = isFavorite(product.id);

  const imageUrl = getProductImageUrl(product, currentImage, 1100);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: getProductImageUrl(product, 0, 640),
      options: {
        ...(product.colors.length ? { color: selectedColor } : {}),
        ...(product.sizes.length ? { size: selectedSize } : {}),
      },
    });
  };

  const actionButtons = (
    <>
      <button type="button" onClick={handleAddToCart} className="luxe-btn-primary flex-1 min-w-0 py-3.5">
        В корзину
      </button>
      <a
        href={TELEGRAM_CHAT}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-sm border border-luxe-border py-3.5 text-[10px] uppercase tracking-[0.12em] text-luxe-ink transition-colors duration-300 hover:border-luxe-accent/35 hover:bg-luxe-accent-faint"
      >
        <IconTelegram size="sm" className="shrink-0 text-luxe-accent" />
        <span className="truncate">Telegram</span>
      </a>
    </>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-28 sm:px-6 sm:py-16 sm:pb-16">
      <div className="mb-12 flex flex-col items-center sm:mb-16">
        <p className="section-label mb-3">{product.brand}</p>
        <div className="flex w-full max-w-3xl items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-luxe-border" />
          <h1 className="text-center font-editorial text-2xl font-normal leading-tight tracking-editorial text-luxe-ink sm:text-3xl">
            {product.name}
          </h1>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-luxe-border" />
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-sm bg-luxe-bg-alt/70 shadow-luxe-sm ring-1 ring-luxe-border/80">
            <Image
              src={imageUrl}
              alt={product.name}
              width={600}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full w-full object-cover"
              unoptimized={imageUrl.startsWith("https://placehold")}
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentImage(i)}
                  className={`relative h-20 w-14 shrink-0 overflow-hidden rounded-sm border transition-all duration-300 ${
                    currentImage === i ? "border-luxe-accent/50 ring-1 ring-luxe-accent/20" : "border-luxe-border hover:border-luxe-mute/40"
                  }`}
                >
                  <Image
                    src={getProductImageUrl(product, i, 200)}
                    alt=""
                    width={56}
                    height={80}
                    sizes="56px"
                    className="h-full w-full object-cover"
                    unoptimized={getProductImageUrl(product, i, 200).startsWith("https://placehold")}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:sticky md:top-24 md:self-start">
          <p className="mt-2 text-2xl font-medium tabular-nums tracking-tight text-luxe-ink">
            {product.price.toLocaleString("ru-RU")} {product.currency}
          </p>
          {product.description && (
            <p className="mt-8 text-sm leading-relaxed text-luxe-mute">{product.description}</p>
          )}
          <dl className="mt-10 space-y-3 border-t border-luxe-border/90 pt-8 text-sm">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6">
                <dt className="text-luxe-mute">{s.label}</dt>
                <dd className="text-right text-luxe-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
          {product.colors.length > 0 && (
            <div className="mt-10">
              <p className="section-label mb-4">Цвет</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button key={c} type="button" onClick={() => setSelectedColor(c)} className={chip(selectedColor === c)}>
                    {formatColorLabel(c)}
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.sizes.length > 0 && (
            <div className="mt-8">
              <p className="section-label mb-4">Размер</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} type="button" onClick={() => setSelectedSize(s)} className={chip(selectedSize === s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-12 space-y-3">
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className="flex w-full items-center justify-center gap-2 rounded-sm border border-luxe-border py-3.5 text-[10px] uppercase tracking-[0.14em] text-luxe-ink transition-all duration-300 hover:border-luxe-graphite/25 hover:bg-luxe-bg-alt/80"
            >
              <IconHeart size="sm" filled={fav} className={fav ? "text-luxe-accent" : "text-luxe-mute"} />
              {fav ? "В избранном" : "В избранное"}
            </button>
            <div className="hidden flex-col gap-3 sm:flex">
              <button type="button" onClick={handleAddToCart} className="luxe-btn-primary w-full py-3.5">
                В корзину
              </button>
              <a
                href={TELEGRAM_CHAT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-sm border border-luxe-border py-3.5 text-[10px] uppercase tracking-[0.12em] text-luxe-ink transition-colors duration-300 hover:border-luxe-accent/35 hover:bg-luxe-accent-faint"
              >
                <IconTelegram size="sm" className="text-luxe-accent" />
                Консультация в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 rounded-t-sheet border-t border-luxe-border/90 bg-luxe-surface/95 p-4 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))] shadow-luxe backdrop-blur-md supports-[backdrop-filter]:bg-luxe-surface/90 sm:hidden">
        {actionButtons}
      </div>
    </div>
  );
}
