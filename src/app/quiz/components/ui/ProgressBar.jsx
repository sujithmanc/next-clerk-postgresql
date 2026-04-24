export default function ProgressBar({ current, total }) {
  const percent = (current / total) * 100;
  return (
    <div className="w-full h-2 bg-slate-200 rounded">
      <div
        className="h-2 bg-blue-500 rounded"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
