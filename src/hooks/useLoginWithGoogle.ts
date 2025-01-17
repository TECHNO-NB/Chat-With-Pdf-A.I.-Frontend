import axios from "axios";
import { JwtPayload } from "jwt-decode"; // Ensure you use the right type if available.
import {  useState } from "react";

interface IProps {
  url: string;
  token: JwtPayload;
}

const useLoginWithGoogle = () => {
  const [loader, setLoader] = useState(false);
  const [res, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const loginWithGoogle = async ({ url, token }: IProps) => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
        { token }
      );
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoader(false);
    }
  };

  return { loginWithGoogle, loader, res, error };
};

export default useLoginWithGoogle;
