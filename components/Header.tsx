"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { useAuth } from "@/components/AuthProvider";
import { IconMenu, IconX, IconSearch, IconHeart, IconCart } from "./Icons";

const CATALOG_LINKS = [
  { href: "/catalog", label: "Все" },
  { href: "/catalog?category=clothing", label: "Одежда" },
  { href: "/catalog?category=bags", label: "Сумки" },
  { href: "/catalog?category=shoes", label: "Обувь" },
  { href: "/catalog?category=accessories", label: "Аксессуары" },
];

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
    <header className="sticky top-0 z-30 bg-black text-white safe-area-padding">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <div className="flex w-[88px] items-center justify-start gap-1">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-white/90 hover:text-white transition-colors"
            aria-label="Меню"
          >
            <IconMenu size="md" />
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-white/90 hover:text-white transition-colors"
            aria-label="Поиск"
          >
            <IconSearch size="md" />
          </button>
        </div>

        {/* Логотип LS */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg tracking-[0.2em] font-light text-white sm:text-xl z-10"
        >
          LS
        </Link>

        {/* Избранное и Корзина */}
        <div className="flex w-[88px] items-center justify-end gap-1">
          <Link
            href="/favorites"
            className="flex h-9 w-9 items-center justify-center text-white/90 hover:text-white transition-colors"
            aria-label="Избранное"
          >
            <IconHeart size="md" filled className="text-white" />
          </Link>
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center text-white/90 hover:text-white transition-colors"
            aria-label="Корзина"
          >
            <IconCart size="md" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-white text-[10px] font-medium text-black flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Полноэкранный поиск */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col" role="dialog" aria-modal="true" aria-label="Поиск">
          <div className="flex items-center justify-between px-4 py-4 safe-area-padding border-b border-white/10">
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-3">
              <IconSearch size="lg" className="text-white shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск"
                autoFocus
                className="flex-1 bg-transparent text-white text-lg placeholder-white/40 focus:outline-none"
              />
            </form>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Закрыть"
            >
              <IconX size="lg" />
            </button>
          </div>
          <div className="flex-1 p-4">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full py-4 border border-white/20 text-white/90 hover:bg-white/5 transition-colors text-sm uppercase tracking-[0.1em]"
            >
              Искать
            </button>
          </div>
        </div>
      )}

      {/* Боковое меню на весь экран */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col" role="dialog" aria-modal="true" aria-label="Меню">
          <div className="flex items-center justify-end px-4 py-4 safe-area-padding border-b border-white/10">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Закрыть"
            >
              <IconX size="lg" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col px-6 py-6 gap-0">
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-xl tracking-[0.05em] text-white/90 hover:text-white transition-colors border-b border-white/10"
            >
              {user ? "Аккаунт" : "Войти в аккаунт"}
              {user && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />}
            </Link>
            {CATALOG_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-xl tracking-[0.05em] border-b border-white/10 text-white/90 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
