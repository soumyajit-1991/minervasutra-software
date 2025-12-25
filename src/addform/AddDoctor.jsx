import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import api from "../components/axios";

export default function AddDoctor() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    phone: "",
    fees: "",
    clinic: "",
    day: "",
    time: "",
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const doctorData = {
        ...newDoctor,
        fees: parseFloat(newDoctor.fees),
        clinic: parseFloat(newDoctor.clinic),
      };
      
      await api.post("/doctors", doctorData);
      navigate("/doctor");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add doctor");
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div>
        <h2 className="text-2xl font-bold">Add New Doctor</h2>
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
          Enter details to add a new doctor to the system.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg mb-4">{error}</div>
      )}

      <div
        className={`p-4 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={newDoctor.name}
            onChange={handleInputChange}
            placeholder="Doctor Name"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <input
            type="text"
            name="specialty"
            value={newDoctor.specialty}
            onChange={handleInputChange}
            placeholder="Specialty"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <input
            type="text"
            name="phone"
            value={newDoctor.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <input
            type="number"
            name="fees"
            value={newDoctor.fees}
            onChange={handleInputChange}
            placeholder="Doctor's Fees"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <input
            type="number"
            name="clinic"
            value={newDoctor.clinic}
            onChange={handleInputChange}
            placeholder="Clinic's Fees"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />

          <input
            type="text"
            name="day"
            value={newDoctor.day}
            onChange={handleInputChange}
            placeholder="Available Days (e.g., Mon, Tue, Sat)"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />
          <input
            type="text"
            name="time"
            value={newDoctor.time}
            onChange={handleInputChange}
            placeholder="Available Time (e.g., 10:00 am to 12:00pm)"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 px-4 py-2 rounded-lg transition ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600"
                : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
            }`}
          >
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
}