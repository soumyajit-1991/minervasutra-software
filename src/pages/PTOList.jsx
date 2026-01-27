import { useOutletContext } from "react-router-dom";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";


import {
  Palmtree,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { fetchPTORequests } from "../api/ptoService";
import axios from "axios";

export default function PTOList() {
  const { darkMode } = useOutletContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();
  const navigate = useNavigate();
  const fetchptolist = async () => {
    try {
      const res = await axios.get("https://hr-management-h9l2.vercel.app/api/employees");
      setList(res.data);
      setRequests(res.data);
      console.log(res.data);
    } catch (err) {
      // setError("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchptolist();
  }, []);

  // const metrics = {
  //       totalRequests: requests.length,
  //       pending: requests.filter(r => r.status === 'Pending').length,
  //       approved: requests.filter(r => r.status === 'Approved').length,
  //       rejected: requests.filter(r => r.status === 'Rejected').length
  // };

  const metrics = {
    totalRequests: requests?.length || 0,
    pending: requests?.filter((r) => r.status === "Pending").length || 0,
    approved: requests?.filter((r) => r.status === "Approved").length || 0,
    rejected: requests?.filter((r) => r.status === "Rejected").length || 0,
  };

  return (
    <div
      className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Palmtree /> PTO List
        </h1>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Requests"
          value={metrics.totalRequests}
          icon={<Palmtree size={24} className="text-blue-500" />}
          darkMode={darkMode}
        />
        <StatCard
          title="Pending"
          value={metrics.pending}
          icon={<Clock size={24} className="text-orange-500" />}
          darkMode={darkMode}
        />
        <StatCard
          title="Approved"
          value={metrics.approved}
          icon={<CheckCircle size={24} className="text-green-500" />}
          darkMode={darkMode}
        />
        <StatCard
          title="Rejected"
          value={metrics.rejected}
          icon={<XCircle size={24} className="text-red-500" />}
          darkMode={darkMode}
        />
      </div>

      {/* PTO Requests List */}
      <div
        className={`rounded-xl shadow-md overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-bold text-lg">All PTO Requests</h2>
          <div className="flex gap-2">
            <select
              className={`text-sm rounded-md px-2 py-1 border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <select
              className={`text-sm rounded-md px-2 py-1 border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <option>All Types</option>
              <option>Vacation</option>
              <option>Sick Leave</option>
              <option>Personal</option>
            </select>
          </div>
        </div>
        {requests.length === 0 ? (
  <p>No employees found</p>
) : (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr
          className={`text-left ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <th className="px-4 py-3">Employee ID</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3">Department</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3 text-right">Action</th>
        </tr>
      </thead>

      <tbody>
        {requests.map((emp) => (
          <tr
            key={emp._id}
            className={`border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            } hover:bg-gray-50 dark:hover:bg-gray-700 transition`}
          >
            <td className="px-4 py-3">{emp.employeeId}</td>
            <td className="px-4 py-3">{emp.name}</td>
            <td className="px-4 py-3">{emp.email}</td>
            <td className="px-4 py-3">{emp.department}</td>
            <td className="px-4 py-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  emp.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : emp.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {emp.status}
              </span>
            </td>

            {/* ACTION BUTTON */}
            <td className="px-4 py-3 text-right">
              <button
  onClick={() => navigate(`/employee/${emp._id}`)}
  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition
    ${
      darkMode
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
>
  <Eye size={16} />
  Details
</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


       
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, darkMode }) {
  return (
    <div
      className={`flex items-center p-4 rounded-xl shadow-sm ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {title}
        </p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
