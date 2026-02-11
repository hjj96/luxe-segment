export type CategorySlug =
  | "clothing"
  | "shoes"
  | "bags"
  | "accessories";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  description: string;
  category: CategorySlug;
  images: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  madeToOrder: boolean;
  colors: string[];
  sizes: string[];
  createdAt: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  href: string;
}

export interface HomeVideo {
  id: string;
  src: string;
  poster?: string;
  caption: string;
  order: number;
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  options: { color?: string; size?: string };
  quantity: number;
}

export interface OrderRequest {
  name: string;
  phone: string;
  address: string;
  comment: string;
  paymentMethod: "transfer";
  deliveryMethod: "standard" | "express";
  items: CartItem[];
}
