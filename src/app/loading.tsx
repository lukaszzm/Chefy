import { LoadingSpinner } from "@/components/new_ui/loading-spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner className="size-6 text-primary" />
    </div>
  );
}
