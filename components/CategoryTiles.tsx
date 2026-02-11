import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryTiles({ categories }: { categories: Category[] }) {
  return (
    <section className="border-t border-luxe-border bg-luxe-bg-alt py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex items-center gap-4 sm:mb-14">
          <div className="h-px flex-1 bg-luxe-border" />
          <h2 className="section-title whitespace-nowrap text-center">
            Каталог
          </h2>
          <div className="h-px flex-1 bg-luxe-border" />
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
          {categories.map((c, idx) => (
            <div key={c.slug} className="flex items-center gap-12">
              <Link
                href={c.href}
                className="relative text-base font-medium uppercase tracking-label text-luxe-ink hover:opacity-70 transition-opacity after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-luxe-ink hover:after:w-full after:transition-all"
              >
                {c.name}
              </Link>
              {idx < categories.length - 1 && (
                <span className="hidden sm:inline-block h-4 w-px bg-luxe-border" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
