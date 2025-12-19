import { useOutletContext } from "react-router-dom";
import { Map, CheckCircle, Clock, XCircle, Calendar, Plus, TrendingUp, Target } from "lucide-react";
import { skillRoadmapData } from "../data/skillRoadmapData";

export default function SkillRoadmap() {
      const { darkMode } = useOutletContext();
      const { metrics, roadmaps } = skillRoadmapData;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <Map /> Skill Roadmap
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Create Roadmap
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Skills"
                              value={metrics.totalSkills}
                              icon={<Map size={24} className="text-blue-500" />}
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
                              title="Not Started"
                              value={metrics.notStarted}
                              icon={<XCircle size={24} className="text-gray-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Roadmaps List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">Employee Skill Roadmaps</h2>
                              <div className="flex gap-2">
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Departments</option>
                                          <option>Pharmacy Operations</option>
                                          <option>Human Resources</option>
                                          <option>Clinical Services</option>
                                    </select>
                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {roadmaps.map((roadmap) => (
                                    <div
                                          key={roadmap.id}
                                          className={`p-4 transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                                    >
                                          <div className="flex flex-col gap-4">
                                                {/* Employee Header */}
                                                <div className="flex items-start justify-between">
                                                      <div className="flex gap-4 items-start">
                                                            <img src={roadmap.employeeAvatar} alt={roadmap.employeeName} className="w-12 h-12 rounded-full object-cover" />
                                                            <div>
                                                                  <h3 className="font-semibold text-base">{roadmap.employeeName}</h3>
                                                                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                        {roadmap.id} • {roadmap.position}
                                                                  </p>
                                                                  <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                        {roadmap.department}
                                                                  </p>
                                                            </div>
                                                      </div>

                                                      <div className="flex flex-col gap-2 items-end">
                                                            <div className="flex items-center gap-2">
                                                                  <span className={`px-3 py-1 rounded text-xs font-medium ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800"
                                                                        }`}>
                                                                        Current: {roadmap.currentLevel}
                                                                  </span>
                                                                  <TrendingUp size={16} className="text-green-500" />
                                                                  <span className={`px-3 py-1 rounded text-xs font-medium ${darkMode ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-800"
                                                                        }`}>
                                                                        Target: {roadmap.targetLevel}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>

                                                {/* Overall Progress */}
                                                <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                                      <div className="flex justify-between items-center mb-2">
                                                            <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                  Overall Progress
                                                            </span>
                                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                                                  {roadmap.completionPercentage}%
                                                            </span>
                                                      </div>
                                                      <div className={`w-full h-3 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                                                            <div
                                                                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                                                  style={{ width: `${roadmap.completionPercentage}%` }}
                                                            ></div>
                                                      </div>
                                                </div>

                                                {/* Skills List */}
                                                <div className="space-y-3">
                                                      <h4 className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                            Skills Development
                                                      </h4>
                                                      {roadmap.skills.map((skill, index) => (
                                                            <div
                                                                  key={index}
                                                                  className={`p-3 rounded-lg border ${darkMode ? "bg-gray-750 border-gray-600" : "bg-white border-gray-200"
                                                                        }`}
                                                            >
                                                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                                                        <div className="flex-1">
                                                                              <div className="flex items-center gap-2 mb-2">
                                                                                    <h5 className="font-semibold text-sm">{skill.name}</h5>
                                                                                    <span className={`px-2 py-0.5 rounded text-xs ${darkMode ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-800"
                                                                                          }`}>
                                                                                          {skill.category}
                                                                                    </span>
                                                                              </div>

                                                                              <div className="flex items-center gap-2 text-xs mb-2">
                                                                                    <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                                                                                          {skill.currentLevel} → {skill.targetLevel}
                                                                                    </span>
                                                                                    <span className={darkMode ? "text-gray-500" : "text-gray-400"}>•</span>
                                                                                    <Calendar size={12} className={darkMode ? "text-gray-500" : "text-gray-400"} />
                                                                                    <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                                                                                          Due: {skill.dueDate}
                                                                                    </span>
                                                                              </div>

                                                                              {/* Milestones */}
                                                                              <div className="flex flex-wrap gap-1 mt-2">
                                                                                    {skill.milestones.map((milestone, idx) => (
                                                                                          <span
                                                                                                key={idx}
                                                                                                className={`px-2 py-0.5 rounded text-xs ${darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-100 text-gray-700"
                                                                                                      }`}
                                                                                          >
                                                                                                <Target size={10} className="inline mr-1" />
                                                                                                {milestone}
                                                                                          </span>
                                                                                    ))}
                                                                              </div>
                                                                        </div>

                                                                        <div className="flex flex-col gap-2 min-w-[140px]">
                                                                              <div className={`px-3 py-1 rounded text-xs font-medium text-center ${skill.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                                          skill.status === 'In Progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                                                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
                                                                                    }`}>
                                                                                    {skill.status}
                                                                              </div>

                                                                              <div className="text-xs text-center font-semibold text-blue-600 dark:text-blue-400">
                                                                                    {skill.progress}%
                                                                              </div>

                                                                              <div className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                                                                                    <div
                                                                                          className={`h-full rounded-full ${skill.status === 'Completed' ? 'bg-green-500' :
                                                                                                      skill.status === 'In Progress' ? 'bg-orange-500' :
                                                                                                            'bg-gray-400'
                                                                                                }`}
                                                                                          style={{ width: `${skill.progress}%` }}
                                                                                    ></div>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))}
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
