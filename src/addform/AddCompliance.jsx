import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createCompliance } from "../api/complianceService";

export default function AddCompliance() {
      const { darkMode } = useOutletContext();
      const navigate = useNavigate();

      const [formData, setFormData] = useState({
            title: "",
            priority: "Medium",
            description: "",
            category: "Regulatory",
            frequency: "Monthly",
            assignee: "",
            status: "Pending",
            lastAuditDate: "",
            nextDueDate: "",
            complianceRate: 0,
      });

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await createCompliance(formData);
                  alert("Compliance requirement added!");
                  navigate("/compliance");
            } catch (err) {
                  alert(err.message || "Failed to add compliance");
            }
      };

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <h2 className="text-2xl font-bold mb-6">Add New Requirement</h2>
                  <div
                        className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"
                              }`}
                  >
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Title</label>
                                          <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Priority</label>
                                          <select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          >
                                                <option value="Critical">Critical</option>
                                                <option value="High">High</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Low">Low</option>
                                          </select>
                                    </div>
                                    <div className="md:col-span-2">
                                          <label className="block text-sm font-medium mb-1">Description</label>
                                          <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Category</label>
                                          <select
                                                name="category"
                                                value={formData.category} // Assuming static categories for now, could be dynamic
                                                onChange={handleInputChange}
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          >
                                                <option value="Regulatory">Regulatory</option>
                                                <option value="Safety">Safety</option>
                                                <option value="Operations">Operations</option>
                                                <option value="Financial">Financial</option>
                                          </select>
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Frequency</label>
                                          <input
                                                type="text"
                                                name="frequency"
                                                value={formData.frequency}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Assignee</label>
                                          <input
                                                type="text"
                                                name="assignee"
                                                value={formData.assignee}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Status</label>
                                          <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          >
                                                <option value="Pending">Pending</option>
                                                <option value="Compliant">Compliant</option>
                                                <option value="Non-Compliant">Non-Compliant</option>
                                          </select>
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Last Audit Date</label>
                                          <input
                                                type="date"
                                                name="lastAuditDate"
                                                value={formData.lastAuditDate}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Next Due Date</label>
                                          <input
                                                type="date"
                                                name="nextDueDate"
                                                value={formData.nextDueDate}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium mb-1">Compliance Rate (%)</label>
                                          <input
                                                type="number"
                                                name="complianceRate"
                                                min="0"
                                                max="100"
                                                value={formData.complianceRate}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                                                      }`}
                                          />
                                    </div>
                              </div>
                              <div className="flex justify-end gap-3 mt-6">
                                    <button
                                          type="button"
                                          onClick={() => navigate("/compliance")}
                                          className={`px-4 py-2 rounded text-sm ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                                                }`}
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          type="submit"
                                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                                    >
                                          Add Requirement
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
