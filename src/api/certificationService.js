const API_URL = import.meta.env.VITE_API_URL || 'https://hr-management-h9l2.vercel.app';

export const fetchCertifications = async () => {
  const response = await fetch(`${API_URL}/api/certifications`);
  if (!response.ok) throw new Error('Failed to fetch certifications');
  return response.json();
};

export const createCertification = async (certData) => {
  const response = await fetch(`${API_URL}/api/certifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(certData)
  });
  if (!response.ok) throw new Error('Failed to create certification');
  return response.json();
};

export const deleteCertification = async (id) => {
  const response = await fetch(`${API_URL}/api/certifications/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete certification');
  return response.json();
};