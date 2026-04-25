"use client";

import OptionButton from "./OptionButton";

/**
 * @param {object}   question      - { id, question, options[] }
 * @param {number}   selectedIndex - currently selected option index or undefined
 * @param {Function} onSelect      - (questionId, optionIndex) => void
 */
export default function QuestionCard({ question, selectedIndex, onSelect }) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 leading-snug">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, idx) => (
          <OptionButton
            key={idx}
            label={option}
            selected={selectedIndex === idx}
            onSelect={() => onSelect(question.id, idx)}
          />
        ))}
      </div>
    </div>
  );
}
