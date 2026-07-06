import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductsContext } from "../hooks/useProductsContext";

export function ProductsEmptyState() {
  const { resetFilters } = useProductsContext();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
        <SearchX className="h-7 w-7 text-violet-600" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No decorations found</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Try adjusting your search or filters to discover more celebration packages.
      </p>
      <Button variant="primary" className="mt-6" onClick={resetFilters}>
        Clear filters
      </Button>
    </div>
  );
}
