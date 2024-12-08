"use client";

import Image from "next/image"; // For optimized images
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "../ui/button";

const SliderMobile = () => {
  return (
    <Carousel
      autoPlay={false}
      showArrows={false}
      showStatus={false}
      infiniteLoop={true}
    >
      <div className="w-full block md:hidden">
        <Image
          src="/assets/slider_mob.svg"
          alt="logo"
          width={375}
          height={468}
          className="block md:hidden"
        />
        <div className="absolute flex flex-col top-[20rem] z-10 h-[5rem] mr-auto ml-[30%] md:mr-auto">
          <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#fafafa] m-0">
            New in
          </h4>
          <h1 className="font-montserrat font-bold text-2xl text-[#fafafa] md:text-lg my-3">
            COLLECTION NAME
          </h1>
          <Button
            className="w-[85px] h-[31px] px-[24px] py-[8px] border-0 rounded font-semibold text-xs text-[#363435] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer my-0 mx-auto"
            variant="yellow"
            type="submit"
          >
            SHOP
          </Button>
        </div>
      </div>

      <div className="w-full block md:hidden">
        <Image
          src="/assets/slider_mob.svg"
          alt="logo"
          width={375}
          height={468}
          className="block md:hidden"
        />
        <div className="absolute flex flex-col top-[20rem] z-10 h-[5rem] mr-auto ml-[30%] md:mr-auto">
          <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#fafafa] m-0">
            New in
          </h4>
          <h1 className="font-montserrat font-bold text-2xl text-[#fafafa] md:text-lg my-3">
            COLLECTION NAME
          </h1>
          <Button
            className="w-[85px] h-[31px] px-[24px] py-[8px] border-0 rounded font-semibold text-xs text-[#363435] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer my-0 mx-auto"
            variant="yellow"
            type="submit"
          >
            SHOP
          </Button>
        </div>
      </div>

      <div className="w-full block md:hidden">
        <Image
          src="/assets/slider_mob.svg"
          alt="logo"
          width={375}
          height={468}
          className="block md:hidden"
        />
        <div className="absolute flex flex-col top-[20rem] z-10 h-[5rem] mr-auto ml-[30%] md:mr-auto">
          <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#fafafa] m-0">
            New in
          </h4>
          <h1 className="font-montserrat font-bold text-2xl text-[#fafafa] md:text-lg my-3">
            COLLECTION NAME
          </h1>
          <Button
            className="w-[85px] h-[31px] px-[24px] py-[8px] border-0 rounded font-semibold text-xs text-[#363435] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer my-0 mx-auto"
            variant="yellow"
            type="submit"
          >
            SHOP
          </Button>
        </div>
      </div>
    </Carousel>
  );
};

export default SliderMobile;
