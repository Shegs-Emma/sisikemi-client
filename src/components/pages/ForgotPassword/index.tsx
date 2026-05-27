"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { BsStars } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";

const ForgotPassword = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { forgotPassword } = useUserStore((state: any) => ({
    forgotPassword: state.forgotPassword,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Function to handle form submission
  const onSubmit = () => {
    startTransition(async () => {
      try {
        const payload = {
          email,
        };
        await forgotPassword(payload, router);
      } catch (err) {
        console.error("Error in:", err);
      }
    });
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_14%_16%,rgba(231,177,111,0.24),transparent_32%),radial-gradient(circle_at_90%_12%,rgba(111,170,202,0.2),transparent_30%),linear-gradient(160deg,#fffaf4_0%,#ffffff_52%,#f4f8ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-16 bottom-10 h-52 w-52 rounded-full bg-[#f5e7d4]/65 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-56 w-56 rounded-full bg-[#d8ebf8]/70 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-[1120px] overflow-hidden rounded-[30px] border border-[#e7dbcf] bg-white/90 shadow-[0_30px_80px_rgba(49,35,22,0.12)] backdrop-blur-sm lg:grid-cols-[1fr_1.06fr]">
        <section className="hidden flex-col justify-between bg-[linear-gradient(160deg,#2f2924_0%,#3b332c_58%,#2f2924_100%)] p-10 text-white lg:flex">
          <Link href="/" className="w-fit">
            <Image
              src="/assets/main_logo.svg"
              alt="Sisikemi logo"
              width={78}
              height={46}
              className="brightness-[1.28]"
            />
          </Link>

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c2ab8f]/45 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ecdac4]">
              <BsStars className="text-xs" />
              Account Recovery
            </div>
            <h1 className="font-montserrat text-4xl font-semibold uppercase leading-[1.1] tracking-[0.06em] text-[#fbf3ea]">
              Recover access to
              <br />
              your account.
            </h1>
            <p className="mt-5 max-w-md font-montserrat text-sm leading-7 text-[#d6c3af]">
              Enter your email and we will send a secure verification code to
              help you reset your password.
            </p>
          </div>

          <p className="font-montserrat text-xs uppercase tracking-[0.22em] text-[#b79d80]">
            Secure Reset Flow
          </p>
        </section>

        <section className="p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="w-fit">
              <Image
                src="/assets/main_logo.svg"
                alt="Sisikemi logo"
                width={76}
                height={44}
              />
            </Link>
            <span className="rounded-full border border-[#dec8b1] bg-[#fff8ef] px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a86728]">
              Reset Access
            </span>
          </div>

          <div className="mx-auto w-full max-w-[460px]">
            <h2 className="font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#2f2924]">
              Forgot Password
            </h2>
            <p className="mt-3 font-montserrat text-sm leading-7 text-[#63584a]">
              We will send a verification code to your email.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <Button
                type="submit"
                loading={isPending}
                disabled={!email.trim()}
                className="h-12 w-full rounded-full bg-[#2f2924] font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
              >
                Send Verification Code
              </Button>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8c7b3] bg-white px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#fff8ef]"
              >
                Back To Login
                <FiArrowUpRight
                  size={14}
                  className="transition group-hover:translate-x-0.5"
                />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
