import React from "react";
import { Button } from "./ui/button";
import { BiCheck } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";

interface IPaid {
  paid: boolean;
}

const PricingComp: React.FC<IPaid> = ({ paid }) => {
  const PriceData = {
    header: paid ? "Upgrade now" : null,
    getPdf: paid ? "50 PDFs/mon includes ?" : "5 PDFs/mon includes ?",
    getPagePerPdf: paid ? "14 pages per PDF" : "5 pages per PDF",
    pdfSize:paid ? "14 MB file size limit" : "4 MB file size limit",
  };

  return (
    <div className="w-full h-full mt-4 text-center flex justify-center hover:shadow-2xl hover:rounded-lg">
      <div
        className={`div h-[30em] w-[20em] text-center ${
          paid ? "border-blue-700" : "border-2"
        }  border-2 rounded-2xl`}
      >
        {paid ? (
          <div className="bg-blue-600 rounded-2xl mx-auto w-[50%] h-[7%] text-white  text-center flex items-center justify-center relative bottom-4">
            <h1>{PriceData.header}</h1>
          </div>
        ) : null}
        <h1 className="text-center ">{paid ? "Paid" : "Free"}</h1>
        <p className="text-gray-400 text-sm">
          {paid
            ? "For largers projects with higher needs"
            : "For small size projects"}
        </p>
        <h1 className=" mt-2 text-6xl">{paid ? "$14" : "$0"}</h1>
        <p className="text-gray-400 text-sm mt-2">per month</p>
        <div className="mt-4 bg-[#F9FBFC] border-2 w-full h-[5em] flex items-center justify-center">
          <h1>{PriceData.getPdf}</h1>
        </div>
        <div className="flex flex-col text-gray-900  ml-6 mt-4">
          <div className="flex gap-1 items-center">
            <BiCheck className="text-2xl text-blue-600" />
            <p>{PriceData.getPagePerPdf}</p>
          </div>

          <div className="flex gap-1 items-center">
            <BiCheck className="text-2xl text-blue-600" />
            <p>{PriceData.pdfSize}</p>
          </div>

          <div className="flex gap-1 items-center">
            <BiCheck className="text-2xl text-blue-600" />
            <p>Mobile-friendly interface</p>
          </div>

          <div className="flex gap-1 items-center">
            {paid ? (
              <BiCheck className="text-2xl text-blue-600" />
            ) : (
              <FiMinus className="text-2xl text-gray-400" />
            )}
            <p className={`${paid ? "text-black" : "text-gray-400"}`}>
              Higher-quality responses
            </p>
          </div>

          <div className="flex gap-1 items-center">
            {paid ? (
              <BiCheck className="text-2xl text-blue-600" />
            ) : (
              <FiMinus className="text-2xl text-gray-400" />
            )}
            <p className={`${paid ? "text-black" : "text-gray-400"}`}>
              Priority support
            </p>
          </div>
        </div>
        <Button className="w-[80%] mt-4 bg-blue-700">Buy now</Button>
      </div>
    </div>
  );
};

export default PricingComp;
