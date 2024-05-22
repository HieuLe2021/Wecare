import { Skeleton } from "~/components/ui/skeleton";
import { PriceTable } from "./_components/content/PriceTable";

export default function Loading() {
  return (
    <div className="flex w-full flex-col">
      {Array(3)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="mb-4 rounded-lg bg-white p-4">
              <div className="flex gap-4 pb-4 text-xs leading-4 text-gray-800 bg-blend-normal max-md:flex-wrap">
                <Skeleton className="h-[120px] w-[120px] shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-6 w-[150px]" />
                </div>
              </div>
              <div className="mb-4 h-[1px] w-full border border-b border-dashed"></div>
              <Skeleton className="ml-2 h-6 w-[150px]" />
              <PriceTable skeleton material={""} data={[]} />
            </div>
          );
        })}
    </div>
  );
}
