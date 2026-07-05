import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { HomeCategory } from "@/types";

interface CategoryCardProps {
  category: HomeCategory;
  isSelected: boolean;
  onSelect: (categoryId: string) => void;
}

export const CategoryCard = memo(function CategoryCard({ category, isSelected, onSelect }: CategoryCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(category._id)}
      aria-pressed={isSelected}
      aria-label={`Filter products by ${category.name}`}
      className={`w-full overflow-hidden rounded-[1.5rem] border text-left transition ${isSelected ? "border-violet-400 shadow-lg" : "border-slate-200/70 bg-white/80 shadow-sm"}`}
    >
      <Card className="h-full border-0 bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_30%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em]">
                  {category.slug}
                </span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
              <div>
                {category.image ? (
                  <img src={category.image} alt={category.name} loading="lazy" className="mb-3 h-14 w-14 rounded-2xl object-cover" />
                ) : null}
                <p className="text-xl font-semibold">{category.name}</p>
                <p className="mt-1 text-sm text-white/80">{category.productCount ?? 0} curated picks</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
});
