import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { P } from "@/components/ui/typography";

const testimonials = [
  {
    name: "Neha R.",
    role: "Birthday planner",
    quote: "The decor selection felt elevated and effortless. Everything arrived beautifully presented and transformed the whole venue.",
  },
  {
    name: "Arjun S.",
    role: "Wedding host",
    quote: "The team understood our style instantly. The final look felt polished, modern, and completely on brand.",
  },
  {
    name: "Meera P.",
    role: "Corporate events lead",
    quote: "We were able to create a premium experience without the usual stress. The service made a real difference.",
  },
];

export function Testimonials() {
  return (
    <Section title="What clients say" description="Trusted by hosts, planners, and modern event teams who value calm execution and beautiful design.">
      <Container>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-slate-200/70 bg-white/80">
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </CardHeader>
              <CardContent>
                <P className="text-sm leading-7">“{testimonial.quote}”</P>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
