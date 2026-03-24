"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { FilterSheet } from "@/components/FilterSheet";
import { CATEGORIES } from "@/lib/data";
import { formatColorLabel } from "@/lib/colorLabels";
import type { Product, Category } from "@/lib/types";
type SortValue = "newest" | "price_asc" | "price_desc";

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
  const sort = (searchParams.get("sort") as SortValue) || "newest";

  const setParams = useCallback(
    (updates: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v == null || v === "") p.delete(k);
        else p.set(k, String(v));
      });
      const next = p.toString();
      return next ? `?${next}` : "";
    },
    [searchParams]
  );

  const applyParams = useCallback(
    (updates: Record<string, string | null>, closeSheet?: boolean) => {
      if (closeSheet) setFilterOpen(false);
      router.push("/catalog" + setParams(updates));
    },
    [router, setParams]
  );

  const filtered = useMemo(() => {
    const base = products.filter((p) => {
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

    return base.sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, search, category, brand, color, size, minPrice, maxPrice, availability, sort]);

  const { brands, colors, sizes } = useMemo(() => {
    const brandSet = new Set<string>();
    const colorSet = new Set<string>();
    const sizeSet = new Set<string>();

    for (const p of products) {
      if (p.brand) brandSet.add(p.brand);
      (p.colors || []).forEach((c) => c && colorSet.add(c));
      (p.sizes || []).forEach((s) => s && sizeSet.add(s));
    }

    const sortAlpha = (arr: string[]) => arr.sort((a, b) => a.localeCompare(b, "ru"));

    return {
      brands: sortAlpha(Array.from(brandSet)),
      colors: sortAlpha(Array.from(colorSet)),
      sizes: Array.from(sizeSet).sort((a, b) => a.localeCompare(b, "ru", { numeric: true })),
    };
  }, [products]);

  const activeFiltersCount = [
    category,
    brand,
    color,
    size,
    minPrice != null,
    maxPrice != null,
    availability,
  ].filter(Boolean).length;

  const resetAllFilters = () =>
    applyParams({
      category: null,
      brand: null,
      color: null,
      size: null,
      minPrice: null,
      maxPrice: null,
      availability: null,
    });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-18">
      <div className="mb-12 flex flex-col items-center sm:mb-16">
        <p className="section-label mb-4">Коллекция</p>
        <div className="flex w-full max-w-2xl items-center gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-luxe-border" />
          <h1 className="font-editorial text-center text-[1.85rem] font-normal tracking-editorial text-luxe-ink sm:text-3xl">
            Каталог
          </h1>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-luxe-border" />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-end gap-3 sm:mb-10">
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="rounded-sm border border-luxe-border bg-luxe-surface px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-luxe-ink transition-all duration-300 hover:border-luxe-accent/30 hover:bg-luxe-bg-alt md:hidden"
        >
          Фильтры{activeFiltersCount > 0 ? ` · ${activeFiltersCount}` : ""}
        </button>
        <label className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.14em] text-luxe-mute">
          <span className="hidden sm:inline">Сортировка</span>
          <select
            value={sort}
            onChange={(e) => applyParams({ sort: e.target.value })}
            className="select-rect luxe-select min-w-[11rem] text-[10px] uppercase tracking-[0.12em] text-luxe-ink"
          >
            <option value="newest">По новизне</option>
            <option value="price_asc">Цена ↑</option>
            <option value="price_desc">Цена ↓</option>
          </select>
        </label>
      </div>

      <div className="flex gap-10 lg:gap-14">
        <aside className="hidden w-64 shrink-0 md:block">
          <FilterForm
            category={category}
            brand={brand}
            color={color}
            size={size}
            brands={brands}
            colors={colors}
            sizes={sizes}
            minPrice={minPrice}
            maxPrice={maxPrice}
            availability={availability}
            onApply={(u) => applyParams(u)}
            onReset={resetAllFilters}
          />
        </aside>
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-luxe-mute">По выбранным параметрам ничего не найдено.</p>
          )}
        </div>
      </div>

      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)}>
        <FilterForm
          category={category}
          brand={brand}
          color={color}
          size={size}
          brands={brands}
          colors={colors}
          sizes={sizes}
          minPrice={minPrice}
          maxPrice={maxPrice}
          availability={availability}
          onApply={(u) => applyParams(u, true)}
          onReset={() => {
            resetAllFilters();
            setFilterOpen(false);
          }}
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
  brands,
  colors,
  sizes,
  minPrice,
  maxPrice,
  availability,
  onApply,
  onReset,
}: {
  category: string;
  brand: string;
  color: string;
  size: string;
  brands: string[];
  colors: string[];
  sizes: string[];
  minPrice: number | null;
  maxPrice: number | null;
  availability: string;
  onApply: (updates: Record<string, string | null>) => void;
  onReset: () => void;
}) {
  const [draftCategory, setDraftCategory] = useState(category);
  const [draftBrand, setDraftBrand] = useState(brand);
  const [draftColor, setDraftColor] = useState(color);
  const [draftSize, setDraftSize] = useState(size);
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice != null ? String(minPrice) : "");
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice != null ? String(maxPrice) : "");
  const [draftAvailability, setDraftAvailability] = useState(availability);

  useEffect(() => {
    setDraftCategory(category);
    setDraftBrand(brand);
    setDraftColor(color);
    setDraftSize(size);
    setDraftMinPrice(minPrice != null ? String(minPrice) : "");
    setDraftMaxPrice(maxPrice != null ? String(maxPrice) : "");
    setDraftAvailability(availability);
  }, [category, brand, color, size, minPrice, maxPrice, availability]);

  const apply = () => {
    onApply({
      category: draftCategory || null,
      brand: draftBrand || null,
      color: draftColor || null,
      size: draftSize || null,
      minPrice: draftMinPrice || null,
      maxPrice: draftMaxPrice || null,
      availability: draftAvailability || null,
    });
  };

  const pillClass = (active: boolean) =>
    `rounded-full border px-3.5 py-2 text-[13px] font-normal tracking-tight transition-all duration-300 ease-luxe ${
      active
        ? "border-luxe-accent/45 bg-luxe-accent-faint text-luxe-ink shadow-sm ring-1 ring-luxe-accent/10"
        : "border-luxe-border/90 bg-luxe-surface text-luxe-ink hover:border-luxe-accent/25"
    }`;

  return (
    <div className="space-y-9 pb-4">
      <div>
        <p className="section-label mb-3">Категория</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDraftCategory("")} className={pillClass(!draftCategory)}>
            Все
          </button>
          {CATEGORIES.map((c: Category) => (
            <button key={c.slug} type="button" onClick={() => setDraftCategory(c.slug)} className={pillClass(draftCategory === c.slug)}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="section-label mb-3">Бренд</p>
        <select value={draftBrand} onChange={(e) => setDraftBrand(e.target.value)} className="select-rect luxe-select">
          <option value="">Все бренды</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="section-label mb-3">Цена</p>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="От"
            value={draftMinPrice}
            onChange={(e) => setDraftMinPrice(e.target.value)}
            className="luxe-input no-spinner"
          />
          <input
            type="number"
            placeholder="До"
            value={draftMaxPrice}
            onChange={(e) => setDraftMaxPrice(e.target.value)}
            className="luxe-input no-spinner"
          />
        </div>
      </div>

      <div>
        <p className="section-label mb-3">Цвет</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDraftColor("")} className={pillClass(!draftColor)}>
            Все
          </button>
          {colors.map((c) => (
            <button key={c} type="button" onClick={() => setDraftColor(c)} className={pillClass(draftColor === c)}>
              {formatColorLabel(c)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="section-label mb-3">Размер</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDraftSize("")} className={pillClass(!draftSize)}>
            Все
          </button>
          {sizes.map((s) => (
            <button key={s} type="button" onClick={() => setDraftSize(s)} className={pillClass(draftSize === s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="section-label mb-3">Наличие</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDraftAvailability("")} className={pillClass(!draftAvailability)}>
            Все
          </button>
          <button type="button" onClick={() => setDraftAvailability("in_stock")} className={pillClass(draftAvailability === "in_stock")}>
            В наличии
          </button>
          <button
            type="button"
            onClick={() => setDraftAvailability("made_to_order")}
            className={pillClass(draftAvailability === "made_to_order")}
          >
            Под заказ
          </button>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 mt-4 grid grid-cols-2 gap-3 rounded-t-sheet border-t border-luxe-border/90 bg-luxe-surface/95 px-4 pt-5 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_-8px_rgba(28,27,25,0.06)] backdrop-blur-sm supports-[backdrop-filter]:bg-luxe-surface/85">
        <button
          type="button"
          onClick={onReset}
          className="rounded-sm border border-luxe-border py-3.5 text-[10px] uppercase tracking-[0.16em] text-luxe-mute transition-colors duration-300 hover:border-luxe-mute/40 hover:text-luxe-ink"
        >
          Сбросить
        </button>
        <button type="button" onClick={apply} className="luxe-btn-primary rounded-sm py-3.5 text-[10px] tracking-[0.16em]">
          Применить
        </button>
      </div>
    </div>
  );
}
