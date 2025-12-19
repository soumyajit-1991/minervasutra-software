export default function StatCard({ icon, title, value, change, darkMode }) {
  return (
    <div
      className={`rounded-xl p-4 flex flex-col justify-between shadow transition-colors duration-300 min-h-[180px] ${
        darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center gap-2 mb-2 text-sm opacity-90">
        {icon}
        <span>{title}</span>
      </div>

      <p className="text-2xl font-bold">{value}</p>

      <span
        className={`text-xs ${
          change.startsWith("+") ? "text-green-400" : "text-red-400"
        }`}
      >
        {change}
      </span>

      {/* Progress bar */}
      <div
        className={`w-full h-1 mt-3 rounded ${
          darkMode ? "bg-gray-600" : "bg-gray-200"
        }`}
      >
        <div className="h-1 rounded bg-fuchsia-500" style={{ width: "70%" }} />
      </div>
    </div>
  );
}
