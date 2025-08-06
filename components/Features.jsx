import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  MessageCircle,
  Settings2,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: Settings2,
    title: "Smart Interview Recording",
    description:
      "Automatically record, transcribe, and analyze candidate responses with timestamped insights.",
  },
  {
    icon: Blocks,
    title: "Technical Skill Assessment",
    description:
      "Evaluate coding skills in real-time with our integrated IDE and auto-grading system.",
  },
  {
    icon: Bot,
    title: "AI-Powered Analysis",
    description:
      "Get sentiment analysis, answer quality scores, and competency mapping.",
  },
  {
    icon: Film,
    title: "Candidate Comparison Dashboard",
    description:
      "Side-by-side evaluation of applicants with standardized scoring metrics.",
  },
  {
    icon: ChartPie,
    title: "Behavioral Insights",
    description:
      "AI-powered evaluation of communication style and cultural fit indicators.",
  },
  {
    icon: MessageCircle,
    title: "Collaborative Evaluation",
    description:
      "Share candidate profiles with team members and gather structured feedback.",
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-12 xs:py-20 px-6 ">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        Revolutionize Technical Hiring
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
