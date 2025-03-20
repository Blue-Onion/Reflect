import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Book,
  Sparkles,
  Lock,
  Calendar,
  ChevronRight,
  BarChart2,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Book,
      title: "Rich Text Editor",
      description:
        "Express yourself with a powerful editor supporting markdown, formatting, and more.",
    },
    {
      icon: Sparkles,
      title: "Daily Inspiration",
      description:
        "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description:
        "Your thoughts are safe with enterprise-grade security and privacy features.",
    },
  ];
  return (
    <div className="relative container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 gradient-title">Your Space to Reflect.<br />Your Story to tell</h1>
        <p className="text-lg md:text-xl mb-8 text-orange-500">Capture your thoughts, track your mood, and find clarity in your space.</p>
        <div className="relative">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-orange-50 via-transparent to-transparent pointer-events-none" />
          <div className="bg-white max-w-full rounded-2xl mx-auto ">
            <div className="border-b border-orange-100 p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">

                <Calendar className="h-5 w-5 text-orange-600" />
                <span>Today&rsquo;s Entry</span>
              </div>
              <div className="flex gap-3">
                <div className="rounded-full h-3 w-3 bg-orange-300" />
                <div className="rounded-full h-3 w-3 bg-orange-400" />
                <div className="rounded-full h-3 w-3 bg-orange-500" />
              </div>
            </div>
            <div className="space-y-4 p-4">
              <h3 className="text-xl font-semibold text-orange-900">Daily Prompts</h3>
            <Skeleton className={"h-4 bg-orange-100 w-3/4"}/>
            <Skeleton className={"h-4 bg-orange-100 w-full"}/>
            <Skeleton className={"h-4 bg-orange-100 w-2/3"}/>
            </div>
          </div>
        </div>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard" >
            <Button variant="journal" className="flex items-center justify-center gap-2 rounded-full  py-6 px-8 " >
              Start Now<ChevronRight className="h-5 w-5"/>
            </Button>
            </Link>
            <Link href="#feature" >
            <Button variant="outline" className="py-6 px-8 hover:bg-orange-50 text-orange-600 border-orange-600 rounded-full" >
              Learn More
            </Button>
            </Link>
          </div>
      </div>
      <section id="features" className="mt-24 mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8" >{features.map((feature,index) => (
        <Card key={index}>
        
        <CardContent className="p-6">
          <div className="h-12 w-12 bg-orange-50 rounded-full flex justify-center items-center mb-4">

          <feature.icon className="h-5 w-5 text-orange-500"/>
          </div>
          <h3 className="font-semibold text-orange-900 text-xl">{feature.title}</h3>
          <p className="text-orange-700">{feature.description}</p>
        </CardContent>
   
      </Card>

      
      )
      )}</section>
      <div className="">
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  );
}
