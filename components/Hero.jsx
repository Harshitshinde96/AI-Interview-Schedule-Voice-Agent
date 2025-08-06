'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center py-14 px-6 pb-25">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <Badge className="bg-primary rounded-full py-1 border-none">
            v1.0.0 is available now! 🚀
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
            AI-Powered{" "}
            <span className="text-[#6C63FF]">Interview Assistenat</span> for
            Modern Recruiters
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Let our Al voice agent conduct candidate interviews while you focus
            on finding the perfect match. Save time, reduce bias, and improve
            your hiring process.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full text-base !px-8 !py-6"
              onClick={() => router.push("/auth")}
            >
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none !px-8 !py-6"
            >
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
