export const TIME_SLOTS = [
  "10:00 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM",
  "08:00 PM",
] as const;

export const SETUP_TIME_SLOTS = [
  "09:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
  "07:00 PM",
] as const;

export const BOOKING_DRAFT_KEY = "tdp_booking_draft";
export const CHECKOUT_BOOKING_KEY = "tdp_checkout_booking";

export interface BookingDetailsForm {
  bookerName: string;
  mobile: string;
  alternateMobile: string;
  eventDate: string;
  eventTime: string;
  setupTime: string;
  guestCount: string;
  address: string;
  landmark: string;
  pincode: string;
  city: string;
  notes: string;
}

export interface BookingDraft {
  productId: string;
  productName: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  eventDate: string;
  eventTime: string;
  details?: BookingDetailsForm;
}

export interface BookingPayload extends BookingDraft {
  details: BookingDetailsForm;
  platformFee: number;
  subtotal: number;
  grandTotal: number;
}

export const EMPTY_BOOKING_DETAILS: BookingDetailsForm = {
  bookerName: "",
  mobile: "",
  alternateMobile: "",
  eventDate: "",
  eventTime: "",
  setupTime: "",
  guestCount: "",
  address: "",
  landmark: "",
  pincode: "",
  city: "",
  notes: "",
};
