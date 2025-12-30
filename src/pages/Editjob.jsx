import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function EditJob() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If user opens directly → block
  if (!state?.job) {
    return <p className="p-6">No job data found</p>;
  }

  const [formData, setFormData] = useState(state.job);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(
        `https://hr-management-backend-sable.vercel.app/api/job-postings/${formData._id}`,
        formData
      );
      navigate("/vacancy"); // back to vacancy list
    } catch (err) {
      alert("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Job Title"
          required
        />

        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Department"
        />

        <input
          type="date"
          name="closingDate"
          value={formData.closingDate?.slice(0, 10)}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Active</option>
          <option>Draft</option>
          <option>Closed</option>
        </select>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {saving ? "Saving..." : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
