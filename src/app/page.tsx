"use client";

import LadingPageComp from "@/components/LadingPageComp";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <div className="bg-[#F7F7F7] ">
      <MaxWidthWrapper className=" text-black h-full  flex items-center text-center justify-center gap-2">
        <LadingPageComp />
      </MaxWidthWrapper>
    </div>
  );
}
