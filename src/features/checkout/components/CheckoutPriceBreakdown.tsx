import { PriceBreakdownCard } from "@/features/booking/components/PriceBreakdownCard";
import { useCheckoutContext } from "../hooks/useCheckoutContext";

export function CheckoutPriceBreakdown() {
  const { booking, subtotal, platformFee, couponDiscount, grandTotal } = useCheckoutContext();
  if (!booking) return null;

  return (
    <PriceBreakdownCard
      price={booking.price}
      quantity={booking.quantity}
      subtotal={subtotal}
      platformFee={platformFee}
      couponDiscount={couponDiscount}
      grandTotal={grandTotal}
    />
  );
}
