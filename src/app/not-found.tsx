import React from "react";

const custom404 = () => {
  return (
    <div className="relative" style={{ minHeight: "calc(100vh - 70px)" }}>
      <h1
        className="absolute md:text-[25px] text-[22px] font-medium text-[#363435]"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%" }}
      >
        404 | Not Found.
      </h1>
    </div>
  );
};

export default custom404;
