"use client";

import React from "react";
import { supabase } from "@/services/supabseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LogOutIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  ShieldIcon,
} from "lucide-react";
import { userUser } from "@/app/Provider";
import moment from "moment";

function Settings() {
  const { user } = userUser();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout Failed");
      console.error("Logout failed:", error.message);
    } else {
      router.push("/");
      toast.success("Logged out successfully");
    }
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-4">
          <div className="p-4 rounded-lg bg-muted">
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <UserIcon className="h-4 w-4" /> Profile
            </h2>
            <p className="text-sm text-muted-foreground">
              Update your personal information and preferences
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <BellIcon className="h-4 w-4" /> Notifications
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your notification preferences
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <ShieldIcon className="h-4 w-4" /> Security
            </h2>
            <p className="text-sm text-muted-foreground">
              Change password and security settings
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Created</p>
                <p className="font-medium">
                  {moment(user?.created_at).format("MMMM DD YYYY")}
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 rounded-lg border border-red-200 dark:border-red-800/50">
            <h2 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
              Danger Zone
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              These actions are irreversible. Proceed with caution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                variant="outline"
                onClick={goToHome}
                className="gap-2 px-6"
              >
                <HomeIcon className="h-4 w-4" />
                Back to Home
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="gap-2 px-6"
              >
                <LogOutIcon className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
