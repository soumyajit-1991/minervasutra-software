// import { useOutletContext } from "react-router-dom";
// import { TrendingUp, CheckSquare, Clock, Award, Star, List } from "lucide-react";

// export default function Performance() {
//       const { darkMode } = useOutletContext();
      
//       // No performance data available
//       const metrics = {
//             avgScore: "0.0",
//             reviewsCompleted: 0,
//             pendingReviews: 0,
//             topPerformers: 0
//       };
//       const reviews = [];

//       const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
//             }`;

//       return (
//             <div
//                   className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//                         }`}
//             >
//                   <h1 className="text-2xl font-bold mb-6">Performance Board</h1>

//                   {/* Metrics Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                         <StatCard
//                               title="Average Score"
//                               value={metrics.avgScore}
//                               icon={<TrendingUp size={24} className="text-blue-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Reviews Completed"
//                               value={metrics.reviewsCompleted}
//                               icon={<CheckSquare size={24} className="text-green-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Pending Reviews"
//                               value={metrics.pendingReviews}
//                               icon={<Clock size={24} className="text-yellow-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Top Performers"
//                               value={metrics.topPerformers}
//                               icon={<Award size={24} className="text-purple-500" />}
//                               darkMode={darkMode}
//                         />
//                   </div>

//                   {/* Performance Reviews Table */}
//                   <div className={cardClass}>
//                         <div className="flex justify-between items-center mb-6">
//                               <h2 className="text-lg font-semibold">Employee Performance Reviews</h2>
//                               <div className="flex gap-2">
//                                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition transition-colors">
//                                           Start New Review
//                                     </button>
//                               </div>
//                         </div>
//                         <div className="overflow-x-auto">
//                               <table className="w-full text-left">
//                                     <thead>
//                                           <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
//                                                 <th className="py-3 px-2">Employee</th>
//                                                 <th className="py-3 px-2">Department</th>
//                                                 <th className="py-3 px-2">Role</th>
//                                                 <th className="py-3 px-2">Rating</th>
//                                                 <th className="py-3 px-2">Reviewer</th>
//                                                 <th className="py-3 px-2">Date</th>
//                                                 <th className="py-3 px-2">Status</th>
//                                                 <th className="py-3 px-2">Action</th>
//                                           </tr>
//                                     </thead>
//                                     <tbody>
//                                           <tr>
//                                                 <td colSpan="8" className="py-8 text-center">
//                                                       <TrendingUp size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
//                                                       <p className="text-lg font-medium">No performance reviews available</p>
//                                                       <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Start your first performance review</p>
//                                                 </td>
//                                           </tr>
//                                     </tbody>
//                               </table>
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
import {
  TrendingUp,
  CheckSquare,
  Clock,
  Award,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Performance() {
  const { darkMode } = useOutletContext();

  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);


  const [formData, setFormData] = useState({
    employee: "",
    department: "",
    role: "",
    rating: 0,
    reviewer: "",
    date: "",
    status: "Pending",
  });

  /* ---------------- FETCH REVIEWS ---------------- */
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("https://hr-management-r6bh.vercel.app/api/performance");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- METRICS ---------------- */
  const metrics = {
    avgScore:
      reviews.length > 0
        ? (
            reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
          ).toFixed(1)
        : "0.0",
    reviewsCompleted: reviews.filter((r) => r.status === "Completed").length,
    pendingReviews: reviews.filter((r) => r.status === "Pending").length,
    topPerformers: reviews.filter((r) => r.rating >= 4).length,
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
  try {
    if (editId) {
      // ✅ UPDATE
      await axios.put(`https://hr-management-r6bh.vercel.app/api/performance/${editId}`, {
        ...formData,
        rating: Number(formData.rating),
      });
    } else {
      // ✅ CREATE
      await axios.post("https://hr-management-r6bh.vercel.app/api/performance", {
        ...formData,
        rating: Number(formData.rating),
      });
    }

    setShowForm(false);
    setEditId(null);
    fetchReviews();

    setFormData({
      employee: "",
      department: "",
      role: "",
      rating: 0,
      reviewer: "",
      date: "",
      status: "Pending",
    });
  } catch (err) {
    console.error("Failed to save review", err);
  }
};

  const markCompleted = async (id) => {
  try {
    await axios.patch(`https://hr-management-r6bh.vercel.app/api/performance/${id}`, {
      status: "Completed",
    });
    fetchReviews();
  } catch (err) {
    console.error("Failed to update status", err);
  }
};

const deleteReview = async (id) => {
  if (!window.confirm("Are you sure you want to delete this review?")) return;

  try {
      
    await axios.delete(`https://hr-management-r6bh.vercel.app/api/performance/${id}`);
    fetchReviews();
  } catch (err) {
    console.error("Failed to delete review", err);
  }
};
const handleEdit = (review) => {
  setFormData({
    employee: review.employee,
    department: review.department,
    role: review.role,
    rating: review.rating,
    reviewer: review.reviewer,
    date: review.date.split("T")[0],
    status: review.status,
  });

  setEditId(review._id);
  setShowForm(true);
};



  const cardClass = `p-6 rounded-xl shadow-md ${
    darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
  }`;

  return (
    <div
      className={`p-6 ml-64 mt-16 min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Performance Board</h1>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Average Score" value={metrics.avgScore} icon={<TrendingUp />} darkMode={darkMode} />
        <StatCard title="Reviews Completed" value={metrics.reviewsCompleted} icon={<CheckSquare />} darkMode={darkMode} />
        <StatCard title="Pending Reviews" value={metrics.pendingReviews} icon={<Clock />} darkMode={darkMode} />
        <StatCard title="Top Performers" value={metrics.topPerformers} icon={<Award />} darkMode={darkMode} />
      </div>

      {/* TABLE */}
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Employee Performance Reviews</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Start New Review
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Rating</th>
                <th>Reviewer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6">
                    No performance reviews available
                  </td>
                </tr>
              ) : (
                reviews.map((r) => (
                  <tr key={r._id} className="border-b">
  <td>{r.employee}</td>
  <td>{r.department}</td>
  <td>{r.role}</td>
  <td className="flex items-center gap-1">
    <Star size={14} className="text-yellow-500" /> {r.rating}
  </td>
  <td>{r.reviewer}</td>
  <td>{new Date(r.date).toLocaleDateString()}</td>

  <td>
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        r.status === "Completed"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {r.status}
    </span>
  </td>

  {/* ✅ ACTION FIELD */}
 <td className="flex gap-2 py-2">
  <button
    onClick={() => handleEdit(r)}
    className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
  >
    Edit
  </button>

  {r.status === "Pending" && (
    <button
      onClick={() => markCompleted(r._id)}
      className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
    >
      Complete
    </button>
  )}

  <button
    onClick={() => deleteReview(r._id)}
    className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
  >
    Delete
  </button>
</td>

</tr>

                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-lg p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
  {editId ? "Edit Performance Review" : "New Performance Review"}
</h2>

              <X onClick={() => setShowForm(false)} className="cursor-pointer" />
            </div>

            {[
              ["employee", "Employee"],
              ["department", "Department"],
              ["role", "Role"],
              ["reviewer", "Reviewer"],
            ].map(([name, label]) => (
              <input
                key={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full p-2 border rounded mb-3"
              />
            ))}

            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded mb-3" />

            <select name="rating" value={formData.rating} onChange={handleChange} className="w-full p-2 border rounded mb-3">
              <option value="0">Select Rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded mb-4">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
               {editId ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, darkMode }) {
  return (
    <div className={`flex items-center p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
