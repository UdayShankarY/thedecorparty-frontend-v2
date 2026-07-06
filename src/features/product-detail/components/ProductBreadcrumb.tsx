import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductDetailContext } from "../hooks/useProductDetailContext";

export function ProductBreadcrumb() {
  const { product } = useProductDetailContext();
  if (!product) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
      <Link to="/" className="inline-flex items-center gap-1 hover:text-violet-600">
        <Home className="h-3.5 w-3.5" />
        Home
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
      <Link to="/products" className="hover:text-violet-600">
        {product.categoryName}
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
      <span className="line-clamp-1 font-medium text-slate-800">{product.name}</span>
    </nav>
  );
}
