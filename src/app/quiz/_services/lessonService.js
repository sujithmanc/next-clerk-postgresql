import db from "@/index";
import { lessons, quizzes } from "@/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export async function saveLesson({ quizId, content }) {
    await db.insert(lessons).values({
        id: `lesson_${nanoid(10)}`,
        quizId,
        content,
    });
}

export async function getLessonContentByQuizSlug(quizSlug) {
    const lessonData = await db
        .select({
            content: lessons.content,
        })
        .from(lessons)
        .innerJoin(quizzes, eq(lessons.quizId, quizzes.id))
        .where(eq(quizzes.slug, quizSlug));

    return lessonData;
}