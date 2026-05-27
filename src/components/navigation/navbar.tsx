"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineChevronDown } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
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

const navLinks = [
  { href: "/new-in", label: "NEW IN", slug: "new-in" },
  { href: "/shop", label: "SHOP", slug: "shop" },
  { href: "/sale", label: "SALE", slug: "sale" },
  { href: "/rtw", label: "RTW", slug: "rtw" },
  { href: "/collections", label: "COLLECTIONS", slug: "collections" },
  { href: "/bridal", label: "BRIDAL", slug: "bridal" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout, isLoading } = useLogout();
  const [isToken, setIsToken] = useState<string>("");
  const [isShowingProfileOption, setIsShowingProfileOption] =
    useState<boolean>(false);
  const [activePath, setActivePath] = useState<string>("new-in");

  useEffect(() => {
    if (pathname) {
      const currentlyViewing = pathname.split("/")[1] || "new-in";

      setActivePath(currentlyViewing);
    }
  }, [pathname]);

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
    shallow,
  );

  const { cart, fetchCart } = useCartStore(
    (state: any) => ({
      cart: state.cart,
      fetchCart: state.fetchCart,
    }),
    shallow,
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const handleCartFetch = useCallback(async () => {
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
  }, [fetchCart]);

  useEffect(() => {
    if (isToken) {
      handleCartFetch();
    }
  }, [handleCartFetch, isToken]);

  const currentCartCount = isToken
    ? (cart?.length ?? 0)
    : (offlineCart?.length ?? 0);

  return (
    <div className="fixed z-50 hidden w-full md:block">
      <div className="bg-custom-radial px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_rgba(168,103,40,0.18)] lg:px-6 lg:text-[11px] lg:tracking-[0.32em]">
        Crafted for statement dressing. New season pieces now available.
      </div>
      <div className="bg-[linear-gradient(180deg,rgba(255,251,245,0.96)_0%,rgba(255,255,255,0.92)_100%)] px-3 py-3 backdrop-blur-xl md:px-4 lg:px-6 xl:px-8">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 rounded-[26px] border border-[#eadfce] bg-white/75 px-3 py-3 shadow-[0_22px_60px_rgba(70,45,20,0.12)] md:gap-4 md:px-4 lg:px-5 xl:flex-nowrap xl:justify-between xl:gap-6 xl:px-6 xl:py-4">
          <Link
            href="/"
            className="flex min-w-fit shrink-0 items-center gap-3 xl:gap-4"
          >
            <div className="rounded-full border border-[#efe3d0] bg-[#fffaf4] px-3 py-2.5 shadow-[0_8px_20px_rgba(168,103,40,0.08)] xl:px-4 xl:py-3">
              <Image
                src="/assets/main_logo.svg"
                alt="logo"
                width={70}
                height={40}
              />
            </div>
            <div className="hidden flex-col lg:flex">
              <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.38em] text-[#a86728]">
                Sisikemi
              </span>
              <span className="font-montserrat text-xs text-[#6b6258]">
                Occasionwear with a tailored finish
              </span>
            </div>
          </Link>

          <div className="min-w-0 flex-1 overflow-hidden xl:flex xl:justify-center">
            <div className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-full border border-[#ece1d3] bg-[#fffaf5] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:gap-1.5 md:p-2 xl:overflow-visible">
              {navLinks.map((link) => {
                const isActive = activePath === link.slug;

                return (
                  <Link
                    key={link.slug}
                    href={link.href}
                    className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 md:px-4 md:py-3 md:text-[11px] md:tracking-[0.22em] ${
                      isActive
                        ? "bg-custom-radial text-white shadow-[0_10px_24px_rgba(168,103,40,0.26)]"
                        : "text-[#4f4a43] hover:bg-white hover:text-[#a86728]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-fit shrink-0 items-center gap-2 md:gap-2.5 lg:gap-3">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-[#eadfce] bg-[#fffaf4] px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4f4a43] shadow-[0_10px_24px_rgba(70,45,20,0.06)] transition-colors duration-200 hover:border-[#d7b27d] hover:text-[#a86728] md:px-4 md:py-3 md:text-xs md:tracking-[0.18em]"
            >
              <span>NGN</span>
              <HiOutlineChevronDown className="text-sm" />
            </button>

            <button
              type="button"
              aria-label="Search"
              className="rounded-full border border-[#eadfce] bg-white p-2.5 text-[#4f4a43] shadow-[0_10px_24px_rgba(70,45,20,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d7b27d] hover:text-[#a86728] md:p-3"
            >
              <FiSearch size={18} className="md:h-5 md:w-5" />
            </button>

            <button
              type="button"
              aria-label="Cart"
              onClick={() => router.push("/cart")}
              className="relative rounded-full border border-[#eadfce] bg-white p-2.5 text-[#4f4a43] shadow-[0_10px_24px_rgba(70,45,20,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d7b27d] hover:text-[#a86728] md:p-3"
            >
              {currentCartCount ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1f1a17] text-[10px] font-bold text-white">
                  {currentCartCount}
                </span>
              ) : null}
              <AiOutlineShoppingCart size={18} className="md:h-5 md:w-5" />
            </button>

            {isToken ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setIsShowingProfileOption(!isShowingProfileOption)
                  }
                  className="flex items-center gap-2 rounded-full border border-[#eadfce] bg-[#1f1a17] px-2.5 py-2 text-white shadow-[0_16px_35px_rgba(31,26,23,0.22)] transition-transform duration-200 hover:-translate-y-0.5 md:px-3 md:py-2.5 xl:gap-3 xl:px-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 md:h-10 md:w-10">
                    <CgProfile size={20} className="md:h-[22px] md:w-[22px]" />
                  </span>
                  <span className="hidden flex-col items-start xl:flex">
                    <span className="font-montserrat text-[10px] uppercase tracking-[0.24em] text-[#d8c3aa]">
                      Account
                    </span>
                    <span className="font-montserrat text-sm font-medium text-white">
                      My Profile
                    </span>
                  </span>
                  <GoChevronDown className="text-base text-[#d8c3aa] md:text-lg" />
                </button>

                {isShowingProfileOption && (
                  <div className="absolute right-0 top-[calc(100%+16px)] z-10 w-[280px] cursor-pointer md:w-[320px]">
                    <div className="absolute right-8 top-[-10px] h-5 w-5 rotate-45 border-l border-t border-[#4d4640] bg-[#2b2723]"></div>
                    <div className="rounded-[28px] border border-[#4d4640] bg-[#2b2723]/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
                      <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                        <div className="rounded-full border border-white/10 bg-white/5 p-1.5">
                          <Image
                            src="/images/profile.svg"
                            alt="profile image"
                            width={64}
                            height={64}
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="font-montserrat text-sm font-medium text-white">
                            Joy Uwangue
                          </p>
                          <p className="font-montserrat text-xs italic text-[#d0c5b8]">
                            joyuwangue1@gmail.com
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-3">
                        <button
                          type="button"
                          className="flex items-center gap-4 rounded-full border border-white/10 px-4 py-3 text-left text-white transition-colors duration-200 hover:bg-white/5"
                        >
                          <AiOutlineSetting size={20} />
                          <span className="font-montserrat text-sm">
                            Profile Settings
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(true);
                            setIsShowingProfileOption(false);
                          }}
                          className="flex items-center gap-4 rounded-full bg-custom-radial px-4 py-3 text-left text-white shadow-[0_12px_24px_rgba(168,103,40,0.22)]"
                        >
                          <IoExitOutline size={20} />
                          <span className="font-montserrat text-sm font-medium">
                            Log Out
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="rounded-full bg-[#1f1a17] px-4 py-2.5 font-montserrat text-xs font-medium text-white shadow-[0_16px_35px_rgba(31,26,23,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#342d28] md:px-5 md:py-3 md:text-sm xl:px-6"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="max-w-[560px] overflow-hidden border border-[#e7d7c3] bg-white p-0">
            <DialogHeader>
              <DialogTitle className="sr-only">Confirm logout</DialogTitle>
              <DialogDescription className="text-inherit">
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
