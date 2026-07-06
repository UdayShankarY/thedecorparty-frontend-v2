import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProductDetailContext } from "../hooks/useProductDetailContext";

const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductInfo() {
  const { product, discountPercent } = useProductDetailContext();
  if (!product) return null;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-violet-600">
          {product.categoryName}
        </span>
        {product.badge && (
          <Badge className="bg-violet-600 text-white">{product.badge}</Badge>
        )}
      </div>

      <h1 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl lg:text-3xl">
        {product.name}
      </h1>

      {(product.rating ?? 0) > 0 && (
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-slate-800">{product.rating}</span>
          <span className="text-sm text-slate-500">({product.reviewCount ?? 0})</span>
        </div>
      )}

      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {fmt.format(product.price)}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <>
            <span className="text-base text-slate-400 line-through">
              {fmt.format(product.originalPrice)}
            </span>
            {discountPercent !== null && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                {discountPercent}% OFF
              </span>
            )}
          </>
        )}
      </div>

      <p
        className={`inline-flex items-center gap-1.5 text-sm font-medium ${
          product.active ? "text-emerald-700" : "text-rose-600"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${product.active ? "bg-emerald-500" : "bg-rose-500"}`}
        />
        {product.active ? "Available for booking" : "Currently unavailable"}
      </p>
    </section>
  );
}
