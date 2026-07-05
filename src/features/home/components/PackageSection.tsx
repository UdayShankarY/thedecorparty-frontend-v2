import { SectionHeader } from "./SectionHeader";
import { ProductSlider } from "./ProductSlider";
import type { HomeProduct } from "@/types";

interface PackageSectionProps {
  title: string;
  subtitle?: string;
  keyword?: string;
  filter?: (product: HomeProduct) => boolean;
  viewAllLabel?: string;
  products: HomeProduct[];
  loading: boolean;
}

export function PackageSection({
  title,
  subtitle,
  keyword,
  filter,
  viewAllLabel = "See All",
  products,
  loading,
}: PackageSectionProps) {
  const filtered = loading
    ? []
    : products.filter((p) => {
        if (filter) return filter(p);
        if (keyword) return p.categoryName.toLowerCase().includes(keyword.toLowerCase());
        return true;
      });

  if (!loading && filtered.length === 0) return null;

  return (
    <section className="space-y-4">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        viewAllHref="/products"
        viewAllLabel={viewAllLabel}
      />
      <ProductSlider products={filtered} loading={loading} />
    </section>
  );
}
