"use client";
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

export default function TimerComponent({ activeSpeaker }) {
  const [time, setTime] = useState(0); // Time in seconds

  // Timer effect - runs when activeSpeaker changes
  useEffect(() => {
    let interval;

    // Start timer when interview starts (activeSpeaker becomes 'ai')
    if (activeSpeaker !== null) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // Reset timer when interview ends (activeSpeaker becomes null)
      setTime(0);
    }

    return () => clearInterval(interval);
  }, [activeSpeaker]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
      <Timer className="text-primary" size={16} />
      <span className="font-mono text-sm">{formatTime(time)}</span>
    </div>
  );
}
