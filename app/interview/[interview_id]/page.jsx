"use client";
import React, { useEffect, useState } from "react";
import InterviewHeader from "../_components/InterviewHeader";
import Image from "next/image";
import { Bluetooth, Clock, Info, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabseClient";

function Interview() {
  const { interview_id } = useParams();

  const [interviewData, setInterviewData] = useState();
  useEffect(() => {
    interview_id && getIntereviewDetails();
  }, [interview_id]);
  const getIntereviewDetails = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("jobPosition, jobDescription, duration, type")
      .eq("interview_id", interview_id);

    setInterviewData(Interview[0]);
    // console.log(Interviews);
  };
  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-70 mt-14 ">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52 mb-20">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[140px]"
        />
        <h2 className="mt-3">AI-Powered Interview Platform</h2>
        <Image
          src={"/interview.jpg"}
          alt="interview"
          width={500}
          height={500}
          className="w-[350px] my-1"
        />
        <h2 className="font-bold text-xl ">Full Stack Developer Interview</h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3">
          <Clock className="h-4 w-4" /> 30 Min
        </h2>

        <div className="w-full flex flex-col  mt-4">
          <h2>Enter your full name</h2>
          <Input placeholder="e.g. Jhon Smith" />
        </div>

        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg mt-6 w-full">
          <div className="flex gap-6">
            <div className="shrink-0 mt-0.5">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-blue-800 mb-2">
                Before you begin
              </h2>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                  <span>Test your camera and microphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                  <span>Ensure you have a stable internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                  <span>Find a quiet place for the interview</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Button className={"mt-5 w-full font-bold"}>
          {" "}
          <Video /> Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
