import Link from "next/link";
import { TELEGRAM_CHANNEL } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Плавный переход от светлого main к тёмному подвалу */}
      <div
        className="h-8 bg-gradient-to-b from-luxe-bg via-[#e8e6e4]/40 to-[#0a0a0a] sm:h-10"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-2 sm:px-6 sm:pb-16 sm:pt-0">
        <div className="text-center">
          <div className="space-y-4">
            <p className="text-lg tracking-[0.15em] font-light">LS</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
              <Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link>
              <Link href="/delivery" className="hover:text-white transition-colors">Доставка и Оплата</Link>
              <a
                href={TELEGRAM_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
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
