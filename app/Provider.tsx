// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import Header from "@/components/ui/custom/Header";
import Footer from "@/components/ui/custom/Footer";
import { ModeToggle } from "@/components/ui/custom/DarkMode";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
}

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  picture: string;
  uid: string;
}

function Provider({ children }: { children: React.ReactNode }) {
  const [Messages, setMessages] = useState<Message[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const convex = useConvex();

  const isAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const result = await convex.query(api.users.GetUser, {
        email: user?.email || "",
      });
      setUserDetails(result);
      console.log("User Details:", result);
    }
    return null;
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div suppressHydrationWarning>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
        <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
          <MessageContext.Provider value={{ Messages, setMessages }}>
              <Header />
              {children}
              <Footer/>
              <ModeToggle />

          </MessageContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
