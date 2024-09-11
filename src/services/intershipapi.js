import axios from 'axios';

const API_BASE_URL = 'https://api-is.amazingtech.vn/api/internship';

export const getAllInternships = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-all-internship`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching internships:', error);
    throw error;
  }
};