import { Tag } from "lucide-react";

export function OfferBar() {
  return (
    <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400 py-2 text-center text-xs font-medium text-white sm:text-sm">
      <span className="inline-flex items-center gap-2">
        <Tag className="h-3.5 w-3.5" />
        Free setup on orders above ₹2,999 · Use code{" "}
        <span className="rounded bg-white/20 px-1.5 py-0.5 font-bold tracking-wide">DECOR10</span>{" "}
        for 10% off your first booking
      </span>
    </div>
  );
}
