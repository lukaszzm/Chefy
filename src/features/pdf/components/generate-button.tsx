"use client";

import { useState } from "react";

import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PDFDownloadButton } from "@/features/pdf/components/download-button";
import { PDFStatus } from "@/features/pdf/config";
import type { Recipe } from "@/types";

interface PDFGenerateButtonProps extends Recipe {}

export const PDFGenerateButton = (props: PDFGenerateButtonProps) => {
  const [status, setStatus] = useState<PDFStatus>(PDFStatus.Generate);

  if (status === PDFStatus.Download) {
    return <PDFDownloadButton {...props} />;
  }

  return (
    <Button items="start" variant="ghost" onClick={() => setStatus(PDFStatus.Download)}>
      <FileText />
      <span>Generate PDF</span>
    </Button>
  );
};
