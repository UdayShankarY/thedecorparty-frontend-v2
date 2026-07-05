import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function AdminOrdersPage() {
  return (
    <Container>
      <Section title="Admin orders" description="Order administration shell is ready for future refinement.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Orders administration placeholder</H1>
          <P className="mt-3 text-slate-600">The foundation remains focused on maintainable structure and presentation.</P>
        </div>
      </Section>
    </Container>
  );
}
