// import { useState, useEffect } from "react";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import { MessageCircle, CheckCircle, Clock, XCircle, Calendar, Plus, IndianRupee, User, Paperclip, Trash2, Pencil } from "lucide-react";
// import { fetchNegotiations, updateNegotiation, deleteNegotiation } from "../api/negotiationService";

// export default function NegotiationNotes() {
//       const { darkMode } = useOutletContext();
//       const navigate = useNavigate();
//       const [negotiations, setNegotiations] = useState([]);
//       const [loading, setLoading] = useState(true);
//       const [filterStatus, setFilterStatus] = useState("All Status");
//       const [docInputs, setDocInputs] = useState({});

//       useEffect(() => {
//             fetchNegotiations()
//                   .then(setNegotiations)
//                   .catch(err => console.error(err))
//                   .finally(() => setLoading(false));
//       }, []);

//       const metrics = {
//             totalNegotiations: negotiations.length,
//             active: negotiations.filter(n => n.status === 'Active').length,
//             approved: negotiations.filter(n => n.status === 'Approved').length,
//             rejected: negotiations.filter(n => n.status === 'Rejected').length
//       };

//       const handleDocInputChange = (id, field, value) => {
//             setDocInputs((prev) => ({
//                   ...prev,
//                   [id]: { name: "", url: "", ...(prev[id] || {}), [field]: value }
//             }));
//       };

//       const handleFileChange = (e, id) => {
//             const file = e.target.files[0];
//             if (!file) return;

//             // Validate file size (max 5MB)
//             if (file.size > 5 * 1024 * 1024) {
//                   alert("File size must be less than 5MB");
//                   return;
//             }

//             const reader = new FileReader();
//             reader.onloadend = () => {
//                   setDocInputs((prev) => ({
//                         ...prev,
//                         [id]: {
//                               ...(prev[id] || {}),
//                               name: prev[id]?.name || file.name, // Auto-fill name if empty
//                               url: reader.result
//                         }
//                   }));
//             };
//             reader.readAsDataURL(file);
//       };

//       const handleAddDocument = async (id) => {
//             const input = docInputs[id] || {};
//             if (!input.name || !input.url) return;

//             const negotiation = negotiations.find(n => n.negotiationId === id || n._id === id); // Handle flexible ID match
//             if (!negotiation) return;

//             const updatedDocs = [...(negotiation.documents || []), { name: input.name, url: input.url }];

//             try {
//                   // Assuming backend supports updating partial fields, or we send full object.
//                   // For simplicity, let's assume we can push to documents via a specific endpoint or just update the whole object.
//                   // Since our controller is generic update, we need to send the field we want to update.
//                   // However, typical REST update replaces. Let's send the new documents array.
//                   // We need the database ID (_id) usually for updates, assuming negotiation.negotiationId is used in findOneAndUpdate

//                   // Wait, controller uses negotiationId for update: { negotiationId: req.params.id }
//                   await updateNegotiation(negotiation.negotiationId, { documents: updatedDocs });

//                   setNegotiations((prev) =>
//                         prev.map((neg) =>
//                               neg.negotiationId === id
//                                     ? { ...neg, documents: updatedDocs }
//                                     : neg
//                         )
//                   );

//                   setDocInputs((prev) => ({ ...prev, [id]: { name: "", url: "" } }));
//             } catch (err) {
//                   console.error("Failed to add document", err);
//                   alert("Failed to add document");
//             }
//       };

//       const handleDeleteDocument = async (negotiationId, docIndex) => {
//             if (!window.confirm("Are you sure you want to delete this document?")) return;

//             const negotiation = negotiations.find(n => n.negotiationId === negotiationId || n._id === negotiationId);
//             if (!negotiation) return;

//             const updatedDocs = negotiation.documents.filter((_, idx) => idx !== docIndex);

//             try {
//                   await updateNegotiation(negotiation.negotiationId, { documents: updatedDocs });
//                   setNegotiations((prev) =>
//                         prev.map((neg) =>
//                               neg.negotiationId === negotiationId
//                                     ? { ...neg, documents: updatedDocs }
//                                     : neg
//                         )
//                   );
//             } catch (err) {
//                   console.error("Failed to delete document", err);
//                   alert("Failed to delete document");
//             }
//       };

//       const handleOpenDocument = (doc) => {
//             if (!doc.url) return;

//             // If it's a regular URL, open directly
//             if (doc.url.startsWith('http') || doc.url.startsWith('https')) {
//                   window.open(doc.url, '_blank');
//                   return;
//             }

//             // For Data URLs, open a new window and embed it
//             const win = window.open();
//             if (win) {
//                   win.document.write(
//                         `<iframe src="${doc.url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
//                   );
//             }
//       };

//       const handleEditNegotiation = (negotiation) => {
//             navigate("/add-negotiation", { state: { negotiation } });
//       };

//       const handleDeleteNegotiation = async (id) => {
//             if (!window.confirm("Are you sure you want to delete this negotiation?")) return;
//             try {
//                   await deleteNegotiation(id);
//                   setNegotiations(prev => prev.filter(n => n.negotiationId !== id));
//             } catch (err) {
//                   console.error(err);
//                   alert("Failed to delete negotiation");
//             }
//       };

//       return (
//             <div
//                   className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//                         }`}
//             >
//                   <div className="flex justify-between items-center mb-6">
//                         <h1 className="text-2xl font-bold flex items-center gap-2">
//                               <MessageCircle /> Negotiation Notes & Approvals
//                         </h1>
//                         <button
//                               onClick={() => navigate("/add-negotiation")}
//                               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                         >
//                               <Plus size={18} /> Add Negotiation Notes
//                         </button>
//                   </div>

//                   {/* Metrics Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                         <StatCard
//                               title="Total Negotiations"
//                               value={metrics.totalNegotiations}
//                               icon={<MessageCircle size={24} className="text-blue-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Active"
//                               value={metrics.active}
//                               icon={<Clock size={24} className="text-orange-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Approved"
//                               value={metrics.approved}
//                               icon={<CheckCircle size={24} className="text-green-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Rejected"
//                               value={metrics.rejected}
//                               icon={<XCircle size={24} className="text-red-500" />}
//                               darkMode={darkMode}
//                         />
//                   </div>

//                   {/* Negotiations List */}
//                   <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//                         <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
//                               <h2 className="font-bold text-lg">All Negotiations</h2>
//                               <div className="flex gap-2">
//                                     <select
//                                           value={filterStatus}
//                                           onChange={(e) => setFilterStatus(e.target.value)}
//                                           className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
//                                     >
//                                           <option>All Status</option>
//                                           <option>Active</option>
//                                           <option>Approved</option>
//                                           <option>Rejected</option>
//                                     </select>
//                               </div>
//                         </div>

//                         <div className="divide-y dark:divide-gray-700">
//                               {negotiations.filter(n => filterStatus === "All Status" || n.status === filterStatus).map((negotiation) => (
//                                     <div
//                                           key={negotiation.negotiationId}
//                                           className={`p-4 transition-colors ${darkMode ? "hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
//                                     >
//                                           <div className="flex flex-col gap-4">
//                                                 {/* Header */}
//                                                 <div className="flex items-start justify-between">
//                                                       <div className="flex gap-4 items-start">
//                                                             <CandidateAvatar
//                                                                   src={negotiation.candidateAvatar}
//                                                                   alt={negotiation.candidateName}
//                                                                   darkMode={darkMode}
//                                                             />
//                                                             <div>
//                                                                   <h3 className="font-semibold text-base">{negotiation.candidateName}</h3>
//                                                                   <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
//                                                                         {negotiation.negotiationId} • {negotiation.position}
//                                                                   </p>
//                                                             </div>
//                                                       </div>

//                                                       <div className="flex flex-col gap-2 items-end">
//                                                             <div className="flex gap-2">
//                                                                   <button
//                                                                         onClick={() => handleEditNegotiation(negotiation)}
//                                                                         className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
//                                                                         title="Edit"
//                                                                   >
//                                                                         <Pencil size={16} />
//                                                                   </button>
//                                                                   <button
//                                                                         onClick={() => handleDeleteNegotiation(negotiation.negotiationId)}
//                                                                         className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-500 hover:text-red-700`}
//                                                                         title="Delete"
//                                                                   >
//                                                                         <Trash2 size={16} />
//                                                                   </button>
//                                                             </div>
//                                                             <div className={`px-3 py-1 rounded text-sm font-medium 
//                                                                   ${negotiation.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
//                                                                         negotiation.status === 'Active' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
//                                                                               'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}
//                                                             `}>
//                                                                   {negotiation.status}
//                                                             </div>
//                                                       </div>
//                                                 </div>

//                                                 {/* Offer Details */}
//                                                 <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
//                                                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                                                             <div>
//                                                                   <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Original Offer</p>
//                                                                   <p className="font-semibold flex items-center gap-1">
//                                                                         <IndianRupee size={14} />
//                                                                         {negotiation.originalOffer}
//                                                                   </p>
//                                                             </div>
//                                                             <div>
//                                                                   <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Counter Offer</p>
//                                                                   <p className="font-semibold flex items-center gap-1 text-orange-600 dark:text-orange-400">
//                                                                         <IndianRupee size={14} />
//                                                                         {negotiation.counterOffer}
//                                                                   </p>
//                                                             </div>
//                                                             <div>
//                                                                   <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Final Offer</p>
//                                                                   <p className="font-semibold flex items-center gap-1 text-green-600 dark:text-green-400">
//                                                                         <IndianRupee size={14} />
//                                                                         {negotiation.finalOffer || "Pending"}
//                                                                   </p>
//                                                             </div>
//                                                       </div>
//                                                 </div>

//                                                 {/* Benefits */}
//                                                 {negotiation.benefits.length > 0 && (
//                                                       <div>
//                                                             <p className={`text-xs font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//                                                                   Additional Benefits:
//                                                             </p>
//                                                             <div className="flex flex-wrap gap-2">
//                                                                   {negotiation.benefits.map((benefit, index) => (
//                                                                         <span
//                                                                               key={index}
//                                                                               className={`px-2 py-1 rounded text-xs ${darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700"
//                                                                                     }`}
//                                                                         >
//                                                                               {benefit}
//                                                                         </span>
//                                                                   ))}
//                                                             </div>
//                                                       </div>
//                                                 )}

//                                                 {/* Timeline Notes */}
//                                                 <div>
//                                                       <p className={`text-xs font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//                                                             Negotiation Timeline:
//                                                       </p>
//                                                       <div className="space-y-3">
//                                                             {negotiation.notes.map((note, index) => (
//                                                                   <div
//                                                                         key={index}
//                                                                         className={`pl-4 border-l-2 ${darkMode ? "border-gray-600" : "border-gray-300"
//                                                                               }`}
//                                                                   >
//                                                                         <div className="flex items-center gap-2 text-xs mb-1">
//                                                                               <Calendar size={12} className={darkMode ? "text-gray-500" : "text-gray-400"} />
//                                                                               <span className={darkMode ? "text-gray-400" : "text-gray-500"}>{note.date}</span>
//                                                                               <span className={darkMode ? "text-gray-500" : "text-gray-400"}>•</span>
//                                                                               <User size={12} className={darkMode ? "text-gray-500" : "text-gray-400"} />
//                                                                               <span className={darkMode ? "text-gray-400" : "text-gray-500"}>{note.author}</span>
//                                                                         </div>
//                                                                         <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
//                                                                               {note.content}
//                                                                         </p>
//                                                                   </div>
//                                                             ))}
//                                                       </div>
//                                                 </div>

//                                                 {/* Documents */}
//                                                 <div>
//                                                       <p className={`text-xs font-medium mb-2 flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//                                                             <Paperclip size={14} /> Documents
//                                                       </p>
//                                                       <div className="space-y-2 mb-3">
//                                                             {(negotiation.documents || []).length === 0 && (
//                                                                   <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
//                                                                         No documents attached yet.
//                                                                   </p>
//                                                             )}
//                                                             {(negotiation.documents || []).map((doc, idx) => (
//                                                                   <div key={idx} className="flex items-center gap-2 justify-between group">
//                                                                         <button
//                                                                               onClick={() => handleOpenDocument(doc)}
//                                                                               className={`flex items-center gap-2 text-sm underline hover:opacity-80 ${darkMode ? "text-blue-200" : "text-blue-700"}`}
//                                                                         >
//                                                                               <Paperclip size={14} />
//                                                                               {doc.name}
//                                                                         </button>
//                                                                         <button
//                                                                               onClick={() => handleDeleteDocument(negotiation.negotiationId, idx)}
//                                                                               className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
//                                                                               title="Delete Document"
//                                                                         >
//                                                                               <Trash2 size={14} />
//                                                                         </button>
//                                                                   </div>
//                                                             ))}
//                                                       </div>

//                                                       <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                                                             <input
//                                                                   type="text"
//                                                                   placeholder="Document name"
//                                                                   value={(docInputs[negotiation.negotiationId]?.name) || ""}
//                                                                   onChange={(e) => handleDocInputChange(negotiation.negotiationId, "name", e.target.value)}
//                                                                   className={`text-sm rounded-md px-3 py-2 border w-full ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-200"}`}
//                                                             />
//                                                             <input
//                                                                   type="file"
//                                                                   onChange={(e) => handleFileChange(e, negotiation.negotiationId)}
//                                                                   className={`text-sm rounded-md px-3 py-2 border w-full ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-200"}`}
//                                                             />
//                                                             <button
//                                                                   onClick={() => handleAddDocument(negotiation.negotiationId)}
//                                                                   className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
//                                                             >
//                                                                   <Plus size={16} /> Add Document
//                                                             </button>
//                                                       </div>
//                                                 </div>

//                                                 {/* Approval Info */}
//                                                 {negotiation.approvedBy && (
//                                                       <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
//                                                             Approved by {negotiation.approvedBy} on {negotiation.approvalDate}
//                                                       </div>
//                                                 )}
//                                           </div>
//                                     </div>
//                               ))}
//                         </div>
//                   </div>
//             </div>
//       );
// }

// function StatCard({ title, value, icon, darkMode }) {
//       return (
//             <div
//                   className={`flex items-center p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"
//                         }`}
//             >
//                   <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">{icon}</div>
//                   <div>
//                         <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
//                         <h3 className="text-xl font-bold">{value}</h3>
//                   </div>
//             </div>
//       );
// }

// function CandidateAvatar({ src, alt, darkMode }) {
//       const [error, setError] = useState(false);

//       if (!src || error) {
//             return (
//                   <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
//                         <User size={24} />
//                   </div>
//             );
//       }

//       return (
//             <img
//                   src={src}
//                   alt={alt}
//                   className="w-12 h-12 rounded-full object-cover"
//                   onError={() => setError(true)}
//             />
//       );
// }



import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  MessageCircle, CheckCircle, Clock, XCircle, Plus,
  IndianRupee, Trash2
} from "lucide-react";

import {
  fetchNegotiations,
  deleteNegotiation
} from "../api/negotiationService";

export default function NegotiationNotes() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const [negotiations, setNegotiations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNegotiations()
      .then(setNegotiations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const metrics = {
    total: negotiations.length,
    active: negotiations.filter(n => n.status === "Active").length,
    approved: negotiations.filter(n => n.status === "Approved").length,
    rejected: negotiations.filter(n => n.status === "Rejected").length,
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete negotiation?")) return;
    await deleteNegotiation(id);
    setNegotiations(prev => prev.filter(n => n.negotiationId !== id));
  };

  if (loading) return <p className="ml-64 mt-16">Loading...</p>;

  return (
    <div className={`p-6 ml-64 mt-16 ${darkMode ? "bg-gray-900 text-white" : ""}`}>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold flex gap-2">
          <MessageCircle /> Negotiation Notes
        </h1>
        <button
          onClick={() => navigate("/add-negotiation")}
          className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
        >
          <Plus size={18} /> Add Negotiation
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Metric title="Total" value={metrics.total} icon={<MessageCircle />} />
        <Metric title="Active" value={metrics.active} icon={<Clock />} />
        <Metric title="Approved" value={metrics.approved} icon={<CheckCircle />} />
        <Metric title="Rejected" value={metrics.rejected} icon={<XCircle />} />
      </div>

      {/* List */}
      {negotiations.map(n => (
        <div key={n.negotiationId} className="p-4 bg-white dark:bg-gray-800 rounded mb-4">
          <h3 className="font-semibold">{n.candidateName} — {n.position}</h3>

          <div className="flex gap-6 text-sm mt-2">
            <span><IndianRupee size={14} /> {n.originalOffer}</span>
            <span className="text-orange-600">{n.counterOffer}</span>
            <span className="text-green-600">{n.finalOffer || "Pending"}</span>
          </div>

          <div className="flex justify-between mt-4">
            <span className="text-xs">{n.status}</span>
            <button
              onClick={() => handleDelete(n.negotiationId)}
              className="text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Metric({ title, value, icon }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
