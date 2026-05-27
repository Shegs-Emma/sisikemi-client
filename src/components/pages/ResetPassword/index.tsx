"use client";

import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import ReactPasswordChecklist from "react-password-checklist";
import { BsStars } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [visibilityNew, setVisibilityNew] = useState(false);
  const [visibilityConfirm, setVisibilityConfirm] = useState(false);
  const [email, setEmail] = useState<string | null>("");
  const [code, setCode] = useState<string | null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      const storedCode = localStorage.getItem("code");

      setEmail(storedEmail);
      setCode(storedCode);
    }
  }, []);

  const viewerNew = () => {
    setVisibilityNew(!visibilityNew);
  };

  const viewerConfirm = () => {
    setVisibilityConfirm(!visibilityConfirm);
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { resetPassword } = useUserStore((state: any) => ({
    resetPassword: state.resetPassword,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Function to handle form submission
  const onSubmit = () => {
    startTransition(async () => {
      try {
        const payload = {
          email,
          password: newPwd,
          code,
        };
        await resetPassword(payload, router);
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
              Password Reset
            </div>
            <h1 className="font-montserrat text-4xl font-semibold uppercase leading-[1.1] tracking-[0.06em] text-[#fbf3ea]">
              Set a new
              <br />
              secure password.
            </h1>
            <p className="mt-5 max-w-md font-montserrat text-sm leading-7 text-[#d6c3af]">
              Your new password should be strong and memorable. Confirm it to
              complete account recovery.
            </p>
          </div>

          <p className="font-montserrat text-xs uppercase tracking-[0.22em] text-[#b79d80]">
            Security First
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
              Reset Password
            </span>
          </div>

          <div className="mx-auto w-full max-w-[460px]">
            <h2 className="font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#2f2924]">
              Create New Password
            </h2>
            <p className="mt-3 font-montserrat text-sm leading-7 text-[#63584a]">
              Please enter and confirm your new password.
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
                  htmlFor="new-password"
                  className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                >
                  New Password
                </label>
                <div className="flex h-12 items-center rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-3">
                  <input
                    id="new-password"
                    type={visibilityNew ? "text" : "password"}
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value.slice(0, 30))}
                    className="h-full w-full bg-transparent pr-2 font-montserrat text-sm text-[#2f2924] outline-none"
                    placeholder="Enter new password"
                    required
                  />

                  <button
                    type="button"
                    onClick={viewerNew}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5f5447] transition hover:bg-white"
                    aria-label={
                      visibilityNew ? "Hide password" : "Show password"
                    }
                  >
                    {visibilityNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                >
                  Confirm Password
                </label>
                <div className="flex h-12 items-center rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-3">
                  <input
                    id="confirm-password"
                    type={visibilityConfirm ? "text" : "password"}
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value.slice(0, 30))}
                    className="h-full w-full bg-transparent pr-2 font-montserrat text-sm text-[#2f2924] outline-none"
                    placeholder="Confirm new password"
                    required
                  />

                  <button
                    type="button"
                    onClick={viewerConfirm}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5f5447] transition hover:bg-white"
                    aria-label={
                      visibilityConfirm ? "Hide password" : "Show password"
                    }
                  >
                    {visibilityConfirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {newPwd ? (
                <div className="rounded-2xl border border-[#e9dccf] bg-[#fffcf8] p-4">
                  <ReactPasswordChecklist
                    className="space-y-1 font-montserrat text-[11px] font-medium text-[#5f5447]"
                    rules={[
                      "minLength",
                      "specialChar",
                      "number",
                      "capital",
                      "match",
                    ]}
                    minLength={8}
                    value={newPwd}
                    valueAgain={confirmPwd}
                    messages={{
                      minLength: "The password has more than 8 characters.",
                      specialChar: "The password has special characters.",
                      number: "The password has a number.",
                      capital: "The password has an uppercase letter.",
                      match: "The passwords match.",
                    }}
                    iconSize={11}
                    validColor="#8DAA6A"
                    invalidColor="#8a7f70"
                  />
                </div>
              ) : null}

              <Button
                type="submit"
                loading={isPending}
                disabled={!newPwd.trim() || !confirmPwd.trim()}
                className="h-12 w-full rounded-full bg-[#2f2924] font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
              >
                Save New Password
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResetPassword;
