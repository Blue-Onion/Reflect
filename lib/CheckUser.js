import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";
export const checkUser = async () => {
    const user = await currentUser(); // Fetch from Clerk


    if (!user) return null;

    try {

        let existingUser = await db.user.findUnique({
            where: { clerkUserId: user.id }
        });


        if (existingUser) {

            return existingUser;
        }

        // 🔥 If not found, check using email (Fallback)
        existingUser = await db.user.findUnique({
            where: { email: user.emailAddresses[0].emailAddress }
        });

        // ✅ If found via email, update Clerk ID and return
        if (existingUser) {
            await db.user.update({
                where: { email: user.emailAddresses[0].emailAddress },
                data: { clerkUserId: user.id }
            });

            return existingUser;
        }


        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
            }
        });


        return newUser;
    } catch (error) {
        console.error("Error:", error.message);
    }
};
