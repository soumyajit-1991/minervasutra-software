import { useOutletContext, useNavigate } from "react-router-dom";
import { CalendarDays, Clock, CheckCircle, XCircle, Calendar, Plus, MapPin, Users } from "lucide-react";

export default function MeetingTracker() {
    const { darkMode } = useOutletContext();
    const navigate = useNavigate();
    
    // No meeting data available
    const metrics = {
        scheduled: 0,
        completed: 0,
        cancelled: 0,
        avgDuration: "0 mins"
    };
    const meetings = [];

    return (
        <div
            className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <CalendarDays /> Meeting Tracker
                </h1>
                <button 
                    onClick={() => navigate('/add-interview')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
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

                <div className="p-8 text-center">
                    <CalendarDays size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                    <p className="text-lg font-medium">No meetings scheduled</p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Schedule your first meeting to get started</p>
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