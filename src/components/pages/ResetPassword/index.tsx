"use client";

import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import ReactPasswordChecklist from "react-password-checklist";
import ResetPasswordWeb from "./ResetPasswordWeb";
import ResetPasswordMobile from "./ResetPasswordMobile";

const ResetPassword = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [visibilityNew, setVisibilityNew] = useState(false);
  const [visibilityConfirm, setVisibilityConfirm] = useState(false);
  const [email, setEmail] = useState<string | null>("");
  const [code, setCode] = useState<string | null>("");

  const newPasswordInputType = visibilityNew ? "text" : "password";
  const confirmPasswordInputType = visibilityConfirm ? "text" : "password";

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
    <div className="w-full fixed z-50 flex flex-col">
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

      <ResetPasswordWeb
        onSubmit={onSubmit}
        newPasswordInputType={newPasswordInputType}
        setNewPwd={setNewPwd}
        newPwd={newPwd}
        visibilityNew={visibilityNew}
        viewerNew={viewerNew}
        confirmPasswordInputType={confirmPasswordInputType}
        confirmPwd={confirmPwd}
        setConfirmPwd={setConfirmPwd}
        viewerConfirm={viewerConfirm}
        visibilityConfirm={visibilityConfirm}
        isPending={isPending}
      />

      <ResetPasswordMobile
        onSubmit={onSubmit}
        newPasswordInputType={newPasswordInputType}
        setNewPwd={setNewPwd}
        newPwd={newPwd}
        visibilityNew={visibilityNew}
        viewerNew={viewerNew}
        confirmPasswordInputType={confirmPasswordInputType}
        confirmPwd={confirmPwd}
        setConfirmPwd={setConfirmPwd}
        viewerConfirm={viewerConfirm}
        visibilityConfirm={visibilityConfirm}
        isPending={isPending}
      />

      {/* <div className="flex flex-col w-[640px] bg-[#ffffff] py-6 px-12 shadow-2xl ml-[30%] mt-12 rounded">
        <div className="flex flex-col justify-center items-center">
          <p className="font-montserrat font-semibold text-lg text-[#333333]">
            RESET YOUR PASSWORD
          </p>
          <p className="font-montserrat font-medium text-xs text-[#333333] mt-2">
            Please input and confirm your new password
          </p>
        </div>
        <div className="flex flex-col w-full mt-8">
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
                label="New Password"
                variant="outlined"
                size="small"
                color="success"
                type={NewPasswordInputType}
                value={newPwd}
                onChange={(e) => {
                  const limit = 30;

                  // 👇️ only take first N characters
                  setNewPwd(e.target.value.slice(0, limit));
                }}
                className={twMerge(
                  "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                )}
              />
            </Box>
            <button
              type="button"
              onClick={viewerNew}
              className="transform -translate-y-1/2 mt-5 mx-2 absolute right-[20rem]"
            >
              {visibilityNew ? (
                <EyeOff color="#4b5563" size={20} />
              ) : (
                <Eye color="#4b5563" size={20} />
              )}
            </button>
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
                label="Confirm Password"
                variant="outlined"
                size="small"
                color="success"
                type={ConfirmPasswordInputType}
                value={confirmPwd}
                onChange={(e) => {
                  const limit = 30;

                  // 👇️ only take first N characters
                  setConfirmPwd(e.target.value.slice(0, limit));
                }}
                className={twMerge(
                  "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                )}
              />
            </Box>
            <button
              type="button"
              onClick={viewerConfirm}
              className="transform -translate-y-1/2 mt-5 mx-2 absolute right-[20rem]"
            >
              {visibilityConfirm ? (
                <EyeOff color="#4b5563" size={20} />
              ) : (
                <Eye color="#4b5563" size={20} />
              )}
            </button>
          </div>

          {newPwd ? (
            <div className="px-2 pt-1">
              <ReactPasswordChecklist
                className="text-[11px] text-[#363435] font-semibold checked:h-2"
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
                // onChange={(isValid) => {
                //   isValid ? setPaswordValid(true) : setPaswordValid(false);
                // }}
                messages={{
                  minLength: "The password has more than 8 characters.",
                  specialChar: "The password has special characters.",
                  number: "The password has a number.",
                  capital: "The password has an uppercase letter.",
                  match: "The passwords match.",
                }}
                iconSize={10}
                validColor={"#8DAA6A"}
              />
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col justify-center items-center">
            {isPending ? (
              <div className="flex flex-col w-full p-3 cursor-pointer items-center font-semibold text-sm rounded mt-8 bg-[#363435] mb-4">
                Loading...
              </div>
            ) : (
              <div
                onClick={() => onSubmit()}
                className="flex flex-col w-full p-3 cursor-pointer items-center font-semibold text-sm rounded mt-8 bg-[#363435] mb-4"
              >
                SUBMIT
              </div>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ResetPassword;
