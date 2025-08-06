import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  const averageRating = feedback?.rating
    ? Math.round(
        (feedback.rating.technicalSkills +
          feedback.rating.communication +
          feedback.rating.problemSolving +
          feedback.rating.experience) /
          4
      )
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white text-primary border-primary hover:bg-gray-50 "
        >
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="bg-primary p-3 px-4.5 font-bold rounded-full text-white min-w-10 flex items-center justify-center">
                    {candidate?.userName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h2 className="font-bold">{candidate?.userName}</h2>
                    <h2 className="text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary text-2xl font-bold">
                    {averageRating ? `${averageRating}/10` : "N/A"}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Skills Assesment</h2>
                <div className="mt-5 grid grid-cols-2 gap-10">
                  <div className="mt-3">
                    <h2 className="flex justify-between">
                      Technical Skills{" "}
                      <span>{feedback?.rating?.technicalSkills}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.technicalSkills * 10}
                      className={"mt-2"}
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="flex justify-between">
                      Communication Skills{" "}
                      <span>{feedback?.rating?.communication}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.communication * 10}
                      className={"mt-2"}
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="flex justify-between">
                      Problem Solving{" "}
                      <span>{feedback?.rating?.problemSolving}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.problemSolving * 10}
                      className={"mt-2"}
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="flex justify-between">
                      Experience <span>{feedback?.rating?.experience}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.experience * 10}
                      className={"mt-2"}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h2 className="font-bold">Performance Summary</h2>
                <div className="p-5 bg-gray-200 my-3 rounded-md leading-6">
                  <p>{feedback?.summary}</p>
                </div>
              </div>

              <div
                className={`p-5 mt-7 rounded-md flex items-center justify-between ${
                  feedback?.recommendation == "No"
                    ? "bg-red-100"
                    : "bg-green-100"
                }`}
              >
                <div>
                  <h2
                    className={` font-bold ${
                      feedback?.recommendation == "No"
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    Recommendation Msg:
                  </h2>
                  <p
                    className={`${
                      feedback?.recommendation == "No"
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    {feedback?.recommendationMsg}
                  </p>
                </div>
                <Button
                  className={`${
                    feedback?.recommendation == "No"
                      ? "bg-red-700"
                      : "bg-green-700"
                  }`}
                >
                  Send Msg
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
{
  /* // {"feedback":{"rating":{"technicalSkills":2,"communication":3,"problemSolving":1,"experience":1},"summary":"The candidate provided minimal engagement, gave irrelevant responses to technical questions, and failed to demonstrate any frontend knowledge. Communication was unclear with nonsensical answers to direct technical queries. The interview stalled at the first question due to apparent misunderstanding.","recommendation":"No","recommendationMsg":"Candidate did not demonstrate required technical proficiency or communication clarity for a frontend role."}} */
}
export default CandidateFeedbackDialog;
