"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { FilterSheet } from "@/components/FilterSheet";
import { IconFilter } from "@/components/Icons";
import { CATEGORIES, BRANDS, COLORS } from "@/lib/data";
import type { Product, Category } from "@/lib/types";

const SIZES = ["S", "M", "L", "40", "41", "42", "43", "46", "48", "50", "52", "85", "90", "95", "100"];

export function CatalogClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const color = searchParams.get("color") || "";
  const size = searchParams.get("size") || "";
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
  const availability = searchParams.get("availability") || "";
  const search = searchParams.get("search") || "";

  const setParams = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v == null || v === "") p.delete(k);
        else p.set(k, String(v));
      });
      return `?${p.toString()}`;
    },
    [searchParams]
  );

  const applyParams = useCallback(
    (updates: Record<string, string | null>) => {
      setFilterOpen(false);
      router.push("/catalog" + setParams(updates));
    },
    [router, setParams]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search) {
        const query = search.toLowerCase();
        const matchesSearch = 
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (color && !p.colors.includes(color)) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (minPrice != null && p.price < minPrice) return false;
      if (maxPrice != null && p.price > maxPrice) return false;
      if (availability === "in_stock" && !p.inStock) return false;
      if (availability === "made_to_order" && !p.madeToOrder) return false;
      return true;
    });
  }, [products, search, category, brand, color, size, minPrice, maxPrice, availability]);

  const activeFiltersCount = [
    category,
    brand,
    color,
    size,
    minPrice != null,
    maxPrice != null,
    availability,
  ].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 flex items-center gap-4 sm:mb-14">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">
          Каталог
        </h1>
        <div className="h-px flex-1 bg-luxe-border" />
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 border-b border-luxe-ink pb-1 text-xs uppercase tracking-label text-luxe-ink md:hidden ml-auto"
        >
          <IconFilter size="sm" />
          Фильтры
          {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
        </button>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <FilterForm
            category={category}
            brand={brand}
            color={color}
            size={size}
            minPrice={minPrice}
            maxPrice={maxPrice}
            availability={availability}
            setParams={setParams}
            applyParams={(u) => router.push("/catalog" + setParams(u))}
            isSheet={false}
          />
        </aside>
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-luxe-mute">
              По выбранным фильтрам ничего не найдено.
            </p>
          )}
        </div>
      </div>

      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)}>
        <FilterForm
          category={category}
          brand={brand}
          color={color}
          size={size}
          minPrice={minPrice}
          maxPrice={maxPrice}
          availability={availability}
          setParams={setParams}
          applyParams={applyParams}
          isSheet
        />
      </FilterSheet>
    </div>
  );
}

function FilterForm({
  category,
  brand,
  color,
  size,
  minPrice,
  maxPrice,
  availability,
  setParams,
  applyParams,
  isSheet,
}: {
  category: string;
  brand: string;
  color: string;
  size: string;
  minPrice: number | null;
  maxPrice: number | null;
  availability: string;
  setParams: (u: Record<string, string | null>) => string;
  applyParams: (u: Record<string, string | null>) => void;
  isSheet: boolean;
}) {
  const base = "/catalog";
  function getCurrent(overrides: Partial<Record<string, string | null>> = {}) {
    return {
      category: category || null,
      brand: brand || null,
      color: color || null,
      size: size || null,
      minPrice: minPrice != null ? String(minPrice) : null,
      maxPrice: maxPrice != null ? String(maxPrice) : null,
      availability: availability || null,
      ...overrides,
    };
  }
  const nav = (u: Record<string, string | null>) => {
    if (isSheet) applyParams(u);
    else window.location.href = base + setParams(u);
  };
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">
          Категория
        </p>
        <div className="flex flex-wrap gap-2">
          {!isSheet && (
            <Link
              href={base + (category ? setParams(getCurrent({ category: null })) : "")}
              className={`rounded-full px-3 py-1.5 text-sm ${
                !category ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
              }`}
            >
              Все
            </Link>
          )}
          {isSheet && (
            <button
              type="button"
              onClick={() => applyParams(getCurrent({ category: null }))}
              className={`rounded-full px-3 py-1.5 text-sm ${
                !category ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
              }`}
            >
              Все
            </button>
          )}
          {CATEGORIES.map((c: Category) =>
            isSheet ? (
              <button
                key={c.slug}
                type="button"
                onClick={() => applyParams(getCurrent({ category: c.slug }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  category === c.slug ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                {c.name}
              </button>
            ) : (
              <Link
                key={c.slug}
                href={base + setParams(getCurrent({ category: c.slug }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  category === c.slug ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                {c.name}
              </Link>
            )
          )}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">
          Бренд
        </p>
        <select
          value={brand}
          onChange={(e) => nav(getCurrent({ brand: e.target.value || null }))}
          className="w-full rounded-lg border border-luxe-border bg-white px-3 py-2 text-sm text-luxe-ink"
        >
          <option value="">Все</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">
          Цена
        </p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            defaultValue={minPrice ?? ""}
            className="w-full rounded-lg border border-luxe-border px-3 py-2 text-sm"
            onBlur={(e) => nav(getCurrent({ minPrice: e.target.value ? e.target.value : null }))}
          />
          <input
            type="number"
            placeholder="До"
            defaultValue={maxPrice ?? ""}
            className="w-full rounded-lg border border-luxe-border px-3 py-2 text-sm"
            onBlur={(e) => nav(getCurrent({ maxPrice: e.target.value ? e.target.value : null }))}
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">
          Цвет
        </p>
        <div className="flex flex-wrap gap-2">
          {isSheet ? (
            <button
              type="button"
              onClick={() => applyParams(getCurrent({ color: null }))}
              className={`rounded-full px-3 py-1.5 text-sm ${
                !color ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
              }`}
            >
              Все
            </button>
          ) : (
            <Link
              href={base + setParams(getCurrent({ color: null }))}
              className={`rounded-full px-3 py-1.5 text-sm ${
                !color ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
              }`}
            >
              Все
            </Link>
          )}
          {COLORS.map((c) =>
            isSheet ? (
              <button
                key={c}
                type="button"
                onClick={() => applyParams(getCurrent({ color: c }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  color === c ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                {c}
              </button>
            ) : (
              <Link
                key={c}
                href={base + setParams(getCurrent({ color: c }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  color === c ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                {c}
              </Link>
            )
          )}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">
          Размер
        </p>
        <div className="flex flex-wrap gap-2">
          {isSheet ? (
            <button
              type="button"
              onClick={() => applyParams(getCurrent({ size: null }))}
              className={`rounded-full px-3 py-1.5 text-sm ${
                !size ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
              }`}
            >
              Все
            </button>
          ) : (
            <Link
              href={base + setParams(getCurrent({ size: null }))}
              className={`rounded-full px-3 py-1.5 text-sm ${
                !size ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
              }`}
            >
              Все
            </Link>
          )}
          {SIZES.map((s) =>
            isSheet ? (
              <button
                key={s}
                type="button"
                onClick={() => applyParams(getCurrent({ size: s }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  size === s ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                {s}
              </button>
            ) : (
              <Link
                key={s}
                href={base + setParams(getCurrent({ size: s }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  size === s ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                {s}
              </Link>
            )
          )}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">
          Наличие
        </p>
        <div className="flex flex-wrap gap-2">
          {isSheet ? (
            <>
              <button
                type="button"
                onClick={() => applyParams(getCurrent({ availability: null }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  !availability ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                Все
              </button>
              <button
                type="button"
                onClick={() => applyParams(getCurrent({ availability: "in_stock" }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  availability === "in_stock" ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                В наличии
              </button>
              <button
                type="button"
                onClick={() => applyParams(getCurrent({ availability: "made_to_order" }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  availability === "made_to_order" ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                Под заказ
              </button>
            </>
          ) : (
            <>
              <Link
                href={base + setParams(getCurrent({ availability: null }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  !availability ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                Все
              </Link>
              <Link
                href={base + setParams(getCurrent({ availability: "in_stock" }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  availability === "in_stock" ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                В наличии
              </Link>
              <Link
                href={base + setParams(getCurrent({ availability: "made_to_order" }))}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  availability === "made_to_order" ? "bg-luxe-ink text-white" : "bg-luxe-bg text-luxe-ink border border-luxe-border"
                }`}
              >
                Под заказ
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
