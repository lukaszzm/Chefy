import { Image as PDFImage, Document, Page, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 17,
    marginHorizontal: 20,
    marginVertical: 5,
    color: "#00b865",
  },
  item: {
    marginHorizontal: 30,
    marginVertical: 5,
    fontSize: 14,
    lineHeight: 1,
    textAlign: "justify",
  },
  text: {
    marginHorizontal: 30,
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 1.4,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    borderRadius: 20,
  },
  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 45,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

interface PDFTemplateProps {
  title: string;
  imageSrc: string;
  ingredients: string[];
  instructions: string;
}

export const PDFTemplate = ({ title, imageSrc, ingredients, instructions }: PDFTemplateProps) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      <PDFImage src={imageSrc} style={styles.image} />

      <Text style={styles.subtitle}>Ingredients</Text>
      {ingredients.map((el, index) => (
        <Text key={index} style={styles.item}>
          - {el}
        </Text>
      ))}

      <Text style={styles.subtitle}>Instructions</Text>
      <Text style={styles.text}>{instructions}</Text>

      <Text style={styles.footer} fixed>
        Recipe from Chefy
      </Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} style={styles.pageNumber} fixed />
    </Page>
  </Document>
);
