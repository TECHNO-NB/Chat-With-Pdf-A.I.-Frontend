import React from "react";
import Steps from "./Steps";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import docaddImage from "@/assets/doc create t.jpg";
import { IStepsData } from "@/types/types";

const Guide = () => {
  const stepData: IStepsData[] = [
    {
      title: "Step 1",
      content: "Sign up for an account",
      descriptions: "Either start with the free plan or choose a pro plan.",
    },
    {
      title: "Step 2",
      content: "Upload your PDF file",
      descriptions:
        "We'll process your file and make it ready for you to chat with.",
    },
    {
      title: "Step 3",
      content: "Start asking questions",
      descriptions: "It's that simple. Try out nbpgai today.",
    },
  ];

  return (
    <MaxWidthWrapper className="md:mt-28">
      <h1 className="font-bold md:mt-30 text-[1.2em] sm:text-[1.5em]">
        Start chatting in minutes
      </h1>
      <p>Chatting to your PDF files has never been easier than with nbpgai.</p>

      <div className="mt-10 flex flex-wrap gap-10 items-center justify-between">
        {stepData.map((step, index) => (
          <Steps key={index} stepsContent={step} />
        ))}
      </div>

      <div className="relative mt-12 sm:mt-20">
        <div
          className="absolute inset-0 left-10 z-0 blur-2xl opacity-30"
          style={{
            background: "radial-gradient(circle at center, #ff80b5,#9089fc)",
          }}
        ></div>

        <div className="relative z-10 rounded-lg bg-gray-900/5 p-0 ring-1 ring-inset ring-gray-900/10 shadow-2xl">
          <Image
            src={docaddImage}
            alt="add doc preview image"
            width={1364}
            height={866}
            quality={100}
            className="rounded-md p-2 sm:p-8 md:p-4"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Guide;
