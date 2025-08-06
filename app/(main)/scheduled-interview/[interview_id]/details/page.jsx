"use client";
import { userUser } from "@/app/Provider";
import { supabase } from "@/services/supabseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDeatilsContainer from "../../_components/InterviewDeatilsContainer";
import CandidateList from "../../_components/CandidateList";

function InterviewDeatils() {
  const { interview_id } = useParams();
  const { user } = userUser();
  const [interviewDetail, setInterviewDetail] = useState();

  useEffect(() => {
    if (user && interview_id) {
      getInterviewDetail();
    }
  }, [user, interview_id]);
  const getInterviewDetail = async () => {
    // console.log("interview_id from useParams:", interview_id);
    // console.log("user email:", user?.email);

    const { data: result, error } = await supabase
      .from("Interviews")
      .select(
        ` interview_id, jobPosition,jobDescription,type, questionList, duration ,created_at,
              interview_feedback (
                userEmail,
                userName,
                feedback,
                created_at
              )
            `
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id.trim())
      .maybeSingle();
    setInterviewDetail(result);
    // console.log(result);
  };
  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDeatilsContainer interviewDetail={interviewDetail} />
      <CandidateList candidateList={interviewDetail?.["interview_feedback"]} />
    </div>
  );
}

export default InterviewDeatils;
