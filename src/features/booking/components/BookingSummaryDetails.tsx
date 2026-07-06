import { useMemo } from "react";
import { DetailRowsSection } from "./DetailRowsSection";
import { useBookingContext } from "../hooks/useBookingContext";

export function BookingSummaryDetails() {
  const { details } = useBookingContext();

  const rows = useMemo(
    () => [
      { label: "Booker Name", value: details.bookerName },
      { label: "Mobile", value: details.mobile },
      ...(details.alternateMobile
        ? [{ label: "Alternate Mobile", value: details.alternateMobile }]
        : []),
      { label: "Event Date", value: details.eventDate },
      { label: "Event Time", value: details.eventTime },
      { label: "Setup Time", value: details.setupTime },
      { label: "Guests", value: details.guestCount },
      { label: "Address", value: details.address },
      ...(details.landmark ? [{ label: "Landmark", value: details.landmark }] : []),
      { label: "Pincode", value: details.pincode },
      { label: "City", value: details.city },
      ...(details.notes ? [{ label: "Notes", value: details.notes }] : []),
    ],
    [details]
  );

  return <DetailRowsSection title="Booking Details" rows={rows} />;
}
