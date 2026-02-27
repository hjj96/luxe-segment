"use client";

import { useEffect } from "react";
import { IconFilter, IconX } from "./Icons";

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
      <div
        className="bottom-sheet-overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="bottom-sheet-panel" role="dialog" aria-modal="true">
        <div className="sticky top-0 flex items-center justify-between border-b border-luxe-border bg-white px-4 py-4 safe-area-padding">
          <span className="flex items-center gap-2 text-xs uppercase tracking-label text-luxe-ink">
            <IconFilter size="sm" />
            Фильтры
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-luxe-mute hover:text-luxe-ink"
            aria-label="Закрыть"
          >
            <IconX size="md" />
          </button>
        </div>
        <div className="p-4 pb-20">{children}</div>
      </div>
    </>
  );
}
