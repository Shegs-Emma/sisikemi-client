"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineChevronDown } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useOfflineCartStore } from "@/store/offlineCartStore";
import { shallow } from "zustand/shallow";
import { useCartStore } from "@/store/cartStore";
import { GoChevronDown } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import useLogout from "@/utils/useLogout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LogoutPopup from "../popups/logoutPopup";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout, isLoading } = useLogout();
  const [isToken, setIsToken] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isShowingProfileOption, setIsShowingProfileOption] =
    useState<boolean>(false);
  const [activePath, setActivePath] = useState<string>("new-in");

  useEffect(() => {
    if (currentUrl) {
      const currentlyViewing = currentUrl?.split("/")[3];

      setActivePath(currentlyViewing);
    }
  }, [currentUrl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (isToken) {
      handleCartFetch();
    }
  }, [isToken]);

  useEffect(() => {
    const token = getCookie("accessToken");

    if (token) {
      setIsToken(token);
    }
  }, []);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { offlineCart } = useOfflineCartStore(
    (state: any) => ({
      offlineCart: state.offlineCart,
    }),
    shallow
  );

  const { cart, fetchCart } = useCartStore(
    (state: any) => ({
      cart: state.cart,
      fetchCart: state.fetchCart,
    }),
    shallow
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const handleCartFetch = async () => {
    try {
      const payload = {
        page_id: "1",
        page_size: "10",
      };

      const response = await fetchCart(payload);

      if (!response?.cart?.length) {
        return;
      }

      return response.product;
    } catch (err) {
      return err;
    }
  };

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
          <Link href="/new-in">
            <h4
              className={`font-montserrat ${
                activePath === "new-in" ? "text-[#fdcb2a]" : "text-[#333333]"
              } font-medium text-xs md:text-sm cursor-pointer`}
            >
              NEW IN
            </h4>
          </Link>
          <Link href="/shop">
            <h4
              className={`font-montserrat ${
                activePath === "shop" ? "text-[#fdcb2a]" : "text-[#333333]"
              } font-medium text-xs md:text-sm cursor-pointer`}
            >
              SHOP
            </h4>
          </Link>
          <Link href="/sale">
            <h4
              className={`font-montserrat ${
                activePath === "sale" ? "text-[#fdcb2a]" : "text-[#333333]"
              } font-medium text-xs md:text-sm cursor-pointer`}
            >
              SALE
            </h4>
          </Link>
          <Link href="/rtw">
            <h4
              className={`font-montserrat ${
                activePath === "rtw" ? "text-[#fdcb2a]" : "text-[#333333]"
              } font-medium text-xs md:text-sm cursor-pointer`}
            >
              RTW
            </h4>
          </Link>
          <Link href="/collections">
            <h4
              className={`font-montserrat ${
                activePath === "collections"
                  ? "text-[#fdcb2a]"
                  : "text-[#333333]"
              } font-medium text-xs md:text-sm cursor-pointer`}
            >
              COLLECTIONS
            </h4>
          </Link>
          <Link href="/bridal">
            <h4
              className={`font-montserrat ${
                activePath === "bridal" ? "text-[#fdcb2a]" : "text-[#333333]"
              } font-medium text-xs md:text-sm cursor-pointer`}
            >
              BRIDAL
            </h4>
          </Link>
        </div>

        {isToken && (
          <div className="flex justify-between w-[20%]">
            <div className="flex flex-row">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] mt-4">
                NGN N
              </p>
              <HiOutlineChevronDown className="text-[#4f4f4f] relative top-[1rem] ml-[0.7rem]" />
            </div>
            <div className="flex justify-between w-full md:w-[65%]">
              <>
                <FiSearch
                  className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem]"
                  size={25}
                />
                <div className="flex">
                  {cart && cart?.length ? (
                    <div className="rounded-[50%] bg-[#363435] flex justify-center items-center absolute text-[#ffffff] font-bold h-[20px] w-[20px] text-xs font-montserrat">
                      {cart?.length}
                    </div>
                  ) : null}
                  <AiOutlineShoppingCart
                    onClick={() => router.push("/cart")}
                    className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem] cursor-pointer"
                    size={25}
                  />
                </div>
              </>
              <div className="flex cursor-pointer">
                <CgProfile
                  onClick={() =>
                    setIsShowingProfileOption(!isShowingProfileOption)
                  }
                  className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem]"
                  size={25}
                />

                <GoChevronDown className="text-[#363435] mt-[1rem]" />

                {isShowingProfileOption && (
                  <div className="absolute z-10 mt-[3rem] mr-[1.5rem] cursor-pointer">
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333] relative bottom-[5px] left-[1.2rem]"></div>
                    <div className="w-[280px] p-5 rounded bg-[#333333] flex flex-col justify-center relative right-[13.5rem] bottom-[5px]">
                      <div className="flex justify-between border-b-[1px] border-b-[#c4c4c4] pb-5">
                        <div className="rounded">
                          <Image
                            src="/images/profile.svg"
                            alt="cart_img"
                            width={64}
                            height={64}
                          />
                        </div>
                        <div className="flex flex-col mt-3">
                          <p className="font-montserrat font-normal text-sm text-[#ffffff] mb-1">
                            Joy Uwangue
                          </p>
                          <p className="font-montserrat font-normal text-xs italic text-[#ffffff]">
                            joyuwangue1@gmail.com
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col mt-6">
                        <div className="flex pl-4 mb-6">
                          <AiOutlineSetting
                            size={20}
                            className="mt-[2px] mr-4"
                          />
                          <p className="font-montserrat font-normal text-base text-[#ffffff]">
                            Profile Settings
                          </p>
                        </div>

                        <div
                          onClick={() => {
                            setIsOpen(true);
                            setIsShowingProfileOption(!isShowingProfileOption);
                          }}
                          className="flex px-4 py-2 bg-custom-radial rounded-sm"
                        >
                          <IoExitOutline size={20} className="mt-[2px] mr-4" />
                          <p className="font-montserrat font-normal text-base text-[#ffffff]">
                            Log Out
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!isToken && (
          <div className="flex justify-between w-[25%]">
            <div className="flex flex-row">
              <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] mt-4">
                NGN N
              </p>
              <HiOutlineChevronDown className="text-[#4f4f4f] relative top-[1rem] ml-[0.7rem]" />
            </div>
            <div className="flex justify-between w-full md:w-[75%]">
              <>
                <FiSearch
                  className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem]"
                  size={25}
                />

                <div className="flex">
                  {offlineCart && offlineCart?.length ? (
                    <div className="rounded-[50%] bg-[#363435] flex justify-center items-center absolute text-[#ffffff] font-bold h-[20px] w-[20px] text-xs font-montserrat">
                      {offlineCart?.length}
                    </div>
                  ) : null}
                  <AiOutlineShoppingCart
                    onClick={() => router.push("/cart")}
                    className="text-[#4f4f4f] relative top-[0.7rem] ml-[0.7rem] cursor-pointer"
                    size={25}
                  />
                </div>

                <div className="w-[110px] h-[34px] rounded-[28px] py-[8px] bg-[#1e1e1e] mt-2 cursor-pointer">
                  <p
                    onClick={() => router.push("/login")}
                    className="font-montserrat text-[#ffffff] font-normal text-sm text-center"
                  >
                    Log In
                  </p>
                </div>
              </>
            </div>
          </div>
        )}
      </div>

      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="bg-[#ffffff]">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <LogoutPopup
                  logout={logout}
                  isLoading={isLoading}
                  setIsOpen={setIsOpen}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
