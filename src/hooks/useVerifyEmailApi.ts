import axios from "axios";
import { useCallback, useState } from "react";

const useVerifyEmailApi = ({ code }: { code: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const verifyEmail = useCallback(async () => {
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/verify-user`,
        { code: parseInt(code) }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return { isLoading, data, verifyEmail };
};

export default useVerifyEmailApi;
