import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

// Cache for dashboard data
let dashboardCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchDashboardStats(forceRefresh = false) {
  // Check cache first
  if (!forceRefresh && dashboardCache && cacheTimestamp && 
      (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return dashboardCache;
  }

  const response = await safeFetch(`${API_BASE}/api/dashboard/stats`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch dashboard stats");
  }
  
  const data = await safeJsonParse(response);
  
  // Update cache
  dashboardCache = data;
  cacheTimestamp = Date.now();
  
  return data;
}

export async function fetchEmployeeStats() {
  const response = await safeFetch(`${API_BASE}/api/employees/stats`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch employee stats");
  }
  return await safeJsonParse(response);
}

export async function fetchCandidateStats() {
  const response = await safeFetch(`${API_BASE}/api/candidates/stats`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch candidate stats");
  }
  return await safeJsonParse(response);
}

export async function fetchJobPostingStats() {
  const response = await safeFetch(`${API_BASE}/api/job-postings/stats`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch job posting stats");
  }
  return await safeJsonParse(response);
}

// Clear cache manually
export function clearDashboardCache() {
  dashboardCache = null;
  cacheTimestamp = null;
}