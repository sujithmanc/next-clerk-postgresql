export const dynamic = 'force-dynamic'; // ← this page should be dynamic to reflect database changes in real-time
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (<main className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the CGFJ Bible Quiz!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Test your Bible knowledge and challenge your friends with this interactive quiz.
      </p>
      <Image
        src="/bible-quiz.png"
        alt="CGFJ Bible Quiz"
        width={600}
        height={400}
        className="mx-auto rounded-lg shadow-lg"
      />
      <button className="mt-6 bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
        <Link href="/quiz">Start the Quiz</Link>
      </button>
    </div>
  </main>
  );
}
