import { cn } from "@/lib/utils";
import { useProductsContext } from "../hooks/useProductsContext";

export function CategoryChips() {
  const { categories, selectedCategoryId, setSelectedCategoryId } = useProductsContext();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
      <button
        type="button"
        onClick={() => setSelectedCategoryId(null)}
        className={cn(
          "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 sm:text-sm",
          selectedCategoryId === null
            ? "border-violet-600 bg-violet-600 text-white shadow-sm"
            : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          type="button"
          onClick={() => setSelectedCategoryId(cat._id)}
          className={cn(
            "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 sm:text-sm",
            selectedCategoryId === cat._id
              ? "border-violet-600 bg-violet-600 text-white shadow-sm"
              : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
