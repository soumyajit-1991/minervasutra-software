//src/pages/CustomerOrder.jsx
import { useState } from "react";
import { Eye, Edit, Trash2, Search, Filter, Plus, Printer, ScrollText } from "lucide-react";
import { useOutletContext,useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

export default function CustomerOrders() {
  const { darkMode } = useOutletContext();
const navigate = useNavigate();
  const [orders, setOrders] = useState([
    { 
      id: "#ORD001", 
      date: " 24.08.2025", 
      customer: "A Khan", 
      amount: 1200, 
      status: "Pending", 
      deliveryDate: "12.09.2025",
      products: [
        { name: "Paracetamol", quantity: 50, price: 10 },
        { name: "Ibuprofen", quantity: 30, price: 15 }
      ]
    },
    { 
      id: "#ORD002", 
      date: "25.08.2025", 
      customer: "B Smith", 
      amount: 1200, 
      status: "Completed", 
      deliveryDate: "12.09.2025",
      products: [
        { name: "Amoxicillin", quantity: 20, price: 25 },
        { name: "Ciprofloxacin", quantity: 15, price: 30 }
      ]
    },
    { 
      id: "#ORD003", 
      date: "26.08.2025", 
      customer: "C Johnson", 
      amount: 1200, 
      status: "Processing", 
      deliveryDate: "12:09:2025",
      products: [
        { name: "Metformin", quantity: 40, price: 12 },
        { name: "Amlodipine", quantity: 25, price: 18 }
      ]
    },
    { 
      id: "#ORD004", 
      date: "26.08.2025", 
      customer: "C Johnson", 
      amount: 1200, 
      status: "Out of Delivery", 
      deliveryDate: "12.09.2025",
      products: [
        { name: "Losartan", quantity: 30, price: 20 },
        { name: "Aspirin", quantity: 100, price: 5 }
      ]
    },
    { 
      id: "#ORD005", 
      date: "26.08.2025", 
      customer: "C Johnson", 
      amount: 1200, 
      status: "Delivered", 
      deliveryDate: "12.09.2025",
      products: [
        { name: "Paracetamol", quantity: 60, price: 10 },
        { name: "Metformin", quantity: 35, price: 12 }
      ]
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleViewProducts = (products) => {
    setSelectedProducts(products);
    setShowModal(true);
  };

  // Function to determine status background color
  const getStatusBgColor = (status) => {
    switch (status) {
      case "Pending":
        return darkMode ? "bg-red-600" : "bg-red-200";
      case "Delivered":
        return darkMode ? "bg-green-400" : "bg-green-200";
      case "Processing":
        return darkMode ? "bg-orange-600" : "bg-orange-200";
      case "Out of Delivery":
        return darkMode ? "bg-yellow-600" : "bg-yellow-200";
    case "Completed":
        return darkMode ? "bg-green-900" : "bg-green-400";
      default:
        return "";
    }
  };
const handleAddNewCustomer = () => {
    navigate('/add-customer-order');
  };
  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Orders List</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Manage customer orders and their statuses.
          </p>
        </div>
        <button
         onClick={handleAddNewCustomer}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Plus size={18} />
          Add New Customer Order
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
          {/* <ScrollText /> */}
        </div>

        <div className="overflow-x-auto">
          <table
            className={`min-w-[1200px] border rounded-lg text-center ${
              darkMode ? "border-gray-600" : "border-gray-200"
            }`}
          >
            <thead
              className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}
            >
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Customer</th>
                <th className="p-3">List</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Delivery Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`border-t transition-colors duration-300 ${
                    darkMode
                      ? "border-gray-600 hover:bg-gray-600"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-2">
                    <button onClick={() => handleViewProducts(order.products)}>
                      <Eye size={16} />
                    </button>
                  </td>
                  <td className="p-3">${order.amount.toLocaleString()}</td>
                  <td className={`p-3 ${getStatusBgColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="p-3">{order.deliveryDate}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className={`p-2 rounded transition ${
                        darkMode
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      <FaWhatsapp size={16} />
                    </button>
                    <button
                      className={`p-2 rounded transition ${
                        darkMode
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      <Printer size={16} />
                    </button>
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
          <span>Showing 1 to 5 of 50 entries</span>
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
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 max-w-lg w-full ${
              darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Products Ordered</h3>
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
                    <th className="p-3 text-left">Product Name</th>
                    <th className="p-3 text-left">Quantity</th>
                    <th className="p-3 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((product, index) => (
                    <tr
                      key={index}
                      className={`border-t ${
                        darkMode
                          ? "border-gray-600 hover:bg-gray-600"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">{product.quantity}</td>
                      <td className="p-3">${product.price}</td>
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