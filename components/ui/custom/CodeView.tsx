"use client";
import React, { useEffect, useContext } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Code, Eye } from "lucide-react";
import axios from "axios";
import { MessageContext } from "@/context/MessageContext";
import file from "@/lib/file";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useConvex } from "convex/react";

function CodeView() {
  const { id } = useParams() as { id: string };
  const [activeTab, setActiveTab] = React.useState("code");
  const [files, setFiles] = React.useState(file.default_file);
  const { Messages, setMessages } = useContext(MessageContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();

  useEffect(() => {
    if (Messages.length > 0) {
      const lastMessage = Messages[Messages.length - 1];
      if (lastMessage.role === "user" && !isLoading) {
        console.log("Last User Message:", lastMessage.content);
        getAi();
      }
    }
  }, [Messages]);

  useEffect(() => {
    if (id) {
      getFiles();
    }
  }
  , [id]);

  const getFiles = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        // @ts-expect-error - workspaceId type mismatch between string and _Id
        workspaceId: id,
      });
      const mergedFiles = {...file.default_file, ...result?.fileData };
      setFiles(mergedFiles);
      console.log("Fetched Files:", result);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }


  const getAi = async () => {
    if (isLoading || Messages.length === 0) return;

    setIsLoading(true);
    try {
      const lastUserMessage = Messages[Messages.length - 1];

      const result = await axios.post("/api/get-code", {
        prompt: lastUserMessage.content,
      });

      const aiMessage = {
        role: "assistant",
        content: result.data.result,
      };
      const jsonStart = aiMessage.content.indexOf("{");
      const jsonEnd = aiMessage.content.lastIndexOf("}");
      const jsonString = aiMessage.content.slice(jsonStart, jsonEnd + 1);
      const jsonResponse = JSON.parse(jsonString);
      const mergedFiles = {
        ...files,
        ...jsonResponse.files,
      };
      console.log(
        "Merged Files:",
        jsonResponse,
        "---------------",
        aiMessage.content.files
      );
      setFiles(mergedFiles);
      await UpdateFiles({
        // @ts-expect-error - workspaceId type mismatch between string and _Id
        workspaceId: id,
        files: jsonResponse.files,
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
  return (
    <div className="w-3/5 p-2 border rounded-lg overflow-hidden mt-auto h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.reload()}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden md:inline">Refresh</span>
        </Button>
      </div>

      <SandpackProvider
        files={files}
        template="react"
        theme="dark"
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout className="rounded-b-lg">
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer
                style={{
                  height: "calc(100vh - 140px)",
                  flex: "0 0 200px",
                }}
              />
              <SandpackCodeEditor
                style={{
                  height: "calc(100vh - 140px)",
                  flex: 1,
                }}
                showLineNumbers
                showInlineErrors
                wrapContent
              />
            </>
          ) : (
            <SandpackPreview
              showNavigator
              style={{
                height: "calc(100vh - 140px)",
                flex: 1,
              }}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
