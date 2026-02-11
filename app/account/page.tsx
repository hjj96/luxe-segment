"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { getAuthType, normalizePhone } from "@/lib/auth";

export default function AccountPage() {
  const { user, loading, login, logout } = useAuth();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code" | "logged">("phone");
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoadingAction(true);

    try {
      const response = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneOrEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Ошибка при отправке кода");
        return;
      }

      setCodeSent(true);
      setStep("code");
    } catch (err) {
      setError("Ошибка соединения. Попробуйте позже.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoadingAction(true);

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneOrEmail, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Неверный код");
        return;
      }

      login(data.user);
      setStep("logged");
    } catch (err) {
      setError("Ошибка соединения. Попробуйте позже.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setStep("phone");
    setPhoneOrEmail("");
    setCode("");
    setCodeSent(false);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-luxe-border" />
          <h1 className="section-title whitespace-nowrap">Загрузка...</h1>
          <div className="h-px flex-1 bg-luxe-border" />
        </div>
      </div>
    );
  }

  if (user || step === "logged") {
    const authType = user?.authType || getAuthType(phoneOrEmail);
    const displayValue = authType === "phone" 
      ? normalizePhone(user?.phoneOrEmail || phoneOrEmail).replace(/^7/, "+7 ")
      : user?.phoneOrEmail || phoneOrEmail;

    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-luxe-border" />
          <h1 className="section-title whitespace-nowrap">
            Личный кабинет
          </h1>
          <div className="h-px flex-1 bg-luxe-border" />
        </div>
        
        <div className="mt-8 space-y-6 border-t border-luxe-border pt-8">
          <div>
            <p className="text-xs uppercase tracking-label text-luxe-mute mb-1">
              {authType === "phone" ? "Телефон" : "Email"}
            </p>
            <p className="text-sm text-luxe-ink">{displayValue}</p>
          </div>

          <nav className="space-y-1">
            <Link
              href="/favorites"
              className="block py-3 text-luxe-ink hover:text-luxe-mute transition-colors"
            >
              Избранное
            </Link>
            <Link
              href="/cart"
              className="block py-3 text-luxe-ink hover:text-luxe-mute transition-colors"
            >
              Корзина
            </Link>
            <div className="block py-3 text-luxe-mute">
              Мои заказы — статус заявок уточняйте в Telegram
            </div>
            <div className="block py-3 text-luxe-mute">
              Контактные данные — указаны при оформлении заказа
            </div>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-8 w-full border border-luxe-border py-3 text-xs uppercase tracking-label text-luxe-ink hover:bg-luxe-bg-alt transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">Вход</h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>
      
      <p className="mt-2 text-sm text-luxe-mute">
        Введите номер телефона или email — мы отправим код для входа.
      </p>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {step === "phone" && (
        <form onSubmit={handleRequestCode} className="mt-8">
          <input
            type="text"
            placeholder="Телефон или email"
            value={phoneOrEmail}
            onChange={(e) => setPhoneOrEmail(e.target.value)}
            className="w-full border-b border-luxe-border bg-transparent px-0 py-3 text-luxe-ink focus:outline-none focus:border-luxe-ink transition-colors"
            required
            disabled={loadingAction}
          />
          <button
            type="submit"
            disabled={loadingAction}
            className="mt-6 w-full bg-luxe-ink py-3.5 text-xs uppercase tracking-label text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingAction ? "Отправка..." : "Получить код"}
          </button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={handleVerify} className="mt-8">
          {codeSent && (
            <p className="mb-4 text-sm text-luxe-mute">
              Код отправлен на {getAuthType(phoneOrEmail) === "email" ? "email" : "телефон"}
            </p>
          )}
          <input
            type="text"
            placeholder="Код из сообщения"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full border-b border-luxe-border bg-transparent px-0 py-3 text-luxe-ink text-center tracking-widest focus:outline-none focus:border-luxe-ink transition-colors"
            maxLength={6}
            required
            disabled={loadingAction}
          />
          <button
            type="submit"
            disabled={loadingAction || code.length < 4}
            className="mt-6 w-full bg-luxe-ink py-3.5 text-xs uppercase tracking-label text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingAction ? "Проверка..." : "Войти"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setCode("");
              setError("");
            }}
            className="mt-3 w-full text-sm text-luxe-mute hover:text-luxe-ink transition-colors"
            disabled={loadingAction}
          >
            Изменить {getAuthType(phoneOrEmail) === "email" ? "email" : "номер"}
          </button>
        </form>
      )}
    </div>
  );
}
