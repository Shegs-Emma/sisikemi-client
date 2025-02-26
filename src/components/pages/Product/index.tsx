"use client";

import React, { FC, useEffect, useState, useTransition } from "react";
import RecentlyViewed from "@/components/reusebles/recentlyViewed";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import { TbHanger } from "react-icons/tb";
import { useProductStore } from "@/store/productStore";
import { shallow } from "zustand/shallow";
import { CartItemInterface, ProductInterface } from "@/utils/interface";
import { toast } from "sonner";
import { colors, sizes } from "@/utils/constants";
import { useOfflineCartStore } from "@/store/offlineCartStore";
import { decrement, increment } from "@/utils/functions";
import { useCartStore } from "@/store/cartStore";
import { getCookie } from "cookies-next";

interface ProductProps {
  id: string | string[] | undefined;
}

const Product: FC<ProductProps> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const [isViewing, setIsViewing] = useState<string>("");
  const [currentImg, setCurrentImg] = useState<string>("");
  const [selectedSizeId, setSelectedSizeId] = useState<number>(0);
  const [selectedColorId, setSelectedColorId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [fetchedProduct, setFetchedProduct] = useState<ProductInterface>();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [fetchedCartItems, setFetchedCartItems] = useState([]);

  const token = !!getCookie("accessToken");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { getProduct } = useProductStore(
    (state: any) => ({
      getProduct: state.getProduct,
    }),
    shallow
  );

  const { addToCart, offlineCart, removeFromCart } = useOfflineCartStore(
    (state: any) => ({
      addToCart: state.addToCart,
      offlineCart: state.offlineCart,
      removeFromCart: state.removeFromCart,
    }),
    shallow
  );

  const { createCartItem, fetchCart } = useCartStore(
    (state: any) => ({
      createCartItem: state.createCartItem,
      fetchCart: state.fetchCart,
    }),
    shallow
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    if (id) {
      handleFetch();
    }
  }, [id]);

  useEffect(() => {
    if (offlineCart?.length && fetchedProduct?.product_ref_no) {
      const isExists = offlineCart.some(
        (prod: CartItemInterface) => +prod?.product_id === +fetchedProduct?.id
      );

      setIsAddedToCart(isExists);
    }
  }, [offlineCart, fetchedProduct?.product_ref_no]);

  useEffect(() => {
    if (fetchedCartItems?.length && fetchedProduct?.product_ref_no) {
      const isExists = fetchedCartItems.some(
        (prod: CartItemInterface) => +prod?.product_id === +fetchedProduct?.id
      );

      setIsAddedToCart(isExists);
    }
  }, [fetchedCartItems, fetchedProduct?.product_ref_no]);

  useEffect(() => {
    if (isViewing) {
      setCurrentImg(isViewing);
    }
  }, [isViewing]);

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

  const handleCurrentView = (url: string) => {
    setIsViewing(url);
  };

  const handleAddToCart = () => {
    const sizeSelect = sizes.filter((size) => size.id === selectedSizeId).pop();
    const colorSelect = colors
      .filter((color) => color.id === selectedColorId)
      .pop();
    const payload = {
      product_id: Number(fetchedProduct?.id),
      product_name: fetchedProduct?.product_name,
      product_image: fetchedProduct?.product_image_main?.media_id?.url,
      product_price: fetchedProduct?.price,
      product_quantity: quantity,
      product_size: sizeSelect?.name,
      product_color: colorSelect?.name,
    };

    const response = addToCart(payload);

    toast.success("Item added to cart!");
    return response;
  };

  const handleCart = async () => {
    const toastId = toast.loading("Adding cart item");
    try {
      const sizeSelect = sizes
        .filter((size) => size.id === selectedSizeId)
        .pop();
      const colorSelect = colors
        .filter((color) => color.id === selectedColorId)
        .pop();

      const payload = {
        product_id: Number(fetchedProduct?.id),
        product_name: fetchedProduct?.product_name,
        product_image: fetchedProduct?.product_image_main?.media_id?.url,
        product_price: fetchedProduct?.price,
        product_quantity: quantity,
        product_size: sizeSelect?.name,
        product_color: colorSelect?.name,
      };

      const response = await createCartItem(payload);

      if (!response?.cart) {
        toast.error("Cart item could not be created", {
          id: toastId,
        });
      }

      toast.success("Cart item added", {
        id: toastId,
      });

      handleCartFetch();
    } catch (err) {
      toast.error("An error occurred while syncing the cart", {
        id: toastId,
      });
      console.error(err);
      return err;
    }
  };

  const handleCartFetch = async () => {
    try {
      const payload = {
        page_id: "1",
        page_size: "10",
      };

      const response = await fetchCart(payload);

      if (!response?.cart?.length) {
        return toast.error("Cart could not be fetched");
      }

      setFetchedCartItems(response?.cart);
      return response.cart;
    } catch (err) {
      return err;
    }
  };

  const handleRemoveFromCart = () => {
    const removed = removeFromCart(fetchedProduct?.product_ref_no);

    toast.success("Item removed from cart!");
    setIsAddedToCart(false);
    return removed;
  };

  return (
    <div className="w-full flex flex-col p-0 md:pt-[7rem]">
      <div className="flex my-[4rem] mx-[2rem]">
        <h3 className="font-montserrat font-normal text-xs sm:text-lg text-[#4f4f4f] m-0 p-0 ">
          Home Page
        </h3>
        <BiChevronRight color="#363435" size={24} />
        <h3 className="font-montserrat font-normal text-xs sm:text-lg text-[#4f4f4f] m-0 p-0 ">
          Product Page
        </h3>
      </div>

      {isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full px-[2rem] pb-[15rem] flex justify-between border-b-[0.5px] border-b-[#4f4f4f]">
          <div className="w-[47%] flex justify-between">
            <div className="flex flex-col w-[15%]">
              <div className="mb-[0.9rem]">
                <Image
                  src={
                    fetchedProduct &&
                    fetchedProduct?.product_image_main?.media_id?.url
                      ? fetchedProduct?.product_image_main?.media_id?.url
                      : ""
                  }
                  alt="section_img"
                  className="cursor-pointer"
                  width={60}
                  height={86}
                  onClick={() =>
                    handleCurrentView(
                      fetchedProduct?.product_image_main?.media_id?.url
                        ? fetchedProduct?.product_image_main?.media_id?.url
                        : ""
                    )
                  }
                />
              </div>
              <div className="mb-[0.9rem]">
                <Image
                  src={
                    fetchedProduct &&
                    fetchedProduct?.product_image_other_1?.media_id?.url
                      ? fetchedProduct?.product_image_other_1?.media_id?.url
                      : ""
                  }
                  alt="section_img"
                  className="cursor-pointer"
                  width={60}
                  height={86}
                  onClick={() =>
                    handleCurrentView(
                      fetchedProduct?.product_image_other_1?.media_id?.url
                        ? fetchedProduct?.product_image_other_1?.media_id?.url
                        : ""
                    )
                  }
                />
              </div>
              <div className="mb-[0.9rem]">
                <Image
                  src={
                    fetchedProduct &&
                    fetchedProduct?.product_image_other_2?.media_id?.url
                      ? fetchedProduct?.product_image_other_2?.media_id?.url
                      : ""
                  }
                  alt="section_img"
                  className="cursor-pointer"
                  width={60}
                  height={86}
                  onClick={() =>
                    handleCurrentView(
                      fetchedProduct?.product_image_other_2?.media_id?.url
                        ? fetchedProduct?.product_image_other_2?.media_id?.url
                        : ""
                    )
                  }
                />
              </div>
              <div className="mb-[0.9rem]">
                <Image
                  src={
                    fetchedProduct &&
                    fetchedProduct?.product_image_other_3?.media_id?.url
                      ? fetchedProduct?.product_image_other_3?.media_id?.url
                      : ""
                  }
                  alt="section_img"
                  className="cursor-pointer"
                  width={60}
                  height={86}
                  onClick={() =>
                    handleCurrentView(
                      fetchedProduct?.product_image_other_3?.media_id?.url
                        ? fetchedProduct?.product_image_other_3?.media_id?.url
                        : ""
                    )
                  }
                />
              </div>
            </div>
            <div className="flex flex-col w-[80%]">
              <Image
                src={
                  currentImg
                    ? currentImg
                    : fetchedProduct?.product_image_main?.media_id?.url
                    ? fetchedProduct?.product_image_main?.media_id?.url
                    : ""
                }
                alt="section_img"
                width={560}
                height={810}
              />
            </div>
          </div>

          <div className="w-[47%] flex flex-col">
            <div className="w-full flex flex-col">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] mb-[0.4rem]">
                SISI KEMI
              </p>
              <h3 className="font-montserrat font-semibold text-xs sm:text-lg text-[#4f4f4f] m-0 p-0 ">
                {fetchedProduct && fetchedProduct?.product_name
                  ? fetchedProduct?.product_name?.toUpperCase()
                  : ""}
              </h3>
              <h3 className="font-montserrat font-medium text-xs sm:text-lg text-[#4f4f4f] my-[0.4rem] p-0 ">
                {fetchedProduct && fetchedProduct?.price
                  ? `₦ ${Number(fetchedProduct?.price).toLocaleString()}`
                  : ""}
              </h3>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-[7.875rem] border-[0.4px] border-[#828282] rounded pt-[10px] px-[12px] pb-[5px] flex justify-between my-[0.5rem] ml-auto">
                <TbHanger color="#4F4F4F" size={20} />
                <span className="font-montserrat font-medium text-sm text-[#363435] w-[50%] sm:w-full text-center pb-[0.5rem]">
                  Size Guide
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col my-[0.45rem]">
                <span className="font-montserrat font-medium text-sm text-[#363435] w-[50%] sm:w-full text-left pb-[0.5rem]">
                  Size
                </span>

                <div className="w-[60%] flex">
                  {fetchedProduct && fetchedProduct?.size?.length
                    ? fetchedProduct?.size.map((size, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedSizeId(idx)}
                          className={`py-[14px] w-[3rem] border-[0.4px] mr-2 border-[#828282] rounded font-montserrat font-medium text-sm text-center cursor-pointer ${
                            selectedSizeId === idx
                              ? "bg-[#828282] text-[#F2F2F2]"
                              : "text-[#4f4f4f]"
                          }`}
                        >
                          {size}
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col my-[0.45rem]">
                <span className="font-montserrat font-medium text-sm text-[#363435] w-[50%] sm:w-full text-left pb-[0.5rem]">
                  Color
                </span>

                <div className="w-[70%] flex">
                  {fetchedProduct && fetchedProduct?.color?.length
                    ? fetchedProduct?.color?.map((colr, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedColorId(idx)}
                          className={`py-[14px] w-[5.375rem] mr-2 border-[0.4px] border-[#828282] rounded font-montserrat font-medium text-sm text-center cursor-pointer ${
                            selectedColorId === idx
                              ? "bg-[#828282] text-[#F2F2F2]"
                              : "text-[#4f4f4f]"
                          }`}
                        >
                          {colr}
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col my-[0.45rem]">
                <span className="font-montserrat font-medium text-sm text-[#363435] w-[50%] sm:w-full text-left pb-[0.5rem]">
                  Quantity
                </span>
                <div className="py-[12px] px-[20px] gap-[10px] w-[107px] border-[0.4px] border-[#828282] rounded box-border font-montserrat font-medium text-sm text-[#4f4f4f] flex justify-between">
                  <AiOutlineMinus
                    onClick={() => decrement(setQuantity)}
                    color="#4F4F4F"
                    className="cursor-pointer mt-1"
                  />
                  {quantity}
                  <AiOutlinePlus
                    onClick={() =>
                      fetchedProduct?.quantity &&
                      increment(setQuantity, fetchedProduct?.quantity)
                    }
                    color="#4F4F4F"
                    className="cursor-pointer mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              {!isAddedToCart ? (
                <Button
                  className="w-[8px] sm:w-full h-[43px] px-[24px] py-[8px] border-0 rounded font-semibold text-xs text-[#F2F2F2] font-montserrat bg-[#363435] outline-0 cursor-pointer my-[1rem] mx-auto"
                  type="submit"
                  onClick={() => (!token ? handleAddToCart() : handleCart())}
                >
                  ADD TO CART
                </Button>
              ) : (
                <Button
                  className="w-[8px] sm:w-full h-[43px] px-[24px] py-[8px] border-0 rounded font-semibold text-xs text-[#F2F2F2] font-montserrat bg-[#363435] outline-0 cursor-pointer my-[1rem] mx-auto"
                  type="submit"
                  onClick={() => handleRemoveFromCart()}
                >
                  REMOVE FROM CART
                </Button>
              )}
            </div>

            <div className="w-full flex flex-col">
              <h3 className="font-montserrat font-semibold text-sm sm:text-base text-[#333333] mb-[0.5rem] p-0 ">
                Description
              </h3>
              <h3 className="font-montserrat font-normal text-sm sm:text-base text-[#4f4f4f] mb-[0.5rem] p-0 ">
                {fetchedProduct && fetchedProduct?.product_description
                  ? fetchedProduct?.product_description
                  : ""}
              </h3>
            </div>

            <div className="mt-[1.5rem] w-full flex justify-between box-border rounded pt-[10px] px-[16px] border-[0.8px] border-[#c4c4c4]">
              <h3 className="font-montserrat font-normal text-sm sm:text-base text-[#4f4f4f] mb-[0.5rem] p-0 ">
                MORE INFORMATION
              </h3>

              <BsChevronRight color="#4F4F4F" />
            </div>
          </div>
        </div>
      )}

      <RecentlyViewed title="YOU MAY ALSO LIKE" />

      <RecentlyViewed title="RECENTLY VIEWED" />
    </div>
  );
};

export default Product;
