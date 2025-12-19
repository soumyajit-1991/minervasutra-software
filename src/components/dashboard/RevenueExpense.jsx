import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { IoIosArrowDown } from "react-icons/io";

// --- Sample Data Definitions ---
// NOTE: In a real application, this data would likely be fetched from an API
const monthlyData = [
  { month: 'Jan', revenue: 4000, expense: 2400 },
  { month: 'Feb', revenue: 3000, expense: 1398 },
  { month: 'Mar', revenue: 5500, expense: 4800 },
  { month: 'Apr', revenue: 4500, expense: 3908 },
  { month: 'May', revenue: 6000, expense: 5800 },
  { month: 'Jun', revenue: 7000, expense: 6400 },
  { month: 'Jul', revenue: 7100, expense: 6700 },
  { month: 'Aug', revenue: 7300, expense: 6800 },
  { month: 'Sep', revenue: 7000, expense: 6400 },
  { month: 'Oct', revenue: 7000, expense: 6400 },
  { month: 'Nov', revenue: 8000, expense: 7400 },
  { month: 'Dec', revenue: 7000, expense: 6400 },
];

const yearlyData = [
  { year: '2021', revenue: 45000, expense: 32000 },
  { year: '2022', revenue: 62000, expense: 55000 },
  { year: '2023', revenue: 80000, expense: 68000 },
  { year: '2024', revenue: 95000, expense: 71000 },
];
// ---------------------------------

export default function RevenueExpense({ darkMode }) {
  // We no longer rely on the 'data' prop and manage the data internally or pass both datasets.
  // I've removed 'data' from the component props for this example.
  const [view, setView] = useState("Monthly"); // "Monthly" or "Yearly"

  // 1. Conditional Data Selection based on 'view' state
  const chartData = view === "Monthly" ? monthlyData : yearlyData;
  
  // 2. Conditional XAxis Data Key based on 'view' state
  const xAxisKey = view === "Monthly" ? "month" : "year";

  return (
    <div
      className={`p-4 shadow rounded-xl transition-colors duration-300 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold mb-2">{view} Budget vs Expense Graph</h2>
        <div className="flex bg-gray-200 rounded p-1 dark:bg-gray-600">
          <button
            onClick={() => setView("Monthly")}
            className={`px-3 py-1 text-xs rounded transition ${view === "Monthly" ? (darkMode ? "bg-gray-500 text-white shadow" : "bg-white text-gray-900 shadow") : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("Yearly")}
            className={`px-3 py-1 text-xs rounded transition ${view === "Yearly" ? (darkMode ? "bg-gray-500 text-white shadow" : "bg-white text-gray-900 shadow") : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"}`}
          >
            Yearly
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        {/* Pass the conditionally selected chartData */}
        <LineChart data={chartData}> 
          {/* Use the conditional xAxisKey */}
          <XAxis dataKey={xAxisKey} stroke={darkMode ? "#9ca3af" : "#6b7280"} /> 
          <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#374151" : "#fff",
              color: darkMode ? "#e5e7eb" : "#374151",
              border: darkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22d3ee" // cyan-400 (Budget)
            name="Budget"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#c026d3" // fuchsia-700 (Expense)
            name="Expense"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}