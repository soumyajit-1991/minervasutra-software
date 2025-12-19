import { Pill } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";

export default function TopMedicine({ darkMode }) {
  return (
    <div
      className={`col-span-12 md:col-span-4 rounded-xl shadow p-5 transition-colors duration-300 ${
        darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Pill
            className={`w-4 h-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          />
          <h3 className="font-semibold text-sm">
            Top Selling <br />
            Medicine
          </h3>
        </div>
        <button
          className={`flex items-center gap-1 border text-xs px-2 py-1 rounded-md transition ${
            darkMode
              ? "border-gray-500 bg-gray-600 text-gray-100 hover:bg-gray-500"
              : "border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          This Week
          <IoIosArrowDown className="ml-3" />
        </button>
      </div>

      {/* Colored bar strip */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-2 rounded mt-3 ${
              i < 8
                ? darkMode
                  ? "bg-blue-400"
                  : "bg-blue-500"
                : i < 15
                ? darkMode
                  ? "bg-green-400"
                  : "bg-green-500"
                : i < 22
                ? darkMode
                  ? "bg-orange-400"
                  : "bg-orange-500"
                : darkMode
                ? "bg-purple-400"
                : "bg-purple-500"
            }`}
          />
        ))}
      </div>

      {/* Medicine rows */}
      <div className="space-y-4">
        <MedicineRow
          name="Dolo 650"
          value={54647}
          color={darkMode ? "bg-blue-400" : "bg-blue-500"}
          darkMode={darkMode}
        />
        <MedicineRow
          name="Crosin"
          value={12345}
          color={darkMode ? "bg-green-400" : "bg-green-500"}
          darkMode={darkMode}
        />
        <MedicineRow
          name="Gelusil"
          value={16567}
          color={darkMode ? "bg-orange-400" : "bg-orange-500"}
          darkMode={darkMode}
        />
        <MedicineRow
          name="Benedryl"
          value={10412}
          color={darkMode ? "bg-purple-400" : "bg-purple-500"}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

function MedicineRow({ name, value, color, darkMode }) {
  return (
    <div>
      <div
        className={`flex justify-between text-sm mb-1 ${
          darkMode ? "text-gray-300" : "text-gray-900"
        }`}
      >
        <span>{name}</span>
        <span>${value.toLocaleString()}</span>
      </div>
      <div
        className={`w-full h-2 rounded ${
          darkMode ? "bg-gray-600" : "bg-gray-200"
        }`}
      >
        <div
          className={`h-2 rounded ${color}`}
          style={{ width: `${Math.min((value / 60000) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}