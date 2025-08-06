"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabseClient";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  // const signInWithGoogle = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data, error } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: `${window.location.origin}/dashboard`,
  //         queryParams: {
  //           // Ensure all required profile fields are returned
  //           access_type: "offline",
  //           prompt: "consent",
  //         },
  //       },
  //     });

  //     if (error) throw error;

  //     // Additional check to prevent NULL user records
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     if (!user) {
  //       throw new Error("User authentication failed - no user data returned");
  //     }

  //     // Insert/update user profile in your database
  //     const { error: profileError } = await supabase.from("profiles").upsert({
  //       id: user.id,
  //       email: user.email,
  //       full_name: user.user_metadata?.full_name || "",
  //       avatar_url: user.user_metadata?.avatar_url || "",
  //       updated_at: new Date().toISOString(),
  //     });

  //     if (profileError) throw profileError;
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast.error(error.message || "Login failed. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;

      // ✅ Do not handle user/profile here. It won't work reliably.
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md md:max-w-2xl border rounded-2xl p-8 shadow-lg bg-white">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={180}
            height={100}
            className="w-[180px]"
            priority
          />
        </div>

        {/* Image and Text Section */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/login.jpg"
            alt="login"
            width={400}
            height={250}
            className="w-full max-w-[400px] h-[250px] object-cover rounded-xl shadow-sm"
            priority
          />

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome to AiCruiter
            </h2>
            <p className="text-gray-600">
              Streamline your hiring process with AI-powered interviews
            </p>
          </div>

          <Button
            onClick={signInWithGoogle}
            disabled={isLoading}
            className="mt-6 w-full max-w-[300px] flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Image
                  src="/google-icon.svg"
                  alt="Google Icon"
                  width={20}
                  height={20}
                />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
