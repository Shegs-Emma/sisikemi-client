"use client";

import React, { FC, useMemo, useState } from "react";
import RecentlyViewed from "@/components/reusebles/recentlyViewed";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import { BsGrid3X3GapFill, BsStars } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { twMerge } from "tailwind-merge";
import { sizes } from "@/utils/constants";
import { FiArrowUpRight } from "react-icons/fi";

const saleProducts = Array.from({ length: 12 }, (_, idx) => {
  const originalPrice = 24000 + idx * 1250;
  const discountedPrice = Math.floor(originalPrice * 0.7);

  return {
    id: idx + 1,
    name: "Hand Beaded Rhinestone Dress",
    image: "/images/newin_img.svg",
    price: discountedPrice,
    originalPrice,
  };
});

const Sale: FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const formattedProducts = useMemo(
    () =>
      saleProducts.map((item) => ({
        ...item,
        displayPrice: `₦${item.price.toLocaleString()}`,
        displayOriginalPrice: `₦${item.originalPrice.toLocaleString()}`,
      })),
    [],
  );

  return (
    <div className="flex w-full flex-col bg-[linear-gradient(180deg,#fffdf9_0%,#fff7f0_38%,#ffffff_100%)] pt-[6.5rem] md:pt-[10.75rem] xl:pt-[11.5rem]">
      <section className="px-4 pb-8 pt-4 md:px-8 md:pb-10 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[32px] border border-[#eadfce] bg-[radial-gradient(circle_at_top_left,rgba(235,86,86,0.12),transparent_36%),linear-gradient(135deg,#fff6f4_0%,#ffffff_56%,#f8efe4_100%)] shadow-[0_30px_80px_rgba(84,56,28,0.12)]">
          <div className="grid gap-8 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:px-12 lg:py-14">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e2b7ab] bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b0483d]">
                <BsStars className="text-xs" />
                Sale Edit
              </div>
              <h1 className="font-montserrat text-[2rem] font-semibold uppercase leading-[1.05] tracking-[0.08em] text-[#2f2924] md:text-[2.8rem] xl:text-[3.4rem]">
                Signature looks with limited-time markdowns.
              </h1>
              <p className="mt-4 max-w-xl font-montserrat text-sm leading-7 text-[#6b6258] md:text-base">
                Discover selected Sisikemi pieces now at reduced prices while
                sizes remain available.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-[0_16px_40px_rgba(70,45,20,0.08)]">
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b0483d]">
                  On Sale
                </p>
                <p className="mt-3 font-montserrat text-3xl font-semibold text-[#2f2924]">
                  {formattedProducts.length}
                </p>
                <p className="mt-2 font-montserrat text-sm text-[#6b6258]">
                  Styles with active markdowns.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/70 bg-[#2f2924] p-5 shadow-[0_16px_40px_rgba(70,45,20,0.12)]">
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d8c3aa]">
                  Mood
                </p>
                <p className="mt-3 font-montserrat text-lg font-medium text-white">
                  High-impact dressing at a sharper value.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-[0_16px_40px_rgba(70,45,20,0.08)]">
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b0483d]">
                  Savings
                </p>
                <p className="mt-3 font-montserrat text-sm leading-6 text-[#6b6258]">
                  Reduced prices on statement pieces for a limited period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-4 rounded-[28px] border border-[#eadfce] bg-white/85 p-4 shadow-[0_20px_60px_rgba(84,56,28,0.08)] backdrop-blur-sm md:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[22px] border border-[#f0e4d6] bg-[#fffaf4] p-3 md:gap-4 md:p-4">
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_8px_20px_rgba(84,56,28,0.08)]">
              <IoGrid color="#b6aea4" size={18} />
              <BsGrid3X3GapFill color="#363435" size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b0483d]">
                Collection View
              </p>
              <p className="truncate font-montserrat text-sm text-[#6b6258] md:text-base">
                {formattedProducts.length} pieces in the current sale edit
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              className="h-auto w-full justify-between rounded-full border border-[#d8c7b3] bg-[#fffaf4] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#363435] shadow-none transition-colors hover:bg-white sm:w-[200px]"
              type="button"
            >
              <span>Product Type</span>
              <BiChevronDown color="#363435" size={18} />
            </Button>

            <Select onValueChange={(value: string) => setSelectedSize(value)}>
              <SelectTrigger
                className={twMerge(
                  "h-auto w-full rounded-full border border-[#d8c7b3] bg-[#fffaf4] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#363435] shadow-none outline-0 transition-colors hover:bg-white sm:w-[140px]",
                )}
              >
                <SelectValue
                  className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4f4f4f]"
                  placeholder={selectedSize ? selectedSize : "Size"}
                />
              </SelectTrigger>
              <SelectContent
                className={twMerge("border-none bg-transparent shadow-none")}
              >
                <div className="h-full max-h-60 w-[140px] overflow-y-scroll rounded-2xl bg-[#ffffff] text-[#363435] shadow-lg">
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
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-[1380px] grid-cols-2 gap-4 border-b border-[#d8c7b3] pb-16 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:gap-6">
          {formattedProducts.map((product) => (
            <article
              key={product.id}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#eee3d6] bg-white p-3 shadow-[0_18px_40px_rgba(84,56,28,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(84,56,28,0.14)] md:p-4"
            >
              <div className="relative overflow-hidden rounded-[18px] bg-[#f8efe4]">
                <div className="absolute left-3 top-3 z-10 rounded-full bg-[#2f2924]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                  Sale
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={560}
                  className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[320px] xl:h-[360px]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between px-1 pb-1 pt-4">
                <div>
                  <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b0483d]">
                    Marked Down
                  </p>
                  <h3 className="mt-2 font-montserrat text-sm font-semibold uppercase leading-6 text-[#2f2924] md:text-base">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="flex items-end gap-2">
                    <p className="font-montserrat text-sm font-semibold text-[#812a25] md:text-base">
                      {product.displayPrice}
                    </p>
                    <p className="font-montserrat text-xs text-[#7f776f] line-through md:text-sm">
                      {product.displayOriginalPrice}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7d664d] transition-transform duration-300 group-hover:translate-x-1">
                    View
                    <FiArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <RecentlyViewed title="RECENTLY VIEWED" />
    </div>
  );
};

export default Sale;
