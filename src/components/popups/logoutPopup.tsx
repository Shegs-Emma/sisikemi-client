import React, { FC } from "react";
import Image from "next/image";

interface LogoutProps {
  logout: () => Promise<void>;
  isLoading: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutPopup: FC<LogoutProps> = ({ logout, setIsOpen, isLoading }) => {
  return (
    <div className="mt-4 w-full bg-white rounded-md flex flex-col">
      <div className="w-[400px] flex flex-col items-center justify-center m-[auto]">
        <Image src="/assets/warning.svg" alt="logo" width={72} height={72} />

        <p className="font-montserrat font-bold text-2xl text-[#363435] my-2">
          Oh no! You are leaving?
        </p>

        <p className="font-montserrat font-normal text-sm text-[#4f4f4f]">
          Are you sure you want to log out of your account?
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="font-montserrat text-sm font-medium text-[#ffffff] mt-6 w-full h-[48px] bg-[#363435] rounded"
        >
          Cancel
        </button>

        {isLoading ? (
          <button className="font-montserrat text-sm font-medium text-[#363435] mt-6 w-full h-[48px] border-[1px] border-[#363435] rounded">
            Logging you out ...
          </button>
        ) : (
          <button
            onClick={logout}
            className="font-montserrat text-sm font-medium text-[#363435] mt-6 w-full h-[48px] border-[1px] border-[#363435] rounded"
          >
            Log me out
          </button>
        )}
      </div>
    </div>
  );
};

export default LogoutPopup;
