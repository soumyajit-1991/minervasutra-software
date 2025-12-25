// import { useState, useEffect } from "react";
// import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
// import { Plus, Save } from "lucide-react";
// import { createNegotiation, updateNegotiation } from "../api/negotiationService";

// export default function AddNegotiation() {
//       const { darkMode } = useOutletContext();
//       const navigate = useNavigate();
//       const location = useLocation();
//       const editingNegotiation = location.state?.negotiation;

//       const [formData, setFormData] = useState({
//             candidateName: "",
//             position: "",
//             originalOffer: "",
//             counterOffer: "",
//             finalOffer: "",
//             benefits: "",
//             initialNote: "",
//             author: "Me",
//             status: "Active"
//       });

//       useEffect(() => {
//             if (editingNegotiation) {
//                   setFormData({
//                         candidateName: editingNegotiation.candidateName,
//                         position: editingNegotiation.position,
//                         originalOffer: editingNegotiation.originalOffer,
//                         counterOffer: editingNegotiation.counterOffer,
//                         finalOffer: editingNegotiation.finalOffer || "",
//                         benefits: (editingNegotiation.benefits || []).join(", "),
//                         initialNote: editingNegotiation.notes?.[0]?.content || "",
//                         author: editingNegotiation.notes?.[0]?.author || "Me",
//                         status: editingNegotiation.status
//                   });
//             }
//       }, [editingNegotiation]);

//       const [errors, setErrors] = useState({});

//       const handleChange = (e) => {
//             const { name, value } = e.target;
//             setFormData({ ...formData, [name]: value });
//             setErrors({ ...errors, [name]: "" });
//       };

//       const validateForm = () => {
//             const newErrors = {};
//             if (!formData.candidateName.trim()) newErrors.candidateName = "Candidate Name is required";
//             if (!formData.position.trim()) newErrors.position = "Position is required";
//             if (!formData.originalOffer.trim()) newErrors.originalOffer = "Original Offer is required";
//             if (!formData.counterOffer.trim()) newErrors.counterOffer = "Counter Offer is required";
//             if (!formData.initialNote.trim()) newErrors.initialNote = "Initial Note is required";
//             return newErrors;
//       };

//       const handleSubmit = async (e) => {
//             e.preventDefault();
//             const validationErrors = validateForm();
//             if (Object.keys(validationErrors).length > 0) {
//                   setErrors(validationErrors);
//                   return;
//             }

//             try {
//                   const negotiationData = {
//                         candidateName: formData.candidateName,
//                         position: formData.position,
//                         originalOffer: formData.originalOffer,
//                         counterOffer: formData.counterOffer,
//                         finalOffer: formData.finalOffer,
//                         status: formData.status,
//                         benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
//                         notes: [{
//                               date: new Date().toISOString().split('T')[0],
//                               author: formData.author,
//                               content: formData.initialNote
//                         }],
//                         // Preserve documents if editing, though this form doesn't edit them directly yet
//                         documents: editingNegotiation?.documents || []
//                   };

//                   if (editingNegotiation) {
//                         await updateNegotiation(editingNegotiation.negotiationId, negotiationData);
//                         alert("Negotiation note updated successfully!");
//                   } else {
//                         await createNegotiation(negotiationData);
//                         alert("Negotiation note created successfully!");
//                   }
//                   navigate("/negotiation-notes");
//             } catch (err) {
//                   alert(err.message || "Failed to save negotiation");
//             }
//       };

//       return (
//             <div className={`p-6 ml-64 mt-16 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
//                   <h2 className="text-2xl font-bold mb-6">{editingNegotiation ? "Edit Negotiation Note" : "Add Negotiation Note"}</h2>
//                   <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <LabeledInput label="Candidate Name" name="candidateName" value={formData.candidateName} onChange={handleChange} error={errors.candidateName} darkMode={darkMode} />
//                                     <LabeledInput label="Position" name="position" value={formData.position} onChange={handleChange} error={errors.position} darkMode={darkMode} />

//                                     <LabeledInput label="Original Offer" name="originalOffer" value={formData.originalOffer} onChange={handleChange} error={errors.originalOffer} darkMode={darkMode} placeholder="e.g. 80,000" />
//                                     <LabeledInput label="Counter Offer" name="counterOffer" value={formData.counterOffer} onChange={handleChange} error={errors.counterOffer} darkMode={darkMode} placeholder="e.g. 90,000" />
//                                     <LabeledInput label="Final Offer (Optional)" name="finalOffer" value={formData.finalOffer} onChange={handleChange} darkMode={darkMode} placeholder="e.g. 85,000" />

//                                     <div>
//                                           <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Status</label>
//                                           <select name="status" value={formData.status} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}>
//                                                 <option>Active</option>
//                                                 <option>Approved</option>
//                                                 <option>Rejected</option>
//                                           </select>
//                                     </div>

//                                     <div className="md:col-span-2">
//                                           <LabeledInput label="Benefits (comma separated)" name="benefits" value={formData.benefits} onChange={handleChange} darkMode={darkMode} placeholder="Remote Work, Sign-on Bonus" />
//                                     </div>

//                                     <div className="md:col-span-2">
//                                           <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Initial Note</label>
//                                           <textarea
//                                                 name="initialNote"
//                                                 value={formData.initialNote}
//                                                 onChange={handleChange}
//                                                 rows="3"
//                                                 className={`w-full p-2 rounded border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"} ${errors.initialNote ? "border-red-500" : ""}`}
//                                                 placeholder="Candidate requested higher base salary due to competitive offer..."
//                                           ></textarea>
//                                           {errors.initialNote && <p className="text-red-500 text-xs mt-1">{errors.initialNote}</p>}
//                                     </div>
//                               </div>

//                               <div className="flex justify-end gap-3 mt-6">
//                                     <button type="button" onClick={() => navigate("/negotiation-notes")} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition">Cancel</button>
//                                     <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition">
//                                           {editingNegotiation ? <Save size={18} /> : <Plus size={18} />}
//                                           {editingNegotiation ? "Update Negotiation" : "Create Negotiation"}
//                                     </button>
//                               </div>
//                         </form>
//                   </div>
//             </div>
//       );
// }

// function LabeledInput({ label, name, error, darkMode, ...props }) {
//       return (
//             <div>
//                   <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{label}</label>
//                   <input
//                         name={name}
//                         className={`w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none transition ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"} ${error ? "border-red-500" : ""}`}
//                         {...props}
//                   />
//                   {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//             </div>
//       );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNegotiation } from "../api/negotiationService";

export default function AddNegotiation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    candidateName: "",
    position: "",
    originalOffer: "",
    counterOffer: "",
    benefits: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNegotiation({
        candidateName: formData.candidateName,
        position: formData.position,
        originalOffer: Number(formData.originalOffer),
        counterOffer: Number(formData.counterOffer),
        benefits: formData.benefits
          ? formData.benefits.split(",").map((b) => b.trim())
          : [],
        status: "Active",
        notes: [
          {
            content: formData.notes,
            author: "HR",
            date: new Date().toLocaleDateString(),
          },
        ],
      });

      navigate("/negotiation-notes");
    } catch (err) {
      console.error(err);
      alert("Failed to create negotiation");
    }
  };

  return (
    <div className="p-6 ml-64 mt-16">
      <h2 className="text-xl font-bold mb-4">Add Negotiation</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="candidateName"
          placeholder="Candidate Name"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="position"
          placeholder="Position"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="originalOffer"
          type="number"
          placeholder="Original Offer"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="counterOffer"
          type="number"
          placeholder="Counter Offer"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="benefits"
          placeholder="Benefits (comma separated)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="notes"
          placeholder="Initial negotiation note"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Negotiation
        </button>
      </form>
    </div>
  );
}
