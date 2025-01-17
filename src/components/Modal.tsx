import React, { useState, ChangeEvent, useEffect } from "react";
import { Button } from "./ui/button";
import useCreateDoc from "@/hooks/useCreateDoc";
import ButtonLoader from "./ButtonLoader";
import { useDispatch } from "react-redux";
import { refreshDoc } from "@/redux/DocRefresh";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDoc: (file: File | null, title: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAddDoc }) => {
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
 console.log(onAddDoc);
  const{ isLoading, data, createNewDoc } = useCreateDoc({ title, file });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (data) {
      onClose();
      toast.success("Doc create successfully");
      dispatch(refreshDoc(true));
    } else {
    }
  }, [data]);

  if (!isOpen) return null;

  const handleAddDoc = async () => {
    await createNewDoc();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative z-10">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">Add Doc</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              accept="application/pdf"
              onChange={handleTitleChange}
              placeholder="Enter title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Document
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className="px-5 py-2  text-white rounded-lg  transition-all"
            onClick={handleAddDoc}
          >
            {isLoading ? <ButtonLoader /> : "Add Doc"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
