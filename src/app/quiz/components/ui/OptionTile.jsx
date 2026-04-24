export default function OptionTile({ text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border mb-2 ${
        selected ? "bg-blue-500 text-white" : "bg-white"
      }`}
    >
      {text}
    </button>
  );
}
