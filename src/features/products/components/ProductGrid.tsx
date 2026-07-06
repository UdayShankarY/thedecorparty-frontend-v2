import { memo } from "react";
import { ProductCard } from "@/features/home/components/ProductCard";
import { cn } from "@/lib/utils";
import type { HomeProduct } from "@/types";

interface ProductGridProps {
  products: HomeProduct[];
  className?: string;
}

export const ProductGrid = memo(function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} className="w-full shrink" />
      ))}
    </div>
  );
});
