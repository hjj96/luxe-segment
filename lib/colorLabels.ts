/** Нормализация подписей цвета для фильтров и карточек (единый стиль, исправление опечаток). */
const RAW_TO_LABEL: Record<string, string> = {
  голбой: "Голубой",
  голубой: "Голубой",
  черный: "Чёрный",
  белый: "Белый",
  бежевый: "Бежевый",
  серый: "Серый",
  коричневый: "Коричневый",
  синий: "Синий",
  бордовый: "Бордовый",
  оливковый: "Оливковый",
  розовый: "Розовый",
  зеленый: "Зелёный",
  желтый: "Жёлтый",
};

export function formatColorLabel(raw: string): string {
  const k = raw.trim().toLowerCase();
  if (RAW_TO_LABEL[k]) return RAW_TO_LABEL[k];
  if (!raw.trim()) return raw;
  return raw.trim().charAt(0).toUpperCase() + raw.trim().slice(1).toLowerCase();
}
