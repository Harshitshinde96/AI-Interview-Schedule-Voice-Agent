'use client'
import { supabase } from "@/services/supabseClient";
import React, { useEffect } from "react";

function ScheduledInterview() {
  const { user } = userUser();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);
  const getInterviewList = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        "jobPosition, duration, interview_id, interview-feedback(userEmail)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    console.log(result);
  };
  return <div>ScheduledInterview</div>;
}

export default ScheduledInterview;
