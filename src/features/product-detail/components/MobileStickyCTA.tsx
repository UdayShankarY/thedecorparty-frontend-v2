import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductDetailContext } from "../hooks/useProductDetailContext";

export function MobileStickyCTA() {
  const { product, bookNow } = useProductDetailContext();
  if (!product) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-md lg:hidden">
      <Button
        variant="primary"
        className="h-12 w-full gap-2 rounded-xl text-base"
        onClick={bookNow}
        disabled={!product.active}
      >
        <ShoppingBag className="h-5 w-5" />
        Book Now
      </Button>
    </div>
  );
}
