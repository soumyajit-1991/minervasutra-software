import { useState } from "react";
import { Eye, Edit, Trash2, Search, Filter, Plus, Printer, ScrollText } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export default function Purchase() {
  const { darkMode } = useOutletContext();
  const [purchases, setPurchases] = useState([
    { id: "#P-001", date: "Feb 19, 2025", supplier: "Square", amount: 2500, paid: 2300, due: 200, medicines: [
      { name: "Paracetamol", quantity: 100, price: 15 },
      { name: "Ibuprofen", quantity: 50, price: 10 }
    ]},
    { id: "#P-002", date: "Feb 20, 2025", supplier: "Beximco", amount: 660, paid: 300, due: 360, medicines: [
      { name: "Amoxicillin", quantity: 30, price: 22 }
    ]},
    { id: "#P-003", date: "Feb 21, 2025", supplier: "Renata", amount: 3763, paid: 3300, due: 463, medicines: [
      { name: "Metformin", quantity: 60, price: 30 },
      { name: "Amlodipine", quantity: 45, price: 25 }
    ]},
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const handleViewMedicines = (medicines) => {
    setSelectedMedicines(medicines);
    setShowModal(true);
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Purchase List</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Manage purchases from suppliers.
          </p>
        </div>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Plus size={18} />
          Add New Purchase
        </button>
      </div>

      <div
        className={`p-4 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Search
              className={`absolute left-3 top-2.5 ${
                darkMode ? "text-gray-400" : "text-gray-400"
              }`}
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <ScrollText />
        </div>

        <div className="overflow-x-auto">
          <table
            className={`w-full border rounded-lg text-sm overflow-x-auto ${
              darkMode ? "border-gray-600" : "border-gray-200"
            }`}
          >
            <thead
              className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}
            >
              <tr>
                <th className="p-3">Purchase ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Paid Amount</th>
                <th className="p-3">Due</th>
                <th className="p-3">Product List</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase, index) => (
                <tr
                  key={index}
                  className={`border-t transition-colors duration-300 text-center ${
                    darkMode
                      ? "border-gray-600 hover:bg-gray-600"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3">{purchase.id}</td>
                  <td className="p-3">{purchase.date}</td>
                  <td className="p-3">{purchase.supplier}</td>
                  <td className="p-3">${purchase.amount.toLocaleString()}</td>
                  <td className="p-3">${purchase.paid}</td>
                  <td className="p-3">${purchase.due}</td>
                  <td className="p-2">
                    <button onClick={() => handleViewMedicines(purchase.medicines)}>
                      <Eye size={16} />
                    </button>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className={`p-2 rounded transition ${
                        darkMode
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={`p-2 rounded transition ${
                        darkMode
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={`flex items-center justify-between mt-4 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span>Showing 1 to 3 of 50 entries</span>
          <div className="flex items-center gap-2">
            <button
              className={`px-2 py-1 border rounded ${
                darkMode ? "border-gray-500 hover:bg-gray-600" : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              &lt;
            </button>
            <button
              className={`px-3 py-1 border rounded ${
                darkMode
                  ? "bg-blue-600 text-white border-gray-500"
                  : "bg-blue-600 text-white border-gray-300"
              }`}
            >
              1
            </button>
            <button
              className={`px-3 py-1 border rounded ${
                darkMode
                  ? "border-gray-500 text-gray-100 hover:bg-gray-600"
                  : "border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              2
            </button>
            <button
              className={`px-3 py-1 border rounded ${
                darkMode
                  ? "border-gray-500 text-gray-100 hover:bg-gray-600"
                  : "border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              3
            </button>
            <span>...</span>
            <button
              className={`px-3 py-1 border rounded ${
                darkMode
                  ? "border-gray-500 text-gray-100 hover:bg-gray-600"
                  : "border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              10
            </button>
            <button
              className={`px-2 py-1 border rounded ${
                darkMode ? "border-gray-500 hover:bg-gray-600" : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              &gt;
            </button>
          </div>
          <div>
            <select
              className={`border rounded px-2 py-1 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option>Show 8</option>
              <option>Show 10</option>
              <option>Show 20</option>
            </select>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0  bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 max-w-lg w-full ${
              darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Medicine List</h3>
              <button
                onClick={() => setShowModal(false)}
                className={`p-2 rounded ${
                  darkMode
                    ? "bg-gray-600 text-white hover:bg-gray-500"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                Close
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead
                  className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}
                >
                  <tr>
                    <th className="p-3 text-left">Medicine Name</th>
                    <th className="p-3 text-left">Quantity</th>
                    <th className="p-3 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMedicines.map((medicine, index) => (
                    <tr
                      key={index}
                      className={`border-t ${
                        darkMode
                          ? "border-gray-600 hover:bg-gray-600"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-3">{medicine.name}</td>
                      <td className="p-3">{medicine.quantity}</td>
                      <td className="p-3">${medicine.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}