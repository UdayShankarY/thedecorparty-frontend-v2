import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useProductsContext } from "../hooks/useProductsContext";

export function ProductSearch() {
  const { searchQuery, setSearchQuery } = useProductsContext();

  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search decorations, occasions, themes..."
        className="h-11 rounded-xl pl-10"
        aria-label="Search products"
      />
    </div>
  );
}
