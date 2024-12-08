import Image from "next/image";
import React, { FC } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

const MobileNavbar: FC = () => {
  return (
    <div className="flex flex-col fixed z-50 w-full block md:hidden">
      <div className="w-full h-[32px] bg-custom-radial text-center font-montserrat font-medium text-sm texxt-[#333333]">
        TEXT TEXT TEXT TEXT
      </div>
      <div className="w-full flex justify-between py-[1rem] px-[2rem] bg-[#fafafa]">
        <GiHamburgerMenu
          className="text-[#4f4f4f] relative top-[0.7rem]"
          size={25}
        />
        <div className="">
          <Image
            src="/assets/main_logo.svg"
            alt="logo"
            width={62}
            height={36}
          />
        </div>
        <div className="flex justify-between w-[15%]">
          <div className="flex justify-between w-full">
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

export default MobileNavbar;
