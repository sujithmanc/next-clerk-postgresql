"use client";

import Image from "next/image";
import { Trophy, CheckCircle } from "lucide-react";

export default function ResultCard({
  imageUrl,
  fullName,
  testName,
  maxScore = 100,
  userScore = 80,
}) {
  const firstName = fullName?.split(" ")[0] ?? "there";
  const percentage = Math.round((userScore / maxScore) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center gap-5">

          {/* Avatar */}
          {imageUrl && (
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Image
                  src={imageUrl}
                  alt={fullName ?? "User"}
                  width={80}
                  height={80}
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <div className="flex items-center justify-center gap-2 text-primary mb-1">
              <Trophy size={18} />
              <span className="text-sm font-semibold uppercase tracking-wide">
                {testName ?? "Quiz Result"}
              </span>
            </div>

            <h2 className="text-2xl font-bold">
              Great job, {firstName}! 🎉
            </h2>

            <p className="text-sm opacity-70 mt-2">
              Your responses have been recorded successfully.
            </p>
          </div>

          {/* Score */}
          <div className="bg-primary/10 text-primary px-6 py-3 rounded-2xl">
            <div className="text-3xl font-bold">
              {userScore} / {maxScore}
            </div>
            <div className="text-xs opacity-70">
              {percentage}% Score
            </div>
          </div>

          {/* Success Indicator */}
          <div className="flex items-center gap-2 text-success text-sm">
            <CheckCircle size={16} />
            Submitted Successfully
          </div>

          {/* Footer */}
          <p className="text-xs opacity-50">
            You may now close this page.
          </p>

        </div>
      </div>

    </div>
  );
}