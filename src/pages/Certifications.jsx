import { useOutletContext } from "react-router-dom";
import { Award, CheckCircle, Clock, XCircle, Calendar, Plus, ExternalLink, ShieldCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchCertifications, createCertification, deleteCertification } from "../api/certificationService";

export default function Certifications() {
      const { darkMode } = useOutletContext();
      const [certifications, setCertifications] = useState([]);
      const [loading, setLoading] = useState(true);
      const [professionFilter, setProfessionFilter] = useState("All");
const [expiryFilter, setExpiryFilter] = useState("All"); // All | Expired


      const handleAddCertification = () => {
            setShowModal(true);
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await createCertification(formData);
                  setShowModal(false);
                  setFormData({ name: '', employee: '', category: 'Professional Certification', issuer: '', issueDate: '', expiryDate: '', certificateNumber: '' });
                  loadCertifications();
            } catch (error) {
                  alert('Failed to create certification: ' + error.message);
            }
      };
      const getFilteredCertifications = () => {
  return certifications.filter((cert) => {
    // Filter by profession
    const professionMatch =
      professionFilter === "All" || cert.category === professionFilter;

    // Filter by expiry
    const expiryMatch =
      expiryFilter === "All" || cert.status === "Expired";

    return professionMatch && expiryMatch;
  });
};

      const handleDelete = async (id) => {
            if (window.confirm('Delete this certification?')) {
                  try {
                        await deleteCertification(id);
                        loadCertifications();
                  } catch (error) {
                        alert('Failed to delete certification: ' + error.message);
                  }
            }
      };

      const [showModal, setShowModal] = useState(false);
      // const [formData, setFormData] = useState({
      //       name: '',
      //       employee: '',
      //       category: 'Professional Certification',
      //       issuer: '',
      //       issueDate: '',
      //       expiryDate: '',
      //       certificateNumber: ''
      // });

      const [formData, setFormData] = useState({
  name: '',
  employee: '',
  category: 'Professional Certification',
  issuer: '',
  issueDate: '',
  expiryDate: '',
  certificateNumber: '',
  certificateImage: null // ✅ NEW
});


const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setFormData((prev) => ({
      ...prev,
      certificateImage: reader.result
    }));
  };
  reader.readAsDataURL(file);
};


      useEffect(() => {
            loadCertifications();
      }, []);

      const loadCertifications = async () => {
            try {
                  const data = await fetchCertifications();
                  setCertifications(data);
            } catch (error) {
                  console.error('Failed to load certifications:', error);
            } finally {
                  setLoading(false);
            }
      };

      const metrics = {
            totalCertifications: certifications.length,
            active: certifications.filter(c => c.status === 'Active').length,
            expiring: certifications.filter(c => c.status === 'Expiring Soon').length,
            expired: certifications.filter(c => c.status === 'Expired').length
      };

      if (loading) {
            return (
                  <div className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
                        <div className="text-center py-12">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                              <p className="mt-4">Loading certifications...</p>
                        </div>
                  </div>
            );
      }

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <Award /> Certifications
                        </h1>
                        <button 
                              onClick={handleAddCertification}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                              <Plus size={18} /> Add Certification
                        </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Certifications"
                              value={metrics.totalCertifications}
                              icon={<Award size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Active"
                              value={metrics.active}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Expiring Soon"
                              value={metrics.expiring}
                              icon={<Clock size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Expired"
                              value={metrics.expired}
                              icon={<XCircle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Certifications List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">All Certifications</h2>
                              <div className="flex gap-2">
                                    <select
  value={expiryFilter}
  onChange={(e) => setExpiryFilter(e.target.value)}
  className="text-sm rounded-md px-2 py-1 border"
>
  <option value="All">All Status</option>
  <option value="Expired">Expired</option>
</select>

                                    <select
  value={professionFilter}
  onChange={(e) => setProfessionFilter(e.target.value)}
  className="text-sm rounded-md px-2 py-1 border"
>
  <option value="All">All Professions</option>
  <option value="Professional License">Professional License</option>
  <option value="Professional Certification">Professional Certification</option>
  <option value="Specialized Training">Specialized Training</option>
</select>

                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {certifications.length === 0 ? (
                                    <div className="p-8 text-center">
                                          <Award size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
                                          <p className="text-lg font-medium">No certifications available</p>
                                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Employee certifications will appear here</p>
                                    </div>
                              ) : (
                                 getFilteredCertifications().map((cert) => (
                                          <div key={cert._id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                                                <div className="flex justify-between items-start">
                                                      <div className="flex-1">
                                                            <h3 className="font-semibold">{cert.name}</h3>
                                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>Employee: {cert.employee}</p>
                                                            <div className="flex items-center gap-4 mt-2 text-xs">
                                                                  <span>Issuer: {cert.issuer}</span>
                                                                  <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                                                                  <span className={`px-2 py-1 rounded ${cert.category === 'Professional License' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                                        {cert.category}
                                                                  </span>
                                                            </div>
                                                            {cert.certificateImage && (
                                                                  <img
                                                                  src={cert.certificateImage}
                                                                  alt="Certificate"
                                                                  className="mt-3 w-32 h-20 object-cover rounded border"
                                                                  />
                                                            )}

                                                      </div>
                                                      <button onClick={() => handleDelete(cert._id)} className="text-red-500 hover:text-red-700 p-1">
                                                            <X size={16} />
                                                      </button>
                                                </div>
                                          </div>
                                    ))
                              )}
                        </div>
                  </div>

                  {/* Modal */}
                  {showModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                              <div className={`w-full max-w-md p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                    <h2 className="text-lg font-bold mb-4">Add New Certification</h2>
                                    <form onSubmit={handleSubmit} className="flex flex-col h-full">

                                          <input
                                                type="text"
                                                placeholder="Certification Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <input
                                                type="text"
                                                placeholder="Employee Name"
                                                value={formData.employee}
                                                onChange={(e) => setFormData({...formData, employee: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                          <option>All Categories</option>
                                          <option>Professional License</option>
                                          <option>Professional Certification</option>
                                          <option>Specialized Training</option>
                                    </select>
                                          <input
                                                type="text"
                                                placeholder="Issuing Organization"
                                                value={formData.issuer}
                                                onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <input
                                                type="date"
                                                placeholder="Issue Date"
                                                value={formData.issueDate}
                                                onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <input
                                                type="date"
                                                placeholder="Expiry Date"
                                                value={formData.expiryDate}
                                                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                                                required
                                          />
                                          <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className={`w-full p-2 border rounded ${darkMode
                                                ? "bg-gray-700 border-gray-600"
                                                : "bg-white border-gray-300"
                                                }`}
                                                />

                                                {formData.certificateImage && (
                                                <img
                                                src={formData.certificateImage}
                                                alt="Certificate Preview"
                                                className="mt-2 w-full h-40 object-contain border rounded"
                                          />
                                                )}

                                          <div className="flex gap-2">
                                                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                                      Add Certification
                                                </button>
                                                <button type="button" onClick={() => setShowModal(false)} className={`flex-1 py-2 rounded ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}>
                                                      Cancel
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