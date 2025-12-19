import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

// Fetch all offers
export async function fetchOffers() {
      const response = await safeFetch(`${API_BASE}/api/offers`);
      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || `HTTP error! status: ${response.status}`);
      }
      const data = await safeJsonParse(response);
      return data.map(mapOfferFromApi);
}

// Fetch single offer
export async function fetchOfferById(id) {
      const response = await safeFetch(`${API_BASE}/api/offers/${id}`);
      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Failed to fetch offer");
      }
      const data = await safeJsonParse(response);
      return mapOfferFromApi(data);
}

// Create new offer
export async function createOffer(offer) {
      const response = await safeFetch(`${API_BASE}/api/offers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(offer),
      });

      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Failed to create offer");
      }

      const data = await safeJsonParse(response);
      return mapOfferFromApi(data);
}

// Update offer
export async function updateOffer(id, updates) {
      const response = await safeFetch(`${API_BASE}/api/offers/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
      });

      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Failed to update offer");
      }

      const data = await safeJsonParse(response);
      return mapOfferFromApi(data);
}

// Delete offer
export async function deleteOffer(id) {
      const response = await safeFetch(`${API_BASE}/api/offers/${id}`, { method: "DELETE" });
      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Failed to delete offer");
      }
      return id;
}

// Mapper helper
const mapOfferFromApi = (o) => ({
      id: o.offerId || o._id,
      ...o
});
