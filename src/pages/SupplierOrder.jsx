// pages/SupplierOrder.jsx
import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import api from "../components/axios";

export default function SupplierOrder() {
   const navigate = useNavigate();
  const { darkMode } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/supplier-orders");
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/supplier-orders/${id}`);
      setOrders(orders.filter((o) => o._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleWhatsapp = (order) => {
    const msg = `Invoice ID: ${order.supplierId}\nSupplier: ${order.supplierName}\nTotal: $${order.totalAmount}\nStatus: ${order.status}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleEditClick = (order) => {
    setSelectedOrder({ ...order });
    setShowEditModal(true);
  };

  const handleEditChange = (field, value) => {
    setSelectedOrder({ ...selectedOrder, [field]: value });
  };

  const saveEdit = async () => {
    try {
      await api.put(`/supplier-orders/${selectedOrder._id}`, selectedOrder);
      setOrders(orders.map((o) => (o._id === selectedOrder._id ? selectedOrder : o)));
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewProducts = (order) => {
    setSelectedOrder(order);
    setShowProductsModal(true);
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Order Placed":
        return darkMode ? "bg-yellow-600" : "bg-yellow-200";
      case "Order Received":
        return darkMode ? "bg-blue-600" : "bg-blue-200";
      // case "Shipped":
      //   return darkMode ? "bg-purple-600" : "bg-purple-200";
      // case "Delivered":
      //   return darkMode ? "bg-green-600" : "bg-green-200";
      case "Order Cancelled":
        return darkMode ? "bg-red-600" : "bg-red-200";
      default:
        return "";
    }
  };
 const handleAddNewSupplierOrder = () => {
    navigate("/add-supplier-order");
  };
  return (
    <div className={`p-6 space-y-6 mt-16 ml-64 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <div  className="flex items-center justify-between">
      <h2 className="text-2xl font-bold mb-4">Suppliers Orders List</h2>
        <button
          onClick={handleAddNewSupplierOrder}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add New SupplierOrder
        </button>
        </div>
      <div className={`p-4 shadow rounded-md ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Search className={`absolute left-3 top-2.5 text-gray-400`} size={18} />
            <input type="text" placeholder="Search..." className={`pl-10 pr-4 py-2 border rounded-lg w-full`} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`min-w-[1200px] border rounded-lg text-center ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
            <thead className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}>
              <tr>
                <th className="p-3">Invoice ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Suppliers</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Paid Amount</th>
                <th className="p-3">Due</th>
                <th className="p-3">Products</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, idx) => (
                <tr key={idx} className={`border-t ${darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-50"}`}>
                  <td className="p-3">{o.supplierId}</td>
                  <td className="p-3">{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td className="p-3">{o.supplierName}</td>
                  <td className="p-3">${o.totalAmount.toLocaleString()}</td>
                  <td className="p-3">${o.paidAmount?.toLocaleString() || 0}</td>
                  <td className="p-3">${o.dueAmount?.toLocaleString() || o.totalAmount}</td>
                  <td className="p-2">
                    <button onClick={() => handleViewProducts(o)}><Eye size={16} /></button>
                  </td>
                  <td className={`p-3 ${getStatusBgColor(o.status)}`}>{o.status}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button onClick={() => handleWhatsapp(o)} className="p-2 rounded bg-green-500 text-white"><FaWhatsapp size={16} /></button>
                    <button onClick={() => handleEditClick(o)} className="p-2 rounded bg-blue-500 text-white"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(o._id)} className="p-2 rounded bg-orange-500 text-white"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Modal */}
      {showProductsModal && selectedOrder && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm 
          ${darkMode ? "bg-black/60" : "bg-gray-900/40"}`}>
          <div  className={`rounded-lg p-6 max-w-lg w-full ${
              darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
            }`}>
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Products Ordered</h3>
              <button onClick={() => setShowProductsModal(false)} className="p-2 bg-gray-300 rounded">Close</button>
            </div>
            <table className="w-full text-left">
              <thead className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}>
                <tr>
                  <th className="p-2">Product Name</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.products.map((p, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{p.productName}</td>
                    <td className="p-2">{p.quantity}</td>
                    <td className="p-2">${p.unitPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedOrder && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm 
          ${darkMode ? "bg-black/60" : "bg-gray-900/40"}`}>
          <div className={`rounded-lg p-6 max-w-lg w-full ${
              darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
            }`}>
            <h3 className="text-xl font-bold mb-4">Edit Order</h3>
            <div className="space-y-3">
            <div>
  <label className="block mb-1">Status</label>
  <select
    value={selectedOrder.status}
    onChange={(e) => handleEditChange("status", e.target.value)}
    className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-gray-100"
        : "bg-white border-gray-300 text-gray-900"
    }`}
  >
    <option className={darkMode ? "bg-gray-700 text-gray-100" : ""}>Order Placed</option>
    <option className={darkMode ? "bg-gray-700 text-gray-100" : ""}>Order Received</option>
    {/* <option className={darkMode ? "bg-gray-700 text-gray-100" : ""}>Shipped</option>
    <option className={darkMode ? "bg-gray-700 text-gray-100" : ""}>Delivered</option> */}
    <option className={darkMode ? "bg-gray-700 text-gray-100" : ""}>Order Cancelled</option>
  </select>
</div>

              <div>
                <label>Paid Amount</label>
                <input type="number" value={selectedOrder.paidAmount || 0} onChange={(e) => handleEditChange("paidAmount", Number(e.target.value))} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label>Due Amount</label>
                <input type="number" value={selectedOrder.dueAmount || 0} onChange={(e) => handleEditChange("dueAmount", Number(e.target.value))} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label>Order Date</label>
                <input type="date" value={new Date(selectedOrder.orderDate).toISOString().split("T")[0]} onChange={(e) => handleEditChange("orderDate", e.target.value)} className="w-full p-2 border rounded" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
