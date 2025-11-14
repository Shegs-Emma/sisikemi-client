import React from "react";
import Image from "next/image";

interface Props {
  title: string;
}

const RecentlyViewed = ({ title }: Props) => {
  return (
    <>
      <div className="flex justify-between w-[45%] md:w-[20%] mx-auto mt-[4rem] mb-[5rem]">
        <h1 className="font-montserrat font-bold text-2xl sm:text-lg text-[#4F4F4F]">
          {title}
        </h1>
      </div>

      <div className="flex flex-col w-full border-b-[0.5px] border-b-[#4f4f4f] pb-[7rem]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-14 px-[1.5rem] py-0">
          <div className="flex flex-col">
            <Image
              src="/images/recent1.svg"
              alt="section_img"
              width={280}
              height={360}
              className="flex mx-auto"
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
              src="/images/recent2.svg"
              alt="section_img"
              width={280}
              height={360}
              className="flex mx-auto"
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
              src="/images/recent3.svg"
              alt="section_img"
              width={280}
              height={360}
              className="flex mx-auto"
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
              src="/images/recent4.svg"
              alt="section_img"
              width={280}
              height={360}
              className="flex mx-auto"
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
    </>
  );
};

export default RecentlyViewed;
