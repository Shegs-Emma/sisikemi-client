"use client";

import React, { Dispatch, FC, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Eye, EyeOff } from "lucide-react";
import ReactPasswordChecklist from "react-password-checklist";

interface VerificationCodeProps {
  onSubmit: () => void;
  newPasswordInputType: string;
  isPending: boolean;
  setNewPwd: Dispatch<SetStateAction<string>>;
  setConfirmPwd: Dispatch<SetStateAction<string>>;
  newPwd: string;
  visibilityNew: boolean;
  viewerNew: () => void;
  viewerConfirm: () => void;
  confirmPasswordInputType: string;
  confirmPwd: string;
  visibilityConfirm: boolean;
}

const ResetPasswordWeb: FC<VerificationCodeProps> = ({
  onSubmit,
  newPasswordInputType,
  setNewPwd,
  newPwd,
  visibilityNew,
  viewerNew,
  confirmPasswordInputType,
  confirmPwd,
  setConfirmPwd,
  viewerConfirm,
  visibilityConfirm,
  isPending,
}) => {
  return (
    <div className="hidden sm:flex flex-col w-[640px] bg-[#ffffff] py-6 px-12 shadow-2xl m-[auto] mt-12 rounded">
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
              type={newPasswordInputType}
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
            className="transform -translate-y-1/2 mt-5 mx-2 absolute sm:right-[7rem] md:right-[15rem] lg:right-[23rem]"
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
              type={confirmPasswordInputType}
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
            className="transform -translate-y-1/2 mt-5 mx-2 absolute sm:right-[7rem] md:right-[15rem] lg:right-[23rem]"
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
              rules={["minLength", "specialChar", "number", "capital", "match"]}
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
    </div>
  );
};

export default ResetPasswordWeb;
