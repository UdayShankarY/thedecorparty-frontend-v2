import type { BookingDetailsForm } from "@/features/booking/types";
import { buildWhatsAppUrl } from "./buildWhatsAppUrl";

const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export interface WhatsAppBookingParams {
  productName: string;
  price: number;
  quantity: number;
  occasion: string;
  details: BookingDetailsForm;
  grandTotal?: number;
}

export function createWhatsAppBookingMessage(params: WhatsAppBookingParams): string {
  const { productName, price, quantity, occasion, details, grandTotal } = params;
  const total = grandTotal ?? price * quantity;

  const lines = [
    "*New Booking Request — TheDecorParty*",
    "",
    `*Package:* ${productName}`,
    `*Occasion:* ${occasion}`,
    `*Price:* ${fmt.format(price)}${quantity > 1 ? ` × ${quantity}` : ""}`,
    `*Estimated Total:* ${fmt.format(total)}`,
    "",
    `*Customer Name:* ${details.bookerName}`,
    `*Mobile:* +91 ${details.mobile}`,
    ...(details.alternateMobile ? [`*Alternate Mobile:* +91 ${details.alternateMobile}`] : []),
    "",
    `*Event Date:* ${details.eventDate}`,
    `*Event Time:* ${details.eventTime}`,
    `*Preferred Setup Time:* ${details.setupTime}`,
    `*Number of Guests:* ${details.guestCount}`,
    "",
    `*Address:* ${details.address}`,
    ...(details.landmark ? [`*Landmark:* ${details.landmark}`] : []),
    `*Pincode:* ${details.pincode}`,
    `*City:* ${details.city}`,
    ...(details.notes ? ["", `*Additional Notes:* ${details.notes}`] : []),
    "",
    "Please confirm availability and share payment details. Thank you!",
  ];

  return buildWhatsAppUrl(lines.join("\n"));
}
