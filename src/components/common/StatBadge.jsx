export default function StatBadge({ label, value }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-3">
      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}

