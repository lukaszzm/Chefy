import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col gap-4">
      <Navbar />
      <Hero />
    </div>
  );
}
