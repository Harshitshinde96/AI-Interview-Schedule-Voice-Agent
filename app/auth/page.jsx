"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabseClient";
import Image from "next/image";
import React from "react";

function Login() {
  // Used to sign in with google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md md:max-w-2xl border rounded-2xl p-8 shadow-md bg-white">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={180}
            height={100}
            className="w-[180px]"
          />
        </div>

        {/* Image and Text Section */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/login.jpg"
            alt="login"
            width={400}
            height={250}
            className="w-full max-w-[400px] h-[250px] object-cover rounded-2xl"
          />

          <h2 className="text-2xl font-bold text-center mt-4">
            Welcome to AiCruiter
          </h2>

          <p className="text-gray-500 text-center">
            Sign In With Google Authenticator
          </p>

          <Button
            onClick={signInWithGoogle}
            className="mt-6 w-full max-w-[300px] flex items-center justify-center gap-3 bg-white border border-gray-300 text-black hover:bg-gray-100"
          >
            <Image
              src="/google-icon.svg"
              alt="Google Icon"
              width={30}
              height={30}
            />
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
