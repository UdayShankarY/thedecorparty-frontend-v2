const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export interface PriceBreakdownCardProps {
  price: number;
  quantity: number;
  subtotal: number;
  platformFee: number;
  couponDiscount?: number;
  grandTotal: number;
}

export function PriceBreakdownCard({
  price,
  quantity,
  subtotal,
  platformFee,
  couponDiscount = 0,
  grandTotal,
}: PriceBreakdownCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="font-bold text-slate-900">Price Breakdown</h3>
      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">
            Package ({quantity} × {fmt.format(price)})
          </dt>
          <dd className="font-medium text-slate-800">{fmt.format(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Platform Fee</dt>
          <dd className="font-medium text-slate-800">{fmt.format(platformFee)}</dd>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between gap-4 text-emerald-700">
            <dt>Coupon Discount</dt>
            <dd className="font-medium">−{fmt.format(couponDiscount)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4 border-t border-slate-100 pt-2.5">
          <dt className="font-bold text-slate-900">Grand Total</dt>
          <dd className="text-lg font-bold text-slate-900">{fmt.format(grandTotal)}</dd>
        </div>
      </dl>
    </section>
  );
}
