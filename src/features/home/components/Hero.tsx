import { motion } from "framer-motion";
import { ArrowRight, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { H1, P } from "@/components/ui/typography";

export function Hero() {
  return (
    <Container>
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur sm:p-10 lg:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.16),_transparent_30%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="space-y-6">
            <Badge variant="outline" className="border-violet-200 bg-violet-50 text-violet-700">
              Premium event decor • Crafted for modern celebrations
            </Badge>
            <H1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Design unforgettable moments with elegant decor that feels effortless.
            </H1>
            <P className="max-w-xl text-lg text-slate-600">
              Explore premium rentals, statement styling, and curated collections that transform birthdays, weddings, and corporate celebrations into polished experiences.
            </P>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/products">Shop collections</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/assistant">Meet AI assistant</Link>
              </Button>
            </div>
            <div className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Secure booking
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-500" />
                Curated styling
              </div>
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-amber-500" />
                Flexible bundles
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative">
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 p-6 text-white shadow-xl">
              <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">Featured styling</p>
                <h2 className="mt-3 text-2xl font-semibold">Birthdays, weddings, and elegant soirées</h2>
                <P className="mt-3 text-sm text-white/80">
                  Build a cohesive look with premium decor, fine lighting, and custom arrangements for every guest experience.
                </P>
                <div className="mt-8 grid gap-3">
                  <div className="rounded-2xl border border-white/20 bg-slate-950/20 px-4 py-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Signature decor kits</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-slate-950/20 px-4 py-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>On-demand setup support</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-4 -left-4 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-lg">
              <p className="text-sm font-semibold text-slate-900">42+ curated bundles</p>
              <p className="text-xs text-slate-500">Ready for next-day delivery</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
}
