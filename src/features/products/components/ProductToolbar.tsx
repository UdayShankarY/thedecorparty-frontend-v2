import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryChips } from "./CategoryChips";
import { ProductSearch } from "./ProductSearch";
import { SortDropdown } from "./SortDropdown";
import { useProductsContext } from "../hooks/useProductsContext";

export function ProductToolbar() {
  const { setFilterOpen } = useProductsContext();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <ProductSearch />
        <SortDropdown />
        <Button
          variant="secondary"
          className="shrink-0 gap-1.5 px-3 lg:hidden"
          onClick={() => setFilterOpen(true)}
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>
      <CategoryChips />
    </div>
  );
}
