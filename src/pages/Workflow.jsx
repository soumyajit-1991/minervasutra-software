import { useOutletContext } from "react-router-dom";
import { GitMerge, Clock, CheckCircle, AlertCircle, Calendar, Plus } from "lucide-react";

export default function Workflow() {
      const { darkMode } = useOutletContext();
      
      // No workflow data available
      const metrics = {
            active: 0,
            completed: 0,
            delayed: 0,
            avgCompletionTime: "0 days"
      };
      const workflows = [];

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <GitMerge /> Workflows & Approvals
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> New Workflow
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Active Workflows"
                              value={metrics.active}
                              icon={<GitMerge size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Completed (This Month)"
                              value={metrics.completed}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Delayed"
                              value={metrics.delayed}
                              icon={<AlertCircle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Avg. Completion Time"
                              value={metrics.avgCompletionTime}
                              icon={<Clock size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Workflow List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">Active Processes</h2>
                              <div className="flex gap-2">
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Statuses</option>
                                          <option>In Progress</option>
                                          <option>Delayed</option>
                                          <option>Completed</option>
                                    </select>
                              </div>
                        </div>

                        <div className="p-8 text-center">
                              <GitMerge size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                              <p className="text-lg font-medium">No workflows available</p>
                              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Workflow management feature coming soon</p>
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
