// import { useState } from "react";
// import { Plus } from "lucide-react";

// export default function AdminPayments() {
//   const [showForm, setShowForm] = useState(false);
//   const [payments, setPayments] = useState([]);

//   const [formData, setFormData] = useState({
//     clientName: "",
//     clientEmail: "",
//     status: "Pending",
//     amount: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setPayments([
//       ...payments,
//       { ...formData, id: Date.now() }
//     ]);

//     setFormData({
//       clientName: "",
//       clientEmail: "",
//       status: "Pending",
//       amount: ""
//     });

//     setShowForm(false);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen relative">
//       {/* ===== HEADER ===== */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Payments</h1>

//         <button
//           onClick={() => setShowForm(true)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           <Plus size={18} />
//           Add Payment
//         </button>
//       </div>

//       {/* ===== PAYMENTS TABLE ===== */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-3">Client</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Amount</th>
//               <th className="p-3">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="p-6 text-center text-gray-500">
//                   No payments added yet
//                 </td>
//               </tr>
//             ) : (
//               payments.map((p) => (
//                 <tr key={p.id} className="border-t">
//                   <td className="p-3">{p.clientName}</td>
//                   <td className="p-3">{p.clientEmail}</td>
//                   <td className="p-3 font-medium">₹{p.amount}</td>
//                   <td className="p-3">
//                     <span
//                       className={`px-3 py-1 text-xs rounded-full font-medium ${
//                         p.status === "Done"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {p.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ===== SLIDE FORM ===== */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/30 flex justify-end">
//           <div className="w-full max-w-md bg-white h-full p-6 shadow-xl">
//             <h2 className="text-xl font-bold mb-4">Add Payment</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 name="clientName"
//                 placeholder="Client Name"
//                 required
//                 value={formData.clientName}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <input
//                 name="clientEmail"
//                 type="email"
//                 placeholder="Client Email"
//                 required
//                 value={formData.clientEmail}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               >
//                 <option>Pending</option>
//                 <option>Done</option>
//               </select>

//               <input
//                 name="amount"
//                 type="number"
//                 placeholder="Amount"
//                 required
//                 value={formData.amount}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-4 py-2 border rounded"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import axios from "axios";

export default function AdminPayments() {
  const [showForm, setShowForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null); // ⭐ edit mode

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    status: "Pending",
    amount: ""
  });

  // FETCH PAYMENTS
  const fetchPayments = async () => {
    const res = await axios.get("https://hr-management-backend-sable.vercel.app/api/payments");
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // SAVE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        // 🔁 UPDATE
        await axios.put(
          `https://hr-management-backend-sable.vercel.app/api/payments/${editId}`,
          { ...formData, amount: Number(formData.amount) }
        );
      } else {
        // ➕ CREATE
        await axios.post("https://hr-management-backend-sable.vercel.app/api/payments", {
          ...formData,
          amount: Number(formData.amount)
        });
      }

      resetForm();
      fetchPayments();
    } catch (err) {
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // EDIT CLICK
  const handleEdit = (payment) => {
    setEditId(payment._id);
    setFormData({
      clientName: payment.clientName,
      clientEmail: payment.clientEmail,
      status: payment.status,
      amount: payment.amount
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditId(null);
    setShowForm(false);
    setFormData({
      clientName: "",
      clientEmail: "",
      status: "Pending",
      amount: ""
    });
  };

  return (
    
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <Plus size={18} /> Add Payment
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-1">Client</th>
              <th className="p-1">Email</th>
              <th className="p-1">Amount</th>
              <th className="p-1">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-3 text-center ">{p.clientName}</td>
                <td className="p-3 text-center">{p.clientEmail}</td>
                <td className="p-3 text-center">₹{p.amount}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      p.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:underline flex items-center gap-1 text-right"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SLIDE FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Payment" : "Add Payment"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="clientName"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                name="clientEmail"
                type="email"
                placeholder="Client Email"
                value={formData.clientEmail}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option>Pending</option>
                <option>Done</option>
              </select>

              <input
                name="amount"
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
