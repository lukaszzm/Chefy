import type { ReactElement } from "react";

import type { DocumentProps } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

export async function generatePdf(doc: ReactElement<DocumentProps>, title: string) {
  const blob = await pdf(doc).toBlob();
  saveAs(blob, title);
}
