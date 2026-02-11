"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartFavorites } from "@/components/CartFavoritesProvider";
import { useAuth } from "@/components/AuthProvider";
import {
  IconMenu,
  IconX,
  IconSearch,
  IconGrid,
  IconHeart,
  IconCart,
  IconUser,
} from "./Icons";

// Убрали "Главная" - логотип выполняет эту роль
const NAV = [
  { href: "/catalog", label: "Каталог", icon: IconGrid },
  { href: "/favorites", label: "Избранное", icon: IconHeart },
  { href: "/cart", label: "Корзина", icon: IconCart },
  { href: "/account", label: "Аккаунт", icon: IconUser },
];

export function Header() {
  const pathname = usePathname();
  const { cartCount } = useCartFavorites();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-black text-white safe-area-padding">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        {/* Left: Search */}
        <div className="flex items-center gap-2 flex-none min-w-0 max-w-[30%] sm:max-w-[35%]">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2 min-w-0 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                autoFocus
                className="bg-white/10 border border-white/20 px-3 py-1.5 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 w-full max-w-[180px] sm:max-w-[220px]"
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              />
              <button type="submit" className="text-white shrink-0">
                <IconSearch size="sm" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-xs uppercase tracking-nav text-white/90 hover:text-white shrink-0 whitespace-nowrap"
              aria-label="Поиск"
            >
              <IconSearch size="sm" />
              <span className="hidden sm:inline">Поиск</span>
            </button>
          )}
        </div>

        {/* Center: Logo */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl tracking-tight text-white sm:text-2xl z-10 pointer-events-auto"
        >
          Luxe Segment
        </Link>

        {/* Right: Nav (desktop) */}
        <nav className="hidden items-center gap-4 md:gap-6 md:flex flex-none min-w-0 max-w-[40%] sm:max-w-[45%]">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 text-xs uppercase tracking-nav transition-colors shrink-0 ${
                pathname === href
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Icon size="sm" className="shrink-0" />
              <span>{label}</span>
              {href === "/cart" && cartCount > 0 && (
                <span className="text-[10px] shrink-0">({cartCount})</span>
              )}
              {href === "/account" && user && (
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" title="Авторизован" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile: cart + menu */}
        <div className="flex items-center gap-1 md:hidden flex-none">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 p-2 text-white"
            aria-label="Корзина"
          >
            <IconCart size="md" />
            {cartCount > 0 && (
              <span className="text-[10px]">({cartCount})</span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-2 text-white"
            aria-label="Меню"
          >
            <IconMenu size="md" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-black md:hidden">
            <div className="flex items-center justify-between border-b border-white/20 px-4 py-4">
              <span className="text-xs uppercase tracking-nav text-white/80">Меню</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 text-white"
                aria-label="Закрыть"
              >
                <IconX size="md" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-0 overflow-auto py-4">
              <Link
                href="/"
                className={`flex items-center gap-3 border-b border-white/10 px-6 py-4 text-sm uppercase tracking-nav ${
                  pathname === "/" ? "text-white" : "text-white/80"
                }`}
              >
                <span>Главная</span>
              </Link>
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 border-b border-white/10 px-6 py-4 text-sm uppercase tracking-nav ${
                    pathname === href ? "text-white" : "text-white/80"
                  }`}
                >
                  <Icon size="sm" className="shrink-0" />
                  <span>{label}</span>
                  {href === "/cart" && cartCount > 0 && (
                    <span className="ml-auto">({cartCount})</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
