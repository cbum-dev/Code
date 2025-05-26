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
import { BackgroundBeams } from "../background-beams";
function Hero() {
  const [userInput, setUserInput] = useState<string>("");
  const { messages, setMessages } = useContext<any>(MessageContext);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const convex = useConvex();

  const showtextcontent = () => {
    if (userInput) {
      const text = userInput;
      console.log(text);
    }
  };
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
  const onGenerate = async (input) => {
    if (!userDetails?.name) {
      setOpenDialog(true);
      return;
    }

    const msg = {
      role: "user",
      content: input,
    };

    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetails._id,
      message: [msg],
    });

    console.log(workspaceId);
    router.push(`/workspace/${workspaceId}`);
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl relative z-10 font-bold text-gray-900 dark:text-white">
          Welcome to Bolt.new
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
              ></ArrowRight>
            ) : null}
          </div>
          <Link href="/docs" className="ml-2 text-red-500 hover:underline" />

        </div>

        <div className="flex mt-4 flex-wrap gap-2 max-w-2xl items-center justify-center">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="mt-2 text-gray-600 dark:text-gray-400">
              <Badge
                onClick={() => setUserInput(suggestion)}
                className="px-4 relative z-10 cursor-pointer py-2 text-white bg-transparent border border-neutral-800  rounded-xl hover:bg-neutral-900 dark:hover:bg-neutral-900"
              >
                {suggestion}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      <SIgnInDialog
        openDialog={openDialog}
        closeDialog={(v: void) => setOpenDialog(v)}
      />
      <BackgroundBeams />
              </div>
  );
}

export default Hero;
