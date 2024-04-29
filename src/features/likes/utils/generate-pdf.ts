import type { ReactElement } from "react";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

export const generatePdf = async (doc: ReactElement, title: string) => {
  const blob = await pdf(doc).toBlob();
  saveAs(blob, title);
};
