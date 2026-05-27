"use client";

import React, { FC, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { BsStars } from "react-icons/bs";
import { Button } from "@/components/ui/button";

interface Props {
  emailID: string | null;
  secretCode: string | null;
}

const VerifyEmail: FC<Props> = ({ emailID, secretCode }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { verifyEmail } = useUserStore((state: any) => ({
    verifyEmail: state.verifyEmail,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const handleSubmit = () => {
    const toastId = toast.loading("Verifying youe email...");
    if (!emailID || !secretCode) {
      return toast.error("email could not be verifying", { id: toastId });
    }

    startTransition(async () => {
      try {
        const payload = {
          email_id: emailID,
          secret_code: secretCode,
        };
        await verifyEmail(payload, router);
        toast.success("Email Verified successfully", { id: toastId });
      } catch (err) {
        console.error("Error in:", err);
        toast.error("Verification failed", { id: toastId });
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
              Verify Account
            </div>
            <h1 className="font-montserrat text-4xl font-semibold uppercase leading-[1.1] tracking-[0.06em] text-[#fbf3ea]">
              Confirm your
              <br />
              email address.
            </h1>
            <p className="mt-5 max-w-md font-montserrat text-sm leading-7 text-[#d6c3af]">
              One click is all it takes to activate your Sisikemi profile.
            </p>
          </div>

          <p className="font-montserrat text-xs uppercase tracking-[0.22em] text-[#b79d80]">
            Trusted And Secure
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
              Verify Email
            </span>
          </div>

          <div className="mx-auto w-full max-w-[460px]">
            <h2 className="font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#2f2924]">
              Verify Your Email
            </h2>
            <p className="mt-3 font-montserrat text-sm leading-7 text-[#63584a]">
              Click below to complete verification and continue.
            </p>

            <Button
              onClick={handleSubmit}
              loading={isPending}
              className="mt-8 h-12 w-full rounded-full bg-[#2f2924] font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
            >
              Verify Email Address
            </Button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-4 w-full rounded-full border border-[#d8c7b3] bg-white px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#fff8ef]"
            >
              Back To Login
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerifyEmail;
