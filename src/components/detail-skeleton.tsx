import { Skeleton } from "@/components/ui/skeleton"

export function DetailSkeleton() {
  return (
    <div className="relative w-full min-w-0 flex-1 overscroll-contain scroll-smooth bg-background">
      <Skeleton className="h-[45vh] w-full sm:h-[55vh]" />
      <div className="-mt-32 flex flex-col gap-6 px-4 pb-8 sm:px-6 lg:flex-row">
        <div className="flex w-full flex-col gap-6 lg:w-2/3">
          <div className="flex gap-4 sm:gap-6">
            <Skeleton className="h-40 w-28 shrink-0 rounded-xl sm:w-40" />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-16" />
            <div className="flex gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="mt-4 flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
