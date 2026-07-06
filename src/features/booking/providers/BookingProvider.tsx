import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/services/api";
import { fetchProductById } from "@/features/products/services/productsService";
import {
  EMPTY_BOOKING_DETAILS,
  SETUP_TIME_SLOTS,
  TIME_SLOTS,
  type BookingDetailsForm,
  type BookingDraft,
  type BookingPayload,
} from "../types";
import { calcBookingTotals } from "../utils/calcBookingTotals";
import { loadBookingDraft, saveBookingDraft, saveCheckoutPayload } from "../utils/bookingStorage";
import {
  hasValidationErrors,
  validateBookingDetails,
  type BookingFieldErrors,
} from "../utils/validateBookingDetails";
import type { HomeProduct } from "@/types";

interface BookingContextValue {
  product: HomeProduct | null;
  draft: BookingDraft | null;
  loading: boolean;
  notFound: boolean;
  details: BookingDetailsForm;
  fieldErrors: BookingFieldErrors;
  formError: string;
  timeSlots: readonly string[];
  setupTimeSlots: readonly string[];
  totals: ReturnType<typeof calcBookingTotals>;
  updateField: (field: keyof BookingDetailsForm, value: string) => void;
  submitDetails: () => void;
  proceedToCheckout: () => void;
  goBackToDetails: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

function buildDetailsFromDraft(draft: BookingDraft): BookingDetailsForm {
  return {
    ...EMPTY_BOOKING_DETAILS,
    ...draft.details,
  };
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<HomeProduct | null>(null);
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [details, setDetails] = useState<BookingDetailsForm>(EMPTY_BOOKING_DETAILS);
  const [fieldErrors, setFieldErrors] = useState<BookingFieldErrors>({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);

    const stored = loadBookingDraft();
    if (!stored || stored.productId !== id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setDraft(stored);
    setDetails(buildDetailsFromDraft(stored));
    setFieldErrors({});
    setFormError("");

    fetchProductById(id)
      .then((found) => {
        if (!mounted) return;
        if (!found) {
          setNotFound(true);
          setProduct(null);
        } else {
          setProduct(found);
          setNotFound(false);
        }
      })
      .catch(() => {
        if (mounted) setNotFound(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const totals = useMemo(
    () => calcBookingTotals(draft?.price ?? 0, draft?.quantity ?? 1),
    [draft?.price, draft?.quantity]
  );

  const updateField = useCallback((field: keyof BookingDetailsForm, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormError("");
  }, []);

  const persistDraft = useCallback(
    (nextDetails: BookingDetailsForm) => {
      if (!draft) return;
    const updated: BookingDraft = {
      ...draft,
      details: nextDetails,
    };
      setDraft(updated);
      saveBookingDraft(updated);
    },
    [draft]
  );

  const submitDetails = useCallback(() => {
    if (!draft || !id) return;
    const errors = validateBookingDetails(details);
    setFieldErrors(errors);
    if (hasValidationErrors(errors)) {
      setFormError("Please fix the highlighted fields.");
      return;
    }
    persistDraft(details);
    setFormError("");
    navigate(`/product/${id}/booking/summary`);
  }, [draft, details, id, navigate, persistDraft]);

  const proceedToCheckout = useCallback(() => {
    if (!draft || !product) return;
    const errors = validateBookingDetails(details);
    if (hasValidationErrors(errors)) {
      setFormError("Booking details are incomplete.");
      navigate(`/product/${draft.productId}/booking`);
      return;
    }

    const payload: BookingPayload = {
      ...draft,
      details,
      ...totals,
    };

    saveCheckoutPayload(payload);
    api.post(`/api/products/${draft.productId}/order`).catch(() => {});
    navigate("/checkout");
  }, [draft, product, details, totals, navigate]);

  const goBackToDetails = useCallback(() => {
    if (!draft) return;
    navigate(`/product/${draft.productId}/booking`);
  }, [draft, navigate]);

  const value = useMemo<BookingContextValue>(
    () => ({
      product,
      draft,
      loading,
      notFound,
      details,
      fieldErrors,
      formError,
      timeSlots: TIME_SLOTS,
      setupTimeSlots: SETUP_TIME_SLOTS,
      totals,
      updateField,
      submitDetails,
      proceedToCheckout,
      goBackToDetails,
    }),
    [
      product,
      draft,
      loading,
      notFound,
      details,
      fieldErrors,
      formError,
      totals,
      updateField,
      submitDetails,
      proceedToCheckout,
      goBackToDetails,
    ]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookingContext() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookingContext must be used within BookingProvider");
  return ctx;
}
