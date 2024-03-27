import { Navbar } from "@/components/Navbar";
import { Container } from "@/components/OLD_UI/Container";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-full w-full overflow-auto">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};
