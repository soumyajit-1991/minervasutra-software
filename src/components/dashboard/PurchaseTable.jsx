import { useEmployees } from "../../context/EmployeeContext";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployeeList({ darkMode }) {
  const { employees, loading } = useEmployees();
  const navigate = useNavigate();

  return (
    <div
      className={`p-4 shadow rounded-md transition-colors duration-300 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Employee List</h2>
        <button
          onClick={() => navigate('/employee')}
          className={`text-sm px-3 py-1 rounded transition ${darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          View All
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm">Loading employees...</p>
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg font-medium">No employees found</p>
          <p className="text-sm text-gray-500">Add employees to see them here</p>
        </div>
      ) : (
        <table
          className={`w-full text-sm shadow text-center overflow-x-auto ${darkMode ? "border-gray-600" : "border-gray-200"}`}
        >
          <thead
            className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-600"}
          >
            <tr>
              <th className="p-2">Employee ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Department</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {(employees || []).slice(0, 5).map((emp, index) => (
              <tr
                key={emp._id || `emp-${index}`}
                className={`shadow transition-colors duration-300 ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-50"}`}
              >
                <td className="p-2">{emp._id ? emp._id.slice(-6) : 'N/A'}</td>
                <td className="p-2">{emp.name || 'N/A'}</td>
                <td className="p-2">{emp.role || 'N/A'}</td>
                <td className="p-2">{emp.department || 'N/A'}</td>
                <td className="p-2">{emp.phone || 'N/A'}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => navigate('/employee-profiles')}
                    className={`p-1 rounded transition ${darkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}