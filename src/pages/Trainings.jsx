import { useOutletContext } from "react-router-dom";
import { GraduationCap, CheckCircle, Clock, Calendar, Plus, Users, MapPin, Video, Award } from "lucide-react";
import { trainingsData } from "../data/trainingsData";

export default function Trainings() {
      const { darkMode } = useOutletContext();
      const { metrics, trainings } = trainingsData;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <GraduationCap /> Trainings
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Create Training
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Trainings"
                              value={metrics.totalTrainings}
                              icon={<GraduationCap size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Ongoing"
                              value={metrics.ongoing}
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
                              title="Upcoming"
                              value={metrics.upcoming}
                              icon={<Calendar size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Trainings List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">All Trainings</h2>
                              <div className="flex gap-2">
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Status</option>
                                          <option>Upcoming</option>
                                          <option>Ongoing</option>
                                          <option>Completed</option>
                                    </select>
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Categories</option>
                                          <option>Clinical Skills</option>
                                          <option>Compliance</option>
                                          <option>Safety</option>
                                          <option>Leadership</option>
                                    </select>
                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {trainings.map((training) => (
                                    <div
                                          key={training.id}
                                          className={`p-4 transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                                    >
                                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                <div className="flex gap-4 items-start flex-1">
                                                      <img src={training.instructorAvatar} alt={training.instructor} className="w-12 h-12 rounded-full object-cover" />

                                                      <div className="flex-1">
                                                            <div className="flex items-start justify-between gap-2">
                                                                  <div>
                                                                        <h3 className="font-semibold text-base">{training.title}</h3>
                                                                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                              {training.id} • Instructor: {training.instructor}
                                                                        </p>
                                                                  </div>
                                                            </div>

                                                            {/* Description */}
                                                            <div className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                  {training.description}
                                                            </div>

                                                            {/* Training Details */}
                                                            <div className={`mt-3 p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                                                        <div>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Duration</p>
                                                                              <p className="font-medium">{training.duration} ({training.hours}h)</p>
                                                                        </div>
                                                                        <div>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Dates</p>
                                                                              <p className="font-medium text-xs">{training.startDate} to {training.endDate}</p>
                                                                        </div>
                                                                        <div>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Enrollment</p>
                                                                              <p className="font-medium">{training.enrolled}/{training.capacity}</p>
                                                                        </div>
                                                                        <div>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Mode</p>
                                                                              <p className="font-medium flex items-center gap-1">
                                                                                    {training.mode === 'Virtual' ? <Video size={12} /> : <MapPin size={12} />}
                                                                                    {training.mode}
                                                                              </p>
                                                                        </div>
                                                                  </div>
                                                            </div>

                                                            {/* Location */}
                                                            <div className="mt-3 flex items-center gap-2 text-sm">
                                                                  <MapPin size={14} className={darkMode ? "text-gray-400" : "text-gray-600"} />
                                                                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>{training.location}</span>
                                                            </div>

                                                            {/* Prerequisites */}
                                                            {training.prerequisites.length > 0 && (
                                                                  <div className="mt-3">
                                                                        <p className={`text-xs font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                              Prerequisites:
                                                                        </p>
                                                                        <div className="flex flex-wrap gap-2">
                                                                              {training.prerequisites.map((prereq, index) => (
                                                                                    <span
                                                                                          key={index}
                                                                                          className={`px-2 py-1 rounded text-xs ${darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"
                                                                                                }`}
                                                                                    >
                                                                                          {prereq}
                                                                                    </span>
                                                                              ))}
                                                                        </div>
                                                                  </div>
                                                            )}
                                                      </div>
                                                </div>

                                                <div className="flex flex-col gap-2 items-end min-w-[180px]">
                                                      {/* Status Badge */}
                                                      <div className={`px-3 py-2 rounded text-sm font-medium 
                                                            ${training.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                  training.status === 'Ongoing' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'}
                                                      `}>
                                                            {training.status}
                                                      </div>

                                                      {/* Category Badge */}
                                                      <div className={`px-3 py-1 rounded text-xs font-medium ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800"
                                                            }`}>
                                                            {training.category}
                                                      </div>

                                                      {/* Enrollment Progress */}
                                                      <div className="w-full mt-2">
                                                            <div className={`text-xs mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                  Enrollment: {Math.round((training.enrolled / training.capacity) * 100)}%
                                                            </div>
                                                            <div className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                                                                  <div
                                                                        className="h-full bg-blue-600 rounded-full"
                                                                        style={{ width: `${(training.enrolled / training.capacity) * 100}%` }}
                                                                  ></div>
                                                            </div>
                                                      </div>

                                                      <div className="flex gap-2 mt-2">
                                                            <button className={`text-xs px-3 py-1 rounded ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                                                                  } transition-colors`}>
                                                                  Enroll
                                                            </button>
                                                            <button className={`text-xs px-3 py-1 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                                                                  } text-white transition-colors`}>
                                                                  Details
                                                            </button>
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
