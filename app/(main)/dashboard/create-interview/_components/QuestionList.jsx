import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
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
      const Content = result.data.content;
      //   const FINAL_CONTENT =  Content.replace(/```json\s*/, "").replace(/```$/, "").trim();
      //   setQuestionList(JSON.parse(FINAL_CONTENT));

      const jsonMatch = Content.match(/```json\s*({[\s\S]*?})\s*```/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1]);
        setQuestionList(parsed);
      } else {
        toast("Failed to parse AI response");
        console.error("No JSON block found in response:", Content);
      }

      setLoading(false);
    } catch (error) {
      toast("Server Error, Try Again");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50  font-semibold rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="">Generating Interview Questions</h2>
            <p className=" text-[#6C63FF] ">
              Our AI is crafting personalized questions bases on your job
              position
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
