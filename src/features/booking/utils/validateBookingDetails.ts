import type { BookingDetailsForm } from "../types";

export type BookingFieldErrors = Partial<Record<keyof BookingDetailsForm, string>>;

const MOBILE_RE = /^[6-9]\d{9}$/;
const PINCODE_RE = /^\d{6}$/;

export function validateBookingDetails(details: BookingDetailsForm): BookingFieldErrors {
  const errors: BookingFieldErrors = {};

  if (!details.bookerName.trim()) errors.bookerName = "Name is required";
  if (!details.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!MOBILE_RE.test(details.mobile.trim())) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }
  if (details.alternateMobile.trim() && !MOBILE_RE.test(details.alternateMobile.trim())) {
    errors.alternateMobile = "Enter a valid 10-digit number";
  }
  if (!details.eventDate) errors.eventDate = "Event date is required";
  if (!details.eventTime) errors.eventTime = "Event time is required";
  if (!details.setupTime) errors.setupTime = "Setup time is required";
  if (!details.guestCount.trim()) {
    errors.guestCount = "Number of guests is required";
  } else if (Number(details.guestCount) < 1) {
    errors.guestCount = "At least 1 guest is required";
  }
  if (!details.address.trim()) errors.address = "Venue address is required";
  if (!details.pincode.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!PINCODE_RE.test(details.pincode.trim())) {
    errors.pincode = "Enter a valid 6-digit pincode";
  }
  if (!details.city.trim()) errors.city = "City is required";

  return errors;
}

export function hasValidationErrors(errors: BookingFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
