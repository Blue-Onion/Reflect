"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 
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
const MoodAnalaysis = () => {
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
  const {timeLine,stats}=analytics.data;
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
      <div className="space-y6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card >
            <CardHeader className="pb-2">
              <CardTitle className={"text-sm font-medium"}>
                Total Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">{stats.totalEntries}</p>
              <p className="text-sm text-muted-foreground">

                ~{stats.dailyAverage} entries per day</p>
            </CardContent>
          </Card>
        <Card >
            <CardHeader className="pb-2">
              <CardTitle className={"text-sm font-medium"}>
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">{stats.averageScore}/10</p>
              <p className="text-sm text-muted-foreground">

                ~overall mood Score</p>
            </CardContent>
          </Card>
        <Card >
            <CardHeader className="pb-2">
              <CardTitle className={"text-sm font-medium"}>
                Mood Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
             <div className="">
              {getMoodById(stats.mostFrequentMood)?.emoji}{' '}
              {getMoodTrend(stats.averageScore)}
             </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </>
  );
};

export default MoodAnalaysis;
