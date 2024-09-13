"use client";

import Image from "next/image"; // For optimized images
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "../ui/button";

const Slider = () => {
  return (
    <Carousel
      autoPlay={false}
      showArrows={false}
      showStatus={false}
      infiniteLoop={true}
    >
      <div className="w-full hidden md:block">
        <Image
          src="/assets/slider.svg"
          alt="logo"
          width={1440}
          height={1174}
          className="hidden md:block"
        />
        <div className="absolute flex flex-col top-[10rem] md:top-[20rem] z-10 h-[5rem] mr-auto ml-[10%] md:mr-auto md:ml-[40%]">
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
      <div className="w-full hidden md:block">
        <Image
          src="/assets/slider.svg"
          alt="logo"
          width={1440}
          height={1174}
          className="hidden md:block"
        />
        <div className="absolute flex flex-col top-[10rem] md:top-[20rem] z-10 h-[5rem] mr-auto ml-[10%] md:mr-auto md:ml-[40%]">
          <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#fafafa] m-0">
            New in
          </h4>
          <h1 className="font-montserrat font-bold text-2xl text-[#fafafa] md:text-lg">
            COLLECTION NAME
          </h1>
          <Button
            className="w-[85%] h-[31px] px-[24px] py-[8px] border-0 rounded font-semibold text-xs text-[#363435] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer my-0 mx-auto"
            variant="yellow"
            type="submit"
          >
            SHOP
          </Button>
        </div>
      </div>
      <div className="w-full hidden md:block">
        <Image
          src="/assets/slider.svg"
          alt="logo"
          width={1440}
          height={1174}
          className="hidden md:block"
        />

        <div className="absolute flex flex-col top-[10rem] md:top-[20rem] z-10 h-[5rem] mr-auto ml-[10%] md:mr-auto md:ml-[40%]">
          <h4 className="font-montserrat font-medium text-xs md:text-sm text-[#fafafa] m-0">
            New in
          </h4>
          <h1 className="font-montserrat font-bold text-2xl text-[#fafafa] md:text-lg">
            COLLECTION NAME
          </h1>
          <Button
            className="w-[85%] h-[31px] px-[24px] py-[8px] border-0 rounded font-semibold text-xs text-[#363435] font-montserrat bg-[#f2f2f2] outline-0 cursor-pointer my-0 mx-auto"
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

export default Slider;
