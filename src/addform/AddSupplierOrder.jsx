// pages/AddNewSupplierOrder.jsx
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, X } from "lucide-react";
import api from "../components/axios";

export default function AddNewSupplierOrder() {
  const { darkMode } = useOutletContext();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({
    supplierId: "",
    products: [{ productName: "", quantity: 1, unitPrice: 0 }],
    orderDate: "",
    deliveryAddress: "",
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch suppliers from backend
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/suppliers");
      setSuppliers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch suppliers.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSupplierChange = (e) => {
    const supplierId = e.target.value;
    const supplier = suppliers.find((s) => s._id === supplierId);
    setSelectedSupplier(supplier);
    setFormData({
      ...formData,
      supplierId,
      products: supplier?.products.map((p) => ({ productName: p.name, quantity: 1, unitPrice: p.unitPrice || 0 })) || [{ productName: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: field === "quantity" || field === "unitPrice" ? Number(value) : value };
    setFormData({ ...formData, products: updatedProducts });
    // Update total amount
    const total = updatedProducts.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  };

  const addProductField = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { productName: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const removeProductField = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
    const total = updatedProducts.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/supplier-orders", {
        supplierId: formData.supplierId,
        supplierName: selectedSupplier.name,
        products: formData.products,
        totalAmount: formData.totalAmount,
        deliveryAddress: formData.deliveryAddress,
        orderDate: formData.orderDate,
      });
      alert("Order placed successfully!");
      setFormData({
        supplierId: "",
        products: [{ productName: "", quantity: 1, unitPrice: 0 }],
        orderDate: "",
        deliveryAddress: "",
        totalAmount: 0,
      });
      setSelectedSupplier(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className={`p-6 space-y-6 mt-16 ml-64 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <h2 className="text-2xl font-bold mb-2">Add New Supplier Order</h2>
      {loading ? (
        <p>Loading suppliers...</p>
      ) : (
        <div className={`p-6 shadow rounded-md ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Supplier</label>
              <select
                value={formData.supplierId}
                onChange={handleSupplierChange}
                className={`w-full p-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Order Date</label>
              <input
                type="date"
                value={formData.orderDate}
                onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                className={`w-full p-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                required
              />
            </div>

            <div>
              <label>Delivery Address</label>
              <input
                type="text"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className={`w-full p-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label>Products</label>
                <button type="button" onClick={addProductField} className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg">
                  <Plus size={16} /> Add Product
                </button>
              </div>
              {formData.products.map((p, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <select
                    value={p.productName}
                    onChange={(e) => handleProductChange(idx, "productName", e.target.value)}
                    disabled={!selectedSupplier}
                    className="w-2/5 p-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Product</option>
                    {selectedSupplier?.products.map((prod) => (
                      <option key={prod.name} value={prod.name}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={p.quantity}
                    onChange={(e) => handleProductChange(idx, "quantity", e.target.value)}
                    min="1"
                    className="w-1/5 p-2 border rounded-lg"
                    required
                  />
                  <input
                    type="number"
                    value={p.unitPrice}
                    onChange={(e) => handleProductChange(idx, "unitPrice", e.target.value)}
                    min="0"
                    className="w-1/5 p-2 border rounded-lg"
                    required
                  />
                  {formData.products.length > 1 && (
                    <button type="button" onClick={() => removeProductField(idx)} className="p-2 bg-orange-500 text-white rounded-lg">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>Total Amount: ${formData.totalAmount.toFixed(2)}</div>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Place Order</button>
          </form>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
