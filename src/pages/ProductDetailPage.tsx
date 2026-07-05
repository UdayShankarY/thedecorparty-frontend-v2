import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function ProductDetailPage() {
  return (
    <Container>
      <Section title="Product details" description="This route is ready for the full product experience.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Product preview shell</H1>
          <P className="mt-3 text-slate-600">The frontend architecture is prepared so product content can be introduced safely without changing the backend contract.</P>
        </div>
      </Section>
    </Container>
  );
}
