import axios from "axios";
import { useCallback, useState } from "react";

const useCreateDoc = ({ title, file }: { title: string; file: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const createNewDoc = useCallback(async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("title", title);
      formData.append("file", file);
      
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/doc/create-doc`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false);
      setData(res.data);
    
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [title, file]);

  return { isLoading, data, createNewDoc };
};

export default useCreateDoc;
