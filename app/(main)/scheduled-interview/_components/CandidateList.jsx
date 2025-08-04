import { Button } from "@/components/ui/button";
import moment from "moment";
import React from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidateList({ candidateList }) {
  // Add this before rendering to check for duplicates
  console.log("Candidate List Data:", candidateList);
  return (
    <div className="">
      <h2 className="font-bold my-5">Candidates({candidateList?.length})</h2>
      {candidateList?.map((candidate, index) => (
        <div
          key={index}
          className="p-5 flex items-center justify-between bg-white rounded-lg mb-3"
        >
          <div className="flex items-center gap-5">
            <div className="bg-primary p-3 px-4.5 font-bold rounded-full text-white min-w-10 flex items-center justify-center">
              {candidate?.userName?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <h2 className="font-bold">{candidate?.userName}</h2>
              <h2 className="text-sm text-gray-500">
                Completed On:{" "}
                {moment(candidate?.created_at).format("MMM DD YYYY")}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#6C63FF] font-medium min-w-[50px] text-right pr-3">
              6/10
            </span>
            <CandidateFeedbackDialog candidate={candidate} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidateList;
