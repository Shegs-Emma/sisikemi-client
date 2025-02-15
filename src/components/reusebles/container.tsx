import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        `mx-auto max-w-[1500px] px-4 sm:px-8 md:px-14 ${className}`
      )}
    >
      {children}
    </div>
  );
};

export default Container;
