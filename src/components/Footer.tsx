import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaLinkedin, FaSquareInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t-4 mt-12 sm:mt-20 w-[100vw] ">
      <MaxWidthWrapper className="px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-blue-600">&copy; ChatA.I</h1>
            <p className="text-sm text-gray-600">
              Revolutionizing conversations with intelligent AI.
            </p>
            <div className="flex justify-center text-center gap-4 text-2xl mt-2">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition">
                <RiFacebookCircleFill />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition">
                <FaSquareInstagram />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4 border-b pb-1">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-blue-500 transition">Home</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Dashboard</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4 border-b pb-1">
              Contact Us
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Email: support@chatai.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 AI Avenue, Technova</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 py-4 border-t">
          &copy; {new Date().getFullYear()} ChatA.I — All rights reserved.
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
