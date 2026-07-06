import { api } from "@/services/api";

interface SiteContentResponse {
  title: string;
  content: string;
}

export async function fetchProductTerms(): Promise<string> {
  const { data } = await api.get<SiteContentResponse>("/api/site-content/product-terms");
  return data.content ?? "";
}
