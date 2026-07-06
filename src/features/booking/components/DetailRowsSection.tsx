interface DetailRow {
  label: string;
  value: string;
}

interface DetailRowsSectionProps {
  title: string;
  rows: DetailRow[];
}

export function DetailRowsSection({ title, rows }: DetailRowsSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <dl className="mt-4 space-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <dt className="shrink-0 text-slate-500">{row.label}</dt>
            <dd className="text-right font-medium text-slate-800">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
