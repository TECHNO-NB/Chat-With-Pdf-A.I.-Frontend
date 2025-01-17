import axios from "axios";
import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import nike10kPdfPath from "@/assets/simple.pdf";
import path from "path";
import fs from "fs";

// @ts-ignore
export async function POST(request) {
  try {
    if (request.method === "POST") {
      const { filePath } = request.body;
      // const filePath = path.join(process.cwd(), "public", "naresh.pdf");

      const loader = new PDFLoader(filePath);

      const docs = await loader.load();

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 20,
      });

      // created chunks from pdf
      const splittedDocs = await splitter.splitDocuments(docs);
      console.log("split TEXT", splittedDocs[0]);

      return NextResponse.json({
        message: "PDF processing successful",
      });
    }
  } catch (error: any) {
    console.error("Error processing PDF:", error.message);
    return NextResponse.json({ error: error.message });
  }
}
