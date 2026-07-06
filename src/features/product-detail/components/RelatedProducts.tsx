import { memo } from "react";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { ProductSlider } from "@/features/home/components/ProductSlider";
import { useProductDetailContext } from "../hooks/useProductDetailContext";

export const RelatedProducts = memo(function RelatedProducts() {
  const { relatedProducts } = useProductDetailContext();

  if (relatedProducts.length === 0) return null;

  return (
    <section className="space-y-4 pb-4">
      <SectionHeader
        title="You may also like"
        viewAllHref="/products"
        viewAllLabel="See all"
      />
      <ProductSlider products={relatedProducts} />
    </section>
  );
});
