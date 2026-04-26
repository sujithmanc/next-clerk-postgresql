import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default function AboutPage() {
    const filePath = path.join(process.cwd(), "src/content/about.md");
    const content = fs.readFileSync(filePath, "utf-8");

    return (
        <div style={{ maxWidth: "700px", margin: "40px auto", lineHeight: 1.6 }}>
            <div className="max-w-2xl mx-auto my-10 leading-relaxed">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => (
                            <h1 className="text-4xl font-bold mb-6">{children}</h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold mb-4">{children}</h2>
                        ),
                        p: ({ children }) => (
                            <p className="mb-4">{children}</p>
                        ),
                        hr: () => (
                            <hr className="my-6 border-gray-300" />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}