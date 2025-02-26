"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import ForgotPasswordWeb from "./forgotPasswordWeb";
import ForgotPasswordMobile from "./forgotPasswordMobile";

const ForgotPassword = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { forgotPassword } = useUserStore((state: any) => ({
    forgotPassword: state.forgotPassword,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Function to handle form submission
  const onSubmit = () => {
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

      <ForgotPasswordWeb
        onSubmit={onSubmit}
        router={router}
        setEmail={setEmail}
        email={email}
        isPending={isPending}
      />

      <ForgotPasswordMobile
        onSubmit={onSubmit}
        router={router}
        setEmail={setEmail}
        email={email}
        isPending={isPending}
      />

      {/* <div className="hidden md:flex flex-col w-[640px] bg-[#ffffff] py-6 px-12 shadow-2xl m-[auto] mt-12 rounded">
        <div className="flex flex-col justify-center items-center">
          <p className="font-montserrat font-semibold text-lg text-[#333333]">
            FORGOT PASSWORD
          </p>
          <p className="font-montserrat font-medium text-xs text-[#333333] mt-2">
            We will send you an email to reset your password
          </p>
        </div>
        <div className="flex flex-col w-full mt-8">
          <div className="flex flex-col w-full">
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                size="small"
                color="success"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={twMerge(
                  "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                )}
              />
            </Box>
          </div>

          <div className="flex flex-col justify-center items-center mt-2">
            {isPending ? (
              <div className="flex flex-col w-full p-3 cursor-pointer items-center font-semibold text-sm rounded mt-8 bg-[#363435] mb-4">
                Loading...
              </div>
            ) : (
              <div
                onClick={() => onSubmit()}
                className="flex flex-col w-full p-3 cursor-pointer items-center font-semibold text-sm rounded mt-8 bg-[#363435] hover:opacity-75 mb-4"
              >
                SUBMIT
              </div>
            )}

            <div
              onClick={() => router.back()}
              className="flex flex-col w-full p-3 cursor-pointer items-center font-semibold text-sm rounded bg-[#FFFFFF] border-[1px] border-[#4f4f4f] text-[#4f4f4f] mb-4"
            >
              BACK TO LOGIN
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ForgotPassword;
