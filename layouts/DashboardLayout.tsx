import { Navbar } from "@/components/Navbar";
import { Container } from "@/ui/Container";
import { NextPage } from "next";

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: NextPage<IDashboardLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className="w-full h-full overflow-auto flex">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};