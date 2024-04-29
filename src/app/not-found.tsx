import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-sm flex-col gap-4 p-4 sm:flex-row">
        <Logo />
        <div>
          <h1 className="text-xl font-bold">Page not found</h1>
          <p className="text-muted-foreground">Sorry, we couldn&apos;t find the page you were looking for.</p>
        </div>
      </div>
    </main>
  );
}
