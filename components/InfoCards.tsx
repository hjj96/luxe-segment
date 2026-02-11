import Link from "next/link";

const CARDS = [
  { title: "Доставка", href: "/delivery", short: "По России и миру" },
  { title: "Оплата", href: "/payment", short: "Банковский перевод" },
  { title: "Гарантия", href: "/warranty", short: "Официальная гарантия" },
];

export function InfoCards() {
  return (
    <section className="border-t border-luxe-border bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {CARDS.map(({ href, title, short }, idx) => (
            <Link
              key={href}
              href={href}
              className="group relative block text-center pb-6 border-b border-luxe-border hover:border-luxe-ink transition-colors"
            >
              <div className="mb-4 flex justify-center">
                <div className="h-12 w-12 rounded-full border border-luxe-border flex items-center justify-center group-hover:border-luxe-ink transition-colors">
                  <span className="text-xs uppercase tracking-label text-luxe-mute group-hover:text-luxe-ink">
                    {idx + 1}
                  </span>
                </div>
              </div>
              <h3 className="text-xs uppercase tracking-label text-luxe-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm text-luxe-mute group-hover:text-luxe-ink transition-colors">
                {short}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
