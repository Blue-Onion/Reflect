"use server"
import { MOODS } from "@/app/lib/mood";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getPixabyImage } from "./public";
import { revalidatePath } from "next/cache";
import aj from "@/app/lib/arject";
import { request } from "@arcjet/next";

export async function createJournalEntry(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unautheroized")
        const user = await db.User.findUnique({
            where: {
                clerkUserId: userId
            }
        })
        if (!user) throw new Error("User is not logged in");
        const req=await request()
        const decision=await aj.protect(
            req,{userId,requested:1}
        )
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                const {remaining,reset}=decision.reason;
                console.error(
                    {
                        code:"RATE_LIMIT_EXCEEDED",
                        remaining,
                        resetInSeconds:reset,

                    }
                )
                throw new Error("Too many requests .Please try again later")
            }
            throw new Error("Request Blocked")

        }
        const mood = MOODS[data.mood.toUpperCase()];
        if (!mood) throw new Error("Invalid Mood")
        const image_Url = await getPixabyImage(data.moodquery)
        const entry = db.Entry.create({
            data: {
                title: data.title,
                content: data.content,
                mood: mood.id,
                moodScore: mood.score,
                moodImageUrl: image_Url,
                userId: user.id,
                collectionId: data.collectionId || null

            }
        })
        await db.Draft.deleteMany({
            where:{
                userId:user.id
            }
        })

        revalidatePath("/dashboard")
        return entry
    } catch (error) {
        console.log(error.message);

    }
}