import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { H2, P } from "@/components/ui/typography";

export function CTA() {
  return (
    <Container>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-700 p-8 text-white shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] sm:p-10 lg:p-14"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-300" />
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">Ready to plan your next celebration?</p>
            </div>
            <H2 className="text-3xl font-semibold text-white sm:text-4xl">
              Bring your vision to life with a premium decor experience.
            </H2>
            <P className="text-base text-white/80">
              Browse thoughtfully curated collections, get expert support, and create an atmosphere that feels as memorable as the event itself.
            </P>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="border-white/30 bg-white text-slate-900 hover:bg-white/90" asChild>
              <Link to="/products">
                Shop now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
              <Link to="/products">Browse collections</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </Container>
  );
}
