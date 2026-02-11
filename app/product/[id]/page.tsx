import { notFound } from "next/navigation";
import { ProductClient } from "@/components/ProductClient";
import { MOCK_PRODUCTS } from "@/lib/data";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();
  return <ProductClient product={product} />;
}
