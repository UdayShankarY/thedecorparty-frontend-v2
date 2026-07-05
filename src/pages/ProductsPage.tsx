import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function ProductsPage() {
  return (
    <Container>
      <Section title="Products" description="A refined catalog experience is now in place for the next phase.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Product listing shell</H1>
          <P className="mt-3 text-slate-600">
            The storefront routing and layout are ready. Product detail pages and catalog data will be added next.
          </P>
        </div>
      </Section>
    </Container>
  );
}
