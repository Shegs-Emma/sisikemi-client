"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaArrowRightLong } from "react-icons/fa6";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isValid, setIsValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register, // register inputs
    handleSubmit, // handle form submit
    formState: { errors }, // track form errors
  } = useForm();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[520px] flex flex-col items-center">
        <div className="flex flex-col items-center">
          <Image src="/assets/logo.svg" alt="report" width={89} height={60} />
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
                htmlFor="username"
                className="block text-base font-medium  text-[#333333]"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className="mt-1 block w-full border border-[#e4e4e7] bg-[#ffffff] rounded-md p-2 h-[49px]"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
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
                className="mt-1 block w-full border border-[#e4e4e7] bg-[#ffffff] rounded-md p-2 h-[49px]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[27rem] right-[27rem] transform -translate-y-1/2"
              >
                {isPasswordVisible ? (
                  <EyeOff color="#4b5563" size={20} />
                ) : (
                  <Eye color="#4b5563" size={20} />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <Button
                className={`w-full px-5 py-3 rounded-lg mt-8 text-[#ffffff] font-normal text-lg h-[48px] ${
                  !isValid
                    ? "bg-lightgray text-gray"
                    : "bg-[#363534] hover:bg-opacity-70"
                }
              `}
                // disabled={!isValid}
                // loading={isPending}
                variant="yellow"
                type="submit"
              >
                <div className="flex flex-row justify-between items-center w-[4rem]">
                  Next
                  <FaArrowRightLong />
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
