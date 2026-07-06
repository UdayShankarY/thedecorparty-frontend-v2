import {
  BOOKING_DRAFT_KEY,
  CHECKOUT_BOOKING_KEY,
  type BookingDraft,
  type BookingPayload,
} from "../types";

export function loadBookingDraft(): BookingDraft | null {
  try {
    const raw = sessionStorage.getItem(BOOKING_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as BookingDraft) : null;
  } catch {
    return null;
  }
}

export function saveBookingDraft(draft: BookingDraft): void {
  sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft));
}

export function loadCheckoutPayload(): BookingPayload | null {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_BOOKING_KEY);
    return raw ? (JSON.parse(raw) as BookingPayload) : null;
  } catch {
    return null;
  }
}

export function saveCheckoutPayload(payload: BookingPayload): void {
  sessionStorage.setItem(CHECKOUT_BOOKING_KEY, JSON.stringify(payload));
}
