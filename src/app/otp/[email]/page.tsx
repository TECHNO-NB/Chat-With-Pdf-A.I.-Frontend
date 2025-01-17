"use client";

import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import useVerifyEmailApi from "@/hooks/useVerifyEmailApi";
import ButtonLoader from "@/components/ButtonLoader";
import toast from "react-hot-toast";

const Page = ({ params }: { params: Promise<{ email: string }> }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");

  // Initialize the useVerifyEmailApi hook
  const { isLoading, data, verifyEmail } = useVerifyEmailApi({ code });

  useEffect(() => {
    params.then((resolvedParams) => {
      setEmail(resolvedParams.email);
    });
  }, [params]);

  useEffect(() => {
    if (data) {
      toast.success("Email verified successfully");
    } else {
      toast.error("error");
    }
  }, [data]);

  if (!email) return null;

  const handleVerifyEmail = async () => {
    await verifyEmail();
    console.log("Verification code:", code);
  };

  return (
    <MaxWidthWrapper className="flex items-center flex-col mt-40 justify-center">
      <h1 className="font-bold text-2xl">Verify Your Email!!</h1>
      <p className="mb-2 text-sm text-center">
        A six-digit code has been sent to {email}
      </p>
      <InputOTP
        className="border-black border-2 w-[75%] md:w-[35%] lg:w-[25%]"
        maxLength={6}
        value={code}
        onChange={(newValue: string) => setCode(newValue)}
      >
        <InputOTPGroup>
          <InputOTPSlot className="border-black" index={0} />
          <InputOTPSlot className="border-black" index={1} />
          <InputOTPSlot className="border-black" index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot className="border-black" index={3} />
          <InputOTPSlot className="border-black" index={4} />
          <InputOTPSlot className="border-black" index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        onClick={handleVerifyEmail}
        className="mt-4 w-[75%] md:w-[35%] lg:w-[25%]"
        disabled={isLoading}
      >
        {isLoading ? <ButtonLoader /> : "SUBMIT"}
      </Button>
      {data && <p className="text-green-500 mt-4">Verification successful!</p>}
    </MaxWidthWrapper>
  );
};

export default Page;
