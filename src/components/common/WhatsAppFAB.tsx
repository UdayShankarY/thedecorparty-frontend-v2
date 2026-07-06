import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/utils/buildWhatsAppUrl";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface WhatsAppFABProps {
  hasStickyCTA?: boolean;
  className?: string;
}

export function WhatsAppFAB({ hasStickyCTA = false, className }: WhatsAppFABProps) {
  const href = buildWhatsAppUrl("Hi TheDecorParty! I'd like help with decoration booking.");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-200/60 transition hover:scale-105 hover:bg-[#20BD5A] active:scale-95",
        hasStickyCTA ? "bottom-20 right-4 lg:bottom-6 lg:right-6" : "bottom-6 right-4 lg:bottom-6 lg:right-6",
        className
      )}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
