import axios from "axios";
import { useState, useCallback } from "react";

type RequestType = "GET" | "POST" | "PUT" | "DELETE";

const useApiRequest = (url: string, requestType: RequestType = "GET") => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const makeRequest = useCallback(
    async (body: any = null) => {
      setIsLoading(true);
      setError(null);
      try {
        axios.defaults.withCredentials = true;
        let response;
        switch (requestType) {
          case "POST":
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
              body
            );
            break;
          case "PUT":
            response = await axios.put(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
              body
            );
            break;
          case "DELETE":
            response = await axios.delete(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
              {
                data: body,
              }
            );
            break;
          default:
            response = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`
            );
        }

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [url, requestType]
  );

  return { data, isLoading, error, makeRequest };
};

export default useApiRequest;
