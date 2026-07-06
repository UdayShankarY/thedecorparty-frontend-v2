const PLATFORM_FEE_FLAT = 99;

export function calcBookingTotals(price: number, quantity: number) {
  const subtotal = price * quantity;
  const platformFee = PLATFORM_FEE_FLAT;
  const grandTotal = subtotal + platformFee;
  return { subtotal, platformFee, grandTotal };
}
