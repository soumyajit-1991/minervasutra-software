import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Plus, Camera, X } from "lucide-react";
import { createCandidate } from "../api/candidateService";

export default function AddCandidate() {
      const { darkMode } = useOutletContext();
      const navigate = useNavigate();

      const [formData, setFormData] = useState({
            name: "",
            email: "",
            phone: "",
            position: "",
            experience: "",
            recruiter: "",
            stage: "Screening",
            status: "Active",
            rating: 0,
            avatar: ""
      });

      const [errors, setErrors] = useState({});
      const [imagePreview, setImagePreview] = useState(null);

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            setErrors({ ...errors, [name]: "" });
      };

      const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  // Validate file type
                  if (!file.type.startsWith('image/')) {
                        alert('Please select a valid image file');
                        return;
                  }

                  // Validate file size (max 5MB)
                  if (file.size > 5 * 1024 * 1024) {
                        alert('Image size should be less than 5MB');
                        return;
                  }

                  const reader = new FileReader();
                  reader.onloadend = () => {
                        const base64String = reader.result;
                        setImagePreview(base64String);
                        setFormData({ ...formData, avatar: base64String });
                  };
                  reader.readAsDataURL(file);
            }
      };

      const handleRemoveImage = () => {
            setImagePreview(null);
            setFormData({ ...formData, avatar: "" });
      };

      const validateForm = () => {
            const newErrors = {};
            if (!formData.name.trim()) newErrors.name = "Name is required";
            if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Invalid email";
            if (!formData.phone.trim()) newErrors.phone = "Phone is required";
            if (!formData.position.trim()) newErrors.position = "Position is required";
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
                  await createCandidate(formData);
                  alert("Candidate added successfully!");
                  navigate("/candidate-pipeline");
            } catch (err) {
                  alert(err.message || "Failed to add candidate");
            }
      };

      return (
            <div className={`p-6 ml-64 mt-16 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                  <h2 className="text-2xl font-bold mb-6">Add New Candidate</h2>
                  <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                              {/* Image Upload Section */}
                              <div className="flex flex-col items-center mb-6">
                                    <div className="relative">
                                          {imagePreview ? (
                                                <div className="relative">
                                                      <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                                                      />
                                                      <button
                                                            type="button"
                                                            onClick={handleRemoveImage}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                                      >
                                                            <X size={18} />
                                                      </button>
                                                </div>
                                          ) : (
                                                <div className={`w-32 h-32 rounded-full flex items-center justify-center border-2 border-dashed ${darkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"}`}>
                                                      <Camera size={40} className={darkMode ? "text-gray-500" : "text-gray-400"} />
                                                </div>
                                          )}
                                    </div>
                                    <label className="mt-3 cursor-pointer">
                                          <span className={`px-4 py-2 rounded-lg text-sm font-medium transition ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white inline-flex items-center gap-2`}>
                                                <Camera size={16} />
                                                {imagePreview ? "Change Picture" : "Upload Picture"}
                                          </span>
                                          <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                          />
                                    </label>
                                    <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          JPG, PNG or WebP (Max 5MB)
                                    </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <LabeledInput label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} darkMode={darkMode} />
                                    <LabeledInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} darkMode={darkMode} />
                                    <LabeledInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} darkMode={darkMode} />
                                    <LabeledInput label="Position" name="position" value={formData.position} onChange={handleChange} error={errors.position} darkMode={darkMode} placeholder="e.g. Senior Developer" />
                                    <LabeledInput label="Experience" name="experience" value={formData.experience} onChange={handleChange} darkMode={darkMode} placeholder="e.g. 5 years" />
                                    <LabeledInput label="Recruiter Name" name="recruiter" value={formData.recruiter} onChange={handleChange} darkMode={darkMode} />

                                    <div>
                                          <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Stage</label>
                                          <select name="stage" value={formData.stage} onChange={handleChange} className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
                                                <option>Screening</option>
                                                <option>Phone Interview</option>
                                                <option>Technical Interview</option>
                                                <option>Final Interview</option>
                                                <option>Offer</option>
                                                <option>Rejected</option>
                                          </select>
                                    </div>

                                    <LabeledInput label="Initial Rating (0-5)" name="rating" type="number" min="0" max="5" value={formData.rating} onChange={handleChange} darkMode={darkMode} />
                              </div>

                              <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => navigate("/candidate-pipeline")} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition">Cancel</button>
                                    <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition"><Plus size={18} /> Add Candidate</button>
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
