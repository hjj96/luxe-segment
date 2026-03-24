"use client";

import { useEffect, useState } from "react";
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
  const [pwEmail, setPwEmail] = useState("");
  const [pwPassword, setPwPassword] = useState("");
  const [pwMode, setPwMode] = useState<"login" | "register">("login");
  const [pwLoading, setPwLoading] = useState(false);
  const [orders, setOrders] = useState<any[] | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Загружаем заказы, когда пользователь залогинен
  useEffect(() => {
    if (!user && step !== "logged") return;

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (e) {
        console.error("Failed to load orders", e);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user, step]);

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
    setPwEmail("");
    setPwPassword("");
    setPwMode("login");
    setOrders(null);
  };

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPwLoading(true);

    try {
      const endpoint =
        pwMode === "login"
          ? "/api/auth/login-password"
          : "/api/auth/register-password";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pwEmail, password: pwPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Ошибка при входе");
        return;
      }

      login(data.user);
      setStep("logged");
      setPwPassword("");
    } catch (err) {
      setError("Ошибка соединения. Попробуйте позже.");
    } finally {
      setPwLoading(false);
    }
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
    const displayValue =
      authType === "phone"
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
        
        <div className="mt-8 space-y-8 border-t border-luxe-border pt-8">
          <div>
            <p className="text-xs uppercase tracking-label text-luxe-mute mb-1">
              {authType === "phone" ? "Телефон" : "Email"}
            </p>
            <p className="text-sm text-luxe-ink">{displayValue}</p>
          </div>

          <section>
            <h2 className="text-xs uppercase tracking-label text-luxe-mute mb-3">
              Мои заказы
            </h2>
            {ordersLoading && (
              <p className="text-sm text-luxe-mute">Загрузка...</p>
            )}
            {!ordersLoading && orders && orders.length === 0 && (
              <p className="text-sm text-luxe-mute">
                Заказов пока нет. Оформите первый заказ в каталоге.
              </p>
            )}
            {!ordersLoading && orders && orders.length > 0 && (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-sm border border-luxe-border px-3 py-3 text-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-luxe-ink">
                        Заказ от{" "}
                        {new Date(order.created_at).toLocaleDateString("ru-RU")}
                      </p>
                      <p className="text-xs uppercase tracking-label text-luxe-mute">
                        {order.delivery_method === "express"
                          ? "Экспресс"
                          : "Стандартная"}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-luxe-mute">
                      Итого:{" "}
                      <span className="text-luxe-ink">
                        {Number(order.total_amount).toLocaleString("ru-RU")} ₽
                      </span>
                    </p>
                    {order.order_items && order.order_items.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-luxe-mute">
                        {order.order_items.map((item: any) => (
                          <li key={item.id}>
                            {item.brand} — {item.name}
                            {item.size ? `, размер ${item.size}` : ""} ×{" "}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <nav className="space-y-1 pt-2 border-t border-luxe-border">
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
            className="mt-8 w-full rounded-sm border border-luxe-border py-3 text-xs uppercase tracking-label text-luxe-ink transition-colors hover:bg-luxe-bg-alt"
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
        Можно войти по коду (телефон или email) или по email и паролю.
      </p>

      {error && (
        <div className="mt-4 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {step === "phone" && (
        <form onSubmit={handleRequestCode} className="mt-8">
          <input
            type="text"
            placeholder="79XXXXXXXXX или email"
            value={phoneOrEmail}
            onChange={(e) => setPhoneOrEmail(e.target.value)}
            className="luxe-input"
            required
            disabled={loadingAction}
          />
          <button
            type="submit"
            disabled={loadingAction}
            className="luxe-btn-primary mt-6 w-full py-3.5 text-xs uppercase tracking-label disabled:cursor-not-allowed disabled:opacity-50"
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
            className="luxe-input text-center text-base tracking-[0.35em]"
            maxLength={6}
            required
            disabled={loadingAction}
          />
          <button
            type="submit"
            disabled={loadingAction || code.length < 4}
            className="luxe-btn-primary mt-6 w-full py-3.5 text-xs uppercase tracking-label disabled:cursor-not-allowed disabled:opacity-50"
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

      <div className="mt-10 border-t border-luxe-border pt-8">
        <h2 className="text-xs uppercase tracking-label text-luxe-mute">
          Вход по email и паролю
        </h2>
        <div className="mt-3 flex gap-2 text-xs uppercase tracking-label">
          <button
            type="button"
            onClick={() => setPwMode("login")}
            className={`rounded-sm px-3 py-1 border transition-colors ${
              pwMode === "login"
                ? "border-luxe-ink text-luxe-ink"
                : "border-luxe-border text-luxe-mute"
            }`}
          >
            Вход
          </button>
          <button
            type="button"
            onClick={() => setPwMode("register")}
            className={`rounded-sm px-3 py-1 border transition-colors ${
              pwMode === "register"
                ? "border-luxe-ink text-luxe-ink"
                : "border-luxe-border text-luxe-mute"
            }`}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handlePasswordAuth} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={pwEmail}
            onChange={(e) => setPwEmail(e.target.value)}
            className="luxe-input"
            required
            disabled={pwLoading}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={pwPassword}
            onChange={(e) => setPwPassword(e.target.value)}
            className="luxe-input"
            required
            disabled={pwLoading}
          />
          <button
            type="submit"
            disabled={pwLoading}
            className="luxe-btn-primary mt-2 w-full py-3.5 text-xs uppercase tracking-label disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pwLoading
              ? "Отправка..."
              : pwMode === "login"
              ? "Войти"
              : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
}
