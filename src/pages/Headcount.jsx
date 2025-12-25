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
import { useEmployees } from "../context/EmployeeContext";

export default function Headcount() {
      const { darkMode } = useOutletContext();
      const { employees, loading } = useEmployees();
      
      // Calculate metrics from real employee data
      const metrics = {
            totalEmployees: employees.length,
            activeEmployees: employees.length,
            attritionRate: 0,
            hiringRate: 0
      };
      
      // Calculate department distribution
      const departmentDist = employees.reduce((acc, emp) => {
            const dept = emp.department || 'Unknown';
            const existing = acc.find(d => d.name === dept);
            if (existing) {
                  existing.count++;
            } else {
                  acc.push({ name: dept, count: 1, color: getRandomColor() });
            }
            return acc;
      }, []);
      
      const trends = [];
      const recentActivity = [];
      
      function getRandomColor() {
            const colors = ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4'];
            return colors[Math.floor(Math.random() * colors.length)];
      }

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
                              {departmentDist.length > 0 ? (
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
                              ) : (
                                    <div className="flex items-center justify-center h-[300px]">
                                          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>No department data available</p>
                                    </div>
                              )}
                        </div>

                        {/* Headcount Trends */}
                        <div className={cardClass}>
                              <h2 className="text-lg font-semibold mb-4">Headcount Trends (2024)</h2>
                              <div className="flex items-center justify-center h-[300px]">
                                    <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>No trend data available</p>
                              </div>
                        </div>
                  </div>

                  {/* Recent Activity Table */}
                  <div className={cardClass}>
                        <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-semibold">Recent Activity</h2>
                        </div>
                        <div className="text-center py-8">
                              <Users size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                              <p className="text-lg font-medium">No recent activity</p>
                              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Employee activities will appear here</p>
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
