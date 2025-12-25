import { useOutletContext } from "react-router-dom";
import { Hourglass, CheckCircle, Clock, XCircle, Calendar, Plus, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchOvertime, createOvertime } from "../api/overtimeService";

export default function OvertimeList() {
      const { darkMode } = useOutletContext();
      const [records, setRecords] = useState([]);
      const [loading, setLoading] = useState(true);

      const handleLogOvertime = () => {
            setShowModal(true);
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await createOvertime(formData);
                  setShowModal(false);
                  setFormData({ employee: '', date: '', startTime: '', endTime: '', overtimeHours: '', reason: '', department: 'Pharmacy Operations' });
                  loadOvertime();
            } catch (error) {
                  alert('Failed to log overtime: ' + error.message);
            }
      };

      const [showModal, setShowModal] = useState(false);
      const [formData, setFormData] = useState({
            employee: '',
            date: '',
            startTime: '',
            endTime: '',
            overtimeHours: '',
            reason: '',
            department: 'Pharmacy Operations'
      });

      useEffect(() => {
            loadOvertime();
      }, []);

      const loadOvertime = async () => {
            try {
                  const data = await fetchOvertime();
                  setRecords(data);
            } catch (error) {
                  console.error('Failed to load overtime records:', error);
            } finally {
                  setLoading(false);
            }
      };

      const metrics = {
            totalHours: records.reduce((sum, r) => sum + (r.overtimeHours || 0), 0),
            pending: records.filter(r => r.status === 'Pending').length,
            approved: records.filter(r => r.status === 'Approved').length,
            rejected: records.filter(r => r.status === 'Rejected').length
      };

      if (loading) {
            return (
                  <div className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                        <div className="text-center py-12">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                              <p className="mt-4">Loading overtime records...</p>
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
                              <Hourglass /> Overtime List
                        </h1>
                        <button 
                              onClick={handleLogOvertime}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
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
                              {records.length === 0 ? (
                                    <div className="p-8 text-center">
                                          <Hourglass size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                                          <p className="text-lg font-medium">No overtime records available</p>
                                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Overtime records will appear here when logged</p>
                                    </div>
                              ) : (
                                    records.map((record) => (
                                          <div key={record._id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                                                <div className="flex justify-between items-start">
                                                      <div className="flex-1">
                                                            <h3 className="font-semibold">{record.employee}</h3>
                                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>{record.reason}</p>
                                                            <div className="flex items-center gap-4 mt-2 text-xs">
                                                                  <span>Date: {new Date(record.date).toLocaleDateString()}</span>
                                                                  <span>Hours: {record.overtimeHours}</span>
                                                                  <span className={`px-2 py-1 rounded ${record.status === 'Approved' ? 'bg-green-100 text-green-800' : record.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                                                                        {record.status}
                                                                  </span>
                                                            </div>
                                                      </div>
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
                                    <h2 className="text-lg font-bold mb-4">Log Overtime</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                          <input
                                                type="text"
                                                placeholder="Employee Name"
                                                value={formData.employee}
                                                onChange={(e) => setFormData({...formData, employee: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <div className="grid grid-cols-2 gap-2">
                                                <input
                                                      type="time"
                                                      placeholder="Start Time"
                                                      value={formData.startTime}
                                                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                                                      className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                      required
                                                />
                                                <input
                                                      type="time"
                                                      placeholder="End Time"
                                                      value={formData.endTime}
                                                      onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                                                      className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                      required
                                                />
                                          </div>
                                          <input
                                                type="number"
                                                step="0.5"
                                                placeholder="Overtime Hours"
                                                value={formData.overtimeHours}
                                                onChange={(e) => setFormData({...formData, overtimeHours: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <textarea
                                                placeholder="Reason for Overtime"
                                                value={formData.reason}
                                                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                rows={3}
                                                required
                                          />
                                          <div className="flex gap-2">
                                                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                                      Log Overtime
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