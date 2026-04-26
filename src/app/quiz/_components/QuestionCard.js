"use client";

import OptionButton from "./OptionButton";
import { CheckCircle } from "lucide-react";

export default function QuestionCard({ question, selectedIndex, onSelect }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">

      {/* Question */}
      <h2 className="text-lg sm:text-xl font-semibold leading-relaxed mb-6 text-base-content">
        {question.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => onSelect(question.id, idx)}
              className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl border transition
                ${isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-base-300 hover:border-primary/40"
                }
              `}
            >
              <span className="text-sm sm:text-base">
                {option}
              </span>

              {isSelected && (
                <CheckCircle size={18} className="text-primary" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}