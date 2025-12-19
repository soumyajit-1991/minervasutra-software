import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function AddDoctor() {
  const { darkMode } = useOutletContext();

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    phone: "",
    fees: "",
    clinic: "",
    availability: [], // Array of { day, times } objects
  });

  const [selectedDays, setSelectedDays] = useState([]);
  const [timeInput, setTimeInput] = useState("");

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

  const handleDaySelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedDays(selectedOptions);
  };

  const handleTimeInput = (e) => {
    setTimeInput(e.target.value);
  };

  const addDayTime = () => {
    if (selectedDays.length === 0 || !timeInput.trim()) {
      alert("Please select at least one day and enter a time slot.");
      return;
    }

    const newTimes = Array.from(
      new Set(
        timeInput
          .split(",")
          .map((time) => time.trim())
          .filter((time) => time)
      )
    ); // Use Set to remove duplicates

    setNewDoctor((prev) => {
      const updatedAvailability = [...prev.availability];

      selectedDays.forEach((day) => {
        const existingDayIndex = updatedAvailability.findIndex(
          (item) => item.day === day
        );
        if (existingDayIndex >= 0) {
          // Append new unique times to existing day
          updatedAvailability[existingDayIndex].times = Array.from(
            new Set([...updatedAvailability[existingDayIndex].times, ...newTimes])
          );
        } else {
          // Add new day with unique times
          updatedAvailability.push({ day, times: newTimes });
        }
      });

      return { ...prev, availability: updatedAvailability };
    });

    setSelectedDays([]);
    setTimeInput("");
  };

  const removeDayTime = (dayIndex, timeIndex = null) => {
    setNewDoctor((prev) => {
      const updatedAvailability = [...prev.availability];
      if (timeIndex === null) {
        updatedAvailability.splice(dayIndex, 1);
      } else {
        updatedAvailability[dayIndex].times.splice(timeIndex, 1);
        if (updatedAvailability[dayIndex].times.length === 0) {
          updatedAvailability.splice(dayIndex, 1);
        }
      }
      return { ...prev, availability: updatedAvailability };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDoctor.availability.length === 0) {
      alert("Please add at least one day with time slots.");
      return;
    }
    console.log("New Doctor:", newDoctor);
    setNewDoctor({
      name: "",
      specialty: "",
      phone: "",
      fees: "",
      clinic: "",
      availability: [],
    });
    setSelectedDays([]);
    setTimeInput("");
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

      <div
        className={`p-4 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="space-y-4">
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

          {/* Day and Time Selection */}
          <div className="space-y-2">
            <label
              className={`block font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Select Days and Enter Time Slots
            </label>
            <div className="flex items-center space-x-4">
              <select
                multiple
                value={selectedDays}
                onChange={handleDaySelect}
                className={`w-1/3 p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 h-24 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={timeInput}
                onChange={handleTimeInput}
                placeholder="Enter time slots (e.g., 9:00 AM - 10:00 AM)"
                className={`w-2/3 p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <button
              type="button"
              onClick={addDayTime}
              className={`mt-2 px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Add Days & Times
            </button>
          </div>

          {/* Display Selected Day-Time Combinations */}
          <div>
            <h3
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Selected Availability
            </h3>
            {newDoctor.availability.length === 0 ? (
              <p
                className={darkMode ? "text-gray-400" : "text-gray-600"}
              >
                No availability added yet.
              </p>
            ) : (
              <ul className="space-y-4 mt-2">
                {newDoctor.availability.map((item, dayIndex) => (
                  <li
                    key={dayIndex}
                    className={`p-3 rounded-lg ${
                      darkMode ? "bg-gray-600" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{item.day}</span>
                      <button
                        type="button"
                        onClick={() => removeDayTime(dayIndex)}
                        className={`px-2 py-1 text-sm rounded-lg transition ${
                          darkMode
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        Remove Day
                      </button>
                    </div>
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.times.map((time, timeIndex) => (
                        <li
                          key={timeIndex}
                          className="flex justify-between items-center"
                        >
                          <span>{time}</span>
                          {/* <button
                            type="button"
                            onClick={() => removeDayTime(dayIndex, timeIndex)}
                            className={`px-2 py-1 text-sm rounded-lg transition ${
                              darkMode
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                          >
                            Remove Time
                          </button> */}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className={`mt-4 px-4 py-2 rounded-lg transition ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Add Doctor
          </button>
        </div>
      </div>
    </div>
  );
}