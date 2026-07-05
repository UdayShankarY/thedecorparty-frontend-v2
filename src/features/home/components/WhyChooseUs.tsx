import { Clock, Palette, ShieldCheck, Truck } from "lucide-react";
import Container from "@/components/ui/container";

const items = [
  { icon: Palette, label: "Design-led curation", sub: "Premium, cohesive styling" },
  { icon: Truck, label: "Same-day setup", sub: "On-time, every time" },
  { icon: ShieldCheck, label: "Secure booking", sub: "100% safe payments" },
  { icon: Clock, label: "Flexible scheduling", sub: "Reschedule up to 48 hrs" },
];

export function WhyChooseUs() {
  return (
    <div className="hidden sm:block">
      <Container>
        <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/80 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {items.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
