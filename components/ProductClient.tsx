"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { getProductImageUrl, TELEGRAM_CHAT } from "@/lib/data";
import { IconHeart, IconCart, IconTelegram } from "./Icons";
import type { Product } from "@/lib/types";

export function ProductClient({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useCartFavorites();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors.length > 0 ? product.colors[0] : "");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes.length > 0 ? product.sizes[0] : "");
  const fav = isFavorite(product.id);

  const imageUrl = getProductImageUrl(product, currentImage);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: getProductImageUrl(product),
      options: {
        ...(product.colors.length ? { color: selectedColor } : {}),
        ...(product.sizes.length ? { size: selectedSize } : {}),
      },
    });
  };

  const actionButtons = (
    <>
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex-1 min-w-0 bg-luxe-ink py-3.5 text-xs uppercase tracking-[0.1em] text-white"
      >
        В корзину
      </button>
      <a
        href={TELEGRAM_CHAT}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 min-w-0 items-center justify-center gap-2 border border-luxe-ink py-3.5 text-xs uppercase tracking-[0.1em] text-luxe-ink"
      >
        <IconTelegram size="sm" />
        <span className="truncate">Telegram</span>
      </a>
    </>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 pb-24 sm:pb-10">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap text-2xl sm:text-3xl">
          {product.name}
        </h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden bg-luxe-bg-alt">
            <Image
              src={imageUrl}
              alt={product.name}
              width={600}
              height={800}
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
                  className={`relative h-20 w-14 shrink-0 overflow-hidden border ${
                    currentImage === i ? "border-luxe-ink" : "border-luxe-border"
                  }`}
                >
                  <Image
                    src={getProductImageUrl(product, i)}
                    alt=""
                    width={56}
                    height={80}
                    className="h-full w-full object-cover"
                    unoptimized={getProductImageUrl(product, i).startsWith("https://placehold")}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:sticky md:top-[4.5rem] md:self-start">
          <p className="text-[11px] uppercase tracking-label text-luxe-mute">{product.brand}</p>
          <p className="mt-6 text-lg text-luxe-ink">
            {product.price.toLocaleString("ru-RU")} {product.currency}
          </p>
          {product.description && (
            <p className="mt-6 text-sm text-luxe-mute leading-relaxed">
              {product.description}
            </p>
          )}
          <dl className="mt-8 space-y-2 border-t border-luxe-border pt-6 text-sm">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4">
                <dt className="text-luxe-mute">{s.label}</dt>
                <dd className="text-luxe-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
          {product.colors.length > 0 && (
            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-label text-luxe-mute mb-3">
                Цвет
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`border px-3 py-1.5 text-xs uppercase tracking-label transition-colors ${
                      selectedColor === c
                        ? "border-luxe-ink bg-luxe-ink text-white"
                        : "border-luxe-border text-luxe-ink hover:border-luxe-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-label text-luxe-mute mb-3">
                Размер
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`border px-3 py-1.5 text-xs uppercase tracking-label transition-colors ${
                      selectedSize === s
                        ? "border-luxe-ink bg-luxe-ink text-white"
                        : "border-luxe-border text-luxe-ink hover:border-luxe-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-10 space-y-3">
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className="flex w-full items-center justify-center gap-2 border border-luxe-ink py-3.5 text-xs uppercase tracking-label text-luxe-ink"
            >
              <IconHeart size="sm" filled={fav} className={fav ? "text-black" : ""} />
              {fav ? "В избранном" : "В избранное"}
            </button>
            {/* Десктоп: блок в корзину + Telegram */}
            <div className="hidden sm:flex sm:gap-3 sm:flex-col">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-luxe-ink py-3.5 text-xs uppercase tracking-label text-white"
              >
                В корзину
              </button>
              <a
                href={TELEGRAM_CHAT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 border border-luxe-ink py-3.5 text-xs uppercase tracking-label text-luxe-ink"
              >
                <IconTelegram size="sm" />
                Консультация в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная фиксированная панель — всегда видна внизу экрана */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 border-t border-luxe-border bg-white p-4 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden">
        {actionButtons}
      </div>
    </div>
  );
}
