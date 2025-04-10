"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAnalytics } from "@/actions/analytics";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import MoodAnalyticsSkeleton from "./analytics-loading";
import { getMoodById, getMoodTrend } from "@/app/lib/mood";
import { format, parseISO } from "date-fns";

const MoodAnalaysis = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium">
            {format(parseISO(label), "MMM d, yyyy")}
          </p>
          <p className="text-orange-600">Average Mood: {payload[0].value}</p>
          <p className="text-blue-600">Entries: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };
  const timeOption = [
    { value: "7d", label: "Last 7 days" },
    { value: "15d", label: "Last 15 days" },
    { value: "30d", label: "Last 30 days" },
  ];
  const { isLoaded } = useUser();
  const {
    loading,
    fn: fetchAnalytics,
    data: analytics,
  } = useFetch(getAnalytics);
  const [peroid, setperoid] = useState("7d");
  useEffect(() => {
    fetchAnalytics(peroid);
  }, [peroid]);

  if (loading || !isLoaded || !analytics?.data) {
    return <MoodAnalyticsSkeleton />;
  }
  console.log(analytics);

  const { timeline, stats } = analytics.data;
  console.log("Timeline: ", timeline);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-5xl font-bold gradient-title">Dashboard</h2>
        <Select value={peroid} onValueChange={setperoid}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeOption.map((time) => {
              return (
                <SelectItem key={time.value} value={time.value}>
                  {time.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className={"text-sm font-medium"}>
                Total Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">{stats.totalEntries===0?"No Entries Yet":`${stats.totalEntries}`}</p>
              <p className="text-sm text-muted-foreground">
{stats.dailyAverage===0?"":`~${stats.dailyAverage} entries per day`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className={"text-sm font-medium"}>
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
            <p className="font-bold text-2xl">{isNaN(stats.averageScore)?"No Entries Yet":`${stats.averageScore}/10`}</p>
   

              <p className="text-sm text-muted-foreground">
              {isNaN(stats.averageScore)?"":`~overall mood Score`}
                
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className={"text-sm font-medium"}>
                Mood Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                {getMoodById(stats.mostFrequentMood)?.emoji}{" "}
                {getMoodTrend(stats.averageScore)}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="">Mood Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeline}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => format(parseISO(date), "MMM d")}
                  />
                  <YAxis yAxisId="left" domain={[0, 10]} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, "auto"]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#f97316"
                    name="Average Mood"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="entryCount"
                    stroke="#3b82f6"
                    name="Number of Entries"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MoodAnalaysis;
