import { Button } from "@/components/ui/button";
import { useProductsContext } from "../hooks/useProductsContext";

export function LoadMore() {
  const { hasMore, loadMore, visibleProducts, resultCount } = useProductsContext();

  if (!hasMore) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <p className="text-sm text-slate-500">
        Showing {visibleProducts.length} of {resultCount} products
      </p>
      <Button variant="secondary" className="min-w-[200px]" onClick={loadMore}>
        Load more
      </Button>
    </div>
  );
}
