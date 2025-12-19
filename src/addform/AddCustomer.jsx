import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";

export default function AddCustomer() {
  const { darkMode } = useOutletContext();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    balance: "",
    address: "",
    doctors: [{ name: "", isInHouse: false }],
  });

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedDoctors = [...formData.doctors];
    updatedDoctors[index] = {
      ...updatedDoctors[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData((prev) => ({
      ...prev,
      doctors: updatedDoctors,
    }));
  };

  const addDoctor = () => {
    setFormData((prev) => ({
      ...prev,
      doctors: [...prev.doctors, { name: "", isInHouse: false }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Customer Added:", formData);
    // Add logic to save customer data
    setFormData({
      name: "",
      phone: "",
      balance: "",
      address: "",
      doctors: [{ name: "", isInHouse: false }],
    });
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 mt-16 ml-64 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add New Customer</h1>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Fill in the details to add a new customer.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label className="block text-sm font-medium">Customer ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium">Customer Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Total Purchase</label>
          <input
            type="text"
            name="balance"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className={`mt-1 block w-full p-2 border rounded-lg ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Doctors</label>
          {formData.doctors.map((doctor, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="text"
                name="name"
                value={doctor.name}
                onChange={(e) => handleChange(e, index)}
                placeholder="Doctor Name"
                className={`mt-1 block w-full p-2 border rounded-lg ${
                  darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isInHouse"
                  checked={doctor.isInHouse}
                  onChange={(e) => handleChange(e, index)}
                  className={`mr-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}
                />
                <label className="text-sm">In-House</label>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addDoctor}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              darkMode
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            <Plus size={18} />
            Add Doctor
          </button>
        </div>
        <button
          type="submit"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Plus size={18} />
          Add Customer
        </button>
      </form>
    </div>
  );
}