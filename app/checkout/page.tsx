"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { TELEGRAM_CHAT, TELEGRAM_CHANNEL } from "@/lib/data";
import { IconTelegram } from "@/components/Icons";

export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCartFavorites();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
    paymentMethod: "transfer" as const,
    deliveryMethod: "standard" as "standard" | "express",
  });

  if (cartCount === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-luxe-border" />
          <h1 className="section-title whitespace-nowrap">Оформление заказа</h1>
          <div className="h-px flex-1 bg-luxe-border" />
        </div>
        <p className="mt-4 text-sm text-luxe-mute">Корзина пуста.</p>
        <Link href="/cart" className="mt-8 inline-block border-b border-luxe-ink pb-1 text-xs uppercase tracking-label text-luxe-ink">
          В корзину
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-luxe-border" />
          <h1 className="section-title whitespace-nowrap">Спасибо!</h1>
          <div className="h-px flex-1 bg-luxe-border" />
        </div>
        <p className="mt-4 text-sm text-luxe-mute">
          Мы свяжемся с вами для подтверждения заказа.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={TELEGRAM_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-luxe-ink px-6 py-3.5 text-xs uppercase tracking-label text-luxe-ink"
          >
            <IconTelegram size="sm" />
            Написать в Telegram
          </a>
          <a
            href={TELEGRAM_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-luxe-ink px-6 py-3.5 text-xs uppercase tracking-label text-white"
          >
            <IconTelegram size="sm" />
            Канал Luxe Segment
          </a>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cart,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
        return;
      }

      setSubmitted(true);
      clearCart();
    } catch (err) {
      setError("Ошибка соединения. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">
          Оформление заказа
        </h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>
      <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {error && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-label text-luxe-mute mb-2">
              Имя
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border-b border-luxe-border bg-transparent px-0 py-3 text-luxe-ink"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs uppercase tracking-label text-luxe-mute mb-2">
              Телефон
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full border-b border-luxe-border bg-transparent px-0 py-3 text-luxe-ink"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-xs uppercase tracking-label text-luxe-mute mb-2">
              Адрес
            </label>
            <input
              id="address"
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className="w-full border-b border-luxe-border bg-transparent px-0 py-3 text-luxe-ink"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-xs uppercase tracking-label text-luxe-mute mb-2">
              Комментарий
            </label>
            <textarea
              id="comment"
              rows={3}
              value={form.comment}
              onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              className="w-full border-b border-luxe-border bg-transparent px-0 py-3 text-luxe-ink"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-label text-luxe-mute mb-2">Способ оплаты</p>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="transfer"
                checked
                readOnly
                className="radio-minimal"
              />
              <span className="text-sm text-luxe-ink">Банковский перевод</span>
            </label>
          </div>
          <div>
            <p className="text-xs uppercase tracking-label text-luxe-mute mb-2">Доставка</p>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={form.deliveryMethod === "standard"}
                onChange={() => setForm((f) => ({ ...f, deliveryMethod: "standard" }))}
                className="radio-minimal"
              />
              <span className="text-sm text-luxe-ink">Стандартная (2–3 недели)</span>
            </label>
            <label className="mt-2 flex items-center gap-2">
              <input
                type="radio"
                name="delivery"
                value="express"
                checked={form.deliveryMethod === "express"}
                onChange={() => setForm((f) => ({ ...f, deliveryMethod: "express" }))}
                className="radio-minimal"
              />
              <span className="text-sm text-luxe-ink">Экспресс (5–12 дней)</span>
            </label>
          </div>
        </div>
        <div>
          <div className="sticky top-24 border-t border-luxe-border pt-6">
            <p className="text-sm text-luxe-mute">Товары</p>
            <ul className="mt-3 space-y-2 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <li key={item.productId + JSON.stringify(item.options)} className="flex gap-2 text-sm">
                  <div className="relative h-12 w-10 shrink-0 overflow-hidden bg-luxe-bg-alt">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized={item.image.startsWith("https://placehold")}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-luxe-ink truncate">{item.name}</p>
                    <p className="text-luxe-mute">{item.quantity} × {item.price.toLocaleString("ru-RU")} ₽</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg text-luxe-ink">
              Итого: {total.toLocaleString("ru-RU")} ₽
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full bg-luxe-ink py-3.5 text-xs uppercase tracking-label text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Отправка..." : "Отправить заявку"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
