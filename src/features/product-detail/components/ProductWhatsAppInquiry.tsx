import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { createWhatsAppInquiryMessage } from "@/utils/createWhatsAppInquiryMessage";
import { useProductDetailContext } from "../hooks/useProductDetailContext";

interface ProductWhatsAppInquiryProps {
  className?: string;
}

export function ProductWhatsAppInquiry({ className }: ProductWhatsAppInquiryProps) {
  const { product } = useProductDetailContext();

  const whatsappUrl = useMemo(() => {
    if (!product) return "";
    return createWhatsAppInquiryMessage({
      productName: product.name,
      price: product.price,
      productUrl: `${window.location.origin}/product/${product._id}`,
    });
  }, [product]);

  if (!product) return null;

  return (
    <Button variant="secondary" asChild className={cn("w-full gap-2", className)}>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
        WhatsApp Inquiry
      </a>
    </Button>
  );
}
