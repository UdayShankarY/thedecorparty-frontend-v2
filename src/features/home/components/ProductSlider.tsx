import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "./ProductCard";
import type { HomeProduct } from "@/types";

interface ProductSliderProps {
  products: HomeProduct[];
  loading?: boolean;
}

export function ProductSlider({ products, loading = false }: ProductSliderProps) {
  return (
    <Container>
      {/* scroll-snap-type on the scroll container */}
      <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[72vw] shrink-0 space-y-2 [scroll-snap-align:start] sm:w-64"
                >
                  <Skeleton className="aspect-[4/3] w-full rounded-[1.5rem]" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))
            : products.map((product) => (
                <div key={product._id} className="[scroll-snap-align:start]">
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </Container>
  );
}
