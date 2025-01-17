"use server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const pdfToText = async (filePath: string) => {
  const response = await fetch(filePath);

  const blob = await response.blob();

  const loader = new PDFLoader(blob);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 20,
  });

  const splittedDocs = await splitter.splitDocuments(docs);

  console.log(splittedDocs[0]);

  const text = "hello world";
  // @ts-ignore
  const vector = await embeddings.embedQuery(splittedDocs?.pageContent);

  return splittedDocs[0];
};

export default pdfToText;
