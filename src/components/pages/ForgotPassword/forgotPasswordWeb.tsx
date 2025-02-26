"use client";

import React, { Dispatch, FC, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ForgotPasswordProps {
  onSubmit: () => void;
  router: AppRouterInstance;
  setEmail: Dispatch<SetStateAction<string>>;
  email: string;
  isPending: boolean;
}

const ForgotPasswordWeb: FC<ForgotPasswordProps> = ({
  onSubmit,
  router,
  setEmail,
  email,
  isPending,
}) => {
  return (
    <div className="hidden md:flex flex-col w-[640px] bg-[#ffffff] py-6 px-12 shadow-2xl m-[auto] mt-12 rounded">
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
    </div>
  );
};

export default ForgotPasswordWeb;
