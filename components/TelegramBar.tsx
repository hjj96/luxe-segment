"use client";

import Link from "next/link";
import { TELEGRAM_CHANNEL, TELEGRAM_CHAT } from "@/lib/data";
import { IconTelegram } from "./Icons";

export function TelegramBar() {
  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-2.5 text-xs uppercase tracking-label sm:gap-10">
        <Link
          href={TELEGRAM_CHAT}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/90 transition hover:text-white"
        >
          <IconTelegram size="sm" className="shrink-0" />
          <span>Связаться с нами в Telegram</span>
        </Link>
        <Link
          href={TELEGRAM_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/90 transition hover:text-white"
        >
          <IconTelegram size="sm" className="shrink-0" />
          <span>Telegram Канал</span>
        </Link>
      </div>
    </div>
  );
}
