import React from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";

const Shipping = () => {
  return (
    <div className="w-[60%] flex flex-col">
      <div className="flex my-[4rem] mx-[2rem]">
        <BiChevronLeft color="#F2994A" className="mt-[3px]" size={24} />
        <h3 className="font-montserrat font-normal text-xs sm:text-lg text-[#F2994A] m-0 p-0 ">
          Back to Information
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
            <h3 className="font-montserrat font-semibold text-xs sm:text-sm text-[#333333] m-0 p-0 ">
              Shipping
            </h3>
            <BiChevronRight color="#F2994A" className="mt-[1px]" size={20} />
            <h3 className="font-montserrat font-normal text-xs sm:text-sm text-[#333333] m-0 p-0 ">
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
            <p className="font-montserrat fornt-normal text-sm text-[#4f4f4f] ml-4">
              Joyoluzzz@gmail.com
            </p>
          </div>
          <p className="font-montserrat fornt-medium text-sm text-[#2f80ed]">
            Change
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <div className="flex">
            <p className="font-montserrat text-sm font-medium text-[#333333]">
              Ship to:
            </p>
            <p className="font-montserrat fornt-normal text-sm text-[#4f4f4f] ml-4">
              59 Oduduwa way, 100271 Ikaeja Lagos, Nigeria
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
            Shipping Method
          </h3>
        </div>
      </div>

      <div className="flex flex-col w-[80%] py-6 ml-10 mt-8 border-[1.2px] border-[#bdbdbd] rounded">
        <div className="flex justify-between border-b-[1.2px] border-b-[#bdbdbd] pb-4 px-6">
          <div className="flex">
            <MdOutlineRadioButtonChecked color="#2f80ed" className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-montserrat fornt-normal text-base text-[#363435] mb-1">
                Shipping Method 1
              </p>
              <p className="font-montserrat font-normal text-sm text-[#828282]">
                Shipping Duration
              </p>
            </div>
          </div>
          <p className="font-montserrat fornt-medium text-sm text-[#000000]">
            N24,000
          </p>
        </div>

        <div className="flex justify-between border-b-[1.2px] border-b-[#bdbdbd] py-4 px-6">
          <div className="flex">
            <MdOutlineRadioButtonUnchecked color="#2f80ed" className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-montserrat fornt-normal text-base text-[#363435] mb-1">
                Shipping Method 2
              </p>
              <p className="font-montserrat font-normal text-sm text-[#828282]">
                Shipping Duration
              </p>
            </div>
          </div>
          <p className="font-montserrat fornt-medium text-sm text-[#000000]">
            N10,000
          </p>
        </div>

        <div className="flex justify-between pt-4 px-6">
          <div className="flex">
            <MdOutlineRadioButtonUnchecked color="#2f80ed" className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-montserrat fornt-normal text-base text-[#363435] mb-1">
                Shipping Method 3
              </p>
              <p className="font-montserrat font-normal text-sm text-[#828282]">
                Shipping Duration
              </p>
            </div>
          </div>
          <p className="font-montserrat fornt-medium text-sm text-[#000000]">
            N15,000
          </p>
        </div>
      </div>

      <div className="flex flex-col w-[80%] p-3 cursor-pointer items-center ml-[5%] font-semibold text-sm rounded mt-8 bg-[#363435]">
        CONTINUE TO PAYMENT
      </div>
    </div>
  );
};

export default Shipping;
