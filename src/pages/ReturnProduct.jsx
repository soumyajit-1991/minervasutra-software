import { useState } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function ReturnProduct() {
  const { darkMode } = useOutletContext();
 const navigate = useNavigate();
  const [returns, setReturns] = useState([
    {
      id: "#RET001",
      orderId: "#ORD001",
      product: "Paracetamol",
      type: "Supplier",
      reason: "Damaged",
      returnDate: "25.08.2025",
      status: "Pending",
    },
    {
      id: "#RET002",
      orderId: "#ORD002",
      product: "Amoxicillin",
      type: "Customer",
      reason: "Expired",
      returnDate: "26.08.2025",
      status: "Approved",
    },
    {
      id: "#RET003",
      orderId: "#ORD003",
      product: "Metformin",
      type: "Supplier",
      reason: "Damaged",
      returnDate: "27.08.2025",
      status: "Rejected",
    },
    {
      id: "#RET004",
      orderId: "#ORD004",
      product: "Losartan",
      type: "Customer",
      reason: "Expired",
      returnDate: "27.08.2025",
      status: "Pending",
    },
    {
      id: "#RET005",
      orderId: "#ORD005",
      product: "Aspirin",
      type: "Customer",
      reason: "Damaged",
      returnDate: "28.08.2025",
      status: "Approved",
    },
  ]);

  // Function to determine status background color
  const getStatusBgColor = (status) => {
    switch (status) {
      case "Pending":
        return darkMode ? "bg-red-600" : "bg-red-200";
      case "Approved":
        return darkMode ? "bg-green-600" : "bg-green-200";
      case "Rejected":
        return darkMode ? "bg-orange-600" : "bg-orange-200";
      default:
        return "";
    }
  };

  // Placeholder functions for approve/reject actions
  const handleApprove = (id) => {
    alert(`Approving return ${id}...`);
    // Add logic to update status to "Approved"
  };

  const handleReject = (id) => {
    alert(`Rejecting return ${id}...`);
    // Add logic to update status to "Rejected"
  };

  // Handle Add New Employee
  const handleAddReturnProduct = () => {
     navigate("/add-return-product");
  };


  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Return Product List</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Manage damaged and expired product returns.
          </p>
        </div>
         <button
          onClick={handleAddReturnProduct}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Plus size={18} />
          Add New Return Product
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
              placeholder="Search returns..."
              className={`pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table
            className={`min-w-[1200px] border rounded-lg  text-center  ${
              darkMode ? "border-gray-600" : "border-gray-200"
            }`}
          >
            <thead
              className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}
            >
              <tr>
                <th className="p-3">Return ID</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Product</th>
                <th className="p-3">Type</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Return Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((returnItem, index) => (
                <tr
                  key={index}
                  className={`border-t transition-colors duration-300 ${
                    darkMode
                      ? "border-gray-600 hover:bg-gray-600"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3">{returnItem.id}</td>
                  <td className="p-3">{returnItem.orderId}</td>
                  <td className="p-3">{returnItem.product}</td>
                  <td className="p-3">{returnItem.type}</td>
                  <td className="p-3">{returnItem.reason}</td>
                  <td className="p-3">{returnItem.returnDate}</td>
                  <td className={`p-3 ${getStatusBgColor(returnItem.status)}`}>
                    {returnItem.status}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(returnItem.id)}
                      className={`p-2 rounded transition ${
                        darkMode
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                      disabled={returnItem.status !== "Pending"}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleReject(returnItem.id)}
                      className={`p-2 rounded transition ${
                        darkMode
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                      disabled={returnItem.status !== "Pending"}
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
          <span>Showing 1 to 5 of 20 entries</span>
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
            <span>...</span>
            <button
              className={`px-2 py-1 border rounded ${
                darkMode ? "border-gray-500 hover:bg-gray-600" : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}