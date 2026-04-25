export default function OptionTile({ text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn w-full justify-start text-left ${
        selected ? "btn-primary" : "btn-outline"
      }`}
    >
      {text}
    </button>
  );
}