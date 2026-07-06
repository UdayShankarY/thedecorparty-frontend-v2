import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { fetchCategories, fetchProducts } from "../services/productsService";
import type { AvailabilityFilter, SortOption } from "../types";
import { INITIAL_VISIBLE_COUNT, LOAD_MORE_COUNT } from "../types";
import { filterProducts } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";
import type { HomeCategory, HomeProduct } from "@/types";

interface ProductsContextValue {
  products: HomeProduct[];
  categories: HomeCategory[];
  loading: boolean;
  searchQuery: string;
  selectedCategoryId: string | null;
  priceMin: number | null;
  priceMax: number | null;
  minRating: number | null;
  availability: AvailabilityFilter;
  sort: SortOption;
  visibleCount: number;
  filterOpen: boolean;
  filteredProducts: HomeProduct[];
  sortedProducts: HomeProduct[];
  visibleProducts: HomeProduct[];
  hasMore: boolean;
  resultCount: number;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryId: (id: string | null) => void;
  setPriceMin: (min: number | null) => void;
  setPriceMax: (max: number | null) => void;
  setMinRating: (rating: number | null) => void;
  setAvailability: (value: AvailabilityFilter) => void;
  setSort: (sort: SortOption) => void;
  loadMore: () => void;
  resetFilters: () => void;
  setFilterOpen: (open: boolean) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<HomeProduct[]>([]);
  const [categories, setCategories] = useState<HomeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQueryState] = useState("");
  const [selectedCategoryId, setSelectedCategoryIdState] = useState<string | null>(null);
  const [priceMin, setPriceMinState] = useState<number | null>(null);
  const [priceMax, setPriceMaxState] = useState<number | null>(null);
  const [minRating, setMinRatingState] = useState<number | null>(null);
  const [availability, setAvailabilityState] = useState<AvailabilityFilter>("all");
  const [sort, setSortState] = useState<SortOption>("popularity");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productList, categoryList]) => {
        if (!mounted) return;
        setProducts(productList);
        setCategories(categoryList.filter((c) => c.active));
      })
      .catch((err) => console.error("Failed to load catalog", err))
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const resetVisibleCount = useCallback(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, []);

  const setSearchQuery = useCallback(
    (query: string) => {
      setSearchQueryState(query);
      resetVisibleCount();
    },
    [resetVisibleCount]
  );

  const setSelectedCategoryId = useCallback(
    (id: string | null) => {
      setSelectedCategoryIdState(id);
      resetVisibleCount();
    },
    [resetVisibleCount]
  );

  const setPriceMin = useCallback(
    (min: number | null) => {
      setPriceMinState(min);
      resetVisibleCount();
    },
    [resetVisibleCount]
  );

  const setPriceMax = useCallback(
    (max: number | null) => {
      setPriceMaxState(max);
      resetVisibleCount();
    },
    [resetVisibleCount]
  );

  const setMinRating = useCallback(
    (rating: number | null) => {
      setMinRatingState(rating);
      resetVisibleCount();
    },
    [resetVisibleCount]
  );

  const setAvailability = useCallback(
    (value: AvailabilityFilter) => {
      setAvailabilityState(value);
      resetVisibleCount();
    },
    [resetVisibleCount]
  );

  const setSort = useCallback((value: SortOption) => {
    setSortState(value);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQueryState("");
    setSelectedCategoryIdState(null);
    setPriceMinState(null);
    setPriceMaxState(null);
    setMinRatingState(null);
    setAvailabilityState("all");
    setSortState("popularity");
    resetVisibleCount();
  }, [resetVisibleCount]);

  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        searchQuery,
        categoryId: selectedCategoryId,
        priceMin,
        priceMax,
        minRating,
        availability,
      }),
    [products, searchQuery, selectedCategoryId, priceMin, priceMax, minRating, availability]
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort]
  );

  const visibleProducts = useMemo(
    () => sortedProducts.slice(0, visibleCount),
    [sortedProducts, visibleCount]
  );

  const hasMore = visibleCount < sortedProducts.length;
  const resultCount = sortedProducts.length;

  const value = useMemo<ProductsContextValue>(
    () => ({
      products,
      categories,
      loading,
      searchQuery,
      selectedCategoryId,
      priceMin,
      priceMax,
      minRating,
      availability,
      sort,
      visibleCount,
      filterOpen,
      filteredProducts,
      sortedProducts,
      visibleProducts,
      hasMore,
      resultCount,
      setSearchQuery,
      setSelectedCategoryId,
      setPriceMin,
      setPriceMax,
      setMinRating,
      setAvailability,
      setSort,
      loadMore,
      resetFilters,
      setFilterOpen,
    }),
    [
      products,
      categories,
      loading,
      searchQuery,
      selectedCategoryId,
      priceMin,
      priceMax,
      minRating,
      availability,
      sort,
      visibleCount,
      filterOpen,
      filteredProducts,
      sortedProducts,
      visibleProducts,
      hasMore,
      resultCount,
      setSearchQuery,
      setSelectedCategoryId,
      setPriceMin,
      setPriceMax,
      setMinRating,
      setAvailability,
      setSort,
      loadMore,
      resetFilters,
    ]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProductsContext() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProductsContext must be used within ProductsProvider");
  return ctx;
}
