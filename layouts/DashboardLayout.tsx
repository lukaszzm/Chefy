import { Navbar } from "@/components/Navbar";
import { Container } from "@/components/ui/Container";
import { NextPage } from "next";

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: NextPage<IDashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="w-full h-full overflow-auto flex">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};
