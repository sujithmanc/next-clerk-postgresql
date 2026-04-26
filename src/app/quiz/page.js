import { redirect } from "next/navigation";
import { getAllQuizSlugs } from "./_services/quizService";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

async function handleSubmit(formData) {
  "use server";
  const slug = formData.get("slug")?.toString().trim();
  if (slug) redirect(`/quiz/${slug}`);
}

export default async function QuizLandingPage() {
  let slugs = [];
  try {
    slugs = await getAllQuizSlugs();
  } catch (err) {
    return <pre>{JSON.stringify(err, null, 2)}</pre>;
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-10 flex justify-center">
      
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-2 text-primary">
            <Search size={18} />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Quiz
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold">
            Enter Quiz ID
          </h1>

          <p className="text-sm opacity-60">
            Paste the quiz ID to get started
          </p>
        </div>

        {/* Input Form */}
        <form action={handleSubmit} className="flex flex-col gap-3">

          <input
            name="slug"
            type="text"
            required
            placeholder="e.g. javascript-basics"
            className="input input-bordered w-full"
          />

          <button
            type="submit"
            className="btn btn-primary w-full gap-2"
          >
            Go to Quiz
            <ArrowRight size={16} />
          </button>

        </form>

        {/* Divider */}
        <div className="divider text-xs opacity-60">OR</div>

        {/* Available Quizzes */}
        <div className="space-y-2">
          <p className="text-sm font-semibold opacity-70">
            Available Quizzes
          </p>

          <div className="flex flex-col gap-2">
            {slugs.map((slug) => (
              <Link
                key={slug}
                href={`/quiz/${slug}`}
                className="flex items-center justify-between px-3 py-2 rounded-lg border border-base-300 hover:border-primary/40 transition"
              >
                <span className="text-sm">{slug}</span>
                <ArrowRight size={14} className="opacity-50" />
              </Link>
            ))}
          </div>
        </div>

      </div>

    </main>
  );
}