//src/addform/AddProduct.jsx
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import api from "../components/axios.jsx";

export default function AddNewProduct() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    stock: "",
    single: "",
    priceFull: "",
    priceSingle: "",
    mfg: "",
    exp: "",
    branch: "",
    hasSingleCount: false,
  });

  const [medicineTypes, setMedicineTypes] = useState([
    "Tablet",
    "Syrup",
    "Capsule",
  ]);
  const [newType, setNewType] = useState("");
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewTypeChange = (e) => {
    setNewType(e.target.value);
  };

  const handleAddType = (e) => {
    e.preventDefault();
    if (newType.trim() && !medicineTypes.includes(newType.trim())) {
      setMedicineTypes([...medicineTypes, newType.trim()]);
      setFormData((prev) => ({ ...prev, type: newType.trim() }));
      setNewType("");
      setShowTypeInput(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const productData = {
      name: formData.name,
      type: formData.type,
      stock: parseInt(formData.stock),
      single: formData.hasSingleCount ? parseInt(formData.single) : 0,
      priceFull: parseFloat(formData.priceFull),
      priceSingle: formData.hasSingleCount ? parseFloat(formData.priceSingle) : 0,
      mfg: formData.mfg,
      exp: formData.exp,
      branch: formData.branch,
    };

    try {
      console.log("Sending data:", productData);
        console.log("Request URL:", api.getUri({ url: "/products" }));

      const response = await api.post("/products", productData);
      console.log("Product added:", response.data);
     
      setFormData({
        name: "",
        type: "",
        stock: "",
        single: "",
        priceFull: "",
        priceSingle: "",
        mfg: "",
        exp: "",
        branch: "",
        hasSingleCount: false,
      });
      navigate("/products");
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 ml-64 mt-16 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Fill in the details to add a new product to the inventory.
          </p>
        </div>
        <button
          onClick={() => navigate("/products")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "bg-gray-600 text-white hover:bg-gray-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>
      </div>

      <div
        className={`p-6 shadow rounded-md transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
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
              <div className="flex items-center gap-2">
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {medicineTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowTypeInput(!showTypeInput)}
                  className={`mt-1 px-3 py-2 rounded-lg transition ${
                    darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <Plus size={16} />
                </button>
              </div>
              {showTypeInput && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={newType}
                    onChange={handleNewTypeChange}
                    placeholder="Enter new type"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleAddType}
                    className={`mt-2 px-4 py-2 rounded-lg transition ${
                      darkMode
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    Add Type
                  </button>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="stock"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="priceFull"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Price in Full
              </label>
              <input
                type="number"
                name="priceFull"
                id="priceFull"
                value={formData.priceFull}
                onChange={handleInputChange}
                step="0.01"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hasSingleCount"
                id="hasSingleCount"
                checked={formData.hasSingleCount}
                onChange={handleInputChange}
                className={`h-4 w-4 border rounded focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode ? "border-gray-500 bg-gray-600" : "border-gray-300 bg-white"
                }`}
              />
              <label
                htmlFor="hasSingleCount"
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Add Single Count
              </label>
            </div>
            {formData.hasSingleCount && (
              <>
                <div>
                  <label
                    htmlFor="single"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Single Count
                  </label>
                  <input
                    type="number"
                    name="single"
                    id="single"
                    value={formData.single}
                    onChange={handleInputChange}
                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="priceSingle"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Price in Single
                  </label>
                  <input
                    type="number"
                    name="priceSingle"
                    id="priceSingle"
                    value={formData.priceSingle}
                    onChange={handleInputChange}
                    step="0.01"
                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="mfg"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                MFG Date
              </label>
              <input
                type="date"
                name="mfg"
                id="mfg"
                value={formData.mfg}
                onChange={handleInputChange}
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="exp"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Exp. Date
              </label>
              <input
                type="date"
                name="exp"
                id="exp"
                value={formData.exp}
                onChange={handleInputChange}
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="branch"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Branch
              </label>
              <input
                type="text"
                name="branch"
                id="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}