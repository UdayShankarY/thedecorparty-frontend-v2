import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { HomeCategory, HomeProduct } from "@/types";

export function useHomeData() {
  const [categories, setCategories] = useState<HomeCategory[]>([]);
  const [products, setProducts] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          api.get<{ categories?: HomeCategory[] }>('/api/categories'),
          api.get<{ products?: HomeProduct[] }>('/api/products'),
        ]);

        if (!isMounted) return;

        const categoriesData = Array.isArray(categoriesResponse.data?.categories)
          ? categoriesResponse.data.categories.filter((category) => category.active)
          : [];
        const productsData = Array.isArray(productsResponse.data?.products)
          ? productsResponse.data.products.filter((product) => product.active)
          : [];

        setCategories(categoriesData);
        setProducts(productsData.slice(0, 6));
      } catch (error) {
        console.error("Failed to load home page data", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, products, loading };
}
