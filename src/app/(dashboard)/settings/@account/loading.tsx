import { Skeleton } from "@/components/ui/skeleton";

export default function AccountLoading() {
  return (
    <>
      <Skeleton className="h-44" />
      <Skeleton className="h-80" />
    </>
  );
}
