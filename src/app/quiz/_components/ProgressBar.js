"use client";

import { motion } from "motion/react";

export default function ProgressBar({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full">

      {/* Top Info */}
      <div className="flex items-center justify-between text-xs opacity-60 mb-2">
        <span>
          Question {current + 1} / {total}
        </span>
        <span>{percent}%</span>
      </div>

      {/* Bar */}
      <div className="w-full h-2 bg-base-300 rounded-full overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />

      </div>

    </div>
  );
}