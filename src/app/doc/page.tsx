"use client";
import React, { useEffect, useState } from "react";
import DocDetailComp from "@/components/DocDetailComp";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import fileUrl from "@/assets/A 8081.pdf";
import ChatComp from "@/components/ChatComp";
import { useSelector } from "react-redux";

import pdfToTextUi from "@/utils/PdfToTextUI";

const Page: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState<any>("");
  const data = useSelector((state: any) => state.pdfFile);

  useEffect(() => {
    const changePdfToText = async () => {
      const text = await pdfToTextUi(data.file);
      setPdfText(text);
    };
    changePdfToText();
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const fetchedFile = new File([blob], "A_8081.pdf", { type: blob.type });
        setFile(fetchedFile);
      })

      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  return (
    <MaxWidthWrapper className="mt-2">
      <div className="w-full h-[88vh] sm:h-[90vh]  flex flex-wrap">
        <div className="left w-[100%] flex items-center shadow-1xl justify-center px-4 py-1 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6  overflow-x-hidden overflow-y-auto sm:w-[50%] h-[50%] sm:h-full">
          {file ? (
            <DocDetailComp doc={data.file} size={false} />
          ) : (
            <p>Loading document...</p>
          )}
        </div>
        <div className="right w-[100%] sm:w-[50%] flex items-center justify-center  overflow-hidden  border-black h-[50%] sm:h-[100%] px-4">
          <ChatComp message={pdfText} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
