import React, { useState } from "react";
import { Button } from "./ui/button";
import DocDetailComp from "./DocDetailComp";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPdfFile } from "@/redux/PdfFileSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteModal from "./DeleteModal";
import ButtonLoader from "./ButtonLoader";

interface CardProps {
  data: any;
  size: boolean;
}

const Card: React.FC<CardProps> = ({ data, size }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleViewDoc = async (doc: File): Promise<void> => {
    setIsLoading(true);
    dispatch(setPdfFile(doc));
    router.push("/doc");
  };

  return (
    <div
      className={`border-2 mt-4 rounded-md shadow-lg w-full sm:max-w-96 flex flex-col justify-center text-xl py-2 px-10`}
    >
      <div className="w-full flex justify-between">
        <h1 className="text-2xl text-start border-b-2">{data.title}</h1>

        <BsThreeDotsVertical
          className=" cursor-pointer mt-2"
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        isClose={() => setIsDeleteModalOpen(false)}
        title={data.title}
        _id={data._id}
        docurl={data.file}
      />
      <p className="text-gray-600">------{data.username}</p>
      <p className="hidden">{data._id}</p>
      <div
        className="h-20 w-72 sm:w-full overflow-hidden relative"
        style={{ overflowY: "auto" }}
      >
        <DocDetailComp doc={data.file} size={true} />
      </div>
      <Button
        className="mt-4 mb-1 z-4"
        onClick={() => handleViewDoc(data.file)}
      >
        {isLoading ? <ButtonLoader /> : "View doc"}
      </Button>
    </div>
  );
};

export default Card;
