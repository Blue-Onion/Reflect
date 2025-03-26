"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const MoodAnalaysis = () => {
  const timeOption = [
    { value: "7d", label: "Last 7 days" },
    { value: "15d", label: "Last 15 days" },
    { value: "30d", label: "Last 30 days" },
  ];
  const [peroid, setperoid] = useState("7d");
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
    </>
  );
};

export default MoodAnalaysis;
