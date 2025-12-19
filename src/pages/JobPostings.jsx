import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Megaphone, Briefcase, FileText, XCircle, Calendar, Plus, MapPin, DollarSign, Clock, Edit2, Trash2 } from "lucide-react";
import { fetchJobPostings, createJobPosting, updateJobPosting, deleteJobPosting } from "../api/jobPostingService";

export default function JobPostings() {
      const { darkMode } = useOutletContext();
      const navigate = useNavigate();
      const [jobs, setJobs] = useState([]);
      const [error, setError] = useState(null);
      const [filters, setFilters] = useState({ status: "All Status", department: "All Departments" });
      const [modalData, setModalData] = useState(null); // null closed, object open
      const [saving, setSaving] = useState(false);

      useEffect(() => {
            fetchJobPostings()
                  .then(setJobs)
                  .catch((err) => setError(err.message || "Failed to load job postings"));
      }, []);

      const metrics = useMemo(() => {
            const active = jobs.filter((j) => j.status === "Active").length;
            const draft = jobs.filter((j) => j.status === "Draft").length;
            const closed = jobs.filter((j) => j.status === "Closed").length;
            const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicants || 0), 0);
            return { active, draft, closed, totalApplicants };
      }, [jobs]);

      const filteredJobs = useMemo(() => {
            return jobs.filter((j) => {
                  const statusOk = filters.status === "All Status" || j.status === filters.status;
                  const deptOk = filters.department === "All Departments" || j.department === filters.department;
                  return statusOk && deptOk;
            });
      }, [jobs, filters]);

      const openCreate = () => {
            setModalData({
                  mode: "create",
                  title: "",
                  department: "",
                  location: "",
                  type: "Full-time",
                  postedDate: "",
                  closingDate: "",
                  status: "Draft",
                  applicants: 0,
                  salary: "",
                  experience: "",
                  description: "",
                  priority: "Medium",
            });
      };

      const openEdit = (job) => {
            setModalData({ mode: "edit", ...job });
      };

      const closeModal = () => setModalData(null);

      const handleChange = (e) => {
            const { name, value } = e.target;
            setModalData((prev) => ({ ...prev, [name]: name === "applicants" ? Number(value) : value }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            if (!modalData) return;
            setSaving(true);
            try {
                  if (modalData.mode === "create") {
                        const created = await createJobPosting(modalData);
                        setJobs((prev) => [created, ...prev]);
                  } else {
                        const updated = await updateJobPosting(modalData.jobId, modalData);
                        setJobs((prev) => prev.map((j) => (j.jobId === updated.jobId ? updated : j)));
                  }
                  closeModal();
            } catch (err) {
                  alert(err.message || "Failed to save job");
            } finally {
                  setSaving(false);
            }
      };

      const handleDelete = async (id) => {
            if (!window.confirm("Delete this job posting?")) return;
            try {
                  await deleteJobPosting(id);
                  setJobs((prev) => prev.filter((j) => j.jobId !== id));
            } catch (err) {
                  alert(err.message || "Failed to delete job posting");
            }
      };

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <Megaphone /> Job Postings
                        </h1>
                        <button
                              onClick={() => navigate("/add-job-posting")}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Create Job Posting
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Active Postings"
                              value={metrics.active}
                              icon={<Megaphone size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Draft Postings"
                              value={metrics.draft}
                              icon={<FileText size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Closed Postings"
                              value={metrics.closed}
                              icon={<XCircle size={24} className="text-gray-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Total Applicants"
                              value={metrics.totalApplicants}
                              icon={<Briefcase size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Job Postings List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">All Job Postings</h2>
                              <div className="flex gap-2">
                                    <select
                                          value={filters.status}
                                          onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                                          className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Status</option>
                                          <option>Active</option>
                                          <option>Draft</option>
                                          <option>Closed</option>
                                    </select>
                                    <select
                                          value={filters.department}
                                          onChange={(e) => setFilters((prev) => ({ ...prev, department: e.target.value }))}
                                          className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Departments</option>
                                          <option>Pharmacy Operations</option>
                                          <option>Human Resources</option>
                                          <option>Clinical Services</option>
                                          <option>Supply Chain</option>
                                          <option>Information Technology</option>
                                          <option>Customer Service</option>
                                    </select>
                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {error && (
                                    <div className="p-3 text-sm text-orange-800 bg-orange-50 border border-orange-200">
                                          {error}
                                    </div>
                              )}
                              {filteredJobs.map((job) => (
                                    <div
                                          key={job.id}
                                          className={`p-4 transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                                    >
                                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                <div className="flex-1">
                                                      <div className="flex items-start justify-between gap-2">
                                                            <div>
                                                                  <h3 className="font-semibold text-lg">{job.title}</h3>
                                                                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                        {job.id} • {job.department}
                                                                  </p>
                                                            </div>
                                                      </div>

                                                      <p className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                            {job.description}
                                                      </p>

                                                      {/* Job Details */}
                                                      <div className="flex flex-wrap gap-4 mt-3 text-sm">
                                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                  <MapPin size={14} />
                                                                  <span>{job.location}</span>
                                                            </div>
                                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                  <Briefcase size={14} />
                                                                  <span>{job.type}</span>
                                                            </div>
                                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                  <DollarSign size={14} />
                                                                  <span>{job.salary}</span>
                                                            </div>
                                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                  <Clock size={14} />
                                                                  <span>{job.experience}</span>
                                                            </div>
                                                      </div>

                                                      {/* Dates */}
                                                      <div className="flex flex-wrap gap-4 mt-2 text-xs">
                                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                                  <Calendar size={12} />
                                                                  <span>Posted: {job.postedDate}</span>
                                                            </div>
                                                            <div className={`flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                                  <Calendar size={12} />
                                                                  <span>Closes: {job.closingDate}</span>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="flex flex-col gap-2 items-end min-w-[180px]">
                                                      <div className="flex gap-2 flex-wrap justify-end">
                                                            <div className={`px-3 py-1 rounded text-xs font-medium 
                                                                  ${job.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                        job.status === 'Draft' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                              'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'}
                                                            `}>
                                                                  {job.status}
                                                            </div>
                                                            <div className={`px-3 py-1 rounded text-xs font-medium 
                                                                  ${job.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                                                                        job.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                              job.priority === 'Medium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                                                                                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'}
                                                            `}>
                                                                  {job.priority}
                                                            </div>
                                                      </div>

                                                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"
                                                            }`}>
                                                            <Briefcase size={16} className="text-blue-500" />
                                                            <div className="text-right">
                                                                  <p className="text-xs text-gray-500 dark:text-gray-400">Applicants</p>
                                                                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{job.applicants}</p>
                                                            </div>
                                                      </div>

                                                      <div className="flex gap-2">
                                                            <button
                                                                  onClick={() => openEdit(job)}
                                                                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                                                                        } text-white transition-colors`}>
                                                                  <Edit2 size={14} /> Edit
                                                            </button>
                                                            <button
                                                                  onClick={() => handleDelete(job.jobId)}
                                                                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded ${darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-600 hover:bg-red-700"
                                                                        } text-white transition-colors`}>
                                                                  <Trash2 size={14} /> Delete
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>

                  {modalData && (
                        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                              <div className={`w-full max-w-2xl rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                                    <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                                          <h3 className="text-lg font-semibold">
                                                {modalData.mode === "create" ? "Create Job Posting" : "Edit Job Posting"}
                                          </h3>
                                          <button onClick={closeModal} className="text-sm text-gray-500 hover:text-gray-700">
                                                Close
                                          </button>
                                    </div>
                                    <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <input name="title" value={modalData.title} onChange={handleChange} required placeholder="Title" className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <input name="department" value={modalData.department} onChange={handleChange} placeholder="Department" className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <input name="location" value={modalData.location} onChange={handleChange} placeholder="Location" className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <input name="type" value={modalData.type} onChange={handleChange} placeholder="Type (e.g., Full-time)" className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <input type="date" name="postedDate" value={modalData.postedDate} onChange={handleChange} className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <input type="date" name="closingDate" value={modalData.closingDate} onChange={handleChange} className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <select name="status" value={modalData.status} onChange={handleChange} className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600">
                                                <option>Active</option>
                                                <option>Draft</option>
                                                <option>Closed</option>
                                          </select>
                                          <select name="priority" value={modalData.priority} onChange={handleChange} className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600">
                                                <option>Low</option>
                                                <option>Medium</option>
                                                <option>High</option>
                                                <option>Critical</option>
                                          </select>
                                          <input name="salary" value={modalData.salary} onChange={handleChange} placeholder="Salary (₹)" className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <input name="experience" value={modalData.experience} onChange={handleChange} placeholder="Experience" className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <input type="number" min="0" name="applicants" value={modalData.applicants} onChange={handleChange} placeholder="Applicants" className="rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <textarea name="description" value={modalData.description} onChange={handleChange} placeholder="Description" className="md:col-span-2 rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600" />
                                          <div className="md:col-span-2 flex justify-end gap-2">
                                                <button type="button" onClick={closeModal} className="rounded border px-4 py-2 text-sm dark:border-gray-600">
                                                      Cancel
                                                </button>
                                                <button type="submit" disabled={saving} className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-60">
                                                      {saving ? "Saving..." : "Save"}
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
