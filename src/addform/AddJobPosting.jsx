import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import { createJobPosting } from "../api/jobPostingService";

export default function AddJobPosting() {
      const { darkMode } = useOutletContext();
      const navigate = useNavigate();
      const [saving, setSaving] = useState(false);

      // Form state
      const [formData, setFormData] = useState({
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

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: name === "applicants" ? Number(value) : value }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setSaving(true);
            try {
                  await createJobPosting(formData);
                  navigate("/job-postings");
            } catch (err) {
                  alert(err.message || "Failed to save job");
            } finally {
                  setSaving(false);
            }
      };

      return (
            <div
                  className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex items-center justify-between">
                        <div>
                              <h2 className="text-2xl font-bold">Add Job Posting</h2>
                              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                                    Enter details to create a new job posting.
                              </p>
                        </div>
                        <button
                              onClick={() => navigate("/job-postings")}
                              className="text-sm text-gray-500 hover:text-gray-700"
                        >
                              Cancel
                        </button>
                  </div>

                  <div
                        className={`p-4 shadow rounded-md transition-colors duration-300 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
                              }`}
                  >
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Title</label>
                                          <input
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                placeholder="Title"
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Department</label>
                                          <input
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                placeholder="Department"
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Location</label>
                                          <input
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="Location"
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Type</label>
                                          <input
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                                placeholder="Type (e.g., Full-time)"
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Posted Date</label>
                                          <input
                                                type="date"
                                                name="postedDate"
                                                value={formData.postedDate}
                                                onChange={handleChange}
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Closing Date</label>
                                          <input
                                                type="date"
                                                name="closingDate"
                                                value={formData.closingDate}
                                                onChange={handleChange}
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Status</label>
                                          <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          >
                                                <option>Active</option>
                                                <option>Draft</option>
                                                <option>Closed</option>
                                          </select>
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Priority</label>
                                          <select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleChange}
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          >
                                                <option>Low</option>
                                                <option>Medium</option>
                                                <option>High</option>
                                                <option>Critical</option>
                                          </select>
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Salary</label>
                                          <input
                                                name="salary"
                                                value={formData.salary}
                                                onChange={handleChange}
                                                placeholder="Salary (₹)"
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Experience</label>
                                          <input
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleChange}
                                                placeholder="Experience"
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Applicants</label>
                                          <input
                                                type="number"
                                                min="0"
                                                name="applicants"
                                                value={formData.applicants}
                                                onChange={handleChange}
                                                placeholder="Applicants"
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                                    <div className="md:col-span-2">
                                          <label className="block text-sm font-medium mb-1">Description</label>
                                          <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                className={`w-full p-2 border rounded-md transition ${darkMode
                                                            ? "bg-gray-600 border-gray-500 text-gray-100"
                                                            : "bg-white border-gray-300 text-gray-900"
                                                      }`}
                                          />
                                    </div>
                              </div>
                              <div className="flex justify-end">
                                    <button
                                          type="submit"
                                          disabled={saving}
                                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${darkMode
                                                      ? "bg-blue-600 text-white hover:bg-blue-700"
                                                      : "bg-blue-600 text-white hover:bg-blue-700"
                                                } disabled:opacity-60`}
                                    >
                                          <Plus size={18} />
                                          {saving ? "Saving..." : "Save Job Posting"}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
