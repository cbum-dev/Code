"use client";
import React, { useContext, useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import Link from "next/link";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { Messages, setMessages } = useContext(MessageContext);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState<string>("");
  

  const getWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.message);
    console.log("Workspace Data:", result);
  };

  useEffect(() => {
    if (id) {
      getWorkspaceData();
    }
  }, [id]);

  return (
    <div>
      {Messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          <p>{message.content}</p>
          {message.role === "user" && (
            <Image
              src={userDetails?.picture || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </div>
      ))}

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

    </div>
  );
}

export default ChatView;
