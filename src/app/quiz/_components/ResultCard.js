"use client";

import Image from "next/image";

/**
 * @param {{ fullName: string, imageUrl: string }} user - Clerk user object
 */
export default function ResultCard({ imageUrl, fullName }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-8 px-4 animate-fade-in">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={fullName ?? "User"}
          width={80}
          height={80}
          className="rounded-full ring-4 ring-indigo-100"
        />
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Thank you, {fullName?.split(" ")[0] ?? "there"}!
        </h2>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">
          Your responses have been recorded.<br />
          Results will be shared with you personally.
        </p>
      </div>

      <div className="w-16 h-1 rounded-full bg-indigo-200" />

      <p className="text-xs text-gray-400">
        You may now close this page.
      </p>
    </div>
  );
}
