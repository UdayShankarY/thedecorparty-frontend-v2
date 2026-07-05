import { Compass, Palette, Sparkles, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const features = [
  {
    title: "Design-led curation",
    description: "Every collection is styled to feel premium, cohesive, and event-ready.",
    icon: Palette,
  },
  {
    title: "Fast and reliable delivery",
    description: "Flexible dispatch windows and dependable setups for busy planners.",
    icon: Truck,
  },
  {
    title: "Expert planning support",
    description: "Guidance from the first idea through the final installation detail.",
    icon: Compass,
  },
  {
    title: "Elevated quality standards",
    description: "Clean finishes, premium materials, and a polished presentation at every touchpoint.",
    icon: Sparkles,
  },
];

export function WhyChooseUs() {
  return (
    <Section title="Why choose us" description="A premium experience for hosts, planners, and modern event teams.">
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-slate-200/70 bg-white/80">
                <CardHeader>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
