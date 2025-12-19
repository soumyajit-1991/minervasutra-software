import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";

export default function AddBranch() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    manager: {
      name: "",
      address: "",
      contact: "",
      email: "",
      aadhaar: ""
    },
    employees: [],
    suppliers: []
  });

  // const [newEmployee, setNewEmployee] = useState({
  //   name: "",
  //   mobile: "",
  //   aadhaar: "",
  //   address: "",
  //   role: ""
  // });

  // const [newSupplier, setNewSupplier] = useState({
  //   name: "",
  //   contact: "",
  //   email: "",
  //   address: ""
  // });

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section === "manager") {
      setFormData(prev => ({
        ...prev,
        manager: { ...prev.manager, [name]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleAddEmployee = (e) => {
  //   e.preventDefault();
  //   if (newEmployee.name && newEmployee.mobile && newEmployee.aadhaar && newEmployee.address && newEmployee.role) {
  //     const employeeId = formData.employees.length + 1;
  //     setFormData(prev => ({
  //       ...prev,
  //       employees: [...prev.employees, { ...newEmployee, id: employeeId }]
  //     }));
  //     setNewEmployee({ name: "", mobile: "", aadhaar: "", address: "", role: "" });
  //   }
  // };

  // const handleAddSupplier = (e) => {
  //   e.preventDefault();
  //   if (newSupplier.name && newSupplier.contact && newSupplier.email && newSupplier.address) {
  //     const supplierId = formData.suppliers.length + 1;
  //     setFormData(prev => ({
  //       ...prev,
  //       suppliers: [...prev.suppliers, { ...newSupplier, id: supplierId }]
  //     }));
  //     setNewSupplier({ name: "", contact: "", email: "", address: "" });
  //   }
  // };

  // const handleRemoveEmployee = (id) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     employees: prev.employees.filter(emp => emp.id !== id)
  //   }));
  // };

  // const handleRemoveSupplier = (id) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     suppliers: prev.suppliers.filter(sup => sup.id !== id)
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the new branch
    alert("Branch added successfully!");
    navigate("/branches");
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64  ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Branch</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Fill in the details to create a new branch. You can add multiple employees and suppliers.
          </p>
        </div>
        <button
          onClick={() => navigate("/branch")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "bg-gray-600 text-white hover:bg-gray-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          <ArrowLeft size={18} />
          Back to Branch
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
                htmlFor="name"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Branch Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                // placeholder="Enter Branch Name"
                className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Branch Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                // placeholder="Enter Branch Address"
                className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Manager Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="managerName"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Manager Name
                </label>
                <input
                  type="text"
                  id="managerName"
                  name="name"
                  value={formData.manager.name}
                  onChange={(e) => handleChange(e, "manager")}
                  // placeholder="e.g. Rahul Sharma"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="managerAddress"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Manager Address
                </label>
                <input
                  type="text"
                  id="managerAddress"
                  name="address"
                  value={formData.manager.address}
                  onChange={(e) => handleChange(e, "manager")}
                  // placeholder="e.g. 456 Manager St, Mumbai"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="managerContact"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Manager Contact
                </label>
                <input
                  type="text"
                  id="managerContact"
                  name="contact"
                  value={formData.manager.contact}
                  onChange={(e) => handleChange(e, "manager")}
                  // placeholder="e.g. 9876543210"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="managerEmail"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Manager Email
                </label>
                <input
                  type="email"
                  id="managerEmail"
                  name="email"
                  value={formData.manager.email}
                  onChange={(e) => handleChange(e, "manager")}
                  // placeholder="e.g. rahul.sharma@example.com"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="managerAadhaar"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Manager Aadhaar
                </label>
                <input
                  type="text"
                  id="managerAadhaar"
                  name="aadhaar"
                  value={formData.manager.aadhaar}
                  onChange={(e) => handleChange(e, "manager")}
                  // placeholder="e.g. 1234-5678-9012"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                />
              </div>
            </div>
          </div>

          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Employee</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Add multiple employees for this branch.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="employeeName"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  id="employeeName"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleEmployeeChange}
                  // placeholder="e.g. Amit Singh"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="employeeMobile"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Employee Mobile
                </label>
                <input
                  type="text"
                  id="employeeMobile"
                  name="mobile"
                  value={newEmployee.mobile}
                  onChange={handleEmployeeChange}
                  // placeholder="e.g. 9876543210"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="employeeAadhaar"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Employee Aadhaar
                </label>
                <input
                  type="text"
                  id="employeeAadhaar"
                  name="aadhaar"
                  value={newEmployee.aadhaar}
                  onChange={handleEmployeeChange}
                  // placeholder="e.g. 1234-5678-9012"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="employeeAddress"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Employee Address
                </label>
                <input
                  type="text"
                  id="employeeAddress"
                  name="address"
                  value={newEmployee.address}
                  onChange={handleEmployeeChange}
                  // placeholder="e.g. 456 Medical St, Mumbai"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="employeeRole"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Employee Role
                </label>
                <select
                  id="employeeRole"
                  name="role"
                  value={newEmployee.role}
                  onChange={handleEmployeeChange}
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Select Role</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Inventory Manager">Inventory Manager</option>
                  <option value="Assistant">Assistant</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddEmployee}
                  disabled={!newEmployee.name || !newEmployee.mobile || !newEmployee.aadhaar || !newEmployee.address || !newEmployee.role}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    (!newEmployee.name || !newEmployee.mobile || !newEmployee.aadhaar || !newEmployee.address || !newEmployee.role)
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <Plus size={18} />
                  Add Employee
                </button>
              </div>
            </div>

            {formData.employees.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Added Employees ({formData.employees.length})</h4>
                <div className="overflow-x-auto">
                  <table
                    className={`w-full border text-sm text-center ${
                      darkMode ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
                    <thead
                      className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}
                    >
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Mobile</th>
                        <th className="p-3">Aadhaar</th>
                        <th className="p-3">Address</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.employees.map((emp) => (
                        <tr
                          key={emp.id}
                          className={`border-t ${
                            darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <td className="p-3">{emp.name}</td>
                          <td className="p-3">{emp.mobile}</td>
                          <td className="p-3">{emp.aadhaar}</td>
                          <td className="p-3">{emp.address}</td>
                          <td className="p-3">{emp.role}</td>
                          <td className="p-3">
                            <button
                              onClick={() => handleRemoveEmployee(emp.id)}
                              className={`p-2 rounded transition ${
                                darkMode
                                  ? "bg-red-600 text-white hover:bg-red-700"
                                  : "bg-red-500 text-white hover:bg-red-600"
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
              </div>
            )}
          </div> */}
{/* 
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Supplier</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Add multiple suppliers for this branch.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="supplierName"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Supplier Name
                </label>
                <input
                  type="text"
                  id="supplierName"
                  name="name"
                  value={newSupplier.name}
                  onChange={handleSupplierChange}
                  // placeholder="e.g. MediCorp"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="supplierContact"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Supplier Contact
                </label>
                <input
                  type="text"
                  id="supplierContact"
                  name="contact"
                  value={newSupplier.contact}
                  onChange={handleSupplierChange}
                  // placeholder="e.g. 9123456789"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="supplierEmail"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Supplier Email
                </label>
                <input
                  type="email"
                  id="supplierEmail"
                  name="email"
                  value={newSupplier.email}
                  onChange={handleSupplierChange}
                  // placeholder="e.g. contact@medicorp.com"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="supplierAddress"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Supplier Address
                </label>
                <input
                  type="text"
                  id="supplierAddress"
                  name="address"
                  value={newSupplier.address}
                  onChange={handleSupplierChange}
                  // placeholder="e.g. 789 Supplier Rd, Mumbai"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddSupplier}
                  disabled={!newSupplier.name || !newSupplier.contact || !newSupplier.email || !newSupplier.address}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    (!newSupplier.name || !newSupplier.contact || !newSupplier.email || !newSupplier.address)
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <Plus size={18} />
                  Add Supplier
                </button>
              </div>
            </div>

            {formData.suppliers.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Added Suppliers ({formData.suppliers.length})</h4>
                <div className="overflow-x-auto">
                  <table
                    className={`w-full border text-sm text-center ${
                      darkMode ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
                    <thead
                      className={darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-900"}
                    >
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Address</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.suppliers.map((supplier) => (
                        <tr
                          key={supplier.id}
                          className={`border-t ${
                            darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <td className="p-3">{supplier.name}</td>
                          <td className="p-3">{supplier.contact}</td>
                          <td className="p-3">{supplier.email}</td>
                          <td className="p-3">{supplier.address}</td>
                          <td className="p-3">
                            <button
                              onClick={() => handleRemoveSupplier(supplier.id)}
                              className={`p-2 rounded transition ${
                                darkMode
                                  ? "bg-red-600 text-white hover:bg-red-700"
                                  : "bg-red-500 text-white hover:bg-red-600"
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
              </div>
            )}
          </div> */}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/branch")}
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
              disabled={!formData.name || !formData.address || !formData.manager.name || !formData.manager.address || !formData.manager.contact || !formData.manager.email || !formData.manager.aadhaar}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                (!formData.name || !formData.address || !formData.manager.name || !formData.manager.address || !formData.manager.contact || !formData.manager.email || !formData.manager.aadhaar)
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Save size={18} />
              Save Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}