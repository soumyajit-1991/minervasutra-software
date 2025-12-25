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
      LineChart,
      Line,
} from "recharts";
import { CheckCircle, XCircle, Clock, CalendarOff } from "lucide-react";
import { fetchAttendanceStats } from "../api/attendanceService";
import { useState, useEffect } from "react";

export default function Attendance() {
      const { darkMode } = useOutletContext();
      const [attendanceData, setAttendanceData] = useState({
            totalEmployees: 0,
            present: 0,
            absent: 0,
            late: 0,
            onLeave: 0,
            attendanceRate: 0,
            weeklyTrend: [],
            leaveDistribution: []
      });
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const loadAttendanceData = async () => {
                  try {
                        const stats = await fetchAttendanceStats();
                        setAttendanceData({
                              totalEmployees: stats.totalEmployees || 0,
                              present: stats.present || 0,
                              absent: stats.absent || 0,
                              late: stats.late || 0,
                              onLeave: stats.onLeave || 0,
                              attendanceRate: stats.attendanceRate || 0,
                              weeklyTrend: stats.weeklyTrend || [],
                              leaveDistribution: stats.leaveDistribution || []
                        });
                  } catch (error) {
                        console.error('Failed to load attendance data:', error);
                  } finally {
                        setLoading(false);
                  }
            };

            loadAttendanceData();
      }, []);

      const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <h1 className="text-2xl font-bold mb-6">Attendance Overview</h1>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="On Time / Present"
                              value={loading ? "..." : attendanceData.present}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Absent"
                              value={loading ? "..." : attendanceData.absent}
                              icon={<XCircle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Late Arrival"
                              value={loading ? "..." : attendanceData.late}
                              icon={<Clock size={24} className="text-yellow-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="On Leave"
                              value={loading ? "..." : attendanceData.onLeave}
                              icon={<CalendarOff size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Weekly Trend */}
                        <div className={`col-span-1 lg:col-span-2 ${cardClass}`}>
                              <h2 className="text-lg font-semibold mb-4">Weekly Attendance Trend</h2>
                              <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={attendanceData.weeklyTrend}>
                                          <XAxis dataKey="day" stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                                          <YAxis stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                                          <Tooltip
                                                contentStyle={{
                                                      backgroundColor: darkMode ? "#1f2937" : "#fff",
                                                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                                                      color: darkMode ? "#fff" : "#000",
                                                }}
                                          />
                                          <Legend />
                                          <Bar dataKey="present" fill="#22c55e" name="Present" stackId="a" />
                                          <Bar dataKey="late" fill="#eab308" name="Late" stackId="a" />
                                          <Bar dataKey="absent" fill="#ef4444" name="Absent" stackId="a" />
                                    </BarChart>
                              </ResponsiveContainer>
                        </div>

                        {/* Leave Distribution */}
                        <div className={`col-span-1 ${cardClass}`}>
                              <h2 className="text-lg font-semibold mb-4">Leave Distribution</h2>
                              <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                          <Pie
                                                data={attendanceData.leaveDistribution}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                          >
                                                {attendanceData.leaveDistribution.map((entry, index) => (
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
                  </div>

                  {/* Daily Logs Table */}
                  <div className={cardClass}>
                        <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-semibold">Today's Logs</h2>
                              <button className="text-blue-500 hover:underline text-sm">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                    <thead>
                                          <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                                <th className="py-2">Employee</th>
                                                <th className="py-2">Department</th>
                                                <th className="py-2">Check-in Time</th>
                                                <th className="py-2">Status</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          <tr>
                                                <td colSpan="4" className="py-8 text-center">
                                                      <p className="text-lg font-medium">No attendance logs available</p>
                                                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Today's attendance data will appear here</p>
                                                </td>
                                          </tr>
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
