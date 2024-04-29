import { Skeleton } from "@/components/ui/skeleton";

export default function PreferencesLoading() {
  return (
    <>
      <Skeleton className="h-52" />
      <Skeleton className="h-72" />
    </>
  );
}
