import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,

} from "@/components/ui/card"
import { getDailyPrompt } from "@/actions/public";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import TestinomialCarousel from "@/components/TestinomialCarousel";
import { faqs } from "@/data/data"

export default async function Home() {
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
  const prompt=await getDailyPrompt()
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
              <h3 className="text-xl font-semibold text-orange-900">{prompt}</h3>
              <Skeleton className={"h-4 bg-orange-100 w-3/4"} />
              <Skeleton className={"h-4 bg-orange-100 w-full"} />
              <Skeleton className={"h-4 bg-orange-100 w-2/3"} />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard" >
            <Button variant="journal" className="flex items-center justify-center gap-2 rounded-full  py-6 px-8 " >
              Start Now<ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="#feature" >
            <Button variant="outline" className="py-6 px-8 hover:bg-orange-50 text-orange-600 border-orange-600 rounded-full" >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      <section id="features" className="mt-24 mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8" >{features.map((feature, index) => (
        <Card key={index}>

          <CardContent className="p-6">
            <div className="h-12 w-12 bg-orange-50 rounded-full flex justify-center items-center mb-4">

              <feature.icon className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="font-semibold text-orange-900 text-xl">{feature.title}</h3>
            <p className="text-orange-700">{feature.description}</p>
          </CardContent>

        </Card>


      )
      )}</section>
      <div className="space-y-24 mt-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">

            <div className="h-12 w-12 bg-orange-100 rounded-full flex justify-center items-center mb-4">
              <FileText className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-2xl">
              Rich Text Editor
            </h3>
            <p className="text-lg text-orange-700">
              Express yourself fully with the our powerful editor featuring:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span>
                  Format text with ease
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span>
                  Embeded Links
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
            <div className="flex gap-2 mb-6">


              <div className="rounded h-8 w-8 bg-orange-100" />
              <div className="rounded h-8 w-8 bg-orange-100" />
              <div className="rounded h-8 w-8 bg-orange-100" />
            </div>
            <Skeleton className={"bg-orange-100 h-4 w-2/3"} />
            <Skeleton className={"bg-orange-100 h-4 w-full"} />
            <Skeleton className={"bg-orange-100 h-4 w-3/4"} />
            <Skeleton className={"bg-orange-100 h-4 w-1/3"} />

          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
            <div className="flex gap-2 mb-6">


              <Skeleton className="rounded-lg w-full h-40 bg-orange-100" />

            </div>
            <div className="flex justify-between">

              <Skeleton className={"bg-orange-100 h-8 w-14"} />
              <Skeleton className={"bg-orange-100 h-8 w-14"} />
              <Skeleton className={"bg-orange-100 h-8 w-14"} />


            </div>
          </div>
          <div className="space-y-6">

            <div className="h-12 w-12 bg-orange-100 rounded-full flex justify-center items-center mb-4">
              <BarChart2 className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-2xl">
              Mood Analytic
            </h3>
            <p className="text-lg text-orange-700">
              Track your emotional joruney with powerful analytic
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span>
                  Visual Mood Trend
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span>
                  Pattern Recogination
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <TestinomialCarousel />
      <div className="mt-24">
        <h2 className="text-3xl text-orange-700 mb-12 font-bold text-center">Frequently asked question</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => {
            return (<AccordionItem key={faq.q} value={`items-${index}`}>
              <AccordionTrigger className={"text-orange-700 text-lg"}>{faq.q}</AccordionTrigger>
              <AccordionContent className={"text-orange-500"}>
                {faq.a}
              </AccordionContent>
            </AccordionItem>)

          }
          )}
        </Accordion>

      </div>
      <div className="mt-24">
        <Card className={"bg-gradient-to-r from-orange-100 to-amber-100"}>
          <CardContent className={"text-center pb-12"}>
            <h2 className="text-3xl font-bold text-orange-900">
              Start Reflecting on Your Journey Today
            </h2>
            <p className="text-lg text-orange-600 mb-8 max-w-2xl mx-auto">
              Join thousands of writer who have already discovered the power of digital Journaling
            </p>
            <Link href={"/dashboard"} >
<Button size={"lg"} variant={"journal"} className={"animate-bounce"}>
  Get Started now <ChevronRight className="ml-2 h-4 w-4"/>
</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
