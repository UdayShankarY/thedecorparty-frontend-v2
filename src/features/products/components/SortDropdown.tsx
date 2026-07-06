import { ChevronDown } from "lucide-react";
import { SORT_LABELS, type SortOption } from "../types";
import { useProductsContext } from "../hooks/useProductsContext";

const SORT_OPTIONS: SortOption[] = ["popularity", "price-asc", "price-desc", "rating"];

export function SortDropdown() {
  const { sort, setSort } = useProductsContext();

  return (
    <div className="relative shrink-0">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
        aria-label="Sort products"
        className="h-11 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {SORT_LABELS[option]}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}
