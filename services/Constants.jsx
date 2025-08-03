import {
  BriefcaseBusinessIcon,
  Code2Icon,
  LayoutDashboard,
  LayoutGrid,
  List,
  LucideCalendarSearch,
  Puzzle,
  SettingsIcon,
  User2Icon,
  WalletCards,
} from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interview",
    icon: LucideCalendarSearch,
    path: "/scheduled-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: LayoutGrid,
  },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

❎ Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question:"",
  type:'Technical/Behavioral/Experience/Problem Solving/Leaseship'
},{
...
}]
🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
`;

export const FEEDBACK_PROMPT = `{{conversation}}  
Based on this Interview Conversation between assistant and user, give me feedback for the user interview.  
Give me a rating out of 10 for:  
- Technical Skills  
- Communication  
- Problem Solving  
- Experience  
  
Also give me:  
- A summary in 3 lines about the interview  
- One line to let me know whether the candidate is recommended for hire or not with a message  
  
Return the response in the following JSON format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7
    },
    "summary": "<in 3 lines>",
    "recommendation": "<Yes/No>",
    "recommendationMsg": "<message>"
  }
}
`;
