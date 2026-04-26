export const dynamic = "force-dynamic";

import Image from "next/image";
import GoogleSignInButton from "./GoogleSignInButton";
import Link from "next/link";
import { Sparkles, BookOpen, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 px-4 py-10 flex justify-center">
      <div className="max-w-4xl w-full space-y-10">

        {/* Hero */}

        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wide font-semibold">
              CGFJ Quiz
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Welcome to the Bible Quiz
          </h1>

          <p className="text-base sm:text-lg opacity-70 max-w-2xl mx-auto">
            Test your knowledge, grow spiritually, and challenge your friends.
          </p>
        </div>


        {/* Image */}

        <div className="flex justify-center">
          <Image
            src="/bible-quiz.png"
            alt="Bible Quiz"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>


        {/* Content */}

        <div className="space-y-5 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <BookOpen size={18} />
            About Bible
          </div>

          <p>
            బైబిల్ అనేది క్రైస్తవ మతానికి పవిత్ర గ్రంథం మాత్రమే కాదు, మానవ జీవనానికి మార్గదర్శకంగా నిలిచే ఆధ్యాత్మిక సంపద.
          </p>

          <p>
            బైబిల్‌ను నేర్చుకోవడం ద్వారా మనం మంచి చెడు మధ్య తేడాను తెలుసుకుంటాము మరియు నీతిని అభివృద్ధి చేసుకుంటాము.
          </p>

          <p>
            ప్రేమ, సహనం, క్షమ వంటి గుణాలను పెంపొందించడానికి ఇది మనకు మార్గం చూపుతుంది.
          </p>

          <p>
            మొత్తానికి, బైబిల్ మన జీవితం శాంతిమయం మరియు సార్థకం చేయడానికి సహాయపడుతుంది.
          </p>
        </div>


        {/* CTA */}

        <div className="flex justify-center items-center mt-6">
          <Link
            href="/lesson/ruth-book-quiz-telugu"
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