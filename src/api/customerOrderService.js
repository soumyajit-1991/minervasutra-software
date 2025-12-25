import api from "../components/axios";

export const fetchCustomerOrders = async () => {
  const response = await api.get("/customer-orders");
  return response.data;
};

export const createCustomerOrder = async (orderData) => {
  const response = await api.post("/customer-orders", orderData);
  return response.data;
};

export const updateCustomerOrder = async (id, orderData) => {
  const response = await api.put(`/customer-orders/${id}`, orderData);
  return response.data;
};

export const deleteCustomerOrder = async (id) => {
  const response = await api.delete(`/customer-orders/${id}`);
  return response.data;
};