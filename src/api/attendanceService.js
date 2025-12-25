import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

export async function fetchAttendance(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE}/api/attendance${queryString ? `?${queryString}` : ''}`;
  
  const response = await safeFetch(url);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch attendance");
  }
  return await safeJsonParse(response);
}

export async function fetchAttendanceStats() {
  const response = await safeFetch(`${API_BASE}/api/attendance/stats`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch attendance stats");
  }
  return await safeJsonParse(response);
}

export async function markAttendance(attendanceData) {
  const response = await safeFetch(`${API_BASE}/api/attendance/mark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(attendanceData),
  });
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to mark attendance");
  }
  return await safeJsonParse(response);
}