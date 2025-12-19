import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

export default function EmployeeList({ darkMode }) {
  // Mock data for Employees
  const [employees, setEmployees] = useState([
    {
      id: "EMP-001",
      joinDate: "Jan 10, 2023",
      name: "John Doe",
      designation: "Pharmacist",
      mobile: "123-456-7890",
      status: "Active"
    },
    {
      id: "EMP-002",
      joinDate: "Feb 14, 2023",
      name: "Jane Smith",
      designation: "Sales",
      mobile: "987-654-3210",
      status: "Active"
    },
    {
      id: "EMP-003",
      joinDate: "Mar 01, 2024",
      name: "Alice Johnson",
      designation: "Manager",
      mobile: "555-123-4567",
      status: "On Leave"
    },
  ]);

  return (
    <div
      className={`p-4 shadow rounded-md transition-colors duration-300 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Employee List</h2>
        <button
          className={`text-sm px-3 py-1 rounded transition ${darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          View All
        </button>
      </div>

      {/* Table */}
      <table
        className={`w-full text-sm shadow text-center overflow-x-auto ${darkMode ? "border-gray-600" : "border-gray-200"
          }`}
      >
        <thead
          className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-600"}
        >
          <tr>
            <th className="p-2">Employee ID</th>
            <th className="p-2">Join Date</th>
            <th className="p-2">Name</th>
            <th className="p-2">Designation</th>
            <th className="p-2">Mobile</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={index}
              className={`shadow transition-colors duration-300 ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-50"
                }`}
            >
              <td className="p-2">{emp.id}</td>
              <td className="p-2">{emp.joinDate}</td>
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.designation}</td>
              <td className="p-2">{emp.mobile}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs ${emp.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {emp.status}
                </span>
              </td>
              <td className="p-2 flex gap-2 justify-center">
                {/* <button
                  className={`p-1 rounded transition ${darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                  <Eye size={16} />
                </button> */}
                <button
                  className={`p-1 rounded transition ${darkMode
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  <Edit size={16} />
                </button>
                <button
                  className={`p-1 rounded transition ${darkMode
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}