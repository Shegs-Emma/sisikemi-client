"use client";

import React, { FC, useEffect, useState, useTransition } from "react";
import RecentlyViewed from "@/components/reusebles/recentlyViewed";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/productStore";
import { ProductResponseInterface } from "@/utils/interface";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import { shallow } from "zustand/shallow";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { twMerge } from "tailwind-merge";
import { sizes } from "@/utils/constants";
import { useRouter } from "next/navigation";

const NewIn: FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [fetchedProducts, setFetchedProducts] =
    useState<ProductResponseInterface>();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const ITEMS_PER_PAGE = 10;
  const currentPage = 1;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { fetchProducts } = useProductStore(
    (state: any) => ({
      fetchProducts: state.fetchProducts,
    }),
    shallow
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    handleProductsFetch();
  }, []);

  const handleProductsFetch = async () => {
    startTransition(async () => {
      try {
        const payload = {
          page_id: currentPage.toString(),
          page_size: ITEMS_PER_PAGE.toString(),
        };

        const response = await fetchProducts(payload);

        if (!response?.product?.length) {
          return toast.error("Products could not be fetched");
        }

        setFetchedProducts(response);

        return response.product;
      } catch (err) {
        return err;
      }
    });
  };

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

        <Select onValueChange={(value: string) => setSelectedSize(value)}>
          <SelectTrigger
            className={twMerge(
              "w-[104px] bg-transparent h-[36px] px-[15px] py-[10px] border-[0.8px] border-[#C4C4C4] flex justify-between rounded font-semibold text-xs text-[#363435] font-montserrat outline-0 cursor-pointer my-0 mx-auto"
            )}
          >
            <SelectValue
              className="font-montserrat font-semibold text-xs text-[#4f4f4f] m-0"
              placeholder={selectedSize ? selectedSize : "SIZE"}
            />
          </SelectTrigger>
          <SelectContent
            className={twMerge("border-none bg-transparent shadow-none")}
          >
            <div className="h-full max-h-60 overflow-y-scroll  bg-[#ffffff] text-[#363435] shadow-lg w-[124px] rounded">
              {sizes?.length &&
                sizes?.map((size, idx) => (
                  <SelectItem key={idx} value={size?.id.toString()}>
                    {size.name.toUpperCase()}
                  </SelectItem>
                ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      {isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col w-full border-b-[0.5px] border-b-[#4f4f4f] pb-[7rem]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-14 px-[1.5rem] py-0">
            {fetchedProducts?.product?.length
              ? fetchedProducts?.product?.map(
                  (product, idx) =>
                    product?.quantity > 0 && (
                      <div
                        onClick={() => router.push(`/new-in/${product?.id}`)}
                        key={idx}
                        className="flex flex-col cursor-pointer h-[420px] w-full"
                      >
                        {/* IMAGE WRAPPER WITH FIXED HEIGHT */}
                        <div className="h-[390px] w-full overflow-hidden flex justify-center">
                          <Image
                            src={product?.product_image_main?.media_id?.url}
                            alt="section_img"
                            width={280}
                            height={506}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* TEXT AREA */}
                        <div className="flex flex-col text-center mt-3">
                          <p className="font-montserrat font-semibold text-xs text-[#4f4f4f]">
                            {product?.product_name.toUpperCase()}
                          </p>
                          <p className="font-montserrat font-semibold text-xs text-[#4f4f4f]">
                            {`₦${Number(product?.price).toLocaleString()}`}
                          </p>
                        </div>
                      </div>
                    )
                )
              : null}
          </div>
        </div>
      )}

      <RecentlyViewed title="RECENTLY VIEWED" />
    </div>
  );
};

export default NewIn;
