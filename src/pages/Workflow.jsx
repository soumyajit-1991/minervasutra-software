import { useOutletContext } from "react-router-dom";
import { GitMerge, Clock, CheckCircle, AlertCircle, Calendar, Plus } from "lucide-react";
import { workflowData } from "../data/workflowData";

export default function Workflow() {
      const { darkMode } = useOutletContext();
      const { metrics, workflows } = workflowData;

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

                        <div className="divide-y dark:divide-gray-700">
                              {workflows.map((wf) => (
                                    <div key={wf.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex gap-4 items-start">
                                                      <img src={wf.avatar} alt={wf.initiator} className="w-10 h-10 rounded-full object-cover" />
                                                      <div>
                                                            <h3 className="font-semibold text-sm md:text-base">{wf.name}</h3>
                                                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                  Initiated by {wf.initiator} • {wf.id}
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex-1 md:px-8">
                                                      <div className="flex justify-between text-xs mb-1">
                                                            <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{wf.currentStage}</span>
                                                            <span className="font-medium">{wf.progress}%</span>
                                                      </div>
                                                      <div className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                                                            <div
                                                                  className={`h-full rounded-full ${wf.status === 'Completed' ? 'bg-green-500' :
                                                                              wf.status === 'Delayed' ? 'bg-red-500' : 'bg-blue-500'
                                                                        }`}
                                                                  style={{ width: `${wf.progress}%` }}
                                                            ></div>
                                                      </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm justify-between md:justify-end min-w-[200px]">
                                                      <div className={`px-2 py-1 rounded text-xs font-medium 
                                  ${wf.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                                                                  wf.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}
                              `}>
                                                            {wf.priority}
                                                      </div>
                                                      <div className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                            <Calendar size={14} />
                                                            <span>Due {wf.dueDate}</span>
                                                      </div>
                                                </div>
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
