import { useMemo } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { createWhatsAppBookingMessage } from "@/utils/createWhatsAppBookingMessage";
import { useBookingContext } from "../hooks/useBookingContext";

export function BookingSummaryActions() {
  const { draft, details, totals, goBackToDetails, proceedToCheckout } = useBookingContext();

  const whatsappUrl = useMemo(() => {
    if (!draft) return "";
    return createWhatsAppBookingMessage({
      productName: draft.productName,
      price: draft.price,
      quantity: draft.quantity,
      occasion: draft.categoryName,
      details,
      grandTotal: totals.grandTotal,
    });
  }, [draft, details, totals.grandTotal]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" className="gap-2 sm:flex-1" onClick={goBackToDetails}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button variant="primary" className="gap-2 sm:flex-1" onClick={proceedToCheckout}>
          <CreditCard className="h-4 w-4" />
          Proceed to Payment
        </Button>
      </div>

      {whatsappUrl && (
        <Button variant="secondary" asChild className="w-full gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            Book via WhatsApp
          </a>
        </Button>
      )}
    </div>
  );
}
