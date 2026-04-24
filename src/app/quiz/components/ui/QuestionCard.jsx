import OptionTile from "./OptionTile";

export default function QuestionCard({ q, selected, onSelect }) {
  return (
    <div>
      {/* Question */}
      <h2 className="text-lg font-semibold mb-4">
        {q.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => (
          <OptionTile
            key={i}
            text={opt}
            selected={selected === i}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}