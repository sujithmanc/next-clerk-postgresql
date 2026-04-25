import { redirect } from "next/navigation";

async function handleSubmit(formData) {
  "use server";
  const slug = formData.get("slug")?.toString().trim();
  if (slug) redirect(`/quiz/${slug}`);
}

export default function QuizLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Enter Quiz ID</h1>
        <p className="text-sm text-gray-500 mb-6">
          Paste the quiz ID shared with you to get started.
        </p>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <input
            name="slug"
            type="text"
            required
            placeholder="e.g. javascript-basics"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm
              focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm
              hover:bg-indigo-700 active:scale-95 transition-all duration-200"
          >
            Go to Quiz
          </button>
        </form>

      </div>
    </div>
  );
}
