"use client";

import Link from "next/link";
import { TELEGRAM_CHANNEL, TELEGRAM_CHAT } from "@/lib/data";
import { IconTelegram } from "./Icons";

export function TelegramBar() {
  return (
    <div className="border-b border-white/[0.08] bg-luxe-graphite text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7">
        <div className="mx-auto max-w-md border-t border-white/[0.1] pt-6 sm:max-w-lg sm:pt-7">
          <div className="flex flex-col gap-6 sm:gap-7">
            <Link
              href={TELEGRAM_CHAT}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 text-center transition-opacity duration-300 hover:opacity-95"
            >
              <span className="flex items-center justify-center gap-2 text-luxe-accent-soft transition-transform duration-300 group-hover:scale-[1.02]">
                <IconTelegram size="sm" className="opacity-90" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/95 sm:text-xs">
                Связаться с нами в Telegram
              </span>
              <span className="text-[10px] tracking-[0.08em] text-white/40">Консультация и заказ</span>
            </Link>

            <div className="h-px w-full max-w-[120px] self-center bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />

            <Link
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white/85 sm:text-[11px]"
            >
              <span className="inline-flex items-center gap-2">
                <IconTelegram size="sm" className="h-3.5 w-3.5 opacity-60" />
                Telegram-канал
              </span>
              <span className="normal-case tracking-normal text-white/35">Новинки и обновления ассортимента</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
