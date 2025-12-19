import { useOutletContext } from "react-router-dom";
import { ListTodo, Clock, CheckCircle, AlertCircle, Calendar, Plus, Tag } from "lucide-react";
import { taskManagementData } from "../data/taskManagementData";

export default function TaskManagement() {
      const { darkMode } = useOutletContext();
      const { metrics, tasks } = taskManagementData;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <ListTodo /> Task Management
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Create Task
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Tasks"
                              value={metrics.total}
                              icon={<ListTodo size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="In Progress"
                              value={metrics.inProgress}
                              icon={<Clock size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Completed"
                              value={metrics.completed}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Overdue"
                              value={metrics.overdue}
                              icon={<AlertCircle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Task List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">All Tasks</h2>
                              <div className="flex gap-2">
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Status</option>
                                          <option>In Progress</option>
                                          <option>Pending</option>
                                          <option>Completed</option>
                                          <option>Overdue</option>
                                    </select>
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Priority</option>
                                          <option>Critical</option>
                                          <option>High</option>
                                          <option>Medium</option>
                                    </select>
                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {tasks.map((task) => (
                                    <div
                                          key={task.id}
                                          className={`p-4 transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                                    >
                                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex gap-4 items-start flex-1">
                                                      <img src={task.avatar} alt={task.assignedTo} className="w-10 h-10 rounded-full object-cover" />
                                                      <div className="flex-1">
                                                            <div className="flex items-start justify-between gap-2">
                                                                  <div>
                                                                        <h3 className="font-semibold text-sm md:text-base">{task.title}</h3>
                                                                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                              Assigned to {task.assignedTo} • {task.id}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                            <p className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                                  {task.description}
                                                            </p>

                                                            {/* Progress Bar */}
                                                            <div className="mt-3">
                                                                  <div className="flex justify-between text-xs mb-1">
                                                                        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Progress</span>
                                                                        <span className="font-medium">{task.progress}%</span>
                                                                  </div>
                                                                  <div className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                                                                        <div
                                                                              className={`h-full rounded-full ${task.status === 'Completed' ? 'bg-green-500' :
                                                                                          task.status === 'Overdue' ? 'bg-red-500' :
                                                                                                task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-400'
                                                                                    }`}
                                                                              style={{ width: `${task.progress}%` }}
                                                                        ></div>
                                                                  </div>
                                                            </div>

                                                            {/* Tags */}
                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                  {task.tags.map((tag, index) => (
                                                                        <span
                                                                              key={index}
                                                                              className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                                                                                    }`}
                                                                        >
                                                                              <Tag size={12} />
                                                                              {tag}
                                                                        </span>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="flex flex-col gap-2 items-end min-w-[180px]">
                                                      <div className="flex gap-2 flex-wrap justify-end">
                                                            <div className={`px-2 py-1 rounded text-xs font-medium 
                                                                  ${task.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                                                                              task.status === 'Overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                                                                                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'}
                                                            `}>
                                                                  {task.status}
                                                            </div>
                                                            <div className={`px-2 py-1 rounded text-xs font-medium 
                                                                  ${task.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                                                                        task.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}
                                                            `}>
                                                                  {task.priority}
                                                            </div>
                                                      </div>
                                                      <div className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                            <Calendar size={14} />
                                                            <span>Due: {task.dueDate}</span>
                                                      </div>
                                                      <span className={`px-2 py-1 rounded text-xs ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                                                            {task.category}
                                                      </span>
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
