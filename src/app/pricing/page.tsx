import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PricingComp from "@/components/PricingComp";

const page: React.FC = () => {
  return (
    <MaxWidthWrapper className="mt-6 w-full  ">
      <div className="text-center">
        <h1 className="text-2xl  font-bold">Pricing</h1>
        <p className="text-sm text-gray-400">
          Whether you're just trying out our service or need more,
        </p>
        <p className="text-sm text-gray-400">we've got you covered</p>
        <div className="flex flex-col items-center justify-center w-full gap-4 md:flex-row">
          <div>
            <PricingComp paid={false} />
          </div>
          <div>
            <PricingComp paid={true} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
