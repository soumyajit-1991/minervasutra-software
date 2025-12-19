import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = `${API_BASE_URL}/api`;

export const fetchNegotiations = async () => {
      const response = await safeFetch(`${API_BASE}/negotiations`);
      if (!response.ok) throw new Error("Failed to fetch negotiations");
      return safeJsonParse(response);
};

export const createNegotiation = async (negotiationData) => {
      const response = await safeFetch(`${API_BASE}/negotiations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(negotiationData),
      });
      if (!response.ok) throw new Error("Failed to create negotiation");
      return safeJsonParse(response);
};

export const updateNegotiation = async (id, negotiationData) => {
      const response = await safeFetch(`${API_BASE}/negotiations/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(negotiationData),
      });
      if (!response.ok) throw new Error("Failed to update negotiation");
      return safeJsonParse(response);
};

export const deleteNegotiation = async (id) => {
      const response = await safeFetch(`${API_BASE}/negotiations/${id}`, {
            method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete negotiation");
      return safeJsonParse(response);
};
