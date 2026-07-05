import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { SectionHeader } from "./SectionHeader";

const reviews = [
  { name: "Neha R.", role: "Birthday party", rating: 5, quote: "Everything arrived beautifully presented and transformed the whole venue. Absolutely loved it!" },
  { name: "Arjun S.", role: "Wedding decor", rating: 5, quote: "The team understood our style instantly. Polished, modern, and completely on brand." },
  { name: "Meera P.", role: "Corporate event", rating: 5, quote: "Premium experience without the usual stress. The service made a real difference." },
  { name: "Priya K.", role: "Anniversary setup", rating: 5, quote: "Stunning setup, delivered on time. Our guests couldn't stop complimenting the decor." },
  { name: "Rahul M.", role: "Proposal decor", rating: 5, quote: "Made the most important moment of my life even more magical. Thank you!" },
];

export function Testimonials() {
  return (
    <section className="space-y-4">
      <SectionHeader title="What our customers say" subtitle="10,000+ happy celebrations and counting" />
      <Container>
        <div className="overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4">
            {reviews.map((r) => (
              <Card key={r.name} className="w-64 shrink-0 border-slate-200/70 bg-white/80 sm:w-72">
                <CardContent className="p-4 space-y-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">"{r.quote}"</p>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
