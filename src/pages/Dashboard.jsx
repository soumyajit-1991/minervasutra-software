import { useOutletContext } from "react-router-dom";
import { Package, Users, DollarSign, TrendingUp } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RevenueExpense from "../components/dashboard/RevenueExpense";
import AddNew from "../components/dashboard/AddNew";
import PurchaseTable from "../components/dashboard/PurchaseTable";
import ClipboardList from "../components/dashboard/CustomerList";
import EventPieChart from "../components/dashboard/EventPieChart";
import { fetchDashboardStats } from "../api/dashboardService";
import { useState, useEffect } from "react";

// Revenue data will be fetched from backend in future
const revenueData = [];

import { useMemo } from "react";
import { useEmployees } from "../context/EmployeeContext";

export default function Dashboard() {
  const { darkMode } = useOutletContext();
  const { employees, loading, totalEmployees } = useEmployees();
  const [dashboardStats, setDashboardStats] = useState({
    activeJobPostings: 0,
    totalCandidates: 0,
    todayAttendance: 0,
    monthlyExpenses: 0,
    attendanceRate: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const stats = await fetchDashboardStats();
        setDashboardStats(stats);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    loadDashboardStats();
  }, []);

  const genderData = useMemo(() => {
    // Safety check: ensure employees is an array
    if (!Array.isArray(employees) || employees.length === 0) {
      return [];
    }

    const stats = employees.reduce((acc, curr) => {
      const gender = curr.personalInfo?.gender || "Unknown";
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {});

    const colors = {
      Male: "#3b82f6", // Blue
      Female: "#ec4899", // Pink
      Other: "#10b981", // Emerald
      Unknown: "#9ca3af" // Gray
    };

    return Object.entries(stats).map(([name, value], index) => ({
      name,
      value,
      color: colors[name] || "#fac" // Default color
    }));
  }, [employees]);

  return (
    <div
      className={`space-y-6 p-6 ml-64 mt-16 transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Stat Cards */}
        <div className="col-span-1 md:col-span-4 grid grid-cols-2 gap-4">
          {/* Employees */}
          <StatCard
            icon={<Users className="text-cyan-400" />}
            title="Total Employees"
            value={loading ? "..." : totalEmployees}
            change={`${dashboardStats.attendanceRate}% Present`}
            darkMode={darkMode}
          />

          {/* Active Job Postings */}
          <StatCard
            icon={<Package className="text-cyan-400" />}
            title="Active Jobs"
            value={statsLoading ? "..." : dashboardStats.activeJobPostings}
            change="Open Positions"
            darkMode={darkMode}
          />

          <div className="col-span-2">
            {/* Total Candidates */}
            <StatCard
              icon={<TrendingUp className="text-cyan-400" />}
              title="Total Candidates"
              value={statsLoading ? "..." : dashboardStats.totalCandidates}
              change="In Pipeline"
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Event (Gender) Chart */}
        <div className="col-span-1 md:col-span-4">
          <EventPieChart darkMode={darkMode} data={genderData} title="Gender Distribution" />
        </div>

        {/* Add New */}
        <div className="col-span-1 md:col-span-4 flex justify-center md:justify-start w-full">
          <div className="w-full">
            <AddNew darkMode={darkMode} />
          </div>
        </div>
      </div>

      {/* Revenue Graph */}
      {revenueData.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3">
            <RevenueExpense data={revenueData} darkMode={darkMode} />
          </div>
        </div>
      ) : (
        <div className={`p-8 rounded-xl text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <p className={`text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>No revenue data available</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <EventPieChart darkMode={darkMode} />
      </div>
      {/* Table Sections */}
      <div className="overflow-x-auto">
        <PurchaseTable darkMode={darkMode} />
      </div>
      <div className="overflow-x-auto">
        <ClipboardList darkMode={darkMode} />
      </div>
    </div>
  );
}
