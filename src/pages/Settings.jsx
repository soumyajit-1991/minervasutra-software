import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Settings() {
  const { darkMode } = useOutletContext();

  const [settings, setSettings] = useState({
    currency: "USD",
    shiftTimes: [{ id: 1, start: "09:00", end: "17:00" }],
    doctorClinicAvailable: false,
    gstRate: 18, // Default GST rate in percentage
  });

  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSelectChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShiftTimeChange = (id, field, value) => {
    setSettings((prev) => ({
      ...prev,
      shiftTimes: prev.shiftTimes.map((shift) =>
        shift.id === id ? { ...shift, [field]: value } : shift
      ),
    }));
  };

  const handleAddShiftTime = () => {
    const newId = settings.shiftTimes.length
      ? Math.max(...settings.shiftTimes.map((shift) => shift.id)) + 1
      : 1;
    setSettings((prev) => ({
      ...prev,
      shiftTimes: [...prev.shiftTimes, { id: newId, start: "09:00", end: "17:00" }],
    }));
  };

  const handleRemoveShiftTime = (id) => {
    setSettings((prev) => ({
      ...prev,
      shiftTimes: prev.shiftTimes.filter((shift) => shift.id !== id),
    }));
  };

  const handleGSTChange = (value) => {
    const previousGST = settings.gstRate; // Capture previous GST value
    console.log("Previous GST Rate:", previousGST);
    const newValue = Math.max(0, parseFloat(value) || 0); // Ensure non-negative
    setSettings((prev) => ({
      ...prev,
      gstRate: newValue,
    }));
    console.log("New GST Rate:", newValue);
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings);
    // Example: Save to a backend API
    // fetch('/api/save-settings', {
    //   method: 'POST',
    //   body: JSON.stringify(settings),
    //   headers: { 'Content-Type': 'application/json' },
    // })
    // .then(response => response.json())
    // .then(data => console.log('Settings saved:', data))
    // .catch(error => console.error('Error saving settings:', error));
    alert("Settings saved successfully!");
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Add actual logout logic here (e.g., clear auth token, redirect to login)
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
          Configure your pharmacy preferences.
        </p>
      </div>

      <div className="space-y-4">
        {/* Currency Selection */}
        <div
          className={`flex items-center justify-between p-4 border rounded transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
          }`}
        >
          <div>
            <h3 className="font-medium text-lg">💵 Currency</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Select the currency for transactions and display.
            </p>
          </div>
          <select
            value={settings.currency}
            onChange={(e) => handleSelectChange("currency", e.target.value)}
            className={`border rounded px-2 py-1 text-sm ${
              darkMode
                ? "bg-gray-600 border-gray-500 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        {/* GST Rate */}
        <div
          className={`flex items-center justify-between p-4 border rounded transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
          }`}
        >
          <div>
            <h3 className="font-medium text-lg">🧾 GST Rate</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Set the Goods and Services Tax rate (in percentage).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              step="0.1"
              value={settings.gstRate}
              onChange={(e) => handleGSTChange(e.target.value)}
              className={`w-20 border rounded px-2 py-1 text-sm text-right ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <span>%</span>
          </div>
        </div>

        {/* Shift Timing */}
        <div
          className={`p-4 border rounded transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-lg">⏰ Shift Timing</h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Set the start and end times for employee shifts.
              </p>
            </div>
            <button
              onClick={handleAddShiftTime}
              className={`px-3 py-1 rounded text-sm transition ${
                darkMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Add New Time Duration
            </button>
          </div>
          <div className="space-y-4 mt-4">
            {settings.shiftTimes.map((shift) => (
              <div key={shift.id} className="flex items-center gap-4">
                <div>
                  <label
                    htmlFor={`shiftStart-${shift.id}`}
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Start Time
                  </label>
                  <input
                    type="time"
                    id={`shiftStart-${shift.id}`}
                    value={shift.start}
                    onChange={(e) =>
                      handleShiftTimeChange(shift.id, "start", e.target.value)
                    }
                    className={`mt-1 border rounded px-2 py-1 text-sm ${
                      darkMode
                        ? "bg-gray-600 border-gray-500 text-gray-100"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`shiftEnd-${shift.id}`}
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    End Time
                  </label>
                  <input
                    type="time"
                    id={`shiftEnd-${shift.id}`}
                    value={shift.end}
                    onChange={(e) =>
                      handleShiftTimeChange(shift.id, "end", e.target.value)
                    }
                    className={`mt-1 border rounded px-2 py-1 text-sm ${
                      darkMode
                        ? "bg-gray-600 border-gray-500 text-gray-100"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                {settings.shiftTimes.length > 1 && (
                  <button
                    onClick={() => handleRemoveShiftTime(shift.id)}
                    className={`mt-6 px-3 py-1 rounded text-sm transition ${
                      darkMode
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Clinic Availability */}
        <div
          className={`flex items-center justify-between p-4 border rounded transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
          }`}
        >
          <div>
            <h3 className="font-medium text-lg">🏥 Doctor Clinic</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Enable or disable the pharmacy's doctor clinic.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.doctorClinicAvailable}
            onChange={() => handleToggle("doctorClinicAvailable")}
            className="w-5 h-5"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSaveSettings}
            className={`px-4 py-2 rounded transition ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Save Settings
          </button>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              darkMode
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}