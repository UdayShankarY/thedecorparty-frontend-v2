import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProductDetailContext } from "../hooks/useProductDetailContext";
import { ProductWhatsAppInquiry } from "./ProductWhatsAppInquiry";

const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function WishlistButton() {
  const { isWishlisted, toggleWishlist } = useProductDetailContext();

  return (
    <Button
      variant="secondary"
      className={cn("w-full gap-2", isWishlisted && "border-rose-200 text-rose-600")}
      onClick={toggleWishlist}
    >
      <Heart className={cn("h-4 w-4", isWishlisted && "fill-rose-500")} />
      {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
    </Button>
  );
}

function BookingPanelContent({ showBookNow = true }: { showBookNow?: boolean }) {
  const { product, bookNow } = useProductDetailContext();
  if (!product) return null;

  return (
    <>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Book this package
        </p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{fmt.format(product.price)}</p>
      </div>

      <WishlistButton />

      {showBookNow && (
        <Button
          variant="primary"
          className="h-12 w-full gap-2 rounded-xl text-base"
          onClick={bookNow}
          disabled={!product.active}
        >
          <ShoppingBag className="h-5 w-5" />
          Book Now
        </Button>
      )}

      <ProductWhatsAppInquiry />
    </>
  );
}

export function BookingCard() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <BookingPanelContent />
      </div>
    </aside>
  );
}

export function MobileBookingPanel() {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 lg:hidden">
      <BookingPanelContent showBookNow={false} />
    </section>
  );
}
