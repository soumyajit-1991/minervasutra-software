import { useOutletContext } from "react-router-dom";

export default function EmployeeDashboard() {
  const { darkMode } = useOutletContext() || {};

  return (
    <div className={`p-6 mt-16 ml-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <h1 className="text-2xl font-bold">Employee Dashboard</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded bg-blue-100 text-blue-800">
          Attendance: 22 / 26
        </div>

        <div className="p-4 rounded bg-green-100 text-green-800">
          Salary Status: Paid
        </div>

        <div className="p-4 rounded bg-yellow-100 text-yellow-800">
          Pending Leaves: 1
        </div>
      </div>
    </div>
  );
}
