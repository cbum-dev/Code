
"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { CreateWorkspace } from "@/convex/workspace";


function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { Messages, setMessages } = useContext(MessageContext);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetails?.name) {
      return;
    }

    const msg = {
      role: "user",
      content: input,
    };

    setMessages(prev => [...prev, msg]);
    setUserInput(""); // Clear input after sending

    const workspaceId = await CreateWorkspace({
      user: userDetails._id,
      message: [msg],
    });

    console.log(workspaceId);
    router.push(`/workspace/${workspaceId}`);
  };

  const getWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id,
      });
      setMessages(result?.message || []);
      console.log("Workspace Data:", result);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getWorkspaceData();
    }
  }, [id]);

  const getAi = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Get the last user message
      const lastUserMessage = Messages[Messages.length - 1];
      
      const result = await axios.post("/api/ai-chat", { 
        prompt: lastUserMessage.content 
      });
      
      console.log("AI Response:", result.data.result);
      
      // Add AI response to messages
      const aiMessage = {
        role: "assistant",
        content: result.data.result,
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add error message
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Messages.length > 0) {
      const lastMessage = Messages[Messages.length - 1];
      if (lastMessage.role === "user" && !isLoading) {
        getAi();
      }
    }
  }, [Messages]);

  return (
    <div>
      <div className="messages-container">
        {Messages.map((message, index) => (
          <div key={index} className={`message ${message.role} mb-4 p-3 rounded-lg ${
            message.role === 'user' ? 'bg-blue-100 ml-auto max-w-md' : 'bg-gray-100 mr-auto max-w-md'
          }`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.role === "user" && (
              <Image
                src={userDetails?.picture || "/default-avatar.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full mt-2"
              />
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant mb-4 p-3 rounded-lg bg-gray-100 mr-auto max-w-md">
            <p>Thinking...</p>
          </div>
        )}
      </div>

      <div className="mt-6 sticky bottom-0 bg-white p-4 border-t">
        <div className="flex gap-2">
          <textarea
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (userInput.trim()) {
                  onGenerate(userInput);
                }
              }
            }}
          />
          <button
            onClick={() => onGenerate(userInput)}
            disabled={!userInput.trim() || isLoading}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
        <Link href="/docs" className="text-blue-500 hover:underline text-sm">
          Docs
        </Link>
      </div>
    </div>
  );
}

export default ChatView;
