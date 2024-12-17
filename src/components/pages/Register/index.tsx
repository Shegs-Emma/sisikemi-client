"use client";

import React, { useState, useTransition } from "react";
import { Checkbox } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import PasswordChecklist from "react-password-checklist";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [visibilityConfirm, setVisibilityConfirm] = useState(false);
  // const [passwordValid, setPaswordValid] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const [errorFields, setErrorFields] = useState({
    username: false,
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    phone_number: false,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { register } = useUserStore((state: any) => ({
    register: state.register,
  }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const InputType = visibility ? "text" : "password";
  const InputTypeConfirm = visibilityConfirm ? "text" : "password";

  const viewer = () => {
    setVisibility(!visibility);
  };

  const viewerConfirm = () => {
    setVisibilityConfirm(!visibilityConfirm);
  };

  // Handle change code ========================================================================================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (value.trim() !== "") {
      setErrorFields({
        ...errorFields,
        [name]: false,
      });
    }
  };

  const handleSubmit = () => {
    try {
      // if (!passwordValid) return;
      if (pwd !== confirmPwd) return;

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
        <div className="flex flex-col w-[640px] bg-[#ffffff] py-6 relative top-[7rem] mb-[10rem] px-12 shadow-2xl rounded">
          <div className="flex flex-col justify-center items-center">
            <p className="font-montserrat font-semibold text-lg text-[#333333]">
              REGISTER
            </p>
            <p className="font-montserrat font-medium text-xs text-[#333333] mt-2">
              Please fill in the information below
            </p>
          </div>
          <div className="flex flex-col w-full mt-8">
            <div className="flex flex-col w-full">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    width: "100%",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  color="success"
                  size="small"
                  name="first_name"
                  onChange={handleChange}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm font-montserrat rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                  )}
                />
              </Box>
            </div>

            <div className="flex flex-col w-full mt-6">
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { width: "100%" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  color="success"
                  name="last_name"
                  onChange={handleChange}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                  )}
                />
              </Box>
            </div>

            <div className="flex flex-col w-full mt-6">
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
                  name="email"
                  onChange={handleChange}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                  )}
                />
              </Box>
            </div>

            <div className="flex flex-col w-full mt-6">
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { width: "100%" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  color="success"
                  name="phone_number"
                  type="number"
                  onChange={handleChange}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                  )}
                />
              </Box>
            </div>

            <div className="flex flex-col w-full mt-6">
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
                  label="Username"
                  variant="outlined"
                  size="small"
                  color="success"
                  name="username"
                  onChange={handleChange}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435]"
                  )}
                />
              </Box>
            </div>

            <div className="flex flex-col w-full mt-6">
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
                className="transform -translate-y-1/2 mt-5 mx-2 absolute left-[34rem]"
              >
                {visibility ? (
                  <EyeOff color="#4b5563" size={20} />
                ) : (
                  <Eye color="#4b5563" size={20} />
                )}
              </button>
            </div>

            <div className="flex flex-col w-full mt-6">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "100%", border: "none" },
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
                  value={confirmPwd}
                  type={InputTypeConfirm}
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
                className="transform -translate-y-1/2 mt-5 mx-2 absolute left-[34rem]"
              >
                {visibilityConfirm ? (
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
                  I agree to recieve updates and new releases to my email
                  address used above
                </p>
              </div>
            </div>

            {pwd ? (
              <div className="px-2 pt-1">
                <PasswordChecklist
                  className="text-[11px] text-[#363435] font-semibold checked:h-2"
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
                <div className="flex flex-col w-full p-3 cursor-pointer items-center ml-[5%] font-semibold text-sm rounded mt-8 bg-[#363435] mb-4 cursor-pointer">
                  loading....
                </div>
              ) : (
                <div
                  onClick={() => handleSubmit()}
                  className="flex flex-col w-full p-3 cursor-pointer items-center ml-[5%] font-semibold text-sm rounded mt-8 bg-[#363435] mb-4 cursor-pointer"
                >
                  CREATE MY ACCOUNT
                </div>
              )}

              <p
                onClick={() => router.push("/login")}
                className="font-montserrat text-base font-medium text-[#4f4f4f] cursor-pointer"
              >
                LOG IN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
