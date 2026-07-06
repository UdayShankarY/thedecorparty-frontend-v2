import { ProductSummaryCard } from "@/features/booking/components/ProductSummaryCard";
import { useCheckoutContext } from "../hooks/useCheckoutContext";

export function CheckoutBookingSummary() {
  const { booking } = useCheckoutContext();
  if (!booking) return null;

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
        Booking Summary
      </h2>
      <ProductSummaryCard
        productName={booking.productName}
        categoryName={booking.categoryName}
        price={booking.price}
        quantity={booking.quantity}
        image={booking.image}
      />
    </section>
  );
}
