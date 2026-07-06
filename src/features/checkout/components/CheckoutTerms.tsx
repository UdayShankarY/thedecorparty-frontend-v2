import { useCheckoutContext } from "../hooks/useCheckoutContext";

export function CheckoutTerms() {
  const { termsAccepted, setTermsAccepted } = useCheckoutContext();

  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <input
        type="checkbox"
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
      />
      <span className="text-sm leading-relaxed text-slate-600">
        I agree to the{" "}
        <span className="font-medium text-slate-900">Terms &amp; Conditions</span> and
        understand that booking is confirmed after payment and team verification.
      </span>
    </label>
  );
}
