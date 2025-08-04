import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  Linkedin,
  List,
  Mail,
  MessageCircle,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;

  const GetInterviewURL = () => {
    return url;
  };

  // Copy Link Functionality
  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link Copied");
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src={"/check.png"}
        alt="check"
        width={200}
        height={200}
        className="w-[50px] h-[50px] animate-bounce"
      />
      <h2 className="font-bold text-lg mt-4">Your AI Interview is Ready!</h2>
      <p className="mt-3">
        Share this link with your candidate to start the interview
      </p>

      <div className="w-full p-7 mt-6 rounded-lg bg-white ">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link </h2>
          <h2 className="p-1 px-2 text-[#6C63FF] font-medium bg-blue-50 rounded-4xl">
            Valid for 30 Days
          </h2>
        </div>
        <div className="mt-4 flex gap-3 items-center ">
          <Input defaultValue={GetInterviewURL()} disabled={true} />
          <Button onClick={() => onCopyLink()}>
            <Copy className="animate-pulse" /> Copy Link
          </Button>
        </div>
        <hr className="my-5" />

        <div className="flex gap-5">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock className="h-4 w-4" /> {formData?.duration}
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" /> 10 Questions
          </h2>
          {/* <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Calendar className="h-4 w-4" /> 30 Min{formData?.duration}
          </h2> */}
        </div>
      </div>

      <div className="mt-7 bg-white p-7 rounded-lg w-full">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-7 mt-4 justify-around">
          <Button variant={"outline"} className="bg-white ">
            <Mail />
            Email
          </Button>
          <Button variant={"outline"} className="bg-white ">
            <Linkedin />
            Linkedin
          </Button>
          <Button variant={"outline"} className="bg-white ">
            <MessageCircle />
            Whatsapp
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-5 justify-between mt-6">
        <Link href={"/dashboard"}>
          <Button varient={"outline"}>
            <ArrowLeft />
            Back to Dashboard
          </Button>
        </Link>
        <Link href={"/dashboard/create-interview"}>
          <Button>
            <Plus />
            Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
