import { Categories } from "@/features/home/components/Categories";
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts";
import { Hero } from "@/features/home/components/Hero";
import { PackageSection } from "@/features/home/components/PackageSection";
import { useHomeData } from "@/features/home/hooks/useHomeData";

export default function HomePage() {
  const { sliders, categories, products, loading } = useHomeData();

  return (
    <div className="space-y-6 pb-6 sm:space-y-10 sm:pt-6 sm:pb-10">
      <Hero sliders={sliders} loading={loading} />
      <Categories categories={categories} loading={loading} />
      <FeaturedProducts products={products} loading={loading} />
      <PackageSection
        title="Birthday Packages"
        keyword="birthday"
        products={products}
        loading={loading}
      />
      <PackageSection
        title="Anniversary Packages"
        keyword="anniversary"
        products={products}
        loading={loading}
      />
      <PackageSection
        title="Proposal Setups"
        keyword="proposal"
        products={products}
        loading={loading}
      />
    </div>
  );
}
