"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row justify-between py-[4rem] px-[2rem]">
      <div className="flex flex-col w-[70%] md:w-[20%]">
        <div className="mx-0 mt-[1rem] mb-[2rem]">
          <Image
            src="/assets/main_logo.svg"
            alt="logo"
            width={70}
            height={40}
          />
        </div>
        <h3 className="font-montserrat font-semibold text-sm md:text-base text-[#333333] p-0 m-0 ">
          FOLLOW SISI KEMI
        </h3>
        <div className="flex justify-between mt-[1.5rem]">
          <Image src="/images/fbuk.svg" alt="logo" width={29} height={29} />
          <Image src="/images/insta.svg" alt="logo" width={29} height={29} />
          <Image src="/images/whatsapp.svg" alt="logo" width={29} height={29} />
          <Image src="/images/twitter.svg" alt="logo" width={29} height={29} />
        </div>
      </div>

      <div className="flex flex-col w-[70%] md:w-[20%] mt-[4rem] md:mt-0">
        <h3 className="font-montserrat font-semibold text-sm md:text-base text-[#333333] p-0 my-[1.5rem] mx-0">
          INFO
        </h3>
        <h3 className="cursor-pointer hover:underline hover:text-[#fdcb2a] font-montserrat font-normal text-sm md:text-base text-[#4f4f4f] p-0 mb-[1.5rem] mx-0">
          Rtw Collection
        </h3>
        <h3 className="cursor-pointer hover:underline hover:text-[#fdcb2a] font-montserrat font-normal text-sm md:text-base text-[#4f4f4f] p-0 mb-[1.5rem] mx-0">
          Couture collection
        </h3>
        <h3 className="cursor-pointer hover:underline hover:text-[#fdcb2a] font-montserrat font-normal text-sm md:text-base text-[#4f4f4f] p-0 mb-[1.5rem] mx-0">
          Bridal Collection
        </h3>
        <h3 className="cursor-pointer hover:underline hover:text-[#fdcb2a] font-montserrat font-normal text-sm md:text-base text-[#4f4f4f] p-0 mb-[1.5rem] mx-0">
          Sales
        </h3>
        <h3
          onClick={() => router.push("/about-us")}
          className="cursor-pointer hover:underline hover:text-[#fdcb2a] font-montserrat font-normal text-sm md:text-base text-[#4f4f4f] p-0 mb-[1.5rem] mx-0"
        >
          About Us
        </h3>
        <h3 className="cursor-pointer hover:underline hover:text-[#fdcb2a] font-montserrat font-normal text-sm md:text-base text-[#4f4f4f] p-0 mb-[1.5rem] mx-0">
          Contact Us
        </h3>
        <h3 className="cursor-pointer hover:underline hover:text-[#fdcb2a] font-montserrat font-normal text-sm md:text-base text-[#4f4f4f] p-0 mb-[1.5rem] mx-0">
          FAQ
        </h3>
        <h3 className="cursor-pointer hover:underline hover:text-[#fdcb2a] font-montserrat font-normal text-sm md:text-base text-[#4f4f4f] p-0 mb-[1.5rem] mx-0">
          Order Tracking
        </h3>
      </div>

      <div className="flex flex-col w-[100%] md:w-[30%] mt-[2rem] md:mt-0">
        <h3 className="font-montserrat font-semibold text-sm md:text-base text-[#333333] p-0 my-[1.5rem] mx-0">
          STAY UP TO DATE
        </h3>
        <p className="font-montserrat font-normal text-sm text-[#4f4f4f] m-0">
          Subscribe to our updates and be the first to know about new releases
        </p>
        <div className="flex my-[2rem]">
          <input
            autoComplete="off"
            placeholder="Input your email"
            className="flex box-border items-start py-[18.5px] px-[16px] gap-[10px] w-[85%] md:w-[70%] h-[46px] border-[0.8px] border-[#e0e0e0] rounded bg-transparent text-[#828282] focus:outline-none placeholder-[#828282] placeholder-opacity-50"
          />
          <div className="h-[46px] bg-[#333333] border-[1px] border-[#333333] shadow-sm p-[0.8rem]">
            <RiSendPlaneFill size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
