import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function OrdersPage() {
  return (
    <Container>
      <Section title="Orders" description="A refined history experience is now scaffolded for future expansion.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Orders placeholder</H1>
          <P className="mt-3 text-slate-600">The routing and layout are in place so order data can be surfaced cleanly later.</P>
        </div>
      </Section>
    </Container>
  );
}
