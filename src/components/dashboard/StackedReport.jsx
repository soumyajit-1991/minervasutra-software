import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { PiDotsThree } from "react-icons/pi";

export default function StackedReport({ data, darkMode }) {
  return (
    <div
      className={`col-span-12 md:col-span-4 rounded-xl shadow p-5 h-[312px] transition-colors duration-300 ${
        darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Graph Report Yesterday</h3>
        <PiDotsThree
          className={`size-10 p-2 shadow ${
            darkMode ? "text-gray-300 bg-gray-600" : "text-gray-900 bg-gray-100"
          }`}
        />
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={4} barCategoryGap="20%">
          <XAxis dataKey="name" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#374151" : "#fff",
              color: darkMode ? "#e5e7eb" : "#374151",
              border: darkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
            }}
          />
          <Legend />
          <Bar
            dataKey="green"
            stackId="a"
            fill={darkMode ? "#86efac" : "#22c55e"}
            name="Crosin"
          />
          <Bar
            dataKey="orange"
            stackId="a"
            fill={darkMode ? "#fb923c" : "#f97316"}
            name="Gelusil"
          />
          <Bar
            dataKey="blue"
            stackId="a"
            fill={darkMode ? "#60a5fa" : "#3b82f6"}
            name="Dolo 650"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}