import { buildWhatsAppUrl } from "./buildWhatsAppUrl";

const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export interface WhatsAppInquiryParams {
  productName: string;
  price: number;
  productUrl: string;
}

export function createWhatsAppInquiryMessage(params: WhatsAppInquiryParams): string {
  const message = [
    "Hi TheDecorParty!",
    "",
    "I'm interested in this decoration package:",
    "",
    `*${params.productName}*`,
    `Price: ${fmt.format(params.price)}`,
    `Link: ${params.productUrl}`,
    "",
    "Please share availability and booking details. Thank you!",
  ].join("\n");

  return buildWhatsAppUrl(message);
}
