"use client";
import { userUser } from "@/app/Provider";
import { supabase } from "@/services/supabseClient";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

function ScheduledInterview() {
  const { user } = userUser();
  const [interviewList, setInterviewList] = useState();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const { data: result, error } = await supabase
      .from("Interviews")
      .select(
        ` interview_id, jobPosition, duration , userEmail,
          interview_feedback (
            userEmail
          )
        `
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    // console.log(result);
    setInterviewList(result);
  };
  return (
    <div className=" mt-5 pl-1">
      <h2 className="font-bold text-xl">
        Interview List with Candidate Feedback
      </h2>
      {interviewList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center bg-white mt-5 rounded-lg">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>+ Create New Interview</Button>
        </div>
      )}

      {interviewList && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5 ">
          {interviewList.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
