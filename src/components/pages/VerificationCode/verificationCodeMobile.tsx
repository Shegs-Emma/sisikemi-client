"use client";

import React, { FC } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface VerificationCodeProps {
  onSubmit: () => void;
  handleOtpInputChange: (
    element: HTMLInputElement,
    index: number
  ) => false | undefined;
  handlePaste: (event: any) => void;
  router: AppRouterInstance;
  isPending: boolean;
  otpInput: any[];
  resendCode: () => void;
}

const VerificationCodeMobile: FC<VerificationCodeProps> = ({
  otpInput,
  handleOtpInputChange,
  handlePaste,
  isPending,
  onSubmit,
  router,
  resendCode,
}) => {
  return (
    <div className="flex md:hidden flex-col w-full bg-[#ffffff] py-6 px-4 m-[auto] mt-12">
      <div className="flex flex-col justify-center items-center">
        <p className="font-montserrat font-semibold text-lg text-[#333333]">
          VERIFICATION CODE
        </p>
        <p className="font-montserrat font-medium text-xs text-[#333333] mt-2">
          Please input code sent to your email
        </p>
      </div>
      <div className="flex flex-col w-full mt-8">
        <div className="flex flex-col w-full">
          <div className="relative flex justify-center space-x-8 rounded-md">
            {otpInput &&
              otpInput.length &&
              otpInput?.map((data, index) => {
                return (
                  <input
                    type="text"
                    maxLength={1}
                    className="mb-4 block h-8 w-8 items-center justify-center rounded-md bg-white text-center text-[12px] border-[2px] border-[#4f4f4f] text-[#4f4f4f] focus:border-olivine-500 focus:ring-olivine-500 sm:h-10 sm:w-10 sm:text-lg"
                    name="opt"
                    key={index}
                    value={data}
                    onChange={(e) => handleOtpInputChange(e.target, index)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
          </div>
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
              CONFIRM OTP
            </div>
          )}

          <div
            onClick={() => router.back()}
            className="flex flex-col w-full p-3 cursor-pointer items-center font-semibold text-sm rounded bg-[#FFFFFF] border-[1px] border-[#4f4f4f] text-[#4f4f4f] mb-4"
          >
            BACK
          </div>
        </div>

        <p
          onClick={() => resendCode()}
          className="font-montserrat font-semibold text-normal text-[#333333] my-2 cursor-pointer hover:underline"
        >
          Resend Code
        </p>
      </div>
    </div>
  );
};

export default VerificationCodeMobile;
