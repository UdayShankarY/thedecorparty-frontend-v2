import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function AdminProductsPage() {
  return (
    <Container>
      <Section title="Admin products" description="Product management shell is prepared for the next UI stage.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Product management placeholder</H1>
          <P className="mt-3 text-slate-600">Admin screens are now routed in a scalable structure without touching the existing backend logic.</P>
        </div>
      </Section>
    </Container>
  );
}
