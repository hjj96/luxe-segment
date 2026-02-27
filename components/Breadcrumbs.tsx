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

// Функция для получения названия страницы из пути
function getPathLabel(path: string): string {
  if (path.startsWith("/product/")) {
    return "Товар";
  }
  if (PATH_NAMES[path]) {
    return PATH_NAMES[path];
  }
  const lastSegment = path.split("/").pop();
  if (!lastSegment) return "";
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // Только на каталоге и странице товара
  const show = pathname === "/catalog" || pathname.startsWith("/product/");
  if (!show) return null;

  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [
    { href: "/", label: "Главная" },
    ...pathSegments.map((segment, idx) => {
      const href = "/" + pathSegments.slice(0, idx + 1).join("/");
      return {
        href,
        label: getPathLabel(href),
      };
    }),
  ];

  return (
    <nav className="border-b border-luxe-border bg-luxe-bg-alt py-3">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-luxe-mute">
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {idx > 0 && <span className="text-luxe-border">/</span>}
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-luxe-ink">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-luxe-ink transition-colors">
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
