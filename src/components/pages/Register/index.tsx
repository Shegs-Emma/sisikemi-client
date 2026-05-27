"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import PasswordChecklist from "react-password-checklist";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { BsStars } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";

const Register = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [agreeToUpdates, setAgreeToUpdates] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [visibilityConfirm, setVisibilityConfirm] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { register } = useUserStore((state: any) => ({
    register: state.register,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Handle change code ========================================================================================================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    let newValue = value;

    // Restrict phone_number to only digits and max 13
    if (name === "phone_number") {
      newValue = newValue.replace(/\D/g, "").slice(0, 13);
    }

    setFormValues({
      ...formValues,
      [name]: newValue,
    });
  };

  const isFormValid =
    formValues.first_name.trim() &&
    formValues.last_name.trim() &&
    formValues.email.trim() &&
    formValues.phone_number.trim() &&
    formValues.username.trim() &&
    pwd.trim() &&
    confirmPwd.trim();

  const handleSubmit = () => {
    try {
      if (!isFormValid) {
        toast.error("Please complete all required fields");
        return;
      }

      if (pwd !== confirmPwd) {
        toast.error("Passwords do not match");
        return;
      }

      const toastId = toast.loading("Creating account");

      const payload = {
        ...formValues,
        password: pwd,
      };

      startTransition(async () => {
        try {
          await register(payload, router);
          toast.success("Created successfully", { id: toastId });
        } catch (err) {
          console.error("Error in:", err);
          toast.error("Created failed", { id: toastId });
        }
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_14%_16%,rgba(231,177,111,0.24),transparent_32%),radial-gradient(circle_at_90%_12%,rgba(111,170,202,0.2),transparent_30%),linear-gradient(160deg,#fffaf4_0%,#ffffff_52%,#f4f8ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-16 bottom-10 h-52 w-52 rounded-full bg-[#f5e7d4]/65 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-56 w-56 rounded-full bg-[#d8ebf8]/70 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-[1160px] overflow-hidden rounded-[30px] border border-[#e7dbcf] bg-white/90 shadow-[0_30px_80px_rgba(49,35,22,0.12)] backdrop-blur-sm lg:grid-cols-[1fr_1.14fr]">
        <section className="hidden flex-col justify-between bg-[linear-gradient(160deg,#2f2924_0%,#3b332c_58%,#2f2924_100%)] p-10 text-white lg:flex">
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
              New Account
            </div>
            <h1 className="font-montserrat text-4xl font-semibold uppercase leading-[1.1] tracking-[0.06em] text-[#fbf3ea]">
              Start your
              <br />
              style journey.
            </h1>
            <p className="mt-5 max-w-md font-montserrat text-sm leading-7 text-[#d6c3af]">
              Create your Sisikemi profile to unlock curated picks, effortless
              checkout, and personalized styling updates.
            </p>
          </div>

          <p className="font-montserrat text-xs uppercase tracking-[0.22em] text-[#b79d80]">
            Crafted For Timeless Statements.
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
              Register
            </span>
          </div>

          <div className="mx-auto w-full max-w-[520px]">
            <h2 className="font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#2f2924]">
              Create Account
            </h2>
            <p className="mt-3 font-montserrat text-sm leading-7 text-[#63584a]">
              Please fill in your details below.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-8 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formValues.first_name}
                    onChange={handleChange}
                    className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formValues.last_name}
                    onChange={handleChange}
                    className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone_number"
                    className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formValues.phone_number}
                    onChange={handleChange}
                    maxLength={13}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formValues.username}
                    onChange={handleChange}
                    className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
                    required
                  />
                </div>
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
                    placeholder="Create a strong password"
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

              <div>
                <label
                  htmlFor="confirm_password"
                  className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]"
                >
                  Confirm Password
                </label>
                <div className="flex h-12 items-center rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-3">
                  <input
                    id="confirm_password"
                    type={visibilityConfirm ? "text" : "password"}
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value.slice(0, 30))}
                    className="h-full w-full bg-transparent pr-2 font-montserrat text-sm text-[#2f2924] outline-none"
                    placeholder="Re-enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setVisibilityConfirm((prev) => !prev)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5f5447] transition hover:bg-white"
                    aria-label={
                      visibilityConfirm
                        ? "Hide confirm password"
                        : "Show confirm password"
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

              {pwd ? (
                <div className="rounded-2xl border border-[#e9dccf] bg-[#fffcf8] p-4">
                  <PasswordChecklist
                    className="space-y-1 font-montserrat text-[11px] font-medium text-[#5f5447]"
                    rules={[
                      "minLength",
                      "specialChar",
                      "number",
                      "capital",
                      "match",
                    ]}
                    minLength={8}
                    value={pwd}
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

              <label className="inline-flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreeToUpdates}
                  onChange={(e) => setAgreeToUpdates(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#c9b49b] text-[#a86728] focus:ring-[#d7bfa4]"
                />
                <span className="font-montserrat text-sm leading-6 text-[#5f5447]">
                  I agree to receive updates and new releases through the email
                  address provided above.
                </span>
              </label>

              <Button
                type="submit"
                loading={isPending}
                disabled={!isFormValid}
                className="h-12 w-full rounded-full bg-[#2f2924] font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
              >
                Create My Account
              </Button>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8c7b3] bg-white px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#fff8ef]"
              >
                Log In Instead
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

export default Register;
