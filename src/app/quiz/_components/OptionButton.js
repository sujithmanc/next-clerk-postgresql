"use client";

import { CheckCircle } from "lucide-react";

export default function OptionButton({ label, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl border transition-all duration-200 active:scale-[0.98]
        ${
          selected
            ? "border-primary bg-primary/10 text-primary"
            : "border-base-300 hover:border-primary/40"
        }
      `}
    >
      {/* Label */}
      <span className="text-sm sm:text-base leading-relaxed">
        {label}
      </span>

      {/* Selected Icon */}
      {selected && (
        <CheckCircle size={18} className="text-primary" />
      )}
    </button>
  );
}