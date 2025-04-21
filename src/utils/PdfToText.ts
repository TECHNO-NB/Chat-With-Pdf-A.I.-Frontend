"use server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

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

  const embeddings = new GoogleGenerativeAIEmbeddings({
    modelName: "models/embedding-001",
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.NEXT_PUBLIC_QRANT_URL!,
      apiKey: process.env.NEXT_PUBLIC_QDRANT_API_KEY!,
      collectionName: "chatai-vector",
    }
  );

  await vectorStore.addDocuments(splittedDocs);

  const simplifiedDocs = splittedDocs.map((doc) => ({
    pageContent: doc.pageContent,
    metadata: doc.metadata,
  }));

  return simplifiedDocs;
};

export default pdfToText;
