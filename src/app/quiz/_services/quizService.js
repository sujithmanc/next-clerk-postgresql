import db from "@/index";
import { quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Fetches a quiz by slug.
 * @param {string} slug
 * @returns {object|null}
 */
export async function getQuizBySlug(params) {
  const slug = await params;
  console.info(`Fetching quiz with slug: ${slug}`);

    const result = await db
      .select()
      .from(quizzes)
      .where(eq(quizzes.slug, slug))
      .limit(1);

  return result[0] ?? null;
}
