import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabseClient";
import { v4 as uuidv4 } from "uuid";
import { userUser } from "@/app/Provider";

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
  const { user } = userUser();
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

  const generateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      console.log(result.data.content);
      // const Content = result.data.content;
      // const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
      // setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);

      let content = result.data.content;

      // Handle both cases - with or without markdown code blocks
      if (content.startsWith("```json")) {
        content = content.replace("```json", "").replace("```", "");
      }

      // Parse the content directly if it's already JSON
      const parsedContent = JSON.parse(content);

      // Handle both possible response structures
      setQuestionList(parsedContent.interviewQuestions || parsedContent);

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("Server Error, Try Again");
      setLoading(false);
    }
  };

  // const generateQuestionList = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.post("/api/ai-model", formData);

  //     if (!data?.content) throw new Error(data?.error || "No content received");

  //     const extractQuestions = (content) => {
  //       // Clean and normalize the content
  //       const cleaned = content.replace(/```(json)?/g, "").trim();

  //       // Try to find array-like patterns
  //       const arrayPatterns = [
  //         /interviewQuestions\s*=\s*(\[.*?\])/s, // interviewQuestions=[...]
  //         /(\[.*?\])/s, // Just the array
  //       ];

  //       for (const pattern of arrayPatterns) {
  //         const match = cleaned.match(pattern);
  //         if (match) {
  //           try {
  //             // Try parsing directly first
  //             const parsed = JSON.parse(match[1]);
  //             return Array.isArray(parsed)
  //               ? parsed
  //               : parsed?.interviewQuestions || [];
  //           } catch {
  //             // If direct parse fails, try fixing common JSON issues
  //             try {
  //               const fixed = match[1]
  //                 .replace(/(\w+)\s*:/g, '"$1":') // Add quotes to keys
  //                 .replace(/'/g, '"') // Single to double quotes
  //                 .replace(/,\s*]/g, "]"); // Remove trailing commas
  //               return JSON.parse(fixed);
  //             } catch {}
  //           }
  //         }
  //       }

  //       // Fallback - try parsing the entire content as JSON
  //       try {
  //         const parsed = JSON.parse(cleaned);
  //         return Array.isArray(parsed)
  //           ? parsed
  //           : parsed?.interviewQuestions || parsed?.questions || [];
  //       } catch {
  //         throw new Error("Couldn't parse questions from response");
  //       }
  //     };

  //     const questions = extractQuestions(data.content);
  //     setQuestionList(questions);
  //   } catch (error) {
  //     console.error("Generation error:", error);
  //     toast.error(
  //       error.response?.status === 429
  //         ? "API limit reached - try again later"
  //         : error.message.includes("Rate limit")
  //         ? "Daily limit reached"
  //         : "Failed to generate questions"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Sending All data to Interviews table in supabase
  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();
    setSaveLoading(false);
    console.log(data);
    console.log(error);
    onCreateLink(interview_id);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50  font-semibold rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="">Generating Interview Questions</h2>
            <p className=" text-[#6C63FF] ">
              Our AI is crafting personalized questions based on your job
              position
            </p>
          </div>
        </div>
      )}

      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader2Icon className="animate-spin" />} Create
          Interview Link & Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
