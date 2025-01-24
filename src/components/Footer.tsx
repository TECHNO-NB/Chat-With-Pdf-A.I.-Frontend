import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" relative bottom-0 border-t-4  flex items-center justify-center max-h-fit w-[100vw] mt-10 bg-white text-black">
      <MaxWidthWrapper className="w-full">
        <div className="main w-full pb-6 flex justify-around   sm:flex-row flex-wrap gap-4 mt-6 sm:gap-0">
          <div className="flex flex-col">
            <h1 className=" text-1xl sm:text-3xl font-extrabold"><span className="text-3xl mt-4 text-blue-600">&copy;</span> Copyright By ChatA.I</h1>
            <div className="head text-xl font-extrabold border-b-2 mt-4 text-center">
              Follow Us
            </div>
            <ul className="mt-2 text-[#000] text-center flex items-center justify-center text-3xl gap-2">
              <li>
                <RiFacebookCircleFill />
              </li>
              <li>
                <FaSquareInstagram />
              </li>
              <li>
                <FaLinkedin />
              </li>
              <li>
                <FaYoutube />
              </li>
            </ul>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
