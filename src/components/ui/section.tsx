import type { ReactNode } from "react";
import Container from "@/components/ui/container";

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="space-y-6">
      {(title || description) && (
        <Container>
          <div className="space-y-2">
            {title ? <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2> : null}
            {description ? <p className="max-w-2xl text-sm text-slate-600 sm:text-base">{description}</p> : null}
          </div>
        </Container>
      )}
      {children}
    </section>
  );
}
