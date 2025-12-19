import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Plus, Save } from "lucide-react";
import { createOffer } from "../api/offerService";

export default function AddOffer() {
      const { darkMode } = useOutletContext();
      const navigate = useNavigate();

      const [formData, setFormData] = useState({
            candidateName: "",
            position: "",
            department: "",
            salary: "",
            bonus: "",
            offerDate: "",
            expiryDate: "",
            startDate: "",
            benefits: "",
            notes: "",
            recruiter: "",
            status: "Pending"
      });

      const [errors, setErrors] = useState({});

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            setErrors({ ...errors, [name]: "" });
      };

      const validateForm = () => {
            const newErrors = {};
            if (!formData.candidateName.trim()) newErrors.candidateName = "Candidate Name is required";
            if (!formData.position.trim()) newErrors.position = "Position is required";
            if (!formData.department.trim()) newErrors.department = "Department is required";
            if (!formData.salary.trim()) newErrors.salary = "Salary is required";
            if (!formData.offerDate) newErrors.offerDate = "Offer Date is required";
            if (!formData.expiryDate) newErrors.expiryDate = "Expiry Date is required";
            if (!formData.startDate) newErrors.startDate = "Start Date is required";
            if (!formData.recruiter.trim()) newErrors.recruiter = "Recruiter is required";
            return newErrors;
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            const validationErrors = validateForm();
            if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  return;
            }

            try {
                  const offerData = {
                        ...formData,
                        benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b)
                  };
                  await createOffer(offerData);
                  alert("Offer created successfully!");
                  navigate("/offer-management");
            } catch (err) {
                  alert(err.message || "Failed to create offer");
            }
      };

      return (
            <div className={`p-6 ml-64 mt-16 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                  <h2 className="text-2xl font-bold mb-6">Create New Offer</h2>
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <LabeledInput label="Candidate Name" name="candidateName" value={formData.candidateName} onChange={handleChange} error={errors.candidateName} darkMode={darkMode} />
                                    <LabeledInput label="Position" name="position" value={formData.position} onChange={handleChange} error={errors.position} darkMode={darkMode} />

                                    <div>
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Department</label>
                                          <select name="department" value={formData.department} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
                                                <option value="">Select Department</option>
                                                <option>Pharmacy Operations</option>
                                                <option>Human Resources</option>
                                                <option>IT</option>
                                                <option>Clinical Services</option>
                                                <option>Finance</option>
                                          </select>
                                          {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                                    </div>

                                    <LabeledInput label="Recruiter" name="recruiter" value={formData.recruiter} onChange={handleChange} error={errors.recruiter} darkMode={darkMode} />

                                    <LabeledInput label="Salary" name="salary" value={formData.salary} onChange={handleChange} error={errors.salary} darkMode={darkMode} placeholder="e.g. ₹8,50,000" />
                                    <LabeledInput label="Bonus" name="bonus" value={formData.bonus} onChange={handleChange} darkMode={darkMode} placeholder="e.g. ₹50,000" />

                                    <LabeledInput label="Offer Date" name="offerDate" type="date" value={formData.offerDate} onChange={handleChange} error={errors.offerDate} darkMode={darkMode} />
                                    <LabeledInput label="Expiry Date" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} error={errors.expiryDate} darkMode={darkMode} />
                                    <LabeledInput label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} error={errors.startDate} darkMode={darkMode} />

                                    <div>
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Status</label>
                                          <select name="status" value={formData.status} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
                                                <option>Pending</option>
                                                <option>Accepted</option>
                                                <option>Declined</option>
                                          </select>
                                    </div>

                                    <div className="md:col-span-2">
                                          <LabeledInput label="Benefits (comma separated)" name="benefits" value={formData.benefits} onChange={handleChange} darkMode={darkMode} placeholder="Health Insurance, 401k, Stock Options" />
                                    </div>

                                    <div className="md:col-span-2">
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Notes</label>
                                          <textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleChange}
                                                rows="3"
                                                className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                          ></textarea>
                                    </div>
                              </div>

                              <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => navigate("/offer-management")} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition">Cancel</button>
                                    <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition"><Plus size={18} /> Create Offer</button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}

function LabeledInput({ label, name, error, darkMode, ...props }) {
      return (
            <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{label}</label>
                  <input
                        name={name}
                        className={`w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none transition ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"} ${error ? "border-red-500" : ""}`}
                        {...props}
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
      );
}
