import React, { FC } from "react";
import Image from "next/image";

const AboutUs: FC = () => {
  return (
    <div className="w-full flex flex-col p-0 md:pt-[6rem]">
      <h2 className="font-montserrat text-lg md:text-2xl font-semibold text-[#363435] mt-[8rem] md:mt-[4rem] mb-[8rem] flex justify-center">
        <p className="p-4 border-b-2 border-b-[#4f4f4f]"> ABOUT US</p>
      </h2>

      <div className="flex flex-col md:flex-row w-full px-[2rem] md:px-0 md:w-[90%] md:m-[auto]">
        <div className="w-full md:w-[50%]">
          <Image
            src="/assets/owner.svg"
            alt="wedding_img_1"
            width={552}
            height={776}
          />
        </div>

        <div className="flex flex-col w-full mb-[4rem] md:mb-0 md:w-[50%]">
          <div className="w-full md:w-[86%] mt-8 md:m-[auto]">
            <p className="font-montserrat font-semibold text-base text-[#fdcb2a] mb-3">
              People
            </p>
            <p className="font-montserrat font-semibold text-2xl text-[#4f4f4f] mb-3">
              Our Founder
            </p>
            <p className="font-montserrat font-normal text-lg text-[#4f4f4f]">
              We are a team of fashion designers, creatives, tailors and artists
              working together with a singular mission of desi- gning and
              creating beautiful and stunning fashion pieces that make our
              customers feel valued, special, fashionable and stylish. We are a
              team of fashion designers, creatives, tailors and artists working
              together with a singular mission of designing and creating
              beautiful and stunning fashion pieces that make our customers feel
              valued, special, fashionable and stylish.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col md:flex-row w-full px-[2rem] md:px-0 md:w-full md:my-[8rem] md:py-[5rem] md:px-[2rem] bg-[#f2f2f2]">
        <div className="flex flex-col w-full md:w-[50%] mb-[4rem] md:mb-0">
          <div className="w-full md:w-[86%] mt-8 md:m-[auto]">
            <p className="font-montserrat font-semibold text-base text-[#fdcb2a] mb-3">
              Product
            </p>
            <p className="font-montserrat font-semibold text-2xl text-[#4f4f4f] mb-3">
              Our Product
            </p>
            <p className="font-montserrat font-normal text-lg text-[#4f4f4f]">
              We are a team of fashion designers, creatives, tailors and artists
              working together with a singular mission of desi- gning and
              creating beautiful and stunning fashion pieces that make our
              customers feel valued, special, fashionable and stylish. We are a
              team of fashion designers, creatives, tailors and artists working
              together with a singular mission of designing and creating
              beautiful and stunning fashion pieces that make our customers feel
              valued, special, fashionable and stylish.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[50%]">
          <Image
            src="/assets/ourproduct.svg"
            alt="ourproduct"
            width={600}
            height={600}
          />
        </div>
      </div>

      <div className="flex md:hidden flex-col md:flex-row w-full px-[2rem] md:px-0 md:w-full md:my-[8rem] md:py-[5rem] md:px-[2rem] bg-[#f2f2f2]">
        <div className="w-full md:w-[50%]">
          <Image
            src="/assets/ourproduct.svg"
            alt="ourproduct"
            width={600}
            height={600}
          />
        </div>
        <div className="flex flex-col w-full md:w-[50%] mb-[4rem] md:mb-0">
          <div className="w-full md:w-[86%] mt-8 md:m-[auto]">
            <p className="font-montserrat font-semibold text-base text-[#fdcb2a] mb-3">
              Product
            </p>
            <p className="font-montserrat font-semibold text-2xl text-[#4f4f4f] mb-3">
              Our Product
            </p>
            <p className="font-montserrat font-normal text-lg text-[#4f4f4f]">
              We are a team of fashion designers, creatives, tailors and artists
              working together with a singular mission of desi- gning and
              creating beautiful and stunning fashion pieces that make our
              customers feel valued, special, fashionable and stylish. We are a
              team of fashion designers, creatives, tailors and artists working
              together with a singular mission of designing and creating
              beautiful and stunning fashion pieces that make our customers feel
              valued, special, fashionable and stylish.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full px-[2rem] md:px-0 md:w-[90%] md:m-[auto]">
        <div className="w-full md:w-[50%]">
          <Image
            src="/assets/our-tribe.svg"
            alt="our-tribe"
            width={552}
            height={776}
          />
        </div>

        <div className="flex flex-col w-full md:w-[50%]">
          <div className="w-full md:w-[86%] mt-8 md:m-[auto]">
            <p className="font-montserrat font-semibold text-base text-[#fdcb2a] mb-3">
              People
            </p>
            <p className="font-montserrat font-semibold text-2xl text-[#4f4f4f] mb-3">
              Our Tribe/ Community
            </p>
            <p className="font-montserrat font-normal text-lg text-[#4f4f4f]">
              We are a team of fashion designers, creatives, tailors and artists
              working together with a singular mission of desi- gning and
              creating beautiful and stunning fashion pieces that make our
              customers feel valued, special, fashionable and stylish. We are a
              team of fashion designers, creatives, tailors and artists working
              together with a singular mission of designing and creating
              beautiful and stunning fashion pieces that make our customers feel
              valued, special, fashionable and stylish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
