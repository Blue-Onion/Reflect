"use client";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOODS } from "@/app/lib/mood";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import EntryCard from "./EntryCard";

const JournalFilter = ({ entries }) => {
  const [selectedmood, setSelectedMood] = useState("");
  const [date, setDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const clearFilter = () => {
    setSelectedMood("");
    setDate(null);
    setSearchQuery("");
  };
  useEffect(() => {
   let filtered=entries;
   if(searchQuery){
    const query=searchQuery.toLowerCase();
    filtered=filtered.filter((entry)=>
    entry.title.toLowerCase().includes(query)||
    entry.content.toLowerCase().includes(query)
    )
   }
   if(selectedmood){

    filtered=filtered.filter((entry)=>
   entry.mood===selectedmood
    )
   }
   if(date){
    filtered=filtered.filter((entry)=>
      isSameDay(new Date(entry.createdAt),date)
      )
   }
   setFilteredEntries(filtered)
  }, [entries,searchQuery,date,selectedmood])
  
  return (
    <>
      <div className="flex flex-wrap gap-4 space-y-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder={"Search Entries..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={"w-full"}
            prefix={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>
        <Select value={selectedmood} onValueChange={setSelectedMood}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter By Mood" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(MOODS).map((mood) => {
              return (
                <SelectItem key={mood.id} value={mood.id}>
                  <span className="flex items-center gap-2">
                    {mood.emoji}
                    {mood.label}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick A Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className={"w-auto p-0"}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
        {(searchQuery || date || selectedmood) && (
          <Button
            variant={"ghost"}
            onClick={clearFilter}
            className={"text-orange-500"}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="text-sm text-gray-500">
        Showing {filteredEntries.length} of {entries.length} entries
      </div>
      {filteredEntries?.length===0?(
        <div className="">
          No entires found
        </div>
      ):(
        <div className="flex flex-col gap-4">
          {filteredEntries.map((entry) => {
            return <EntryCard key={entry.id} entry={entry} />
          }
          )}
        </div>
      )}
    </>
  );
};

export default JournalFilter;
