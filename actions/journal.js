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
        console.log("Received Data:", data);

        const { userId } = await auth();
        console.log("Authenticated User ID:", userId);
        if (!userId) throw new Error("Unauthorized");
        
        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        });
        console.log("Fetched User:", user);
        if (!user) throw new Error("User is not logged in");

        const req = await request();
        console.log("Incoming Request:", req);

        const decision = await aj.protect(req, { userId, requested: 1 });
        console.log("Access Decision:", decision);

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

        console.log("Checking Mood:", data.mood);
        const mood = MOODS[data.mood.toUpperCase()];

        console.log("Resolved Mood:", mood);

        if (!mood) {
            console.error("Invalid Mood Detected:", data.mood);
            throw new Error("invalid_mood");
        }

        console.log("Fetching Pixabay Image for:", data.moodQuery);
        const image_url = await getPixabyImage(data.moodQuery);
        console.log("Fetched Image URL:", image_url);

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
        console.log("Created Journal Entry:", entry);

        await db.draft.deleteMany({
            where: { userId: user.id },
        });
        console.log("Deleted User Drafts");

        revalidatePath("/dashboard");
        console.log("Revalidated Dashboard");

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

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
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
