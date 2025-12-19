import { useOutletContext } from "react-router-dom";
import {
      ResponsiveContainer,
      BarChart,
      Bar,
      XAxis,
      YAxis,
      Tooltip,
      Legend,
      PieChart,
      Pie,
      Cell,
} from "recharts";
import { Users, Briefcase, TrendingUp, UserMinus, UserPlus } from "lucide-react";
import { headcountData } from "../data/headcountData";

export default function Headcount() {
      const { darkMode } = useOutletContext();
      const { metrics, departmentDist, trends, recentActivity } = headcountData;

      const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <h1 className="text-2xl font-bold mb-6">Headcount Dashboard</h1>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Employees"
                              value={metrics.totalEmployees}
                              icon={<Users size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Active Employees"
                              value={metrics.activeEmployees}
                              icon={<Briefcase size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Attrition Rate"
                              value={`${metrics.attritionRate}%`}
                              icon={<UserMinus size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Hiring Rate"
                              value={`${metrics.hiringRate}%`}
                              icon={<UserPlus size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Department Distribution */}
                        <div className={cardClass}>
                              <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
                              <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                          <Pie
                                                data={departmentDist}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="count"
                                          >
                                                {departmentDist.map((entry, index) => (
                                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                          </Pie>
                                          <Tooltip
                                                contentStyle={{
                                                      backgroundColor: darkMode ? "#1f2937" : "#fff",
                                                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                                                      color: darkMode ? "#fff" : "#000",
                                                }}
                                          />
                                          <Legend />
                                    </PieChart>
                              </ResponsiveContainer>
                        </div>

                        {/* Headcount Trends */}
                        <div className={cardClass}>
                              <h2 className="text-lg font-semibold mb-4">Headcount Trends (2024)</h2>
                              <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={trends}>
                                          <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                                          <YAxis stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                                          <Tooltip
                                                contentStyle={{
                                                      backgroundColor: darkMode ? "#1f2937" : "#fff",
                                                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                                                      color: darkMode ? "#fff" : "#000",
                                                }}
                                          />
                                          <Legend />
                                          <Bar dataKey="headcount" fill="#3b82f6" name="Total Headcount" />
                                          <Bar dataKey="hired" fill="#22c55e" name="Hired" />
                                          <Bar dataKey="left" fill="#ef4444" name="Left" />
                                    </BarChart>
                              </ResponsiveContainer>
                        </div>
                  </div>

                  {/* Recent Activity Table */}
                  <div className={cardClass}>
                        <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-semibold">Recent Activity</h2>
                              <button className="text-blue-500 hover:underline text-sm">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                    <thead>
                                          <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                                <th className="py-2">Name</th>
                                                <th className="py-2">Role</th>
                                                <th className="py-2">Department</th>
                                                <th className="py-2">Date</th>
                                                <th className="py-2">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {recentActivity.map((item) => (
                                                <tr
                                                      key={item.id}
                                                      className={`border-b last:border-0 ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"
                                                            }`}
                                                >
                                                      <td className="py-3">{item.name}</td>
                                                      <td className="py-3">{item.role}</td>
                                                      <td className="py-3">{item.department}</td>
                                                      <td className="py-3">{item.date}</td>
                                                      <td className="py-3">
                                                            <span
                                                                  className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "success"
                                                                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                              : item.status === "error"
                                                                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                                        }`}
                                                            >
                                                                  {item.action}
                                                            </span>
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
