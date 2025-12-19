import { useOutletContext } from "react-router-dom";
import { TableProperties, Clock, CheckCircle, AlertCircle, Calendar, Plus } from "lucide-react";
import { timeSheetData } from "../data/timeSheetData";


export default function TimeSheet() {
      const { darkMode } = useOutletContext();
      const { metrics, employees } = timeSheetData;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <TableProperties /> Time Sheet
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Add Entry
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Hours (This Week)"
                              value={metrics.totalHours}
                              icon={<Clock size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Regular Hours"
                              value={metrics.regularHours}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Overtime Hours"
                              value={metrics.overtimeHours}
                              icon={<AlertCircle size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Pending Approvals"
                              value={metrics.pendingApprovals}
                              icon={<Calendar size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Time Sheet Table */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">Weekly Time Sheet</h2>
                              <div className="flex gap-2">
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>Current Week</option>
                                          <option>Last Week</option>
                                          <option>Last Month</option>
                                    </select>
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Departments</option>
                                          <option>Pharmacy Operations</option>
                                          <option>Human Resources</option>
                                          <option>Clinical Services</option>
                                    </select>
                              </div>
                        </div>

                        <div className="overflow-x-auto">
                              {employees.map((employee) => (
                                    <div key={employee.id} className={`p-4 border-b dark:border-gray-700 ${darkMode ? "hover:bg-gray-750" : "hover:bg-gray-50"} transition-colors`}>
                                          {/* Employee Header */}
                                          <div className="flex items-center justify-between mb-4">
                                                <div className="flex gap-3 items-center">
                                                      <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full object-cover" />
                                                      <div>
                                                            <h3 className="font-semibold">{employee.name}</h3>
                                                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                  {employee.position} • {employee.department}
                                                            </p>
                                                      </div>
                                                </div>
                                                <div className="flex gap-4 text-sm">
                                                      <div className="text-center">
                                                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total</p>
                                                            <p className="font-bold text-blue-600 dark:text-blue-400">{employee.totalHours}h</p>
                                                      </div>
                                                      <div className="text-center">
                                                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Regular</p>
                                                            <p className="font-bold text-green-600 dark:text-green-400">{employee.regularHours}h</p>
                                                      </div>
                                                      <div className="text-center">
                                                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Overtime</p>
                                                            <p className="font-bold text-orange-600 dark:text-orange-400">{employee.overtimeHours}h</p>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Week Grid */}
                                          <div className="grid grid-cols-5 gap-2">
                                                {employee.weekData.map((day, index) => (
                                                      <div
                                                            key={index}
                                                            className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"
                                                                  }`}
                                                      >
                                                            <div className="flex justify-between items-start mb-2">
                                                                  <div>
                                                                        <p className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                              {day.day}
                                                                        </p>
                                                                        <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                                              {day.date}
                                                                        </p>
                                                                  </div>
                                                                  <div className={`px-2 py-0.5 rounded text-xs font-medium ${day.status === 'Approved'
                                                                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                                                                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200'
                                                                        }`}>
                                                                        {day.status}
                                                                  </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                  <div className="flex items-center justify-between text-sm">
                                                                        <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Hours:</span>
                                                                        <span className="font-semibold">{day.hours}h</span>
                                                                  </div>
                                                                  {day.overtime > 0 && (
                                                                        <div className="flex items-center justify-between text-xs">
                                                                              <span className="text-orange-600 dark:text-orange-400">OT:</span>
                                                                              <span className="font-semibold text-orange-600 dark:text-orange-400">+{day.overtime}h</span>
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              ))}
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
