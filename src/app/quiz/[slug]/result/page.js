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


    <ResultCard imageUrl={user?.imageUrl} fullName={user?.fullName} maxScore={quiz.questions.length} userScore={attempt.score} testName={quiz.name} />

  );
}
