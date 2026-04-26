import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllQuizSlugs } from "../quiz/_services/quizService";
import { List, ArrowRight } from "lucide-react";

export default async function QuizLandingPage() {
  let slugs = [];
  try {
    slugs = await getAllQuizSlugs();
  } catch (err) {
    return <pre>{JSON.stringify(err, null, 2)}</pre>;
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">

          {/* Header */}
          <h1 className="card-title text-2xl">Enter Quiz ID</h1>
          <p className="text-sm opacity-70 mb-4">
            Paste the quiz ID shared with you to get started.
          </p>

          {/* Divider */}
          <div className="divider">
            <List size={16} className="opacity-60" />
          </div>

          {/* Quiz List */}
          <div>
            <p className="font-semibold mb-2">Available Quizzes</p>

            <ul className="menu bg-base-100 rounded-box p-0">
              {slugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/lesson/${slug}`}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{slug}</span>
                    <ArrowRight size={14} className="opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </div>

    </div>
  );
}