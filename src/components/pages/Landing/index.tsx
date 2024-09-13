import Slider from "@/components/reusebles/slider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Landing = () => {
  return (
    <div className="w-full flex flex-col p-0 md:pt-[7rem]">
      <div className="hidden md:block md:w-full">
        <Slider />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex justify-between w-[45%] md:w-[20%] mx-auto mt-[4rem] mb-[5rem]">
          <div className="pb-[0.2rem] border-b-[1.5px] border-b-[#4f4f4f]">
            <h3 className="font-montserrat font-semibold text-xs md:text-lg text-[#4f4f4f] p-0 m-0 ">
              SECTION 1
            </h3>
          </div>

          <div className="pb-[0.2rem]">
            <h3 className="font-montserrat font-semibold text-xs md:text-lg text-[#4f4f4f] p-0 m-0 ">
              SECTION 2
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-14 px-6">
          <Image
            src="/images/section1.svg"
            alt="section_img"
            width={280}
            height={406}
            className=""
          />
          <Image
            src="/images/section1.svg"
            alt="section_img"
            width={280}
            height={406}
            className=""
          />
          <Image
            src="/images/section1.svg"
            alt="section_img"
            width={280}
            height={406}
            className=""
          />
          <Image
            src="/images/section1.svg"
            alt="section_img"
            width={280}
            height={406}
            className=""
          />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex justify-between w-[70%] md:w-[20%] mx-auto mt-[4rem] mb-[5rem]">
          <div className="bg-[#363435] p-[1rem] mx-auto md:mx-0 mt-[2rem]">
            <h3 className="font-montserrat font-medium text-sm md:text-base text-[#F2F2F2] p-0 m-0 ">
              VIEW ALL PRODUCTS
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] py-0 pr-[1.5rem] pl-[2.5rem] mt-[5rem]">
          <div className="w-[95%]">
            <Image
              src="/images/section2.svg"
              alt="section_img"
              width={420}
              height={580}
              className=""
            />
            <div className="relative flex flex-col -top-[15rem] md:-top-[17rem] -left-[1rem] md:-left-[5rem] z-[10] h-[5em] my-0 mr-auto ml-[10%] md:ml-[40%]">
              <Button
                className="w-[157px] h-[43px] px-[8px] py-[14px] border-0 rounded font-semibold text-xs text-[#333333] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer my-0 mx-auto"
                variant="yellow"
                type="submit"
              >
                VIEW COLLECTION
              </Button>
            </div>
          </div>

          <div className="w-[95%]">
            <Image
              src="/images/section2.svg"
              alt="section_img"
              width={420}
              height={580}
              className=""
            />
            <div className="relative flex flex-col -top-[15rem] md:-top-[17rem] -left-[1rem] md:-left-[5rem] z-[10] h-[5em] my-0 mr-auto ml-[10%] md:ml-[40%]">
              <Button
                className="w-[157px] h-[43px] px-[8px] py-[14px] border-0 rounded font-semibold text-xs text-[#333333] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer my-0 mx-auto"
                variant="yellow"
                type="submit"
              >
                VIEW COLLECTION
              </Button>
            </div>
          </div>

          <div className="w-[95%]">
            <Image
              src="/images/section2.svg"
              alt="section_img"
              width={420}
              height={580}
              className=""
            />
            <div className="relative flex flex-col -top-[15rem] md:-top-[17rem] -left-[1rem] md:-left-[5rem] z-[10] h-[5em] my-0 mr-auto ml-[10%] md:ml-[40%]">
              <Button
                className="w-[157px] h-[43px] px-[8px] py-[14px] border-0 rounded font-semibold text-xs text-[#333333] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer my-0 mx-auto"
                variant="yellow"
                type="submit"
              >
                VIEW COLLECTION
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[640px] bg-[#a86728] flex flex-col">
        <div className="flex flex-col w-[90%] md:w-[50%] mx-auto mt-[15%] mb-0">
          <h3 className="font-montserrat font-medium text-sm md:text-base text-[#ffffff] text-center p-0 m-0 ">
            10% OFF YOUR FIRST PURCHASE
          </h3>

          <h1 className="font-montserrat font-semibold text-center text-2xl text-[#F2F2F2] md:text-lg my-[2rem] mx-0">
            SIGN UP
          </h1>

          <h3 className="font-montserrat font-medium text-sm md:text-base text-[#E0E0E0] text-center p-0 m-0 ">
            DISCOVER EXCLUSIVE NEW COLLECTIONS
          </h3>

          <div className="flex flex-col md:flex-row mx-0 mt-[4rem] mb-[2rem]">
            <input
              autoComplete="off"
              placeholder="Enter your email"
              className="flex box-border items-start py-[18.5px] px-[16px] gap-[10px] w-full md:w-[70%] h-[54px] border-[0.8px] border-[#e0e0e0] rounded bg-transparent text-[#ffffff] focus:outline-none placeholder-white placeholder-opacity-50"
            />

            <Button
              className="font-montserrat w-[100%] md:w-[171px] h-[54px] px-[32px] py-[17px] border-0 rounded font-semibold text-xs text-[#333333] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer mt-[1rem] md:my-0 mx-0 md:mx-auto"
              variant="yellow"
              type="submit"
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row border-b-[0.5px] border-b-[#4f4f4f]">
        <div className="w-full md:w-[50%] order-0">
          <div className="flex flex-col mx-auto mt-[20%] md:mt-[40%] mb-[4rem] md:mb-0 w-[90%] md:w-[80%] text-center md:text-left">
            <h3 className="font-montserrat font-medium text-xs md:text-lg text-[#4f4f4f] p-0 m-0 ">
              DESIGNED FOR EVERY WOMAN: ALL WOMEN
            </h3>
            <h2 className="font-montserrat font-semibold text-base md:text-xl text-[#363435] my-[2rem] mx-0">
              #SISIKEMI
            </h2>
            <span className="font-montserrat font-medium text-sm text-[#363435] border-b-[1px] border-b-[#363435] w-[50%] md:w-[31%] text-center pb-[0.5rem] mx-auto md:mx-0 mt-[1rem]">
              VIEW ALL PRODUCTS
            </span>
          </div>
        </div>
        <div className="w-full md:w-[50%] order-1">
          <Image
            src="/images/layer.svg"
            alt="layer_img"
            width={720}
            height={720}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
