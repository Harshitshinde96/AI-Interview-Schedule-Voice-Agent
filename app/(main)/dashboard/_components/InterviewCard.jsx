import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, viewDetail = false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
  const copyLink = () => {
    navigator.clipboard.writeText(url); // For copying url
    toast("Copied");
  };

  const onSend = () => {
    const subject = encodeURIComponent("AiCruiter Interview Link");
    const body = encodeURIComponent("Interview Link: " + url);
    const mailtoLink = `mailto:harshitshinde65@gmail.com?subject=${subject}&body=${body}`;

    // window.location.href = mailtoLink;
    window.open(mailtoLink, "_blank");

    toast("Opening Gamil...");
  };
  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full "></div>
        <h2 className="text-sm">
          {moment(interview?.created_at).format("DD MM YYYY")}
        </h2>
      </div>
      <h2 className="mt-3 font-semibold text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-2 text-sm flex justify-between text-gray-500">
        {interview?.duration}
        <span className="text-green-700">
          {interview["interview_feedback"]?.length} Candidates
        </span>
      </h2>
      {!viewDetail ? (
        <div className="flex gap-3 w-full mt-5 pr-3 ">
          <Button
            variant="outline"
            className={"bg-white w-1/2 cursor-pointer"}
            onClick={copyLink}
          >
            <Copy className="mr-2" /> Copy Link
          </Button>
          <Button className={"w-1/2 cursor-pointer"} onClick={onSend}>
            <Send className="mr-2" /> Send
          </Button>
        </div>
      ) : (
        <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
          <Button className={"mt-5 w-full"} varient={"outline"}>
            View Detail
            <ArrowRight />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
