import { api } from "@/services/api";
import type { HomeCategory, HomeProduct } from "@/types";

export async function fetchProducts(): Promise<HomeProduct[]> {
  const { data } = await api.get<HomeProduct[]>("/api/products");
  return Array.isArray(data) ? data : [];
}

export async function fetchCategories(): Promise<HomeCategory[]> {
  const { data } = await api.get<HomeCategory[]>("/api/categories");
  return Array.isArray(data) ? data : [];
}

export async function fetchProductById(id: string): Promise<HomeProduct | null> {
  const products = await fetchProducts();
  return products.find((p) => p._id === id) ?? null;
}
