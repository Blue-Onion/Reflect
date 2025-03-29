"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import aj from "@/app/lib/arject";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

export async function createCollection(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User is not logged in");

    const req = await request();
    const decision = await aj.protect(req, { userId, requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          remaining,
          resetInSeconds: reset,
        });
        throw new Error("Too many requests. Please try again later");
      }
      throw new Error("Request Blocked");
    }

    const collection = await db.Collection.create({
      data: {
        name: data.name,
        description: data.description,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard"); // ✅ Allowed after database changes
    return collection;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCollection() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User is not logged in");

    const collection = await db.Collection.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return collection; // 
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getOneCollection({collectionId}) {
  console.log(collectionId);
  
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User is not logged in");

    const collection = await db.Collection.findUnique({
      where: { userId: user.id ,
        id:collectionId,
      },
     
    });

    return collection; // 
  } catch (error) {
    throw new Error(error.message);
  }
}
