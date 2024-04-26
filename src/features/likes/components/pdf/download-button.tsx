import { usePDF } from "@react-pdf/renderer";
import { FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PDFTemplate } from "@/features/likes/components/pdf/template";
import { useMenu } from "@/features/likes/hooks/use-menu";

export const PDFDownloadButton = () => {
  const { recipe } = useMenu();

  const [instance] = usePDF({
    document: <PDFTemplate {...recipe} />,
  });

  if (instance.loading) {
    return (
      <Button items="start" variant="ghost" disabled>
        <FileText />
        <span>Generating...</span>
      </Button>
    );
  }

  if (instance.error || !instance.url) {
    return (
      <Button items="start" variant="ghost" disabled>
        <span>Could not generate PDF</span>
      </Button>
    );
  }

  return (
    <Button items="start" variant="ghost" asChild>
      <Link download={`${recipe.title}_chefy.pdf`} href={instance.url} target="_blank">
        <FileText />
        <span>Download PDF</span>
      </Link>
    </Button>
  );
};
