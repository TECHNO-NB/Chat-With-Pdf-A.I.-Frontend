"use client"
import React from "react";
import { Button } from "./ui/button";
import { BiCheck } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


interface IPaid {
  paid: boolean;
}

const PricingComp: React.FC<IPaid> = async ({ paid }) => {
 

  const PriceData = {
    header: paid ? "Upgrade now" : null,
    getPdf: paid ? "50 PDFs/mon includes ?" : "3 PDFs/mon includes ?",
    getPagePerPdf: paid ? "14 pages per PDF" : "5 pages per PDF",
    pdfSize: paid ? "14 MB file size limit" : "4 MB file size limit",
    price: paid ? 14 : 0,
  };

  



async function makePayment(data: any): Promise<any> {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISABLE_KEY!);
  axios.defaults.withCredentials = true;
  console.log(process.env.BACKEND_URL);
  const payment = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/sessions`,
    {
      price: data.price,
    }
  );

  const session = payment.data;
console.log("sessions id",session.data.id)
  const result = await stripe?.redirectToCheckout({
    sessionId: session.data.id,
  });
  if (result?.error) {
    console.log(result.error);
  }
}



  return (
    <div className="w-full h-full mt-4 text-center flex justify-center hover:shadow-2xl hover:rounded-lg p-4 sm:p-0">
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
              <BiCheck className="text-2xl text-blue-600"  />
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
        {paid ? (
          <Button onClick={()=>makePayment(PriceData)} className={`bg-blue-700 w-[80%] mt-4 } `}>Buy now</Button>
        ) : (
          <Button
            onClick={() => toast.success("LogIn to get free")}
            className="bg-blue-700 w-[80%] mt-4"
          >
            Free
          </Button>
        )}
      </div>
    </div>
  );
};

export default PricingComp;
