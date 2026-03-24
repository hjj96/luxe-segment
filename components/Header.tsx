"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { useAuth } from "@/components/AuthProvider";
import { TELEGRAM_CHANNEL, TELEGRAM_CHAT } from "@/lib/data";
import { IconMenu, IconX, IconSearch, IconHeart, IconCart, IconTelegram } from "./Icons";

const CATALOG_LINKS = [
  { href: "/catalog", label: "Все" },
  { href: "/catalog?category=clothing", label: "Одежда" },
  { href: "/catalog?category=bags", label: "Сумки" },
  { href: "/catalog?category=shoes", label: "Обувь" },
  { href: "/catalog?category=accessories", label: "Аксессуары" },
];

const iconBtn =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/75 transition-colors duration-300 ease-luxe hover:bg-white/[0.06] hover:text-white active:scale-[0.97]";

export function Header() {
  const pathname = usePathname();
  const { cartCount } = useCartFavorites();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (menuOpen || searchOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-luxe-graphite text-white safe-area-padding">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-[1.125rem]">
        <div className="flex w-[104px] items-center justify-start gap-0.5 sm:w-[112px]">
          <button type="button" onClick={() => setMenuOpen(true)} className={iconBtn} aria-label="Меню">
            <IconMenu size="md" />
          </button>
          <button type="button" onClick={() => setSearchOpen(true)} className={iconBtn} aria-label="Поиск">
            <IconSearch size="md" />
          </button>
        </div>

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-editorial text-[1.125rem] font-medium tracking-[0.38em] text-white/95 sm:text-xl"
        >
          LS
        </Link>

        <div className="flex w-[104px] items-center justify-end gap-0.5 sm:w-[112px]">
          <Link href="/favorites" className={iconBtn} aria-label="Избранное">
            <IconHeart size="md" filled className="text-white/90" />
          </Link>
          <Link href="/cart" className={`${iconBtn} relative`} aria-label="Корзина">
            <IconCart size="md" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-luxe-accent-soft px-1 text-[10px] font-medium text-luxe-graphite">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex animate-luxe-fade flex-col bg-luxe-graphite"
          role="dialog"
          aria-modal="true"
          aria-label="Поиск"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4 safe-area-padding">
            <form onSubmit={handleSearch} className="flex flex-1 items-center gap-3">
              <IconSearch size="lg" className="shrink-0 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по каталогу"
                autoFocus
                className="flex-1 border-b border-transparent bg-transparent py-2 text-base text-white placeholder:text-white/35 focus:border-luxe-accent-soft/50 focus:outline-none"
              />
            </form>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="rounded-full p-2.5 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Закрыть"
            >
              <IconX size="lg" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-end p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={handleSearch}
              className="luxe-btn-primary w-full py-4"
            >
              Искать
            </button>
          </div>
        </div>
      )}

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex animate-luxe-fade flex-col bg-luxe-graphite"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
        >
          <div className="flex items-center justify-end border-b border-white/[0.08] px-4 py-4 safe-area-padding">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-full p-2.5 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Закрыть"
            >
              <IconX size="lg" />
            </button>
          </div>

          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 pt-2">
            <p className="section-label mb-6 text-white/40">Аккаунт</p>
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="group border-b border-white/[0.08] py-5 font-editorial text-2xl tracking-editorial text-white/92 transition-colors hover:text-white sm:text-[1.75rem]"
            >
              <span className="flex items-center gap-2">
                {user ? "Аккаунт" : "Войти"}
                {user && <span className="inline-block h-1.5 w-1.5 rounded-full bg-luxe-accent-soft" aria-hidden />}
              </span>
            </Link>

            <p className="section-label mb-4 mt-10 text-white/40">Каталог</p>
            <div className="flex flex-col">
              {CATALOG_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/[0.08] py-5 font-editorial text-2xl tracking-editorial text-white/88 transition-colors hover:text-white sm:text-[1.75rem]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t border-white/[0.08] bg-luxe-graphite-elevated/80 px-6 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <p className="section-label mb-5 text-center text-white/35">Связь</p>
            <div className="flex flex-col gap-4">
              <a
                href={TELEGRAM_CHAT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-white/[0.12] py-4 text-[11px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:border-luxe-accent-soft/50 hover:bg-white/[0.04]"
              >
                <IconTelegram size="sm" className="text-luxe-accent-soft" />
                Связаться в Telegram
              </a>
              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs tracking-[0.12em] text-white/45 transition-colors hover:text-white/80"
              >
                Telegram-канал
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
