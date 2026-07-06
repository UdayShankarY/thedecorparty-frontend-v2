import type { HomeProduct } from "@/types";

export function getProductImages(product: HomeProduct): string[] {
  const images = [product.image, ...(product.moreImages ?? [])].filter(
    (img): img is string => Boolean(img)
  );
  return images;
}
