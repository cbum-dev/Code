"use client";
import { Link } from "lucide-react";
import React, { useContext, useState } from "react";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SIgnInDialog from "./SIgnInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

function Hero() {
  const [userInput, setUserInput] = useState<string>("");
  const { messages, setMessages } = useContext<any>(MessageContext);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const showtextcontent = () => {
    if (userInput) {
      const text = userInput;
      console.log(text);
    }
  };

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
    "Search for a topic",
    "Search for a product",
    "Search for a service",
    "Search for a solution",
    "Search for a tutorial",
    "Search for a guide",
    "Search for a blog post",
    "Search for a video",
    "Search for a podcast",
  ];
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to Bolt.new
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Your one-stop solution for all your needs.
        </p>
        <div className="mt-6">
          <textarea
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            rows={1}
            cols={50}
          />
          {userInput ? (
            <button
              onClick={() => onGenerate(userInput)}
              className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Get Started
            </button>
          ) : null}
          <Link href="/docs" className="ml-2 text-blue-500 hover:underline" />
        </div>
        {suggestions.map((suggestion, index) => (
          <div key={index} className="mt-2 text-gray-600 dark:text-gray-400">
            <button
              onClick={() => onGenerate(suggestion)}
              className="px-4 py-2 text-white bg-gray-300 rounded-md hover:bg-gray-400"
            >
              {suggestion}
            </button>
          </div>
        ))}
      </div>
      <SIgnInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;
