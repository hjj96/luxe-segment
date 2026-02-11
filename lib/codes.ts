// Хранение и управление кодами авторизации

import { normalizePhone } from "./auth";

// Временное хранилище кодов (в продакшене использовать Redis или БД)
const codes = new Map<string, { code: string; expiresAt: number; type: "phone" | "email" }>();

// Очистка истекших кодов каждые 5 минут
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of codes.entries()) {
    if (value.expiresAt < now) {
      codes.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function saveCode(phoneOrEmail: string, authType: "phone" | "email", code: string, expiresAt: number) {
  const normalized = authType === "phone" ? normalizePhone(phoneOrEmail) : phoneOrEmail.toLowerCase();
  codes.set(normalized, { code, expiresAt, type: authType });
}

export function getStoredCode(phoneOrEmail: string, authType: "phone" | "email"): { code: string; expiresAt: number } | null {
  const normalized = authType === "phone" ? normalizePhone(phoneOrEmail) : phoneOrEmail.toLowerCase();
  const stored = codes.get(normalized);
  
  if (!stored || stored.expiresAt < Date.now()) {
    return null;
  }
  
  return { code: stored.code, expiresAt: stored.expiresAt };
}

export function deleteStoredCode(phoneOrEmail: string, authType: "phone" | "email") {
  const normalized = authType === "phone" ? normalizePhone(phoneOrEmail) : phoneOrEmail.toLowerCase();
  codes.delete(normalized);
}
