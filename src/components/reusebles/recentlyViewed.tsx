import React from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

interface Props {
  title: string;
}

const recentItems = [
  {
    image: "/images/recent1.svg",
    name: "Hand Beaded Rhinestone Dress",
    price: "₦24,000",
  },
  {
    image: "/images/recent2.svg",
    name: "Hand Beaded Rhinestone Dress",
    price: "₦24,000",
  },
  {
    image: "/images/recent3.svg",
    name: "Hand Beaded Rhinestone Dress",
    price: "₦24,000",
  },
  {
    image: "/images/recent4.svg",
    name: "Hand Beaded Rhinestone Dress",
    price: "₦24,000",
  },
];

const RecentlyViewed = ({ title }: Props) => {
  return (
    <section className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1380px] rounded-[30px] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdf9_0%,#fff7ee_42%,#ffffff_100%)] p-5 shadow-[0_24px_70px_rgba(84,56,28,0.1)] md:p-7 lg:p-9">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#e8d8c4] pb-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d9c1a3] bg-white px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a86728] md:text-[11px]">
              <BsStars className="text-xs" />
              Curated for you
            </p>
            <h2 className="font-montserrat text-2xl font-semibold uppercase tracking-[0.08em] text-[#2f2924] md:text-3xl">
              {title}
            </h2>
          </div>

          <p className="max-w-md font-montserrat text-sm text-[#6f675f] md:text-base">
            Pieces aligned with your browsing style, selected to keep your edit
            cohesive and elevated.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {recentItems.map((item) => (
            <article
              key={item.image}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-[#efe3d6] bg-white p-3 shadow-[0_16px_40px_rgba(84,56,28,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(84,56,28,0.14)] md:p-4"
            >
              <div className="relative overflow-hidden rounded-[16px] bg-[#f8efe4]">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={320}
                  height={420}
                  className="h-[230px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] md:h-[280px] xl:h-[320px]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between pt-4">
                <div>
                  <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a86728]">
                    Featured
                  </p>
                  <h3 className="mt-2 font-montserrat text-xs font-semibold uppercase leading-6 text-[#2f2924] md:text-sm">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="font-montserrat text-sm font-semibold text-[#4f4f4f] md:text-base">
                    {item.price}
                  </p>
                  <span className="inline-flex items-center gap-1 font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7d664d] transition-transform duration-300 group-hover:translate-x-1 md:text-[11px]">
                    View
                    <FiArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
