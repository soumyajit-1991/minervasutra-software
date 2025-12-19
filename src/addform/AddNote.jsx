// addform/AddNote.jsx
import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import api from "../components/axios"; // import axios instance
import { Plus, X } from "lucide-react";

export default function AddNewNote() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we are in edit mode
  const { editing, note } = location.state || {}; // Retrieve passed state

  const [formData, setFormData] = useState({
    note: ""
  });

  const [loading, setLoading] = useState(false);

  // Pre-fill data if editing
  useEffect(() => {
    if (editing && note) {
      setFormData({ note: note.content });
    }
  }, [editing, note]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editing && note?._id) {
        // Update existing note
        await api.put(`/notes/${note._id}`, { content: formData.note });
      } else {
        // Create new note
        await api.post("/notes", { content: formData.note });
      }

      // After success, go back to Notes page
      navigate("/notes");
    } catch (error) {
      console.error("Error saving note:", error.response?.data || error.message);
      alert("Failed to save note!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{editing ? "Edit Note" : "Add New Note"}</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            {editing ? "Update your note details below." : "Create a new note for pharmacy operations or reminders."}
          </p>
        </div>
      </div>

      <div
        className={`p-6 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              rows="6"
              placeholder="Enter note details..."
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/notes")}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : (editing ? "Update Note" : "Add Note")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
