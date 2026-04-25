<div className="flex items-center gap-2">
  <progress
    className="progress progress-primary w-full"
    value={percent}
    max="100"
  />
  <span className="text-sm">{Math.round(percent)}%</span>
</div>