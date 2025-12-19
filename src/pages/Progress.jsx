import { useOutletContext } from "react-router-dom";
import { BarChart2, CheckCircle, Clock, AlertTriangle, Calendar, Plus, Target, TrendingUp, Award } from "lucide-react";
import { progressData } from "../data/progressData";

export default function Progress() {
      const { darkMode } = useOutletContext();
      const { metrics, employees } = progressData;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <BarChart2 /> Progress Tracking
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Set New Goal
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Employees"
                              value={metrics.totalEmployees}
                              icon={<BarChart2 size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="On Track"
                              value={metrics.onTrack}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Needs Attention"
                              value={metrics.needsAttention}
                              icon={<Clock size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="At Risk"
                              value={metrics.atRisk}
                              icon={<AlertTriangle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Progress List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">Employee Progress</h2>
                              <div className="flex gap-2">
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Status</option>
                                          <option>On Track</option>
                                          <option>Needs Attention</option>
                                          <option>At Risk</option>
                                    </select>
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Departments</option>
                                          <option>Pharmacy Operations</option>
                                          <option>Human Resources</option>
                                          <option>Clinical Services</option>
                                    </select>
                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {employees.map((employee) => (
                                    <div
                                          key={employee.id}
                                          className={`p-4 transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                                    >
                                          <div className="flex flex-col gap-4">
                                                {/* Employee Header */}
                                                <div className="flex items-start justify-between">
                                                      <div className="flex gap-4 items-start">
                                                            <img src={employee.employeeAvatar} alt={employee.employeeName} className="w-12 h-12 rounded-full object-cover" />
                                                            <div>
                                                                  <h3 className="font-semibold text-base">{employee.employeeName}</h3>
                                                                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                        {employee.id} • {employee.position}
                                                                  </p>
                                                                  <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                        {employee.department}
                                                                  </p>
                                                            </div>
                                                      </div>

                                                      <div className="flex flex-col gap-2 items-end">
                                                            <div className={`px-3 py-1 rounded text-sm font-medium ${employee.status === 'On Track' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                        employee.status === 'Needs Attention' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                                                                  }`}>
                                                                  {employee.status}
                                                            </div>
                                                      </div>
                                                </div>

                                                {/* Overall Progress */}
                                                <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                                      <div className="flex justify-between items-center mb-2">
                                                            <span className={`text-sm font-medium flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                  <TrendingUp size={16} />
                                                                  Overall Progress
                                                            </span>
                                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                                                  {employee.overallProgress}%
                                                            </span>
                                                      </div>
                                                      <div className={`w-full h-3 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                                                            <div
                                                                  className={`h-full rounded-full ${employee.status === 'On Track' ? 'bg-green-500' :
                                                                              employee.status === 'Needs Attention' ? 'bg-orange-500' :
                                                                                    'bg-red-500'
                                                                        }`}
                                                                  style={{ width: `${employee.overallProgress}%` }}
                                                            ></div>
                                                      </div>
                                                </div>

                                                {/* Goals List */}
                                                <div className="space-y-3">
                                                      <h4 className={`text-sm font-semibold flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                            <Target size={16} />
                                                            Active Goals
                                                      </h4>
                                                      {employee.goals.map((goal, index) => (
                                                            <div
                                                                  key={index}
                                                                  className={`p-3 rounded-lg border ${darkMode ? "bg-gray-750 border-gray-600" : "bg-white border-gray-200"
                                                                        }`}
                                                            >
                                                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                                                        <div className="flex-1">
                                                                              <div className="flex items-center gap-2 mb-2">
                                                                                    <h5 className="font-semibold text-sm">{goal.name}</h5>
                                                                                    <span className={`px-2 py-0.5 rounded text-xs ${darkMode ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-800"
                                                                                          }`}>
                                                                                          {goal.category}
                                                                                    </span>
                                                                              </div>

                                                                              <div className="flex items-center gap-2 text-xs mb-2">
                                                                                    <Calendar size={12} className={darkMode ? "text-gray-500" : "text-gray-400"} />
                                                                                    <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                                                                                          Due: {goal.dueDate}
                                                                                    </span>
                                                                              </div>

                                                                              <div className="flex items-center gap-2">
                                                                                    <div className={`flex-1 h-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                                                                                          <div
                                                                                                className={`h-full rounded-full ${goal.status === 'On Track' ? 'bg-green-500' :
                                                                                                            goal.status === 'Needs Attention' ? 'bg-orange-500' :
                                                                                                                  'bg-red-500'
                                                                                                      }`}
                                                                                                style={{ width: `${goal.progress}%` }}
                                                                                          ></div>
                                                                                    </div>
                                                                                    <span className="text-xs font-semibold min-w-[45px] text-right">
                                                                                          {goal.progress}%
                                                                                    </span>
                                                                              </div>
                                                                        </div>

                                                                        <div className={`px-2 py-1 rounded text-xs font-medium ${goal.status === 'On Track' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                                    goal.status === 'Needs Attention' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                                                                              }`}>
                                                                              {goal.status}
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>

                                                {/* Recent Achievements */}
                                                {employee.recentAchievements.length > 0 && (
                                                      <div className={`p-3 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                                                            <h4 className={`text-sm font-semibold flex items-center gap-2 mb-2 ${darkMode ? "text-green-300" : "text-green-800"}`}>
                                                                  <Award size={16} />
                                                                  Recent Achievements
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                  {employee.recentAchievements.map((achievement, idx) => (
                                                                        <span
                                                                              key={idx}
                                                                              className={`px-2 py-1 rounded text-xs ${darkMode ? "bg-green-800/30 text-green-200" : "bg-green-100 text-green-800"
                                                                                    }`}
                                                                        >
                                                                              ✓ {achievement}
                                                                        </span>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                )}
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
