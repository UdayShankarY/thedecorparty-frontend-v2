import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function CartPage() {
  return (
    <Container>
      <Section title="Cart" description="Your cart shell is now in place and ready for the next UI layer.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Cart experience placeholder</H1>
          <P className="mt-3 text-slate-600">Cart behavior remains intentionally isolated from backend and API payloads.</P>
        </div>
      </Section>
    </Container>
  );
}
