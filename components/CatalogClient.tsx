"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { FilterSheet } from "@/components/FilterSheet";
import { CATEGORIES } from "@/lib/data";
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

  // Динамические списки фильтров на основе текущих товаров
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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex items-center gap-4 sm:mb-10">
        <div className="h-px flex-1 bg-luxe-border" />
        <h1 className="section-title whitespace-nowrap">Каталог</h1>
        <div className="h-px flex-1 bg-luxe-border" />
      </div>

      <div className="mb-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="rounded-sm border border-luxe-border px-3 py-2 text-xs uppercase tracking-label text-luxe-ink transition-colors hover:bg-luxe-bg-alt md:hidden"
        >
          Фильтры{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}
        </button>
        <label className="flex items-center gap-2 text-xs uppercase tracking-label text-luxe-mute">
          <span className="hidden sm:inline">Сортировка</span>
          <select
            value={sort}
            onChange={(e) => applyParams({ sort: e.target.value })}
            className="select-rect luxe-select text-xs uppercase tracking-label text-luxe-ink"
          >
            <option value="newest">По новизне</option>
            <option value="price_asc">Цена: по возрастанию</option>
            <option value="price_desc">Цена: по убыванию</option>
          </select>
        </label>
      </div>

      <div className="flex gap-8">
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
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-luxe-mute">По выбранным фильтрам ничего не найдено.</p>
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
    `rounded-sm border px-3 py-1.5 text-sm transition-colors ${active ? "border-luxe-ink bg-luxe-ink text-white" : "border-luxe-border bg-luxe-bg text-luxe-ink hover:border-luxe-ink/40"}`;

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">Категория</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDraftCategory("")} className={pillClass(!draftCategory)}>Все</button>
          {CATEGORIES.map((c: Category) => (
            <button key={c.slug} type="button" onClick={() => setDraftCategory(c.slug)} className={pillClass(draftCategory === c.slug)}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">Бренд</p>
        <select
          value={draftBrand}
          onChange={(e) => setDraftBrand(e.target.value)}
          className="select-rect luxe-select"
        >
          <option value="">Все</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">Цена</p>
        <div className="flex gap-2">
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
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">Цвет</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDraftColor("")} className={pillClass(!draftColor)}>Все</button>
          {colors.map((c) => (
            <button key={c} type="button" onClick={() => setDraftColor(c)} className={pillClass(draftColor === c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">Размер</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDraftSize("")} className={pillClass(!draftSize)}>Все</button>
          {sizes.map((s) => (
            <button key={s} type="button" onClick={() => setDraftSize(s)} className={pillClass(draftSize === s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-label text-luxe-mute">Наличие</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDraftAvailability("")} className={pillClass(!draftAvailability)}>Все</button>
          <button type="button" onClick={() => setDraftAvailability("in_stock")} className={pillClass(draftAvailability === "in_stock")}>
            В наличии
          </button>
          <button type="button" onClick={() => setDraftAvailability("made_to_order")} className={pillClass(draftAvailability === "made_to_order")}>
            Под заказ
          </button>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 mt-2 grid grid-cols-2 gap-2 rounded-t-xl border-t border-luxe-border bg-white px-4 pt-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-sm border border-luxe-border py-3 text-xs uppercase tracking-label text-luxe-ink transition-colors hover:bg-luxe-bg-alt"
        >
          Сбросить
        </button>
        <button
          type="button"
          onClick={apply}
          className="w-full rounded-sm bg-luxe-ink py-3 text-xs uppercase tracking-label text-white transition-opacity hover:opacity-95"
        >
          Применить
        </button>
      </div>
    </div>
  );
}
