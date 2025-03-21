import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";
export const checkUser=async () => {
    const user=await currentUser();
    if(!user){
        return null;
    }
    try {
        const loggedUser=await db.User.findUnique({
            where:{

                clerkUserId:user.id,
            }
        })
        if(loggedUser){
            return loggedUser
        }
        const newUser=await db.User.create({
            data:{
                clerkUserId:user.id,
                name:`${user.firstName} ${user.lastName}`,
                imageUrl:user.imageUrl,
                email:user.emailAddresses[0].emailAddress,
            }
        })
        return newUser
    } catch (error) {
        console.log(error.message);
        
    }
}