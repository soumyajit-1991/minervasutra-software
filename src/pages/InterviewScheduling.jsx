import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { CalendarCheck, Clock, CheckCircle, XCircle, Calendar, Plus, MapPin, Video, Phone, Users, User } from "lucide-react";
import { fetchInterviews, deleteInterview } from "../api/interviewService";

export default function InterviewScheduling() {
      const { darkMode } = useOutletContext();
      const [interviews, setInterviews] = useState([]);
      const [loading, setLoading] = useState(true);
      const [filterStatus, setFilterStatus] = useState("All Status");

      useEffect(() => {
            fetchInterviews()
                  .then(setInterviews)
                  .catch(err => console.error("Failed to fetch interviews", err))
                  .finally(() => setLoading(false));
      }, []);

      const filteredInterviews = interviews.filter(interview => {
            if (filterStatus === "All Status") return true;
            return interview.status === filterStatus;
      });

      const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this interview?")) {
                  try {
                        await deleteInterview(id);
                        setInterviews(interviews.filter(i => i.id !== id));
                  } catch (err) {
                        alert("Failed to delete interview");
                  }
            }
      };

      const metrics = useMemo(() => {
            const today = new Date().toISOString().split('T')[0];
            const startOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            const endOfWeek = new Date();
            endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

            return {
                  scheduled: interviews.filter(i => i.status === 'Scheduled').length,
                  completed: interviews.filter(i => i.status === 'Completed').length,
                  upcoming: interviews.filter(i => {
                        const iDate = new Date(i.date);
                        return i.status === 'Scheduled' && iDate >= new Date() && iDate <= endOfWeek;
                  }).length,
                  cancelled: interviews.filter(i => i.status === 'Cancelled').length
            };
      }, [interviews]);

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <CalendarCheck /> Interview Scheduling
                        </h1>
                        <Link to="/add-interview" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Schedule Interview
                        </Link>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Scheduled Interviews"
                              value={metrics.scheduled}
                              icon={<CalendarCheck size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Completed"
                              value={metrics.completed}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        {/* <StatCard
                              title="Upcoming (This Week)"
                              value={metrics.upcoming}
                              icon={<Clock size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        /> */}
                        <StatCard
                              title="Cancelled"
                              value={metrics.cancelled}
                              icon={<XCircle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Interviews List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">All Interviews</h2>
                              <div className="flex gap-2">
                                    <select
                                          value={filterStatus}
                                          onChange={(e) => setFilterStatus(e.target.value)}
                                          className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
                                    >
                                          <option>All Status</option>
                                          <option>Scheduled</option>
                                          <option>Completed</option>
                                          <option>Cancelled</option>
                                    </select>
                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {filteredInterviews.length === 0 && !loading ? (
                                    <div className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          {filterStatus === "All Status" ? "No interviews scheduled. Click \"Schedule Interview\" to add one." : `No interviews found with status "${filterStatus}".`}
                                    </div>
                              ) : (
                                    filteredInterviews.map((interview) => (
                                          <div
                                                key={interview.id}
                                                className={`p-4 transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                                          >
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                      <div className="flex gap-4 items-start flex-1">
                                                            {/* Candidate Info */}
                                                            <div className="flex gap-2">
                                                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
                                                                        <User size={20} />
                                                                  </div>
                                                            </div>

                                                            <div className="flex-1">
                                                                  <div className="flex items-start justify-between gap-2">
                                                                        <div>
                                                                              <h3 className="font-semibold text-base">{interview.candidateName}</h3>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                                    {interview.id} • {interview.position}
                                                                              </p>
                                                                        </div>
                                                                  </div>

                                                                  {/* Interview Details */}
                                                                  <div className="mt-2">
                                                                        <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                              {interview.interviewType}
                                                                        </div>
                                                                        <div className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                              Interviewer: {interview.interviewer}
                                                                        </div>
                                                                  </div>

                                                                  {/* Time and Location */}
                                                                  <div className="flex flex-wrap gap-3 mt-3 text-xs">
                                                                        <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                              <Calendar size={12} />
                                                                              <span>{interview.date}</span>
                                                                        </div>
                                                                        <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                              <Clock size={12} />
                                                                              <span>{interview.time} ({interview.duration})</span>
                                                                        </div>
                                                                        <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                              {interview.mode === 'Virtual' ? <Video size={12} /> :
                                                                                    interview.mode === 'Phone' ? <Phone size={12} /> :
                                                                                          <MapPin size={12} />}
                                                                              <span>{interview.location}</span>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="flex flex-col gap-2 items-end min-w-[180px]">
                                                            {/* Status Badge */}
                                                            <div className={`px-3 py-1 rounded text-xs font-medium 
                                                                  ${interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                                                                        interview.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}
                                                            `}>
                                                                  {interview.status}
                                                            </div>

                                                            {/* Mode Badge */}
                                                            <div className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                                                                  }`}>
                                                                  {interview.mode === 'Virtual' ? <Video size={12} /> :
                                                                        interview.mode === 'Phone' ? <Phone size={12} /> :
                                                                              <Users size={12} />}
                                                                  {interview.mode}
                                                            </div>

                                                            <div className="flex gap-2 mt-2">
                                                                  <Link to={`/edit-interview/${interview.id}`} className={`text-xs px-3 py-1 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                                                                        } text-white transition-colors flex items-center gap-1`}>
                                                                        Edit
                                                                  </Link>
                                                                  <button
                                                                        onClick={() => handleDelete(interview.id)}
                                                                        className={`text-xs px-3 py-1 rounded ${darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-100 hover:bg-red-200 text-red-600"
                                                                              } transition-colors flex items-center gap-1`}
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))
                              )}
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
