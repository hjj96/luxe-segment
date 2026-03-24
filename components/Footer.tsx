import Link from "next/link";
import { TELEGRAM_CHANNEL } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.07] bg-luxe-graphite text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-center text-center">
          <p className="font-editorial text-2xl font-medium tracking-[0.28em] text-white/95 sm:text-3xl">LS</p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/45 sm:text-sm">
            Премиальная подборка. Заказ и консультации — в Telegram.
          </p>

          <nav
            className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[11px] uppercase tracking-[0.18em] text-white/55"
            aria-label="Подвал"
          >
            <Link href="/catalog" className="transition-colors duration-300 hover:text-white">
              Каталог
            </Link>
            <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
            <Link href="/delivery" className="transition-colors duration-300 hover:text-white">
              Доставка и оплата
            </Link>
            <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
            <a
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxe-accent-soft transition-colors duration-300 hover:text-luxe-accent-soft/90"
            >
              Telegram-канал
            </a>
          </nav>
        </div>

        <div className="mt-16 border-t border-white/[0.08] pt-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">© {year} Luxe Segment</p>
        </div>
      </div>
    </footer>
  );
}
