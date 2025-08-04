"use client";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { userUser } from "@/app/Provider";
import { supabase } from "@/services/supabseClient";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

function AllInterviews() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = userUser();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);
  const getInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    setInterviewList(Interviews);
  };

  return (
    <div className="my-5">
      <h2 className="my-3 font-bold text-2xl pl-2">
        All Previously Ceated Interviews
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
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
export default AllInterviews;
