import { Navbar } from "@/components/Navbar";
import { Container } from "@/components/UI/Container";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="w-full h-full overflow-auto flex">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};
