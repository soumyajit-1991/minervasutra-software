// import { API_BASE_URL } from "../config";
// import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

// const API_BASE = `${API_BASE_URL}/api`;

// export const fetchNegotiations = async () => {
//       const response = await safeFetch(`${API_BASE}/negotiations`);
//       if (!response.ok) throw new Error("Failed to fetch negotiations");
//       return safeJsonParse(response);
// };

// export const createNegotiation = async (negotiationData) => {
//       const response = await safeFetch(`${API_BASE}/negotiations`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(negotiationData),
//       });
//       if (!response.ok) throw new Error("Failed to create negotiation");
//       return safeJsonParse(response);
// };

// export const updateNegotiation = async (id, negotiationData) => {
//       const response = await safeFetch(`${API_BASE}/negotiations/${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(negotiationData),
//       });
//       if (!response.ok) throw new Error("Failed to update negotiation");
//       return safeJsonParse(response);
// };

// export const deleteNegotiation = async (id) => {
//       const response = await safeFetch(`${API_BASE}/negotiations/${id}`, {
//             method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete negotiation");
//       return safeJsonParse(response);
// };



import axios from "axios";

const API_URL = "http://localhost:5000/api/negotiations";

// const API_URL = "https://hr-management-r1zn.onrender.com/api/negotiations";


export const fetchNegotiations = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createNegotiation = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateNegotiation = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteNegotiation = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
