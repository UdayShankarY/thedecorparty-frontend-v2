export interface CouponResult {
  code: string;
  discount: number;
  message: string;
}

const COUPONS: Record<string, { type: "percent"; value: number; max?: number } | { type: "flat"; value: number }> = {
  WELCOME10: { type: "percent", value: 10, max: 500 },
  DECOR200: { type: "flat", value: 200 },
};

export function applyCoupon(code: string, subtotal: number): CouponResult | null {
  const normalized = code.trim().toUpperCase();
  const coupon = COUPONS[normalized];
  if (!coupon) return null;

  let discount = 0;
  if (coupon.type === "percent") {
    discount = Math.round(subtotal * (coupon.value / 100));
    if (coupon.max) discount = Math.min(discount, coupon.max);
  } else {
    discount = coupon.value;
  }

  discount = Math.min(discount, subtotal);

  return {
    code: normalized,
    discount,
    message: `Coupon ${normalized} applied! You save ₹${discount.toLocaleString("en-IN")}.`,
  };
}
