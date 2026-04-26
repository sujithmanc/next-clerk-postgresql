import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUser } from "@/app/quiz/_actions/syncUser";
import { getQuiz } from "@/app/quiz/_actions/getQuiz";
import { getAttempt } from "@/app/quiz/_services/attemptService";
import QuizShell from "@/app/quiz/_components/QuizShell";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  console.info(`Generating metadata for quiz with slug: ${slug}`);
  return {
    title: `Quiz — ${slug}`,
    description: "Answer the questions below.",
    openGraph: {
      title: `Quiz — ${slug}`,
      description: "Join the quiz and test your knowledge.",
      images: ["/og-image.png"],                                   // static OG image
    },
  };
}

export default async function QuizPage({ params }) {
  const { slug } = await params;
  console.info(`Rendering quiz page for slug: ${slug}`);
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // lazy sync Clerk user into DB
  await syncUser();

  const { quiz, error } = await getQuiz(slug);

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">{error}</p>
          <p className="text-sm text-gray-400 mt-2">Check the quiz ID and try again.</p>
          <Link
            href="/"
            className="btn btn-primary w-full text-sm sm:text-base"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }



  console.info(JSON.stringify("Before getAttempts: ", JSON.stringify(quiz, null, 2)));
  // check for existing attempt → silent redirect to result


  const existing = await getAttempt(userId, quiz.id);
  if (existing) redirect(`/quiz/${slug}/result`);

  return <QuizShell quiz={quiz} slug={slug} />;
}
