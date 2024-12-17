import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/utils/constants";
import {
  OrderDetailsErrorInterface,
  OrderDetailsInterface,
} from "@/utils/interface";
import { Checkbox } from "@mui/material";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface CheckoutProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetailsInterface>>;
  orderDetails: OrderDetailsInterface;
  setErrorFields: React.Dispatch<
    React.SetStateAction<OrderDetailsErrorInterface>
  >;
  errorFields: OrderDetailsErrorInterface;
}

const ContactInfo: FC<CheckoutProps> = ({
  setStep,
  setOrderDetails,
  orderDetails,
  setErrorFields,
  errorFields,
}) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });

    if (value.trim() !== "") {
      setErrorFields({
        ...errorFields,
        [name]: false,
      });
    }
  };

  const handleContactInfoSave = () => {
    return setStep(2);
  };

  return (
    <div className="w-[60%] flex flex-col">
      <div className="flex my-[4rem] mx-[2rem]">
        <BiChevronLeft color="#F2994A" className="mt-[3px]" size={24} />
        <h3 className="font-montserrat font-normal text-xs sm:text-lg text-[#F2994A] m-0 p-0 ">
          Back to cart
        </h3>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/assets/main_logo.svg"
            alt="logo"
            width={70}
            height={40}
          />
          <div className="flex mt-4">
            <h3 className="font-montserrat font-normal text-xs sm:text-sm text-[#F2994A] m-0 p-0 ">
              Cart
            </h3>
            <BiChevronRight color="#F2994A" className="mt-[1px]" size={20} />
            <h3 className="font-montserrat font-semibold text-xs sm:text-sm text-[#333333] m-0 p-0 ">
              Information
            </h3>
            <BiChevronRight color="#F2994A" className="mt-[1px]" size={20} />
            <h3 className="font-montserrat font-normal text-xs sm:text-sm text-[#333333] m-0 p-0 ">
              Shipping
            </h3>
            <BiChevronRight color="#F2994A" className="mt-[1px]" size={20} />
            <h3 className="font-montserrat font-normal text-xs sm:text-sm text-[#333333] m-0 p-0 ">
              Payment
            </h3>
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-10 pr-[10rem] mt-8">
        <div className="flex justify-between">
          <h3 className="font-montserrat font-semibold text-xs sm:text-base text-[#4f4f4f] m-0 p-0">
            Contact Information
          </h3>
          <h3 className="font-montserrat font-medium text-xs sm:text-sm text-[#4f4f4f] m-0 p-0">
            Already have an account?{" "}
            <span className="text-[#fdcb2a]">Log in</span>
          </h3>
        </div>
      </div>

      <div className="flex flex-col pl-10 pr-[7rem] mt-8">
        <div className="flex flex-col w-full">
          <Input
            type="text"
            name="email_phone"
            placeholder="Email Address or Mobile Phone Number"
            onChange={handleChange}
            value={orderDetails?.email_phone}
            className={twMerge(
              "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] py-2 px-6 text-[#363435] w-[100%]"
            )}
            // isError={errorFields.email_phone}
          />
          <div className="w-full flex m-0 p-0">
            <Checkbox {...label} className="relative -left-3 text-[#828282]" />
            <p className="font-lato font-normal text-sm text-[#4f4f4f] mt-3 -ml-4">
              I agree to receive news and offers
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-10 pr-[10rem] mt-8">
        <div className="flex justify-between">
          <h3 className="font-montserrat font-semibold text-xs sm:text-base text-[#4f4f4f] m-0 p-0">
            Shipping Address
          </h3>
        </div>
      </div>

      <div className="mb-8 space-y-1 pl-10 pr-[7rem] mt-4">
        <Select
          onValueChange={(value: string) =>
            setOrderDetails({ ...orderDetails, country: value })
          }
        >
          <SelectTrigger
            className={twMerge(
              "w-full border-[#bdbdbd] bg-transparent text-[#363435] focus:ring-grocedy_primary_color focus-visible:ring-[1.5px]"
            )}
          >
            <SelectValue
              placeholder={
                orderDetails?.country ? orderDetails?.country : "Country/Region"
              }
            />
          </SelectTrigger>
          <SelectContent className={twMerge("")}>
            <div className="h-full max-h-60 overflow-y-scroll scrollbar-thumb-[#363435]/40 scrollbar-thin bg-[#4f4f4f] scrollbar-track-[#363435]-200 w-full sm:w-full">
              {countries?.length &&
                countries?.map((county, idx) => (
                  <SelectItem key={idx} value={county?.name}>
                    {county?.name}
                  </SelectItem>
                ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-8 space-y-1 pl-10 pr-[7rem]">
        <Input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={orderDetails?.address}
          className={twMerge(
            "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] py-2 px-3 text-[#363435] w-[100%]"
          )}
          //   isError={errorFields.firstName}
        />
      </div>

      <div className="mb-8 space-y-1 pl-10 pr-[5rem] w-[100%] flex justify-between">
        <Input
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          value={orderDetails?.first_name}
          className={twMerge(
            "mt-1 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[90%] py-2 px-3 text-[#363435]"
          )}
          //   isError={errorFields.firstName}
        />
        <Input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          value={orderDetails?.last_name}
          className={twMerge(
            "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[90%] py-2 px-3 text-[#363435]"
          )}
          //   isError={errorFields.firstName}
        />
      </div>

      <div className="mb-8 space-y-1 pl-10 pr-[5rem] w-[100%] flex justify-between">
        <Input
          type="text"
          name="town_city"
          placeholder="Town / City"
          onChange={handleChange}
          value={orderDetails?.town_city}
          className={twMerge(
            "mt-1 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[85%] py-2 px-3 text-[#363435]"
          )}
          //   isError={errorFields.firstName}
        />
        <Input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          onChange={handleChange}
          value={orderDetails?.postal_code}
          className={twMerge(
            "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[85%] py-2 px-3 text-[#363435]"
          )}
          //   isError={errorFields.firstName}
        />
        <Input
          type="text"
          name="landmark"
          placeholder="Landmark"
          onChange={handleChange}
          value={orderDetails?.landmark}
          className={twMerge(
            "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[85%] py-2 px-3 text-[#363435]"
          )}
          //   isError={errorFields.firstName}
        />
      </div>

      <div
        onClick={() => handleContactInfoSave()}
        className="flex flex-col w-[80%] p-3 cursor-pointer items-center ml-[5%] font-semibold text-sm rounded mt-8 bg-[#363435]"
      >
        CONTINUE TO SHIPPING
      </div>
    </div>
  );
};

export default ContactInfo;
