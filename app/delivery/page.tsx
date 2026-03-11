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
      <div className="mt-10 space-y-10 text-luxe-ink">
        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Доставка</h2>
          <div className="mt-3 grid gap-3 text-sm text-luxe-mute sm:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-label text-luxe-ink">
                Сроки
              </p>
              <p className="mt-1 leading-relaxed">
                Средний срок доставки — <span className="font-medium text-luxe-ink">15–20 дней</span> от момента подтверждения заказа.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-label text-luxe-ink">
                Стоимость
              </p>
              <p className="mt-1 leading-relaxed">
                Доставка уже включена в цену товара — ничего дополнительно оплачивать не нужно.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Как мы работаем</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Мы работаем уже более 10 лет и выстроили систему так, чтобы каждая позиция проходила многоступенчатую проверку качества.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-luxe-mute leading-relaxed">
            <li>
              <span className="text-luxe-ink">1.</span> Производство на фабрике в Китае.
            </li>
            <li>
              <span className="text-luxe-ink">2.</span> Обязательная проверка в нашем офисе в Пекине. При малейших нюансах мы запрашиваем замену на новый экземпляр.
            </li>
            <li>
              <span className="text-luxe-ink">3.</span> Финальная проверка и отправка в наш офис в Москве.
            </li>
            <li>
              <span className="text-luxe-ink">4.</span> Организация доставки по всей России.
            </li>
          </ul>
        </section>

        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Гарантии</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Мы всегда идём навстречу клиентам. Если выявляется производственный брак — товар можно вернуть или обменять.
          </p>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            В течение года после покупки мы обеспечиваем сервисную поддержку: ремонт или замену изделия при необходимости.
            Наша задача — чтобы вы были довольны не только в момент получения заказа, но и спустя время.
          </p>
        </section>

        <section>
          <p className="text-sm text-luxe-mute leading-relaxed">
            Если у вас возникают любые вопросы — просто напишите нам в Telegram. Мы всегда на связи и готовы помочь.
          </p>
        </section>
      </div>
    </div>
  );
}
