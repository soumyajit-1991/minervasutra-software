import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Search, Filter, Plus, TrendingUp } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { useOutletContext } from "react-router-dom";

export default function Analytics() {
  const { darkMode } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Empty data arrays - in a real app, these would come from APIs
  const topMedicines = [];
  const revenueExpenseData = [];
  const customerData = [];
  const appointmentData = [];

  const COLORS = [
    "#4f46e5",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#6366f1",
    "#3b82f6",
    "#14b8a6",
    "#f97316",
    "#84cc16",
    "#f43f5e",
  ];

  if (loading) {
    return (
      <div className={`p-6 space-y-6 ml-64 mt-16 transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 space-y-6 ml-64 mt-16 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
        </div>
      </div>

      <div
        className={`p-4 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium mb-4">Revenue vs Expense</h3>
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
        
        <div className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <TrendingUp size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
            <p className={`text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No revenue data available</p>
            <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Revenue and expense data will appear here</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium mt-6 mb-4">Top 10 Selling Medicines</h3>
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
        
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
              <TrendingUp size={32} className={darkMode ? "text-gray-400" : "text-gray-500"} />
            </div>
            <p className={`text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No sales data available</p>
            <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Medicine sales data will appear here</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium mt-6 mb-4">Customer Data</h3>
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
        
        <div className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <TrendingUp size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
            <p className={`text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No customer data available</p>
            <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Customer analytics will appear here</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium mt-6 mb-4">Doctor Appointments</h3>
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
        
        <div className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <TrendingUp size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
            <p className={`text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No appointment data available</p>
            <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Doctor appointment analytics will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}