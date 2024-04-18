"use client";

import { useState } from "react";

import { FileText } from "lucide-react";

import { PDFDownloadButton } from "@/components/pdf/pdf-download-button";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/types";

interface PDFGenerateButtonProps extends Recipe {}

export const PDFGenerateButton = (props: PDFGenerateButtonProps) => {
  const [idle, setIdle] = useState(true);

  if (!idle) {
    return <PDFDownloadButton {...props} />;
  }

  return (
    <Button items="start" variant="ghost" onClick={() => setIdle(false)}>
      <FileText />
      <span>Generate PDF</span>
    </Button>
  );
};
