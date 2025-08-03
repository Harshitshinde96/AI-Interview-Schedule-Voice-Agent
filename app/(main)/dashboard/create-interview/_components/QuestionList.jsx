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

      // Extract JSON from the response (handles cases where there's extra text)
      const jsonMatch = content.match(/```json([\s\S]*?)```/);
      if (jsonMatch) {
        content = jsonMatch[1].trim();
      }

      // Parse the JSON content
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
