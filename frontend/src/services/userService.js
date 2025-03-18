import axios from 'axios';

const API_URL = 'http://localhost:3000/user';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data.token;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
  } catch (error) {
    throw error.response.data.message;
  }
};