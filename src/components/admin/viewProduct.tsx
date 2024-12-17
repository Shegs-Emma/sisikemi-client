"use client";

import React, { FC, useEffect, useState, useTransition } from "react";
import { FaArrowLeftLong, FaTrash } from "react-icons/fa6";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { BsCurrencyDollar, BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import { shallow } from "zustand/shallow";
import { toast } from "sonner";
import { ProductInterface } from "@/utils/interface";
import { TbCurrencyNaira } from "react-icons/tb";

interface ProductProps {
  id: string | string[] | undefined;
}

const ViewProduct: FC<ProductProps> = ({ id }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { getProduct, product, updateProduct, deleteProduct } = useProductStore(
    (state: any) => ({
      getProduct: state.getProduct,
      product: state.product,
      updateProduct: state.updateProduct,
      deleteProduct: state.deleteProduct,
    }),
    shallow
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const [isShowingMainOption, setIsShowingMainOption] =
    useState<boolean>(false);
  const [isShowingOther1Option, setIsShowingOther1Option] =
    useState<boolean>(false);
  const [isShowingOther2Option, setIsShowingOther2Option] =
    useState<boolean>(false);
  const [isShowingOther3Option, setIsShowingOther3Option] =
    useState<boolean>(false);

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState<string>(
    (product && product?.product_description) || ""
  );
  const [dollarPrice, setDollarPrice] = useState<number>();
  const [saleDollarPrice, setSaleDollarPrice] = useState<number>();
  const [fetchedProduct, setFetchedProduct] = useState<ProductInterface>();

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState({
    product_name: (product && product?.product_name) || "",
    product_description: (product && product?.product_description) || "",
    product_code: (product && product?.product_code) || "",
    price: (product && product?.price) || "",
    sale_price: (product && product?.sale_price) || "",
    collection: (product && product?.collection?.collection_name) || 0,
    quantity: (product && product?.quantity) || 1,
    color: (product && product?.color) || "",
    size: (product && product?.size) || "",
    status: (product && product?.status) || "",
    main_image: "",
    other_image_1: "",
    other_image_2: "",
    other_image_3: "",
  });

  useEffect(() => {
    if (id) {
      handleFetch();
    }
  }, [id]);

  useEffect(() => {
    if (formValues.price) {
      const formatted = formValues.price.split(",").join("");
      const updatedDollarPrice = (Number(formatted) / 1618.81).toFixed(2);
      setDollarPrice(+updatedDollarPrice);
    }

    if (formValues.sale_price) {
      const formattedSale = formValues.sale_price.split(",").join("");
      const updatedSaleDollarPrice = (Number(formattedSale) / 1618.81).toFixed(
        2
      );
      setSaleDollarPrice(+updatedSaleDollarPrice);
    }
  }, [formValues.price, formValues.sale_price]);

  const handleFetch = async () => {
    startTransition(async () => {
      try {
        if (id) {
          const response = await getProduct(id);

          if (!response?.product) {
            return toast.error("Product could not be fetched");
          }

          setFetchedProduct(response.product);
          return response.product;
        }
      } catch (err) {
        return err;
      }
    });
  };

  const handleUpdateProductStatus = async (status: string) => {
    try {
      const toastId = toast.loading("Updated product status");
      if (product) {
        const payload = {
          product_id: product?.id,
          status,
        };
        const response = await updateProduct(payload);

        if (!response?.product) {
          return toast.error("Product status could not be updated", {
            id: toastId,
          });
        }

        handleFetch();
        return toast.error("Product status updated", { id: toastId });
      }
    } catch (err) {
      return err;
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const toastId = toast.loading("Deleting product");
      if (product) {
        const response = await deleteProduct(product?.id);

        if (!response) {
          return toast.error("Product could not be deleted", {
            id: toastId,
          });
        }

        toast.error(response, { id: toastId });
        return router.push("/admin/product");
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="w-full z-10 mt-10 flex flex flex-col">
      <div className="w-full flex px-10 pt-4 pb-10 border-b-[1px] border-b-[#e0e0e0]">
        <FaArrowLeftLong
          color="#363435"
          className="mt-1 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="font-lato text-xl font-semibold text-[#363435] ml-4">
          View Product
        </p>
      </div>

      {isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full px-10 flex sm:flex-row flex-col justify-between">
          <div className="w-full sm:w-[50%] flex flex-col mt-12">
            <div className="mb-8">
              <Label
                htmlFor="product_name"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Product name
              </Label>
              <Input
                type="text"
                name="product_name"
                //   onChange={handleChange}
                value={formValues?.product_name}
                className={twMerge(
                  "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full sm:w-[80%] p-2 text-[#363435]"
                )}
                //   isError={errorFields.firstName}
                readOnly
              />
            </div>

            <div className="mb-8">
              <Label
                htmlFor="product_description"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Product description
              </Label>
              <textarea
                name="product_description"
                //   onChange={handleChange}
                value={description}
                className={twMerge(
                  "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full sm:w-[80%] p-2 text-[#363435]"
                )}
                //   isError={errorFields.firstName}
                readOnly
              ></textarea>
            </div>

            <div className="mb-8 space-y-1">
              <Label
                htmlFor="productCollection"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Product collection
              </Label>
              <Select
              //   onValueChange={(value: string) =>
              //     setFormValues({ ...formValues, subscriptionId: value })
              //   }
              >
                <SelectTrigger
                  className={twMerge(
                    "w-full sm:w-[80%] border-[#bdbdbd] bg-transparent text-[#363435] focus:ring-grocedy_primary_color focus-visible:ring-[1.5px]"
                  )}
                >
                  <SelectValue
                    placeholder={
                      formValues?.collection ? formValues?.collection : ""
                    }
                  />
                </SelectTrigger>
                <SelectContent className={twMerge("")}>
                  <div className="h-full max-h-60 overflow-y-scroll scrollbar-thumb-[#00534F]/40 scrollbar-thin scrollbar-track-gray-200 w-full sm:w-[80%]">
                    {/* {fetchedSubListOffline?.map((item, idx) => (
                    <SelectItem
                      key={idx}
                      value={item?.subscription_id?.toString()}
                    >
                      {item?.subscription_name}
                    </SelectItem>
                  ))} */}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-8">
              <Label
                htmlFor="product_code"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Product code
              </Label>
              <Input
                type="text"
                name="product_code"
                //   onChange={handleChange}
                value={formValues?.product_code}
                className={twMerge(
                  "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full sm:w-[80%] p-2 text-[#363435]"
                )}
                //   isError={errorFields.firstName}
                readOnly
              />
            </div>

            <div className="flex justify-between w-full sm:w-[80%]">
              <div className="mb-8 w-[50%]">
                <Label
                  htmlFor="price"
                  className={twMerge(
                    "font-lato font-medium text-sm text-[#363435]"
                  )}
                >
                  Product price naira
                </Label>
                <div className="flex mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435] w-[90%]">
                  <TbCurrencyNaira size={20} className="mt-[9px] ml-2" />
                  <Input
                    type="text"
                    name="price"
                    // onChange={handleChange}
                    value={formValues?.price}
                    // onKeyDown={handleKeyDown}
                    className={twMerge(
                      "placeholder:text-[#363435] placeholder:text-sm rounded-lg w-[80%] p-2 text-[#363435] w-[90%] outline-none"
                    )}
                    readOnly
                    //   isError={errorFields.firstName}
                  />
                </div>
              </div>

              <div className="mb-8 w-[50%]">
                <Label
                  htmlFor="productPriceDollar"
                  className={twMerge(
                    "font-lato font-medium text-sm text-[#363435]"
                  )}
                >
                  Product price Dollar
                </Label>
                <div className="flex mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435] w-[90%]">
                  <BsCurrencyDollar size={18} className="mt-[9px] ml-2" />
                  <Input
                    type="number"
                    name="productSalesPriceDollar"
                    value={dollarPrice}
                    className={twMerge(
                      "placeholder:text-[#363435] placeholder:text-sm rounded-lg w-[80%] p-2 text-[#363435] w-[90%] outline-none"
                    )}
                    readOnly
                    //   isError={errorFields.firstName}
                  />
                </div>
              </div>
            </div>

            <h2 className="font-medium text-xl font-lato text-[#363435] mb-6">
              Sales
            </h2>

            <div className="flex justify-between w-full sm:w-[80%]">
              <div className="mb-8 w-[50%]">
                <Label
                  htmlFor="sale_price"
                  className={twMerge(
                    "font-lato font-medium text-xs sm:text-sm text-[#363435]"
                  )}
                >
                  Product sales price naira
                </Label>
                <div className="flex mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435] w-[90%]">
                  <TbCurrencyNaira size={20} className="mt-[9px] ml-2" />
                  <Input
                    type="text"
                    name="sale_price"
                    // onChange={handleChange}
                    value={formValues?.sale_price}
                    // onKeyDown={handleKeyDown}
                    className={twMerge(
                      "placeholder:text-[#363435] placeholder:text-sm rounded-lg w-[80%] p-2 text-[#363435] w-[90%] outline-none"
                    )}
                    //   isError={errorFields.firstName}
                  />
                </div>
              </div>

              <div className="mb-8 w-[50%]">
                <Label
                  htmlFor="productSalesPriceDollar"
                  className={twMerge(
                    "font-lato font-medium text-xs sm:text-sm text-[#363435]"
                  )}
                >
                  Product sales price Dollar
                </Label>
                <div className="flex mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435] w-[90%]">
                  <BsCurrencyDollar size={18} className="mt-[9px] ml-2" />
                  <Input
                    type="number"
                    name="productSalesPriceDollar"
                    value={saleDollarPrice}
                    className={twMerge(
                      "placeholder:text-[#363435] placeholder:text-sm rounded-lg w-[80%] p-2 text-[#363435] w-[90%] outline-none"
                    )}
                    readOnly
                    //   isError={errorFields.firstName}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-[50%] sm:bg-[#fafafa] sm:pt-8 sm:pb-12 sm:px-12 text-[#363435] mt-4">
            <div className="flex flex-col">
              <p className="font-lato text-sm font-medium text-[#4f4f4f] mb-2">
                Main Image
              </p>
              <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9]">
                {isShowingMainOption ? (
                  <div className="absolute z-10 mb-[0.1rem] ml-[8.5rem] cursor-pointer">
                    <BsThreeDots
                      color="#ffffff"
                      onClick={() =>
                        setIsShowingMainOption(!isShowingMainOption)
                      }
                    />
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                    <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                      <p className="font-lato text-sm font-normal text-[#ffffff] mb-3">
                        Replace
                      </p>
                      <p className="font-lato text-sm font-normal text-[#ffffff]">
                        Delete
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute z-10 mb-[5rem] ml-[4.5rem] cursor-pointer">
                    <BsThreeDots
                      color="#ffffff"
                      onClick={() =>
                        setIsShowingMainOption(!isShowingMainOption)
                      }
                    />
                  </div>
                )}
                <Image
                  src={
                    fetchedProduct?.product_image_main?.media_id?.url
                      ? fetchedProduct?.product_image_main?.media_id?.url
                      : ""
                  }
                  alt="section_img"
                  width={180}
                  height={180}
                />
              </div>
            </div>

            <div className="flex flex-col mt-6">
              <p className="font-lato text-sm font-medium text-[#4f4f4f] mb-2">
                Other Images
              </p>
              <div className="flex">
                <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] mr-4">
                  {isShowingOther1Option ? (
                    <div className="absolute z-10 mb-[0.1rem] ml-[8.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() =>
                          setIsShowingOther1Option(!isShowingOther1Option)
                        }
                      />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                      <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                        <p className="font-lato text-sm font-normal text-[#ffffff] mb-3">
                          Replace
                        </p>
                        <p className="font-lato text-sm font-normal text-[#ffffff]">
                          Delete
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute z-10 mb-[5rem] ml-[4.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() =>
                          setIsShowingOther1Option(!isShowingOther1Option)
                        }
                      />
                    </div>
                  )}
                  <Image
                    src={
                      fetchedProduct?.product_image_other_1?.media_id?.url
                        ? fetchedProduct?.product_image_other_1?.media_id?.url
                        : ""
                    }
                    alt="section_img"
                    width={180}
                    height={180}
                  />
                </div>
                <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] mr-4">
                  {isShowingOther2Option ? (
                    <div className="absolute z-10 mb-[0.1rem] ml-[8.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() =>
                          setIsShowingOther2Option(!isShowingOther2Option)
                        }
                      />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                      <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                        <p className="font-lato text-sm font-normal text-[#ffffff] mb-3">
                          Replace
                        </p>
                        <p className="font-lato text-sm font-normal text-[#ffffff]">
                          Delete
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute z-10 mb-[5rem] ml-[4.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() =>
                          setIsShowingOther2Option(!isShowingOther2Option)
                        }
                      />
                    </div>
                  )}
                  <Image
                    src={
                      fetchedProduct?.product_image_other_2?.media_id?.url
                        ? fetchedProduct?.product_image_other_2?.media_id?.url
                        : ""
                    }
                    alt="section_img"
                    width={180}
                    height={180}
                  />
                </div>
                <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] mr-4">
                  {isShowingOther3Option ? (
                    <div className="absolute z-10 mb-[0.1rem] ml-[8.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() =>
                          setIsShowingOther3Option(!isShowingOther3Option)
                        }
                      />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                      <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                        <p className="font-lato text-sm font-normal text-[#ffffff] mb-3">
                          Replace
                        </p>
                        <p className="font-lato text-sm font-normal text-[#ffffff]">
                          Delete
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute z-10 mb-[5rem] ml-[4.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() =>
                          setIsShowingOther3Option(!isShowingOther3Option)
                        }
                      />
                    </div>
                  )}
                  <Image
                    src={
                      fetchedProduct?.product_image_other_3?.media_id?.url
                        ? fetchedProduct?.product_image_other_3?.media_id?.url
                        : ""
                    }
                    alt="section_img"
                    width={180}
                    height={180}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-6">
              <div className="mb-8">
                <Label
                  htmlFor="quantity"
                  className={twMerge(
                    "font-lato font-medium text-sm text-[#363435]"
                  )}
                >
                  Input Quantity
                </Label>
                <Input
                  type="text"
                  name="quantity"
                  //   onChange={handleChange}
                  value={formValues?.quantity}
                  className={twMerge(
                    "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
                  )}
                  readOnly
                  //   isError={errorFields.firstName}
                />
              </div>
            </div>

            <div className="mb-8 space-y-1">
              <Label
                htmlFor="color"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Select Color
              </Label>
              <Select
              //   onValueChange={(value: string) =>
              //     setFormValues({ ...formValues, subscriptionId: value })
              //   }
              >
                <SelectTrigger
                  className={twMerge(
                    "w-full border-[#bdbdbd] bg-transparent text-[#363435] focus:ring-grocedy_primary_color focus-visible:ring-[1.5px]"
                  )}
                >
                  <SelectValue placeholder={"Selected Colors"} />
                </SelectTrigger>
                <SelectContent className={twMerge("")}>
                  <div className="h-full max-h-60 overflow-y-scroll scrollbar-thumb-[#00534F]/40 scrollbar-thin scrollbar-track-gray-200 w-full]">
                    {/* {fetchedSubListOffline?.map((item, idx) => (
                    <SelectItem
                      key={idx}
                      value={item?.subscription_id?.toString()}
                    >
                      {item?.subscription_name}
                    </SelectItem>
                  ))} */}
                  </div>
                </SelectContent>
              </Select>
              <div className="flex">
                {product && product?.color?.length
                  ? product?.color?.map((colr: string, idx: number) => (
                      <div
                        key={idx}
                        // onClick={() => handleRemoveFromColorArray(color)}
                        className="cursor-pointer text-xs text-[#363435] border-[0.5px] border-[#bdbdbd] p-1 rounded mr-2 mt-2"
                      >
                        {colr}
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <div className="mb-8 space-y-1">
              <Label
                htmlFor="size"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Select Size
              </Label>
              <Select
              //   onValueChange={(value: string) =>
              //     setFormValues({ ...formValues, subscriptionId: value })
              //   }
              >
                <SelectTrigger
                  className={twMerge(
                    "w-full border-[#bdbdbd] bg-transparent text-[#363435] focus:ring-grocedy_primary_color focus-visible:ring-[1.5px]"
                  )}
                >
                  <SelectValue placeholder={"Selected Sizes"} />
                </SelectTrigger>
                <SelectContent className={twMerge("")}>
                  <div className="h-full max-h-60 overflow-y-scroll scrollbar-thumb-[#00534F]/40 scrollbar-thin scrollbar-track-gray-200 w-full]">
                    {/* {fetchedSubListOffline?.map((item, idx) => (
                    <SelectItem
                      key={idx}
                      value={item?.subscription_id?.toString()}
                    >
                      {item?.subscription_name}
                    </SelectItem>
                  ))} */}
                  </div>
                </SelectContent>
              </Select>
              <div className="flex">
                {product && product?.size?.length
                  ? product?.size?.map((siz: string, idx: number) => (
                      <div
                        key={idx}
                        // onClick={() => handleRemoveFromColorArray(color)}
                        className="cursor-pointer text-xs text-[#363435] border-[0.5px] border-[#bdbdbd] p-1 rounded mr-2 mt-2"
                      >
                        {siz}
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <div className="flex bg-[#e0e0e0] p-10">
              <div
                onClick={() => handleDeleteProduct()}
                className="flex w-[120px] h-[48px] rounded-sm justify-center items-center cursor-pointer bg-[#C80B0B]"
              >
                <FaTrash color="#f2f2f2" />
                <p className="font-lato font-normal text-base text-[#f2f2f2] ml-2">
                  Delete
                </p>
              </div>

              {product?.status === "active" ? (
                <div
                  onClick={() => handleUpdateProductStatus("archived")}
                  className="flex w-[120px] h-[48px] rounded-sm justify-center border-[0.8px] items-center border-[#4f4f4f] bg-[#4f4f4f] ml-6 cursor-pointer"
                >
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
              ) : (
                <div
                  onClick={() => handleUpdateProductStatus("active")}
                  className="flex w-[120px] h-[48px] rounded-sm justify-center border-[0.8px] items-center border-[#4f4f4f] bg-[#4f4f4f] ml-6 cursor-pointer"
                >
                  <Image
                    src="/assets/save.svg"
                    alt="avatar_img"
                    width={20}
                    height={22}
                  />
                  <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
                    Activate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
