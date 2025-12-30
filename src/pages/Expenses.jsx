// import { useEffect, useMemo, useState } from "react";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API = "https://hr-management-backend-sable.vercel.app/api/expenses"


   
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ FRONTEND VALIDATION (IMPORTANT)
//     if (
//       !form.description.trim() ||
//       !form.vendor.trim() ||
//       !form.department.trim() ||
//       !form.amount ||
//       !form.dueDate
//     ) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const payload = {
//       category: form.category,
//       description: form.description.trim(),
//       vendor: form.vendor.trim(),
//       department: form.department.trim(),
//       amount: Number(form.amount),
//       paidAmount: Number(form.paidAmount || 0),
//       dueDate: form.dueDate,
//       status: form.status,
//       paymentMethod: form.paymentMethod,
//       notes: form.notes,
//     };

//     try {
//       await axios.post(API, payload);
//       setForm(emptyForm);
//       setShowForm(false);
//       loadExpenses();
//     } catch (err) {
//       console.error("SAVE ERROR:", err.response?.data);
//       alert(err.response?.data?.message || "Save failed");
//     }
//   };
  
// import {
//   DollarSign,
//   CreditCard,
//   TrendingUp,
//   AlertCircle,
//   Plus,
//   Search,
//   Filter,
//   Eye,
//   Edit,
//   Trash2,
//   Download,
//   FileText
// } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { fetchExpenses, deleteExpense } from "../api/expenseService";
// import { fetchEmployees } from "../api/employeeService";

// export default function Expenses() {
//   const { darkMode } = useOutletContext();
//   const navigate = useNavigate();
//   const [expenses, setExpenses] = useState([]);
//   const [salaries, setSalaries] = useState([]);
//   const [activeTab, setActiveTab] = useState("expenses");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     Promise.all([fetchExpenses(), fetchEmployees()])
//       .then(([expensesData, employeesData]) => {
//         setExpenses(expensesData);
//         setSalaries(employeesData);
//         setError(null);
//       })
//       .catch((err) => setError(err.message || "Failed to load data"));
//   }, []);

//   const metrics = useMemo(() => {
//     const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
//     const monthlyBudget = 0;
//     const remainingBudget = monthlyBudget ? Math.max(monthlyBudget - totalExpenses, 0) : 0;
//     const pendingPayments = expenses.filter((e) => e.status !== "Paid").length;
//     return { totalExpenses, monthlyBudget, remainingBudget, pendingPayments };
//   }, [expenses]);

//   const handleViewOrder = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const handleEdit = (expenseId) => {
//     navigate(`/edit-expense/${expenseId}`);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this expense?")) return;
//     try {
//       await deleteExpense(id);
//       setExpenses((prev) => prev.filter((e) => e.expenseId !== id));
//     } catch (err) {
//       alert(err.message || "Failed to delete expense");
//     }
//   };

//   const filteredExpenses = useMemo(() => {
//     if (!searchQuery.trim()) return expenses;
//     const query = searchQuery.toLowerCase();
//     return expenses.filter(
//       (exp) =>
//         (exp.category || "").toLowerCase().includes(query) ||
//         (exp.description || "").toLowerCase().includes(query) ||
//         (exp.vendor || "").toLowerCase().includes(query) ||
//         (exp.status || "").toLowerCase().includes(query)
//     );
//   }, [expenses, searchQuery]);

//   const handleExport = () => {
//     const headers = ["Category", "Description", "Vendor", "Date", "Amount", "Status"];
//     const csvContent = [
//       headers.join(","),
//       ...filteredExpenses.map((exp) =>
//         [
//           exp.category,
//           `"${exp.description}"`, // Quote description to handle commas
//           exp.vendor,
//           exp.date,
//           exp.amount,
//           exp.status,
//         ].join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "expenses.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl font-bold flex items-center gap-2">
//             <DollarSign className="text-blue-500" /> Financial Management
//           </h1>
//           <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
//             Track expenses, manage salaries, and monitor supplier payments.
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={handleExport}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-200" : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
//               }`}>
//             <Download size={16} /> Export
//           </button>
//           <button
//             onClick={() => navigate("/add-expense")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//           >
//             <Plus size={18} /> Add Expense
//           </button>
//         </div>
//       </div>

//       {/* Metrics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           title="Total Expenses"
//           value={`₹${metrics.totalExpenses.toLocaleString()}`}
//           icon={<DollarSign size={24} className="text-red-500" />}
//           // trend="-2.5%"
//           trendUp={false}
//           darkMode={darkMode}
//         />
//         <StatCard
//           title="Monthly Budget"
//           value={`₹${metrics.monthlyBudget.toLocaleString()}`}
//           icon={<CreditCard size={24} className="text-blue-500" />}
//           darkMode={darkMode}
//         />
//         <StatCard
//           title="Remaining Budget"
//           value={`₹${metrics.remainingBudget.toLocaleString()}`}
//           icon={<TrendingUp size={24} className="text-green-500" />}
//           darkMode={darkMode}
//         />
//         <StatCard
//           title="Pending Payments"
//           value={metrics.pendingPayments}
//           icon={<AlertCircle size={24} className="text-orange-500" />}
//           darkMode={darkMode}
//         />
//       </div>

//       {/* Tabs & Filters */}
//       <div className={`rounded-xl shadow-sm mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//         <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
//             {['expenses'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
//                   ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
//                   : darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="flex gap-2 w-full md:w-auto">
//             <div className="relative flex-1 md:w-64">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//               <input
//                 type="text"
//                 placeholder={`Search ${activeTab}...`}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${darkMode
//                   ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500"
//                   : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
//                   }`}
//               />
//             </div>
//             <button className={`p-2 rounded-lg border ${darkMode ? "border-gray-600 hover:bg-gray-700 text-gray-400" : "border-gray-200 hover:bg-gray-50 text-gray-600"
//               }`}>
//               <Filter size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="overflow-x-auto">
//           {error && (
//             <div className="p-3 text-sm text-orange-800 bg-orange-50 border border-orange-200 mb-3 rounded">
//               {error}
//             </div>
//           )}
//           {activeTab === 'expenses' && (
//             <table className="w-full text-left text-sm">
//               <thead className={`border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"}`}>
//                 <tr>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Category</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Description</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Amount</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y dark:divide-gray-700">
//                 {filteredExpenses.map((record) => (
//                   <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                     <td className="p-4 font-medium">{record.category}</td>
//                     <td className="p-4">
//                       <div className="flex flex-col">
//                         <span>{record.description}</span>
//                         <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{record.vendor}</span>
//                       </div>
//                     </td>
//                     <td className="p-4 text-gray-500 dark:text-gray-400">{record.date}</td>
//                     <td className="p-4 font-semibold">₹{record.amount.toLocaleString()}</td>
//                     <td className="p-4">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
//                         record.status === 'Pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
//                           'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
//                         }`}>
//                         {record.status}
//                       </span>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="flex justify-end gap-2">
//                         <button
//                           onClick={() => handleEdit(record.expenseId)}
//                           className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(record.expenseId)}
//                           className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {activeTab === 'salaries' && (
//             <table className="w-full text-left text-sm">
//               <thead className={`border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"}`}>
//                 <tr>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Employee</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Role</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Payment Date</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Salary</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y dark:divide-gray-700">
//                 {salaries.map((emp) => (
//                   <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                     <td className="p-4 font-medium">{emp.name}</td>
//                     <td className="p-4 text-gray-500 dark:text-gray-400">{emp.role}</td>
//                     <td className="p-4 text-gray-500 dark:text-gray-400">{"N/A"}</td>
//                     <td className="p-4 font-semibold">₹{emp.salary.toLocaleString()}</td>
//                     <td className="p-4">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300`}>
//                         Active
//                       </span>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="flex justify-end gap-2">
//                         <button className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors" title="View Slip"><FileText size={16} /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {activeTab === 'suppliers' && (
//             <table className="w-full text-left text-sm">
//               <thead className={`border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"}`}>
//                 <tr>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Supplier</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Total</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Due</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
//                   <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y dark:divide-gray-700">
//                 {[].map((order) => (
//                   <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                     <td className="p-4 font-medium">{order.supplier}</td>
//                     <td className="p-4 text-gray-500 dark:text-gray-400">{order.id}</td>
//                     <td className="p-4 font-semibold">₹{order.totalAmount.toLocaleString()}</td>
//                     <td className="p-4 text-red-500">₹{order.dueAmount.toLocaleString()}</td>
//                     <td className="p-4">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Received' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
//                         'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
//                         }`}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="flex justify-end gap-2">
//                         <button
//                           onClick={() => handleViewOrder(order)}
//                           className="p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded transition-colors"
//                         >
//                           <Eye size={16} />
//                         </button>
//                         <button className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors">
//                           <FaWhatsapp size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* Order Modal */}
//       {showModal && selectedOrder && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className={`w-full max-w-lg rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//             <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
//               <h3 className="text-lg font-bold">Order Details: {selectedOrder.id}</h3>
//               <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
//                 <AlertCircle className="rotate-45" size={24} />
//               </button>
//             </div>
//             <div className="p-6">
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Supplier:</span>
//                   <span className="font-medium">{selectedOrder.supplier}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Date:</span>
//                   <span className="font-medium">{selectedOrder.date}</span>
//                 </div>
//                 <div className="mt-4">
//                   <h4 className="font-medium mb-2 text-sm uppercase text-gray-500">Items</h4>
//                   <div className={`rounded-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} divide-y dark:divide-gray-700`}>
//                     {selectedOrder.items.map((item, idx) => (
//                       <div key={idx} className="p-3 flex justify-between text-sm">
//                         <span>{item.name} (x{item.quantity})</span>
//                         <span>${(item.price * item.quantity).toLocaleString()}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6 border-t dark:border-gray-700 flex justify-end">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                   }`}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function StatCard({ title, value, icon, trend, trendUp, darkMode }) {
//   return (
//     <div className={`p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//       <div className="flex justify-between items-start mb-2">
//         <div className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
//           {icon}
//         </div>
//         {trend && (
//           <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendUp
//             ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//             : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
//             }`}>
//             {trend}
//           </span>
//         )}
//       </div>
//       <div>
//         <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
//         <h3 className="text-2xl font-bold mt-1">{value}</h3>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import {
  DollarSign,
  CreditCard,
  AlertCircle,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

const API = "https://hr-management-backend-sable.vercel.app/api/expenses";
// const API="https://hr-management-backend-sable.vercel.app/api/expenses"

export default function Expenses() {
  const { darkMode } = useOutletContext();

  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  // ❌ vendor removed, ❌ category removed
  const emptyForm = {
    description: "",
    department: "",
    amount: "",
    paidAmount: "",
    dueDate: "",
    status: "Pending",
  };

  const [form, setForm] = useState(emptyForm);

  // ================= LOAD =================
  const loadExpenses = async () => {
    try {
      const res = await axios.get(API);
      setExpenses(res.data);
    } catch {
      setError("Failed to load expenses");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.description.trim() ||
      !form.department.trim() ||
      !form.amount ||
      !form.dueDate
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post(API, {
        description: form.description.trim(),
        department: form.department.trim(),
        amount: Number(form.amount),
        paidAmount: Number(form.paidAmount || 0),
        dueDate: form.dueDate,
        status: form.status,
      });

      setForm(emptyForm);
      setShowForm(false);
      loadExpenses();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (expenseId) => {
    if (!window.confirm("Delete this expense?")) return;
    await axios.delete(`${API}/${expenseId}`);
    loadExpenses();
  };

  // ================= FILTER =================
  const filteredExpenses = useMemo(() => {
    if (!searchQuery.trim()) return expenses;
    const q = searchQuery.toLowerCase();
    return expenses.filter(
      (e) =>
        e.department.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q)
    );
  }, [expenses, searchQuery]);

  // ================= METRICS =================
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingPayments = expenses.filter(
    (e) => e.status !== "Paid"
  ).length;
  const toCamelCaseText = (text = "") =>
  text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());


  return (
    <div
      className={`p-6 mt-16 min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="text-blue-500" />
          Financial Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          icon={<DollarSign className="text-red-500" />}
          darkMode={darkMode}
        />
        <StatCard
          title="Monthly Budget"
          value="₹0"
          icon={<CreditCard className="text-blue-500" />}
          darkMode={darkMode}
        />
        <StatCard
          title="Pending Payments"
          value={pendingPayments}
          icon={<AlertCircle className="text-orange-500" />}
          darkMode={darkMode}
        />
      </div>

      {/* SEARCH */}
      <div className="mb-4 relative w-64">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          className="pl-9 pr-3 py-2 rounded border w-full"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className={`border-b ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"}`}>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4">Total</th>
              <th className="p-4">Paid</th>
              <th className="p-4">Due</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {filteredExpenses.map((e) => (
              <tr key={e.expenseId} className="border-t">
                <td className="p-4">{toCamelCaseText(e.department)}</td>
                <td className="p-4 pl-5">{toCamelCaseText(e.description)}</td>
                <td className="p-4 font-semibold pl-15">₹{e.amount}</td>
                <td className="p-4 text-green-600 pl-10">
                  ₹{e.paidAmount || 0}
                </td>
                <td className="p-4 text-red-600 pl-11">
                  ₹{e.dueAmount ?? e.amount}
                </td>
                <td className="p-4 pl-15">
                  <span
                    className={`px-2 py-1 rounded-full text-xs  ${
                      e.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : e.status === "Partial"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(e.expenseId)}
                    className="text-red-500 hover:bg-red-100 p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD EXPENSE FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          // className="mt-6 p-6 bg-white rounded-xl shadow"
          className={`mt-6 p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <h3 className="font-bold mb-4">Add Expense</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Department"
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Total Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Paid Amount"
              value={form.paidAmount}
              onChange={(e) =>
                setForm({ ...form, paidAmount: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
              className="border p-2 rounded"
            />

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="Pending">Due</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(emptyForm);
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ================= CARD =================
function StatCard({ title, value, icon, darkMode }) {
  return (
    <div
      className={`p-4 rounded-xl shadow ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
