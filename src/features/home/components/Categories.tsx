import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import type { HomeCategory } from "@/types";

interface CategoriesProps {
  categories: HomeCategory[];
  loading: boolean;
}

export function Categories({ categories, loading }: CategoriesProps) {
  return (
    <Section title="Browse by category" description="Discover decor collections tailored to every celebration and style.">
      <Container>
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-40" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div key={category._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ y: -6, scale: 1.01 }}>
                <Link to="/products">
                  <Card className="group overflow-hidden border-slate-200/70 bg-white/80">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 p-6 text-white">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_30%)]" />
                        <div className="relative flex h-full flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]">
                              {category.slug}
                            </span>
                            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold">{category.name}</p>
                            <p className="mt-1 text-sm text-white/80">{category.productCount ?? 0} curated picks</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
