import { useOutletContext } from "react-router-dom";
import { Users, Mail, Phone, MapPin, Search, Filter, MoreHorizontal, Briefcase, Building } from "lucide-react";
import { employeeDirectoryData } from "../data/employeeDirectoryData";

export default function EmployeeDirectory() {
      const { darkMode } = useOutletContext();
      const { metrics, employees } = employeeDirectoryData;

      const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Employee Directory</h1>
                        <div className="flex gap-3">
                              <div className={`flex items-center px-4 py-2 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <Search size={18} className="text-gray-400 mr-2" />
                                    <input
                                          type="text"
                                          placeholder="Search employees..."
                                          className={`bg-transparent outline-none text-sm ${darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-700 placeholder-gray-400"}`}
                                    />
                              </div>
                              <button className={`p-2 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-600"}`}>
                                    <Filter size={20} />
                              </button>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Add Employee
                              </button>
                        </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Employees"
                              value={metrics.totalEmployees}
                              icon={<Users size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Departments"
                              value={metrics.departments}
                              icon={<Building size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="New Hires (Month)"
                              value={metrics.newHires}
                              icon={<Briefcase size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Active %"
                              value={`${metrics.activePercent}%`}
                              icon={<Users size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Employee Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {employees.map((emp) => (
                              <div key={emp.id} className={`${cardClass} flex flex-col items-center text-center relative group`}>
                                    <button className={`absolute top-4 right-4 p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          <MoreHorizontal size={20} />
                                    </button>

                                    <div className="relative mb-4">
                                          <img
                                                src={emp.avatarUrl}
                                                alt={emp.name}
                                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700 shadow-sm"
                                          />
                                          <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${emp.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-1">{emp.name}</h3>
                                    <p className={`text-sm mb-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{emp.role}</p>
                                    <p className={`text-xs mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{emp.department}</p>

                                    <div className="w-full space-y-2 mt-auto">
                                          <div className={`flex items-center text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                <Mail size={14} className="mr-2 opacity-70" />
                                                <span className="truncate">{emp.email}</span>
                                          </div>
                                          <div className={`flex items-center text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                <Phone size={14} className="mr-2 opacity-70" />
                                                <span>{emp.phone}</span>
                                          </div>
                                          <div className={`flex items-center text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                <MapPin size={14} className="mr-2 opacity-70" />
                                                <span>{emp.location}</span>
                                          </div>
                                    </div>

                                    <div className="mt-4 w-full flex gap-2">
                                          <button className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}>
                                                View Profile
                                          </button>
                                          <button className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors border ${darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"}`}>
                                                Message
                                          </button>
                                    </div>
                              </div>
                        ))}
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
