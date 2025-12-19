import { useState } from "react";
import { Eye, Edit, Trash2, Printer } from "lucide-react";

export default function AssetList({ darkMode }) {
  // Mock data for Assets
  const [assets, setAssets] = useState([
    {
      id: "AST-001",
      date: "Jan 12, 2024",
      assetName: "MacBook Pro",
      serialNo: "S/N: 232323",
      type: "Laptop",
      assignedTo: "John Doe",
      value: 1200
    },
    {
      id: "AST-002",
      date: "Feb 15, 2024",
      assetName: "Dell Monitor",
      serialNo: "S/N: 554433",
      type: "Monitor",
      assignedTo: "Jane Smith",
      value: 300
    },
    {
      id: "AST-003",
      date: "Mar 10, 2024",
      assetName: "Office Chair",
      serialNo: "S/N: 998877",
      type: "Furniture",
      assignedTo: "Office Hall",
      value: 150
    },
  ]);

  return (
    <div
      className={`p-4 shadow rounded-md transition-colors duration-300 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Asset List</h2>
        <button
          className={`text-sm px-3 py-1 rounded transition ${darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          View All
        </button>
      </div>

      {/* Table */}
      <table
        className={`w-full text-sm shadow text-center overflow-x-auto ${darkMode ? "border-gray-600" : "border-gray-200"
          }`}
      >
        <thead
          className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-600"}
        >
          <tr>
            <th className="p-2">Asset ID</th>
            <th className="p-2">Date Added</th>
            <th className="p-2">Asset Name</th>
            <th className="p-2">Serial No</th>
            <th className="p-2">Type</th>
            <th className="p-2">Assigned To</th>
            <th className="p-2">Value</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr
              key={index}
              className={`shadow transition-colors duration-300 ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-50"
                }`}
            >
              <td className="p-2">{asset.id}</td>
              <td className="p-2">{asset.date}</td>
              <td className="p-2">{asset.assetName}</td>
              <td className="p-2">{asset.serialNo}</td>
              <td className="p-2">{asset.type}</td>
              <td className="p-2">{asset.assignedTo}</td>
              <td className="p-2">${asset.value}</td>
              <td className="p-2 flex gap-2 justify-center">
                {/* <button
                  className={`p-1 rounded transition ${darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                  <Printer size={16} />
                </button> */}
                <button
                  className={`p-1 rounded transition ${darkMode
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  <Edit size={16} />
                </button>
                <button
                  className={`p-1 rounded transition ${darkMode
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
  );
}