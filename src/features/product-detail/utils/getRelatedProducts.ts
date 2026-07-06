import type { HomeProduct } from "@/types";

const RELATED_LIMIT = 8;

export function getRelatedProducts(
  product: HomeProduct,
  allProducts: HomeProduct[]
): HomeProduct[] {
  return allProducts
    .filter(
      (p) =>
        p._id !== product._id &&
        p.active &&
        p.categoryId === product.categoryId
    )
    .slice(0, RELATED_LIMIT);
}
