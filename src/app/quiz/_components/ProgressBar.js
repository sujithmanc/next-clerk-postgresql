"use client";

/**
 * @param {number} current - 0-based current question index
 * @param {number} total   - total question count
 */
export default function ProgressBar({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Question {current + 1} of {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
