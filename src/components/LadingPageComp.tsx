import React from "react";
import Image from "next/image";
import pdfImg from "@/assets/dashboard-preview.jpg";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import Guide from "./Guide";
import { motion, Variants } from "framer-motion";
import Footer from "./Footer";
const LadingPageComp: React.FC = () => {
  const fadeInAnimation: Variants = {
    hidden: { opacity: 0, y: -20},
    show: {
      opacity: 1,
      y: 0,
      x:0,
      transition: {
        staggerChildren: 0.2,
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeInAnimation}
      className="pt-6"
    >
      <motion.h1
       
        className="text-3xl  font-bold text-black md:text-4xl"
      >
        NBPG AI.
      </motion.h1>

      <div className="max-w-full mt-0">
        <motion.h1  className="text-4xl font-bold ">
          Chat with your
        </motion.h1>
        <motion.h1  className="text-4xl font-bold">
          <span className="text-blue-500">documents</span> in seconds
        </motion.h1>
        <motion.p
        
          className="text-sm"
        >
          Nbpg allows you to have conversations with any PDF documents, Simply
          upload your
        </motion.p>
        <motion.p    className="text-sm">file and start asking questions right away.</motion.p>
      </div>
      <Link href="/auth">
        <Button className="mt-2 w-[50%] md:max-w-sm md:mt-4 md:h-10 gap-2 bg-blue-700">
          Get Started <FaArrowRight className="font-thin" />
        </Button>
      </Link>

      {/* <div className="mt-4 md:max-w-screen-md md:mt-8 md:border-8 border-y-gray-400">
        <Image src={pdfImg} alt="pdf image" />
      </div> */}

      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src={pdfImg}
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        <div className="mt-10">
          <Guide />
        </div>
      </div>
      <Footer/>
    </motion.div>
  );
};

export default LadingPageComp;
