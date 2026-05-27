"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsStars } from "react-icons/bs";

const Welcome = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_14%_16%,rgba(231,177,111,0.24),transparent_32%),radial-gradient(circle_at_90%_12%,rgba(111,170,202,0.2),transparent_30%),linear-gradient(160deg,#fffaf4_0%,#ffffff_52%,#f4f8ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-16 bottom-10 h-52 w-52 rounded-full bg-[#f5e7d4]/65 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-56 w-56 rounded-full bg-[#d8ebf8]/70 blur-3xl" />

      <div className="relative z-10 w-full max-w-[760px] overflow-hidden rounded-[30px] border border-[#e7dbcf] bg-white/90 p-6 shadow-[0_30px_80px_rgba(49,35,22,0.12)] backdrop-blur-sm md:p-10">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="w-fit">
            <Image
              src="/assets/main_logo.svg"
              alt="Sisikemi logo"
              width={76}
              height={44}
            />
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#dec8b1] bg-[#fff8ef] px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a86728]">
            <BsStars className="text-xs" />
            Welcome
          </div>
        </div>

        <div className="text-center">
          <h1 className="font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#2f2924] md:text-4xl">
            Welcome to Sisikemi
          </h1>
          <p className="mt-4 font-montserrat text-sm leading-7 text-[#63584a] md:text-base">
            Thank you for signing up. Please check your email for the next
            steps. We look forward to styling you beautifully.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-[#2f2924] px-6 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
            >
              Go To Login
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7b3] bg-white px-6 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#fff8ef]"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
