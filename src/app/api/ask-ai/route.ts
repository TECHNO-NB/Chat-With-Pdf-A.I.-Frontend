import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { chatMessages, pdfText } = await request.json();

     const embeddings = new GoogleGenerativeAIEmbeddings({
        modelName: "models/embedding-001",
        apiKey: process.env.GEMINI_API_KEY!,
      });
    
      console.log(process.env.QRANT_URL!,process.env.QRANT_API_KEY!);

      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          url: process.env.QRANT_URL!,
          apiKey: process.env.QRANT_API_KEY!,
          collectionName: "chatai-vector",
        }
      );
    
      const retriever = vectorStore.asRetriever({
        k: 2,
      });
      const data=await retriever.invoke(chatMessages);


    const prompt = `
    You are a helpful AI assistant. Only answer based on the context below.
    Do not answer unrelated questions. Keep answers short and simple (30 words max).
   
    Context:
    ${data[0].pageContent}
    
    Question:
    ${chatMessages}
    `;
    

    if (chatMessages && pdfText) {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
    

      return NextResponse.json({ message: response.text});
    }
  } catch (error) {
    console.log(error);
  }
}
