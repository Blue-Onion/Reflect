"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getAnalytics(peroid = "30d") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.User.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User is not logged in");

  const startDate = new Date();
  switch (peroid) {
    case "7d":
      startDate.setDate(startDate.getDate() - 7);
      break;

    case "15d":
      startDate.setDate(startDate.getDate() - 15);
      break;

    default:
      startDate.setDate(startDate.getDate() - 30);
      break;
  }
  const entries=await db.User.findMany({
    where:{
        userId:user.id,
        createdAt:{
            gte:startDate
        },
    },
    orderBy:{
        createdAt:"asc"
    }
  })
  console.log(entries);
  
}
