export type SortOption = "popularity" | "price-asc" | "price-desc" | "rating";

export type AvailabilityFilter = "all" | "available" | "unavailable";

export interface PriceFilter {
  min: number | null;
  max: number | null;
}

export const INITIAL_VISIBLE_COUNT = 12;
export const LOAD_MORE_COUNT = 12;

export const SORT_LABELS: Record<SortOption, string> = {
  popularity: "Popularity",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Rating",
};
