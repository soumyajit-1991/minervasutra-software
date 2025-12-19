import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

const mapReq = (r) => ({
      id: r._id || r.id,
      requirementId: r._id || r.id,
      title: r.title,
      description: r.description || "",
      category: r.category || "",
      frequency: r.frequency || "",
      lastAuditDate: r.lastAuditDate ? r.lastAuditDate.slice(0, 10) : "",
      nextDueDate: r.nextDueDate ? r.nextDueDate.slice(0, 10) : "",
      status: r.status || "Pending",
      complianceRate: Number(r.complianceRate || 0),
      assignee: r.assignee || "",
      priority: r.priority || "Medium",
});

export async function fetchCompliances() {
      const res = await safeFetch(`${API_BASE}/api/compliance`);
      if (!res.ok) throw new Error((await res.text()) || "Failed to load compliance data");
      const data = await safeJsonParse(res);
      return data.map(mapReq);
}

export async function createCompliance(compliance) {
      const res = await safeFetch(`${API_BASE}/api/compliance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(compliance),
      });
      if (!res.ok) throw new Error((await res.text()) || "Failed to create compliance requirement");
      return mapReq(await safeJsonParse(res));
}

export async function updateCompliance(id, updates) {
      const res = await safeFetch(`${API_BASE}/api/compliance/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error((await res.text()) || "Failed to update compliance requirement");
      return mapReq(await safeJsonParse(res));
}

export async function deleteCompliance(id) {
      const res = await safeFetch(`${API_BASE}/api/compliance/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.text()) || "Failed to delete compliance requirement");
      return id;
}
