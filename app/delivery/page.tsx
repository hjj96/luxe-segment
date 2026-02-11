export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">
          Доставка
        </h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>
      <div className="mt-10 space-y-8 text-luxe-ink">
        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">По России</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Доставка курьером или почтой. Сроки и стоимость уточняются при оформлении заказа и подтверждаются в Telegram.
          </p>
        </section>
        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Международная доставка</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Отправка в страны СНГ и дальнее зарубежье. Условия и сроки обсуждаются индивидуально.
          </p>
        </section>
        <section>
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Стандартная и экспресс</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Стандартная доставка — ориентировочно 2–3 недели. Экспресс — 5–12 дней в зависимости от направления.
          </p>
        </section>
      </div>
      <p className="mt-10 text-sm text-luxe-mute">
        По всем вопросам доставки:{" "}
        <a href="https://t.me/luxesegment" target="_blank" rel="noopener noreferrer" className="text-luxe-ink underline">
          Telegram
        </a>
      </p>
    </div>
  );
}
