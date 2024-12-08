import React, { useState } from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";

const Payment = () => {
  return (
    <div className="w-[60%] flex flex-col">
      <div className="flex my-[4rem] mx-[2rem]">
        <BiChevronLeft color="#F2994A" className="mt-[3px]" size={24} />
        <h3 className="font-montserrat font-normal text-xs sm:text-lg text-[#F2994A] m-0 p-0 ">
          Back to Shipping
        </h3>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/assets/main_logo.svg"
            alt="logo"
            width={70}
            height={40}
          />
          <div className="flex mt-4">
            <h3 className="font-montserrat font-normal text-xs sm:text-sm text-[#F2994A] m-0 p-0 ">
              Cart
            </h3>
            <BiChevronRight color="#F2994A" className="mt-[1px]" size={20} />
            <h3 className="font-montserrat font-normal text-xs sm:text-sm text-[#F2994A] m-0 p-0 ">
              Information
            </h3>
            <BiChevronRight color="#F2994A" className="mt-[1px]" size={20} />
            <h3 className="font-montserrat font-normal text-xs sm:text-sm text-[#F2994A] m-0 p-0 ">
              Shipping
            </h3>
            <BiChevronRight color="#F2994A" className="mt-[1px]" size={20} />
            <h3 className="font-montserrat font-semibold text-xs sm:text-sm text-[#333333] m-0 p-0 ">
              Payment
            </h3>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[80%] p-6 ml-10 mt-8 border-[1.2px] border-[#bdbdbd] rounded">
        <div className="flex justify-between border-b-[1.2px] border-b-[#bdbdbd] pb-4">
          <div className="flex">
            <p className="font-montserrat text-sm font-medium text-[#333333]">
              Contact:
            </p>
            <p className="font-montserrat font-normal text-sm text-[#4f4f4f] ml-4">
              Joyoluzzz@gmail.com
            </p>
          </div>
          <p className="font-montserrat font-medium text-sm text-[#2f80ed]">
            Change
          </p>
        </div>

        <div className="flex justify-between pt-4 border-b-[1.2px] border-b-[#bdbdbd] pb-4">
          <div className="flex">
            <p className="font-montserrat text-sm font-medium text-[#333333]">
              Ship to:
            </p>
            <p className="font-montserrat fornt-normal text-sm text-[#4f4f4f] ml-4">
              59 Oduduwa way, 100271 Ikaeja Lagos, Nigeria
            </p>
          </div>
          <p className="font-montserrat font-medium text-sm text-[#2f80ed]">
            Change
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <div className="flex">
            <p className="font-montserrat text-sm font-medium text-[#333333]">
              Method:
            </p>
            <p className="font-montserrat font-normal text-sm text-[#4f4f4f] ml-4">
              Shipping Method 1 -{" "}
              <span className="font-montserrat font-semibold">N5,000</span>
            </p>
          </div>
          <p className="font-montserrat fornt-medium text-sm text-[#2f80ed]">
            Change
          </p>
        </div>
      </div>

      <div className="flex flex-col pl-10 pr-[10rem] mt-8">
        <div className="flex justify-between">
          <h3 className="font-montserrat font-semibold text-xs sm:text-base text-[#4f4f4f] m-0 p-0">
            Payment Method
          </h3>
        </div>
        <p className="font-montserrat text-base font-normal text-[#4f4f4f] mt-3">
          All transactions are encrypted and secured
        </p>
      </div>

      <div className="flex flex-col w-[80%] py-6 ml-10 mt-8 border-[1.2px] border-[#bdbdbd] rounded">
        <div className="flex justify-between border-b-[1.2px] border-b-[#bdbdbd] pb-4 px-6">
          <div className="flex">
            <MdOutlineRadioButtonChecked color="#2f80ed" className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-montserrat fornt-normal text-base text-[#363435] mb-1">
                Pay with Card
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 px-6">
          <div className="flex">
            <MdOutlineRadioButtonUnchecked color="#2f80ed" className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-montserrat fornt-normal text-base text-[#363435] mb-1">
                Pay with Paystack
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-10 pr-[10rem] mt-8">
        <div className="flex justify-between">
          <h3 className="font-montserrat font-semibold text-xs sm:text-base text-[#4f4f4f] m-0 p-0">
            Billing Address
          </h3>
        </div>
        <p className="font-montserrat text-base font-normal text-[#4f4f4f] mt-3">
          Select the address that matches your card or payment method.
        </p>
      </div>

      <div className="flex flex-col w-[80%] py-6 ml-10 mt-8 border-[1.2px] border-[#bdbdbd] rounded">
        <div className="flex justify-between border-b-[1.2px] border-b-[#bdbdbd] pb-4 px-6">
          <div className="flex">
            <MdOutlineRadioButtonChecked color="#2f80ed" className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-montserrat fornt-normal text-base text-[#363435] mb-1">
                Save my information for a faster checkout
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 px-6">
          <div className="flex">
            <MdOutlineRadioButtonUnchecked color="#2f80ed" className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-montserrat fornt-normal text-base text-[#363435] mb-1">
                Save my information for a faster checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-10 pr-[10rem] mt-8">
        <div className="flex justify-between">
          <h3 className="font-montserrat font-semibold text-xs sm:text-base text-[#4f4f4f] m-0 p-0">
            Remember Me
          </h3>
        </div>
      </div>

      <div className="flex flex-col w-[80%] py-6 ml-10 mt-8 border-[1.2px] border-[#bdbdbd] rounded">
        <div className="flex justify-between px-6">
          <div className="flex">
            <MdOutlineRadioButtonChecked color="#2f80ed" className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-montserrat fornt-normal text-base text-[#363435] mb-1">
                Save my information for a faster checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[80%] p-3 cursor-pointer items-center ml-[5%] font-semibold text-sm rounded mt-8 bg-[#363435]">
        PAY NOW
      </div>
    </div>
  );
};

export default Payment;
