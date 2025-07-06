"use server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const pdfToTextUi = async (filePath: string) => {
  const response = await fetch(filePath);

  const blob = await response.blob();

  const loader = new PDFLoader(blob);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 20,
  });

  const splittedDocs = await splitter.splitDocuments(docs);

  const simplifiedDocs = splittedDocs.map((doc) => ({
    pageContent: doc.pageContent,
    metadata: doc.metadata,
  }));

  return simplifiedDocs;
};

export default pdfToTextUi;
