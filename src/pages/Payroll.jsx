// import { useOutletContext } from "react-router-dom";
// import { DollarSign, Clock, CheckCircle, CreditCard, Download } from "lucide-react";

// export default function Payroll() {
//       const { darkMode } = useOutletContext();
      
//       // No payroll data available
//       const metrics = {
//             totalPayroll: "$0",
//             pendingPayments: 0,
//             processed: 0,
//             avgSalary: "$0"
//       };
//       const records = [];

//       const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
//             }`;

//       return (
//             <div
//                   className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//                         }`}
//             >
//                   <h1 className="text-2xl font-bold mb-6">Payroll Management</h1>

//                   {/* Metrics Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                         <StatCard
//                               title="Total Payroll"
//                               value={metrics.totalPayroll}
//                               icon={<DollarSign size={24} className="text-green-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Pending Payments"
//                               value={metrics.pendingPayments}
//                               icon={<Clock size={24} className="text-yellow-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Processed"
//                               value={metrics.processed}
//                               icon={<CheckCircle size={24} className="text-blue-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Average Salary"
//                               value={metrics.avgSalary}
//                               icon={<CreditCard size={24} className="text-purple-500" />}
//                               darkMode={darkMode}
//                         />
//                   </div>

//                   {/* Payroll Records Table */}
//                   <div className={cardClass}>
//                         <div className="flex justify-between items-center mb-6">
//                               <h2 className="text-lg font-semibold">Payroll Records (Nov 2024)</h2>
//                               <div className="flex gap-2">
//                                     <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition transition-colors flex items-center gap-2">
//                                           <Download size={16} /> Export CSV
//                                     </button>
//                                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition transition-colors">
//                                           Process Payroll
//                                     </button>
//                               </div>
//                         </div>
//                         <div className="overflow-x-auto">
//                               <table className="w-full text-left">
//                                     <thead>
//                                           <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
//                                                 <th className="py-3 px-2">ID</th>
//                                                 <th className="py-3 px-2">Employee</th>
//                                                 <th className="py-3 px-2">Role</th>
//                                                 <th className="py-3 px-2">Salary</th>
//                                                 <th className="py-3 px-2">Date</th>
//                                                 <th className="py-3 px-2">Status</th>
//                                                 <th className="py-3 px-2">Action</th>
//                                           </tr>
//                                     </thead>
//                                     <tbody>
//                                           <tr>
//                                                 <td colSpan="7" className="py-8 text-center">
//                                                       <DollarSign size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
//                                                       <p className="text-lg font-medium">No payroll records available</p>
//                                                       <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Payroll data will appear here when processed</p>
//                                                 </td>
//                                           </tr>
//                                     </tbody>
//                               </table>
//                         </div>
//                   </div>
//             </div>
//       );
// }

// function StatCard({ title, value, icon, darkMode }) {
//       return (
//             <div
//                   className={`flex items-center p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"
//                         }`}
//             >
//                   <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">{icon}</div>
//                   <div>
//                         <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
//                         <h3 className="text-xl font-bold">{value}</h3>
//                   </div>
//             </div>
//       );
// }


import { useOutletContext } from "react-router-dom";
import {
  DollarSign,
  Clock,
  CheckCircle,
  CreditCard,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Payroll() {
  const { darkMode } = useOutletContext();

  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);

  /* ===== FORM STATE (MATCHES MODEL) ===== */
  const [formData, setFormData] = useState({
    payrollId: "",
    employeeId: "",
    employeeName: "",
    role: "",
    salary: "",
    date: "",
    status: "Pending",
  });

  /* ===== FETCH PAYROLL ===== */
  const fetchPayroll = async () => {
    try {
      const res = await axios.get("https://hr-management-backend-sable.vercel.app/api/payroll");
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to fetch payroll", err);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  /* ===== METRICS ===== */
  const metrics = {
    totalPayroll: `₹${records.reduce((a, b) => a + b.salary, 0)}`,
    pendingPayments: records.filter((r) => r.status === "Pending").length,
    processed: records.filter((r) => r.status === "Paid").length,
    avgSalary:
      records.length === 0
        ? "₹0"
        : `₹${Math.round(
            records.reduce((a, b) => a + b.salary, 0) / records.length
          )}`,
  };

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://hr-management-backend-sable.vercel.app/api/payroll", {
        ...formData,
        salary: Number(formData.salary),
      });

      setShowForm(false);
      fetchPayroll();

      setFormData({
        payrollId: "",
        employeeId: "",
        employeeName: "",
        role: "",
        salary: "",
        date: "",
        status: "Pending",
      });
    } catch (err) {
      console.error("Save payroll failed", err.response?.data || err);
    }
  };

  const cardClass = `p-6 rounded-xl shadow-md ${
    darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
  }`;

  return (
    <div
      className={`p-6 ml-64 mt-16 min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Payroll Management</h1>

      {/* ===== METRICS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Payroll" value={metrics.totalPayroll} icon={<DollarSign />} darkMode={darkMode} />
        <StatCard title="Pending Payments" value={metrics.pendingPayments} icon={<Clock />} darkMode={darkMode} />
        <StatCard title="Processed" value={metrics.processed} icon={<CheckCircle />} darkMode={darkMode} />
        <StatCard title="Average Salary" value={metrics.avgSalary} icon={<CreditCard />} darkMode={darkMode} />
      </div>

      {/* ===== TABLE ===== */}
      <div className={cardClass}>
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Payroll Records</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus size={16} /> Add Payroll
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Payroll ID</th>
              <th className="py-2">Employee</th>
              <th className="py-2">Role</th>
              <th className="py-2">Salary</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No payroll records
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r._id} className="border-b">
                  <td className="py-2">{r.payrollId}</td>
                  <td className="py-2">{r.employeeName}</td>
                  <td className="py-2">{r.role}</td>
                  <td className="py-2">₹{r.salary}</td>
                  <td className="py-2">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                  <td className="py-2">{r.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL FORM ===== */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Add Payroll</h2>
              <X onClick={() => setShowForm(false)} className="cursor-pointer" />
            </div>

            <input
              name="payrollId"
              value={formData.payrollId}
              onChange={handleChange}
              placeholder="Payroll ID (e.g. PAY-001)"
              className="w-full border p-2 mb-2"
            />

            <input
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Employee ID"
              className="w-full border p-2 mb-2"
            />

            <input
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              placeholder="Employee Name"
              className="w-full border p-2 mb-2"
            />

            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              className="w-full border p-2 mb-2"
            />

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="w-full border p-2 mb-2"
            />

            {/* ✅ CALENDAR */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Save Payroll
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, darkMode }) {
  return (
    <div className={`flex items-center p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="p-3 bg-gray-100 rounded-full mr-4">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
