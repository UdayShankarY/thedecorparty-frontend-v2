import { ProductSummaryCard } from "./ProductSummaryCard";
import { useBookingContext } from "../hooks/useBookingContext";

export function BookingSummaryProduct() {
  const { draft } = useBookingContext();
  if (!draft) return null;

  return (
    <ProductSummaryCard
      productName={draft.productName}
      categoryName={draft.categoryName}
      price={draft.price}
      quantity={draft.quantity}
      image={draft.image}
    />
  );
}
