import Link from "next/link";
import { TELEGRAM_CHANNEL, TELEGRAM_CHAT } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-luxe-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-xs uppercase tracking-nav text-white/70">
              Каталог
            </h3>
            <nav className="mt-4 space-y-2">
              <Link href="/catalog" className="block text-sm text-white/90 hover:text-white">
                Все товары
              </Link>
              <Link href="/catalog?category=clothing" className="block text-sm text-white/90 hover:text-white">
                Одежда
              </Link>
              <Link href="/catalog?category=shoes" className="block text-sm text-white/90 hover:text-white">
                Обувь
              </Link>
              <Link href="/catalog?category=bags" className="block text-sm text-white/90 hover:text-white">
                Сумки
              </Link>
              <Link href="/catalog?category=accessories" className="block text-sm text-white/90 hover:text-white">
                Аксессуары
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-nav text-white/70">
              Информация
            </h3>
            <nav className="mt-4 space-y-2">
              <Link href="/delivery" className="block text-sm text-white/90 hover:text-white">
                Доставка
              </Link>
              <Link href="/payment" className="block text-sm text-white/90 hover:text-white">
                Оплата
              </Link>
              <Link href="/warranty" className="block text-sm text-white/90 hover:text-white">
                Гарантия
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-nav text-white/70">
              Контакты
            </h3>
            <div className="mt-4 space-y-2">
              <a
                href={TELEGRAM_CHAT}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/90 hover:text-white"
              >
                Консультация в Telegram
              </a>
              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/90 hover:text-white"
              >
                Канал Luxe Segment
              </a>
            </div>
          </div>
          <div>
            <p className="text-lg tracking-tight text-white">Luxe Segment</p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Luxe Segment
        </div>
      </div>
    </footer>
  );
}
