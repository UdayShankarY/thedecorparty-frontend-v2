import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function AdminUsersPage() {
  return (
    <Container>
      <Section title="Admin users" description="The users management shell is now in place.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Users management placeholder</H1>
          <P className="mt-3 text-slate-600">The admin structure is intentionally modular to support future enhancements without backend changes.</P>
        </div>
      </Section>
    </Container>
  );
}
