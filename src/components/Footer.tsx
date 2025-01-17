import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" relative bottom-0 border-t-4  flex items-center justify-center max-h-fit w-[100vw] mt-10 bg-[#24262b] text-white">
      <MaxWidthWrapper className="w-full">
        <div className="main w-full pb-6 flex justify-around  sm:flex-row flex-wrap gap-4 mt-6 sm:gap-0">
          <div className="flex flex-col">
            <div className="head text-xl font-bold border-b-2 w-10 pb-2 border-red-700">
              Company
            </div>
            <ul className="mt-4 text-[#bbbbbb] text-left flex flex-col gap-2">
              <li>About Us</li>
              <li>Our Services</li>
              <li>Privacy Policy</li>
              <li>Affilicate Program</li>
            </ul>
          </div>

          {/* second */}

          <div className="flex flex-col">
            <div className="head text-xl font-bold text-left w-22 border-b-2 pb-2 border-red-700">
              Get Help
            </div>
            <ul className="mt-4 text-[#bbbbbb] text-left flex flex-col gap-2">
              <li>FAQ</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Order Status</li>
              <li>Paymnet Options</li>
            </ul>
          </div>

          {/* third */}
          <div className="flex flex-col">
            <div className="head text-xl font-bold border-b-2 text-left pb-2 border-red-700">
              Online Shop
            </div>
            <ul className="mt-4 text-[#bbbbbb] text-left flex flex-col gap-2">
              <li>Watch</li>
              <li>Bag</li>
              <li>Shoes</li>
              <li>Dress</li>
            </ul>
          </div>
          {/* fourth */}
          <div>
            <div className="head text-xl font-bold border-b-2 text-left  pb-2 border-red-700">
              Follow Us
            </div>
            <ul className="mt-4 text-[#ffff] text-left flex text-3xl gap-2">
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
