import { Skeleton } from "@/components/ui/skeleton"

const DetailSkelton = () => {
  return function DetailSkeleton() {
    return (
      <div className="animate-pulse">
        <Skeleton className="h-[50vh] w-full" />
        <div className="flex gap-6 p-6">
          <Skeleton className="aspect-2/3 w-48 shrink-0 rounded-xl" />
          <div className="flex w-full flex-col gap-3">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailSkelton
