import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddNew({ darkMode }) {
  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate("/add-interview-scheduling");
  };

  const handleAddVacancy = () => {
    navigate("/add-product");
  };

  const handleAddEmployee = () => {
    navigate("/add-new-employee");
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
        onClick={handleAddOrder}
        className={`mt-5 flex items-center gap-2 px-4 py-4 rounded-lg transition ${buttonClass}`}
      >
        <Plus size={18} />
        Add Interview Scheduling
      </button>

      <button
        onClick={handleAddVacancy}
        className={`flex items-center gap-2 px-4 py-4 rounded-lg transition ${buttonClass}`}
      >
        <Plus size={18} />
        Add New Vacancy
      </button>

      <button
        onClick={handleAddEmployee}
        className={`flex items-center gap-2 px-4 py-4 rounded-lg transition ${buttonClass}`}
      >
        <Plus size={18} />
        Add New Employee
      </button>

      <button
        onClick={handleAddEmployee}
        className={`flex items-center gap-2 px-4 py-4 rounded-lg transition ${buttonClass}`}
      >
        <Plus size={18} />
        Add New Workflow
      </button>
    </div>
  );
}