import { IUser, login } from "@/redux/UserSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useVerifyUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/verify-user`
      );
      const user: IUser = {
        _id: res.data._id,
        username: res.data.username,
        email: res.data.email,
        plan: res.data.isPremium,
        isLogin: true,
      };
      dispatch(login(user));
      console.log(res.data);
    })();
  }, []);

  return;
};

export default useVerifyUser;
