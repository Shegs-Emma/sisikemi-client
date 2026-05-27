import React, { FC } from "react";
import Image from "next/image";

interface LogoutProps {
  logout: () => Promise<void>;
  isLoading: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutPopup: FC<LogoutProps> = ({ logout, setIsOpen, isLoading }) => {
  return (
    <div className="w-full rounded-[24px] bg-[linear-gradient(165deg,#fffaf4_0%,#ffffff_60%,#f8efe4_100%)] p-6 sm:p-8">
      <div className="mx-auto flex w-full max-w-[430px] flex-col items-center text-center">
        <div className="mb-5 rounded-full border border-[#efd9b8] bg-white/90 p-3 shadow-[0_10px_24px_rgba(70,45,20,0.12)]">
          <Image
            src="/assets/warning.svg"
            alt="warning icon"
            width={66}
            height={66}
          />
        </div>

        <h3 className="font-montserrat text-2xl font-semibold text-[#2f2924]">
          Leaving already?
        </h3>

        <p className="mt-3 font-montserrat text-sm leading-7 text-[#5f5a53]">
          You are about to sign out from your Sisikemi session. You can always
          come back and continue where you left off.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row-reverse">
          {isLoading ? (
            <button
              type="button"
              className="h-[50px] w-full rounded-full border border-[#2f2924] bg-[#2f2924] px-6 font-montserrat text-sm font-semibold uppercase tracking-[0.14em] text-white"
              disabled
            >
              Logging Out...
            </button>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="h-[50px] w-full rounded-full border border-[#2f2924] bg-[#2f2924] px-6 font-montserrat text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-[#433932]"
            >
              Log Me Out
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="h-[50px] w-full rounded-full border border-[#d4c1ab] bg-white px-6 font-montserrat text-sm font-semibold uppercase tracking-[0.14em] text-[#5f5a53] transition-colors duration-200 hover:bg-[#fffaf4]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
