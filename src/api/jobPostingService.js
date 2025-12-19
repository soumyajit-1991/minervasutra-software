import { API_BASE_URL } from "../config";
import { safeJsonParse, safeFetch } from "../utils/apiHelpers";

const API_BASE = API_BASE_URL;

const mapJob = (job) => ({
  id: job.jobId || job.id,
  jobId: job.jobId || job.id,
  title: job.title,
  department: job.department || "",
  location: job.location || "",
  type: job.type || "",
  postedDate: job.postedDate ? job.postedDate.slice(0, 10) : "",
  closingDate: job.closingDate ? job.closingDate.slice(0, 10) : "",
  status: job.status || "Draft",
  applicants: Number(job.applicants || 0),
  salary: job.salary || "",
  experience: job.experience || "",
  description: job.description || "",
  priority: job.priority || "Medium",
});

export async function fetchJobPostings() {
  const res = await safeFetch(`${API_BASE}/api/job-postings`);
  if (!res.ok) throw new Error((await res.text()) || "Failed to load job postings");
  const data = await safeJsonParse(res);
  return data.map(mapJob);
}

export async function createJobPosting(payload) {
  const res = await safeFetch(`${API_BASE}/api/job-postings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.text()) || "Failed to create job posting");
  return mapJob(await safeJsonParse(res));
}

export async function updateJobPosting(id, updates) {
  const res = await safeFetch(`${API_BASE}/api/job-postings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error((await res.text()) || "Failed to update job posting");
  return mapJob(await safeJsonParse(res));
}

export async function deleteJobPosting(id) {
  const res = await safeFetch(`${API_BASE}/api/job-postings/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.text()) || "Failed to delete job posting");
  return id;
}






