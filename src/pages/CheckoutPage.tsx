import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function CheckoutPage() {
  return (
    <Container>
      <Section title="Checkout" description="The checkout experience is scaffolded with a polished shell.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Checkout placeholder</H1>
          <P className="mt-3 text-slate-600">This route is isolated to UI structure and remains compatible with the current backend flow.</P>
        </div>
      </Section>
    </Container>
  );
}
