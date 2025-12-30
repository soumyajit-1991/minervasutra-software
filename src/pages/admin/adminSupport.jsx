import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSupport() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    const res = await axios.get("https://hr-management-backend-sable.vercel.app/api/feedback");
    setFeedbacks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `https://hr-management-backend-sable.vercel.app/api/feedback/${id}/status`,
      { status }
    );
    fetchFeedbacks();
  };

  if (loading) return <p className="p-6">Loading feedback...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Support & Feedback</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Message</th>
              {/* <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f._id} className="border-t">
                <td className="p-3">{f.email}</td>
                <td className="p-3 capitalize">{f.role}</td>
                <td className="p-3 max-w-md">{f.message}</td>
                {/* <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      f.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
                <td className="p-3">
                  {f.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(f._id, "Done")}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Mark as Done
                    </button>
                  )}
                </td> */}
              </tr>
            ))}

            {feedbacks.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No feedback found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
