import type { HomeProduct } from "@/types";
import type { SortOption } from "../types";

export function sortProducts(products: HomeProduct[], sort: SortOption): HomeProduct[] {
  const sorted = [...products];

  switch (sort) {
    case "popularity":
      return sorted.sort((a, b) => (b.orderCount ?? 0) - (a.orderCount ?? 0));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    default:
      return sorted;
  }
}
