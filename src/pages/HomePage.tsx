import { ArrowRight, Headphones, ShieldCheck, Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, H2, P } from "@/components/ui/typography";

const highlights = [
  {
    title: "Premium party styling",
    description: "Elevated decor experiences tailored for every celebration.",
    icon: Sparkles,
  },
  {
    title: "Fast delivery",
    description: "Reliable dispatch and quality checks for every order.",
    icon: ShoppingBag,
  },
  {
    title: "Dedicated support",
    description: "Guidance from planning to setup with a responsive team.",
    icon: Headphones,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 py-8 sm:py-12">
      <Container>
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-violet-200 bg-violet-50 text-violet-700">
                New collection • Celebration essentials
              </Badge>
              <H1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                The modern decor experience for unforgettable parties.
              </H1>
              <P className="max-w-xl text-lg text-slate-600">
                Discover premium rentals, elegant decor pieces, and effortless planning tools in one polished storefront.
              </P>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/products">Explore products</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/assistant">Meet AI assistant</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  Secure checkout
                </div>
                <div className="h-1 w-1 rounded-full bg-slate-300" />
                <div>Flexible bundles</div>
                <div className="h-1 w-1 rounded-full bg-slate-300" />
                <div>Trusted by event planners</div>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 p-6 text-white shadow-xl">
              <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">Curated for</p>
                <H2 className="mt-3 text-2xl font-semibold">Birthdays, weddings, and corporate events</H2>
                <P className="mt-3 text-sm text-white/80">
                  Build a polished atmosphere with statement decor, lighting, and cohesive styling kits.
                </P>
                <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/20 bg-slate-950/20 px-4 py-3">
                  <span className="text-sm">Ready to design your next event?</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <Section title="Why teams love TheDecorParty" description="A polished foundation built for high-converting storefront experiences.">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-slate-200/70 bg-white/80 shadow-sm">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
