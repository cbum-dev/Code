// @ts-nocheck
"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import axios from "axios";
import { CreateWorkspace } from "@/convex/workspace";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send, FileText, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { Messages, setMessages } = useContext(MessageContext);
  const { userDetails } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef(null);
  const UpdateMessage = useMutation(api.workspace.UpdateMessages);

  const messages = Messages || [];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [userInput]);

  const onGenerate = async (input:any) => {
    if (!userDetails?.name || !input.trim()) return;

    const msg = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...(prev || []), msg]);
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
      setMessages([]);
    }
  };

  useEffect(() => {
    if (id) {
      getWorkspaceData();
    } else {
      // Fix 4: Initialize with empty array if no id
      setMessages([]);
    }
  }, [id]);

  const getAi = async () => {
    if (isLoading || messages.length === 0) return;
    
    setIsLoading(true);
    try {
      const lastUserMessage = messages[messages.length - 1];
      
      const result = await axios.post("/api/ai-chat", { 
        prompt: lastUserMessage.content 
      });
      
      const aiMessage = {
        role: "assistant",
        content: result.data.result,
      };
      
      setMessages((prev) => [...(prev || []), aiMessage]);
      await UpdateMessage({
        message: [...messages, aiMessage],
        workspaceId: id,
      });
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      
      setMessages((prev) => [...(prev || []), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user" && !isLoading) {
        getAi();
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-2/5 mt-auto h-[calc(100vh-64px)]">
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
      >
        {messages.length === 0 ? (
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
          messages?.map((message, index) => (
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
                    <ReactMarkdown>
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