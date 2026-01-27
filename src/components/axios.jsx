//components/axios.jsx

import axios from "axios";

import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export default api;

// import axios from "axios";

// // ✅ Create an Axios instance with default settings
// const api = axios.create({
//   baseURL: "https://hr-management-r6bh.vercel.app/api", // change this if backend is deployed
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Optional: Add request interceptor (for auth tokens)
// api.interceptors.request.use(
//   (config) => {
//     // Example: attach token from localStorage if available
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Optional: Add response interceptor (for error handling)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;
