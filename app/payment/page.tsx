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
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Как проходит оплата</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Мы работаем по системе предоплаты: <span className="font-medium text-luxe-ink">50% / 50%</span>.
          </p>
          <ol className="mt-3 space-y-2 text-sm text-luxe-mute leading-relaxed list-decimal list-inside">
            <li>
              После согласования всех деталей заказа вы оплачиваете <span className="font-medium text-luxe-ink">50% стоимости</span>.
            </li>
            <li>
              Оставшиеся <span className="font-medium text-luxe-ink">50%</span> оплачиваются, когда товар поступает в наш офис в Москве и проходит финальную проверку перед отправкой вам.
            </li>
          </ol>
        </section>
        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Способ оплаты</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Оплата происходит <span className="font-medium text-luxe-ink">банковским переводом по реквизитам</span>.
            После согласования заказа мы отправляем вам счёт и подробные инструкции в Telegram.
          </p>
        </section>
        <section>
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Гарантии</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Если после оплаты и доставки будет выявлен производственный брак, мы организуем обмен или возврат.
            В течение года после покупки обеспечиваем сервисную поддержку и при необходимости замену изделия.
          </p>
        </section>
      </div>
      <p className="mt-10 text-sm text-luxe-mute">
        Вопросы по оплате и условиям — напишите нам в{" "}
        <a href="https://t.me/luxesegment" target="_blank" rel="noopener noreferrer" className="text-luxe-ink underline">
          Telegram
        </a>
        .
      </p>
    </div>
  );
}
