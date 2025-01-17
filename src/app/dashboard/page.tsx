"use client";
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { ICardData } from "@/types/types";

import axios from "axios";
import { motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [docData, setDocData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
    console.log(file,title);
  const isDocRefresh = useSelector(
    (state: any) => state.docRefresh.isDocRefresh
  );

  const fadeInAnimation: Variants = {
    hidden: { opacity: 0, y: -20,x:-40},
    show: {
      opacity: 1,
      y: 0,
      x:0,
      transition: {
        staggerChildren: 0.3,
        duration: 1,
      },
    },


  };

  


  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/doc/all-doc`
        );
        setDocData(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, [isDocRefresh]);

  const addNewDocument = (): void => {
    setModalOpen(true);
  };
  const handleAddDoc = async (file: File | null | undefined, title: string) => {
    if (file && title) {
      const newDoc: ICardData = {
        id: file.size,
        title: title,
        username: file.name,
        file: file,
      };

      setDocData((prevData) => [...prevData, newDoc]);

      setFile(null);
      setTitle("");

      setModalOpen(false);
    } else {
      console.log("Please provide both a file and a title.");
    }
  };

  return (
    <MaxWidthWrapper className=" w-full mt-6">
      <motion.div  initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:1}} className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={addNewDocument} className="bg-blue-700">
          Add Documents
        </Button>
      </motion.div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddDoc={handleAddDoc}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <motion.div  initial="hidden" animate="show" variants={fadeInAnimation} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docData &&
            docData.map((val) => (
              <Card data={val} size={false} key={val._id} />
            ))}
        </motion.div>
      )}
    </MaxWidthWrapper>
  );
};

export default Page;
