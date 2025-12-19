import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { createExpense, fetchExpense, updateExpense } from "../api/expenseService";

export default function AddExpense() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    paidAmount: "",
    due: "",
    dueDate: "",
    status: "Pending"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" || name === "paidAmount") {
      // Calculate due amount automatically
      const amount = name === "amount" ? parseFloat(value) || 0 : parseFloat(formData.amount) || 0;
      const paidAmount = name === "paidAmount" ? parseFloat(value) || 0 : parseFloat(formData.paidAmount) || 0;
      setFormData({ ...formData, [name]: value, due: (amount - paidAmount).toFixed(2) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchExpense(id)
        .then((data) => {
          setFormData({
            category: data.category || "",
            amount: data.amount || "",
            paidAmount: data.paid || "",
            due: data.due || "",
            dueDate: data.date || "",
            status: data.status || "Pending"
          });
        })
        .catch((err) => alert(err.message || "Failed to load expense details"));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateExpense(id, {
          category: formData.category,
          description: formData.category,
          date: formData.dueDate,
          amount: Number(formData.amount),
          paid: Number(formData.paidAmount),
          status: formData.status
        });
        alert("Expense updated!");
      } else {
        const created = await createExpense({
          category: formData.category,
          description: formData.category,
          vendor: "",
          paymentMethod: "",
          date: formData.dueDate || new Date().toISOString().slice(0, 10),
          amount: Number(formData.amount),
          paid: Number(formData.paidAmount),
        });
        alert(`Expense added! ID: ${created.expenseId}`);
      }
      setFormData({
        category: "",
        amount: "",
        paidAmount: "",
        due: "",
        dueDate: ""
      });
      navigate("/expenses");
    } catch (err) {
      alert(err.message || "Failed to save expense");
    }
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300  mt-16 ml-64 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{isEdit ? "Edit Expense" : "Add New Expense"}</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Record a new expense for pharmacy operations.
          </p>
        </div>
      </div>

      <div
        className={`p-6 shadow rounded-md transition-colors duration-300 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
          }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
                placeholder="Enter expense category"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
                placeholder="Enter total amount"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Paid Amount</label>
              <input
                type="number"
                name="paidAmount"
                value={formData.paidAmount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
                placeholder="Enter paid amount"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due</label>
              <input
                type="number"
                name="due"
                value={formData.due}
                readOnly
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
                placeholder="Due amount (auto-calculated)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg transition ${darkMode
                ? "bg-gray-600 text-white hover:bg-gray-500"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg transition ${darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {isEdit ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}