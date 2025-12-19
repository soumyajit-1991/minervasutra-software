import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Briefcase, User, FileText, Globe, Layers, Download } from "lucide-react";
import { employeeProfilesData } from "../data/employeeProfilesData";

export default function EmployeeProfiles() {
      const { darkMode } = useOutletContext();
      const [activeTab, setActiveTab] = useState("profile");
      const profile = employeeProfilesData;

      const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  {/* Header Banner */}
                  <div className="relative mb-20">
                        <div className="h-48 w-full rounded-xl overflow-hidden shadow-sm">
                              <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
                        </div>
                        <div className={`absolute -bottom-16 left-8 flex items-end`}>
                              <img
                                    src={profile.avatar}
                                    alt="Avatar"
                                    className={`w-32 h-32 rounded-full border-4 object-cover ${darkMode ? "border-gray-900" : "border-white"}`}
                              />
                              <div className="mb-2 ml-4">
                                    <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{profile.name}</h1>
                                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{profile.role}</p>
                              </div>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Edit Cover
                              </button>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg">
                                    Edit Profile
                              </button>
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
                                    <h3 className="text-lg font-bold mb-4">About</h3>
                                    <p className={`text-sm mb-6 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                          {profile.about}
                                    </p>

                                    <div className="space-y-3">
                                          <InfoRow icon={<Mail size={16} />} label="Email" value={profile.email} darkMode={darkMode} />
                                          <InfoRow icon={<Phone size={16} />} label="Phone" value={profile.phone} darkMode={darkMode} />
                                          <InfoRow icon={<MapPin size={16} />} label="Location" value={profile.location} darkMode={darkMode} />
                                          <InfoRow icon={<Calendar size={16} />} label="Joined" value={profile.joinedDate} darkMode={darkMode} />
                                    </div>
                              </div>

                              <div className={cardClass}>
                                    <h3 className="text-lg font-bold mb-4">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                          {profile.skills.map(skill => (
                                                <span key={skill} className={`px-3 py-1 text-xs rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                                                      {skill}
                                                </span>
                                          ))}
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
                                                      <DetailField label="Date of Birth" value={profile.personalInfo.dob} darkMode={darkMode} />
                                                      <DetailField label="Nationality" value={profile.personalInfo.nationality} darkMode={darkMode} />
                                                      <DetailField label="Marital Status" value={profile.personalInfo.maritalStatus} darkMode={darkMode} />
                                                      <DetailField label="Gender" value={profile.personalInfo.gender} darkMode={darkMode} />
                                                      <div className="md:col-span-2">
                                                            <DetailField label="Address" value={profile.personalInfo.address} darkMode={darkMode} />
                                                      </div>
                                                </div>
                                          </div>

                                          <div className={cardClass}>
                                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                      <Briefcase size={20} className="text-purple-500" /> Experience
                                                </h3>
                                                <div className="space-y-6">
                                                      {profile.experience.map((exp, index) => (
                                                            <div key={index} className="flex gap-4">
                                                                  <div className={`p-2 rounded-lg h-fit ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                                                                        <Briefcase size={18} className="text-blue-600" />
                                                                  </div>
                                                                  <div>
                                                                        <h4 className="font-bold text-sm">{exp.role}</h4>
                                                                        <p className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{exp.company}</p>
                                                                        <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{exp.duration}</p>
                                                                        <p className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{exp.description}</p>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>
                                    </div>
                              )}

                              {activeTab === "documents" && (
                                    <div className={cardClass}>
                                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                <FileText size={20} className="text-orange-500" /> Documents
                                          </h3>
                                          <div className="space-y-3">
                                                {profile.documents.map((doc, index) => (
                                                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"} transition-colors`}>
                                                            <div className="flex items-center gap-3">
                                                                  <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                                                        <FileText size={18} />
                                                                  </div>
                                                                  <div>
                                                                        <p className="text-sm font-medium">{doc.name}</p>
                                                                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{doc.size} • {doc.date}</p>
                                                                  </div>
                                                            </div>
                                                            <button className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}>
                                                                  <Download size={16} />
                                                            </button>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {(activeTab === "team" || activeTab === "projects") && (
                                    <div className={`${cardClass} flex flex-col items-center justify-center py-12`}>
                                          <Layers size={48} className={`mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                                          <p className={`text-lg font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Coming Soon</p>
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
