import { Hero } from "@/components/new-home/hero";
import { Navbar } from "@/components/new-home/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <Navbar />
      <Hero />
    </div>
  );
}
