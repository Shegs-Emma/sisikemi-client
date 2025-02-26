"use client";

import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import VerificationCodeWeb from "./verificationCodeWeb";
import VerificationCodeMobile from "./verificationCodeMobile";

const VerificationCode = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [otpInput, setOtpInput] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState<string | null>("");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { verifyCode, forgotPassword } = useUserStore((state: any) => ({
    verifyCode: state.verifyCode,
    forgotPassword: state.forgotPassword,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
    }
  }, []);

  const handleOtpInputChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtpInput([
      ...otpInput.map((d, idx) => (idx === index ? element.value : d)),
    ]);

    //focus next input
    if (element.nextSibling instanceof HTMLInputElement) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (event: any) => {
    const pasted = event.clipboardData.getData("text/plain");
    setOtpInput(pasted.split("").slice(0, otpInput.length));
  };

  // Function to handle form submission
  const onSubmit = () => {
    startTransition(async () => {
      try {
        const payload = {
          code: otpInput.join(""),
          email,
        };
        await verifyCode(payload, router);
      } catch (err) {
        console.error("Error in:", err);
      }
    });
  };

  const resendCode = () => {
    startTransition(async () => {
      try {
        const payload = {
          email,
        };
        await forgotPassword(payload, router);
      } catch (err) {
        console.error("Error in:", err);
      }
    });
  };

  return (
    <div className="w-full fixed z-50 flex flex-col">
      <div className="w-full flex justify-between py-[1rem] px-[2rem]">
        <Link href="/">
          <div className="">
            <Image
              src="/assets/main_logo.svg"
              alt="logo"
              width={70}
              height={40}
            />
          </div>
        </Link>
      </div>

      <VerificationCodeWeb
        otpInput={otpInput}
        handleOtpInputChange={handleOtpInputChange}
        handlePaste={handlePaste}
        isPending={isPending}
        onSubmit={onSubmit}
        router={router}
        resendCode={resendCode}
      />

      <VerificationCodeMobile
        otpInput={otpInput}
        handleOtpInputChange={handleOtpInputChange}
        handlePaste={handlePaste}
        isPending={isPending}
        onSubmit={onSubmit}
        router={router}
        resendCode={resendCode}
      />
    </div>
  );
};

export default VerificationCode;
