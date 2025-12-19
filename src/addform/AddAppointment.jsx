import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function AddAppointment() {
  const { darkMode } = useOutletContext();

  const doctors = [
    { id: 0, name: "Dr. A.K", specialty: "General Physician", phone: "01893531209", fees: 1200, clinic: 1000, day: "Mon, Tue, Sat", time: "10:00 am to 12:00pm" },
    { id: 1, name: "Dr. A.G", specialty: "Cardiologist", phone: "01893531210", fees: 1500, clinic: 1000, day: "Mon, Tue, Sat", time: "10:00 am to 12:00pm" },
    { id: 2, name: "Dr. J.K", specialty: "Pediatrician", phone: "01893531211", fees: 1000, clinic: 1000, day: "Mon, Tue, Sat", time: "10:00 am to 12:00pm" },
  ];

  const [newAppointment, setNewAppointment] = useState({
    doctorId: "",
    patientName: "",
    patientAge: "",
    patientContact: "",
    reason: "",
    date: "",
    day: "",
    time: "",
    documents: [],
  });

  const [showDocuments, setShowDocuments] = useState(false);
  const [currentDocName, setCurrentDocName] = useState("");
  const [currentDocFile, setCurrentDocFile] = useState(null);
  const [dateError, setDateError] = useState("");

  const getDoctorById = (id) => doctors.find((doc) => doc.id === Number(id));

  const getAvailableDays = (doctorId) => {
    const doctor = getDoctorById(doctorId);
    if (!doctor) return [];
    return doctor.day.split(", ").map((day) => day.trim());
  };

  const getAvailableTimes = (doctorId) => {
    const doctor = getDoctorById(doctorId);
    if (!doctor) return [];
    const [start, end] = doctor.time.split(" to ");
    const times = [];
    const startTime = new Date(`2000-01-01 ${start}`);
    const endTime = new Date(`2000-01-01 ${end}`);
    let current = new Date(startTime);
    while (current <= endTime) {
      times.push(current.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      current.setMinutes(current.getMinutes() + 30);
    }
    return times;
  };

  const filterAvailableDates = (date, doctorId) => {
    if (!doctorId || !date) return true;
    const dateObj = new Date(date);
    const day = dateObj.toLocaleString("en-US", { weekday: "short" });
    return getAvailableDays(doctorId).includes(day);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "doctorId") {
      const doctor = getDoctorById(value);
      setNewAppointment((prev) => ({
        ...prev,
        [name]: value,
        date: "",
        day: doctor ? doctor.day : "",
        time: "",
      }));
      setDateError("");
    } else if (name === "date") {
      if (filterAvailableDates(value, newAppointment.doctorId)) {
        const dateObj = new Date(value);
        const dayName = dateObj.toLocaleString("en-US", { weekday: "long" });
        setNewAppointment((prev) => ({ ...prev, [name]: value, day: dayName }));
        setDateError("");
      } else {
        setDateError("Selected date doesn't match doctor's available days.");
        setNewAppointment((prev) => ({ ...prev, [name]: value, day: "" }));
      }
    } else if (name === "time" && newAppointment.doctorId && newAppointment.date && filterAvailableDates(newAppointment.date, newAppointment.doctorId)) {
      setNewAppointment((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewAppointment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setCurrentDocFile(e.target.files[0]);
  };

  const handleAddDocument = () => {
    if (currentDocName && currentDocFile) {
      setNewAppointment((prev) => ({
        ...prev,
        documents: [...prev.documents, { name: currentDocName, file: currentDocFile }],
      }));
      setCurrentDocName("");
      setCurrentDocFile(null);
    } else {
      alert("Please provide both document name and file.");
    }
  };

  const handleRemoveDocument = (index) => {
    setNewAppointment((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAppointment.doctorId || !newAppointment.patientName || !newAppointment.date || !newAppointment.time) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("New Appointment:", newAppointment);

    setNewAppointment({
      doctorId: "",
      patientName: "",
      patientAge: "",
      patientContact: "",
      reason: "",
      date: "",
      day: "",
      time: "",
      documents: [],
    });
    setShowDocuments(false);
    setCurrentDocName("");
    setCurrentDocFile(null);
    setDateError("");
  };

  return (
    <div className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64
     ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div>
        <h2 className="text-2xl font-bold">Add New Appointment</h2>
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
          Schedule a new appointment with a doctor.
        </p>
      </div>

      <div className={`p-4 shadow rounded-md transition-colors duration-300 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="doctorId"
            value={newAppointment.doctorId}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>

          <input
            type="text"
            name="patientName"
            value={newAppointment.patientName}
            onChange={handleInputChange}
            placeholder="Patient Name"
            required
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
          />

          <input
            type="number"
            name="patientAge"
            value={newAppointment.patientAge}
            onChange={handleInputChange}
            placeholder="Patient Age"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
          />

          <input
            type="text"
            name="patientContact"
            value={newAppointment.patientContact}
            onChange={handleInputChange}
            placeholder="Patient Contact Number"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
          />

          <textarea
            name="reason"
            value={newAppointment.reason}
            onChange={handleInputChange}
            placeholder="Reason for Checking"
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
            rows="4"
          />

          <div className="flex space-x-4">
            <input
              type="date"
              name="date"
              value={newAppointment.date}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
            />
            <input
              type="text"
              name="day"
              value={newAppointment.day}
              readOnly
              placeholder="Selected Day"
              className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
            />
          </div>
          {dateError && (
            <p className="text-red-500 text-sm">{dateError}</p>
          )}

          <select
            name="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            required
            disabled={!newAppointment.doctorId || !newAppointment.date || !filterAvailableDates(newAppointment.date, newAppointment.doctorId)}
            className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"} ${(!newAppointment.doctorId || !newAppointment.date || !filterAvailableDates(newAppointment.date, newAppointment.doctorId)) ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <option value="">Select Time Slot</option>
            {newAppointment.doctorId && newAppointment.date && filterAvailableDates(newAppointment.date, newAppointment.doctorId) && getAvailableTimes(newAppointment.doctorId).map((timeSlot, index) => (
              <option key={index} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="documents"
              checked={showDocuments}
              onChange={(e) => setShowDocuments(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="documents" className={darkMode ? "text-gray-100" : "text-gray-900"}>
              Add Documents
            </label>
          </div>

          {showDocuments && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentDocName}
                  onChange={(e) => setCurrentDocName(e.target.value)}
                  placeholder="Document Name"
                  className={`flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                />
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={`flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                />
                <button
                  type="button"
                  onClick={handleAddDocument}
                  className={`px-4 py-2 rounded-lg transition ${darkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-600 text-white hover:bg-green-700"}`}
                >
                  Add New Document
                </button>
              </div>
              {newAppointment.documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Added Documents:</h4>
                  <ul className="space-y-2">
                    {newAppointment.documents.map((doc, index) => (
                      <li key={index} className={`flex justify-between items-center p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}>
                        <span>{doc.name} ({doc.file?.name})</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDocument(index)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className={`p-2 rounded-lg transition ${darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            Add Appointment
          </button>
        </form>
      </div>
    </div>
  );
}