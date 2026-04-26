import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAttempt } from "@/app/quiz/_services/attemptService";
import { getQuizBySlug } from "@/app/quiz/_services/quizService";
import ResultCard from "@/app/quiz/_components/ResultCard";

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   console.info(`Generating metadata for quiz with slug: ${slug}`);
//   return {
//     title: "Quiz Complete",
//     description: "Thank you for participating.",
//     openGraph: {
//       title: "Quiz Complete",
//       description: "Thank you for participating.",
//       images: ["/og-image.png"],
//     },
//   };
// }

export default async function ResultPage({ params }) {
  const { slug } = await params;

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const quiz = await getQuizBySlug(slug);
  if (!quiz) redirect("/quiz");

  // must have an attempt to view result
  const attempt = await getAttempt(userId, quiz.id);
  if (!attempt) redirect(`/quiz/${slug}`);

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <ResultCard imageUrl={user?.imageUrl} fullName={user?.fullName} maxScore={quiz.questions.length} userScore={attempt.score} testName={quiz.name} />

        <pre className="text-zinc-800">
          {JSON.stringify({ user, quiz, attempt }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
