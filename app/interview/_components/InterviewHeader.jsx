import Image from "next/image";
import React from "react";

function InterviewHeader() {
  return (
    <div className="sticky top-0 z-10 bg-white p-3 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={200}
            height={100}
            className="w-[130px] h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default InterviewHeader;
