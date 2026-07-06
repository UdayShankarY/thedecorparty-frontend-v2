import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts } from "@/features/products/services/productsService";
import { fetchProductTerms } from "../services/productDetailService";
import { WISHLIST_KEY, type BookingDraft } from "../types";
import { saveBookingDraft } from "@/features/booking/utils/bookingStorage";
import { calcDiscountPercent } from "../utils/calcDiscount";
import { getProductImages } from "../utils/getProductImages";
import { getRelatedProducts } from "../utils/getRelatedProducts";
import type { HomeProduct } from "@/types";

interface ProductDetailContextValue {
  product: HomeProduct | null;
  loading: boolean;
  notFound: boolean;
  images: string[];
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  isWishlisted: boolean;
  toggleWishlist: () => void;
  relatedProducts: HomeProduct[];
  discountPercent: number | null;
  termsHtml: string;
  termsLoading: boolean;
  bookNow: () => void;
}

const ProductDetailContext = createContext<ProductDetailContextValue | null>(null);

function readWishlist(): string[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function ProductDetailProvider({ children }: { children: ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<HomeProduct | null>(null);
  const [allProducts, setAllProducts] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [termsHtml, setTermsHtml] = useState("");
  const [termsLoading, setTermsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);
    setNotFound(false);
    setSelectedImageIndex(0);

    fetchProducts()
      .then((products) => {
        if (!mounted) return;
        setAllProducts(products);
        const found = products.find((p) => p._id === id) ?? null;
        if (!found) {
          setNotFound(true);
          setProduct(null);
        } else {
          setProduct(found);
          setIsWishlisted(readWishlist().includes(found._id));
        }
      })
      .catch((err) => {
        console.error("Failed to load product", err);
        if (mounted) setNotFound(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    fetchProductTerms()
      .then((html) => {
        if (mounted) setTermsHtml(html);
      })
      .catch((err) => console.error("Failed to load terms", err))
      .finally(() => {
        if (mounted) setTermsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const images = useMemo(
    () => (product ? getProductImages(product) : []),
    [product]
  );

  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(product, allProducts) : []),
    [product, allProducts]
  );

  const discountPercent = useMemo(
    () => (product ? calcDiscountPercent(product.price, product.originalPrice) : null),
    [product]
  );

  const toggleWishlist = useCallback(() => {
    if (!product) return;
    const current = readWishlist();
    const next = current.includes(product._id)
      ? current.filter((pid) => pid !== product._id)
      : [...current, product._id];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setIsWishlisted(next.includes(product._id));
  }, [product]);

  const bookNow = useCallback(() => {
    if (!product) return;

    const draft: BookingDraft = {
      productId: product._id,
      productName: product.name,
      categoryName: product.categoryName,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image,
      eventDate: "",
      eventTime: "",
    };

    saveBookingDraft(draft);
    navigate(`/product/${product._id}/booking`);
  }, [product, navigate]);

  const value = useMemo<ProductDetailContextValue>(
    () => ({
      product,
      loading,
      notFound,
      images,
      selectedImageIndex,
      setSelectedImageIndex,
      isWishlisted,
      toggleWishlist,
      relatedProducts,
      discountPercent,
      termsHtml,
      termsLoading,
      bookNow,
    }),
    [
      product,
      loading,
      notFound,
      images,
      selectedImageIndex,
      isWishlisted,
      toggleWishlist,
      relatedProducts,
      discountPercent,
      termsHtml,
      termsLoading,
      bookNow,
    ]
  );

  return (
    <ProductDetailContext.Provider value={value}>{children}</ProductDetailContext.Provider>
  );
}

export function useProductDetailContext() {
  const ctx = useContext(ProductDetailContext);
  if (!ctx) throw new Error("useProductDetailContext must be used within ProductDetailProvider");
  return ctx;
}
