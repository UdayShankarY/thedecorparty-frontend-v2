import { PriceBreakdownCard } from "./PriceBreakdownCard";
import { useBookingContext } from "../hooks/useBookingContext";

export function BookingPriceBreakdown() {
  const { draft, totals } = useBookingContext();
  if (!draft) return null;

  return (
    <PriceBreakdownCard
      price={draft.price}
      quantity={draft.quantity}
      subtotal={totals.subtotal}
      platformFee={totals.platformFee}
      grandTotal={totals.grandTotal}
    />
  );
}
