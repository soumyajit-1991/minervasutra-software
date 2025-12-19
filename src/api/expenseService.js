import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

const mapExpense = (exp) => ({
  id: exp.expenseId || exp.id,
  expenseId: exp.expenseId || exp.id,
  category: exp.category,
  description: exp.description || "",
  vendor: exp.vendor || "",
  paymentMethod: exp.paymentMethod || "",
  date: exp.date ? exp.date.slice(0, 10) : "",
  amount: Number(exp.amount || 0),
  paid: Number(exp.paid || 0),
  due: Number(exp.due || 0),
  status: exp.status || "Pending",
});

export async function fetchExpenses() {
  const res = await safeFetch(`${API_BASE}/api/expenses`);
  if (!res.ok) throw new Error(await res.text() || "Failed to load expenses");
  const data = await safeJsonParse(res);
  return data.map(mapExpense);
}

export async function fetchExpense(id) {
  const res = await safeFetch(`${API_BASE}/api/expenses/${id}`);
  if (!res.ok) throw new Error(await res.text() || "Failed to load expense");
  return mapExpense(await res.json());
}

export async function createExpense(expense) {
  const res = await safeFetch(`${API_BASE}/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error(await res.text() || "Failed to create expense");
  return mapExpense(await res.json());
}

export async function updateExpense(id, updates) {
  const res = await fetch(`${API_BASE}/api/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(await res.text() || "Failed to update expense");
  return mapExpense(await res.json());
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE}/api/expenses/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text() || "Failed to delete expense");
  return id;
}

