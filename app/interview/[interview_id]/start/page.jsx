"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import Image from "next/image";
import TimerComponent from "./_components/TimerComponent";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabseClient";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [vapi] = useState(
    () => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY)
  );
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const [conversation, setConversation] = useState();
  const conversationRef = useRef();
  const feedbackGeneratedRef = useRef(false); // Added this line
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    interviewInfo && startCall();
    feedbackGeneratedRef.current = false; // Reset on new interview
  }, [interviewInfo]);

  useEffect(() => {
    const handleMessage = (message) => {
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        setConversation(convoString);
        conversationRef.current = convoString;
      }
    };

    const handleCallStart = () => toast("Call Connected...");
    const handleSpeechStart = () => setActiveSpeaker("ai");
    const handleSpeechEnd = () => setActiveSpeaker("user");
    const handleCallEnd = () => {
      if (!feedbackGeneratedRef.current) {
        feedbackGeneratedRef.current = true;
        toast("Interview Ended");
        setActiveSpeaker(null);
        generateFeedback();
      }
    };

    // Set up all event listeners
    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);

    // Cleanup function
    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
    };
  }, []);

  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach(
      (item, index) => (questionList = item?.question + "," + questionList)
    );

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Let’s get started with a few questions!"

Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions ask one by one:
Questions: ` +
              questionList +
              `

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"

After 5–7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
- Be friendly, engaging, and witty
- Keep responses short and natural, like a real conversation
- Adapt based on the candidate’s confidence level
- Ensure the interview remains focused on React
        `.trim(),
          },
        ],
      },
    };
    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    try {
      setLoading(true);
      vapi.stop();
      // Don't call generateFeedback here - it will be called by the call-end event
    } catch (error) {
      console.error("Error stopping interview:", error);
      toast.error("Failed to end interview");
    } finally {
      setLoading(false);
    }
  };

  const generateFeedback = async () => {
    try {
      setLoading(true);
      const currentConversation = conversationRef.current;

      if (!currentConversation) {
        toast.error("No conversation recorded");
        return;
      }

      const result = await axios.post("/api/ai-feedback", {
        conversation: currentConversation,
      });

      // Safely handle the response content
      let feedbackContent;
      if (typeof result.data.content === "string") {
        feedbackContent = result.data.content;
      } else if (result.data.content?.content) {
        // Handle case where content is an object with a content property
        feedbackContent = result.data.content.content;
      } else {
        // Fallback to stringifying if content is an object
        feedbackContent = JSON.stringify(result.data.content);
      }

      // Clean the content if it's a string
      const FINAL_CONTENT =
        typeof feedbackContent === "string"
          ? feedbackContent.replace(/```json|```/g, "")
          : feedbackContent;

      // Parse to JSON if it's a string that needs parsing
      const parsedFeedback =
        typeof FINAL_CONTENT === "string"
          ? JSON.parse(FINAL_CONTENT)
          : FINAL_CONTENT;

      const { data, error } = await supabase
        .from("interview_feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: parsedFeedback,
            recommendation: false,
          },
        ])
        .select();

      if (error) throw error;
      router.replace("/interview/" + interview_id + "/completed");
    } catch (error) {
      console.error("Feedback generation failed:", error);
      toast.error(error.message || "Failed to generate feedback");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-[calc(96vh-56px)]">
      {/* Compact Header Bar */}
      <div className="flex justify-between items-center p-3 border-b">
        <h1 className="text-lg font-semibold">AI Interview Session</h1>
        <TimerComponent activeSpeaker={activeSpeaker} />
      </div>

      {/* Main Content - Fixed Height */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
        {/* AI Interviewer */}
        <div className="bg-gray-50 rounded-lg border flex flex-col items-center justify-center p-2 relative">
          <div className="relative mb-2">
            {activeSpeaker === "ai" && (
              <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping" />
            )}
            <div className="relative">
              <Image
                src="/ai-interviewer.jpg"
                alt="AI Recruiter"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-white relative z-10"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-2 h-2 border border-white z-20"></div>
            </div>
          </div>
          <h2 className="font-medium text-sm">AI Recruiter</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>

        {/* User */}
        <div className="bg-gray-50 rounded-lg border flex flex-col items-center justify-center p-2 relative">
          <div className="relative mb-2">
            {activeSpeaker === "user" && (
              <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping" />
            )}
            <div className="w-12 h-12 bg-primary text-white text-lg rounded-full flex items-center justify-center relative z-10">
              {interviewInfo?.userName?.[0]?.toUpperCase() || "?"}
            </div>
          </div>
          <h2 className="font-medium text-sm">
            {interviewInfo?.userName || "Guest User"}
          </h2>
          <p className="text-xs text-gray-500">Candidate</p>
        </div>
      </div>

      {/* Controls - Fixed at Bottom */}
      <div className="p-4 border-t">
        <div className="flex justify-center gap-3">
          <button
            className="p-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
            onClick={() => setIsMuted(!isMuted)}
          >
            <Mic className={`h-4 w-4 ${isMuted ? "text-gray-500" : ""}`} />
          </button>

          <AlertConfirmation stopInterview={stopInterview}>
            <div
              className={`p-2 rounded-full ${
                loading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 cursor-pointer"
              } transition-colors flex items-center justify-center`}
            >
              {loading ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <Phone className="h-4 w-4" />
              )}
            </div>
          </AlertConfirmation>
        </div>
        <div className="mt-2 text-center">
          <div className="inline-flex items-center px-2 py-1 bg-blue-50 rounded-full">
            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-1 animate-pulse"></div>
            <span className="text-xs text-blue-600">
              Interview in Progress...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
