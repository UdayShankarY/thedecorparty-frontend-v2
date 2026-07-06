import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { BookingDetailsForm } from "@/features/booking/components/BookingDetailsForm";
import { useBookingContext } from "@/features/booking/hooks/useBookingContext";
import { BookingProvider } from "@/features/booking/providers/BookingProvider";

function BookingDetailsContent() {
  const { draft, loading, notFound, submitDetails } = useBookingContext();

  if (loading) {
    return (
      <Container>
        <div className="py-20 text-center text-sm text-slate-500">Loading booking...</div>
      </Container>
    );
  }

  if (notFound || !draft) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-xl font-bold text-slate-900">Booking not found</h1>
          <p className="mt-2 text-sm text-slate-500">Select a package and try again.</p>
          <Button variant="primary" asChild className="mt-6">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-2xl space-y-6 py-6 pb-24 sm:py-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-violet-600">Step 1 of 3</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Booking Details</h1>
          <p className="mt-1 text-sm text-slate-500">{draft.productName}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <BookingDetailsForm />
        </div>

        <Button variant="primary" className="h-12 w-full gap-2" onClick={submitDetails}>
          Continue to Summary
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Container>
  );
}

export default function BookingDetailsPage() {
  return (
    <BookingProvider>
      <BookingDetailsContent />
    </BookingProvider>
  );
}
