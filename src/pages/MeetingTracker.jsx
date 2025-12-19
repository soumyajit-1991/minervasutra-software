import { useOutletContext } from "react-router-dom";
import { CalendarDays, Clock, CheckCircle, XCircle, Calendar, Plus, MapPin, Users } from "lucide-react";
import { meetingTrackerData } from "../data/meetingTrackerData";

export default function MeetingTracker() {
    const { darkMode } = useOutletContext();
    const { metrics, meetings } = meetingTrackerData;

    return (
        <div
            className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <CalendarDays /> Meeting Tracker
                </h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Plus size={18} /> Schedule Meeting
                </button>
            </div>

            {/* Metrics Row (Kept the previously fixed StatCard component usage) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Scheduled Meetings"
                    value={metrics.scheduled}
                    icon={<CalendarDays size={24} className="text-blue-500" />}
                    darkMode={darkMode}
                />
                <StatCard
                    title="Completed (This Month)"
                    value={metrics.completed}
                    icon={<CheckCircle size={24} className="text-green-500" />}
                    darkMode={darkMode}
                />
                <StatCard
                    title="Cancelled"
                    value={metrics.cancelled}
                    icon={<XCircle size={24} className="text-red-500" />}
                    darkMode={darkMode}
                />
                <StatCard
                    title="Avg. Duration"
                    value={metrics.avgDuration}
                    icon={<Clock size={24} className="text-purple-500" />}
                    darkMode={darkMode}
                />
            </div>

            {/* Meeting List */}
            <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Upcoming & Recent Meetings</h2>
                    <div className="flex gap-2">
                        <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                            <option>All Meetings</option>
                            <option>Scheduled</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y dark:divide-gray-700">
                    {meetings.map((meeting) => (
                        <div 
                            key={meeting.id} 
                            // Hover fix from previous response applied
                            className={`p-4 transition-colors ${darkMode ? "dark:hover:bg-gray-700" : "hover:bg-gray-100"}`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex gap-4 items-start">
                                    <img src={meeting.avatar} alt={meeting.organizer} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <h3 className="font-semibold text-sm md:text-base">{meeting.title}</h3>
                                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Organized by {meeting.organizer} • {meeting.id}
                                        </p>
                                        <div className="flex flex-wrap gap-3 mt-2 text-xs">
                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                <Calendar size={14} />
                                                <span>{meeting.date}</span>
                                            </div>
                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                <Clock size={14} />
                                                <span>{meeting.time} ({meeting.duration})</span>
                                            </div>
                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                <MapPin size={14} />
                                                <span>{meeting.location}</span>
                                            </div>
                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                <Users size={14} />
                                                <span>{meeting.attendees.join(", ")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm justify-between md:justify-end min-w-[200px]">
                                    <div className={`px-2 py-1 rounded text-xs font-medium 
                                        ${meeting.status === 'Scheduled' 
                                            // 🚀 FIX: Increased Scheduled tag contrast in light mode
                                            ? 'bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200' 
                                            : meeting.status === 'Completed' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}
                                        `}>
                                        {meeting.status}
                                    </div>
                                    <div className={`px-2 py-1 rounded text-xs font-medium 
                                        ${meeting.priority === 'Critical' 
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' 
                                            : meeting.priority === 'High' 
                                                // 🚀 FIX: Increased High priority tag contrast in light mode
                                                ? 'bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200' 
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}
                                        `}>
                                        {meeting.priority}
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                                        {meeting.type}
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
            className={`
                flex items-center p-4 rounded-xl shadow-sm transition-colors duration-200 
                ${darkMode ? "bg-gray-800 dark:hover:bg-gray-700" : "bg-white hover:bg-gray-50"}
                `}
        >
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">{icon}</div>
            <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
                <h3 className="text-xl font-bold">{value}</h3>
            </div>
        </div>
    );
}