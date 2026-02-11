import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";
import { MOCK_PRODUCTS } from "@/lib/data";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8">Загрузка...</div>}>
      <CatalogClient products={MOCK_PRODUCTS} />
    </Suspense>
  );
}
