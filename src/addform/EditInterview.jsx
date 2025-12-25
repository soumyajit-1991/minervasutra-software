import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Save } from "lucide-react";
import { fetchInterviewById, updateInterview } from "../api/interviewService";

export default function EditInterview() {
      const { darkMode } = useOutletContext();
      const navigate = useNavigate();
      const { id } = useParams();
      const [loading, setLoading] = useState(true);

      const [formData, setFormData] = useState({
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

      const [errors, setErrors] = useState({});

      useEffect(() => {
            fetchInterviewById(id)
                  .then(data => {
                        setFormData({
                              candidateName: data.candidateName,
                              position: data.position,
                              interviewType: data.interviewType,
                              interviewer: data.interviewer,
                              date: data.date,
                              time: data.time,
                              duration: data.duration,
                              mode: data.mode,
                              location: data.location,
                              notes: data.notes || "",
                              status: data.status
                        });
                  })
                  .catch(err => {
                        console.error("Failed to fetch interview", err);
                        alert("Failed to load interview details");
                        navigate("/interview-scheduling");
                  })
                  .finally(() => setLoading(false));
      }, [id, navigate]);

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            setErrors({ ...errors, [name]: "" });
      };

      const validateForm = () => {
            const newErrors = {};
            if (!formData.candidateName.trim()) newErrors.candidateName = "Candidate Name is required";
            if (!formData.position.trim()) newErrors.position = "Position is required";
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
                  await updateInterview(id, formData);
                  alert("Interview updated successfully!");
                  navigate("/interview-scheduling");
            } catch (err) {
                  alert(err.message || "Failed to update interview");
            }
      };

      if (loading) {
            return (
                  <div className={`ml-64 mt-16 p-6 min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
                        Loading...
                  </div>
            );
      }

      return (
            <div className={`p-6 ml-64 mt-16 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                  <h2 className="text-2xl font-bold mb-6">Edit Interview</h2>
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <LabeledInput label="Candidate Name" name="candidateName" value={formData.candidateName} onChange={handleChange} error={errors.candidateName} darkMode={darkMode} />
                                    <LabeledInput label="Position" name="position" value={formData.position} onChange={handleChange} error={errors.position} darkMode={darkMode} />

                                    <div>
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Interview Type</label>
                                          <select name="interviewType" value={formData.interviewType} onChange={handleChange}>
  <option>Phone Screening</option>
  <option>Technical Interview</option>
  <option>Panel Interview</option>
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

                                    <div className="md:col-span-2">
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Status</label>
                                          <select name="status" value={formData.status} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
                                                <option>Scheduled</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>
                                          </select>
                                    </div>
                              </div>

                              <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => navigate("/interview-scheduling")} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition">Cancel</button>
                                    <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition"><Save size={18} /> Save Changes</button>
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
