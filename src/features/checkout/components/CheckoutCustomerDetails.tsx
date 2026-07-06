import { useMemo } from "react";
import { DetailRowsSection } from "@/features/booking/components/DetailRowsSection";
import { useCheckoutContext } from "../hooks/useCheckoutContext";

export function CheckoutCustomerDetails() {
  const { booking } = useCheckoutContext();
  const details = booking?.details;

  const rows = useMemo(() => {
    if (!details) return [];
    return [
      { label: "Booker Name", value: details.bookerName },
      { label: "Mobile", value: details.mobile },
      ...(details.alternateMobile
        ? [{ label: "Alternate Mobile", value: details.alternateMobile }]
        : []),
    ];
  }, [details]);

  if (!rows.length) return null;
  return <DetailRowsSection title="Customer Details" rows={rows} />;
}
