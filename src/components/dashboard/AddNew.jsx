import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddNew({ darkMode }) {
  const navigate = useNavigate();

  const handleAddInterview = () => {
    navigate("/add-interview");
  };

  const handleAddJobPosting = () => {
    navigate("/add-job-posting");
  };

  const handleAddEmployee = () => {
    navigate("/add-new-employee");
  };

  const handleAddWorkflow = () => {
    navigate("/add-event");
  };

  // Define the new button classes
  const buttonClass = "bg-cyan-500 text-gray-800 hover:bg-cyan-600 cursor-pointer";

  return (
    <div
      className={`rounded-xl shadow p-4 flex flex-col gap-3 w-full space-y-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
      }`}
      style={{ height: "100%" }}
    >
      <button
        onClick={handleAddInterview}
        className={`mt-5 flex items-center gap-2 px-4 py-4 rounded-lg transition ${buttonClass}`}
      >
        <Plus size={18} />
        Add Interview
      </button>

      <button
        onClick={handleAddJobPosting}
        className={`flex items-center gap-2 px-4 py-4 rounded-lg transition ${buttonClass}`}
      >
        <Plus size={18} />
        Add Job Posting
      </button>

      <button
        onClick={handleAddEmployee}
        className={`flex items-center gap-2 px-4 py-4 rounded-lg transition ${buttonClass}`}
      >
        <Plus size={18} />
        Add New Employee
      </button>

      <button
        onClick={handleAddWorkflow}
        className={`flex items-center gap-2 px-4 py-4 rounded-lg transition ${buttonClass}`}
      >
        <Plus size={18} />
        Add Event
      </button>
    </div>
  );
}