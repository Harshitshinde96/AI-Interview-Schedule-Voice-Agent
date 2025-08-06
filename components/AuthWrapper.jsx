"use client";
import { useRouter } from "next/navigation";
import { userUser } from "@/app/Provider";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const { user } = userUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    } else {
      setIsChecking(false);
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
}
