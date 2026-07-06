import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AvailabilityFilter } from "../types";
import { useProductsContext } from "../hooks/useProductsContext";

const RATING_OPTIONS = [
  { label: "Any rating", value: null },
  { label: "4★ & above", value: 4 },
  { label: "3★ & above", value: 3 },
  { label: "2★ & above", value: 2 },
];

const AVAILABILITY_OPTIONS: { label: string; value: AvailabilityFilter }[] = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "unavailable" },
];

function FilterPanel({ className }: { className?: string }) {
  const {
    priceMin,
    priceMax,
    minRating,
    availability,
    setPriceMin,
    setPriceMax,
    setMinRating,
    setAvailability,
    resetFilters,
    resultCount,
  } = useProductsContext();

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Filters</h2>
        <span className="text-xs text-slate-500">{resultCount} results</span>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-800">Price (₹)</p>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={priceMin ?? ""}
            onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : null)}
            aria-label="Minimum price"
          />
          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={priceMax ?? ""}
            onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : null)}
            aria-label="Maximum price"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-800">Rating</p>
        <div className="flex flex-wrap gap-2">
          {RATING_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setMinRating(opt.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                minRating === opt.value
                  ? "border-violet-600 bg-violet-50 text-violet-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-800">Availability</p>
        <div className="flex flex-wrap gap-2">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAvailability(opt.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                availability === opt.value
                  ? "border-violet-600 bg-violet-50 text-violet-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Button variant="secondary" className="w-full" onClick={resetFilters}>
        Clear all filters
      </Button>
    </div>
  );
}

export function FilterDrawer() {
  const { filterOpen, setFilterOpen } = useProductsContext();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <FilterPanel />
        </div>
      </aside>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-5 shadow-2xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-violet-600" />
                  <span className="font-bold text-slate-900">Filters</span>
                </div>
                <Button variant="icon" aria-label="Close filters" onClick={() => setFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <FilterPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
