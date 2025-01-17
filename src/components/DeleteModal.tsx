import axios from "axios";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "./ButtonLoader";
import { useDispatch } from "react-redux";
import { refreshDoc } from "@/redux/DocRefresh";

interface IDeleteModal {
  isOpen: boolean;
  isClose: () => void;
  title: string;
  _id: string;
  docurl: string;
}

const DeleteModal = ({ isOpen, isClose, title, _id, docurl }: IDeleteModal) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  if (!isOpen) return null;

  const handleDeleteDoc = async () => {
    try {
      setIsLoading(true);
       await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/doc/delete-doc/${_id}`,
        {
          data: {
            docurl,
          },
        }
      );
      setIsLoading(false);
      isClose();
      dispatch(refreshDoc(false));
      toast.success("Doc delete successfully");
    
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Doc not delete");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className=" absolute inset-0 bg-black opacity-30"></div>
      <div className=" relative  w-64 h-38 rounded-xl px-4 py-4 bg-white  flex flex-col justify-center items-center">
        <nav className="w-full border-b-2 flex justify-between">
          <h1 className="text-2xl font-bold text-black">{title}</h1>
          <button onClick={isClose} className="text-xl font-bold">
            ✕
          </button>
        </nav>
        <h1 className="text-bold text-xl mt-1 font-bold">Are you sure to delete?</h1>
        <Button
          onClick={handleDeleteDoc}
          className="mt-2 h-8 self-end"
          variant={"destructive"}
        >
          {isLoading ? <ButtonLoader /> : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
