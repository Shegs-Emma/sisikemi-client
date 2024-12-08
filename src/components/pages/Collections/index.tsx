import Image from "next/image";
import React, { FC } from "react";

const Collections: FC = () => {
  return (
    <div className="w-full flex flex-col p-0 md:pt-[6rem]">
      <div className="flex justify-between w-[45%] md:w-[20%] mx-auto mt-[4rem] mb-[5rem]">
        <h1 className="font-montserrat font-bold text-2xl sm:text-lg text-[#4F4F4F]">
          COLLECTIONS
        </h1>
      </div>

      <div className="flex flex-col w-full border-b-[0.5px] border-b-[#4f4f4f] pb-[7rem]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-14 px-[1.5rem] py-0">
          <div className="flex flex-col">
            <Image
              src="/images/col1.svg"
              alt="section_img"
              width={400}
              height={400}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xl text-[#4f4f4f] my-2">
                Sisi Kemi Rtw Collection
              </p>
              <p className="font-montserrat font-medium text-base text-[#4f4f4f] m-0">
                22 Products
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/col2.svg"
              alt="section_img"
              width={400}
              height={400}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xl text-[#4f4f4f] my-2">
                Sisi Kemi Couture Collection
              </p>
              <p className="font-montserrat font-medium text-base text-[#4f4f4f] m-0">
                22 Products
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/col3.svg"
              alt="section_img"
              width={400}
              height={400}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xl text-[#4f4f4f] my-2">
                Recently Added
              </p>
              <p className="font-montserrat font-medium text-base text-[#4f4f4f] m-0">
                22 Products
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/col4.svg"
              alt="section_img"
              width={400}
              height={400}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xl text-[#4f4f4f] my-2">
                Sisi Kemi Rtw Collection
              </p>
              <p className="font-montserrat font-medium text-base text-[#4f4f4f] m-0">
                22 Products
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/col5.svg"
              alt="section_img"
              width={400}
              height={400}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xl text-[#4f4f4f] my-2">
                Sisi Kemi Rtw Collection
              </p>
              <p className="font-montserrat font-medium text-base text-[#4f4f4f] m-0">
                22 Products
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Image
              src="/images/col6.svg"
              alt="section_img"
              width={400}
              height={400}
            />
            <div className="flex flex-col text-center">
              <p className="font-montserrat font-semibold text-xl text-[#4f4f4f] my-2">
                Sisi Kemi Rtw Collection
              </p>
              <p className="font-montserrat font-medium text-base text-[#4f4f4f] m-0">
                22 Products
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
