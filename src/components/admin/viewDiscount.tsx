"use client";

import React from "react";
import { FaArrowLeftLong, FaTrash } from "react-icons/fa6";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import Checkbox from "@mui/material/Checkbox";
import { CgToggleOff, CgToggleOn } from "react-icons/cg";
import Image from "next/image";

const ViewDiscount = () => {
  const router = useRouter();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="w-full z-10 mt-10 flex flex flex-col mb-12">
      <div className="flex justify-between pr-10 border-b-[1px] border-b-[#e0e0e0]">
        <div className="w-full flex px-10 pt-4 pb-10">
          <FaArrowLeftLong
            color="#363435"
            className="mt-2 cursor-pointer"
            onClick={() => router.back()}
          />
          <p className="font-lato text-xl font-semibold text-[#363435] ml-4">
            View Discount Name
          </p>
        </div>

        <div className="flex">
          <div className="flex w-[120px] h-[48px] rounded-sm justify-center border-[0.8px] items-center border-[#4f4f4f] bg-[#4f4f4f] ml-6 cursor-pointer">
            <Image
              src="/assets/save.svg"
              alt="avatar_img"
              width={20}
              height={22}
            />
            <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
              Archive
            </p>
          </div>

          <div className="flex w-[120px] h-[48px] rounded-sm justify-center items-center cursor-pointer bg-[#C80B0B] ml-6">
            <FaTrash color="#f2f2f2" />
            <p className="font-lato font-normal text-base text-[#f2f2f2] ml-2">
              Delete
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-10 flex flex-col justify-between">
        <div className="w-full sm:w-[50%] flex flex-col mt-12">
          <div className="mb-8">
            <Label
              htmlFor="discountName"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Discount name
            </Label>
            <Input
              type="text"
              name="discountName"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="mb-8 flex flex-col">
            <Label
              htmlFor="notes"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Notes
            </Label>
            <textarea
              name="notes"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            ></textarea>
          </div>

          <div className="mb-8 flex flex-col">
            <div className="flex justify-between">
              <Label
                htmlFor="discountCode"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Discount code Name
              </Label>

              <p className="font-lato text-sm font-semibold text-[#f2994a]">
                Generate code
              </p>
            </div>
            <Input
              type="text"
              name="discountCode"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="mb-8">
            <Label
              htmlFor="discountType"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Discount type
            </Label>
            <Input
              type="text"
              name="discountType"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="mb-8">
            <Label
              htmlFor="productCode"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Product code
            </Label>
            <Input
              type="text"
              name="productCode"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <h2 className="font-medium text-xl font-lato text-[#363435] mb-6">
            Valid dates
          </h2>

          <div className="flex justify-between w-full">
            <div className="w-[50%]">
              <Label
                htmlFor="startsOn"
                className={twMerge(
                  "font-lato font-medium text-xs sm:text-sm text-[#363435]"
                )}
              >
                Starts on
              </Label>
              <Input
                type="text"
                name="startsOn"
                //   onChange={handleChange}
                //   value={formValues?.firstName}
                className={twMerge(
                  "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] p-2 text-[#363435] w-[90%]"
                )}
                //   isError={errorFields.firstName}
              />
            </div>

            <div className="w-[50%]">
              <Label
                htmlFor="expiresOn"
                className={twMerge(
                  "font-lato font-medium text-xs sm:text-sm text-[#363435]"
                )}
              >
                Expires on
              </Label>
              <Input
                type="text"
                name="expiresOn"
                //   onChange={handleChange}
                //   value={formValues?.firstName}
                className={twMerge(
                  "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] p-2 text-[#363435] w-[100%]"
                )}
                //   isError={errorFields.firstName}
              />
            </div>
          </div>
          <div className="w-full flex m-0 p-0">
            <Checkbox {...label} className="relative -left-3" />
            <p className="font-lato font-normal text-sm text-[#4f4f4f] mt-3 -ml-4">
              Never Expire
            </p>
          </div>

          <h2 className="font-medium text-xl font-lato text-[#363435] my-6">
            Restrictions
          </h2>

          <div className="mb-8">
            <Label
              htmlFor="appliesTo"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Applies to
            </Label>
            <Input
              type="text"
              name="appliesTo"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="mb-8">
            <Label
              htmlFor="minimum"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Minimum order value
            </Label>
            <Input
              type="text"
              name="minimum"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="mb-8">
            <Label
              htmlFor="totalUsage"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Total Usage Limit
            </Label>
            <Input
              type="text"
              name="totalUsage"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="flex flex-col">
            <Label
              htmlFor="limitUsage"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Limit uses per customer
            </Label>
            <Input
              type="text"
              name="limitUsage"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="w-full flex m-0 p-0">
            <Checkbox {...label} className="relative -left-3" />
            <p className="font-lato font-normal text-sm text-[#4f4f4f] mt-3 -ml-4">
              No Limits
            </p>
          </div>

          <h2 className="font-medium text-xl font-lato text-[#363435] mt-6 mb-4">
            Discount Status
          </h2>

          <div className="flex">
            <CgToggleOn color="#4f4f4f" size={29} />
            <p className="font-lato font-normal text-base text-[#4f4f4f] mt-[2px] ml-2">
              Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDiscount;
