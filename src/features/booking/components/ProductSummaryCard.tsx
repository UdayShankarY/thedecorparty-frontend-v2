const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export interface ProductSummaryCardProps {
  productName: string;
  categoryName: string;
  price: number;
  quantity?: number;
  image?: string;
}

export function ProductSummaryCard({
  productName,
  categoryName,
  price,
  quantity = 1,
  image,
}: ProductSummaryCardProps) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
        {image ? (
          <img
            src={image}
            alt={productName}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-violet-600">
          {categoryName}
        </p>
        <h2 className="mt-1 line-clamp-2 text-base font-bold text-slate-900 sm:text-lg">
          {productName}
        </h2>
        <p className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">{fmt.format(price)}</p>
        {quantity > 1 && <p className="text-xs text-slate-500">Quantity: {quantity}</p>}
      </div>
    </div>
  );
}
