//src/addform/AddSuppliers.jsx
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import api from "../components/axios";

export default function AddSupplier() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    products: [{ name: "" }],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (index, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { name: value };
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProductField = () => {
    setFormData({ ...formData, products: [...formData.products, { name: "" }] });
  };

  const removeProductField = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.products.some((product) => !product.name)) {
      setError("Please provide a name for all products.");
      return;
    }

    try {
      const payload = {
        ...formData,
        products: formData.products.map((product) => ({ name: product.name })),
      };

      await api.post("/suppliers", payload);
      setSuccess("Supplier added successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        products: [{ name: "" }],
      });

      setTimeout(() => {
        navigate("/suppliers");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add supplier.");
      console.error(err);
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
          <h2 className="text-2xl font-bold">Add New Supplier</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Enter details to add a new supplier.
          </p>
        </div>
      </div>

      <div
        className={`p-6 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          {success && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Supplier Name"
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode ? "bg-gray-600 border-gray-500 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Mobile number"
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode ? "bg-gray-600 border-gray-500 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email Id"
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode ? "bg-gray-600 border-gray-500 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode ? "bg-gray-600 border-gray-500 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Products</label>
              <button
                type="button"
                onClick={addProductField}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
                  darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Plus size={16} /> Add Product
              </button>
            </div>
            {formData.products.map((product, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                  placeholder="Enter Product Name"
                  className={`w-2/3 p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode ? "bg-gray-600 border-gray-500 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProductField(index)}
                    className={`p-2 rounded transition ${
                      darkMode ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/suppliers")}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg transition ${
                darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Add Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}