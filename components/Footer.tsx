import Link from "next/link";
import { TELEGRAM_CHANNEL } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-luxe-border bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <div className="space-y-4">
            <p className="text-lg tracking-[0.15em] font-light">LS</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
              <Link href="/catalog" className="transition-colors duration-200 hover:text-white">Каталог</Link>
              <Link href="/delivery" className="transition-colors duration-200 hover:text-white">Доставка и Оплата</Link>
              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-white"
              >
                Telegram Канал
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/50">
          © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
