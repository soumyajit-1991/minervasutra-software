import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Plus, Save } from "lucide-react";
import { createInterview } from "../api/interviewService";
import { fetchCandidates } from "../api/candidateService";

export default function AddInterview() {
      const { darkMode } = useOutletContext();
      const navigate = useNavigate();

      const [formData, setFormData] = useState({
            candidateId: "",
            candidateName: "",
            position: "",
            interviewType: "Phone Screening",
            interviewer: "",
            date: "",
            time: "",
            duration: "45 min",
            mode: "Virtual",
            location: "",
            notes: "",
            status: "Scheduled"
      });

      const [candidates, setCandidates] = useState([]);
      const [errors, setErrors] = useState({});

      useEffect(() => {
            fetchCandidates().then(setCandidates).catch(console.error);
      }, []);

      const handleChange = (e) => {
            const { name, value } = e.target;
            if (name === 'candidateId') {
                  const selectedCandidate = candidates.find(c => c._id === value);
                  setFormData({ 
                        ...formData, 
                        candidateId: value,
                        candidateName: selectedCandidate?.name || '',
                        position: selectedCandidate?.position || ''
                  });
            } else {
                  setFormData({ ...formData, [name]: value });
            }
            setErrors({ ...errors, [name]: "" });
      };

      const validateForm = () => {
            const newErrors = {};
            if (!formData.candidateId) newErrors.candidateId = "Please select a candidate";
            if (!formData.interviewer.trim()) newErrors.interviewer = "Interviewer is required";
            if (!formData.date) newErrors.date = "Date is required";
            if (!formData.time) newErrors.time = "Time is required";
            if (!formData.location.trim()) newErrors.location = "Location/Link is required";
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
                  await createInterview(formData);
                  alert("Interview scheduled successfully!");
                  navigate("/interview-scheduling");
            } catch (err) {
                  alert(err.message || "Failed to schedule interview");
            }
      };

      return (
            <div className={`p-6 ml-64 mt-16 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                  <h2 className="text-2xl font-bold mb-6">Schedule New Interview</h2>
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Select Candidate *</label>
                                          <select 
                                                name="candidateId" 
                                                value={formData.candidateId} 
                                                onChange={handleChange} 
                                                className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"} ${errors.candidateId ? "border-red-500" : ""}`}
                                                required
                                          >
                                                <option value="">Select a candidate</option>
                                                {candidates.map(candidate => (
                                                      <option key={candidate._id} value={candidate._id}>
                                                            {candidate.name} - {candidate.position}
                                                      </option>
                                                ))}
                                          </select>
                                          {errors.candidateId && <p className="text-red-500 text-xs mt-1">{errors.candidateId}</p>}
                                    </div>
                                    <LabeledInput label="Position" name="position" value={formData.position} onChange={handleChange} error={errors.position} darkMode={darkMode} readOnly />

                                    <div>
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Interview Type</label>
                                          <select name="interviewType" value={formData.interviewType} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
                                                <option>Phone Screening</option>
                                                <option>Technical Assessment</option>
                                                <option>First Round</option>
                                                <option>Final Interview</option>
                                                <option>HR Round</option>
                                          </select>
                                    </div>

                                    <LabeledInput label="Interviewer" name="interviewer" value={formData.interviewer} onChange={handleChange} error={errors.interviewer} darkMode={darkMode} />

                                    <LabeledInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} error={errors.date} darkMode={darkMode} />

                                    <div className="flex gap-2">
                                          <div className="flex-1">
                                                <LabeledInput label="Time" name="time" type="time" value={formData.time} onChange={handleChange} error={errors.time} darkMode={darkMode} />
                                          </div>
                                          <div className="flex-1">
                                                <LabeledInput label="Duration" name="duration" value={formData.duration} onChange={handleChange} darkMode={darkMode} placeholder="e.g. 45 min" />
                                          </div>
                                    </div>

                                    <div>
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Mode</label>
                                          <select name="mode" value={formData.mode} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
                                                <option>Virtual</option>
                                                <option>Phone</option>
                                                <option>In-person</option>
                                          </select>
                                    </div>

                                    <LabeledInput label={formData.mode === 'Virtual' ? "Video Link" : "Location"} name="location" value={formData.location} onChange={handleChange} error={errors.location} darkMode={darkMode} placeholder={formData.mode === 'Virtual' ? "https://meet.google.com/..." : "Room 302 / Office Address"} />

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
                                    <button type="button" onClick={() => navigate("/interview-scheduling")} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition">Cancel</button>
                                    <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition"><Plus size={18} /> Schedule Interview</button>
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
