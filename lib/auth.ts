// Утилиты для работы с кодами и сессиями

// Генерация 6-значного кода
export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Проверка формата телефона (российский формат)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 11 && cleaned.startsWith("7");
}

// Проверка формата email
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Нормализация телефона
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("8")) {
    return "7" + cleaned.slice(1);
  }
  if (!cleaned.startsWith("7") && cleaned.length === 10) {
    return "7" + cleaned;
  }
  return cleaned;
}

// Определение типа входа (phone или email)
export function getAuthType(input: string): "phone" | "email" {
  if (isValidEmail(input)) return "email";
  return "phone";
}
