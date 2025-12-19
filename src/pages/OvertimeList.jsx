import { useOutletContext } from "react-router-dom";
import { Hourglass, CheckCircle, Clock, XCircle, Calendar, Plus } from "lucide-react";
import { overtimeListData } from "../data/overtimeListData";

export default function OvertimeList() {
      const { darkMode } = useOutletContext();
      const { metrics, records } = overtimeListData;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <Hourglass /> Overtime List
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Log Overtime
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total OT Hours"
                              value={metrics.totalHours}
                              icon={<Hourglass size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Pending Hours"
                              value={metrics.pending}
                              icon={<Clock size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Approved Hours"
                              value={metrics.approved}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Rejected Hours"
                              value={metrics.rejected}
                              icon={<XCircle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Overtime Records List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">All Overtime Records</h2>
                              <div className="flex gap-2">
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Status</option>
                                          <option>Pending</option>
                                          <option>Approved</option>
                                          <option>Rejected</option>
                                    </select>
                                    <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Departments</option>
                                          <option>Pharmacy Operations</option>
                                          <option>Human Resources</option>
                                          <option>Clinical Services</option>
                                    </select>
                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {records.map((record) => (
                                    <div
                                          key={record.id}
                                          className={`p-4 transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                                    >
                                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                <div className="flex gap-4 items-start flex-1">
                                                      <img src={record.employeeAvatar} alt={record.employeeName} className="w-12 h-12 rounded-full object-cover" />

                                                      <div className="flex-1">
                                                            <div className="flex items-start justify-between gap-2">
                                                                  <div>
                                                                        <h3 className="font-semibold text-base">{record.employeeName}</h3>
                                                                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                              {record.id} • {record.position}
                                                                        </p>
                                                                  </div>
                                                            </div>

                                                            {/* Department */}
                                                            <div className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                  {record.department}
                                                            </div>

                                                            {/* Hours Breakdown */}
                                                            <div className={`mt-3 p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                                                        <div>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Date</p>
                                                                              <p className="font-medium">{record.date}</p>
                                                                        </div>
                                                                        <div>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Regular Hours</p>
                                                                              <p className="font-medium">{record.regularHours}h</p>
                                                                        </div>
                                                                        <div>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Overtime Hours</p>
                                                                              <p className="font-medium text-orange-600 dark:text-orange-400">{record.overtimeHours}h</p>
                                                                        </div>
                                                                        <div>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Hours</p>
                                                                              <p className="font-bold text-blue-600 dark:text-blue-400">{record.totalHours}h</p>
                                                                        </div>
                                                                  </div>
                                                            </div>

                                                            {/* Rate Badge */}
                                                            <div className="mt-3">
                                                                  <span className={`px-2 py-1 rounded text-xs font-medium ${record.rate === '2x'
                                                                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'
                                                                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                                                                        }`}>
                                                                        Pay Rate: {record.rate}
                                                                  </span>
                                                            </div>

                                                            {/* Reason */}
                                                            <div className="mt-3">
                                                                  <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                        Reason:
                                                                  </p>
                                                                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                        {record.reason}
                                                                  </p>
                                                            </div>

                                                            {/* Rejection Reason */}
                                                            {record.rejectionReason && (
                                                                  <div className="mt-2">
                                                                        <p className={`text-xs font-medium text-red-600 dark:text-red-400`}>
                                                                              Rejection Reason:
                                                                        </p>
                                                                        <p className={`text-sm text-red-600 dark:text-red-400`}>
                                                                              {record.rejectionReason}
                                                                        </p>
                                                                  </div>
                                                            )}

                                                            {/* Request Info */}
                                                            <div className={`mt-2 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                                  Requested on {record.requestedDate}
                                                                  {record.approvedBy && ` • Approved by ${record.approvedBy} on ${record.approvalDate}`}
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="flex flex-col gap-2 items-end min-w-[180px]">
                                                      {/* Status Badge */}
                                                      <div className={`px-3 py-2 rounded text-sm font-medium 
                                                            ${record.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                  record.status === 'Pending' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}
                                                      `}>
                                                            {record.status}
                                                      </div>

                                                      <div className="flex gap-2 mt-2">
                                                            {record.status === 'Pending' && (
                                                                  <>
                                                                        <button className={`text-xs px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition-colors`}>
                                                                              Approve
                                                                        </button>
                                                                        <button className={`text-xs px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors`}>
                                                                              Reject
                                                                        </button>
                                                                  </>
                                                            )}
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
