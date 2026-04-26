import db from "@/index";
import { attempts, quizzes, users } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function getTestResultsBySlug(slug) {
    const attemptedUsers = await db
        .select({
            // Select the user details you need
            userId: users.id,
            name: users.name,
            email: users.email,
            imageUrl: users.imageUrl,

            // It is usually helpful to grab the attempt details too!
            score: attempts.score,
            submittedAt: attempts.submittedAt,
        })
        .from(users)
        .innerJoin(attempts, eq(users.id, attempts.userId))
        .innerJoin(quizzes, eq(attempts.quizId, quizzes.id))
        .where(eq(quizzes.slug, slug));

    return attemptedUsers;
}
