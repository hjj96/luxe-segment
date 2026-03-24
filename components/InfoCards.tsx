import Link from "next/link";

const CARDS = [
  { title: "Доставка", href: "/delivery", short: "По России и миру" },
  { title: "Оплата", href: "/payment", short: "Банковский перевод" },
  { title: "Гарантия", href: "/warranty", short: "Официальная гарантия" },
];

export function InfoCards() {
  return (
    <section className="border-t border-luxe-border/90 bg-luxe-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {CARDS.map(({ href, title, short }, idx) => (
            <Link
              key={href}
              href={href}
              className="group relative block border-b border-luxe-border/80 pb-8 text-center transition-colors duration-300 hover:border-luxe-accent/25 sm:border-b-0 sm:pb-0 sm:pt-2"
            >
              <div className="mb-5 flex justify-center sm:mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-luxe-border/90 transition-all duration-300 group-hover:border-luxe-accent/35 group-hover:bg-luxe-accent-faint">
                  <span className="font-editorial text-sm text-luxe-mute transition-colors group-hover:text-luxe-ink">{idx + 1}</span>
                </div>
              </div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-luxe-ink">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-luxe-mute transition-colors duration-300 group-hover:text-luxe-ink-soft">{short}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
