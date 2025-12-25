import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Briefcase, User, FileText, ArrowLeft, Users } from "lucide-react";
import { useEmployees } from "../context/EmployeeContext";

export default function EmployeeProfiles() {
      const { darkMode } = useOutletContext();
      const { employees, loading } = useEmployees();
      const [selectedEmployee, setSelectedEmployee] = useState(null);
      const [activeTab, setActiveTab] = useState("profile");

      if (selectedEmployee) {
            return <EmployeeProfileDetail 
                  employee={selectedEmployee} 
                  darkMode={darkMode} 
                  onBack={() => setSelectedEmployee(null)}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
            />;
      }

      return <EmployeeProfilesList 
            employees={employees} 
            loading={loading} 
            darkMode={darkMode} 
            onSelectEmployee={setSelectedEmployee}
      />;
}

function EmployeeProfilesList({ employees, loading, darkMode, onSelectEmployee }) {
      if (loading) {
            return (
                  <div className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                        <div className="text-center py-12">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                              <p className="mt-4">Loading employees...</p>
                        </div>
                  </div>
            );
      }

      if (employees.length === 0) {
            return (
                  <div className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                        <div className="text-center py-12">
                              <Users size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                              <p className="text-lg font-medium">No employees found</p>
                              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Add some employees to see their profiles here.</p>
                        </div>
                  </div>
            );
      }

      return (
            <div className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                  <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-2">Employee Profiles</h1>
                        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Click on any employee to view their detailed profile</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {employees.map((employee, index) => (
                              <div
                                    key={employee._id || `employee-${index}`}
                                    onClick={() => onSelectEmployee(employee)}
                                    className={`p-6 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                                          darkMode ? "bg-gray-800 text-gray-100 hover:bg-gray-700" : "bg-white text-gray-900 hover:bg-gray-50"
                                    }`}
                              >
                                    <div className="text-center">
                                          <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold ${
                                                darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
                                          }`}>
                                                {employee.name.charAt(0).toUpperCase()}
                                          </div>
                                          <h3 className="font-bold text-lg mb-1">{employee.name}</h3>
                                          <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{employee.role}</p>
                                          <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{employee.department}</p>
                                          <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{employee.location}</p>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
}

function EmployeeProfileDetail({ employee, darkMode, onBack, activeTab, setActiveTab }) {

      const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  {/* Header */}
                  <div className="mb-8">
                        <button 
                              onClick={onBack}
                              className={`flex items-center gap-2 mb-4 px-4 py-2 rounded-lg transition-colors ${
                                    darkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                        >
                              <ArrowLeft size={16} />
                              Back to Employees
                        </button>
                        
                        <div className={`p-8 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                              <div className="flex items-center gap-6">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
                                          darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
                                    }`}>
                                          {employee.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                          <h1 className="text-3xl font-bold mb-2">{employee.name}</h1>
                                          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{employee.role}</p>
                                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{employee.department} • {employee.location}</p>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="flex border-b mb-6 overflow-x-auto scrollbar-none dark:border-gray-700 border-gray-200">
                        <TabButton label="Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} darkMode={darkMode} />
                        <TabButton label="Team" active={activeTab === "team"} onClick={() => setActiveTab("team")} darkMode={darkMode} />
                        <TabButton label="Projects" active={activeTab === "projects"} onClick={() => setActiveTab("projects")} darkMode={darkMode} />
                        <TabButton label="Documents" active={activeTab === "documents"} onClick={() => setActiveTab("documents")} darkMode={darkMode} />
                  </div>

                  {/* Content Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column - Quick Info */}
                        <div className="lg:col-span-1 space-y-6">
                              <div className={cardClass}>
                                    <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                                    <p className={`text-sm mb-6 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                          Employee contact and basic information.
                                    </p>

                                    <div className="space-y-3">
                                          <InfoRow icon={<Mail size={16} />} label="Email" value={employee.email} darkMode={darkMode} />
                                          <InfoRow icon={<Phone size={16} />} label="Phone" value={employee.phone} darkMode={darkMode} />
                                          <InfoRow icon={<MapPin size={16} />} label="Location" value={employee.location} darkMode={darkMode} />
                                          <InfoRow icon={<Calendar size={16} />} label="Salary" value={`₹${employee.salary}`} darkMode={darkMode} />
                                    </div>
                              </div>

                              <div className={cardClass}>
                                    <h3 className="text-lg font-bold mb-4">Department Info</h3>
                                    <div className="space-y-2">
                                          <div className={`px-3 py-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                                <span className="text-sm font-medium">{employee.department}</span>
                                          </div>
                                          <div className={`px-3 py-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                                                <span className="text-sm">{employee.role}</span>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        {/* Right Column - Detailed Tab Content */}
                        <div className="lg:col-span-2">
                              {activeTab === "profile" && (
                                    <div className="space-y-6">
                                          <div className={cardClass}>
                                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                      <User size={20} className="text-blue-500" /> Personal Information
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                      <DetailField label="Employee ID" value={employee._id} darkMode={darkMode} />
                                                      <DetailField label="Department" value={employee.department} darkMode={darkMode} />
                                                      <DetailField label="Role" value={employee.role} darkMode={darkMode} />
                                                      <DetailField label="Location" value={employee.location} darkMode={darkMode} />
                                                      <DetailField label="Salary" value={`₹${employee.salary}`} darkMode={darkMode} />
                                                      <DetailField label="Gender" value={employee.personalInfo?.gender || 'Not specified'} darkMode={darkMode} />
                                                      <div className="md:col-span-2">
                                                            <DetailField label="Address" value={employee.personalInfo?.address || 'Not specified'} darkMode={darkMode} />
                                                      </div>
                                                </div>
                                          </div>

                                          <div className={cardClass}>
                                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                      <Briefcase size={20} className="text-purple-500" /> Employment Details
                                                </h3>
                                                <div className="space-y-4">
                                                      <div className="flex gap-4">
                                                            <div className={`p-2 rounded-lg h-fit ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                                                                  <Briefcase size={18} className="text-blue-600" />
                                                            </div>
                                                            <div>
                                                                  <h4 className="font-bold text-sm">{employee.role}</h4>
                                                                  <p className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{employee.department}</p>
                                                                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{employee.location}</p>
                                                                  <p className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Annual Salary: ₹{employee.salary}</p>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              )}

                              {activeTab === "documents" && (
                                    <div className={cardClass}>
                                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                <FileText size={20} className="text-orange-500" /> Documents
                                          </h3>
                                          <div className="text-center py-8">
                                                <FileText size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                                                <p className={`text-lg font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No documents available</p>
                                          </div>
                                    </div>
                              )}

                              {(activeTab === "team" || activeTab === "projects") && (
                                    <div className={`${cardClass} flex flex-col items-center justify-center py-12`}>
                                          <Users size={48} className={`mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                                          <p className={`text-lg font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No data available</p>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
}

function TabButton({ label, active, onClick, darkMode }) {
      return (
            <button
                  onClick={onClick}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${active
                              ? "border-blue-600 text-blue-600 dark:text-blue-400"
                              : `border-transparent hover:text-blue-500 ${darkMode ? "text-gray-400" : "text-gray-500"}`
                        }`}
            >
                  {label}
            </button>
      )
}

function InfoRow({ icon, label, value, darkMode }) {
      return (
            <div className="flex items-center gap-3 text-sm">
                  <div className={`p-1.5 rounded-md ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
                        {icon}
                  </div>
                  <div className="flex-1">
                        <span className={`block text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{label}</span>
                        <span className={`block font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{value}</span>
                  </div>
            </div>
      )
}

function DetailField({ label, value, darkMode }) {
      return (
            <div className="mb-2">
                  <span className={`block text-xs font-semibold uppercase mb-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{label}</span>
                  <div className={`p-2 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-700/50 text-gray-200" : "border-gray-100 bg-gray-50 text-gray-800"}`}>
                        {value}
                  </div>
            </div>
      )
}
