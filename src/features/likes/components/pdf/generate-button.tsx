"use client";

import { useState } from "react";

import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PDFDownloadButton } from "@/features/likes/components/pdf/download-button";
import { PDFStatus } from "@/features/likes/config/pdf-status";

export const PDFGenerateButton = () => {
  const [status, setStatus] = useState<PDFStatus>(PDFStatus.Generate);

  if (status === PDFStatus.Download) {
    return <PDFDownloadButton />;
  }

  return (
    <Button items="start" variant="ghost" onClick={() => setStatus(PDFStatus.Download)}>
      <FileText />
      <span>Generate PDF</span>
    </Button>
  );
};
