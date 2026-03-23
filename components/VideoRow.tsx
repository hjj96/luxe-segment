"use client";

import { useRef, useEffect } from "react";
import type { HomeVideo } from "@/lib/types";

export function VideoRow({ videos }: { videos: HomeVideo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const videoEls = el.querySelectorAll("video");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.5, rootMargin: "0px" }
    );
    videoEls.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [videos.length]);

  return (
    <section className="border-t border-luxe-border bg-luxe-bg-alt py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="section-title mb-8 sm:mb-10">
          Видео
        </h2>
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-snap-x pb-2 md:gap-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((v) => (
            <div
              key={v.id}
              className="w-[220px] shrink-0 scroll-snap-align-start sm:w-[260px] md:w-[300px]"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-luxe-bg ring-1 ring-black/[0.06] group">
                <video
                  src={v.src}
                  poster={v.poster}
                  muted
                  playsInline
                  loop
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-sm border border-black/0 transition-colors group-hover:border-black/10" />
              </div>
              {v.caption && (
                <p className="mt-3 text-xs text-luxe-mute">{v.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
