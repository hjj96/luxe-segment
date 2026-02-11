export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">
          Оплата
        </h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>
      <div className="mt-10 space-y-8 text-luxe-ink">
        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Банковский перевод</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Оплата по счёту после подтверждения заказа. Реквизиты и инструкции отправляются в Telegram после согласования заказа.
          </p>
        </section>
        <section>
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Без оплаты на сайте</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            На этом сайте не принимаются онлайн-платежи. Все расчёты производятся после контакта с менеджером в Telegram.
          </p>
        </section>
      </div>
      <p className="mt-10 text-sm text-luxe-mute">
        Вопросы по оплате:{" "}
        <a href="https://t.me/luxesegment" target="_blank" rel="noopener noreferrer" className="text-luxe-ink underline">
          Telegram
        </a>
      </p>
    </div>
  );
}
