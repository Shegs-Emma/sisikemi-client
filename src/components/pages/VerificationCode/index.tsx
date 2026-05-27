"use client";

import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { BsStars } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const VerificationCode = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [otpInput, setOtpInput] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState<string | null>("");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { verifyCode, forgotPassword } = useUserStore((state: any) => ({
    verifyCode: state.verifyCode,
    forgotPassword: state.forgotPassword,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
    }
  }, []);

  const handleOtpInputChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtpInput([
      ...otpInput.map((d, idx) => (idx === index ? element.value : d)),
    ]);

    //focus next input
    if (element.nextSibling instanceof HTMLInputElement) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text/plain");
    setOtpInput(pasted.split("").slice(0, otpInput.length));
  };

  // Function to handle form submission
  const onSubmit = () => {
    startTransition(async () => {
      try {
        const payload = {
          code: otpInput.join(""),
          email,
        };
        await verifyCode(payload, router);
      } catch (err) {
        console.error("Error in:", err);
      }
    });
  };

  const resendCode = () => {
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
              Verify Identity
            </div>
            <h1 className="font-montserrat text-4xl font-semibold uppercase leading-[1.1] tracking-[0.06em] text-[#fbf3ea]">
              Enter your
              <br />
              verification code.
            </h1>
            <p className="mt-5 max-w-md font-montserrat text-sm leading-7 text-[#d6c3af]">
              Use the 6-digit code sent to your email address to continue the
              password recovery process.
            </p>
          </div>

          <p className="font-montserrat text-xs uppercase tracking-[0.22em] text-[#b79d80]">
            Fast And Secure
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
              Verification
            </span>
          </div>

          <div className="mx-auto w-full max-w-[460px]">
            <h2 className="font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#2f2924]">
              Verification Code
            </h2>
            <p className="mt-3 font-montserrat text-sm leading-7 text-[#63584a]">
              Type the 6-digit code sent to your email.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="mt-8 space-y-6"
            >
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                {otpInput.map((value, index) => (
                  <input
                    key={index}
                    value={value}
                    onChange={(e) => handleOtpInputChange(e.target, index)}
                    onPaste={(e) => handlePaste(e)}
                    maxLength={1}
                    className="h-12 w-12 rounded-xl border border-[#dbcab7] bg-[#fffaf4] text-center font-montserrat text-lg font-semibold text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc] sm:h-14 sm:w-14"
                    inputMode="numeric"
                  />
                ))}
              </div>

              <Button
                type="submit"
                loading={isPending}
                disabled={otpInput.join("").length !== 6}
                className="h-12 w-full rounded-full bg-[#2f2924] font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
              >
                Verify Code
              </Button>

              <button
                type="button"
                onClick={resendCode}
                className="w-full rounded-full border border-[#d8c7b3] bg-white px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#fff8ef]"
              >
                Resend Code
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerificationCode;
