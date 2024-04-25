export const PDFStatus = {
  Generate: "generate",
  Download: "download",
} as const satisfies Record<string, string>;

export type PDFStatus = (typeof PDFStatus)[keyof typeof PDFStatus];
