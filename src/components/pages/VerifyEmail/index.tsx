"use client";

import React, { FC, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

interface Props {
  emailID: string | null;
  secretCode: string | null;
}

const VerifyEmail: FC<Props> = ({ emailID, secretCode }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { verifyEmail } = useUserStore((state: any) => ({
    verifyEmail: state.verifyEmail,
  }));

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
    <div className="hidden md:block md:w-full pb-12 flex flex-col">
      <div className="w-full flex justify-between pt-6 px-[2rem] fixed z-50">
        <Link href="/">
          <div className="">
            <Image
              src="/assets/main_logo.svg"
              alt="logo"
              width={70}
              height={40}
            />
          </div>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex flex-col w-[640px] bg-[#ffffff] py-6 relative top-[15rem] mb-[10rem] px-12 shadow-2xl rounded">
          <div className="flex flex-col justify-center items-center">
            <p className="font-montserrat font-semibold text-lg text-[#333333]">
              Please click on the button to verify your email Address
            </p>
            <button
              onClick={() => handleSubmit()}
              className="w-full md:w-[316px] h-[64px] bg-[#363435] text-xl font-medium text-[#f2f2f2] cursor-pointer rounded mt-12 md:mt-8"
            >
              Verify Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
