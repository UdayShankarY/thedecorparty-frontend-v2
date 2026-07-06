import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { loadCheckoutPayload } from "@/features/booking/utils/bookingStorage";
import type { BookingPayload } from "@/features/booking/types";

const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function CheckoutPage() {
  const [booking, setBooking] = useState<BookingPayload | null>(null);

  useEffect(() => {
    setBooking(loadCheckoutPayload());
  }, []);

  if (!booking) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-xl font-bold text-slate-900">No booking selected</h1>
          <p className="mt-2 text-sm text-slate-500">Complete booking details to continue checkout.</p>
          <Button variant="primary" asChild className="mt-6">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Container>
    );
  }

  const { details } = booking;

  return (
    <Container>
      <div className="mx-auto max-w-lg space-y-6 py-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-violet-600">Step 3 of 3</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Checkout</h1>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="font-semibold text-slate-900">{booking.productName}</p>
          <p className="text-sm text-slate-500">{booking.categoryName}</p>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Booker</dt>
              <dd className="font-medium text-slate-800">{details.bookerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Mobile</dt>
              <dd className="font-medium text-slate-800">{details.mobile}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Event Date</dt>
              <dd className="font-medium text-slate-800">{details.eventDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Event Time</dt>
              <dd className="font-medium text-slate-800">{details.eventTime}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Setup Time</dt>
              <dd className="font-medium text-slate-800">{details.setupTime}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Guests</dt>
              <dd className="font-medium text-slate-800">{details.guestCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Venue</dt>
              <dd className="max-w-[60%] text-right font-medium text-slate-800">
                {details.address}, {details.city} — {details.pincode}
              </dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <dt className="text-slate-500">Subtotal</dt>
              <dd className="font-medium text-slate-800">{fmt.format(booking.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Platform Fee</dt>
              <dd className="font-medium text-slate-800">{fmt.format(booking.platformFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <dt className="font-bold text-slate-900">Grand Total</dt>
              <dd className="font-bold text-slate-900">{fmt.format(booking.grandTotal)}</dd>
            </div>
          </dl>
        </div>

        <p className="text-sm text-slate-500">Payment integration will be available in the next release.</p>
      </div>
    </Container>
  );
}
