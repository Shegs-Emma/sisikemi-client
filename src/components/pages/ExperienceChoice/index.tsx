"use client";

import React, { FC, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { BsStars } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";

const ExperienceChoice: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(230,136,163,0.24),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(106,181,210,0.2),transparent_38%),linear-gradient(155deg,#fffaf5_0%,#ffffff_54%,#f4f7ff_100%)] px-4 py-12 md:px-8">
      <div className="w-full max-w-[1120px] rounded-[34px] border border-[#e3d9cd] bg-white/85 p-6 shadow-[0_28px_90px_rgba(43,54,78,0.16)] backdrop-blur-sm md:p-8 lg:p-10">
        <div className="mx-auto mb-9 flex max-w-2xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9c6b0] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a86728]">
            <BsStars className="text-xs" />
            Choose Experience
          </div>
          <Image
            src="/assets/main_logo.svg"
            alt="Sisikemi logo"
            width={76}
            height={42}
            className="mb-4"
          />
          <h1 className="font-montserrat text-2xl font-semibold uppercase tracking-[0.07em] text-[#232a3a] md:text-4xl">
            Where would you like to go?
          </h1>
          <p className="mt-4 font-montserrat text-sm leading-7 text-[#5b657d] md:text-base">
            Enter the live shopping experience or preview the custom design area
            that is currently in development.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/new-in"
            className="group flex min-h-[320px] flex-col justify-between rounded-[28px] border border-[#e8dccd] bg-[linear-gradient(150deg,#fffaf2_0%,#ffffff_62%,#f6ede0_100%)] p-6 shadow-[0_18px_48px_rgba(70,45,20,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(70,45,20,0.16)]"
          >
            <div>
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a86728]">
                Live Now
              </p>
              <h2 className="mt-3 font-montserrat text-3xl font-semibold uppercase leading-tight text-[#2f2924]">
                Shop Face
              </h2>
              <p className="mt-4 font-montserrat text-sm leading-7 text-[#5f5a53]">
                Browse collections, discover statement pieces, and continue into
                the upgraded storefront experience.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#2f2924] px-5 py-2.5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 group-hover:translate-x-1">
              Enter Shop
              <FiArrowUpRight size={14} />
            </span>
          </Link>

          <Link
            href="/custom-design"
            className="group flex min-h-[320px] flex-col justify-between rounded-[28px] border border-[#d6deef] bg-[linear-gradient(160deg,#f6fbff_0%,#ffffff_60%,#f2f5ff_100%)] p-6 shadow-[0_18px_48px_rgba(43,54,78,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(43,54,78,0.18)]"
          >
            <div>
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.24em] text-[#3a6f93]">
                In Progress
              </p>
              <h2 className="mt-3 font-montserrat text-3xl font-semibold uppercase leading-tight text-[#232a3a]">
                Custom Design Face
              </h2>
              <p className="mt-4 font-montserrat text-sm leading-7 text-[#5b657d]">
                Enter the custom atelier to create a brief, monitor production
                stages, and prepare your bespoke look.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#a8c2d9] bg-white px-5 py-2.5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3a6f93] transition-transform duration-300 group-hover:translate-x-1">
              Enter Atelier
              <FiArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceChoice;
