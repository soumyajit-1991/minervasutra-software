import { useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function AddEvent() {
  const navigate = useNavigate();
  const { darkMode } = useOutletContext();

  const [formData, setFormData] = useState({
    employeeName: "",
    employeeEmail: "",
    meetingDate: "",
    meetingTime: "",
    meetingLink: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://hr-management-backend-sable.vercel.app/api/events", formData);
      alert("Event created successfully");
      navigate("/employee-page");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create event");
    }
  };

  return (
    <div className={`p-6 ml-64 mt-16 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <h2 className="text-2xl font-bold mb-6">Add Event</h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <input
          name="employeeName"
          placeholder="Employee Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          name="employeeEmail"
          type="email"
          placeholder="Employee Email"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          name="meetingDate"
          type="date"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          name="meetingTime"
          type="time"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          name="meetingLink"
          placeholder="Meeting Link"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}
