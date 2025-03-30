"use server";
import { getMoodById, MOODS } from "@/app/lib/mood";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getPixabyImage } from "./public";
import { revalidatePath } from "next/cache";
import aj from "@/app/lib/arject";
import { request } from "@arcjet/next";

export async function createJournalEntry(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        
        const user = await db.user.findUnique({ where: { clerkUserId: userId } });
        if (!user) throw new Error("User is not logged in");

        const req = await request();
        const decision = await aj.protect(req, { userId, requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                const { remaining, reset } = decision.reason;
                console.error({
                    code: "rate_limit_exceeded",
                    remaining,
                    resetInSeconds: reset,
                });
                throw new Error("Too many requests. Please try again later");
            }
            throw new Error("request_blocked");
        }

        const mood = MOODS[data.mood.toUpperCase()];
        if (!mood) throw new Error("invalid_mood");

        const image_url = await getPixabyImage(data.moodQuery);
        
        const entry = await db.entry.create({
            data: {
                title: data.title,
                content: data.content,
                mood: mood.id,
                moodScore: mood.score,
                moodImageUrl: image_url,
                userId: user.id,
                collectionId: data.collectionId || null,
            },
        });

        await db.draft.deleteMany({ where: { userId: user.id } });
        revalidatePath("/dashboard");

        return entry;
    } catch (error) {
        console.error("Error in createJournalEntry:", error.message);
        throw new Error(error.message);
    }
}

export async function getJournalEntry({ collectionId, orderBy = "desc" } = {}) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({ where: { clerkUserId: userId } });
        if (!user) throw new Error("User is not logged in");

        const entries = await db.entry.findMany({
            where: {
                userId: user.id,
                ...(collectionId?.toLowerCase() === "unorganized"
                    ? { collectionId: null }
                    : collectionId
                    ? { collectionId }
                    : ""),
            },
            include: {
                collections: {
                    select: { name: true, id: true },
                },
            },
            orderBy: { createdAt: orderBy },
        });

        const entriesWithMoodData = entries.map((entry) => ({
            ...entry,
            moodData: getMoodById(entry.mood),
        }));

        return { success: true, data: { entries: entriesWithMoodData } };
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function getOneJournalEntry({id}) {
    console.log("I am getOne journal");
    
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({ where: { clerkUserId: userId } });
        if (!user) throw new Error("User is not logged in");

        const entry = await db.entry.findUnique({
            where: {
                userId: user.id,
                id:id,
            },
            include: {
                collections: {
                    select: { name: true, id: true },
                },
            }
        });

        if(!entry) throw new Error("Entry Not Found")
        return entry;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function deleteJournalEntry({id}) {
    console.log("1");
    
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
console.log(id);

        const user = await db.user.findUnique({ where: { clerkUserId: userId } });
        if (!user) throw new Error("User is not logged in");

        const entry = await db.entry.findFirst({
            where: {
                userId: user.id,
                id:id,
            }
        });

        if(!entry) throw new Error("Entry Not Found")
            await db.entry.delete({
        where:{
            id:id
        }})

            return entry
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}
