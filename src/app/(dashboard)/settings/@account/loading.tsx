import { Skeleton } from "@/components/new_ui/skeleton";

export default function AccountLoading() {
  return (
    <>
      <Skeleton className="h-44" />
      <Skeleton className="h-80" />
    </>
  );
}
