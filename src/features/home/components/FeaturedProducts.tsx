import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import type { HomeProduct } from "@/types";

interface FeaturedProductsProps {
  products: HomeProduct[];
  loading: boolean;
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function ProductCard({ product }: { product: HomeProduct }) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }}>
      <Card className="overflow-hidden border-slate-200/70 bg-white/80">
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 text-sm font-semibold text-slate-500">
              {product.categoryName}
            </div>
          )}
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            {product.badge ? <Badge variant="secondary">{product.badge}</Badge> : null}
          </div>
          <CardDescription className="line-clamp-2">{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium text-slate-700">{product.rating ?? 4.8}</span>
              <span>({product.reviewCount ?? 24})</span>
            </div>
            <span className="font-semibold text-slate-900">{currencyFormatter.format(product.price)}</span>
          </div>
          <Button variant="outline" className="w-full justify-between rounded-2xl" asChild>
            <Link to="/products">
              View details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  return (
    <Section title="Featured products" description="A curated selection of best-selling decor pieces and styling essentials.">
      <Container>
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
