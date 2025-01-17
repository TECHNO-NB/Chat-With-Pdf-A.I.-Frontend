"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import aiimg from "@/assets/logo.png";
import Image from "next/image";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { motion, Variants } from "framer-motion";


const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  const fadeUpAnimation: Variants = {
    hidden: { y: -10, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { 
      staggerChildren:0.3,
      duration: 0.5 } },
  };

  return (
    <nav
   
      className="w-[100vw] h-16 z-50 text-black text-center flex border-4 bg-white"
    >
      <MaxWidthWrapper className="w-full">
        <div className="flex justify-between items-center h-full">
          <div className="logo flex">
            <Link
              className="flex  text-[1.3em] font-bold items-center justify-center"
              href="/"
            >
              <Image className="w-10" src={aiimg} alt="img" quality={100} />
              Nbpgai.
            </Link>
          </div>
          <div>
            {open ? (
              <IoMdClose
                className="text-3xl block md:hidden"
                onClick={() => setOpen(false)}
              />
            ) : (
              <FaBarsStaggered
                className="block text-2xl md:hidden"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
          <div
            className={`h-[92vh] fixed w-[15em] border-r-4  z-50 ${
              open ? "left-0" : "left-[-70%]"
            } bg-white text-black top-16 md:hidden transition-all ease-in-out`}
          >
            <motion.ul
               initial="hidden"
               animate="show"
               variants={fadeUpAnimation}
             className="flex items-center mt-4 flex-col gap-4 text-xl">
              <li onClick={() => setOpen(false)}>
                <Link href="/">Home</Link>
              </li>
              {user.isLogin ? (
                <>
                  <li onClick={() => setOpen(false)}>
                    <Link href="/pricing">Pricing</Link>
                  </li>
                  <li onClick={() => setOpen(false)}>
                    <Link href="/dashboard">
                      <Button className="bg-blue-700">
                        Dashboard <FaArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={() => setOpen(false)}>
                    <Link href="/auth">Signin</Link>
                  </li>
                  <li onClick={() => setOpen(false)}>
                    <Link href="/auth">
                      <Button className="bg-blue-700">
                        Get started <FaArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </li>
                </>
              )}
            </motion.ul>
          </div>
          <div className="hidden md:block">
            <ul className="md:flex md:gap-6 items-center justify-center">
              {user.isLogin ? (
                <>
                  <li>
                    <Link href="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link href="/dashboard">
                      <Button className="bg-blue-700">
                        Dashboard <FaArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/auth">Signin</Link>
                  </li>
                  <li>
                    <Link href="/auth">
                      <Button className="bg-blue-700">
                        Get started <FaArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
