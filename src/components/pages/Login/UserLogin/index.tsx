"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { BsStars } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";

const UserLogin = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [visibility, setVisibility] = useState(false);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { login } = useUserStore((state: any) => ({
    login: state.login,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Function to handle form submission
  const onSubmit = () => {
    if (!email.trim() || !pwd.trim()) return;

    startTransition(async () => {
      try {
        const isAdmin = false;
        const payload = {
          email,
          password: pwd,
        };
        await login(payload, router, isAdmin);
      } catch (err) {
        console.error("Error in:", err);
      }
    });
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_12%_14%,rgba(231,177,111,0.24),transparent_32%),radial-gradient(circle_at_90%_8%,rgba(109,177,209,0.18),transparent_30%),linear-gradient(155deg,#fffaf4_0%,#ffffff_52%,#f6f8ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-56 w-56 rounded-full bg-[#f4e4d0]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-52 w-52 rounded-full bg-[#dcecf8]/65 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-[1100px] overflow-hidden rounded-[30px] border border-[#e8dccf] bg-white/90 shadow-[0_30px_80px_rgba(49,35,22,0.12)] backdrop-blur-sm lg:grid-cols-[1fr_1.08fr]">
        <section className="hidden flex-col justify-between bg-[linear-gradient(155deg,#2f2924_0%,#3c332b_56%,#2f2924_100%)] p-10 text-white lg:flex">
          <Link href="/" className="w-fit">
            <Image
              src="/assets/main_logo.svg"
              alt="Sisikemi logo"
              width={78}
              height={46}
              className="brightness-[5.28]"
            />
          </Link>

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c2ab8f]/45 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ecdac4]">
              <BsStars className="text-xs" />
              Sisikemi Access
            </div>
            <h1 className="font-montserrat text-4xl font-semibold uppercase leading-[1.1] tracking-[0.06em] text-[#fbf3ea]">
              Return to your
              <br />
              curated wardrobe.
            </h1>
            <p className="mt-5 max-w-md font-montserrat text-sm leading-7 text-[#d6c3af]">
              Sign in to continue shopping new arrivals, track orders, and save
              your favorite edits.
            </p>
          </div>

          <p className="font-montserrat text-xs uppercase tracking-[0.22em] text-[#b79d80]">
            Tailored Style. Effortless Access.
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
              Login
            </span>
          </div>

          <div className="mx-auto w-full max-w-[460px]">
            <h2 className="font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#2f2924]">
              Welcome Back
            </h2>
            <p className="mt-3 font-montserrat text-sm leading-7 text-[#63584a]">
              Please enter your email and password to continue.
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

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                >
                  Password
                </label>
                <div className="flex h-12 items-center rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-3">
                  <input
                    id="password"
                    type={visibility ? "text" : "password"}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value.slice(0, 30))}
                    className="h-full w-full bg-transparent pr-2 font-montserrat text-sm text-[#2f2924] outline-none"
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setVisibility((prev) => !prev)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5f5447] transition hover:bg-white"
                    aria-label={visibility ? "Hide password" : "Show password"}
                  >
                    {visibility ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-[#c9b49b] text-[#a86728] focus:ring-[#d7bfa4]"
                  />
                  <span className="font-montserrat text-sm text-[#5f5447]">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => router.push("/forgot_password")}
                  className="font-montserrat text-xs font-semibold uppercase tracking-[0.16em] text-[#7e5b3a] transition hover:text-[#a86728]"
                >
                  Forgot password
                </button>
              </div>

              <Button
                type="submit"
                loading={isPending}
                disabled={!email.trim() || !pwd.trim()}
                className="h-12 w-full rounded-full bg-[#2f2924] font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
              >
                Log In
              </Button>

              <button
                type="button"
                onClick={() => router.push("/register")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8c7b3] bg-white px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#fff8ef]"
              >
                Create Account
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

export default UserLogin;
