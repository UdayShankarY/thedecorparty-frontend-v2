import Container from "@/components/ui/container";
import { FilterDrawer } from "@/features/products/components/FilterDrawer";
import { LoadMore } from "@/features/products/components/LoadMore";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductGridSkeleton } from "@/features/products/components/ProductGridSkeleton";
import { ProductsEmptyState } from "@/features/products/components/ProductsEmptyState";
import { ProductToolbar } from "@/features/products/components/ProductToolbar";
import { useProductsContext } from "@/features/products/hooks/useProductsContext";
import { ProductsProvider } from "@/features/products/providers/ProductsProvider";

function ProductsCatalog() {
  const { loading, visibleProducts, resultCount } = useProductsContext();

  return (
    <Container>
      <div className="space-y-4 py-4 sm:space-y-6 sm:py-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">All Decorations</h1>
          {!loading && (
            <p className="mt-1 text-sm text-slate-500">{resultCount} packages available</p>
          )}
        </div>

        <div className="flex gap-6 lg:gap-8">
          <FilterDrawer />
          <div className="min-w-0 flex-1 space-y-4 sm:space-y-6">
            <ProductToolbar />
            {loading ? (
              <ProductGridSkeleton />
            ) : visibleProducts.length === 0 ? (
              <ProductsEmptyState />
            ) : (
              <>
                <ProductGrid products={visibleProducts} />
                <LoadMore />
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <ProductsCatalog />
    </ProductsProvider>
  );
}
