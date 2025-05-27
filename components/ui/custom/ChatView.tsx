"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useConvex,useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { CreateWorkspace,UpdateMessages } from "@/convex/workspace";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send, FileText, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { Messages, setMessages } = useContext(MessageContext);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const UpdateMessage = useMutation(api.workspace.UpdateMessages);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [userInput]);

  const onGenerate = async (input) => {
    if (!userDetails?.name || !input.trim()) return;

    const msg = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, msg]);
    setUserInput("");

    const workspaceId = await CreateWorkspace({
      user: userDetails._id,
      message: [msg],
    });

    router.push(`/workspace/${workspaceId}`);
  };

  const getWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id,
      });
      setMessages(result?.message || []);
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
    if (isLoading || Messages.length === 0) return;
    
    setIsLoading(true);
    try {
      const lastUserMessage = Messages[Messages.length - 1];
      
      const result = await axios.post("/api/ai-chat", { 
        prompt: lastUserMessage.content 
      });
      
      const aiMessage = {
        role: "assistant",
        content: result.data.result,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      await UpdateMessage({
        message:[...Messages, aiMessage],
        workspaceId: id,
      });
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      
      setMessages((prev) => [...prev, errorMessage]);
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
    <div className="flex flex-col w-2/5 mt-auto h-[calc(100vh-64px)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {Messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Bot className="w-12 h-12 mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Start a conversation
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
              Type a message below to begin chatting with the AI assistant.
            </p>
          </div>
        ) : (
          Messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-3xl rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="data:image/jpeg;base64,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" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <div className="flex-1">
                    <ReactMarkdown >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={userDetails?.picture || "/default-avatar.png"}
                        />
                        <AvatarFallback>
                          {userDetails?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3xl rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                <span className="text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4">
        <div className="flex items-end gap-2">
          <div className="relative flex-1 items-center">
            <Textarea
              ref={textareaRef}
              placeholder="Type your message..."
              className="min-h-[40px] max-h-[200px] resize-none pr-10"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (userInput.trim()) {
                    onGenerate(userInput);
                  }
                }
              }}
              rows={1}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-1 h-8 bg-red-500 hover:bg-red-600 w-8"
              disabled={!userInput.trim()}
              onClick={() => onGenerate(userInput)}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </p>
          <Link href="/docs" className="text-sm flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChatView;