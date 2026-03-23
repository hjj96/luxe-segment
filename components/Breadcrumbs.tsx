"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PATH_NAMES: Record<string, string> = {
  "/": "Главная",
  "/catalog": "Каталог",
  "/favorites": "Избранное",
  "/cart": "Корзина",
  "/checkout": "Оформление заказа",
  "/account": "Аккаунт",
  "/delivery": "Доставка",
  "/payment": "Оплата",
  "/warranty": "Гарантия",
};

function getPathLabel(path: string): string {
  if (path.startsWith("/product/")) {
    return "Товар";
  }
  if (PATH_NAMES[path]) {
    return PATH_NAMES[path];
  }
  const lastSegment = path.split("/").filter(Boolean).pop();
  if (!lastSegment) return "";
  if (lastSegment === "product") return "Каталог";
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

export function Breadcrumbs() {
  const pathname = usePathname();

  const show = pathname === "/catalog" || pathname.startsWith("/product/");
  if (!show) return null;

  /* Страница товара: Главная → Каталог → Товар (без англ. «Product») */
  if (pathname.startsWith("/product/")) {
    return (
      <nav
        className="border-b border-luxe-border bg-luxe-bg-alt py-3.5"
        aria-label="Хлебные крошки"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-luxe-mute">
            <Link href="/" className="hover:text-luxe-ink transition-colors duration-200">
              Главная
            </Link>
            <span className="text-luxe-border/90">/</span>
            <Link href="/catalog" className="hover:text-luxe-ink transition-colors duration-200">
              Каталог
            </Link>
            <span className="text-luxe-border/90">/</span>
            <span className="text-luxe-ink">Товар</span>
          </div>
        </div>
      </nav>
    );
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [
    { href: "/", label: "Главная" },
    ...pathSegments.map((_, idx) => {
      const href = "/" + pathSegments.slice(0, idx + 1).join("/");
      return {
        href,
        label: getPathLabel(href),
      };
    }),
  ];

  return (
    <nav
      className="border-b border-luxe-border bg-luxe-bg-alt py-3.5"
      aria-label="Хлебные крошки"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-luxe-mute">
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {idx > 0 && <span className="text-luxe-border/90">/</span>}
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-luxe-ink">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-luxe-ink transition-colors duration-200">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
