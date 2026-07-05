import { Categories } from "@/features/home/components/Categories";
import { CTA } from "@/features/home/components/CTA";
import { FAQ } from "@/features/home/components/FAQ";
import { FeaturedProducts } from "@/features/home/components/FeaturedProducts";
import { Hero } from "@/features/home/components/Hero";
import { Testimonials } from "@/features/home/components/Testimonials";
import { WhyChooseUs } from "@/features/home/components/WhyChooseUs";
import { useHomeData } from "@/features/home/hooks/useHomeData";

export default function HomePage() {
  const { categories, products, loading } = useHomeData();

  return (
    <div className="space-y-16 py-8 sm:py-12">
      <Hero />
      <Categories categories={categories} loading={loading} />
      <FeaturedProducts products={products} loading={loading} />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
