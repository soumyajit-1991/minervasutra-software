export default function AssetList({ darkMode }) {
  const assets = []; // No assets data available

  return (
    <div
      className={`p-4 shadow rounded-md transition-colors duration-300 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Asset List</h2>
        <button
          className={`text-sm px-3 py-1 rounded transition ${darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          View All
        </button>
      </div>

      {/* No Data Message */}
      <div className="text-center py-8">
        <p className="text-lg font-medium">No assets available</p>
        <p className="text-sm text-gray-500">Asset management feature coming soon</p>
      </div>
    </div>
  );
}