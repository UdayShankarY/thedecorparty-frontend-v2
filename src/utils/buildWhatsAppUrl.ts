import { ENV } from "@/config/env";

export function buildWhatsAppUrl(message: string, phone = ENV.WHATSAPP_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
