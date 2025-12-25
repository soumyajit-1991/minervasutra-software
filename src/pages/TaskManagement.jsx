import { useOutletContext } from "react-router-dom";
import { ListTodo, Clock, CheckCircle, AlertCircle, Calendar, Plus, Tag, X } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchTasks, createTask, deleteTask } from "../api/taskService";

export default function TaskManagement() {
      const { darkMode } = useOutletContext();
      const [tasks, setTasks] = useState([]);
      const [loading, setLoading] = useState(true);

      const [showModal, setShowModal] = useState(false);
      const [formData, setFormData] = useState({
            title: '',
            description: '',
            assignedTo: '',
            priority: 'Medium',
            dueDate: '',
            category: 'General'
      });

      useEffect(() => {
            loadTasks();
      }, []);

      const loadTasks = async () => {
            try {
                  const data = await fetchTasks();
                  setTasks(data);
            } catch (error) {
                  console.error('Failed to load tasks:', error);
            } finally {
                  setLoading(false);
            }
      };

      const metrics = {
            total: tasks.length,
            inProgress: tasks.filter(t => t.status === 'In Progress').length,
            completed: tasks.filter(t => t.status === 'Completed').length,
            overdue: tasks.filter(t => t.status === 'Overdue').length
      };

      const handleCreateTask = () => {
            setShowModal(true);
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await createTask(formData);
                  setShowModal(false);
                  setFormData({ title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '', category: 'General' });
                  loadTasks();
            } catch (error) {
                  alert('Failed to create task: ' + error.message);
            }
      };

      const handleDelete = async (id) => {
            if (window.confirm('Delete this task?')) {
                  try {
                        await deleteTask(id);
                        loadTasks();
                  } catch (error) {
                        alert('Failed to delete task: ' + error.message);
                  }
            }
      };

      if (loading) {
            return (
                  <div className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                        <div className="text-center py-12">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                              <p className="mt-4">Loading tasks...</p>
                        </div>
                  </div>
            );
      }

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <ListTodo /> Task Management
                        </h1>
                        <button 
                              onClick={handleCreateTask}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
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
                              {tasks.length === 0 ? (
                                    <div className="p-8 text-center">
                                          <ListTodo size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                                          <p className="text-lg font-medium">No tasks available</p>
                                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Create your first task to get started</p>
                                    </div>
                              ) : (
                                    tasks.map((task) => (
                                          <div key={task._id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                                                <div className="flex justify-between items-start">
                                                      <div className="flex-1">
                                                            <h3 className="font-semibold">{task.title}</h3>
                                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>{task.description}</p>
                                                            <div className="flex items-center gap-4 mt-2 text-xs">
                                                                  <span>Assigned: {task.assignedTo}</span>
                                                                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                                                  <span className={`px-2 py-1 rounded ${task.priority === 'Critical' ? 'bg-red-100 text-red-800' : task.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                                                                        {task.priority}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                      <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:text-red-700 p-1">
                                                            <X size={16} />
                                                      </button>
                                                </div>
                                          </div>
                                    ))
                              )}
                        </div>
                  </div>

                  {/* Modal */}
                  {showModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                              <div className={`w-full max-w-md p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                    <h2 className="text-lg font-bold mb-4">Create New Task</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                          <input
                                                type="text"
                                                placeholder="Task Title"
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <textarea
                                                placeholder="Description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                rows={3}
                                                required
                                          />
                                          <input
                                                type="text"
                                                placeholder="Assigned To"
                                                value={formData.assignedTo}
                                                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <select
                                                value={formData.priority}
                                                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                          >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                                <option value="Critical">Critical</option>
                                          </select>
                                          <input
                                                type="date"
                                                value={formData.dueDate}
                                                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <div className="flex gap-2">
                                                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                                      Create Task
                                                </button>
                                                <button type="button" onClick={() => setShowModal(false)} className={`flex-1 py-2 rounded ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}>
                                                      Cancel
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  )}
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