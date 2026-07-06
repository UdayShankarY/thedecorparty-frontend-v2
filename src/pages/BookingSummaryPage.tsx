import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { BookingPriceBreakdown } from "@/features/booking/components/BookingPriceBreakdown";
import { BookingSummaryActions } from "@/features/booking/components/BookingSummaryActions";
import { BookingSummaryDetails } from "@/features/booking/components/BookingSummaryDetails";
import { BookingSummaryProduct } from "@/features/booking/components/BookingSummaryProduct";
import { useBookingContext } from "@/features/booking/hooks/useBookingContext";
import { BookingProvider } from "@/features/booking/providers/BookingProvider";

function BookingSummaryContent() {
  const { draft, loading, notFound } = useBookingContext();

  if (loading) {
    return (
      <Container>
        <div className="py-20 text-center text-sm text-slate-500">Loading summary...</div>
      </Container>
    );
  }

  if (notFound || !draft?.details) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-xl font-bold text-slate-900">Summary unavailable</h1>
          <p className="mt-2 text-sm text-slate-500">Complete booking details to continue.</p>
          <Button variant="primary" asChild className="mt-6">
            <Link to={draft ? `/product/${draft.productId}/booking` : "/products"}>
              {draft ? "Go to Booking Details" : "Browse Products"}
            </Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-2xl space-y-6 py-6 pb-24 sm:py-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-violet-600">Step 2 of 3</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Booking Summary</h1>
          <p className="mt-1 text-sm text-slate-500">Review your package and event details</p>
        </div>

        <BookingSummaryProduct />
        <BookingSummaryDetails />
        <BookingPriceBreakdown />
        <BookingSummaryActions />
      </div>
    </Container>
  );
}

export default function BookingSummaryPage() {
  return (
    <BookingProvider>
      <BookingSummaryContent />
    </BookingProvider>
  );
}
