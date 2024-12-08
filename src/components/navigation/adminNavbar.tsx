"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminNavbar = () => {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");
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
        <div className="flex">
          <Image
            src="/assets/avatar.svg"
            alt="avatar_img"
            width={40}
            height={40}
          />

          <p className="font-lato font-normal text-sm text-[#363435] ml-2 mt-2">
            Username
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
