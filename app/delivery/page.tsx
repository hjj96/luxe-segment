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
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">О нас</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Мы работаем уже более 10 лет и выстроили систему так, чтобы каждая позиция проходила многоступенчатую проверку качества.
            Производство происходит на фабрике в Китае, далее товар проходит обязательную проверку в нашем офисе в Пекине. При малейших нюансах
            мы запрашиваем замену на новый экземпляр.
          </p>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            После финальной проверки изделие отправляется в наш офис в Москве, откуда мы организуем доставку по всей России.
          </p>
        </section>

        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Доставка</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Срок доставки составляет в среднем 15–20 дней.
          </p>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            В этот срок входит:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-luxe-mute leading-relaxed">
            <li>— изготовление позиции на фабрике;</li>
            <li>— проверка качества в нашем офисе в Китае;</li>
            <li>— при необходимости — обмен на новый экземпляр;</li>
            <li>— доставка в Москву;</li>
            <li>— отправка по России через СДЭК (в пункт выдачи или курьером до двери).</li>
          </ul>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Полная стоимость доставки уже включена в цену товара. Дополнительно ничего оплачивать не нужно.
          </p>
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
