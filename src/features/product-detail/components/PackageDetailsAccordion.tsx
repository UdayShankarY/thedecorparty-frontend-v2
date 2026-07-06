import { useMemo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductDetailContext } from "../hooks/useProductDetailContext";

const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function PackageDetailsAccordion() {
  const { product, termsHtml, termsLoading } = useProductDetailContext();

  const items = useMemo(() => {
    if (!product) return [];

    return [
      {
        id: "inclusions",
        title: "What's Included",
        content:
          product.inclusions && product.inclusions.length > 0 ? (
            <ul className="list-inside list-disc space-y-1.5">
              {product.inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>Package inclusions will be shared during booking confirmation.</p>
          ),
      },
      {
        id: "description",
        title: "Description",
        content: product.description ? (
          <p>{product.description}</p>
        ) : (
          <p>No description available for this package.</p>
        ),
      },
      {
        id: "decoration",
        title: "Decoration Details",
        content: (
          <div className="space-y-3">
            {product.subcategory && (
              <p>
                <span className="font-semibold text-slate-800">Style: </span>
                {product.subcategory}
              </p>
            )}
            {product.addOns && product.addOns.length > 0 ? (
              <ul className="space-y-2">
                {product.addOns.map((addon) => (
                  <li
                    key={addon.name}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <span>{addon.name}</span>
                    <span className="font-semibold text-violet-700">
                      +{fmt.format(addon.price)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Custom add-ons can be discussed during checkout.</p>
            )}
          </div>
        ),
      },
      {
        id: "terms",
        title: "Terms & Conditions",
        content: termsLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ) : termsHtml ? (
          <div
            className="prose prose-sm max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600"
            dangerouslySetInnerHTML={{ __html: termsHtml }}
          />
        ) : (
          <p>Terms and conditions are unavailable at the moment.</p>
        ),
      },
    ];
  }, [product, termsHtml, termsLoading]);

  if (!product) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-slate-900">Package Details</h2>
      <Accordion items={items} defaultOpenId="inclusions" />
    </section>
  );
}
