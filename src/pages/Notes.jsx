// pages/Notes.jsx
import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Plus, X } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import api from "../components/axios";

export default function Notes() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state for full note view
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notes");
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching notes:", error?.response?.data || error?.message);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNewNote = () => {
    navigate("/add-note");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error?.response?.data || error?.message);
      alert("Failed to delete note.");
    }
  };

  const handleView = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  // Helper to truncate by sentences (first `max` sentences)
  const truncateBySentences = (content = "", max = 20) => {
    if (typeof content !== "string" || content.trim() === "") return "";
    // Match sentences (keeps punctuation). Falls back to full content if match fails.
    const sentences = content.match(/[^\.!\?]+[\.!\?]+["']?|[^\.!\?]+$/g) || [content];
    if (sentences.length <= max) return content;
    return sentences.slice(0, max).join(" ").trim() + "...";
  };

  // Check if truncated (to show "Read more" or not)
  const isTruncated = (content = "", max = 20) => {
    if (typeof content !== "string" || content.trim() === "") return false;
    const sentences = content.match(/[^\.!\?]+[\.!\?]+["']?|[^\.!\?]+$/g) || [content];
    return sentences.length > max;
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notes</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Manage notes for pharmacy operations and reminders.
          </p>
        </div>
        <button
          onClick={handleAddNewNote}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Plus size={18} />
          Add New Note
        </button>
      </div>

      <div
        className={`p-4 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className={`w-full border rounded-lg overflow-hidden ${
                darkMode ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <thead className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}>
                <tr>
                  <th className="p-3 text-left">Notes</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {notes.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="p-4 text-center text-gray-500">
                      No notes found
                    </td>
                  </tr>
                ) : (
                  notes.map((note) => {
                    const content = note?.content ?? "";
                    const truncated = truncateBySentences(content, 20);
                    return (
                      <tr
                        key={note?._id || Math.random()}
                        className={`border-t transition-colors duration-300 ${
                          darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-3">{truncated}</td>
                        <td className="p-3 flex gap-2 justify-center">
                          <button
                            onClick={() => handleView(note)}
                            className={`p-2 rounded transition ${
                              darkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                            title="View full note"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => navigate(`/add-note`, { state: { editing: true, note } })}
                            className={`p-2 rounded transition ${
                              darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                            title="Edit note"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(note._id)}
                            className={`p-2 rounded transition ${
                              darkMode ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-orange-500 text-white hover:bg-orange-600"
                            }`}
                            title="Delete note"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for viewing full note */}
      {showModal && selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div
            className={`relative w-11/12 max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Note</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded hover:bg-gray-200">
                <X />
              </button>
            </div>
            <div className="whitespace-pre-wrap max-h-80 overflow-auto">
              {selectedNote?.content ?? "(No content)"}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded border"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
