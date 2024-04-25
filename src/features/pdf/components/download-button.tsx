import { usePDF } from "@react-pdf/renderer";
import { FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PDFTemplate } from "@/features/pdf/components/template";
import type { Recipe } from "@/types";

interface PDFDownloadButtonProps extends Recipe {}

export const PDFDownloadButton = (props: PDFDownloadButtonProps) => {
  const [instance] = usePDF({
    document: <PDFTemplate {...props} />,
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
      <Link download={`${props.title}_chefy.pdf`} href={instance.url} target="_blank">
        <FileText />
        <span>Download PDF</span>
      </Link>
    </Button>
  );
};
