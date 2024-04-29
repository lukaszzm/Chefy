import { Skeleton } from "@/components/new_ui/skeleton";

export default function PreferencesLoading() {
  return (
    <>
      <Skeleton className="h-52" />
      <Skeleton className="h-72" />
    </>
  );
}
