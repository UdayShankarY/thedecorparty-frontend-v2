import { Link } from "react-router-dom";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "./SectionHeader";
import type { HomeCategory } from "@/types";

interface CategoriesProps {
  categories: HomeCategory[];
  loading: boolean;
}

function OccasionCard({ category }: { category: HomeCategory }) {
  return (
    <Link
      to="/products"
      className="group flex w-28 shrink-0 flex-col items-center gap-1 [scroll-snap-align:start] sm:w-36 sm:gap-2"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-slate-200 bg-gradient-to-br from-violet-500 via-fuchsia-400 to-amber-300 shadow-sm transition group-hover:border-violet-400 group-hover:shadow-md group-active:scale-95 sm:h-32 sm:w-32">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            🎉
          </div>
        )}
      </div>
      <span className="text-center text-xs font-semibold leading-tight text-slate-800 group-hover:text-violet-600 sm:text-sm">
        {category.name}
      </span>
      {category.productCount != null && (
        <span className="text-[10px] text-slate-400">{category.productCount} items</span>
      )}
    </Link>
  );
}

export function Categories({ categories, loading }: CategoriesProps) {
  return (
    <section className="space-y-4">
      <SectionHeader title="Shop by Occasion" viewAllHref="/products" viewAllLabel="See All" />
      <Container>
        <div className="overflow-x-auto pb-1 sm:pb-2 [-ms-overflow-style:none] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 sm:gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex w-28 shrink-0 flex-col items-center gap-1 [scroll-snap-align:start] sm:w-36 sm:gap-2">
                    <Skeleton className="h-24 w-24 rounded-full sm:h-32 sm:w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))
              : categories.map((cat) => <OccasionCard key={cat._id} category={cat} />)}
          </div>
        </div>
      </Container>
    </section>
  );
}
