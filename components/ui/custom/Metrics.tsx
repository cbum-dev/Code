"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Zap, 
  Target,
  Activity,
  Clock,
  Globe
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  trend?: 'up' | 'down';
  chart?: number[];
  color?: 'red' | 'blue' | 'green' | 'purple';
}

const MetricCard = ({ title, value, change, changeLabel, trend, chart, color = "red" }: MetricCardProps) => {
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold text-foreground">
            {value}
          </span>
          {change && (
            <div className={`flex items-center gap-1 text-sm ${
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <TrendIcon className="w-3 h-3" />
              <span>{change} {changeLabel}</span>
            </div>
          )}
        </div>
        
        {chart && (
          <div className="h-16 flex items-end gap-1">
            {chart.map((height, index) => (
              <div
                key={index}
                className={`flex-1 rounded-sm ${
                  color === 'red' 
                    ? 'bg-red-500 dark:bg-red-600' 
                    : color === 'blue'
                    ? 'bg-blue-500 dark:bg-blue-600'
                    : color === 'green'
                    ? 'bg-green-500 dark:bg-green-600'
                    : 'bg-purple-500 dark:bg-purple-600'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};



function MetricsDashboard() {
  const revenueData = [45, 52, 48, 61, 55, 67, 73, 69, 75, 82];
  const subscriptionData = [65, 70, 58, 72, 68, 75, 82, 78, 85, 88];
  const userEngagementData = [88, 92, 86, 95, 91, 89, 94, 90, 96, 93];
  const promptData = [76, 82, 79, 88, 85, 91, 87, 94, 89, 92];

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Activity className="w-3 h-3 mr-1" />
            Platform Analytics
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Real-time Metrics Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your platform&apos;s performance, user engagement, and growth metrics in real-time.
          </p>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1%"
            changeLabel="from last month"
            trend="up"
            chart={revenueData}
            color="green"
          />
          
          <MetricCard
            title="Active Users"
            value="+12,350"
            change="+180.1%"
            changeLabel="from last month"
            trend="up"
            chart={subscriptionData}
            color="blue"
          />
          
          <MetricCard
            title="Prompts Generated"
            value="89,432"
            change="+12.5%"
            changeLabel="from last week"
            trend="up"
            chart={promptData}
            color="purple"
          />
          
          <MetricCard
            title="Success Rate"
            value="94.2%"
            change="+2.1%"
            changeLabel="from last month"
            trend="up"
            chart={userEngagementData}
            color="red"
          />
        </div>


        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center border bg-transparent p-6  rounded-lg">
            <Globe className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-foreground">142</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          
          <div className="text-center p-6 border bg-transparent0 rounded-lg">
            <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-foreground">2.4s</div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </div>
          
          <div className="text-center p-6 border bg-transparent rounded-lg">
            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-foreground">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          
          <div className="text-center p-6 border bg-transparent rounded-lg">
            <Target className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-foreground">4.8/5</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MetricsDashboard;