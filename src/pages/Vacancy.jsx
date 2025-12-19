import { useOutletContext } from "react-router-dom";
import { Briefcase, CheckCircle, AlertCircle, FileText, Eye } from "lucide-react";
import { vacancyData } from "../data/vacancyData";

export default function Vacancy() {
      const { darkMode } = useOutletContext();
      const { metrics, vacancies } = vacancyData;

      const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <h1 className="text-2xl font-bold mb-6">Vacancy Management</h1>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Open Positions"
                              value={metrics.openPositions}
                              icon={<Briefcase size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Filled This Month"
                              value={metrics.filledThisMonth}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Urgent Requirements"
                              value={metrics.urgentReq}
                              icon={<AlertCircle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Total Applications"
                              value={metrics.totalApplications}
                              icon={<FileText size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Vacancy List Table */}
                  <div className={cardClass}>
                        <div className="flex justify-between items-center mb-6">
                              <h2 className="text-lg font-semibold">Active Vacancies</h2>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition transition-colors">
                                    + Post New Job
                              </button>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                    <thead>
                                          <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                                <th className="py-3 px-2">Job ID</th>
                                                <th className="py-3 px-2">Role Title</th>
                                                <th className="py-3 px-2">Department</th>
                                                <th className="py-3 px-2">Type</th>
                                                <th className="py-3 px-2">Posted Date</th>
                                                <th className="py-3 px-2">Status</th>
                                                <th className="py-3 px-2">Applicants</th>
                                                <th className="py-3 px-2">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {vacancies.map((job) => (
                                                <tr
                                                      key={job.id}
                                                      className={`border-b last:border-0 transition-colors ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"
                                                            }`}
                                                >
                                                      <td className="py-3 px-2 text-sm">{job.id}</td>
                                                      <td className="py-3 px-2 font-medium">{job.title}</td>
                                                      <td className="py-3 px-2">{job.department}</td>
                                                      <td className="py-3 px-2 text-sm">{job.type}</td>
                                                      <td className="py-3 px-2 text-sm">{job.postedDate}</td>
                                                      <td className="py-3 px-2">
                                                            <span
                                                                  className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === "Open"
                                                                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                              : job.status === "Urgent"
                                                                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                                        }`}
                                                            >
                                                                  {job.status}
                                                            </span>
                                                      </td>
                                                      <td className="py-3 px-2 text-sm">{job.applicants}</td>
                                                      <td className="py-3 px-2">
                                                            <button
                                                                  className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-gray-600 text-gray-400" : "hover:bg-gray-200 text-gray-500"
                                                                        }`}
                                                            >
                                                                  <Eye size={18} />
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
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
