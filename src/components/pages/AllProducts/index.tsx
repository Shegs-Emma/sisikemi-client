import RecentlyViewed from "@/components/reusebles/recentlyViewed";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { FC } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";

const AllProducts: FC = () => {
  return (
    <div className="w-full flex flex-col p-0 md:pt-[6rem]">
      <div className="w-full flex border-b-[1px] border-b-[#e0e0e0] py-0 px-[2rem]">
        <div className="w-[15%] border-r-[1px] border-r-[#e0e0e0] h-[4rem] pt-[2rem] pr-[6rem] flex justify-between">
          <IoGrid color="#BDBDBD" size={24} />
          <BsGrid3X3GapFill color="#363435" size={24} />
        </div>

        <div className="w-[70%]"></div>

        <div className="w-[15%] border-l-[1px] border-l-[#e0e0e0]">
          <div className="flex justify-between w-[50%] mx-auto mt-[1.5rem] mb-0">
            <h3 className="font-montserrat font-semibold text-xm md:text-lg text-[#4f4f4f] p-0 m-0 ">
              SORT
            </h3>
            <BiChevronDown color="#363435" size={24} />
          </div>
        </div>
      </div>

      <div className="flex justify-between w-[45%] md:w-[29%] mx-auto mt-[4rem] mb-[5rem]">
        <Button
          className="w-[183px] h-[36px] px-[15px] py-[10px] border-[0.8px] border-[#C4C4C4] flex justify-between rounded font-semibold text-xs text-[#363435] font-montserrat outline-0 cursor-pointer my-0 mx-auto"
          type="submit"
        >
          <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
            PRODUCT TYPE
          </p>
          <BiChevronDown
            color="#363435"
            size={20}
            className="relative -top-[0.1rem]"
          />
        </Button>

        <Button
          className="w-[104px] h-[36px] px-[15px] py-[10px] border-[0.8px] border-[#C4C4C4] flex justify-between rounded font-semibold text-xs text-[#363435] font-montserrat outline-0 cursor-pointer my-0 mx-auto"
          type="submit"
        >
          <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
            SIZE
          </p>
          <BiChevronDown
            color="#363435"
            size={20}
            className="relative -top-[0.1rem]"
          />
        </Button>
      </div>

      <div className="flex flex-col w-full border-b-[0.5px] border-b-[#4f4f4f] pb-[7rem]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-14 px-[1.5rem] py-0">
          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/newin_img.svg"
              alt="section_img"
              width={280}
              height={406}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] my-2">
                HAND BEADED RHINESTONE DRESS
              </p>
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0">
                N24,000
              </p>
            </div>
          </div>
        </div>
      </div>

      <RecentlyViewed title="RECENTLY VIEWED" />
    </div>
  );
};

export default AllProducts;
