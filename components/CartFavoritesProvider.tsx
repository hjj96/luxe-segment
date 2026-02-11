"use client";

import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import type { CartItem } from "@/lib/types";

const CART_KEY = "luxe-cart";
const FAV_KEY = "luxe-favorites";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function saveFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

type ContextValue = {
  cart: CartItem[];
  favorites: string[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string, optionsKey?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, optionsKey?: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearCart: () => void;
  cartCount: number;
};

const CartFavoritesContext = createContext<ContextValue | null>(null);

function optionsKey(opts: { color?: string; size?: string }): string {
  return [opts.color ?? "", opts.size ?? ""].join("::");
}

export function CartFavoritesProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(loadCart());
    setFavorites(loadFavorites());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveCart(cart);
  }, [cart, mounted]);

  useEffect(() => {
    if (mounted) saveFavorites(favorites);
  }, [favorites, mounted]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    const key = optionsKey(item.options);
    setCart((prev) => {
      const i = prev.findIndex(
        (x) => x.productId === item.productId && optionsKey(x.options) === key
      );
      if (i >= 0) {
        const next = [...prev];
        next[i].quantity += 1;
        return next;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, optsKey?: string) => {
    setCart((prev) =>
      prev.filter((x) => {
        if (x.productId !== productId) return true;
        if (optsKey != null) return optionsKey(x.options) !== optsKey;
        return false;
      })
    );
  }, []);

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number, optsKey?: string) => {
      if (quantity <= 0) {
        removeFromCart(productId, optsKey);
        return;
      }
      setCart((prev) =>
        prev.map((x) => {
          if (x.productId !== productId) return x;
          if (optsKey != null && optionsKey(x.options) !== optsKey) return x;
          return { ...x, quantity };
        })
      );
    },
    [removeFromCart]
  );

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  const value: ContextValue = {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleFavorite,
    isFavorite,
    clearCart,
    cartCount,
  };

  return (
    <CartFavoritesContext.Provider value={value}>
      {children}
    </CartFavoritesContext.Provider>
  );
}

export function useCartFavorites() {
  const ctx = useContext(CartFavoritesContext);
  if (!ctx) throw new Error("useCartFavorites must be used within CartFavoritesProvider");
  return ctx;
}
