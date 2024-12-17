"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LogoutPopup from "../popups/logoutPopup";
import useLogout from "@/utils/useLogout";
import { AiOutlineSetting } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";

const AdminNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout, isLoading } = useLogout();
  const [currentUrl, setCurrentUrl] = useState("");
  const [isShowingProfileOption, setIsShowingProfileOption] =
    useState<boolean>(false);
  const [activePath, setActivePath] = useState<string>("product");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (currentUrl) {
      const currentlyViewing = currentUrl?.split("/")[4];
      setActivePath(currentlyViewing);
    }
  }, [currentUrl]);

  return (
    <div className="w-full flex px-10 py-4">
      <div className="w-[80%] flex justify-between">
        <p
          onClick={() => router.push("/admin/product")}
          className={`w-[104px] py-[8px] pl-[20px] opacity-[80%] font-lato text-sm font-normal cursor-pointer ${
            activePath === "product"
              ? "border-[#f2c94c] text-[#fdcb2a]  bg-[rgba(242,201,76,0.2)] rounded border-[1px]"
              : "text-[#333333]"
          }`}
        >
          Products
        </p>

        <p
          onClick={() => router.push("/admin/collection")}
          className={`w-[104px] py-[8px] pl-[15px] opacity-[80%] font-lato text-sm font-normal cursor-pointer ${
            activePath === "collection"
              ? "border-[#f2c94c] text-[#fdcb2a]  bg-[rgba(242,201,76,0.2)] rounded border-[1px]"
              : "text-[#333333]"
          }`}
        >
          Collections
        </p>

        <p
          onClick={() => router.push("/admin/discount")}
          className={`w-[104px] py-[8px] pl-[15px] opacity-[80%] font-lato text-sm font-normal cursor-pointer ${
            activePath === "discount"
              ? "border-[#f2c94c] text-[#fdcb2a]  bg-[rgba(242,201,76,0.2)] rounded border-[1px]"
              : "text-[#333333]"
          }`}
        >
          Discounts
        </p>

        <p
          onClick={() => router.push("/admin/inventory")}
          className={`w-[104px] py-[8px] pl-[15px] opacity-[80%] font-lato text-sm font-normal cursor-pointer ${
            activePath === "inventory"
              ? "border-[#f2c94c] text-[#fdcb2a]  bg-[rgba(242,201,76,0.2)] rounded border-[1px]"
              : "text-[#333333]"
          }`}
        >
          Inventory
        </p>

        <p
          onClick={() => router.push("/admin/order")}
          className={`w-[104px] py-[8px] pl-[15px] opacity-[80%] font-lato text-sm font-normal cursor-pointer ${
            activePath === "order"
              ? "border-[#f2c94c] text-[#fdcb2a]  bg-[rgba(242,201,76,0.2)] rounded border-[1px]"
              : "text-[#333333]"
          }`}
        >
          Orders
        </p>

        <p
          onClick={() => router.push("/admin/users")}
          className={`w-[104px] py-[8px] pl-[15px] opacity-[80%] font-lato text-sm font-normal cursor-pointer ${
            activePath === "users"
              ? "border-[#f2c94c] text-[#fdcb2a]  bg-[rgba(242,201,76,0.2)] rounded border-[1px]"
              : "text-[#333333]"
          }`}
        >
          Users
        </p>

        <p
          onClick={() => router.push("/admin/report")}
          className={`w-[104px] py-[8px] pl-[15px] opacity-[80%] font-lato text-sm font-normal cursor-pointer ${
            activePath === "report"
              ? "border-[#f2c94c] text-[#fdcb2a]  bg-[rgba(242,201,76,0.2)] rounded border-[1px]"
              : "text-[#333333]"
          }`}
        >
          Reports
        </p>

        <p className="w-[114px] rounded py-[8px] pl-[10px] opacity-[80%] text-[#333333] font-lato text-sm font-normal cursor-pointer">
          Shipping Info
        </p>

        <p className="w-[124px] rounded py-[8px] pl-[10px] opacity-[80%] text-[#333333] font-lato text-sm font-normal cursor-pointer">
          Tracking Status
        </p>
      </div>
      <div className="w-[20%] flex justify-end">
        <div className="flex cursor-pointer">
          <Image
            src="/assets/avatar.svg"
            alt="avatar_img"
            width={40}
            height={40}
          />

          <p
            onClick={() => setIsShowingProfileOption(!isShowingProfileOption)}
            className="font-lato font-normal text-sm text-[#363435] ml-2 mt-2"
          >
            Username
          </p>

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
                    <AiOutlineSetting size={20} className="mt-[2px] mr-4" />
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

      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="bg-[#ffffff]">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <LogoutPopup logout={logout} setIsOpen={setIsOpen} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminNavbar;
