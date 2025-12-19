//src/pages/Product.jsx
import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import api from "../components/axios.jsx";

const Product = () => {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products");
      setMedicines(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNewProduct = () => {
    navigate("/add-product");
  };

  return (
    <div
      className={`p-6 ml-64 mt-16 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product List</h2>
        </div>
        <button
          onClick={handleAddNewProduct}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Plus size={18} />
          Add New Product
        </button>
      </div>

      <div
        className={`p-4 shadow rounded-md mt-4 transition-colors duration-300 ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
        } w-full`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Search
              className={`absolute left-3 top-2.5 ${
                darkMode ? "text-gray-300" : "text-gray-400"
              }`}
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        {loading ? (
          <div>Loading products...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table
              className={`min-w-[1200px] w-full border rounded-lg text-center ${
                darkMode ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <thead
                className={darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-900"}
              >
                <tr>
                  <th className="p-3">Product ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Price in Full</th>
                  <th className="p-3">Single Count</th>
                  <th className="p-3">Price in Single</th>
                  <th className="p-3">MFG Date</th>
                  <th className="p-3">Exp. Date</th>
                  <th className="p-3">Branch</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr
                    key={med._id}
                    className={`border-t transition-colors duration-300 text-center text-sm ${
                      darkMode
                        ? "border-gray-600 hover:bg-gray-600 text-gray-100"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{med.productId}</td>
                    <td className="p-3">{med.name}</td>
                    <td className="p-3">{med.type}</td>
                    <td className="p-3">{med.stock}</td>
                    <td className="p-3">${med.priceFull.toFixed(2)}</td>
                    <td className="p-3">{med.single}</td>
                    <td className="p-3">${med.priceSingle.toFixed(2)}</td>
                    <td className="p-3">{new Date(med.mfg).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(med.exp).toLocaleDateString()}</td>
                    <td className="p-3">{med.branch}</td>
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
        )}

        <div
          className={`flex items-center justify-between mt-4 text-sm ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <span>Showing {medicines.length} entries</span>
          <div className="flex items-center gap-2">
            <button
              className={`px-2 py-1 border rounded ${
                darkMode ? "border-gray-500 hover:bg-gray-600 text-gray-200" : "border-gray-300 hover:bg-gray-100"
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
                  ? "border-gray-500 text-gray-200 hover:bg-gray-600"
                  : "border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              2
            </button>
            <button
              className={`px-3 py-1 border rounded ${
                darkMode
                  ? "border-gray-500 text-gray-200 hover:bg-gray-600"
                  : "border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              3
            </button>
            <span>...</span>
            <button
              className={`px-3 py-1 border rounded ${
                darkMode
                  ? "border-gray-500 text-gray-200 hover:bg-gray-600"
                  : "border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              10
            </button>
            <button
              className={`px-2 py-1 border rounded ${
                darkMode ? "border-gray-500 hover:bg-gray-600 text-gray-200" : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              &gt;
            </button>
          </div>
          <div>
            <select
              className={`border rounded px-2 py-1 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-200"
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
    </div>
  );
};

export default Product;