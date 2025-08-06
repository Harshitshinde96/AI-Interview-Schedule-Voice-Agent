"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "./_components/AppSidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
import { supabase } from "@/services/supabseClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function DashboardProvider({ children }) {
  const [userChecked, setUserChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const insertUser = async () => {
      // ✅ Step 1: Get session first
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session || !session.user) {
        router.push("/auth");
        return;
      }

      const user = session.user;

      // ✅ Step 2: Upsert user
      const { error: profileError } = await supabase.from("Users").upsert(
        {
          email: user.email,
          name: user.user_metadata?.full_name || "",
          picture: user.user_metadata?.avatar_url || "",
          created_at: new Date().toISOString(),
        },
        {
          onConflict: "email", // or "id" if you're using Supabase UID as PK
        }
      );

      if (profileError) {
        toast.error("Failed to update profile");
        console.error("Supabase profile upsert error:", profileError.message);
      }

      setUserChecked(true);
    };

    insertUser();
  }, [router]);

  if (!userChecked) return null; // optional: add spinner

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full p-10 bg-[#F2F2F2]">
        <WelcomeContainer />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import React from "react";
// import { AppSidebar } from "./_components/AppSidebar";
// import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

// function DashboardProvider({ children }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <div className="w-full p-10 bg-[#F2F2F2]">
//         {/* <SidebarTrigger /> */}
//         <WelcomeContainer />
//         {children}
//       </div>
//     </SidebarProvider>
//   );
// }

// export default DashboardProvider;
