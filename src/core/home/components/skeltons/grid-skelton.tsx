import { Skeleton } from "@/components/ui/skeleton"

export function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 md:p-6 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-2/3 overflow-hidden rounded-xl bg-[#252525]" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
