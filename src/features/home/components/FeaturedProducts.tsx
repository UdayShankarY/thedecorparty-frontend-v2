import { SectionHeader } from "./SectionHeader";
import { ProductSlider } from "./ProductSlider";
import type { HomeProduct } from "@/types";

interface FeaturedProductsProps {
  products: HomeProduct[];
  loading: boolean;
}

export function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  const trending = loading ? [] : products.filter((p) => p.featured);

  return (
    <section className="space-y-4">
      <SectionHeader title="Featured Decorations" viewAllHref="/products" />
      <ProductSlider products={trending} loading={loading} />
    </section>
  );
}
