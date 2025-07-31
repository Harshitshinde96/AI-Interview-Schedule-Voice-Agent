"use client";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import React, { useState } from "react";

function LatestInterviewsList() {
  const [interviewsList, setInterviewsList] = useState([]);
  return (
    <div className="my-5">
      <h2 className="my-3 font-bold text-2xl">Previously Ceated Interviews</h2>
      {interviewsList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center bg-white mt-5 rounded-lg">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>+ Create New Interview</Button>
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;
