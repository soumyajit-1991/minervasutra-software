import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

export async function fetchPerformanceReviews() {
  const response = await safeFetch(`${API_BASE}/api/performance`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch performance reviews");
  }
  return await safeJsonParse(response);
}

export async function fetchPerformanceStats() {
  const response = await safeFetch(`${API_BASE}/api/performance/stats`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch performance stats");
  }
  return await safeJsonParse(response);
}

export async function createPerformanceReview(reviewData) {
  const response = await safeFetch(`${API_BASE}/api/performance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to create performance review");
  }
  return await safeJsonParse(response);
}

export async function updatePerformanceReview(id, updates) {
  const response = await safeFetch(`${API_BASE}/api/performance/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to update performance review");
  }
  return await safeJsonParse(response);
}