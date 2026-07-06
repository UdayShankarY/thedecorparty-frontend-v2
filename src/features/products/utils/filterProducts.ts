import type { HomeProduct } from "@/types";
import type { AvailabilityFilter } from "../types";

export interface FilterParams {
  searchQuery: string;
  categoryId: string | null;
  priceMin: number | null;
  priceMax: number | null;
  minRating: number | null;
  availability: AvailabilityFilter;
}

function matchesSearch(product: HomeProduct, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    product.name,
    product.categoryName,
    product.description,
    product.subcategory ?? "",
    product.badge ?? "",
    ...(product.inclusions ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function filterProducts(products: HomeProduct[], params: FilterParams): HomeProduct[] {
  return products.filter((product) => {
    if (!matchesSearch(product, params.searchQuery)) return false;
    if (params.categoryId && product.categoryId !== params.categoryId) return false;
    if (params.priceMin != null && product.price < params.priceMin) return false;
    if (params.priceMax != null && product.price > params.priceMax) return false;
    if (params.minRating != null && (product.rating ?? 0) < params.minRating) return false;
    if (params.availability === "available" && !product.active) return false;
    if (params.availability === "unavailable" && product.active) return false;
    return true;
  });
}
