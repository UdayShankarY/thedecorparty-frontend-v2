import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { useCheckoutContext } from "../hooks/useCheckoutContext";

export function CheckoutActions() {
  const { termsAccepted, whatsappUrl, proceedToPayment, paymentNotice } = useCheckoutContext();

  return (
    <div className="space-y-3">
      {paymentNotice && (
        <p className="rounded-xl bg-violet-50 px-3 py-2 text-sm text-violet-800" role="status">
          {paymentNotice}
        </p>
      )}

      <Button
        variant="primary"
        className="h-12 w-full gap-2 rounded-xl text-base"
        onClick={proceedToPayment}
        disabled={!termsAccepted}
      >
        <CreditCard className="h-5 w-5" />
        Proceed to Payment
      </Button>

      {whatsappUrl && (
        <Button
          variant="secondary"
          asChild
          className="h-12 w-full gap-2 rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            Book via WhatsApp
          </a>
        </Button>
      )}
    </div>
  );
}
