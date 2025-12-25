import api from "../components/axios";

export const fetchSupplierOrders = async () => {
  const response = await api.get("/supplier-orders");
  return response.data;
};

export const createSupplierOrder = async (orderData) => {
  const response = await api.post("/supplier-orders", orderData);
  return response.data;
};

export const updateSupplierOrder = async (id, orderData) => {
  const response = await api.put(`/supplier-orders/${id}`, orderData);
  return response.data;
};

export const deleteSupplierOrder = async (id) => {
  const response = await api.delete(`/supplier-orders/${id}`);
  return response.data;
};