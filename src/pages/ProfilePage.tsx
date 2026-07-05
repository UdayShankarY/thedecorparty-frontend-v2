import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H1, P } from "@/components/ui/typography";

export default function ProfilePage() {
  return (
    <Container>
      <Section title="Profile" description="A professional account shell is now ready for personalization.">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <H1 className="text-2xl font-semibold">Profile placeholder</H1>
          <P className="mt-3 text-slate-600">Authentication and profile data handling remain untouched while the UI is upgraded.</P>
        </div>
      </Section>
    </Container>
  );
}
