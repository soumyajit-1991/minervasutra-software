import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://hr-management-h9l2.vercel.app';

// export const fetchTimesheets = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/api/timesheets`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching timesheets:', error);
//     return [];
//   }
// };

export const fetchTimesheets = async () => {
  const res = await fetch("https://hr-management-h9l2.vercel.app/api/timesheets");
  return res.json();
};


export const fetchTimesheetStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/timesheets/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching timesheet stats:', error);
    return {
      totalHours: 0,
      regularHours: 0,
      overtimeHours: 0,
      pendingApprovals: 0
    };
  }
};

export const createTimesheet = async (timesheetData) => {
  try {
    const response = await axios.post(`${API_URL}/api/timesheets`, timesheetData);
    return response.data;
  } catch (error) {
    console.error('Error creating timesheet:', error);
    throw error;
  }
};

export const updateTimesheet = async (id, timesheetData) => {
  try {
    const response = await axios.put(`${API_URL}/api/timesheets/${id}`, timesheetData);
    return response.data;
  } catch (error) {
    console.error('Error updating timesheet:', error);
    throw error;
  }
};

export const deleteTimesheet = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/timesheets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting timesheet:', error);
    throw error;
  }
};