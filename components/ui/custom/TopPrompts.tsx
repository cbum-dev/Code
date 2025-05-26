"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Zap, Code2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

const getUserInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const PromptCard = ({ workspace, onTryPrompt }) => {
  const content =
    workspace.message?.[0]?.content ||
    workspace.message ||
    "No content available";

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⚡</div>
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
              {content.slice(0, 80)}...
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">

        <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
          <Avatar className="w-6 h-6">
            <AvatarImage src={workspace.userImage} alt={workspace.userName} />
            <AvatarFallback className="text-xs">
              {getUserInitials(workspace.userName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600">
            <span className="font-medium">
              {workspace.userName || "Anonymous"}
            </span>
          </span>
        </div>

        <Button
          onClick={() => onTryPrompt(content)}
          className="w-full group-hover:bg-blue-600 transition-colors"
          size="sm"
        >
          <Zap className="w-4 h-4 mr-2" />
          Try This Prompt
        </Button>
      </CardContent>
    </Card>
  );
};

function TopPrompts() {
  const [workspaceData, setWorkspaceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trending");
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

  const handleTryPrompt = (prompt: string) => {
    console.log("Trying prompt:", prompt);
  };

  const categorizedData = {
    trending: workspaceData.slice(0, 4),
    popular:
      workspaceData.slice(2, 6).length > 0
        ? workspaceData.slice(2, 6)
        : workspaceData.slice(0, 4),
    recent: workspaceData.slice(-4).reverse(),
  };

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Prompts</h2>
          <p className="text-lg text-gray-600">Loading popular prompts...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (workspaceData.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Prompts</h2>
          <p className="text-lg text-gray-600">
            No prompts available yet. Be the first to create something!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Prompts</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover popular project ideas from our community
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categorizedData[tab].map((workspace) => (
                <PromptCard
                  key={workspace._id}
                  workspace={workspace}
                  onTryPrompt={handleTryPrompt}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center mt-10">
        <Button variant="outline" size="lg">
          View All Prompts
        </Button>
      </div>
    </section>
  );
}

export default TopPrompts;
