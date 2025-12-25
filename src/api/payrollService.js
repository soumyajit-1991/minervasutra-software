import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

export async function fetchPayrolls() {
  const response = await safeFetch(`${API_BASE}/api/payroll`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch payrolls");
  }
  return await safeJsonParse(response);
}

export async function fetchPayrollStats() {
  const response = await safeFetch(`${API_BASE}/api/payroll/stats`);
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch payroll stats");
  }
  return await safeJsonParse(response);
}

export async function createPayroll(payrollData) {
  const response = await safeFetch(`${API_BASE}/api/payroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payrollData),
  });
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to create payroll");
  }
  return await safeJsonParse(response);
}

export async function generatePayrollForAll(payPeriod) {
  const response = await safeFetch(`${API_BASE}/api/payroll/generate-all`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payPeriod }),
  });
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to generate payroll");
  }
  return await safeJsonParse(response);
}