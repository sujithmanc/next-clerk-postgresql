import { getLessonContentByQuizSlug } from "@/app/quiz/_services/lessonService";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight } from "lucide-react";

export default async function QuizDescPage({ params }) {
    const { slug } = await params;
    const lessonContent = await getLessonContentByQuizSlug(slug);

    const content =
        lessonContent.length > 0
            ? lessonContent[0].content
            : "No lesson content available.";

    return (
        <main className="min-h-screen bg-base-200 px-4 py-8 flex justify-center">

            <div className="w-full max-w-2xl">

                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                        {slug}
                    </h1>
                    <p className="text-sm opacity-60 mt-1">
                        Quiz Description
                    </p>
                </header>

                {/* Content */}
                <article className="space-y-4 text-base leading-relaxed text-base-content">

                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-3">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-xl font-semibold mt-5 mb-2">
                                    {children}
                                </h2>
                            ),
                            p: ({ children }) => (
                                <p className="mb-4 leading-relaxed">{children}</p>
                            ),
                            hr: () => (
                                <hr className="my-6 border-base-300" />
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>

                </article>

                {/* CTA */}
                <div className="mt-10 flex justify-center">
                    <Link
                        href={`/quiz/${slug}`}
                        className="btn btn-primary gap-2 px-6"
                    >
                        Start Quiz
                        <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </main>
    );
}