import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { HomeProduct } from "@/types";

const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function calcDiscount(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

interface ProductCardProps {
  product: HomeProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = calcDiscount(product.price, product.originalPrice);

  return (
    <div className="group relative w-[72vw] shrink-0 sm:w-64">
      {/* Wishlist — icon button, top-right overlay */}
      <Button
        variant="icon"
        aria-label="Add to wishlist"
        onClick={(e) => e.preventDefault()}
        className="absolute right-2 top-2 z-10 h-8 w-8 bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white hover:text-rose-500"
      >
        <Heart className="h-4 w-4" />
      </Button>

      <Link to={`/product/${product._id}`} className="block">
        <Card className="overflow-hidden border-slate-200/70 bg-white transition-transform duration-200 active:scale-[0.97] sm:hover:scale-[1.02] sm:hover:shadow-lg">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 sm:group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 text-xs font-medium text-slate-400">
                {product.categoryName}
              </div>
            )}

            {/* Badge — top-left */}
            {product.badge && (
              <span className="absolute left-2 top-2">
                <Badge className="bg-violet-600 text-white">{product.badge}</Badge>
              </span>
            )}

            {/* Discount pill — bottom-left */}
            {discount !== null && (
              <span className="absolute bottom-2 left-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                {discount}% OFF
              </span>
            )}
          </div>

          <CardContent className="p-3">
            {/* Rating */}
            {(product.rating ?? 0) > 0 && (
              <div className="mb-1.5 flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-slate-700">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewCount ?? 0})</span>
              </div>
            )}

            {/* Title */}
            <p className="line-clamp-2 text-sm font-medium leading-snug text-slate-900">
              {product.name}
            </p>

            {/* Prices */}
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-sm font-bold text-slate-900">{fmt.format(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {fmt.format(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Book Now — primary button */}
            <Button
              variant="primary"
              className="mt-2.5 h-9 w-full gap-1.5 rounded-xl text-xs"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Book Now
            </Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
