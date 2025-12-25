import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { FileSignature, CheckCircle, Clock, XCircle, Calendar, Plus, IndianRupee, Briefcase, Award } from "lucide-react";
import { fetchOffers, deleteOffer } from "../api/offerService";

export default function OfferManagement() {
      const { darkMode } = useOutletContext();
      const navigate = useNavigate();
      const [offers, setOffers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [statusFilter, setStatusFilter] = useState("All Status");

      useEffect(() => {
            fetchOffers()
                  .then(setOffers)
                  .catch(err => console.error(err))
                  .finally(() => setLoading(false));
      }, []);

      const handleDelete = async (offerId, mongoId) => {
            if (window.confirm("Are you sure you want to delete this offer?")) {
                  try {
                        // Use MongoDB _id for API call
                        await deleteOffer(mongoId);
                        // Filter by custom id for state update
                        setOffers(prev => prev.filter(o => o.id !== offerId));
                        alert("Offer deleted successfully!");
                  } catch (err) {
                        console.error("Delete error:", err);
                        alert(err.message || "Failed to delete offer");
                  }
            }
      };

      const metrics = useMemo(() => {
            return {
                  totalOffers: offers.length,
                  pending: offers.filter(o => o.status === 'Pending').length,
                  accepted: offers.filter(o => o.status === 'Accepted').length,
                  declined: offers.filter(o => o.status === 'Declined').length
            };
      }, [offers]);

      const filteredOffers = useMemo(() => {
            if (statusFilter === "All Status") return offers;
            return offers.filter(o => o.status === statusFilter);
      }, [offers, statusFilter]);

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                              <FileSignature /> Offer Management
                        </h1>
                        <Link to="/add-offer" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <Plus size={18} /> Create Offer
                        </Link>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Total Offers"
                              value={metrics.totalOffers}
                              icon={<FileSignature size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Pending Response"
                              value={metrics.pending}
                              icon={<Clock size={24} className="text-orange-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Accepted"
                              value={metrics.accepted}
                              icon={<CheckCircle size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Declined"
                              value={metrics.declined}
                              icon={<XCircle size={24} className="text-red-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Offers List */}
                  <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                              <h2 className="font-bold text-lg">All Offers</h2>
                              <div className="flex gap-2">
                                    <select
                                          value={statusFilter}
                                          onChange={(e) => setStatusFilter(e.target.value)}
                                          className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
                                    >
                                          <option>All Status</option>
                                          <option>Pending</option>
                                          <option>Accepted</option>
                                          <option>Declined</option>
                                    </select>
                              </div>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                              {filteredOffers.length === 0 && !loading ? (
                                    <div className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          No offers found. Click "Create Offer" to add one.
                                    </div>
                              ) : (
                                    filteredOffers.map((offer) => (
                                          <div
                                                key={offer.id}
                                                className={`p-4 transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
                                          >
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                      <div className="flex gap-4 items-start flex-1">
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
                                                                  <FileSignature size={24} />
                                                            </div>

                                                            <div className="flex-1">
                                                                  <div className="flex items-start justify-between gap-2">
                                                                        <div>
                                                                              <h3 className="font-semibold text-base">{offer.candidateName}</h3>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                                    {offer.id} • {offer.position}
                                                                              </p>
                                                                        </div>
                                                                  </div>

                                                                  {/* Department */}
                                                                  <div className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                                                        {offer.department}
                                                                  </div>

                                                                  {/* Compensation */}
                                                                  <div className="flex flex-wrap gap-3 mt-3 text-sm">
                                                                        <div className={`flex items-center gap-1 font-medium ${darkMode ? "text-green-400" : "text-green-600"}`}>
                                                                              <IndianRupee size={14} />
                                                                              <span>{offer.salary}/year</span>
                                                                        </div>
                                                                        <div className={`flex items-center gap-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                                                                              <Award size={14} />
                                                                              <span>Bonus: {offer.bonus}</span>
                                                                        </div>
                                                                  </div>

                                                                  {/* Dates */}
                                                                  <div className="flex flex-wrap gap-3 mt-2 text-xs">
                                                                        <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                              <Calendar size={12} />
                                                                              <span>Offer Date: {offer.offerDate}</span>
                                                                        </div>
                                                                        <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                              <Calendar size={12} />
                                                                              <span>Expires: {offer.expiryDate}</span>
                                                                        </div>
                                                                        <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                              <Briefcase size={12} />
                                                                              <span>Start: {offer.startDate}</span>
                                                                        </div>
                                                                  </div>

                                                                  {/* Benefits */}
                                                                  <div className="flex flex-wrap gap-2 mt-3">
                                                                        {offer.benefits.map((benefit, index) => (
                                                                              <span
                                                                                    key={index}
                                                                                    className={`px-2 py-1 rounded text-xs ${darkMode ? "bg-gray-700 text-gray-300" : "bg-blue-50 text-blue-700"
                                                                                          }`}
                                                                              >
                                                                                    {benefit}
                                                                              </span>
                                                                        ))}
                                                                  </div>

                                                                  {/* Notes */}
                                                                  {offer.notes && (
                                                                        <div className={`mt-2 text-xs italic ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                                              Note: {offer.notes}
                                                                        </div>
                                                                  )}

                                                                  {/* Recruiter */}
                                                                  <div className={`mt-2 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                                        Recruiter: {offer.recruiter}
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="flex flex-col gap-2 items-end min-w-[180px]">
                                                            {/* Status Badge */}
                                                            <div className={`px-3 py-2 rounded text-sm font-medium 
                                                                  ${offer.status === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                                                        offer.status === 'Pending' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                                                                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}
                                                            `}>
                                                                  {offer.status}
                                                            </div>

                                                            {/* Response Deadline */}
                                                            {/* <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                  Response by: {offer.responseDeadline}
                                                            </div> */}

                                                            <div className="flex gap-2 mt-2">
                                                                  <button
                                                                        onClick={() => navigate(`/edit-offer/${offer._id}`)}
                                                                        className={`text-xs px-3 py-1 rounded ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
                                                                  >
                                                                        Edit
                                                                  </button>
                                                                  <button
                                                                        onClick={() => handleDelete(offer.id, offer._id)}
                                                                        className={`text-xs px-3 py-1 rounded ${darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-600 hover:bg-red-700"} text-white transition-colors`}
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))
                              )}
                        </div>
                  </div>
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
