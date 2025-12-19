import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function AddReturnProduct() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product: "",
    type: "Supplier",
    reason: "Damaged",
    returnDate: new Date().toISOString().split('T')[0],
    status: "Pending"
  });

  const [types, setTypes] = useState(["Supplier", "Customer"]);
  const [reasons, setReasons] = useState(["Damaged", "Expired", "Other"]);
  const [newReason, setNewReason] = useState("");
  const [newType, setNewType] = useState("");
  const [errors, setErrors] = useState({});
  const [showReasonInput, setShowReasonInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === "reason" && value === "Other") {
      setShowReasonInput(true);
    } else if (name === "reason" && value !== "Other") {
      setShowReasonInput(false);
      setNewReason("");
    }
  };

  const handleAddReason = (e) => {
    e.preventDefault();
    if (!newReason.trim()) {
      alert("Reason cannot be empty");
      return;
    }
    if (!reasons.includes(newReason.trim())) {
      setReasons([...reasons.filter(r => r !== "Other"), newReason.trim(), "Other"]);
      setFormData(prev => ({
        ...prev,
        reason: newReason.trim()
      }));
      setNewReason("");
      setShowReasonInput(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.product.trim()) newErrors.product = "Product is required";
    if (!formData.returnDate) newErrors.returnDate = "Return date is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Return product saved successfully!");
    navigate("/returns");
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Return Product</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Fill in the details to create a new product return.
          </p>
        </div>
        <button
          onClick={() => navigate("/returns")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "bg-gray-600 text-white hover:bg-gray-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          <ArrowLeft size={18} />
          Back to Returns
        </button>
      </div>

      <div
        className={`p-6 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Product
              </label>
              <input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Enter Product Name"
                className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                } ${errors.product ? "border-red-500" : ""}`}
                required
              />
              {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product}</p>}
            </div>

            <div>
              <label
                htmlFor="type"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="reason"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Reason
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
              {showReasonInput && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    placeholder="Enter new reason"
                    className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleAddReason}
                    className={`mt-2 px-4 py-2 rounded-lg transition ${
                      darkMode
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    Add Reason
                  </button>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="returnDate"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                } ${errors.returnDate ? "border-red-500" : ""}`}
                required
              />
              {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/returns")}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Save size={18} />
              Save Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}