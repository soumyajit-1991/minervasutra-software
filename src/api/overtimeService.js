const API_URL = import.meta.env.VITE_API_URL || 'https://hr-management-backend-w6w4.vercel.app';

export const fetchOvertime = async () => {
  const response = await fetch(`${API_URL}/api/overtime`);
  if (!response.ok) throw new Error('Failed to fetch overtime records');
  return response.json();
};

export const createOvertime = async (overtimeData) => {
  const response = await fetch(`${API_URL}/api/overtime`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(overtimeData)
  });
  if (!response.ok) throw new Error('Failed to create overtime record');
  return response.json();
};

export const updateOvertime = async (id, overtimeData) => {
  const response = await fetch(`${API_URL}/api/overtime/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(overtimeData)
  });
  if (!response.ok) throw new Error('Failed to update overtime record');
  return response.json();
};