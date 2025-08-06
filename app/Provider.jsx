"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabseClient";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    createNewUser();
  }, []);
  const createNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);

      // console.log(Users);
      //If not then create new user
      if (Users?.length == 0) {
        const { data, error } = await supabase.from("Users").insert([
          {
            name: user?.user_metadata?.name,
            email: user?.email,
            picture: user?.user_metadata?.picture,
          },
        ]);
        console.log(data);
        setUser(data);
        return;
      }
      setUser(Users[0]);
    });
  };
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <UserDetailContext.Provider value={{ user, setUser }}>
        <div>{children}</div>
      </UserDetailContext.Provider>
    </PayPalScriptProvider>
  );
}

export default Provider;

export const userUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
