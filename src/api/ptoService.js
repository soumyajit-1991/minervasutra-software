import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchPTORequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/pto`);
    return response.data;
  } catch (error) {
    console.error('Error fetching PTO requests:', error);
    return [];
  }
};

export const createPTORequest = async (ptoData) => {
  try {
    const response = await axios.post(`${API_URL}/api/pto`, ptoData);
    return response.data;
  } catch (error) {
    console.error('Error creating PTO request:', error);
    throw error;
  }
};

export const updatePTORequest = async (id, ptoData) => {
  try {
    const response = await axios.put(`${API_URL}/api/pto/${id}`, ptoData);
    return response.data;
  } catch (error) {
    console.error('Error updating PTO request:', error);
    throw error;
  }
};

export const deletePTORequest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/pto/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting PTO request:', error);
    throw error;
  }
};