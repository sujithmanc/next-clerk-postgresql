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

      {/* Stats */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Participants</div>
          <div className="stat-value">{testResults.length}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Top Score</div>
          <div className="stat-value">
            {Math.max(...testResults.map(r => r.score), 0)}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Average</div>
          <div className="stat-value">
            {testResults.length
              ? Math.round(
                testResults.reduce((a, b) => a + b.score, 0) /
                testResults.length
              )
              : 0}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-5xl mx-auto card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">

          <h2 className="card-title mb-4">Leaderboard</h2>

          <div className="overflow-x-auto">
            <table className="table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Score</th>
                  <th>Submitted</th>
                </tr>
              </thead>

              <tbody>
                {testResults.map((user, index) => (
                  <tr key={user.userId} className="hover">

                    {/* User */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img src={user.imageUrl} alt={user.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-xs opacity-60">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Score */}
                    <td>
                      <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-bold text-xl text-center min-w-[70px]">
                        {user.score}
                      </div>
                    </td>

                    {/* Submitted */}
                    <td>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="opacity-60" />
                        <span>
                          {new Date(user.submittedAt).toLocaleString()}
                        </span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>

    </div>
  );
}