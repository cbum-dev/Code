"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Zap, Code2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";

interface Name {
  name: string | undefined;
}

const getUserInitials = (name: Name["name"]): string => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const PromptListItem = ({
  workspace,
  index,
  onCopy,
}: {
  workspace: any;
  index: number;
  onCopy: (content: string) => void;
}) => {
  const content =
    workspace.message?.[0]?.content ||
    workspace.message ||
    "No content available";

  return (
    <div className="group hover:bg-gray-800 transition-colors duration-200 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 my-auto w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-gray-300">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-100 line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                {content.slice(0, 120)}...
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Avatar className="w-4 h-4">
                  <AvatarImage
                    src={workspace.userImage}
                    alt={workspace.userName}
                  />
                  <AvatarFallback className="text-xs">
                    {getUserInitials(workspace.userName)}
                  </AvatarFallback>
                </Avatar>
                <span>{workspace.userName || "Anonymous"}</span>
              </div>
            </div>
            <Button
              onClick={() => onCopy(content)}
              size="sm"
              variant="outline"
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Zap className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TopPrompts() {
  interface Workspace {
    userName?: string;
    userEmail?: string;
    userImage?: string;
    _id: any;
    _creationTime: number;
    fileData?: any;
    message: any;
    user: any;
  }

  const [workspaceData, setWorkspaceData] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trending");
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  const convex = useConvex();

  const getWorkspaceData = async () => {
    try {
      setLoading(true);
      const result = await convex.query(api.workspace.GetWorkspaceTop10, {});
      setWorkspaceData(result || []);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
      setWorkspaceData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkspaceData();
  }, []);

  const handleCopyPrompt = (prompt: any) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const categorizedData = {
    trending: workspaceData.slice(0, 6),
    popular:
      workspaceData.slice(2, 8).length > 0
        ? workspaceData.slice(2, 8)
        : workspaceData.slice(0, 6),
    recent: workspaceData.slice(-6).reverse(),
  };

  if (loading) {
    return (
      <section className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Top Prompts</h2>
          <p className="text-gray-400">Loading popular prompts...</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse p-4 border rounded-lg border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (workspaceData.length === 0) {
    return (
      <section className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Top Prompts</h2>
          <p className="text-gray-400">
            No prompts available yet. Be the first to create something!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-4 mx-auto">
          Pricing Plans
        </Badge>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Top Prompts</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover popular project ideas from our community
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-gray-800 border border-gray-700">
            <TabsTrigger value="trending">
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="popular">
              <Star className="w-4 h-4 mr-1" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Code2 className="w-4 h-4 mr-1" />
              Recent
            </TabsTrigger>
          </TabsList>
        </div>

        {["trending", "popular", "recent"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="border rounded-lg divide-y divide-gray-700 border-gray-700">
              {
                // @ts-ignore
                categorizedData[tab].map((workspace: any, index: number) => (
                  <React.Fragment key={workspace._id}>
                    <PromptListItem
                      workspace={workspace}
                      index={index}
                      onCopy={handleCopyPrompt}
                    />
                    <Separator className="bg-gray-700" />
                  </React.Fragment>
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {copiedPrompt && (
        <div className="fixed bottom-4 right-14 bg-gray-900 text-gray-100 px-4 py-2 rounded-lg shadow-lg">
          Copied!
        </div>
      )}
    </section>
  );
}

export default TopPrompts;
