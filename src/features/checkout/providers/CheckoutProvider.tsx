import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BookingPayload } from "@/features/booking/types";
import { calcBookingTotals } from "@/features/booking/utils/calcBookingTotals";
import { loadCheckoutPayload } from "@/features/booking/utils/bookingStorage";
import { createWhatsAppBookingMessage } from "@/utils/createWhatsAppBookingMessage";
import { applyCoupon } from "../utils/applyCoupon";

interface CheckoutContextValue {
  booking: BookingPayload | null;
  loading: boolean;
  couponInput: string;
  appliedCoupon: string | null;
  couponDiscount: number;
  couponMessage: string;
  couponError: string;
  termsAccepted: boolean;
  paymentNotice: string;
  subtotal: number;
  platformFee: number;
  grandTotal: number;
  whatsappUrl: string;
  setCouponInput: (value: string) => void;
  applyCouponCode: () => void;
  removeCoupon: () => void;
  setTermsAccepted: (value: boolean) => void;
  proceedToPayment: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState("");

  useEffect(() => {
    setBooking(loadCheckoutPayload());
    setLoading(false);
  }, []);

  const baseTotals = useMemo(
    () => calcBookingTotals(booking?.price ?? 0, booking?.quantity ?? 1),
    [booking?.price, booking?.quantity]
  );

  const grandTotal = useMemo(
    () => Math.max(0, baseTotals.subtotal + baseTotals.platformFee - couponDiscount),
    [baseTotals, couponDiscount]
  );

  const whatsappUrl = useMemo(() => {
    if (!booking) return "";
    return createWhatsAppBookingMessage({
      productName: booking.productName,
      price: booking.price,
      quantity: booking.quantity,
      occasion: booking.categoryName,
      details: booking.details,
      grandTotal,
    });
  }, [booking, grandTotal]);

  const applyCouponCode = useCallback(() => {
    if (!booking) return;
    const result = applyCoupon(couponInput, baseTotals.subtotal);
    if (!result) {
      setCouponError("Invalid coupon code.");
      setCouponMessage("");
      setAppliedCoupon(null);
      setCouponDiscount(0);
      return;
    }
    setAppliedCoupon(result.code);
    setCouponDiscount(result.discount);
    setCouponMessage(result.message);
    setCouponError("");
  }, [booking, couponInput, baseTotals.subtotal]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponMessage("");
    setCouponError("");
    setCouponInput("");
  }, []);

  const proceedToPayment = useCallback(() => {
    if (!termsAccepted) {
      setPaymentNotice("Please accept the terms and conditions to continue.");
      return;
    }
    setPaymentNotice("Payment integration will be available in the next release.");
  }, [termsAccepted]);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      booking,
      loading,
      couponInput,
      appliedCoupon,
      couponDiscount,
      couponMessage,
      couponError,
      termsAccepted,
      paymentNotice,
      subtotal: baseTotals.subtotal,
      platformFee: baseTotals.platformFee,
      grandTotal,
      whatsappUrl,
      setCouponInput,
      applyCouponCode,
      removeCoupon,
      setTermsAccepted,
      proceedToPayment,
    }),
    [
      booking,
      loading,
      couponInput,
      appliedCoupon,
      couponDiscount,
      couponMessage,
      couponError,
      termsAccepted,
      paymentNotice,
      baseTotals,
      grandTotal,
      whatsappUrl,
      applyCouponCode,
      removeCoupon,
      proceedToPayment,
    ]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckoutContext() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckoutContext must be used within CheckoutProvider");
  return ctx;
}
