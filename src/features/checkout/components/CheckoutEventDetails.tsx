import { useMemo } from "react";
import { DetailRowsSection } from "@/features/booking/components/DetailRowsSection";
import { useCheckoutContext } from "../hooks/useCheckoutContext";

export function CheckoutEventDetails() {
  const { booking } = useCheckoutContext();
  const details = booking?.details;

  const rows = useMemo(() => {
    if (!details) return [];
    return [
      { label: "Event Date", value: details.eventDate },
      { label: "Event Time", value: details.eventTime },
      { label: "Setup Time", value: details.setupTime },
      { label: "Guests", value: details.guestCount },
      { label: "Address", value: details.address },
      ...(details.landmark ? [{ label: "Landmark", value: details.landmark }] : []),
      { label: "Pincode", value: details.pincode },
      { label: "City", value: details.city },
      ...(details.notes ? [{ label: "Notes", value: details.notes }] : []),
    ];
  }, [details]);

  if (!rows.length) return null;
  return <DetailRowsSection title="Event Details" rows={rows} />;
}
