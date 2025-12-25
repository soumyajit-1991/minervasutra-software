import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

export async function fetchTrainings() {
  const response = await safeFetch(`${API_BASE}/api/trainings`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch trainings");
  }
  return await safeJsonParse(response);
}

export async function fetchTrainingStats() {
  const response = await safeFetch(`${API_BASE}/api/trainings/stats`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch training stats");
  }
  return await safeJsonParse(response);
}

export async function createTraining(trainingData) {
  const response = await safeFetch(`${API_BASE}/api/trainings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trainingData),
  });
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to create training");
  }
  return await safeJsonParse(response);
}

export async function enrollEmployee(trainingId, employeeData) {
  const response = await safeFetch(`${API_BASE}/api/trainings/${trainingId}/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  });
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to enroll employee");
  }
  return await safeJsonParse(response);
}