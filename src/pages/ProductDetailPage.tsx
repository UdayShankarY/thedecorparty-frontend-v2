import Container from "@/components/ui/container";
import { BookingCard, MobileBookingPanel } from "@/features/product-detail/components/BookingCard";
import { MobileStickyCTA } from "@/features/product-detail/components/MobileStickyCTA";
import { PackageDetailsAccordion } from "@/features/product-detail/components/PackageDetailsAccordion";
import { ProductBreadcrumb } from "@/features/product-detail/components/ProductBreadcrumb";
import { ProductDetailSkeleton } from "@/features/product-detail/components/ProductDetailSkeleton";
import { ProductGallery } from "@/features/product-detail/components/ProductGallery";
import { ProductInfo } from "@/features/product-detail/components/ProductInfo";
import { ProductNotFound } from "@/features/product-detail/components/ProductNotFound";
import { RelatedProducts } from "@/features/product-detail/components/RelatedProducts";
import { useProductDetailContext } from "@/features/product-detail/hooks/useProductDetailContext";
import { ProductDetailProvider } from "@/features/product-detail/providers/ProductDetailProvider";

function ProductDetailContent() {
  const { loading, notFound } = useProductDetailContext();

  if (loading) return <ProductDetailSkeleton />;
  if (notFound) return <ProductNotFound />;

  return (
    <>
      <Container>
        <div className="space-y-6 py-4 pb-24 sm:space-y-8 sm:py-6 lg:pb-8">
          <ProductBreadcrumb />

          <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-8">
            <ProductGallery />
            <BookingCard />
          </div>

          <ProductInfo />
          <MobileBookingPanel />
          <PackageDetailsAccordion />
          <RelatedProducts />
        </div>
      </Container>
      <MobileStickyCTA />
    </>
  );
}

export default function ProductDetailPage() {
  return (
    <ProductDetailProvider>
      <ProductDetailContent />
    </ProductDetailProvider>
  );
}
