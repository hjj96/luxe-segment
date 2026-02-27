"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { IconTrash } from "@/components/Icons";

function optsKey(opts: { color?: string; size?: string }): string {
  return [opts.color ?? "", opts.size ?? ""].join("::");
}

function optionsLabel(opts: { color?: string; size?: string }): string {
  const parts = [opts.color, opts.size].filter(Boolean);
  return parts.length ? ` (${parts.join(", ")})` : "";
}

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartCount } = useCartFavorites();

  if (cartCount === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-luxe-border" />
          <h1 className="section-title whitespace-nowrap">Корзина</h1>
          <div className="h-px flex-1 bg-luxe-border" />
        </div>
        <p className="mt-4 text-sm text-luxe-mute">Корзина пуста.</p>
        <Link
          href="/catalog"
          className="mt-8 inline-block border-b border-luxe-ink pb-1 text-xs uppercase tracking-label text-luxe-ink"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">
          Корзина
        </h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>
      <div className="grid gap-10 md:grid-cols-3 md:gap-14">
        <div className="md:col-span-2 space-y-8">
          {cart.map((item) => {
            const key = item.productId + "::" + optsKey(item.options);
            return (
              <div
                key={key}
                className="flex gap-6 border-b border-luxe-border pb-8"
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-luxe-bg-alt">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized={item.image.startsWith("https://placehold")}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-label text-luxe-mute">{item.brand}</p>
                  <Link href={`/product/${item.productId}`} className="text-sm text-luxe-ink hover:underline">
                    {item.name}{optionsLabel(item.options)}
                  </Link>
                  <p className="mt-1 text-sm text-luxe-mute">
                    {item.price.toLocaleString("ru-RU")} ₽ × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1, optsKey(item.options))}
                      className="h-8 w-8 border border-luxe-border text-luxe-ink"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1, optsKey(item.options))}
                      className="h-8 w-8 border border-luxe-border text-luxe-ink"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId, optsKey(item.options))}
                    className="flex h-8 w-8 items-center justify-center border border-luxe-border text-luxe-mute transition-colors hover:text-luxe-ink"
                    aria-label="Удалить из корзины"
                  >
                    <IconTrash size="sm" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="sticky top-24 border-t border-luxe-border pt-6">
            <p className="text-xs uppercase tracking-label text-luxe-mute">Итого</p>
            <p className="mt-2 text-2xl text-luxe-ink">
              {total.toLocaleString("ru-RU")} ₽
            </p>
            <Link
              href="/checkout"
              className="mt-8 block w-full bg-luxe-ink py-3.5 text-center text-xs uppercase tracking-label text-white"
            >
              Оформить заказ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
