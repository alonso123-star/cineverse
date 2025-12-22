import { Skeleton } from "@/components/ui/skeleton";

interface LoadingGridProps {
  count?: number;
}

export const LoadingGrid = ({ count = 12 }: LoadingGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
          <Skeleton className="aspect-[2/3] rounded-xl bg-card" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-3/4 bg-card" />
            <Skeleton className="h-3 w-1/2 bg-card" />
          </div>
        </div>
      ))}
    </div>
  );
};
