"use client";

import { useEffect } from "react";
import { IconX } from "./Icons";

export function FilterSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="bottom-sheet-overlay animate-luxe-fade" onClick={onClose} aria-hidden="true" />
      <div className="bottom-sheet-panel flex max-h-[88vh] flex-col" role="dialog" aria-modal="true" aria-labelledby="filter-sheet-title">
        <div className="flex shrink-0 flex-col items-center border-b border-luxe-border/80 bg-luxe-surface pt-3 pb-2 safe-area-padding">
          <div className="mb-3 h-1 w-10 rounded-full bg-luxe-border" aria-hidden />
          <div className="flex w-full items-center justify-between px-4 pb-3">
            <span id="filter-sheet-title" className="font-editorial text-xl tracking-editorial text-luxe-ink">
              Фильтры
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2.5 text-luxe-mute transition-colors duration-300 hover:bg-luxe-bg-alt hover:text-luxe-ink"
              aria-label="Закрыть"
            >
              <IconX size="md" />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-2">{children}</div>
      </div>
    </>
  );
}
