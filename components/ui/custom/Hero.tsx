// @ts-nocheck
"use client";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SIgnInDialog from "./SIgnInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { Badge } from "../badge";
import { BackgroundBeams, Highlight } from "../background-beams";
import { Sidebar } from "lucide-react";
import { useSidebar } from "../sidebar";

function Hero() {
  const [userInput, setUserInput] = useState<string>("");
  const messageContext = useContext(MessageContext);
  const { userDetails } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const convex = useConvex();
  const {toggleSidebar} = useSidebar();

  const getWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspaceTop10, {});
      console.log("Workspace Datasssssssssssss:", result);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    getWorkspaceData();
  }, []);

  if (!messageContext) {
    console.error("MessageContext is undefined. Make sure the component is wrapped with MessageProvider.");
    return <div>Loading...</div>;
  }

  const { setMessages } = messageContext;


  const onGenerate = async (input: string) => {
    if (!userDetails?.name) {
      setOpenDialog(true);
      return;
    }

    const msg = {
      role: "user",
      content: input,
    };

    setMessages(() => [msg]); 

    try {
      const workspaceId = await CreateWorkspace({
        user: userDetails._id,
        message: [msg],
      });

      console.log(workspaceId);
      router.push(`/workspace/${workspaceId}`);
    } catch (error) {
      console.error("Error creating workspace:", error);
      setMessages([]);
    }
  };

  const suggestions = [
    "Make a todo app",
    "Build a dashboard", 
    "Create a landing page",
    "Design a portfolio",
    "Build a chat app",
    "Make a weather app",
    "Create a blog site"
  ];

  return (
    <div className="">
      <Sidebar className="relative z-50 cursor-pointer h-5 mt-2 ml-1" onClick={toggleSidebar}/>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl relative z-10 font-bold text-gray-900 dark:text-white">
          Welcome to {" "}
          <Highlight className="text-black dark:text-white">
            React.flow
          </Highlight>
        </h1>

        <p className="mb-4 relative z-10 mt-2 text-md text-gray-600 dark:text-gray-400">
          Your one-stop solution for all your needs.
        </p>
        
        <div className="p-5 border rounded-xl max-w-2xl w-full">
          <div className=" flex gap-2">
            <textarea
              placeholder="What you want to build today?..."
              className="outline-none relative z-10 p-2 w-full bg-transparent text-gray-900 dark:text-white h-32 resize-none max-h-56"
              onChange={(event) => setUserInput(event.target.value)}
              value={userInput}
              rows={1}
              cols={50}
            />
            {userInput ? (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className=" p-2 relative z-10 h-8 w-8 cursor-pointer text-white bg-red-500 rounded-md hover:bg-red-700"
              />
            ) : null}
          </div>
          <Link href="/docs" className="ml-2 text-red-500 hover:underline" />
        </div>

        <div className="flex mt-4 flex-wrap gap-2 max-w-2xl items-center justify-center">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="mt-2 text-gray-600 dark:text-gray-400">
              <Badge
                onClick={() => setUserInput(suggestion)}
                className="px-4 relative z-10 cursor-pointer py-2 dark:text-white text-neutral-700 bg-transparent border dark:border-neutral-800  rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-900"
              >
                {suggestion}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      
      <SIgnInDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
      <BackgroundBeams />
    </div>
  );
}

export default Hero;
