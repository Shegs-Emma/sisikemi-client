import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineChevronDown } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="hidden md:block md:w-full fixed z-50 flex flex-col">
      <div className="w-full h-[32px] bg-custom-radial text-center font-medium text-sm text-[#333333]">
        TEXT TEXT TEXT TEXT
      </div>
      <div className="w-full flex justify-between py-[1rem] px-[2rem] bg-[#fafafa]">
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
        <div className="flex justify-between w-[45%] mt-3">
          <Link href="/newIn">
            <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#333333] cursor-pointer">
              NEW IN
            </h4>
          </Link>
          <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#333333]">
            SHOP
          </h4>
          <Link href="/sale">
            <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#333333] cursor-pointer">
              SALE
            </h4>
          </Link>
          <Link href="/rtw">
            <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#333333] cursor-pointer">
              RTW
            </h4>
          </Link>
          <Link href="/collections">
            <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#333333] cursor-pointer">
              COLLECTIONS
            </h4>
          </Link>
          <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#333333]">
            BRIDAL
          </h4>
        </div>

        <div className="flex justify-between w-[20%]">
          <div className="flex flex-row">
            <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] mt-4">
              NGN N
            </p>
            <HiOutlineChevronDown className="text-[#4f4f4f] relative top-[1rem] ml-[0.7rem]" />
          </div>
          <div className="flex justify-between w-full md:w-[65%]">
            <CgProfile
              className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem]"
              size={25}
            />
            <FiSearch
              className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem]"
              size={25}
            />
            <AiOutlineShoppingCart
              className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem]"
              size={25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
