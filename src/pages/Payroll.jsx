import { useOutletContext } from "react-router-dom";
import { DollarSign, Clock, CheckCircle, CreditCard, Download } from "lucide-react";
import { payrollData } from "../data/payrollData";

export default function Payroll() {
      const { darkMode } = useOutletContext();
      const { metrics, records } = payrollData;

      const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <h1 className="text-2xl font-bold mb-6">Payroll Management</h1>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Payroll"
                              value={metrics.totalPayroll}
                              icon={<DollarSign size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Pending Payments"
                              value={metrics.pendingPayments}
                              icon={<Clock size={24} className="text-yellow-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Processed"
                              value={metrics.processed}
                              icon={<CheckCircle size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Average Salary"
                              value={metrics.avgSalary}
                              icon={<CreditCard size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Payroll Records Table */}
                  <div className={cardClass}>
                        <div className="flex justify-between items-center mb-6">
                              <h2 className="text-lg font-semibold">Payroll Records (Nov 2024)</h2>
                              <div className="flex gap-2">
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition transition-colors flex items-center gap-2">
                                          <Download size={16} /> Export CSV
                                    </button>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition transition-colors">
                                          Process Payroll
                                    </button>
                              </div>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                    <thead>
                                          <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                                <th className="py-3 px-2">ID</th>
                                                <th className="py-3 px-2">Employee</th>
                                                <th className="py-3 px-2">Role</th>
                                                <th className="py-3 px-2">Salary</th>
                                                <th className="py-3 px-2">Date</th>
                                                <th className="py-3 px-2">Status</th>
                                                <th className="py-3 px-2">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {records.map((record) => (
                                                <tr
                                                      key={record.id}
                                                      className={`border-b last:border-0 transition-colors ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"
                                                            }`}
                                                >
                                                      <td className="py-3 px-2 text-sm">{record.id}</td>
                                                      <td className="py-3 px-2 font-medium">{record.employee}</td>
                                                      <td className="py-3 px-2 text-sm">{record.role}</td>
                                                      <td className="py-3 px-2 font-semibold">{record.salary}</td>
                                                      <td className="py-3 px-2 text-sm">{record.date}</td>
                                                      <td className="py-3 px-2">
                                                            <span
                                                                  className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === "Paid"
                                                                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                              : record.status === "Pending"
                                                                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                                        }`}
                                                            >
                                                                  {record.status}
                                                            </span>
                                                      </td>
                                                      <td className="py-3 px-2">
                                                            <button
                                                                  className={`text-sm hover:underline ${darkMode ? "text-blue-400" : "text-blue-600"
                                                                        }`}
                                                            >
                                                                  View Slip
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
}

function StatCard({ title, value, icon, darkMode }) {
      return (
            <div
                  className={`flex items-center p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"
                        }`}
            >
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">{icon}</div>
                  <div>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
                        <h3 className="text-xl font-bold">{value}</h3>
                  </div>
            </div>
      );
}
