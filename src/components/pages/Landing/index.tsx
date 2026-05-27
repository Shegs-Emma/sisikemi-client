import Slider from "@/components/reusebles/slider";
import SliderMobile from "@/components/reusebles/sliderMobile";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsStars } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";

const Landing = () => {
  const featuredLooks = [
    {
      title: "Sculpted Evening",
      subtitle: "For entrances that stay memorable.",
      image: "/images/section1.svg",
      link: "/new-in",
    },
    {
      title: "Tailored Softness",
      subtitle: "Balanced structure with movement.",
      image: "/images/section1.svg",
      link: "/shop",
    },
    {
      title: "Statement Layers",
      subtitle: "Textured silhouettes for modern occasions.",
      image: "/images/section1.svg",
      link: "/collections",
    },
    {
      title: "Signature Form",
      subtitle: "Made to elevate your presence.",
      image: "/images/section1.svg",
      link: "/rtw",
    },
  ];

  const collections = [
    {
      name: "Ceremony Edit",
      image: "/images/section2.svg",
      href: "/bridal",
    },
    {
      name: "Event Dressing",
      image: "/images/section2.svg",
      href: "/collections",
    },
    {
      name: "Weekend Glam",
      image: "/images/section2.svg",
      href: "/sale",
    },
  ];

  return (
    <div className="flex w-full flex-col bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_36%,#ffffff_100%)] pt-[6.25rem] md:pt-[9.75rem]">
      <div className="hidden w-full md:block">
        <Slider />
      </div>

      <div className="mt-[5.25rem] block w-full md:hidden">
        <SliderMobile />
      </div>

      <section className="px-4 pb-8 pt-8 md:px-8 md:pt-10 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[32px] border border-[#eadfce] bg-[radial-gradient(circle_at_top_left,rgba(239,211,120,0.26),transparent_30%),linear-gradient(136deg,#fffaf4_0%,#ffffff_58%,#f8efe4_100%)] shadow-[0_28px_78px_rgba(84,56,28,0.11)]">
          <div className="grid gap-8 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:px-12 lg:py-12">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dcc6a9] bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a86728]">
                <BsStars className="text-xs" />
                The Landing Edit
              </div>
              <h1 className="font-montserrat text-[2rem] font-semibold uppercase leading-[1.06] tracking-[0.08em] text-[#2f2924] md:text-[2.7rem] xl:text-[3.25rem]">
                Design-led fashion for women who move the room.
              </h1>
              <p className="mt-4 max-w-xl font-montserrat text-sm leading-7 text-[#6b6258] md:text-base">
                Explore elevated pieces curated for celebrations, ceremonies,
                and every moment that deserves a stronger silhouette.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/new-in"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2f2924] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
                >
                  Shop New In
                  <FiArrowUpRight size={14} />
                </Link>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d8c7b3] bg-white px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#fff8ef]"
                >
                  View Collections
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <article className="rounded-[22px] border border-white/70 bg-white/80 p-5 shadow-[0_14px_34px_rgba(70,45,20,0.08)]">
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a86728]">
                  New In
                </p>
                <p className="mt-2 font-montserrat text-3xl font-semibold text-[#2f2924]">
                  24
                </p>
              </article>
              <article className="rounded-[22px] border border-white/70 bg-[#2f2924] p-5 shadow-[0_14px_34px_rgba(70,45,20,0.12)]">
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d8c3aa]">
                  Spotlight
                </p>
                <p className="mt-2 font-montserrat text-sm leading-6 text-[#f5ede3]">
                  Occasion-ready pieces with modern tailoring.
                </p>
              </article>
              <article className="rounded-[22px] border border-white/70 bg-white/80 p-5 shadow-[0_14px_34px_rgba(70,45,20,0.08)]">
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a86728]">
                  Bridal
                </p>
                <p className="mt-2 font-montserrat text-sm leading-6 text-[#6b6258]">
                  Bespoke-ready looks for your special day.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-montserrat text-xl font-semibold uppercase tracking-[0.06em] text-[#2f2924] md:text-2xl">
              Featured Looks
            </h2>
            <Link
              href="/all-products"
              className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6b4d] transition hover:text-[#a86728]"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 xl:gap-6">
            {featuredLooks.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[24px] border border-[#eee3d6] bg-white p-3 shadow-[0_18px_40px_rgba(84,56,28,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(84,56,28,0.14)] md:p-4"
              >
                <div className="relative overflow-hidden rounded-[18px] bg-[#f8efe4]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={320}
                    height={460}
                    className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[320px]"
                  />
                </div>

                <h3 className="mt-4 font-montserrat text-sm font-semibold uppercase tracking-[0.05em] text-[#2f2924] md:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 font-montserrat text-xs leading-6 text-[#6b6258] md:text-sm">
                  {item.subtitle}
                </p>

                <Link
                  href={item.link}
                  className="mt-4 inline-flex items-center gap-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6b4d] transition group-hover:translate-x-1"
                >
                  Explore
                  <FiArrowUpRight size={13} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-montserrat text-xl font-semibold uppercase tracking-[0.06em] text-[#2f2924] md:text-2xl">
              Collection Stories
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5 xl:gap-6">
            {collections.map((collection) => (
              <article
                key={collection.name}
                className="group relative overflow-hidden rounded-[24px] border border-[#e7d9ca]"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={420}
                  height={580}
                  className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1914]/70 via-[#1e1914]/15 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-montserrat text-lg font-semibold uppercase tracking-[0.05em] text-[#f8f2ea]">
                    {collection.name}
                  </h3>
                  <Link href={collection.href}>
                    <Button
                      className="mt-3 h-11 rounded-full bg-white px-5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2f2924]"
                      variant="yellow"
                      type="button"
                    >
                      View Collection
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1380px] rounded-[30px] border border-[#c58a53] bg-[linear-gradient(145deg,#a86728_0%,#c1793a_52%,#9d5f25_100%)] px-6 py-10 shadow-[0_26px_72px_rgba(94,47,9,0.35)] md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.24em] text-[#fff0de]">
              10% Off Your First Purchase
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-white md:text-4xl">
              Join the Sisikemi list
            </h2>
            <p className="mt-4 font-montserrat text-sm leading-7 text-[#fbead8] md:text-base">
              Be first to access exclusive drops, private previews, and
              style-led campaign edits.
            </p>

            <div className="mx-auto mt-7 flex max-w-[640px] flex-col gap-3 sm:flex-row">
              <input
                autoComplete="off"
                placeholder="Enter your email"
                className="h-12 w-full rounded-full border border-[#f0cda9] bg-white/10 px-4 font-montserrat text-sm text-white placeholder:text-[#f9dfc6] focus:outline-none focus:ring-2 focus:ring-[#f3c99c]"
              />

              <Button
                className="h-12 rounded-full bg-white px-6 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b471c] transition hover:bg-[#fff0df]"
                variant="yellow"
                type="button"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-[1380px] overflow-hidden rounded-[30px] border border-[#e9ddcf] bg-white shadow-[0_20px_58px_rgba(84,56,28,0.08)] md:grid-cols-2">
          <div className="order-2 p-6 md:order-1 md:p-10 lg:p-12">
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a86728]">
              Designed For Every Woman
            </p>
            <h2 className="mt-4 font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#2f2924] md:text-4xl">
              #SISIKEMI
            </h2>
            <p className="mt-4 max-w-md font-montserrat text-sm leading-7 text-[#65594b] md:text-base">
              A fashion language built on confidence, character, and silhouettes
              that speak before you do.
            </p>

            <Link
              href="/all-products"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#d8c7b3] bg-[#fff8ef] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#ffeed9]"
            >
              View All Products
              <FiArrowUpRight size={14} />
            </Link>
          </div>

          <div className="order-1 md:order-2">
            <Image
              src="/images/layer.svg"
              alt="Sisikemi lookbook layer"
              width={720}
              height={720}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
