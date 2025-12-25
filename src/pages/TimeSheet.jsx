// import { useOutletContext } from "react-router-dom";
// import { TableProperties, Clock, CheckCircle, AlertCircle, Calendar, Plus } from "lucide-react";
// import { useState, useEffect } from "react";
// import { fetchTimesheets, fetchTimesheetStats } from "../api/timesheetService";

// export default function TimeSheet() {
//       const { darkMode } = useOutletContext();
//       const [employees, setEmployees] = useState([]);
//       const [loading, setLoading] = useState(true);
//       const [metrics, setMetrics] = useState({
//             totalHours: 0,
//             regularHours: 0,
//             overtimeHours: 0,
//             pendingApprovals: 0
//       });

//       useEffect(() => {
//             Promise.all([
//                   fetchTimesheets(),
//                   fetchTimesheetStats()
//             ])
//             .then(([timesheetData, statsData]) => {
//                   setEmployees(timesheetData);
//                   setMetrics(statsData);
//             })
//             .catch(err => console.error("Failed to fetch timesheet data:", err))
//             .finally(() => setLoading(false));
//       }, []);

//       return (
//             <div
//                   className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//                         }`}
//             >
//                   <div className="flex justify-between items-center mb-6">
//                         <h1 className="text-2xl font-bold flex items-center gap-2">
//                               <TableProperties /> Time Sheet
//                         </h1>
//                         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
//                               <Plus size={18} /> Add Entry
//                         </button>
//                   </div>

//                   {/* Metrics Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                         <StatCard
//                               title="Total Hours (This Week)"
//                               value={metrics.totalHours}
//                               icon={<Clock size={24} className="text-blue-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Regular Hours"
//                               value={metrics.regularHours}
//                               icon={<CheckCircle size={24} className="text-green-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Overtime Hours"
//                               value={metrics.overtimeHours}
//                               icon={<AlertCircle size={24} className="text-orange-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Pending Approvals"
//                               value={metrics.pendingApprovals}
//                               icon={<Calendar size={24} className="text-purple-500" />}
//                               darkMode={darkMode}
//                         />
//                   </div>

//                   {/* Time Sheet Table */}
//                   <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//                         <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
//                               <h2 className="font-bold text-lg">Weekly Time Sheet</h2>
//                               <div className="flex gap-2">
//                                     <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
//                                           <option>Current Week</option>
//                                           <option>Last Week</option>
//                                           <option>Last Month</option>
//                                     </select>
//                                     <select className={`text-sm rounded-md px-2 py-1 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
//                                           <option>All Departments</option>
//                                           <option>Pharmacy Operations</option>
//                                           <option>Human Resources</option>
//                                           <option>Clinical Services</option>
//                                     </select>
//                               </div>
//                         </div>

//                         <div className="p-8 text-center">
//                               <TableProperties size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
//                               <p className="text-lg font-medium">No timesheet data available</p>
//                               <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Employee time tracking will appear here</p>
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



import { useOutletContext } from "react-router-dom";
import axios from "axios";     
import {
  TableProperties,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Plus,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  fetchTimesheets,
  fetchTimesheetStats,
} from "../api/timesheetService";

export default function TimeSheet() {
  const { darkMode } = useOutletContext();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [list,setList]=useState([]);

  const [metrics, setMetrics] = useState({
    totalHours: 0,
    regularHours: 0,
    overtimeHours: 0,
    pendingApprovals: 0,
  });

  /* ---------------- FORM STATES ---------------- */
  const [showForm, setShowForm] = useState(false);

 const [formData, setFormData] = useState({
  totalHours: "",
  negotiationHours: "",
  billingType: "month",
  monthlyCharge: "",
  dailyCharge: "",
  status: "Pending", // ✅ NEW
});


  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    Promise.all([fetchTimesheets(), fetchTimesheetStats()])
      .then(([timesheetData, statsData]) => {
        setEmployees(timesheetData || []);
        setMetrics(statsData || {});
      })
      .catch((err) =>
        console.error("Failed to fetch timesheet data:", err)
      )
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSave = async () => {
  try {
    await fetch("http://localhost:5000/api/timesheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalHours: Number(formData.totalHours),
        negotiationHours: Number(formData.negotiationHours),
        billingType: formData.billingType,
        monthlyCharge:
          formData.billingType === "month"
            ? Number(formData.monthlyCharge)
            : null,
        dailyCharge:
          formData.billingType === "day"
            ? Number(formData.dailyCharge)
            : null,
        status: formData.status, // ✅ NEW
      }),
    });

    // refresh table
    fetchData();

    // reset form
    setFormData({
      totalHours: "",
      negotiationHours: "",
      billingType: "month",
      monthlyCharge: "",
      dailyCharge: "",
      status: "Pending",
    });

    setShowForm(false);
  } catch (err) {
    console.error("Save failed:", err);
  }
};

const fetchData = async () => {
      try{
            const res=await axios.get("http://localhost:5000/api/timesheets");
            console.log(res.data);
            setList(res.data);
      }
      catch(error){
            console.log(error);
      }
}
useEffect(() => {
  fetchData();

}, [])

      





  /* ---------------- UI ---------------- */
  return (
    <div
      className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TableProperties /> Time Sheet
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
        >
          <Plus size={18} /> Add Entry
        </button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Hours"
          value={metrics.totalHours}
          icon={<Clock size={24} className="text-blue-500" />}
          darkMode={darkMode}
        />
        <StatCard
          title="Regular Hours"
          value={metrics.regularHours}
          icon={<CheckCircle size={24} className="text-green-500" />}
          darkMode={darkMode}
        />
        <StatCard
          title="Overtime Hours"
          value={metrics.overtimeHours}
          icon={<AlertCircle size={24} className="text-orange-500" />}
          darkMode={darkMode}
        />
        <StatCard
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          icon={<Calendar size={24} className="text-purple-500" />}
          darkMode={darkMode}
        />
      </div>

      {/* EMPTY TABLE */}
      <div
        className={`rounded-xl shadow-md overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {list.length === 0 ? (
  <div className="p-8 text-center">
    <TableProperties
      size={48}
      className={`mx-auto mb-4 ${
        darkMode ? "text-gray-700" : "text-gray-300"
      }`}
    />
    <p className="text-lg font-medium">No timesheet data available</p>
    <p
      className={`text-sm ${
        darkMode ? "text-gray-400" : "text-gray-600"
      }`}
    >
      Employee time tracking will appear here
    </p>
  </div>
) : (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead
        className={`${
          darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
        }`}
      >
        <tr>
          <th className="px-4 py-3 text-left">Total Hours</th>
          <th className="px-4 py-3 text-left">Negotiation Hours</th>
          <th className="px-4 py-3 text-left">Billing Type</th>
          <th className="px-4 py-3 text-left">Charge</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-left">Created</th>
        </tr>
      </thead>

      <tbody>
        {list.map((item) => (
          <tr
            key={item._id}
            className={`border-b ${
              darkMode
                ? "border-gray-700 hover:bg-gray-700"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <td className="px-4 py-3">{item.totalHours}</td>
            <td className="px-4 py-3">{item.negotiationHours}</td>
            <td className="px-4 py-3 capitalize">
              {item.billingType}
            </td>
            <td className="px-4 py-3">
              {item.billingType === "month"
                ? `₹${item.monthlyCharge}`
                : `₹${item.dailyCharge}`}
            </td>
          <td className="px-4 py-3">
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      item.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {item.status}
  </span>
</td>

            <td className="px-4 py-3">
              {new Date(item.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      </div>

      {/* ================= MODAL FORM ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`w-full max-w-md rounded-xl p-6 relative ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Add Timesheet Entry</h2>

            {/* TOTAL HOURS */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Total Hours</label>
              <input
                type="number"
                name="totalHours"
                value={formData.totalHours}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* NEGOTIATION HOURS */}
            <div className="mb-4">
              <label className="block text-sm mb-1">
                Negotiation Hours
              </label>
              <input
                type="number"
                name="negotiationHours"
                value={formData.negotiationHours}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* BILLING TYPE */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Billing Type</label>
              <select
                name="billingType"
                value={formData.billingType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="month">Monthly</option>
                <option value="day">Daily</option>
              </select>
            </div>

            {/* CONDITIONAL FIELDS */}
            {formData.billingType === "month" && (
              <div className="mb-4">
                <label className="block text-sm mb-1">
                  Per Month Charge
                </label>
                <input
                  type="number"
                  name="monthlyCharge"
                  value={formData.monthlyCharge}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            )}

            {formData.billingType === "day" && (
              <div className="mb-4">
                <label className="block text-sm mb-1">
                  Per Day Charge
                </label>
                <input
                  type="number"
                  name="dailyCharge"
                  value={formData.dailyCharge}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            )}
            {/* STATUS */}
<div className="mb-4">
  <label className="block text-sm mb-1">Status</label>
  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded"
  >
    <option value="Pending">Pending</option>
    <option value="Pay">Pay</option>
  </select>
</div>


            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded bg-gray-400 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value, icon, darkMode }) {
  return (
    <div
      className={`flex items-center p-4 rounded-xl shadow-sm ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <p
          className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {title}
        </p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
