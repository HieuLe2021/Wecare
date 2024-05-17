import { cn } from "@utils";

const skeleton = "mb-5 h-5 w-full animate-pulse rounded";
const items = "bg-neutral-400 dark:bg-neutral-700";
export const CollectionsSkeleton = () => {
  return (
    <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
      <div className={cn(skeleton, items)} />
      <div className={cn(skeleton, items)} />
      <div className={cn(skeleton, items)} />
      <div className={cn(skeleton, items)} />
      <div className={cn(skeleton, items)} />
      <div className={cn(skeleton, items)} />
      <div className={cn(skeleton, items)} />
      <div className={cn(skeleton, items)} />
    </div>
  );
};
