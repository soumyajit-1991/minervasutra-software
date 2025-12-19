import { useState } from "react";
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
import { Search, Filter, Plus } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { useOutletContext } from "react-router-dom";

export default function Analytics() {
  const { darkMode } = useOutletContext();



  const [topMedicines, setTopMedicines] = useState([
    { name: "Dolo 650", sales: 54647 },
    { name: "Crosin", sales: 12345 },
    { name: "Gelusil", sales: 16567 },
    { name: "Benadryl", sales: 10412 },
    { name: "Panadol", sales: 9500 },
    { name: "Amoxicillin", sales: 8900 },
    { name: "Aspirin", sales: 8700 },
    { name: "Paracetamol", sales: 8500 },
    { name: "Ibuprofen", sales: 8300 },
    { name: "Cough Syrup", sales: 8100 },
  ]);

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

  // Revenue vs Expense Data
  const revenueExpenseData = [
    { month: "Jan", revenue: 10000, expense: 5000 },
    { month: "Feb", revenue: 12000, expense: 7000 },
    { month: "Mar", revenue: 13000, expense: 9000 },
    { month: "Apr", revenue: 15000, expense: 11000 },
    { month: "May", revenue: 16000, expense: 12000 },
    { month: "Jun", revenue: 17000, expense: 13000 },
    { month: "Jul", revenue: 18000, expense: 14000 },
    { month: "Aug", revenue: 19000, expense: 15000 },
    { month: "Sep", revenue: 20000, expense: 16000 },
    { month: "Oct", revenue: 18000, expense: 14000 },
    { month: "Nov", revenue: 17000, expense: 13000 },
    { month: "Dec", revenue: 20000, expense: 15000 },
  ];

  // Customer Data
  const customerData = [
    { month: "Jan", customers: 8 },
    { month: "Feb", customers: 3 },
    { month: "Mar", customers: 5 },
    { month: "Apr", customers: 4 },
    { month: "May", customers: 6 },
    { month: "Jun", customers: 7 },
    { month: "Jul", customers: 5 },
    { month: "Aug", customers: 4 },
    { month: "Sep", customers: 6 },
    { month: "Oct", customers: 5 },
    { month: "Nov", customers: 3 },
    { month: "Dec", customers: 4 },
  ];

  // Doctor Appointment Data
  const appointmentData = [
    { month: "Jan", appointments: 3 },
    { month: "Feb", appointments: 1 },
    { month: "Mar", appointments: 2 },
    { month: "Apr", appointments: 3 },
    { month: "May", appointments: 4 },
    { month: "Jun", appointments: 5 },
    { month: "Jul", appointments: 10 },
    { month: "Aug", appointments: 7 },
    { month: "Sep", appointments: 8 },
    { month: "Oct", appointments: 9 },
    { month: "Nov", appointments: 10 },
    { month: "Dec", appointments: 11 },
  ];

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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueExpenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                color: darkMode ? "#f3f4f6" : "#1f2937",
                border: darkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#4f46e5" />
            <Line type="monotone" dataKey="expense" stroke="#f97316" />
          </LineChart>
        </ResponsiveContainer>

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
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={topMedicines}
              dataKey="sales"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#4f46e5"
              label={(entry) => entry.name}
            >
              {topMedicines.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                color: darkMode ? "#f3f4f6" : "#1f2937",
                border: darkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
              }}
            />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>

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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={customerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                color: darkMode ? "#f3f4f6" : "#1f2937",
                border: darkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
              }}
            />
            <Legend />
            <Bar dataKey="customers" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>

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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={appointmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                color: darkMode ? "#f3f4f6" : "#1f2937",
                border: darkMode ? "1px solid #4b5563" : "1px solid #e5e7eb",
              }}
            />
            <Legend />
            <Bar dataKey="appointments" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>

     
        
     
      </div>
    </div>
  );
}