import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";
import { withCache, dataCache } from "../utils/dataCache";

const API_BASE = API_BASE_URL;

// Cached version of fetchCandidates
const _fetchCandidates = async () => {
      const response = await safeFetch(`${API_BASE}/api/candidates`);
      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || `HTTP error! status: ${response.status}`);
      }
      const data = await safeJsonParse(response);
      return data.map(mapCandidateFromApi);
};

export const fetchCandidates = withCache('candidates', _fetchCandidates, 2 * 60 * 1000); // 2 min cache

// Fetch single candidate
export async function fetchCandidateById(id) {
      const response = await safeFetch(`${API_BASE}/api/candidates/${id}`);
      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Failed to fetch candidate");
      }
      const data = await safeJsonParse(response);
      return mapCandidateFromApi(data);
}

// Create new candidate
export async function createCandidate(candidate) {
      const response = await safeFetch(`${API_BASE}/api/candidates`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(candidate),
      });

      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Failed to create candidate");
      }

      const data = await safeJsonParse(response);
      
      // Clear cache after creating new candidate
      dataCache.delete('candidates_[]');
      
      return mapCandidateFromApi(data);
}

// Update candidate
export async function updateCandidate(id, updates) {
      const response = await safeFetch(`${API_BASE}/api/candidates/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
      });

      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Failed to update candidate");
      }

      const data = await safeJsonParse(response);
      return mapCandidateFromApi(data);
}

// Delete candidate
export async function deleteCandidate(id) {
      const response = await safeFetch(`${API_BASE}/api/candidates/${id}`, { method: "DELETE" });
      if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Failed to delete candidate");
      }
      return id;
}

// Mapper helper
const mapCandidateFromApi = (c) => ({
      id: c.candidateId || c._id, // Prefer custom ID for display
      _id: c._id, // Preserve MongoDB ObjectId for backend operations
      ...c,
      // Ensure fields match frontend expectations
      appliedDate: c.appliedDate ? new Date(c.appliedDate).toLocaleDateString() : 'N/A'
});
