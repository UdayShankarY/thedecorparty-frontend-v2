import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckoutContext } from "../hooks/useCheckoutContext";

export function CheckoutCoupon() {
  const {
    couponInput,
    appliedCoupon,
    couponMessage,
    couponError,
    setCouponInput,
    applyCouponCode,
    removeCoupon,
  } = useCheckoutContext();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-violet-600" />
        <h3 className="font-bold text-slate-900">Coupon</h3>
      </div>

      {appliedCoupon ? (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2">
          <div>
            <p className="text-sm font-semibold text-emerald-800">{appliedCoupon}</p>
            {couponMessage && <p className="text-xs text-emerald-700">{couponMessage}</p>}
          </div>
          <Button variant="ghost" className="text-xs text-emerald-700" onClick={removeCoupon}>
            Remove
          </Button>
        </div>
      ) : (
        <div className="mt-3 flex gap-2">
          <Input
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1"
          />
          <Button variant="secondary" onClick={applyCouponCode}>
            Apply
          </Button>
        </div>
      )}

      {couponError && <p className="mt-2 text-xs text-rose-600">{couponError}</p>}
      {!appliedCoupon && (
        <p className="mt-2 text-xs text-slate-400">Try WELCOME10 or DECOR200</p>
      )}
    </section>
  );
}
