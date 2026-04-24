import OptionTile from "./OptionTile";

export default function QuestionCard({ q, selected, onSelect }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">{q.question}</h2>
      {q.options.map((opt, i) => (
        <OptionTile
          key={i}
          text={opt}
          selected={selected === i}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
