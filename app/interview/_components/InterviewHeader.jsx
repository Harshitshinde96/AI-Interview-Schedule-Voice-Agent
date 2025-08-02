import Image from "next/image";
import React from "react";

function InterviewHeader() {
  return (
    <div className="p-3 shadow-sm">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={200}
        height={100}
        className="w-[130px]"
      />
    </div>
  );
}

export default InterviewHeader;
