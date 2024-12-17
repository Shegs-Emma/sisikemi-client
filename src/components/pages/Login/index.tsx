"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { LoginUserInterface } from "@/utils/interface";

const Login = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { login } = useUserStore((state: any) => ({
    login: state.login,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const {
    register, // register inputs
    handleSubmit, // handle form submit
    formState: { errors, isValid }, // track form errors
  } = useForm<LoginUserInterface>();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Function to handle form submission
  const onSubmit: SubmitHandler<LoginUserInterface> = (data) => {
    const { email, password } = data;
    startTransition(async () => {
      try {
        const isAdmin = true;
        await login({ email, password }, router, isAdmin);
      } catch (err) {
        console.error("Error in:", err);
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[520px] flex flex-col items-center">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/main_logo.svg"
            alt="report"
            width={89}
            height={60}
          />
          <p className="font-montserrat font-semibold text-3xl text-[#4F4F4F] my-4">
            Log into your Account
          </p>
        </div>

        <div className="flex flex-col w-full mt-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto w-full"
          >
            {/* Username Field */}
            <div className="mb-8">
              <label
                htmlFor="email"
                className="block text-base font-medium  text-[#333333]"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full border border-[#e4e4e7] bg-[#ffffff] text-[#363435] rounded-md p-2 h-[49px] outline-none"
              />
              {errors.email && (
                <p className="text-red text-xs mt-2">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-base font-medium  text-[#333333]"
              >
                Password
              </label>
              <div className="flex justify-between mt-1 block w-full border border-[#e4e4e7] bg-[#ffffff] text-[#363435] rounded-md p-2 h-[49px]">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="w-full outline-none"
                />

                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="transform -translate-y-1/2 mt-3 mx-2"
                >
                  {isPasswordVisible ? (
                    <EyeOff color="#4b5563" size={20} />
                  ) : (
                    <Eye color="#4b5563" size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                className={`w-full px-5 py-3 rounded-lg mt-8 text-[#ffffff] font-normal text-lg h-[48px] bg-[#363534] ${
                  !isValid
                    ? "bg-opacity-[70%] text-gray"
                    : " over:bg-opacity-70"
                }
              `}
                disabled={!isValid}
                loading={isPending}
                variant="yellow"
                type="submit"
              >
                <div className="flex flex-row justify-between items-center w-[4rem]">
                  Login
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
