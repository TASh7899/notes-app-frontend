import axios from 'axios';

const api = axios.create({
  console.log("Calling API:", import.meta.env.VITE_API_URL);
  baseURL: `${process.env.REACT_APP_API_URL || "http://localhost:3000"}`,
  withCredentials: true,
});

export default api;
