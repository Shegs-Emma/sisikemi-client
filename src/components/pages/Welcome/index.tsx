"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className="hidden md:block md:w-full pb-12 flex flex-col">
      <div className="w-full flex justify-between pt-6 px-[2rem] fixed z-50">
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

      <div className="w-full flex justify-center">
        <div className="flex flex-col w-[640px] bg-[#ffffff] py-6 relative top-[15rem] mb-[10rem] px-12 shadow-2xl rounded">
          <div className="flex flex-col justify-center items-center">
            <p className="font-montserrat font-semibold text-lg text-[#333333]">
              Thank you for Signing up to Sisikemi Fashion
            </p>
            <p className="font-montserrat font-medium text-xs text-[#333333] mt-2">
              Please check your email for next steps. We look forward to serving
              you the best!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
