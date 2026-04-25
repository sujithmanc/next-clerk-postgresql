"use client";

/**
 * @param {string}   label     - option text
 * @param {boolean}  selected  - is this option currently selected
 * @param {Function} onSelect  - callback on tap/click
 */
export default function OptionButton({ label, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 active:scale-95
        ${selected
          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
          : "border-gray-200 bg-white text-gray-800 hover:border-indigo-300 hover:bg-indigo-50"
        }`}
    >
      {label}
    </button>
  );
}
