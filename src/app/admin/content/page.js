import { saveLesson } from "@/app/quiz/_services/lessonService";
import { getAllQuizSlugsIDs } from "@/app/quiz/_services/quizService";
import { BookPlus, Save } from "lucide-react";
import { redirect } from "next/navigation";



async function createLesson(formData) {
    "use server";

    const quizId = formData.get("quizId")?.toString().trim();
    const content = formData.get("content")?.toString().trim();

    if (!quizId || !content) {
        throw new Error("Missing required fields");
    }

    await saveLesson({ quizId, content });

    redirect("/admin"); // optional
}

export default async function CreateLessonPage() {
    const quizSlugs = await getAllQuizSlugsIDs();

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <BookPlus className="w-6 h-6 opacity-70" />
                    <h1 className="text-2xl font-bold">Create Lesson</h1>
                </div>

                {/* Form */}
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body">

                        <form action={createLesson} className="space-y-5">

                            {/* Dropdown */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Select Quiz
                                    </span>
                                </label>

                                <select
                                    name="quizId"
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">Choose a quiz</option>

                                    {quizSlugs.map((quiz) => (
                                        <option key={quiz.id} value={quiz.id}>
                                            {quiz.slug}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Lesson Content (Markdown)
                                    </span>
                                </label>

                                <textarea
                                    name="content"
                                    rows={10}
                                    placeholder="# Title\n## Subtitle\nWrite your lesson..."
                                    className="textarea textarea-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <button className="btn btn-primary w-full gap-2">
                                <Save size={16} />
                                Save Lesson
                            </button>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
}