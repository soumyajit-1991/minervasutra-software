//src/addform/AddCustomerOrder.jsx
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";

export default function AddNewCustomer() {
  const { darkMode } = useOutletContext();

  const availableProducts = [
    { name: "Product A", price: 10.99 },
    { name: "Product B", price: 15.99 },
    { name: "Product C", price: 20.99 },
  ];
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    doctor: "",
    products: [{ name: "", quantity: 1, isSingle: false, isFull: false, singleQuantity: 1, fullMultiplier: 1 }],
    deliveryMethod: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    if (field === "isSingle") {
      updatedProducts[index] = {
        ...updatedProducts[index],
        isSingle: value,
        isFull: false, // Disable Full when Single is checked
        [field]: value,
      };
    } else if (field === "isFull") {
      updatedProducts[index] = {
        ...updatedProducts[index],
        isFull: value,
        isSingle: false, // Disable Single when Full is checked
        [field]: value,
      };
    } else {
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    }
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProductField = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { name: "", quantity: 1, isSingle: false, isFull: false, singleQuantity: 1, fullMultiplier: 1 },
      ],
    });
  };

  const removeProductField = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const calculateTotalPrice = () => {
    return formData.products
      .reduce((total, product) => {
        const productInfo = availableProducts.find(
          (p) => p.name.toLowerCase() === product.name.toLowerCase()
        );
        if (productInfo) {
          const quantity = product.isFull
            ? product.quantity * (parseInt(product.fullMultiplier) || 1)
            : product.isSingle
            ? product.singleQuantity
            : product.quantity;
          return total + productInfo.price * quantity;
        }
        return total;
      }, 0)
      .toFixed(2);
  };

  const generateBillContent = () => {
    let bill = `Customer Order Bill\n\n`;
    bill += `Customer Name: ${formData.name}\n`;
    bill += `Phone: ${formData.phone}\n`;
    bill += `Address: ${formData.address || "N/A"}\n`;
    bill += `Prescribing Doctor: ${formData.doctor}\n`;
    bill += `Delivery Method: ${formData.deliveryMethod || "N/A"}\n\n`;
    bill += `Products:\n`;
    formData.products.forEach((product, index) => {
      const productInfo = availableProducts.find(
        (p) => p.name.toLowerCase() === product.name.toLowerCase()
      );
      const quantity = product.isFull
        ? product.quantity * (parseInt(product.fullMultiplier) || 1)
        : product.isSingle
        ? product.singleQuantity
        : product.quantity;
      const price = productInfo ? (productInfo.price * quantity).toFixed(2) : "0.00";
      bill += `${index + 1}. ${product.name} (${
        product.isFull ? `Full x${product.fullMultiplier}` : product.isSingle ? "Single" : "Single"
      } x${quantity}) - $${price}\n`;
    });
    bill += `\nTotal Price: $${calculateTotalPrice()}\n`;
    bill += `Notes: ${formData.notes || "N/A"}\n`;
    return bill;
  };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   console.log("Customer Data Saved:", {
  //     ...formData,
  //     totalPrice: calculateTotalPrice(),
  //   });
  //   setFormData({
  //     name: "",
  //     phone: "",
  //     address: "",
  //     doctor: "",
  //     products: [{ name: "", quantity: 1, isSingle: false, isFull: false, singleQuantity: 1, fullMultiplier: 1 }],
  //     deliveryMethod: "",
  //     notes: "",
  //   });
  // };


  const handleSave = async (e) => {
  e.preventDefault();

  // const payload = {
  //   customer: formData.name,
  //   phone: formData.phone,
  //   address: formData.address,
  //   doctor: formData.doctor,
  //   deliveryMethod: formData.deliveryMethod,
  //   notes: formData.notes,
  //   deliveryDate: new Date().toISOString().split("T")[0],
  //   amount: Number(calculateTotalPrice()),
  //   products: formData.products.map((p) => ({
  //     name: p.name,
  //     quantity: p.isFull
  //       ? p.quantity * p.fullMultiplier
  //       : p.isSingle
  //       ? p.singleQuantity
  //       : p.quantity,
  //     price:
  //       availableProducts.find((ap) => ap.name === p.name)?.price || 0,
  //   })),
  // };

  const payload = {
  customer: formData.name.trim(),
  phone: formData.phone.trim(),
  address: formData.address,
  doctor: formData.doctor,
  deliveryMethod: formData.deliveryMethod,
  notes: formData.notes,
  date: new Date().toISOString().split("T")[0],
  deliveryDate: new Date().toISOString().split("T")[0],

  amount: parseFloat(calculateTotalPrice()),

  products: formData.products
    .filter((p) => p.name.trim() !== "")
    .map((p) => {
      const basePrice =
        availableProducts.find((ap) => ap.name === p.name)?.price || 0;

      const qty = p.isFull
        ? p.quantity * p.fullMultiplier
        : p.isSingle
        ? p.singleQuantity
        : p.quantity;

      return {
        name: p.name,
        quantity: Number(qty),
        price: Number(basePrice),
      };
    }),
};

  console.log("Payload being sent:", payload);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/customer-orders",
      payload
    );
    


    alert("Order saved successfully");
    console.log("Saved Order:", res.data);

    setFormData({
      name: "",
      phone: "",
      address: "",
      doctor: "",
      products: [
        {
          name: "",
          quantity: 1,
          isSingle: false,
          isFull: false,
          singleQuantity: 1,
          fullMultiplier: 1,
        },
      ],
      deliveryMethod: "",
      notes: "",
    });
  } catch (err) {
    alert("Save failed");
    console.error(err.response?.data || err.message);
  }
};




  const handlePrintBill = () => {
    const billContent = generateBillContent();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Customer Bill</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <pre>${billContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSendWhatsApp = () => {
    if (!formData.phone) {
      alert("Please enter a phone number to send the bill via WhatsApp.");
      return;
    }
    const billContent = encodeURIComponent(generateBillContent());
    const whatsappUrl = `https://wa.me/${formData.phone}?text=${billContent}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`p-6 space-y-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Add New Customer Order</h2>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Create a new customer Order.
          </p>
        </div>
      </div>

      <div
        className={`p-6 shadow rounded-md transition-colors duration-300 mt-16 ml-64 ${
          darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Customer Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prescribe Doctor</label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Enter prescribing doctor's name"
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
                  darkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>
            {formData.products.map((product, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, "name", e.target.value)}
                  className={`w-1/2 p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter product name"
                  required
                />
                <div className="flex items-center gap-2 w-1/2">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={product.isSingle}
                        onChange={(e) => handleProductChange(index, "isSingle", e.target.checked)}
                        className="mr-1"
                        disabled={product.isFull}
                      />
                      Single
                    </label>
                    {product.isSingle && (
                      <input
                        type="number"
                        value={product.singleQuantity}
                        onChange={(e) => handleProductChange(index, "singleQuantity", e.target.value)}
                        min="1"
                        className={`w-1/4 p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Single Qty"
                        required
                      />
                    )}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={product.isFull}
                        onChange={(e) => handleProductChange(index, "isFull", e.target.checked)}
                        className="mr-1"
                        disabled={product.isSingle}
                      />
                      Full
                    </label>
                    {product.isFull && (
                      <input
                        type="number"
                        value={product.fullMultiplier}
                        onChange={(e) => handleProductChange(index, "fullMultiplier", e.target.value)}
                        min="1"
                        className={`w-1/4 p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-gray-100"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="x"
                        required
                      />
                    )}
                  </div>
                </div>
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProductField(index)}
                    className={`p-2 rounded transition ${
                      darkMode
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Delivery Method</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="deliveryMethod"
                  value="offline"
                  checked={formData.deliveryMethod === "offline"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Offline Take Away
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="deliveryMethod"
                  value="online"
                  checked={formData.deliveryMethod === "online"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Online Delivery
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Calculate Price</label>
            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-600" : "bg-gray-100"
              }`}
            >
              <p className="text-lg font-semibold">Total Price: ${calculateTotalPrice()}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              rows="4"
              placeholder="Additional customer notes..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
              onClick={()=>{navigate("/customer-orders")}}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handlePrintBill}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Print Bill
            </button>
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              <FaWhatsapp size={20} />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}