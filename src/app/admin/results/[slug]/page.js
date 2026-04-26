import { getTestResultsBySlug } from "@/app/quiz/_services/resultService";
import Link from "next/link";
import { Trophy, Calendar, ArrowLeft } from "lucide-react";

export default async function QuizDescPage({ params }) {
  const { slug } = await params;
  const testResults = await getTestResultsBySlug(slug);

  return (
    <div className="min-h-screen bg-base-200 p-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link href="/admin" className="btn btn-ghost btn-sm mb-3">
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 opacity-70" />
          <h1 className="text-3xl font-bold">Quiz Results</h1>
        </div>

        <p className="text-base-content/70 mt-1">
          Showing results for quiz: <span className="font-medium">{slug}</span>
        </p>
      </div>

      {/* Leaderboard */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">

        {testResults.map((user, index) => (
          <div
            key={user.userId}
            className="card bg-base-100 shadow-md border border-base-300 hover:shadow-xl transition"
          >
            <div className="card-body items-center text-center">

              {/* Avatar */}
              <div className="avatar mb-2">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.imageUrl} alt={user.name} />
                </div>
              </div>

              {/* Name */}
              <h2 className="font-semibold text-lg">
                {user.name}
              </h2>

              {/* Score */}
              <div className="text-4xl font-bold text-primary">
                {user.score}
              </div>

              <div className="text-xs opacity-60">points</div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}