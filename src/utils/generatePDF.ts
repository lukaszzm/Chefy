import { jsPDF } from "jspdf";

export const generatePDF = ({
  title,
  ingredients,
  instructions,
}: {
  title: string;
  ingredients: string[];
  instructions: string;
}) => {
  const doc = new jsPDF();
  let i = 25;

  // TITLE
  doc.setFontSize(32);
  doc.text(title, 20, i);
  i += 14;

  // FIRST SUBTITLE
  doc.setFontSize(18);
  doc.text(`Ingredients:`, 20, i);
  i += 8;

  doc.setFontSize(12);
  for (let ingredient of ingredients) {
    doc.text(`- ${ingredient}`, 25, i);
    i += 5;
  }
  i += 10;

  // SECOND SUBTITLE
  doc.setFontSize(18);
  doc.text(`Instructions:`, 20, i);
  i += 8;

  doc.setFontSize(12);
  doc.text(instructions, 25, i, {
    maxWidth: 160,
  });

  // FOOTER
  doc.setTextColor(150);
  doc.setFontSize(10);
  doc.text("Recipe from Chefy", 90, 290);

  doc.save(`${title} CHEFY.pdf`);
};
