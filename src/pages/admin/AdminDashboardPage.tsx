import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function AdminDashboardPage() {
  return (
    <Container>
      <Section title="Admin dashboard" description="The admin shell is ready for management experiences.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Admin overview placeholder</H1>
          <P className="mt-3 text-slate-600">This phase focuses on the polished infrastructure rather than the business workflows.</P>
        </div>
      </Section>
    </Container>
  );
}
