import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { HomeCategory, HomeProduct, Slider } from "@/types";

export function useHomeData() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [categories, setCategories] = useState<HomeCategory[]>([]);
  const [products, setProducts] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [slidersRes, categoriesRes, productsRes] = await Promise.all([
          api.get<Slider[]>("/api/sliders"),
          api.get<HomeCategory[]>("/api/categories"),
          api.get<HomeProduct[]>("/api/products"),
        ]);

        if (!isMounted) return;

        setSliders(
          Array.isArray(slidersRes.data)
            ? slidersRes.data.filter((s) => s.active)
            : []
        );
        setCategories(
          Array.isArray(categoriesRes.data)
            ? categoriesRes.data.filter((c) => c.active)
            : []
        );
        setProducts(
          Array.isArray(productsRes.data)
            ? productsRes.data.filter((p) => p.active)
            : []
        );
      } catch (error) {
        console.error("Failed to load home page data", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  return { sliders, categories, products, loading };
}
