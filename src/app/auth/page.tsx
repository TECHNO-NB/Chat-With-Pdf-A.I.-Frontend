"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApiRequest";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/ButtonLoader";
import { useDispatch } from "react-redux";
import { IUser, login } from "@/redux/UserSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import useLoginWithGoogle from "@/hooks/useLoginWithGoogle";
import AiLoader from "@/components/AllLoader";
const SignInPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const { loginWithGoogle, res, loader } = useLoginWithGoogle();

  const { data, isLoading, error, makeRequest } = useApiRequest(
    "/api/v1/users/auth",
    "POST"
  );

  const handleSignIn = async () => {
    await makeRequest({ email, password });
  };

  useEffect(() => {
    if (data) {
      if (data.message === "User login successfully") {
        router.push("/dashboard");
        toast.success("login success");
        const user: IUser = {
          _id: data.data._id,
          username: data.data.username,
          email: data.data.email,
          plan: data.data.isPremium,
          isLogin: true,
        };
        dispatch(login(user));
      } else {
        // @ts-ignore
        router.push(`/otp/${data.data.email}`);
        toast.success("verify email");
      }
    } else if (error) {
      console.error("Login error:", error);
      toast.error("Invalid credentials");
    }
  }, [data, error, router]);


  const loginWithGoogleFun = async (token: JwtPayload) => {
    await loginWithGoogle({
      url: "api/v1/users/login-with-google",
      token: token,
    });
    if (res) {
      console.log(res);
      const user: IUser = {
        _id: res.data._id,
        username: res.data.username,
        email: res.data.email,
        plan: res.data.isPremium,
        isLogin: true,
      };
      dispatch(login(user));
      router.push("/dashboard");
      toast.success("login success");
    }
  };

  return (
    <MaxWidthWrapper className="mt-24 overflow-x-hidden  overflow-hidden max-h-[100vw]">
      <div className="flex items-center justify-center flex-col w-full">
        <h1 className="font-bold text-3xl text-blue-600">Signin</h1>
        {loader ? <AiLoader /> : null}
        <div className="w-[85%] sm:w-[40%] lg:w-[30%] flex flex-col gap-2 sm:gap-0 text-center">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-black mt-2 w-full"
            placeholder="Enter email...?"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border-2 border-black mt-2 w-full"
            placeholder="Enter password...?"
          />
          <Button
            className="w-full mt-2 md:mt-6 bg-blue-700  text-xl flex items-center justify-center"
            onClick={handleSignIn}
          >
            {isLoading ? <ButtonLoader /> : "Signin"}
          </Button>
          <p className="md:mt-2">or</p>
          <div className="mx-auto w-[100%] flex justify-center items-center">
            <GoogleOAuthProvider
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
            >
              <GoogleLogin
                onSuccess={(credentialResponse: any) => {
                  // console.log(credentialResponse);
                  const jwtDetail = jwtDecode(credentialResponse.credential);

                  loginWithGoogleFun(jwtDetail);
                }}
                onError={() => {
                  toast.error("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SignInPage;
