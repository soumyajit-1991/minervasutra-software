import { useOutletContext } from "react-router-dom";
import { BarChart2, CheckCircle, Clock, AlertTriangle, Calendar, Plus, Target, TrendingUp, Award } from "lucide-react";
import { useState, useEffect } from "react";

export default function Progress() {
      const { darkMode } = useOutletContext();
      const [employees, setEmployees] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            setLoading(false);
      }, []);

      const handleSetNewGoal = () => {
            alert('Goal setting functionality - implement goal creation form here');
      };

      const metrics = {
            totalEmployees: employees.length,
            onTrack: employees.filter(e => e.status === 'On Track').length,
            needsAttention: employees.filter(e => e.status === 'Needs Attention').length,
            atRisk: employees.filter(e => e.status === 'At Risk').length
      };

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <BarChart2 /> Progress Tracking
                        </h1>
                        <button 
                              onClick={handleSetNewGoal}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
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

                        <div className="p-8 text-center">
                              <BarChart2 size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                              <p className="text-lg font-medium">No progress data available</p>
                              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Employee progress tracking will appear here</p>
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