"use client";

import Link from "next/link";
import { TELEGRAM_CHANNEL, TELEGRAM_CHAT } from "@/lib/data";
import { IconTelegram } from "./Icons";

export function TelegramBar() {
  return (
    <div className="relative bg-black text-white">
      <div className="border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-2.5 text-[11px] uppercase tracking-label sm:gap-x-12 sm:text-xs">
          <Link
            href={TELEGRAM_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/88 transition-colors duration-200 hover:text-white"
          >
            <IconTelegram size="sm" className="shrink-0 opacity-90" />
            <span>Связаться с нами в Telegram</span>
          </Link>
          <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
          <Link
            href={TELEGRAM_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/88 transition-colors duration-200 hover:text-white"
          >
            <IconTelegram size="sm" className="shrink-0 opacity-90" />
            <span>Telegram Канал</span>
          </Link>
        </div>
      </div>
      {/* Мягкий переход к светлому блоку (крошки / контент) */}
      <div
        className="pointer-events-none h-3 bg-gradient-to-b from-black via-zinc-950 to-luxe-bg-alt sm:h-4"
        aria-hidden
      />
    </div>
  );
}
