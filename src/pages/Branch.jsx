import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";

export default function Branch() {
  const { darkMode } = useOutletContext();
const navigate = useNavigate();
  // Branch data with updated suppliers structure
  const [branches] = useState([
    {
      id: 1,
      name: "Kolkata Branch",
      address: "123 Pharmacy Lane, Kolkata, 710000",
      manager: {
        name: "Rahul Sharma",
        address: "456 Manager St, Kolkata",
        contact: "9876543210",
        email: "rahul.sharma@example.com",
        aadhaar: "1234-5678-9012"
      },
      employees: [
        { id: 1, name: "Amit Singh", mobile: "9876543210", aadhaar: "1234-5678-9012", address: "456 Medical St, Kolkata", role: "Pharmacist" },
        { id: 2, name: "Priya Sharma", mobile: "8765432109", aadhaar: "2345-6789-0123", address: "789 Health Rd, Kolkata", role: "Cashier" },
        { id: 3, name: "Rakesh Kumar", mobile: "7654321098", aadhaar: "3456-7890-1234", address: "101 Clinic Ave, Kolkata", role: "Inventory Manager" },
      ],
      suppliers: [
        { id: 1, name: "MediCorp", contact: "9123456789", email: "contact@medicorp.com", address: "789 Supplier Rd, Kolkata" },
        { id: 2, name: "PharmaPlus", contact: "9234567890", email: "info@pharmaplus.com", address: "101 Pharma St, Kolkata" },
      ],
    }
  ]);

  // Revenue and Expense data
  const revenueData = {
    week: [{ day: "Mon", value: 2000 }, { day: "Tue", value: 2500 }, { day: "Wed", value: 2300 }, { day: "Thu", value: 2800 }],
    month: [{ week: "Week 1", value: 8000 }, { week: "Week 2", value: 9500 }, { week: "Week 3", value: 11000 }, { week: "Week 4", value: 13000 }],
    year: [{ month: "Jan", value: 8000 }, { month: "Feb", value: 9500 }, { month: "Mar", value: 11000 }, { month: "Apr", value: 13000 }],
  };

  const expenseData = {
    week: [{ day: "Mon", value: 1000 }, { day: "Tue", value: 1200 }, { day: "Wed", value: 1100 }, { day: "Thu", value: 1300 }],
    month: [{ week: "Week 1", value: 4000 }, { week: "Week 2", value: 4500 }, { week: "Week 3", value: 5000 }, { week: "Week 4", value: 5500 }],
    year: [{ month: "Jan", value: 5000 }, { month: "Feb", value: 6000 }, { month: "Mar", value: 5500 }, { month: "Apr", value: 6500 }],
  };

  // State for popups and dropdowns
  const [showManagerPopup, setShowManagerPopup] = useState(false);
  const [showEmployeesPopup, setShowEmployeesPopup] = useState(false);
  const [showSuppliersPopup, setShowSuppliersPopup] = useState(false);
  const [showRevenuePopup, setShowRevenuePopup] = useState(false);
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("year");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showRevenueDropdown, setShowRevenueDropdown] = useState(false);
  const [showExpenseDropdown, setShowExpenseDropdown] = useState(false);

  // Handlers for popups
  const handleShowManager = (branch) => {
    setSelectedBranch(branch);
    setShowManagerPopup(true);
  };

  const handleShowEmployees = (branch) => {
    setSelectedBranch(branch);
    setShowEmployeesPopup(true);
  };

  const handleShowSuppliers = (branch) => {
    setSelectedBranch(branch);
    setShowSuppliersPopup(true);
  };

  const handleShowRevenue = (branch) => {
    setSelectedBranch(branch);
    setShowRevenuePopup(true);
  };

  const handleShowExpense = (branch) => {
    setSelectedBranch(branch);
    setShowExpensePopup(true);
  };

  const handleDeleteBranch = (id) => {
    alert(`Delete branch with id: ${id}`);
  };

  const handleEditBranch = (id) => {
    alert(`Edit branch with id: ${id}`);
  };

  const handleAddBranch = () => {
     navigate("/add-branch");
  };

  const toggleRevenueDropdown = () => {
    setShowRevenueDropdown(!showRevenueDropdown);
  };

  const toggleExpenseDropdown = () => {
    setShowExpenseDropdown(!showExpenseDropdown);
  };

  
  
  return (
    <div className={`p-6 space-y-6 transition-colors duration-300 ml-64 mt-16
    ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Branch Management</h1>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          onClick={handleAddBranch}
        >
          <Plus size={18} />
          Add New Branch
        </button>
      </div>
      
      {/* Main Table */}
      <div className={`shadow rounded-md overflow-hidden ${darkMode ? "bg-gray-700" : "bg-white"}`}>
        <div className="overflow-x-auto text-center text-sm">
          <table className={`w-full border text-sm ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
            <thead className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}>
              <tr>
                <th className="p-3">Branch Name</th>
                <th className="p-3 ">Address</th>
                <th className="p-3 ">Store Manager</th>
                <th className="p-3 ">Employees</th>
                <th className="p-3 ">Suppliers</th>
                <th className="p-3 ">Revenue</th>
                <th className="p-3 ">Expense</th>
                <th className="p-3 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.id} className={`border-t ${darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-50"}`}>
                  <td className="p-3">{branch.name}</td>
                  <td className="p-3">{branch.address}</td>
                  <td className="p-3">
                    <button onClick={() => handleShowManager(branch)}>
                      <Eye size={18} className="" />
                    </button>
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleShowEmployees(branch)}>
                      <Eye size={18} className="" />
                    </button>
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleShowSuppliers(branch)}>
                      <Eye size={18} className="" />
                    </button>
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleShowRevenue(branch)}>
                      <Eye size={18} className="0" />
                    </button>
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleShowExpense(branch)}>
                      <Eye size={18} className="" />
                    </button>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className={`p-2 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                      onClick={() => handleEditBranch(branch.id)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={`p-2 rounded ${darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"} text-white`}
                      onClick={() => handleDeleteBranch(branch.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manager Popup */}
      {showManagerPopup && selectedBranch && (
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-md w-full ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
            <h3 className="text-lg font-semibold mb-4">Store Manager Details</h3>
            <p><strong>Name:</strong> {selectedBranch.manager.name}</p>
            <p><strong>Address:</strong> {selectedBranch.manager.address}</p>
            <p><strong>Contact:</strong> {selectedBranch.manager.contact}</p>
            <p><strong>Email:</strong> {selectedBranch.manager.email}</p>
            <p><strong>Aadhaar:</strong> {selectedBranch.manager.aadhaar}</p>
            <button
              className={`mt-4 px-4 py-2 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
              onClick={() => setShowManagerPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Employees Popup */}
      {showEmployeesPopup && selectedBranch && (
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-4xl w-full ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
            <h3 className="text-lg font-semibold mb-4">Employee Details</h3>
            <div className="overflow-x-auto">
              <table className={`w-full border text-sm  text-center ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
                <thead className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}>
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Aadhaar</th>
                    <th className="p-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBranch.employees.map((emp) => (
                    <tr key={emp.id} className={`border-t ${darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-50"}`}>
                      <td className="p-3">{emp.name}</td>
                      <td className="p-3">{emp.address}</td>
                      <td className="p-3">{emp.mobile}</td>
                      <td className="p-3">{emp.email || "N/A"}</td>
                      <td className="p-3">{emp.aadhaar}</td>
                      <td className="p-3">{emp.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className={`mt-4 px-4 py-2 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
              onClick={() => setShowEmployeesPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Suppliers Popup (modified to show name, contact, email, and address) */}
      {showSuppliersPopup && selectedBranch && (
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-4xl w-full ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
            <h3 className="text-lg font-semibold mb-4">Supplier Details</h3>
            <div className="overflow-x-auto">
              <table className={`min-w-[1200px] border text-center ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
                <thead className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}>
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBranch.suppliers.map((supplier) => (
                    <tr key={supplier.id} className={`border-t ${darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-50"}`}>
                      <td className="p-3">{supplier.name}</td>
                      <td className="p-3">{supplier.contact}</td>
                      <td className="p-3">{supplier.email}</td>
                      <td className="p-3">{supplier.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className={`mt-4 px-4 py-2 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
              onClick={() => setShowSuppliersPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Revenue Popup */}
      {showRevenuePopup && selectedBranch && (
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-2xl w-full ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
            <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-4">Revenue Graph</h3>
            <div className="flex items-center gap-4 mb-2">
              <div className="relative">
                <button
                  className={`flex items-center gap-1 border text-xs px-2 py-1 rounded-md transition ${darkMode ? "border-gray-500 bg-gray-600 hover:bg-gray-500 text-gray-100" : "border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                  onClick={toggleRevenueDropdown}
                >
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} <IoIosArrowDown size={14} />
                </button>
                {showRevenueDropdown && (
                  <div className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg ${darkMode ? "bg-gray-600" : "bg-white"}`}>
                    <div className="py-1">
                      {["week", "month", "year"].map((period) => (
                        <button
                          key={period}
                          className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? "text-gray-100 hover:bg-gray-500" : "text-gray-900 hover:bg-gray-100"}`}
                          onClick={() => {
                            setSelectedPeriod(period);
                            setShowRevenueDropdown(false);
                          }}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData[selectedPeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey={selectedPeriod === "week" ? "day" : selectedPeriod === "month" ? "week" : "month"} stroke={darkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
                <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#374151" : "#ffffff",
                    border: `1px solid ${darkMode ? "#4b5563" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    color: darkMode ? "#f9fafb" : "#111827",
                  }}
                />
                <Bar dataKey="value" fill={darkMode ? "#22c55e" : "#10b981"} radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
            <button
              className={`mt-4 px-4 py-2 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
              onClick={() => setShowRevenuePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

{/* Expense Popup */}
      {showExpensePopup && selectedBranch && (
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-2xl w-full ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
            <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-4">Expense Graph</h3>
            <div className="flex items-center gap-4 mb-2">
              <div className="relative">
                <button
                  className={`flex items-center gap-1 border text-xs px-2 py-1 rounded-md transition ${darkMode ? "border-gray-500 bg-gray-600 hover:bg-gray-500 text-gray-100" : "border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                  onClick={toggleExpenseDropdown}
                >
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} <IoIosArrowDown size={14} />
                </button>
                {showExpenseDropdown && (
                  <div className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg ${darkMode ? "bg-gray-600" : "bg-white"}`}>
                    <div className="py-1">
                      {["week", "month", "year"].map((period) => (
                        <button
                          key={period}
                          className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? "text-gray-100 hover:bg-gray-500" : "text-gray-900 hover:bg-gray-100"}`}
                          onClick={() => {
                            setSelectedPeriod(period);
                            setShowExpenseDropdown(false);
                          }}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData[selectedPeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey={selectedPeriod === "week" ? "day" : selectedPeriod === "month" ? "week" : "month"} stroke={darkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
                <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#374151" : "#ffffff",
                    border: `1px solid ${darkMode ? "#4b5563" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    color: darkMode ? "#f9fafb" : "#111827",
                  }}
                />
                <Bar dataKey="value" fill={darkMode ? "#ef4444" : "#dc2626"} radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
            <button
              className={`mt-4 px-4 py-2 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
              onClick={() => setShowExpensePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}