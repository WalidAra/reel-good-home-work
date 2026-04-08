import { Skeleton } from "@/components/ui/skeleton"

export function MoviesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-2/3 overflow-hidden rounded-xl bg-[#252525]">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
    </div>
  )
}
