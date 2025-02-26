"use client";

import React, { useState, useTransition } from "react";
import { Checkbox } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/store/userStore";

const UserLogin = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [visibility, setVisibility] = useState(false);
  const InputType = visibility ? "text" : "password";

  const viewer = () => {
    setVisibility(!visibility);
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { login } = useUserStore((state: any) => ({
    login: state.login,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Function to handle form submission
  const onSubmit = () => {
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
    <div className="hidden md:block md:w-full fixed z-50 flex flex-col">
      <div className="w-full flex justify-between py-[1rem] px-[2rem]">
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

      <div className="flex flex-col w-[640px] bg-[#ffffff] py-6 px-12 shadow-2xl ml-[30%] mt-12 rounded">
        <div className="flex flex-col justify-center items-center">
          <p className="font-montserrat font-semibold text-lg text-[#333333]">
            LOG IN
          </p>
          <p className="font-montserrat font-medium text-xs text-[#333333] mt-2">
            Please enter your e-mail and password
          </p>
        </div>
        <div className="flex flex-col w-full mt-8">
          <div className="flex flex-col w-full">
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                size="small"
                color="success"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={twMerge(
                  "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                )}
              />
            </Box>
          </div>

          <div className="flex flex-col w-full mt-8">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                color="success"
                type={InputType}
                value={pwd}
                onChange={(e) => {
                  const limit = 30;

                  // 👇️ only take first N characters
                  setPwd(e.target.value.slice(0, limit));
                }}
                className={twMerge(
                  "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                )}
              />
            </Box>
            <button
              type="button"
              onClick={viewer}
              className="transform -translate-y-1/2 mt-5 mx-2 absolute right-[20rem]"
            >
              {visibility ? (
                <EyeOff color="#4b5563" size={20} />
              ) : (
                <Eye color="#4b5563" size={20} />
              )}
            </button>
            <div className="w-full flex m-0 p-0">
              <Checkbox
                {...label}
                className="relative -left-3 text-[#828282]"
              />
              <p className="font-lato font-normal text-sm text-[#4f4f4f] mt-3 -ml-4">
                Remember Me
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            {isPending ? (
              <div className="flex flex-col w-full p-3 cursor-pointer items-center ml-[5%] font-semibold text-sm rounded mt-8 bg-[#363435] mb-4">
                Loading...
              </div>
            ) : (
              <div
                onClick={() => onSubmit()}
                className="flex flex-col w-full p-3 cursor-pointer items-center ml-[5%] font-semibold text-sm rounded mt-8 bg-[#363435] mb-4"
              >
                LOG IN
              </div>
            )}

            <div className="flex justify-between  w-[70%] mt-4">
              <p
                onClick={() => router.push("/register")}
                className="font-montserrat text-base font-medium text-[#4f4f4f] cursor-pointer"
              >
                CREATE ACCOUNT
              </p>
              <GoDotFill color="#4f4f4f" className="mt-2" />
              <p
                onClick={() => router.push("/forgot_password")}
                className="font-montserrat text-base font-medium text-[#4f4f4f] cursor-pointer"
              >
                FORGOT PASSWORD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
