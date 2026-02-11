export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">
          Гарантия
        </h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>
      <div className="mt-10 space-y-8 text-luxe-ink">
        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Официальная гарантия</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Товары поставляются с официальной гарантией производителя. Срок и условия указаны в документах к каждому изделию.
          </p>
        </section>
        <section className="border-b border-luxe-border pb-8">
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Подлинность</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Мы работаем только с оригинальной продукцией. При необходимости предоставляются чеки и документы.
          </p>
        </section>
        <section>
          <h2 className="text-sm uppercase tracking-label text-luxe-ink">Возврат</h2>
          <p className="mt-3 text-sm text-luxe-mute leading-relaxed">
            Условия возврата и обмена обсуждаются индивидуально. Обращайтесь в Telegram для решения любых вопросов.
          </p>
        </section>
      </div>
      <p className="mt-10 text-sm text-luxe-mute">
        По гарантии и возвратам:{" "}
        <a href="https://t.me/luxesegment" target="_blank" rel="noopener noreferrer" className="text-luxe-ink underline">
          Telegram
        </a>
      </p>
    </div>
  );
}
