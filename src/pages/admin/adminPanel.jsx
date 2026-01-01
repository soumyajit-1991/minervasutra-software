// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import adminPayments from "./adminPayment.jsx";

// // export default function AdminPanel() {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState("Clients");

// //   // 🔐 PROTECT ADMIN ROUTE
// //   useEffect(() => {
// //     const role = localStorage.getItem("role");
// //     if (role !== "admin") {
// //       navigate("/login");
// //     }
// //   }, [navigate]);

// //   return (
// //     <div className="flex min-h-screen bg-gray-100">
// //       {/* ===== SIDEBAR ===== */}
// //       <aside className="w-64 bg-white shadow-md">
// //         <div className="p-6 text-xl font-bold border-b">
// //           Admin Panel
// //         </div>

// //         <nav className="flex flex-col p-4 gap-2">
// //           {["Clients", "Payments", "Support"].map((tab) => (
// //             <button
// //               key={tab}
// //               onClick={() => setActiveTab(tab)}
// //               className={`text-left px-4 py-2 rounded transition ${
// //                 activeTab === tab
// //                   ? "bg-blue-100 text-blue-600 font-semibold"
// //                   : "text-gray-600 hover:bg-gray-100"
// //               }`}
// //             >
// //               {tab}
// //             </button>
// //           ))}
// //         </nav>
// //       </aside>

// //       {/* ===== MAIN CONTENT ===== */}
// //       <main className="flex-1 p-8">
// //         {activeTab === "Clients" && <Clients />}
// //         {activeTab === "Payments" && navigate("/admin-payment")}
// //         {activeTab === "Support" && <Support />}
// //       </main>
// //     </div>
// //   );
// // }

// // /* ===================== TABS ===================== */

// // function Clients() {
// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow">
// //       <h2 className="text-xl font-bold mb-4">Clients</h2>
// //       <p className="text-gray-600">
// //         List of all registered clients will appear here.
// //       </p>

// //       {/* Example */}
// //       <ul className="mt-4 space-y-2 text-sm">
// //         <li>• ABC Pharma</li>
// //         <li>• MedLife Pvt Ltd</li>
// //         <li>• HealthPlus</li>
// //       </ul>
// //     </div>
// //   );
// // }
// // // import {useNavigate} from "react-router-dom";
// // // const navigate = useNavigate();
// // // function Payments() {  
// // //   navigate("/admin-payment");
// // // }

// // function Support() {
// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow">
// //       <h2 className="text-xl font-bold mb-4">Support</h2>
// //       <p className="text-gray-600">
// //         Manage customer queries and support tickets.
// //       </p>

// //       <div className="mt-4 space-y-3 text-sm">
// //         <div className="border p-3 rounded">
// //           <p className="font-medium">Ticket #1023</p>
// //           <p className="text-gray-500">
// //             Issue with payment gateway integration
// //           </p>
// //         </div>

// //         <div className="border p-3 rounded">
// //           <p className="font-medium">Ticket #1024</p>
// //           <p className="text-gray-500">
// //             Unable to access employee dashboard
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import axios from "axios";
// import AdminPayments from "./adminPayment";
// import AdminSupport from "./adminSupport";
// import logo from '../../assets/Screenshot 2025-12-29 220722.png'

// export default function AdminClientsPage() {
//   const [activeTab, setActiveTab] = useState("Clients");

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* ===== SIDEBAR ===== */}
//       <aside className="w-64 bg-white shadow-md">
//         {/* <div className="p-6 text-xl font-bold border-b">
//           Admin Panel
//         </div> */}

//         <div className="flex justify-center mb-6">
//             <img
//               src={logo}
//               alt="Company Logo"
//               className="h-16 object-contain"
//             />
//           </div>

//         <nav className="flex flex-col p-4 gap-2">
//           {["Clients", "Payments", "Support"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`text-left px-4 py-2 rounded transition ${
//                 activeTab === tab
//                   ? "bg-blue-100 text-blue-600 font-semibold"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* ===== MAIN CONTENT ===== */}
//       <main className="flex-1 p-8">
//         {activeTab === "Clients" && <Clients />}
//         {activeTab === "Payments" && <AdminPayments />}
//         {activeTab === "Support" && <AdminSupport />}
//       </main>
//     </div>
//   );
// }

// /* ===================== CLIENTS TAB ===================== */

// function Clients() {
//   const [clients, setClients] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   const [formData, setFormData] = useState({
//     clientName: "",
//     days: "",
//     description: "",
//     address: "",
//     mobile: ""
//   });

//   const fetchClients = async () => {
//     const res = await axios.get("https://hr-management-backend-sable.vercel.app/api/clients");
//     setClients(res.data);
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   await axios.post("https://hr-management-backend-sable.vercel.app/api/clients", {
//   //     ...formData,
//   //     days: Number(formData.days)
//   //   });

//   //   setFormData({
//   //     clientName: "",
//   //     days: "",
//   //     description: "",
//   //     address: "",
//   //     mobile: ""
//   //   });



//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const payload = {
//     ...formData,
//     days: Number(formData.days),
//   };

//   if (editingClient) {
//     // UPDATE
//     await axios.put(
//       `https://hr-management-backend-sable.vercel.app/api/clients/${editingClient}`,
//       payload
//     );
//   } else {
//     // CREATE
//     await axios.post(
//       "https://hr-management-backend-sable.vercel.app/api/clients",
//       payload
//     );
//   }

//   setFormData({
//     clientName: "",
//     days: "",
//     description: "",
//     address: "",
//     mobile: "",
//   });

//   setEditingClient(null);
//   setShowForm(false);
//   fetchClients();
// };



//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Clients</h2>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           + Add Client
//         </button>
//       </div>

//       {/* CLIENT TABLE */}
//       <table className="w-full text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2">Name</th>
//             <th className="p-2">Days</th>
//             <th className="p-2">Mobile</th>
//             <th className="p-2">Address</th>
//             <th className="p-2">Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((c) => (
//             <tr key={c._id} className="border-t">
//               <td className="p-2 text-center">{c.clientName}</td>
//               <td className="p-2 text-center">{c.days}</td>
//               <td className="p-2 text-center">{c.mobile}</td>
//               <td className="p-2 text-center">{c.address}</td>
//               <td className="p-2 text-center">{c.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* SLIDE FORM */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/30 flex justify-end">
//           <div className="w-full max-w-md bg-white h-full p-6">
//             <h3 className="text-lg font-bold mb-4">Add Client</h3>

//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 name="clientName"
//                 placeholder="Client Name"
//                 required
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <input
//                 name="days"
//                 type="number"
//                 placeholder="Number of Days"
//                 required
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <input
//                 name="mobile"
//                 placeholder="Mobile Number"
//                 required
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <textarea
//                 name="address"
//                 placeholder="Address"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />

//               <textarea
//                 name="description"
//                 placeholder="Description"
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

//                 <button className="px-4 py-2 bg-blue-600 text-white rounded">
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

// /* ===================== PAYMENTS TAB ===================== */

// function Payments() {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-2">Payments</h2>
//       <p className="text-gray-600">
//         Payments management UI will appear here.
//       </p>
//     </div>
//   );
// }

// /* ===================== SUPPORT TAB ===================== */

// function Support() {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-2">Support</h2>
//       <p className="text-gray-600">
//         Support tickets and queries will appear here.
//       </p>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import AdminPayments from "./adminPayment";
import AdminSupport from "./adminSupport";
import logo from "../../assets/Screenshot 2025-12-29 220722.png";

export default function AdminClientsPage() {
  const [activeTab, setActiveTab] = useState("Clients");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-white shadow-md">
        <div className="flex justify-center my-6">
          <img src={logo} alt="Company Logo" className="h-16 object-contain" />
        </div>

        <nav className="flex flex-col p-4 gap-2">
          {["Clients", "Payments", "Support"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-2 rounded transition ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-8">
        {activeTab === "Clients" && <Clients />}
        {activeTab === "Payments" && <AdminPayments />}
        {activeTab === "Support" && <AdminSupport />}
      </main>
    </div>
  );
}

/* ===================== CLIENTS TAB ===================== */

function Clients() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [formData, setFormData] = useState({
    clientName: "",
    days: "",
    mobile: "",
    address: "",
    description: "",
  });

  /* ===== FETCH CLIENTS ===== */
  const fetchClients = async () => {
    const res = await axios.get(
      "https://hr-management-backend-sable.vercel.app/api/clients"
    );
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  /* ===== FORM HANDLER ===== */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ===== ADD / UPDATE ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      days: Number(formData.days),
    };

    if (editingClient) {
      await axios.put(
        `http://localhost:5000/api/clients/${editingClient}`,
        payload
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/clients",
        payload
      );
    }

    resetForm();
    fetchClients();
  };

  /* ===== EDIT ===== */
  const handleEdit = (client) => {
    setFormData({
      clientName: client.clientName,
      days: client.days,
      mobile: client.mobile,
      address: client.address,
      description: client.description,
    });
    setEditingClient(client._id);
    setShowForm(true);
  };

  /* ===== DELETE ===== */
 const handleDelete = async (id) => {
  try {
    console.log("Deleting ID:", id);

    await axios.delete(
      `http://localhost:5000/api/clients/${id}`
    );

    alert("Client deleted");
    fetchClients();
  } catch (err) {
    console.error("Delete failed", err);
    alert("Delete failed");
  }
};


  /* ===== RESET ===== */
  const resetForm = () => {
    setFormData({
      clientName: "",
      days: "",
      mobile: "",
      address: "",
      description: "",
    });
    setEditingClient(null);
    setShowForm(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Clients</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Client
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Days</th>
            <th className="p-2">Mobile</th>
            <th className="p-2">Address</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c._id} className="border-t text-center">
              <td className="p-2">{c.clientName}</td>
              <td className="p-2">{c.days}</td>
              <td className="p-2">{c.mobile}</td>
              <td className="p-2">{c.address}</td>
              <td className="p-2">{c.description}</td>
              <td className="p-2 space-x-3">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== SLIDE FORM ===== */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
          <div className="w-full max-w-md bg-white h-full p-6">
            <h3 className="text-lg font-bold mb-4">
              {editingClient ? "Edit Client" : "Add Client"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="clientName"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <input
                name="days"
                type="number"
                placeholder="Days"
                value={formData.days}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <input
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />

              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  {editingClient ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
