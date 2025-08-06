"use client";
import { userUser } from "@/app/Provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabseClient";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import { toast } from "sonner";

function LatestInterviewsList() {
  const [interviewsList, setInterviewsList] = useState([]);
  const { user } = userUser();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);
  const getInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false })
      .limit(6);

    // console.log(Interviews);
    setInterviewsList(Interviews);
  };

  return (
    <div className="my-5">
      <h2 className="my-3 font-bold text-2xl pl-1">
        Previously Ceated Interviews
      </h2>
      {interviewsList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center bg-white mt-5 rounded-lg">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>+ Create New Interview</Button>
        </div>
      )}

      {interviewsList && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5 ">
          {interviewsList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;
