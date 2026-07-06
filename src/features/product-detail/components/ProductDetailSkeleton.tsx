import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <Container>
      <div className="space-y-6 py-4 sm:space-y-8 sm:py-6">
        <Skeleton className="h-4 w-64" />

        <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-8">
          <div className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl lg:aspect-[3/2] lg:max-h-[380px] lg:rounded-3xl" />
            <div className="hidden gap-2 lg:flex">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-16 rounded-xl" />
              ))}
            </div>
          </div>
          <Skeleton className="hidden h-80 rounded-2xl lg:block" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-6 w-40" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-2xl" />
          ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-64 shrink-0 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
